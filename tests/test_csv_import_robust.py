"""CSV 客户导入：真实 Excel 导出的兼容性。

用户实际拿到的 CSV 很少是「逗号 + 英文小写表头 + UTF-8」：
阿拉伯语 Excel 会写 `;`、Windows 会写 cp1256、表头可能是 "Name" / "اسم الشركة" /
"Contact Person (optional)"，或者干脆以 `sep=;` 开头（Excel 区域提示行）。
这些以前全部落进「CSV 中没有有效数据」，用户无从判断错在哪。
"""

from __future__ import annotations

import pytest
from fastapi import HTTPException

from trade.api.customers import parse_customer_csv


def _csv(text: str, encoding: str = "utf-8") -> bytes:
    return text.encode(encoding)


def test_plain_english_headers():
    rows, headers = parse_customer_csv(_csv("name,email\nAcme Ltd,a@acme.com\n"))
    assert rows == [{"name": "Acme Ltd", "email": "a@acme.com"}]
    assert headers == ["name", "email"]


def test_bom_and_capitalised_headers():
    content = b"\xef\xbb\xbfName,Email,Country\nAcme,a@acme.com,Italy\n"
    rows, _ = parse_customer_csv(content)
    assert rows[0]["name"] == "Acme"
    assert rows[0]["email"] == "a@acme.com"
    assert rows[0]["country"] == "Italy"


def test_semicolon_delimiter():
    rows, _ = parse_customer_csv(_csv("name;email;country\nAcme;a@acme.com;Egypt\n"))
    assert rows == [{"name": "Acme", "email": "a@acme.com", "country": "Egypt"}]


def test_tab_delimiter():
    rows, _ = parse_customer_csv(_csv("name\temail\nAcme\ta@acme.com\n"))
    assert rows[0]["email"] == "a@acme.com"


def test_sep_directive_line():
    rows, _ = parse_customer_csv(_csv("sep=;\nname;email\nAcme;a@acme.com\n"))
    assert rows[0]["name"] == "Acme"


def test_arabic_headers():
    rows, _ = parse_customer_csv(
        _csv("اسم الشركة,البريد الإلكتروني,البلد\nشركة النيل,nile@example.com,مصر\n")
    )
    assert rows == [{
        "name": "شركة النيل",
        "email": "nile@example.com",
        "country": "مصر",
    }]


def test_arabic_headers_with_semicolon():
    rows, _ = parse_customer_csv(
        _csv("الشركة;الهاتف\nشركة النيل;+201234567890\n", "utf-8")
    )
    assert rows[0] == {"name": "شركة النيل", "phone": "+201234567890"}


def test_cp1256_encoding():
    content = "اسم الشركة,الهاتف\nشركة النيل,+201234567890\n".encode("cp1256")
    rows, _ = parse_customer_csv(content)
    assert rows[0]["name"] == "شركة النيل"


def test_header_noise_is_ignored():
    rows, _ = parse_customer_csv(
        _csv('"  Name  ","E-Mail","Contact Person (optional)","Job Title"\n'
             'Acme,a@acme.com,John,CEO\n')
    )
    assert rows[0] == {
        "name": "Acme",
        "email": "a@acme.com",
        "contact": "John",
        "title": "CEO",
    }


def test_empty_name_rows_are_skipped_and_score_coerced():
    rows, _ = parse_customer_csv(
        _csv("name,match_score\n,5\nAcme,not-a-number\n")
    )
    assert rows == [{"name": "Acme", "match_score": 0}]


def test_no_name_column_reports_detected_headers():
    with pytest.raises(HTTPException) as exc:
        parse_customer_csv(_csv("company_title,tel\nAcme,123\n"))
    detail = exc.value.detail
    assert detail.startswith("No valid rows found")
    assert "detected headers" in detail
    assert "company_title" in detail and "tel" in detail


def test_name_column_present_but_empty_says_so():
    with pytest.raises(HTTPException) as exc:
        parse_customer_csv(_csv("name,email\n,a@acme.com\n"))
    assert "empty in every row" in exc.value.detail


def test_empty_file_is_rejected():
    with pytest.raises(HTTPException) as exc:
        parse_customer_csv(b"")
    assert exc.value.status_code == 400


def test_xlsx_renamed_to_csv_is_explained():
    with pytest.raises(HTTPException) as exc:
        parse_customer_csv(b"PK\x03\x04rest-of-a-zip")
    assert ".xlsx" in exc.value.detail


def test_html_table_is_explained():
    with pytest.raises(HTTPException) as exc:
        parse_customer_csv(b"<html><table><tr><td>Acme</td></tr></table></html>")
    assert "CSV" in exc.value.detail and "HTML" in exc.value.detail
