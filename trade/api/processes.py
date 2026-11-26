"""Sub-process definitions for the guided workflow cards (2026-11-27).

Single source of truth: every process screen (chat context) can render an
ordered card of sub-process steps. Each step carries:
  - label / meta in English and Arabic (UI is EN/AR only)
  - a chat prompt template prefixed with the skill's English trigger phrase,
    so sending it routes to the intended skill (see SKILL_CMD_EN in chat.js)
  - an optional automate skill id for a future "automate daily" link

Clicking a step only PREFILLS the chat input — the user reviews and sends.
Nothing here runs by itself; no LLM is needed to render the card.

Adding a process = one dict entry here; the frontend renders whatever the
endpoint returns for the active chat context.
"""

from __future__ import annotations

from fastapi import APIRouter, Depends

from trade.api.deps import require_company

router = APIRouter(prefix="/api/trade/processes")

# Chinese keys are internal ids only (product rule: EN/AR user-facing).
PROCESS_STEPS: dict[str, dict] = {
    "lead": {
        "label_en": "Lead Generating",
        "label_ar": "تطوير العملاء",
        "steps": [
            {
                "id": "target_product",
                "n": 1,
                "en": "Define target product",
                "ar": "تحديد المنتج المستهدف",
                "meta_en": "Keywords · categories · HS codes",
                "meta_ar": "كلمات مفتاحية · فئات · رموز HS",
                "skill": "b2b-market-analysis",
                "prompt_en": (
                    "Market analysis — help me define my target product profile for "
                    "buyer sourcing: main products, search keywords, categories and HS "
                    "codes. Base it on my company profile and onboarding products."
                ),
                "prompt_ar": (
                    "Market analysis — ساعدني في تحديد ملف منتجاتي المستهدفة للمصادر: "
                    "المنتجات الرئيسية، الكلمات المفتاحية، الفئات ورموز HS. استند إلى "
                    "ملف شركتي ومنتجات التهيئة."
                ),
            },
            {
                "id": "find_buyers",
                "n": 2,
                "en": "Find potential buyers",
                "ar": "البحث عن مشترين محتملين",
                "meta_en": "Customs data · B2B platforms · LinkedIn",
                "meta_ar": "بيانات الجمارك · منصات B2B · لينكدإن",
                "skill": "b2b-customs-data",
                "prompt_en": (
                    "Customs data — find potential buyers for my products in my target "
                    "markets. Start from my company profile, list up to 20 candidates "
                    "with company name, country and website, and say which source each "
                    "came from."
                ),
                "prompt_ar": (
                    "Customs data — ابحث عن مشترين محتملين لمنتجاتي في أسواقي المستهدفة. "
                    "ابدأ من ملف شركتي، واذكر حتى 20 مرشحًا مع اسم الشركة والدولة "
                    "والموقع، ووضح مصدر كل واحد."
                ),
            },
            {
                "id": "verify_contacts",
                "n": 3,
                "en": "Verify & enrich contacts",
                "ar": "التحقق وإثراء بيانات التواصل",
                "meta_en": "Email intel · WhatsApp · phone",
                "meta_ar": "بريد إلكتروني · واتساب · هاتف",
                "skill": "b2b-email-intel",
                "prompt_en": (
                    "Email intel — verify and enrich the contact details of the leads "
                    "we just discussed: find the decision maker's email, WhatsApp and "
                    "phone where possible, and mark each contact as verified or not "
                    "found."
                ),
                "prompt_ar": (
                    "Email intel — تحقق وأثرِ بيانات التواصل للعملاء المحتملين التي "
                    "ناقشناها: ابحث عن بريد صانع القرار وواتساب والهاتف إن أمكن، وضع "
                    "علامة على كل جهة اتصال كمُتحقق منها أو غير موجود."
                ),
            },
            {
                "id": "check_duplicates",
                "n": 4,
                "en": "Check duplicates in CRM",
                "ar": "فحص التكرار في CRM",
                "meta_en": "Auto match by domain / name",
                "meta_ar": "مطابقة تلقائية بالنطاق / الاسم",
                "skill": "b2b-customer-mgmt",
                "prompt_en": (
                    "Customer management — check my CRM for the leads we just discussed "
                    "and tell me which ones are already customers (match by company "
                    "name, domain or email), so I do not save duplicates."
                ),
                "prompt_ar": (
                    "Customer management — افحص CRM عن العملاء المحتملين الذين ناقشناهم "
                    "وقل لي أيهم موجود بالفعل (مطابقة باسم الشركة أو النطاق أو "
                    "البريد)، حتى لا أحفظ مكررين."
                ),
            },
            {
                "id": "save_lead",
                "n": 5,
                "en": "Save lead to CRM",
                "ar": "حفظ العميل المحتمل في CRM",
                "meta_en": "Draft → confirm before saving",
                "meta_ar": "مسودة ← تأكيد قبل الحفظ",
                "skill": "b2b-customer-mgmt",
                "prompt_en": (
                    "Customer management — draft a complete CRM record for this lead "
                    "(company, country, contact name, email, source, first-contact "
                    "notes). Show me the draft and wait for my confirmation; do not "
                    "save until I say so."
                ),
                "prompt_ar": (
                    "Customer management — ضع مسودة سجل CRM كامل لهذا العميل المحتمل "
                    "(الشركة، الدولة، جهة الاتصال، البريد، المصدر، ملاحظات أول تواصل). "
                    "أرني المسودة وانتظر تأكيدي؛ لا تحفظ حتى أقول ذلك."
                ),
            },
            {
                "id": "background_check",
                "n": 6,
                "en": "Background check",
                "ar": "فحص خلفية العميل",
                "meta_en": "Sanctions · risk · ownership",
                "meta_ar": "العقوبات · المخاطر · الملكية",
                "skill": "b2b-osint",
                "prompt_en": (
                    "Company background — run a background check on the lead we just "
                    "saved: company identity, website/domain age, sanctions screening "
                    "and a simple risk rating before I invest more time."
                ),
                "prompt_ar": (
                    "Company background — أجرِ فحص خلفية للعميل المحتمل الذي حفظناه "
                    "توًا: هوية الشركة، عمر النطاق/الموقع، فحص العقوبات وتقييم مخاطر "
                    "مبسط قبل أن أستثمر وقتًا أكثر."
                ),
            },
            {
                "id": "first_outreach",
                "n": 7,
                "en": "First outreach",
                "ar": "أول رسالة تواصل",
                "meta_en": "Inquiry-first cold email",
                "meta_ar": "بريد بارد بأسلوب الرد على الاستفسار",
                "skill": "b2b-cold-outreach",
                "prompt_en": (
                    "Cold email — draft the first outreach email to this lead in the "
                    "inquiry-first style: short, about their buying activity, no "
                    "marketing tone. Show me the draft; do not send anything."
                ),
                "prompt_ar": (
                    "Cold email — ضع مسودة أول رسالة تواصل لهذا العميل المحتمل بأسلوب "
                    "الاستفسار أولًا: قصيرة، عن نشاطهم الشرائي، بلا نبرة تسويقية. أرني "
                    "المسودة؛ لا ترسل شيئًا."
                ),
            },
            {
                "id": "followup_reminder",
                "n": 8,
                "en": "Set follow-up reminder",
                "ar": "تعيين تذكير للمتابعة",
                "meta_en": "3/7/14-day ladder · todo rail",
                "meta_ar": "سلم 3/7/14 يومًا · قائمة المهام",
                "skill": "b2b-sales-pipeline",
                "prompt_en": (
                    "Sales pipeline — draft a 3/7/14-day follow-up ladder for this "
                    "lead (channel, message angle per touch) and remind me to add the "
                    "first follow-up to my todo list."
                ),
                "prompt_ar": (
                    "Sales pipeline — ضع خطة متابعة 3/7/14 يومًا لهذا العميل المحتمل "
                    "(القناة وزاوية الرسالة لكل لمسة) وذكرني بإضافة المتابعة الأولى "
                    "إلى قائمة مهامي."
                ),
            },
        ],
    },
}


@router.get("/{process_id}")
def get_process_steps(process_id: str, cid: int = Depends(require_company)) -> dict:
    """Ordered sub-process steps for a process screen (card render is static)."""
    data = PROCESS_STEPS.get(process_id)
    if not data:
        return {"process_id": process_id, "steps": []}
    steps = []
    for s in data["steps"]:
        steps.append({
            "id": s["id"],
            "n": s["n"],
            "label_en": s["en"],
            "label_ar": s["ar"],
            "meta_en": s["meta_en"],
            "meta_ar": s["meta_ar"],
            "skill": s["skill"],
            "prompt_en": s["prompt_en"],
            "prompt_ar": s["prompt_ar"],
        })
    return {
        "process_id": process_id,
        "label_en": data["label_en"],
        "label_ar": data["label_ar"],
        "steps": steps,
    }
