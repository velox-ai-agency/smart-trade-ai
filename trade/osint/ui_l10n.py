"""UI-facing localization for OSINT tool cards.

The OSINT modules keep their original Chinese source strings (needed by the
Chinese UI and by the skill layer). This module translates only what the web UI
renders: SSE tool_start args, tool_complete previews and progress messages.
Nothing here mutates the underlying tool results or stored data.
"""
from __future__ import annotations

import re
from typing import Any

_CJK = re.compile(r"[\u4e00-\u9fff]")

_EN = {"'（域名": "' (domain",
 'CT 查询失败（': 'CT query failed (',
 'EDGAR 无有效响应': 'No valid response from EDGAR',
 'EDGAR 无申报记录': 'No EDGAR filings found',
 'EDGAR 查询失败：': 'EDGAR query failed:',
 'EU VIES 增值税核验': 'EU VIES VAT verification',
 'FR/NO/BR 未查到匹配登记': 'No matching registration found in FR/NO/BR',
 'GDELT 新闻': 'GDELT news',
 'GDELT 无有效响应': 'No valid response from GDELT',
 'GDELT 无相关新闻': 'No relevant GDELT news',
 'GDELT 查询失败：': 'GDELT query failed:',
 'GLEIF LEI 登记': 'GLEIF LEI registration',
 'GLEIF 无匹配记录': 'No matching GLEIF record',
 'GLEIF 查询失败：': 'GLEIF query failed:',
 'GLEIF 结果与目标名称不吻合，未采用': 'GLEIF result does not match the target name; not used',
 'GitHub 候选资料均不可读': 'All GitHub candidate profiles are unreadable',
 'GitHub 公开资料': 'GitHub public profile',
 'GitHub 搜索无结果': 'No GitHub search results',
 'GitHub 查询失败：': 'GitHub query failed:',
 'GitHub 用户不存在或查询失败': 'GitHub user does not exist or query failed',
 'Gravatar 公开资料': 'Gravatar public profile',
 'Gravatar 查询失败：': 'Gravatar query failed:',
 'Gravatar 画像未与目标独立核实': 'Gravatar avatar not independently verified against the target',
 'Gravatar 资料为空': 'Gravatar profile is empty',
 'HTTP GET 失败 [%s]: %s': 'HTTP GET failed [%s]: %s',
 'LinkedIn 公司页': 'LinkedIn company page',
 'LinkedIn 核查': 'LinkedIn verification',
 'MX 查询失败：': 'MX query failed:',
 'MX 记录未能验证（': 'MX records could not be verified (',
 'NY/CO 未查到匹配登记': 'No matching registration found in NY/CO',
 'RDAP 域名注册': 'RDAP domain registration',
 'RDAP 无响应或返回非 JSON': 'RDAP returned no response or non-JSON data',
 'RDAP 未返回注册信息': 'RDAP returned no registration information',
 'RDAP 查询失败：': 'RDAP query failed:',
 'RDAP 返回结构异常': 'RDAP returned an unexpected structure',
 'SEC EDGAR 申报': 'SEC EDGAR filing',
 'SEC 申报：': 'SEC filing:',
 'Tavily 公司库': 'Tavily company database',
 'VIES 判定无效': 'VIES determined the number invalid',
 'VIES 无有效响应': 'No valid response from VIES',
 'VIES 查询失败：': 'VIES query failed:',
 'WHOIS 域名情报': 'WHOIS domain intelligence',
 'WHOIS 服务器无响应': 'WHOIS server did not respond',
 'WHOIS 查询失败：': 'WHOIS query failed:',
 'Wayback 无响应或返回非 JSON': 'Wayback returned no response or non-JSON data',
 'Wayback 无快照': 'No Wayback snapshot',
 'Wayback 查询失败：': 'Wayback query failed:',
 'Wayback 首次快照': 'Wayback first snapshot',
 'WhatsMyName 数据集不可用': 'WhatsMyName dataset unavailable',
 '] 失败：': '] failed:',
 '] 未查到（': '] not found (',
 '] 跳过（': '] skipped (',
 'fetched_at 无法解析，按过期数据处理': 'fetched_at could not be parsed; treating as stale data',
 'holehe 未执行或失败：': 'holehe was not run or failed:',
 'osint_job_start 返回的 job_id': 'job_id returned by osint_job_start',
 'target / field / value 都是必填': 'target / field / value are all required',
 '· 红旗：': '· Red flags:',
 '—（仅完成制裁筛查）': '— (sanctions screening only completed)',
 '—（未完成核验）': '— (verification not completed)',
 '① 邮箱注册检测：未执行（目标不是邮箱）': '① Email registration check: not run (target is not an email address)',
 '① 邮箱注册检测：查了': '① Email registration check: checked',
 '① 邮箱注册检测：超时 ——': '① Email registration check: timed out ——',
 '① 邮箱注册检测：降级 ——': '① Email registration check: degraded ——',
 '② 域名情报：': '② Domain intelligence:',
 '② 域名情报：未执行（无法从目标提取域名）': '② Domain intelligence: not run (could not extract a domain from the target)',
 '② 域名情报：超时 ——': '② Domain intelligence: timed out ——',
 '② 域名情报：跳过（': '② Domain intelligence: skipped (',
 '② 域名情报：降级 ——': '② Domain intelligence: degraded ——',
 '③ 企业邮箱验证：个人邮箱=': '③ Corporate email verification: personal email=',
 '③ 企业邮箱验证：未执行（目标不是邮箱）': '③ Corporate email verification: not run (target is not an email address)',
 '③ 企业邮箱验证：超时 ——': '③ Corporate email verification: timed out ——',
 '④ 技术栈检测：': '④ Tech stack detection:',
 '④ 技术栈检测：未执行': '④ Tech stack detection: not run',
 '④ 技术栈检测：超时 ——': '④ Tech stack detection: timed out ——',
 '④ 技术栈检测：降级 ——': '④ Tech stack detection: degraded ——',
 '⑤ 制裁名单筛查：命中=': '⑤ Sanctions list screening: matches=',
 '⑤ 制裁名单筛查：未执行': '⑤ Sanctions list screening: not run',
 '⑥ LinkedIn 核查：已生成操作指令（**需人工/浏览器实际执行后才能下结论**）：': '⑥ LinkedIn check: action instructions generated (a conclusion '
                                                  'requires actual manual/browser execution):',
 '⑥ LinkedIn 核查：未执行': '⑥ LinkedIn check: not run',
 '⑦ 公开来源：': '⑦ Open sources:',
 '══ 背调报告：': '══ Background check report:',
 '⚠ 制裁名单过期：': '⚠ Sanctions list expired:',
 '⚠ 未核验：': '⚠ Not verified:',
 '⚠️ WHOIS 域名信息未能核验（': '⚠️ WHOIS domain information could not be verified (',
 '⚠️ 制裁名单尚未成功下载（': '⚠️ Sanctions list has not been downloaded successfully (',
 '⚠️ 制裁名单尚未成功下载（本地可用': '⚠️ Sanctions list has not been downloaded successfully (locally available',
 '⚠️ 发现疑似制裁匹配，建议进一步人工核查': '⚠️ Potential sanctions match found; further manual verification is recommended',
 '⚠️ 域名注册仅': '⚠️ Domain registered only',
 '⚠️ 对方使用个人邮箱（': '⚠️ The counterparty uses a personal email address (',
 '⚠️ 本地名单尚未按新归一化规则迁移（旧数据可能漏查中文名），本次**不构成「无制裁记录」的结论**。请稍后重试，或通过官方渠道（OFAC/UN/EU/UK 官网）人工复核后再决策。': '⚠️ The local list has '
                                                                                                'not yet been migrated '
                                                                                                'to the new '
                                                                                                'normalization rules '
                                                                                                '(old data may miss '
                                                                                                'Chinese names); this '
                                                                                                'does not constitute a '
                                                                                                "conclusion of 'no "
                                                                                                "sanctions record'. "
                                                                                                'Please retry later, '
                                                                                                'or make a decision '
                                                                                                'only after manual '
                                                                                                'verification through '
                                                                                                'official channels '
                                                                                                '(OFAC/UN/EU/UK '
                                                                                                'official websites).',
 '⚠️ 本次仅完成制裁筛查（无域名、公开来源未命中），**不是低风险结论**；补齐官网或公司注册信息后请重新背调': '⚠️ Only sanctions screening was completed this time (no '
                                                            'domain, no open-source hits); this is not a low-risk '
                                                            'conclusion. Please rerun the background check after '
                                                            'adding the official website or company registration '
                                                            'information.',
 '⚠️ 网站使用免费建站平台（': '⚠️ Website uses a free site-building platform (',
 '⚠️ 网站无法访问或抓取失败（': '⚠️ Website unreachable or scraping failed (',
 '⚠️ 邮箱注册检测未执行（': '⚠️ Email registration check not run (',
 '✅ 企业邮箱验证通过（': '✅ Corporate email verification passed (',
 '✅ 域名注册已': '✅ Domain registered',
 '✅ 未在任何制裁名单中发现匹配项': '✅ No matches found in any sanctions list',
 '✅ 网站使用企业级技术栈，可信度 +1': '✅ Website uses an enterprise-grade tech stack; credibility +1',
 '✗ --budget 必须大于 0（收到': '✗ --budget must be greater than 0 (received ',
 '✗ --budget 需要数字（收到': '✗ --budget requires a number (received ',
 '✗ --target 与位置参数不能同时使用。': '✗ --target and positional arguments cannot be used together.',
 '✗ 一次只接受一个目标（收到': '✗ Only one target is accepted at a time (received ',
 '✗ 背调执行失败：': '✗ Background check failed: ',
 '。结论以最新官方数据为准，建议稍后重试。': '. The conclusion is based on the latest official data; please retry later.',
 '一致\n4. 综合评估公司在线存在的真实性\n\n将验证结果填入 OSINT 报告的 ## LinkedIn 部分。': 'consistent\n'
                                                               '4. Comprehensively assess the authenticity of the '
                                                               "company's online presence\n"
                                                               '\n'
                                                               'Fill the verification results into the ## LinkedIn '
                                                               'section of the OSINT report.',
 '下载超过': 'Downloaded more than ',
 '不支持的顶级域名: .': 'Unsupported top-level domain: .',
 '个': ' ',
 '个平台，命中': ' platforms, matched ',
 '个站点中未发现公开 profile': ' sites where no public profile was found',
 '个站点存在公开 profile（': ' sites have a public profile (',
 '个）。': ').',
 '个：': ': ',
 '中风险': 'Medium risk',
 '主要产品': 'Main products',
 '事实内容为空或过长，未登记': 'Fact content empty or too long; not recorded',
 '人名:': 'Person name:',
 '仅完成制裁筛查': 'Only sanctions screening completed',
 '仅完成制裁筛查：目标没有可查询域名，公开来源也没有实质核验命中；这不是低风险结论。补到官网或公司注册信息后请重新背调。': 'Only sanctions screening was completed: the target '
                                                                'has no domain to query, and open sources produced no '
                                                                'substantive verification hits; this is not a low-risk '
                                                                'conclusion. Please rerun the background check after '
                                                                'adding the official website or company registration '
                                                                'information.',
 '企业:': 'Company:',
 '企业邮箱验证通过，域名匹配且 MX 记录正常。': 'Corporate email verification passed, domain matches, and MX records are normal.',
 '低风险': 'Low risk',
 '使用个人邮箱域名': 'Uses a personal email domain',
 '免费建站平台=': 'Free website builder=',
 '公司': 'Company',
 '公司:': 'Company:',
 '公司|集团|工厂|贸易|有限|股份': 'Company|Group|Factory|Trade|Limited|Joint-stock',
 '公开仓库：': 'Public repositories:',
 '公开登记库': 'Public registries',
 '关注者：': 'Followers:',
 '其他企业登记（FR/NO/BR）': 'Other business registries (FR/NO/BR)',
 '写入 tokenizer 版本标记失败（下次仍会全量刷新）': 'Failed to write tokenizer version marker (a full refresh will still run next time)',
 '创建背调任务失败：': 'Failed to create background check task:',
 '到期时间：': 'Expiry date:',
 '制裁名单刷新失败: %s — %s': 'Sanctions list refresh failed: %s — %s',
 '制裁名单刷新失败，%.0f 秒后重试': 'Sanctions list refresh failed, retrying in %.0f seconds',
 '制裁名单刷新完成: %s（主名 %d，别名 %d，源行数 %d）': 'Sanctions list refresh complete: %s (primary names %d, aliases %d, source rows '
                                     '%d)',
 '制裁名单后台刷新异常': 'Background sanctions list refresh error',
 '制裁名单筛查': 'Sanctions list screening',
 '制裁名单筛查未完成（': 'Sanctions list screening not completed (',
 '制裁名单筛查未返回结果': 'Sanctions list screening returned no results',
 '制裁库归一化迁移失败，本次结果可能漏查中文名': 'Sanctions database normalization migration failed; this result may miss Chinese names',
 '制裁库归一化迁移完成（%d 条）': 'Sanctions database normalization migration complete (%d records)',
 '制裁筛查': 'Sanctions screening',
 '县': 'County',
 '发现同名个人匹配（非精确）：姓名相同不足以确认身份，需人工核对出生日期、国籍或证件号后再决定。': 'Found a same-name individual match (not exact): an identical name '
                                                    'alone is not enough to confirm identity; manually verify date of '
                                                    'birth, nationality, or ID number before deciding.',
 '发现弱匹配（非精确），建议记录并持续观察。': 'Found a weak match (not exact); recommend recording it and continuing to monitor.',
 '发现疑似匹配项，建议进一步人工核查，确认是否为同一家公司。': 'Found a possible match; recommend further manual verification to confirm whether it '
                                  'is the same company.',
 '只看 seq 之后的增量事件（默认 0 = 最近 50 条）': 'Only show incremental events after seq (default 0 = latest 50 records)',
 "可选。过去 N 个月（含本月）。逐月回退，遇 1 月走 12/去年。用于 '前几个月' 这类模糊词。**与 time_range 互斥**。": 'Optional. The past N months (including the '
                                                                           'current month). Steps back month by month, '
                                                                           'wrapping from January to December of the '
                                                                           'previous year. Used for vague terms like '
                                                                           "'the past few months'. **Mutually "
                                                                           'exclusive with time_range**.',
 "可选。过去 N 天（含今天）的窗口，start = (now - (N-1) 天) 的 00:00。注意 N=1 等价于 'today'（今天 00:00 起），**不是** 'yesterday' —— 要昨天的数据请用 time_range='yesterday'。用于表达枚举表里没有的相对区间（如 '上上周三' = 14）。**与 time_range 互斥**：若都给了本参数优先；建议在 augment_prompt 里告诉 LLM 不要同时给。": 'Optional. '
                                                                                                                                                                                                                                          'A '
                                                                                                                                                                                                                                          'window '
                                                                                                                                                                                                                                          'of '
                                                                                                                                                                                                                                          'the '
                                                                                                                                                                                                                                          'past '
                                                                                                                                                                                                                                          'N '
                                                                                                                                                                                                                                          'days '
                                                                                                                                                                                                                                          '(including '
                                                                                                                                                                                                                                          'today), '
                                                                                                                                                                                                                                          'with '
                                                                                                                                                                                                                                          'start '
                                                                                                                                                                                                                                          '= '
                                                                                                                                                                                                                                          '00:00 '
                                                                                                                                                                                                                                          'of '
                                                                                                                                                                                                                                          '(now '
                                                                                                                                                                                                                                          '- '
                                                                                                                                                                                                                                          '(N-1) '
                                                                                                                                                                                                                                          'days). '
                                                                                                                                                                                                                                          'Note '
                                                                                                                                                                                                                                          'N=1 '
                                                                                                                                                                                                                                          'is '
                                                                                                                                                                                                                                          'equivalent '
                                                                                                                                                                                                                                          'to '
                                                                                                                                                                                                                                          "'today' "
                                                                                                                                                                                                                                          '(starting '
                                                                                                                                                                                                                                          'from '
                                                                                                                                                                                                                                          '00:00 '
                                                                                                                                                                                                                                          'today), '
                                                                                                                                                                                                                                          '**not** '
                                                                                                                                                                                                                                          "'yesterday' "
                                                                                                                                                                                                                                          '— '
                                                                                                                                                                                                                                          'for '
                                                                                                                                                                                                                                          "yesterday's "
                                                                                                                                                                                                                                          'data '
                                                                                                                                                                                                                                          'use '
                                                                                                                                                                                                                                          "time_range='yesterday'. "
                                                                                                                                                                                                                                          'Used '
                                                                                                                                                                                                                                          'to '
                                                                                                                                                                                                                                          'express '
                                                                                                                                                                                                                                          'relative '
                                                                                                                                                                                                                                          'ranges '
                                                                                                                                                                                                                                          'not '
                                                                                                                                                                                                                                          'present '
                                                                                                                                                                                                                                          'in '
                                                                                                                                                                                                                                          'the '
                                                                                                                                                                                                                                          'enumeration '
                                                                                                                                                                                                                                          'table '
                                                                                                                                                                                                                                          '(e.g. '
                                                                                                                                                                                                                                          "'the "
                                                                                                                                                                                                                                          'Wednesday '
                                                                                                                                                                                                                                          'before '
                                                                                                                                                                                                                                          "last' "
                                                                                                                                                                                                                                          '= '
                                                                                                                                                                                                                                          '14). '
                                                                                                                                                                                                                                          '**Mutually '
                                                                                                                                                                                                                                          'exclusive '
                                                                                                                                                                                                                                          'with '
                                                                                                                                                                                                                                          'time_range**: '
                                                                                                                                                                                                                                          'if '
                                                                                                                                                                                                                                          'both '
                                                                                                                                                                                                                                          'are '
                                                                                                                                                                                                                                          'given '
                                                                                                                                                                                                                                          'this '
                                                                                                                                                                                                                                          'parameter '
                                                                                                                                                                                                                                          'takes '
                                                                                                                                                                                                                                          'precedence; '
                                                                                                                                                                                                                                          'recommend '
                                                                                                                                                                                                                                          'telling '
                                                                                                                                                                                                                                          'the '
                                                                                                                                                                                                                                          'LLM '
                                                                                                                                                                                                                                          'in '
                                                                                                                                                                                                                                          'augment_prompt '
                                                                                                                                                                                                                                          'not '
                                                                                                                                                                                                                                          'to '
                                                                                                                                                                                                                                          'provide '
                                                                                                                                                                                                                                          'both.',
 '同名候选，未核实（Gravatar 邮箱画像）：': 'Same-name candidate, unverified (Gravatar email avatar):',
 '同名候选，未核实（用户名跨站）：': 'Same-name candidate, unverified (username across sites):',
 '同名候选，未核实（缺域名/公司吻合证据）': 'Same-name candidate, unverified (no domain/company match evidence)',
 '同名候选，未核实：': 'Same-name candidate, unverified:',
 '名单尚未成功下载（本地可用': 'List not yet successfully downloaded (locally available',
 '名单已过期': 'List expired',
 '名单解析结果为 0 条，按降级处理': 'List parsing returned 0 records, handling as degraded',
 '员工数': 'Employee count',
 '员工数（PitchBook）': 'Employee count (PitchBook)',
 '员工数（Revelio Labs）': 'Employee count (Revelio Labs)',
 '命中制裁名单（精确匹配），强烈建议拒绝交易或咨询法律部门。': 'Matched on sanctions list (exact match); strongly recommend rejecting the '
                                  'transaction or consulting the legal department.',
 '国际': 'International',
 '在': 'at',
 '在已检查的': 'among those checked',
 '地址': 'Address',
 '地点：': 'Location:',
 '域名:': 'Domain:',
 '域名情报未执行': 'Domain intelligence not run',
 '域名情报跳过：': 'Domain intelligence skipped:',
 '域名未找到 MX 邮件服务器，建议谨慎跟进，要求更多公司证明文件。': 'No MX mail server found for the domain; recommend caution in follow-up and '
                                      'requesting more company proof documents.',
 '域名未检测到 MX 记录（可能是假域名）': 'No MX record detected for the domain (possibly a fake domain)',
 '域名注册日期': 'Domain registration date',
 '天（': ' days (',
 '天），按降级处理': ' days), handling as degraded',
 '天，属于新注册域名，配套信息待验证': ' days, a newly registered domain, supporting information pending verification',
 '天，长期运营可信度高': ' days, long-running with high credibility',
 '子域名': 'Subdomain',
 '字段值，照抄来源原文': 'Field value, copied verbatim from the source',
 '字段名，如「注册资本」「法定代表人」「统一社会信用代码」「员工人数」': "Field name, e.g. 'registered capital', 'legal representative', 'unified social "
                                       "credit code', 'number of employees'",
 '字节上限:': 'Byte limit:',
 '字节）:': ' bytes):',
 '实业': 'Industrial',
 '对应的 LinkedIn 公司页（公开页）': 'The corresponding LinkedIn company page (public page)',
 '小时内已成功刷新': 'Successfully refreshed within hours',
 '小时前的数据：': 'Data from hours ago:',
 '小时未更新）': ' hours without update)',
 '小时（超过': ' hours (over',
 '小时）': 'hours)',
 '尚未成功下载': 'Not yet successfully downloaded',
 '尝试直接访问': 'Try direct access',
 '已取消（用户中止）': 'Cancelled (user aborted)',
 '已查到公司登记（': 'Company registration found (',
 '巴西登记：': 'Brazil registration:',
 '建号：': 'Account created:',
 '建议：': 'Recommendation:',
 '张': 'sheets',
 "当前会话的公司 ID。从 system prompt 的 'Trade Context' 段读取；**不要**让用户输入这个值。服务端会校验它与当前会话绑定一致，不一致直接拒绝。": 'Company ID for the '
                                                                                              'current session. Read '
                                                                                              "it from the 'Trade "
                                                                                              "Context' section of the "
                                                                                              'system prompt; **do '
                                                                                              'not** ask the user to '
                                                                                              'enter this value. The '
                                                                                              'server validates that '
                                                                                              'it matches the current '
                                                                                              'session binding and '
                                                                                              'rejects any mismatch.',
 '成立': 'Established',
 '成立年份': 'Founding year',
 '技术': 'Technology',
 '技术栈检测': 'Tech stack detection',
 '挪威登记：': 'Norway registration:',
 '控股': 'Shareholding',
 '数据抓取时间：': 'Data collected at:',
 '数据抓取时间：从未成功下载': 'Data collected at: never successfully downloaded',
 '文件过大（': 'File too large (',
 '新闻：': 'News:',
 '无': 'None',
 '无效域名格式': 'Invalid domain format',
 '无结果': 'No results',
 '时间范围枚举：\n- today / this_week / this_month / this_year 含"现在"（含端点 start，不含结束）；\n- yesterday / last_week / last_month / last_year 不含"现在"（前一周期完整窗口）；\n- all 不限。\n未知值服务端按 all 兜底（fail-safe —— 与 search_history 的旧行为一致）。': 'Time '
                                                                                                                                                                                                                       'range '
                                                                                                                                                                                                                       'enumeration:\n'
                                                                                                                                                                                                                       '- '
                                                                                                                                                                                                                       'today '
                                                                                                                                                                                                                       '/ '
                                                                                                                                                                                                                       'this_week '
                                                                                                                                                                                                                       '/ '
                                                                                                                                                                                                                       'this_month '
                                                                                                                                                                                                                       '/ '
                                                                                                                                                                                                                       'this_year '
                                                                                                                                                                                                                       'include '
                                                                                                                                                                                                                       '"now" '
                                                                                                                                                                                                                       '(start '
                                                                                                                                                                                                                       'inclusive, '
                                                                                                                                                                                                                       'end '
                                                                                                                                                                                                                       'exclusive);\n'
                                                                                                                                                                                                                       '- '
                                                                                                                                                                                                                       'yesterday '
                                                                                                                                                                                                                       '/ '
                                                                                                                                                                                                                       'last_week '
                                                                                                                                                                                                                       '/ '
                                                                                                                                                                                                                       'last_month '
                                                                                                                                                                                                                       '/ '
                                                                                                                                                                                                                       'last_year '
                                                                                                                                                                                                                       'exclude '
                                                                                                                                                                                                                       '"now" '
                                                                                                                                                                                                                       '(full '
                                                                                                                                                                                                                       'previous '
                                                                                                                                                                                                                       'period '
                                                                                                                                                                                                                       'window);\n'
                                                                                                                                                                                                                       '- '
                                                                                                                                                                                                                       'all '
                                                                                                                                                                                                                       'is '
                                                                                                                                                                                                                       'unbounded.\n'
                                                                                                                                                                                                                       'Unknown '
                                                                                                                                                                                                                       'values '
                                                                                                                                                                                                                       'fall '
                                                                                                                                                                                                                       'back '
                                                                                                                                                                                                                       'to '
                                                                                                                                                                                                                       'all '
                                                                                                                                                                                                                       'server-side '
                                                                                                                                                                                                                       '(fail-safe '
                                                                                                                                                                                                                       '— '
                                                                                                                                                                                                                       'consistent '
                                                                                                                                                                                                                       'with '
                                                                                                                                                                                                                       'the '
                                                                                                                                                                                                                       'legacy '
                                                                                                                                                                                                                       'behavior '
                                                                                                                                                                                                                       'of '
                                                                                                                                                                                                                       'search_history).',
 '显示名：': 'Display name:',
 '最大返回条数。默认 20。': 'Maximum number of results to return. Defaults to 20.',
 '有限公司': 'Limited company',
 '有限责任公司': 'Limited liability company',
 '未在任何制裁名单中发现匹配项。': 'No matches found in any sanctions list.',
 '未完成核验': 'Verification not completed',
 '未查到子域名记录': 'No subdomain records found',
 '未查到证书记录': 'No certificate records found',
 '未查（已关闭）：': 'Not checked (disabled):',
 '未检出': 'Not detected',
 '未知': 'Unknown',
 '未知名单类型:': 'Unknown list type:',
 '未知错误': 'Unknown error',
 '未配置合法的联系邮箱（TRADE_CONTACT_EMAIL），SEC 要求 UA 带联系邮箱': 'No valid contact email configured (TRADE_CONTACT_EMAIL); SEC '
                                                    'requires the UA to include a contact email',
 '本地名单尚未按新归一化规则迁移，中文名可能漏查': 'Local lists have not yet been migrated to the new normalization rules; Chinese names may '
                            'be missed',
 '本次刷新失败，沿用': 'Refresh failed this time; reusing',
 '本次已关闭制裁筛查': 'Sanctions screening disabled for this run',
 '本次未发现匹配；但名单已过期：': 'No matches found this time; however, the list is out of date:',
 '本次未查（': 'Not checked this time (',
 '条': 'records',
 '条）': ' records)',
 '条），不构成「无制裁记录」的结论，请通过 OFAC/UN/EU/UK 官网人工复核': " records), which does not constitute a conclusion of 'no sanctions "
                                              "record'; please verify manually via the official OFAC/UN/EU/UK websites",
 '来源 URL（有就填，没有留空）': 'Source URL (fill in if available, leave blank otherwise)',
 '来源站点名，如「企查查」「阿里巴巴」': "Source site name, e.g. 'Qichacha' or 'Alibaba'",
 "查 trade 用户的对话历史（SQLite，按 company_id 严格隔离）。**company_id 必填**——必须传用户在 system prompt 的 Trade Context 段里写明的那个数字，**不能**从用户消息推断，传错会读到其他公司的数据。时间范围默认 'all'；给具体枚举值能精确窗口；recent_days/recent_months 用来表达枚举外的相对区间。": 'Query '
                                                                                                                                                                                                            'trade '
                                                                                                                                                                                                            "users' "
                                                                                                                                                                                                            'conversation '
                                                                                                                                                                                                            'history '
                                                                                                                                                                                                            '(SQLite, '
                                                                                                                                                                                                            'strictly '
                                                                                                                                                                                                            'isolated '
                                                                                                                                                                                                            'by '
                                                                                                                                                                                                            'company_id). '
                                                                                                                                                                                                            '**company_id '
                                                                                                                                                                                                            'is '
                                                                                                                                                                                                            'required** '
                                                                                                                                                                                                            '— '
                                                                                                                                                                                                            'it '
                                                                                                                                                                                                            'must '
                                                                                                                                                                                                            'be '
                                                                                                                                                                                                            'the '
                                                                                                                                                                                                            'number '
                                                                                                                                                                                                            'stated '
                                                                                                                                                                                                            'in '
                                                                                                                                                                                                            'the '
                                                                                                                                                                                                            "user's "
                                                                                                                                                                                                            "'Trade "
                                                                                                                                                                                                            "Context' "
                                                                                                                                                                                                            'section '
                                                                                                                                                                                                            'of '
                                                                                                                                                                                                            'the '
                                                                                                                                                                                                            'system '
                                                                                                                                                                                                            'prompt; '
                                                                                                                                                                                                            '**do '
                                                                                                                                                                                                            'not** '
                                                                                                                                                                                                            'infer '
                                                                                                                                                                                                            'it '
                                                                                                                                                                                                            'from '
                                                                                                                                                                                                            'the '
                                                                                                                                                                                                            "user's "
                                                                                                                                                                                                            'message, '
                                                                                                                                                                                                            'as '
                                                                                                                                                                                                            'a '
                                                                                                                                                                                                            'wrong '
                                                                                                                                                                                                            'value '
                                                                                                                                                                                                            'will '
                                                                                                                                                                                                            'read '
                                                                                                                                                                                                            'another '
                                                                                                                                                                                                            "company's "
                                                                                                                                                                                                            'data. '
                                                                                                                                                                                                            'The '
                                                                                                                                                                                                            'time '
                                                                                                                                                                                                            'range '
                                                                                                                                                                                                            'defaults '
                                                                                                                                                                                                            'to '
                                                                                                                                                                                                            "'all'; "
                                                                                                                                                                                                            'specific '
                                                                                                                                                                                                            'enum '
                                                                                                                                                                                                            'values '
                                                                                                                                                                                                            'give '
                                                                                                                                                                                                            'precise '
                                                                                                                                                                                                            'windows; '
                                                                                                                                                                                                            'recent_days/recent_months '
                                                                                                                                                                                                            'are '
                                                                                                                                                                                                            'used '
                                                                                                                                                                                                            'for '
                                                                                                                                                                                                            'relative '
                                                                                                                                                                                                            'intervals '
                                                                                                                                                                                                            'outside '
                                                                                                                                                                                                            'the '
                                                                                                                                                                                                            'enum.',
 '核对是否有同名个人主页/员工档案，辅助判断决策链': 'Check for same-name personal profiles/employee records to help determine the '
                             'decision-making chain',
 '欧盟制裁名单': 'EU sanctions list',
 '正在分析问题...': 'Analyzing the question...',
 '正在重试（第 {attempt} 次）...': 'Retrying (attempt {attempt})...',
 '没有公司上下文，拒绝创建背调任务': 'No company context; refuse to create a background check task',
 '没有公司上下文，拒绝登记事实': 'No company context; refuse to record facts',
 '没有公司上下文，拒绝读取事实库': 'No company context; refuse to read the fact database',
 '没有公司上下文，拒绝读取背调任务': 'No company context; refuse to read background check tasks',
 '没有可检索的名称': 'No searchable name',
 '没有可检索的用户名': 'No searchable username',
 '没有可用于 EDGAR 的公司名': 'No company name available for EDGAR',
 '没有可用于 GLEIF 的公司名': 'No company name available for GLEIF',
 '没有可用于企业登记的公司名/CNPJ': 'No company name/CNPJ available for business registration',
 '没有可用于州登记的公司名': 'No company name available for state registration',
 '没有可用的 GitHub 搜索线索': 'No GitHub search leads available',
 '法国登记：': 'France registration:',
 '法定名称：': 'Legal name:',
 '注册': 'Register',
 '注册商：': 'Registrar:',
 '注册地：': 'Place of registration:',
 '注册时间：': 'Registration date:',
 '流程地址': 'Process address',
 '状态': 'Status',
 '状态：': 'Status:',
 '用户名': 'Username',
 '用户名相同不等于同一人，未核实': 'Matching usernames do not prove the same person; unverified',
 '用户名跨站检索': 'Cross-site username search',
 '用搜索引擎定位 LinkedIn 公司页（不登录、不触发反爬）': 'Use a search engine to locate the LinkedIn company page (no login, no '
                                    'anti-scraping triggers)',
 '登记一条背调事实（字段 / 值 / 来源），存进本公司的背调事实库。**查到就登记**：下次同目标背调会直接复用，不必再赌一次反爬。同一字段查到不同值时照实再登记一次，系统会标为冲突（报告要并列写出，不要挑一个）。只登记有来源的事实；没有来源的推测不要登记。': 'Register '
                                                                                                                                      'a '
                                                                                                                                      'background-check '
                                                                                                                                      'fact '
                                                                                                                                      '(field '
                                                                                                                                      '/ '
                                                                                                                                      'value '
                                                                                                                                      '/ '
                                                                                                                                      'source) '
                                                                                                                                      'and '
                                                                                                                                      'store '
                                                                                                                                      'it '
                                                                                                                                      'in '
                                                                                                                                      'the '
                                                                                                                                      "company's "
                                                                                                                                      'fact '
                                                                                                                                      'store. '
                                                                                                                                      '**Register '
                                                                                                                                      'it '
                                                                                                                                      'whenever '
                                                                                                                                      'you '
                                                                                                                                      'find '
                                                                                                                                      'it**: '
                                                                                                                                      'the '
                                                                                                                                      'next '
                                                                                                                                      'background '
                                                                                                                                      'check '
                                                                                                                                      'on '
                                                                                                                                      'the '
                                                                                                                                      'same '
                                                                                                                                      'target '
                                                                                                                                      'will '
                                                                                                                                      'reuse '
                                                                                                                                      'it '
                                                                                                                                      'directly, '
                                                                                                                                      'no '
                                                                                                                                      'need '
                                                                                                                                      'to '
                                                                                                                                      'gamble '
                                                                                                                                      'on '
                                                                                                                                      'anti-scraping '
                                                                                                                                      'again. '
                                                                                                                                      'If '
                                                                                                                                      'different '
                                                                                                                                      'values '
                                                                                                                                      'are '
                                                                                                                                      'found '
                                                                                                                                      'for '
                                                                                                                                      'the '
                                                                                                                                      'same '
                                                                                                                                      'field, '
                                                                                                                                      'register '
                                                                                                                                      'it '
                                                                                                                                      'again '
                                                                                                                                      'as-is '
                                                                                                                                      'and '
                                                                                                                                      'the '
                                                                                                                                      'system '
                                                                                                                                      'will '
                                                                                                                                      'mark '
                                                                                                                                      'it '
                                                                                                                                      'as '
                                                                                                                                      'a '
                                                                                                                                      'conflict '
                                                                                                                                      '(the '
                                                                                                                                      'report '
                                                                                                                                      'must '
                                                                                                                                      'list '
                                                                                                                                      'both '
                                                                                                                                      'side '
                                                                                                                                      'by '
                                                                                                                                      'side, '
                                                                                                                                      'do '
                                                                                                                                      'not '
                                                                                                                                      'pick '
                                                                                                                                      'one). '
                                                                                                                                      'Only '
                                                                                                                                      'register '
                                                                                                                                      'facts '
                                                                                                                                      'that '
                                                                                                                                      'have '
                                                                                                                                      'a '
                                                                                                                                      'source; '
                                                                                                                                      'do '
                                                                                                                                      'not '
                                                                                                                                      'register '
                                                                                                                                      'speculation '
                                                                                                                                      'without '
                                                                                                                                      'a '
                                                                                                                                      'source.',
 '登记事实失败：': 'Failed to register fact:',
 '目标不含可查询域名（公司名需先发现官网）': 'Target does not contain a queryable domain (for a company name, discover the official '
                         'website first)',
 '目标不含域名': 'Target does not contain a domain',
 '目标不是邮箱': 'Target is not an email address',
 '目标中没有 EU VAT 号': 'No EU VAT number in the target',
 '目标名不含域名（人名/公司名需先发现官网）': 'Target name does not contain a domain (for a person/company name, discover the official '
                          'website first)',
 '目标（公司名 / 域名 / 人名）；不填则列出全部已登记事实': 'Target (company name / domain / person name); leave blank to list all registered '
                                   'facts',
 '科技': 'Technology',
 '科罗拉多州登记：': 'Colorado registration:',
 '秒）': ' seconds)',
 '简介：': 'Profile:',
 '纽约州登记：': 'New York registration:',
 '组织号': 'Organization number',
 '综合评分：': 'Overall score:',
 '网址:': 'Website:',
 '网站抓取失败：': 'Website scraping failed:',
 '美国 OFAC SDN 名单': 'US OFAC SDN list',
 '美国 OFAC 非 SDN 名单': 'US OFAC non-SDN list',
 '美国州公司登记': 'US state company registrations',
 '美国综合筛查名单 (CSL)': 'US Consolidated Screening List (CSL)',
 '联合国安理会制裁名单': 'UN Security Council sanctions list',
 '股份有限公司': 'Joint-stock company',
 '背调目标，例如 acme.com / domain:acme.com / person:"Jane Doe" / username:janedoe': 'Background-check target, e.g. acme.com '
                                                                              '/ domain:acme.com / person:"Jane Doe" / '
                                                                              'username:janedoe',
 '英国制裁名单': 'UK sanctions list',
 '被动 DNS 不可用：': 'Passive DNS unavailable:',
 '被动 DNS 子域名': 'Passive DNS subdomains',
 '被动 DNS 无响应': 'Passive DNS no response',
 '被动 DNS 查询失败：': 'Passive DNS query failed:',
 '要求对方提供企业邮箱后再深入谈判。个人邮箱无法确认公司真实性。': 'Ask the other party to provide a corporate email address before continuing '
                                    "negotiations. A personal email cannot confirm the company's authenticity.",
 '解析条目剧烈缩水（': 'Parsed entries shrank significantly (',
 '解析结果为空（主名': 'Parsing result is empty (primary name',
 '解析结果为空，拒绝覆盖旧名单（主名': 'Parsing result is empty, refusing to overwrite the old list (primary name',
 '证书': 'Certificate',
 '证书透明度（CT）': 'Certificate Transparency (CT)',
 '该邮箱没有 Gravatar 公开资料': 'This email has no public Gravatar profile',
 '说明：': 'Note:',
 "请先用 web_search 执行上面的 site:linkedin.com dork，再尝试打开公司页，验证：\n1. 公司 '": 'First run the site:linkedin.com dork above with '
                                                                      'web_search, then try to open the company page '
                                                                      'and verify:\n'
                                                                      "1. Company '",
 '读取事实库失败：': 'Failed to read fact store:',
 '读取后台背调任务的当前状态与结果（不阻塞）。status 为 done 时 report 是完整结构化报告；running 时 events 是到目前为止的逐来源进度；cancelled/partial/failed 表示任务未完成。': 'Read '
                                                                                                                          'the '
                                                                                                                          'current '
                                                                                                                          'status '
                                                                                                                          'and '
                                                                                                                          'results '
                                                                                                                          'of '
                                                                                                                          'a '
                                                                                                                          'background-check '
                                                                                                                          'task '
                                                                                                                          'in '
                                                                                                                          'the '
                                                                                                                          'background '
                                                                                                                          '(non-blocking). '
                                                                                                                          'When '
                                                                                                                          'status '
                                                                                                                          'is '
                                                                                                                          'done, '
                                                                                                                          'report '
                                                                                                                          'is '
                                                                                                                          'the '
                                                                                                                          'complete '
                                                                                                                          'structured '
                                                                                                                          'report; '
                                                                                                                          'when '
                                                                                                                          'running, '
                                                                                                                          'events '
                                                                                                                          'is '
                                                                                                                          'the '
                                                                                                                          'per-source '
                                                                                                                          'progress '
                                                                                                                          'so '
                                                                                                                          'far; '
                                                                                                                          'cancelled/partial/failed '
                                                                                                                          'means '
                                                                                                                          'the '
                                                                                                                          'task '
                                                                                                                          'did '
                                                                                                                          'not '
                                                                                                                          'complete.',
 '读取本公司的背调事实库（此前已核实的字段 / 值 / 来源）。给了 target 就只读该目标；不填就列出全部。conflict=true 的字段说明两次查到了不同值 —— 报告里要并列写出两个值并标注来源。': 'Read the '
                                                                                                             "company's "
                                                                                                             'background-check '
                                                                                                             'fact '
                                                                                                             'store '
                                                                                                             '(previously '
                                                                                                             'verified '
                                                                                                             'fields / '
                                                                                                             'values / '
                                                                                                             'sources). '
                                                                                                             'If a '
                                                                                                             'target '
                                                                                                             'is '
                                                                                                             'given, '
                                                                                                             'only '
                                                                                                             'read '
                                                                                                             'that '
                                                                                                             'target; '
                                                                                                             'if left '
                                                                                                             'blank, '
                                                                                                             'list '
                                                                                                             'all. A '
                                                                                                             'field '
                                                                                                             'with '
                                                                                                             'conflict=true '
                                                                                                             'means '
                                                                                                             'different '
                                                                                                             'values '
                                                                                                             'were '
                                                                                                             'found '
                                                                                                             'twice — '
                                                                                                             'the '
                                                                                                             'report '
                                                                                                             'must '
                                                                                                             'list '
                                                                                                             'both '
                                                                                                             'values '
                                                                                                             'side by '
                                                                                                             'side and '
                                                                                                             'note '
                                                                                                             'their '
                                                                                                             'sources.',
 '读取背调任务失败：': 'Failed to read background-check task:',
 '账号：': 'Account:',
 '贸易': 'Trade',
 '超时': 'Timeout',
 '超时（': 'Timeout (',
 '这条事实属于哪个目标（公司名 / 域名 / 人名）': 'Which target does this fact belong to (company name / domain / person name)',
 '进出口': 'Import/Export',
 '邮箱域名与网站域名不一致': 'Email domain does not match website domain',
 '邮箱域名与网站域名不匹配，建议交叉验证对方公司身份。': 'The email domain does not match the website domain; cross-verification of the other '
                               "party's company identity is recommended.",
 '邮箱格式无效': 'Invalid email format',
 '邮箱注册检测': 'Email registration check',
 '重定向到非允许的名单主机，拒绝下载:': 'Redirected to a non-allowed list host, download refused:',
 '集团': 'Group',
 '集团有限公司': 'Group Co., Ltd.',
 '需要 PRIM/ALT/ADD 三个文件': 'Three files PRIM/ALT/ADD are required',
 '非官方名单主机，拒绝下载:': 'Unofficial list host, download refused:',
 '预算耗尽，未执行': 'Budget exhausted, not executed',
 '风险旗标：': 'Risk flags:',
 '首次快照：': 'First snapshot:',
 '高风险': 'High risk',
 '（MX 查询未成：': '(MX lookup failed:',
 '（UTC，取自本地库）': '(UTC, taken from local database)',
 '（注册代理/邮寄地址，非经营地证明）': '(registered agent / mailing address, not proof of business location)',
 '（登记地址）': '(registered address)',
 '（类型：': '(Type:',
 '）——本项缺失 120+ 平台的注册记录核查，如需该能力请联系支持安装 holehe': ')—This item lacks a check of registration records across 120+ '
                                               'platforms; to enable this capability, please contact support to '
                                               'install holehe',
 '）是否有 LinkedIn 公司主页\n2. 如果有，公司规模（员工数）、所属行业、成立年份\n3. 公司主页域名是否与': ') whether there is a LinkedIn company page\n'
                                                                 '2. If so, company size (number of employees), '
                                                                 'industry, and year founded\n'
                                                                 '3. Whether the company page domain matches',
 '），不构成「无制裁记录」的结论。': '), this does not constitute a conclusion of "no sanctions record".',
 '），不能作为「无风险」的依据': '), cannot be used as a basis for "no risk"',
 '），保留上次成功数据': '), retaining the last successful data',
 '），可能代表公司规模较小': '), may indicate a smaller company size',
 '），域名匹配且 MX 记录正常': '), domain matches and MX records are normal',
 '），域名注册时间/持有者未知': '), domain registration date/holder unknown',
 '），建议稍后重试或换网络环境再查。': '), please retry later or try again from a different network environment.',
 '），建议要求对方提供企业邮箱后再深入谈判': '), it is recommended to request a corporate email from the other party before proceeding '
                         'with negotiations',
 '），技术栈未能验证': '), the technology stack could not be verified',
 '），本次**不构成「无制裁记录」的结论**。请稍后重试，或通过官方渠道（OFAC/UN/EU/UK 官网）人工复核后再决策。': '), this time **does not constitute a conclusion of '
                                                                   '"no sanctions record"**. Please retry later, or '
                                                                   'manually verify through official channels '
                                                                   '(OFAC/UN/EU/UK official websites) before making a '
                                                                   'decision.',
 '），结论为「未完成」，**不代表低风险**；原因与补齐方式见下方各层说明': '), the conclusion is "incomplete", **does not mean low risk**; see the layer '
                                         'descriptions below for the reasons and how to complete it',
 '）；是否同一人需人工确认': '); whether it is the same person requires manual confirmation',
 '）；登记只证明主体存在，不证明经营真实性。补充官网、域名或其它核验来源后再评级。': '); registration only proves that the entity exists, not the authenticity '
                                             'of its operations. Please add an official website, domain, or other '
                                             'verification source before rating.',
 '，成立于': ', founded in',
 '，成立日期未提供': ', founding date not provided',
 '，最早': ', earliest',
 '，本次未完成比对': ', comparison was not completed this time',
 '，源行': ', source line',
 '，置信': ', confidence',
 '：已注册': ': registered',
 '：无效（': ': invalid (',
 '：有效': ': valid',
 '；名称：': '; Name:',
 '；地址：': '; Address:',
 '；子域名：': '; Subdomains:',
 '｜ ⚠ 降级：名单尚未成功下载（本地': ' | ⚠ Degraded: the list has not been downloaded successfully (local',
 '｜ 企业级=': ' | Enterprise=',
 '｜ 创建=': ' | Created=',
 '｜ 已注册=': ' | Registered=',
 '｜ 年龄=': ' | Age=',
 '｜ 服务器=': ' | Server=',
 '｜ 覆盖': ' | Coverage',
 '｜ 风险=': ' | Risk=',
 '｜ 风险等级：': ' | Risk level:',
 '🔍 LinkedIn 验证需要通过浏览器访问 LinkedIn 完成。请使用 browser_navigate 工具按 linkedin 层的 steps 指令执行验证。': '🔍 LinkedIn verification '
                                                                                          'must be completed by '
                                                                                          'visiting LinkedIn in a '
                                                                                          'browser. Please use the '
                                                                                          'browser_navigate tool and '
                                                                                          'follow the steps '
                                                                                          'instructions for the '
                                                                                          'linkedin layer to perform '
                                                                                          'the verification.',
 '🚨 命中制裁名单，建议拒绝交易或咨询法律部门': '🚨 Sanctions list match; recommend declining the transaction or consulting the legal '
                           'department',
 '🚫 本次背调未完成核验（': '🚫 This background check did not complete verification ('}

_AR = {"'（域名": "' (النطاق",
 'CT 查询失败（': 'فشل استعلام CT (',
 'EDGAR 无有效响应': 'لا توجد استجابة صالحة من EDGAR',
 'EDGAR 无申报记录': 'لا توجد سجلات إيداع في EDGAR',
 'EDGAR 查询失败：': 'فشل استعلام EDGAR:',
 'EU VIES 增值税核验': 'التحقق من ضريبة القيمة المضافة عبر EU VIES',
 'FR/NO/BR 未查到匹配登记': 'لم يتم العثور على تسجيل مطابق في FR/NO/BR',
 'GDELT 新闻': 'أخبار GDELT',
 'GDELT 无有效响应': 'لا توجد استجابة صالحة من GDELT',
 'GDELT 无相关新闻': 'لا توجد أخبار ذات صلة في GDELT',
 'GDELT 查询失败：': 'فشل استعلام GDELT:',
 'GLEIF LEI 登记': 'تسجيل LEI في GLEIF',
 'GLEIF 无匹配记录': 'لا توجد سجلات مطابقة في GLEIF',
 'GLEIF 查询失败：': 'فشل استعلام GLEIF:',
 'GLEIF 结果与目标名称不吻合，未采用': 'نتيجة GLEIF لا تتطابق مع اسم الهدف؛ لم يتم اعتمادها',
 'GitHub 候选资料均不可读': 'جميع الملفات الشخصية المرشحة على GitHub غير قابلة للقراءة',
 'GitHub 公开资料': 'الملف العام على GitHub',
 'GitHub 搜索无结果': 'لا توجد نتائج بحث على GitHub',
 'GitHub 查询失败：': 'فشل استعلام GitHub:',
 'GitHub 用户不存在或查询失败': 'مستخدم GitHub غير موجود أو فشل الاستعلام',
 'Gravatar 公开资料': 'الملف العام على Gravatar',
 'Gravatar 查询失败：': 'فشل استعلام Gravatar:',
 'Gravatar 画像未与目标独立核实': 'صورة Gravatar لم يتم التحقق منها بشكل مستقل مقابل الهدف',
 'Gravatar 资料为空': 'الملف الشخصي على Gravatar فارغ',
 'HTTP GET 失败 [%s]: %s': 'فشل HTTP GET [%s]: %s',
 'LinkedIn 公司页': 'صفحة الشركة على LinkedIn',
 'LinkedIn 核查': 'التحقق عبر LinkedIn',
 'MX 查询失败：': 'فشل استعلام MX:',
 'MX 记录未能验证（': 'تعذر التحقق من سجلات MX (',
 'NY/CO 未查到匹配登记': 'لم يتم العثور على تسجيل مطابق في NY/CO',
 'RDAP 域名注册': 'تسجيل النطاق عبر RDAP',
 'RDAP 无响应或返回非 JSON': 'لم يُرجع RDAP استجابة أو أعاد بيانات غير JSON',
 'RDAP 未返回注册信息': 'لم يُرجع RDAP معلومات التسجيل',
 'RDAP 查询失败：': 'فشل استعلام RDAP:',
 'RDAP 返回结构异常': 'أعاد RDAP بنية غير متوقعة',
 'SEC EDGAR 申报': 'إيداع SEC EDGAR',
 'SEC 申报：': 'إيداع SEC:',
 'Tavily 公司库': 'قاعدة شركات Tavily',
 'VIES 判定无效': 'قرر VIES أن الرقم غير صالح',
 'VIES 无有效响应': 'لا توجد استجابة صالحة من VIES',
 'VIES 查询失败：': 'فشل استعلام VIES:',
 'WHOIS 域名情报': 'معلومات نطاق WHOIS',
 'WHOIS 服务器无响应': 'لم يستجب خادم WHOIS',
 'WHOIS 查询失败：': 'فشل استعلام WHOIS:',
 'Wayback 无响应或返回非 JSON': 'لم يُرجع Wayback استجابة أو أعاد بيانات غير JSON',
 'Wayback 无快照': 'لا توجد لقطة من Wayback',
 'Wayback 查询失败：': 'فشل استعلام Wayback:',
 'Wayback 首次快照': 'أول لقطة من Wayback',
 'WhatsMyName 数据集不可用': 'مجموعة بيانات WhatsMyName غير متاحة',
 '] 失败：': '] فشل:',
 '] 未查到（': '] لم يتم العثور عليه (',
 '] 跳过（': '] تم التخطي (',
 'fetched_at 无法解析，按过期数据处理': 'تعذر تحليل fetched_at؛ ستُعامل كبيانات قديمة',
 'holehe 未执行或失败：': 'لم يتم تشغيل holehe أو فشل:',
 'osint_job_start 返回的 job_id': 'job_id الذي أعاده osint_job_start',
 'target / field / value 都是必填': 'target / field / value كلها مطلوبة',
 '· 红旗：': '· علامات تحذير:',
 '—（仅完成制裁筛查）': '— (اكتمل فحص العقوبات فقط)',
 '—（未完成核验）': '— (لم يكتمل التحقق)',
 '① 邮箱注册检测：未执行（目标不是邮箱）': '① فحص تسجيل البريد الإلكتروني: لم يُنفذ (الهدف ليس بريداً إلكترونياً)',
 '① 邮箱注册检测：查了': '① فحص تسجيل البريد الإلكتروني: تم الفحص',
 '① 邮箱注册检测：超时 ——': '① فحص تسجيل البريد الإلكتروني: انتهت المهلة ——',
 '① 邮箱注册检测：降级 ——': '① فحص تسجيل البريد الإلكتروني: متدنٍ ——',
 '② 域名情报：': '② معلومات النطاق:',
 '② 域名情报：未执行（无法从目标提取域名）': '② معلومات النطاق: لم تُنفذ (تعذر استخراج نطاق من الهدف)',
 '② 域名情报：超时 ——': '② معلومات النطاق: انتهت المهلة ——',
 '② 域名情报：跳过（': '② معلومات النطاق: تم التخطي (',
 '② 域名情报：降级 ——': '② معلومات النطاق: متدنية ——',
 '③ 企业邮箱验证：个人邮箱=': '③ التحقق من بريد الشركة: بريد شخصي=',
 '③ 企业邮箱验证：未执行（目标不是邮箱）': '③ التحقق من بريد الشركة: لم تُنفذ (الهدف ليس عنوان بريد إلكتروني)',
 '③ 企业邮箱验证：超时 ——': '③ التحقق من بريد الشركة: انتهت المهلة ——',
 '④ 技术栈检测：': '④ الكشف عن مجموعة التقنيات:',
 '④ 技术栈检测：未执行': '④ الكشف عن مجموعة التقنيات: لم تُنفذ',
 '④ 技术栈检测：超时 ——': '④ الكشف عن مجموعة التقنيات: انتهت المهلة ——',
 '④ 技术栈检测：降级 ——': '④ الكشف عن مجموعة التقنيات: متدنٍ ——',
 '⑤ 制裁名单筛查：命中=': '⑤ فحص قوائم العقوبات: تطابقات=',
 '⑤ 制裁名单筛查：未执行': '⑤ فحص قوائم العقوبات: لم يُنفذ',
 '⑥ LinkedIn 核查：已生成操作指令（**需人工/浏览器实际执行后才能下结论**）：': '⑥ التحقق من LinkedIn: تم إنشاء تعليمات التنفيذ (لا يمكن التوصل إلى '
                                                  'استنتاج إلا بعد التنفيذ الفعلي يدوياً/عبر المتصفح):',
 '⑥ LinkedIn 核查：未执行': '⑥ التحقق من LinkedIn: لم يُنفذ',
 '⑦ 公开来源：': '⑦ المصادر المفتوحة:',
 '══ 背调报告：': '══ تقرير فحص الخلفية:',
 '⚠ 制裁名单过期：': '⚠ انتهت صلاحية قائمة العقوبات:',
 '⚠ 未核验：': '⚠ غير مُتحقق منه:',
 '⚠️ WHOIS 域名信息未能核验（': '⚠️ تعذر التحقق من معلومات نطاق WHOIS (',
 '⚠️ 制裁名单尚未成功下载（': '⚠️ لم يتم تنزيل قائمة العقوبات بنجاح بعد (',
 '⚠️ 制裁名单尚未成功下载（本地可用': '⚠️ لم يتم تنزيل قائمة العقوبات بنجاح بعد (متوفرة محلياً',
 '⚠️ 发现疑似制裁匹配，建议进一步人工核查': '⚠️ تم العثور على تطابق محتمل مع العقوبات؛ يُنصح بمزيد من التحقق اليدوي',
 '⚠️ 域名注册仅': '⚠️ النطاق مسجّل فقط',
 '⚠️ 对方使用个人邮箱（': '⚠️ يستخدم الطرف المقابل بريداً إلكترونياً شخصياً (',
 '⚠️ 本地名单尚未按新归一化规则迁移（旧数据可能漏查中文名），本次**不构成「无制裁记录」的结论**。请稍后重试，或通过官方渠道（OFAC/UN/EU/UK 官网）人工复核后再决策。': '⚠️ لم تتم بعد ترحيل '
                                                                                                'القائمة المحلية إلى '
                                                                                                'قواعد التطبيع الجديدة '
                                                                                                '(قد تتجاهل البيانات '
                                                                                                'القديمة الأسماء '
                                                                                                'الصينية)، وهذا لا '
                                                                                                'يُعد استنتاجاً بـ«عدم '
                                                                                                'وجود سجل عقوبات». '
                                                                                                'يُرجى إعادة المحاولة '
                                                                                                'لاحقاً، أو التحقق '
                                                                                                'يدوياً عبر القنوات '
                                                                                                'الرسمية (المواقع '
                                                                                                'الرسمية لـ '
                                                                                                'OFAC/UN/EU/UK) قبل '
                                                                                                'اتخاذ القرار.',
 '⚠️ 本次仅完成制裁筛查（无域名、公开来源未命中），**不是低风险结论**；补齐官网或公司注册信息后请重新背调': '⚠️ لم يُنجز هذه المرة سوى فحص العقوبات (لا يوجد نطاق، ولا '
                                                            'تطابقات من المصادر المفتوحة)؛ هذا ليس استنتاجاً منخفض '
                                                            'المخاطر. يُرجى إعادة فحص الخلفية بعد استكمال الموقع '
                                                            'الرسمي أو معلومات تسجيل الشركة.',
 '⚠️ 网站使用免费建站平台（': '⚠️ يستخدم الموقع منصة مجانية لإنشاء المواقع (',
 '⚠️ 网站无法访问或抓取失败（': '⚠️ تعذر الوصول إلى الموقع أو فشل الزحف إليه (',
 '⚠️ 邮箱注册检测未执行（': '⚠️ لم يُنفذ فحص تسجيل البريد الإلكتروني (',
 '✅ 企业邮箱验证通过（': '✅ اجتاز بريد الشركة التحقق (',
 '✅ 域名注册已': '✅ النطاق مسجّل',
 '✅ 未在任何制裁名单中发现匹配项': '✅ لم يتم العثور على تطابقات في أي قائمة عقوبات',
 '✅ 网站使用企业级技术栈，可信度 +1': '✅ يستخدم الموقع مجموعة تقنيات بمستوى المؤسسات؛ المصداقية +1',
 '✗ --budget 必须大于 0（收到': '✗ يجب أن يكون --budget أكبر من 0 (تم استلام ',
 '✗ --budget 需要数字（收到': '✗ يتطلب --budget رقماً (تم استلام ',
 '✗ --target 与位置参数不能同时使用。': '✗ لا يمكن استخدام --target مع الوسائط الموضعية في الوقت نفسه.',
 '✗ 一次只接受一个目标（收到': '✗ يُقبل هدف واحد فقط في المرة (تم استلام ',
 '✗ 背调执行失败：': '✗ فشل تنفيذ فحص الخلفية: ',
 '。结论以最新官方数据为准，建议稍后重试。': '. يعتمد الاستنتاج على أحدث البيانات الرسمية؛ يُنصح بإعادة المحاولة لاحقاً.',
 '一致\n4. 综合评估公司在线存在的真实性\n\n将验证结果填入 OSINT 报告的 ## LinkedIn 部分。': 'متطابق\n'
                                                               '4. قيّم بشكل شامل مدى صحة وجود الشركة على الإنترنت\n'
                                                               '\n'
                                                               'أدرج نتائج التحقق في قسم ## LinkedIn من تقرير OSINT.',
 '下载超过': 'تم تنزيل أكثر من ',
 '不支持的顶级域名: .': 'نطاق المستوى الأعلى غير مدعوم: .',
 '个': ' ',
 '个平台，命中': ' منصات، تطابق ',
 '个站点中未发现公开 profile': ' مواقع لم يُعثر فيها على profile عام',
 '个站点存在公开 profile（': ' مواقع فيها profile عام (',
 '个）。': ').',
 '个：': ': ',
 '中风险': 'مخاطرة متوسطة',
 '主要产品': 'المنتجات الرئيسية',
 '事实内容为空或过长，未登记': 'محتوى الحقيقة فارغ أو طويل جداً؛ لم يُسجّل',
 '人名:': 'اسم الشخص:',
 '仅完成制裁筛查': 'اكتمل فحص العقوبات فقط',
 '仅完成制裁筛查：目标没有可查询域名，公开来源也没有实质核验命中；这不是低风险结论。补到官网或公司注册信息后请重新背调。': 'لم يُنجز سوى فحص العقوبات: لا يوجد لدى الهدف نطاق '
                                                                'قابل للاستعلام، ولم تسفر المصادر المفتوحة عن تطابقات '
                                                                'تحقق جوهرية؛ هذا ليس استنتاجاً منخفض المخاطر. يُرجى '
                                                                'إعادة فحص الخلفية بعد إضافة الموقع الرسمي أو معلومات '
                                                                'تسجيل الشركة.',
 '企业:': 'الشركة:',
 '企业邮箱验证通过，域名匹配且 MX 记录正常。': 'اجتاز بريد الشركة التحقق، والنطاق مطابق، وسجلات MX سليمة.',
 '低风险': 'مخاطرة منخفضة',
 '使用个人邮箱域名': 'يستخدم نطاق بريد إلكتروني شخصي',
 '免费建站平台=': 'منصة إنشاء مواقع مجانية=',
 '公司': 'شركة',
 '公司:': 'الشركة:',
 '公司|集团|工厂|贸易|有限|股份': 'شركة|مجموعة|مصنع|تجارة|محدودة|مساهمة',
 '公开仓库：': 'المستودعات العامة:',
 '公开登记库': 'السجلات العامة',
 '关注者：': 'المتابعون:',
 '其他企业登记（FR/NO/BR）': 'سجلات أعمال أخرى (FR/NO/BR)',
 '写入 tokenizer 版本标记失败（下次仍会全量刷新）': 'فشل كتابة علامة إصدار الـ tokenizer (سيتم إجراء تحديث كامل في المرة القادمة)',
 '创建背调任务失败：': 'فشل إنشاء مهمة فحص الخلفية:',
 '到期时间：': 'تاريخ الانتهاء:',
 '制裁名单刷新失败: %s — %s': 'فشل تحديث قائمة العقوبات: %s — %s',
 '制裁名单刷新失败，%.0f 秒后重试': 'فشل تحديث قائمة العقوبات، إعادة المحاولة بعد %.0f ثانية',
 '制裁名单刷新完成: %s（主名 %d，别名 %d，源行数 %d）': 'اكتمل تحديث قائمة العقوبات: %s (الأسماء الأساسية %d، الأسماء المستعارة %d، صفوف '
                                     'المصدر %d)',
 '制裁名单后台刷新异常': 'خطأ في التحديث الخلفي لقائمة العقوبات',
 '制裁名单筛查': 'فحص قائمة العقوبات',
 '制裁名单筛查未完成（': 'لم يكتمل فحص قائمة العقوبات (',
 '制裁名单筛查未返回结果': 'لم يُرجع فحص قائمة العقوبات أي نتائج',
 '制裁库归一化迁移失败，本次结果可能漏查中文名': 'فشلت عملية ترحيل تسوية قاعدة بيانات العقوبات؛ قد تفتقد هذه النتيجة الأسماء الصينية',
 '制裁库归一化迁移完成（%d 条）': 'اكتملت عملية ترحيل تسوية قاعدة بيانات العقوبات (%d سجلًا)',
 '制裁筛查': 'فحص العقوبات',
 '县': 'مقاطعة',
 '发现同名个人匹配（非精确）：姓名相同不足以确认身份，需人工核对出生日期、国籍或证件号后再决定。': 'تم العثور على تطابق لفرد بالاسم نفسه (غير دقيق): الاسم المتطابق '
                                                    'وحده لا يكفي لتأكيد الهوية؛ يُرجى التحقق يدويًا من تاريخ الميلاد '
                                                    'أو الجنسية أو رقم الهوية قبل اتخاذ القرار.',
 '发现弱匹配（非精确），建议记录并持续观察。': 'تم العثور على تطابق ضعيف (غير دقيق)؛ يُنصح بتسجيله والاستمرار في مراقبته.',
 '发现疑似匹配项，建议进一步人工核查，确认是否为同一家公司。': 'تم العثور على تطابق محتمل؛ يُنصح بإجراء تحقق يدوي إضافي للتأكد مما إذا كانت الشركة '
                                  'نفسها.',
 '只看 seq 之后的增量事件（默认 0 = 最近 50 条）': 'عرض الأحداث الإضافية بعد seq فقط (الافتراضي 0 = آخر 50 سجلًا)',
 "可选。过去 N 个月（含本月）。逐月回退，遇 1 月走 12/去年。用于 '前几个月' 这类模糊词。**与 time_range 互斥**。": 'اختياري. الأشهر N الماضية (بما في ذلك '
                                                                           'الشهر الحالي). يتراجع شهرًا بشهر، وإذا بلغ '
                                                                           'يناير ينتقل إلى ديسمبر من السنة السابقة. '
                                                                           "يُستخدم للعبارات الغامضة مثل 'الأشهر "
                                                                           "القليلة الماضية'. **يتعارض مع "
                                                                           'time_range**.',
 "可选。过去 N 天（含今天）的窗口，start = (now - (N-1) 天) 的 00:00。注意 N=1 等价于 'today'（今天 00:00 起），**不是** 'yesterday' —— 要昨天的数据请用 time_range='yesterday'。用于表达枚举表里没有的相对区间（如 '上上周三' = 14）。**与 time_range 互斥**：若都给了本参数优先；建议在 augment_prompt 里告诉 LLM 不要同时给。": 'اختياري. '
                                                                                                                                                                                                                                          'نافذة '
                                                                                                                                                                                                                                          'الأيام '
                                                                                                                                                                                                                                          'N '
                                                                                                                                                                                                                                          'الماضية '
                                                                                                                                                                                                                                          '(بما '
                                                                                                                                                                                                                                          'في '
                                                                                                                                                                                                                                          'ذلك '
                                                                                                                                                                                                                                          'اليوم)، '
                                                                                                                                                                                                                                          'حيث '
                                                                                                                                                                                                                                          'start '
                                                                                                                                                                                                                                          '= '
                                                                                                                                                                                                                                          'الساعة '
                                                                                                                                                                                                                                          '00:00 '
                                                                                                                                                                                                                                          'من '
                                                                                                                                                                                                                                          '(الآن '
                                                                                                                                                                                                                                          '- '
                                                                                                                                                                                                                                          '(N-1) '
                                                                                                                                                                                                                                          'يومًا). '
                                                                                                                                                                                                                                          'لاحظ '
                                                                                                                                                                                                                                          'أن '
                                                                                                                                                                                                                                          'N=1 '
                                                                                                                                                                                                                                          'تعادل '
                                                                                                                                                                                                                                          "'today' "
                                                                                                                                                                                                                                          '(بدءًا '
                                                                                                                                                                                                                                          'من '
                                                                                                                                                                                                                                          '00:00 '
                                                                                                                                                                                                                                          'اليوم)، '
                                                                                                                                                                                                                                          '**ليس** '
                                                                                                                                                                                                                                          "'yesterday' "
                                                                                                                                                                                                                                          '— '
                                                                                                                                                                                                                                          'للحصول '
                                                                                                                                                                                                                                          'على '
                                                                                                                                                                                                                                          'بيانات '
                                                                                                                                                                                                                                          'الأمس '
                                                                                                                                                                                                                                          'استخدم '
                                                                                                                                                                                                                                          "time_range='yesterday'. "
                                                                                                                                                                                                                                          'يُستخدم '
                                                                                                                                                                                                                                          'للتعبير '
                                                                                                                                                                                                                                          'عن '
                                                                                                                                                                                                                                          'النطاقات '
                                                                                                                                                                                                                                          'النسبية '
                                                                                                                                                                                                                                          'غير '
                                                                                                                                                                                                                                          'الموجودة '
                                                                                                                                                                                                                                          'في '
                                                                                                                                                                                                                                          'جدول '
                                                                                                                                                                                                                                          'التعداد '
                                                                                                                                                                                                                                          '(مثل '
                                                                                                                                                                                                                                          "'الأربعاء "
                                                                                                                                                                                                                                          'قبل '
                                                                                                                                                                                                                                          "الماضي' "
                                                                                                                                                                                                                                          '= '
                                                                                                                                                                                                                                          '14). '
                                                                                                                                                                                                                                          '**يتعارض '
                                                                                                                                                                                                                                          'مع '
                                                                                                                                                                                                                                          'time_range**: '
                                                                                                                                                                                                                                          'إذا '
                                                                                                                                                                                                                                          'قُدما '
                                                                                                                                                                                                                                          'معًا '
                                                                                                                                                                                                                                          'فإن '
                                                                                                                                                                                                                                          'هذا '
                                                                                                                                                                                                                                          'المعامل '
                                                                                                                                                                                                                                          'له '
                                                                                                                                                                                                                                          'الأولوية؛ '
                                                                                                                                                                                                                                          'يُنصح '
                                                                                                                                                                                                                                          'بإخبار '
                                                                                                                                                                                                                                          'الـ '
                                                                                                                                                                                                                                          'LLM '
                                                                                                                                                                                                                                          'في '
                                                                                                                                                                                                                                          'augment_prompt '
                                                                                                                                                                                                                                          'بعدم '
                                                                                                                                                                                                                                          'تقديمهما '
                                                                                                                                                                                                                                          'معًا.',
 '同名候选，未核实（Gravatar 邮箱画像）：': 'مرشح بالاسم نفسه، غير موثّق (صورة Gravatar للبريد الإلكتروني):',
 '同名候选，未核实（用户名跨站）：': 'مرشح بالاسم نفسه، غير موثّق (اسم المستخدم عبر المواقع):',
 '同名候选，未核实（缺域名/公司吻合证据）': 'مرشح بالاسم نفسه، غير موثّق (لا يوجد دليل على تطابق النطاق/الشركة)',
 '同名候选，未核实：': 'مرشح بالاسم نفسه، غير موثّق:',
 '名单尚未成功下载（本地可用': 'لم يتم تنزيل القائمة بنجاح بعد (متاحة محليًا',
 '名单已过期': 'القائمة منتهية الصلاحية',
 '名单解析结果为 0 条，按降级处理': 'أسفر تحليل القائمة عن 0 سجل، تُعامل كحالة تدهور',
 '员工数': 'عدد الموظفين',
 '员工数（PitchBook）': 'عدد الموظفين (PitchBook)',
 '员工数（Revelio Labs）': 'عدد الموظفين (Revelio Labs)',
 '命中制裁名单（精确匹配），强烈建议拒绝交易或咨询法律部门。': 'تطابق مع قائمة العقوبات (تطابق تام)؛ يُوصى بشدة برفض الصفقة أو استشارة القسم '
                                  'القانوني.',
 '国际': 'دولي',
 '在': 'في',
 '在已检查的': 'من بين ما تم فحصه',
 '地址': 'العنوان',
 '地点：': 'الموقع:',
 '域名:': 'النطاق:',
 '域名情报未执行': 'لم يتم تشغيل استخبارات النطاق',
 '域名情报跳过：': 'تم تخطي استخبارات النطاق:',
 '域名未找到 MX 邮件服务器，建议谨慎跟进，要求更多公司证明文件。': 'لم يتم العثور على خادم بريد MX للنطاق؛ يُنصح بالحذر في المتابعة وطلب المزيد من '
                                      'مستندات إثبات الشركة.',
 '域名未检测到 MX 记录（可能是假域名）': 'لم يتم رصد سجل MX للنطاق (قد يكون نطاقًا وهميًا)',
 '域名注册日期': 'تاريخ تسجيل النطاق',
 '天（': ' يوم (',
 '天），按降级处理': ' يوم)، تُعامل كحالة تدهور',
 '天，属于新注册域名，配套信息待验证': ' يومًا، نطاق مسجّل حديثًا، والمعلومات المصاحبة قيد التحقق',
 '天，长期运营可信度高': ' يومًا، تشغيل طويل الأمد بمصداقية عالية',
 '子域名': 'نطاق فرعي',
 '字段值，照抄来源原文': 'قيمة الحقل، منسوخة حرفيًا من المصدر',
 '字段名，如「注册资本」「法定代表人」「统一社会信用代码」「员工人数」': "اسم الحقل، مثل 'رأس المال المسجّل' و'الممثل القانوني' و'رمز الائتمان الاجتماعي "
                                       "الموحّد' و'عدد الموظفين'",
 '字节上限:': 'الحد الأقصى للبايتات:',
 '字节）:': ' بايت):',
 '实业': 'صناعي',
 '对应的 LinkedIn 公司页（公开页）': 'صفحة الشركة المقابلة على LinkedIn (صفحة عامة)',
 '小时内已成功刷新': 'تم التحديث بنجاح خلال ساعات',
 '小时前的数据：': 'بيانات من قبل ساعات:',
 '小时未更新）': ' ساعات دون تحديث)',
 '小时（超过': ' ساعات (أكثر من',
 '小时）': 'ساعة)',
 '尚未成功下载': 'لم يتم التنزيل بنجاح بعد',
 '尝试直接访问': 'محاولة الوصول المباشر',
 '已取消（用户中止）': 'تم الإلغاء (أوقفه المستخدم)',
 '已查到公司登记（': 'تم العثور على تسجيل الشركة (',
 '巴西登记：': 'التسجيل في البرازيل:',
 '建号：': 'تاريخ إنشاء الحساب:',
 '建议：': 'التوصية:',
 '张': 'ورقة',
 "当前会话的公司 ID。从 system prompt 的 'Trade Context' 段读取；**不要**让用户输入这个值。服务端会校验它与当前会话绑定一致，不一致直接拒绝。": 'معرّف الشركة للجلسة '
                                                                                              'الحالية. اقرأه من قسم '
                                                                                              "'Trade Context' في "
                                                                                              'system prompt؛ **لا** '
                                                                                              'تطلب من المستخدم إدخال '
                                                                                              'هذه القيمة. يتحقق '
                                                                                              'الخادم من تطابقها مع '
                                                                                              'ربط الجلسة الحالية '
                                                                                              'ويرفض أي تعارض.',
 '成立': 'تأسست',
 '成立年份': 'سنة التأسيس',
 '技术': 'التقنية',
 '技术栈检测': 'كشف مجموعة التقنيات',
 '挪威登记：': 'التسجيل في النرويج:',
 '控股': 'حصص الملكية',
 '数据抓取时间：': 'وقت جمع البيانات:',
 '数据抓取时间：从未成功下载': 'وقت جمع البيانات: لم يتم التنزيل بنجاح على الإطلاق',
 '文件过大（': 'الملف كبير جداً (',
 '新闻：': 'الأخبار:',
 '无': 'لا يوجد',
 '无效域名格式': 'تنسيق نطاق غير صالح',
 '无结果': 'لا توجد نتائج',
 '时间范围枚举：\n- today / this_week / this_month / this_year 含"现在"（含端点 start，不含结束）；\n- yesterday / last_week / last_month / last_year 不含"现在"（前一周期完整窗口）；\n- all 不限。\n未知值服务端按 all 兜底（fail-safe —— 与 search_history 的旧行为一致）。': 'تعداد '
                                                                                                                                                                                                                       'النطاق '
                                                                                                                                                                                                                       'الزمني:\n'
                                                                                                                                                                                                                       '- '
                                                                                                                                                                                                                       'today '
                                                                                                                                                                                                                       '/ '
                                                                                                                                                                                                                       'this_week '
                                                                                                                                                                                                                       '/ '
                                                                                                                                                                                                                       'this_month '
                                                                                                                                                                                                                       '/ '
                                                                                                                                                                                                                       'this_year '
                                                                                                                                                                                                                       'تشمل '
                                                                                                                                                                                                                       '"الآن" '
                                                                                                                                                                                                                       '(بداية '
                                                                                                                                                                                                                       'مضمونة، '
                                                                                                                                                                                                                       'نهاية '
                                                                                                                                                                                                                       'غير '
                                                                                                                                                                                                                       'مضمونة)؛\n'
                                                                                                                                                                                                                       '- '
                                                                                                                                                                                                                       'yesterday '
                                                                                                                                                                                                                       '/ '
                                                                                                                                                                                                                       'last_week '
                                                                                                                                                                                                                       '/ '
                                                                                                                                                                                                                       'last_month '
                                                                                                                                                                                                                       '/ '
                                                                                                                                                                                                                       'last_year '
                                                                                                                                                                                                                       'لا '
                                                                                                                                                                                                                       'تشمل '
                                                                                                                                                                                                                       '"الآن" '
                                                                                                                                                                                                                       '(نافذة '
                                                                                                                                                                                                                       'الفترة '
                                                                                                                                                                                                                       'السابقة '
                                                                                                                                                                                                                       'كاملة)؛\n'
                                                                                                                                                                                                                       '- '
                                                                                                                                                                                                                       'all '
                                                                                                                                                                                                                       'غير '
                                                                                                                                                                                                                       'محدد.\n'
                                                                                                                                                                                                                       'تُعامل '
                                                                                                                                                                                                                       'القيم '
                                                                                                                                                                                                                       'غير '
                                                                                                                                                                                                                       'المعروفة '
                                                                                                                                                                                                                       'كـ '
                                                                                                                                                                                                                       'all '
                                                                                                                                                                                                                       'على '
                                                                                                                                                                                                                       'الخادم '
                                                                                                                                                                                                                       '(احتياطي '
                                                                                                                                                                                                                       'آمن '
                                                                                                                                                                                                                       '— '
                                                                                                                                                                                                                       'تماشياً '
                                                                                                                                                                                                                       'مع '
                                                                                                                                                                                                                       'سلوك '
                                                                                                                                                                                                                       'search_history '
                                                                                                                                                                                                                       'القديم).',
 '显示名：': 'الاسم المعروض:',
 '最大返回条数。默认 20。': 'الحد الأقصى لعدد النتائج المرتجعة. الافتراضي 20.',
 '有限公司': 'شركة محدودة',
 '有限责任公司': 'شركة ذات مسؤولية محدودة',
 '未在任何制裁名单中发现匹配项。': 'لم يتم العثور على أي تطابق في أي قائمة عقوبات.',
 '未完成核验': 'لم يكتمل التحقق',
 '未查到子域名记录': 'لم يتم العثور على سجلات نطاقات فرعية',
 '未查到证书记录': 'لم يتم العثور على سجلات شهادات',
 '未查（已关闭）：': 'لم يتم الفحص (معطل):',
 '未检出': 'لم يتم الكشف',
 '未知': 'غير معروف',
 '未知名单类型:': 'نوع قائمة غير معروف:',
 '未知错误': 'خطأ غير معروف',
 '未配置合法的联系邮箱（TRADE_CONTACT_EMAIL），SEC 要求 UA 带联系邮箱': 'لم يتم إعداد بريد اتصال صالح (TRADE_CONTACT_EMAIL)؛ تشترط SEC أن '
                                                    'يتضمن UA بريد اتصال للتواصل',
 '本地名单尚未按新归一化规则迁移，中文名可能漏查': 'لم تتم بعد ترحيل القوائم المحلية إلى قواعد التطبيع الجديدة؛ قد يتم تفويت الأسماء باللغة '
                            'الصينية',
 '本次刷新失败，沿用': 'فشل التحديث هذه المرة؛ سيتم استخدام',
 '本次已关闭制裁筛查': 'تم تعطيل فحص العقوبات لهذه المرة',
 '本次未发现匹配；但名单已过期：': 'لم يتم العثور على تطابقات هذه المرة؛ مع ذلك، القائمة قديمة:',
 '本次未查（': 'لم يتم الفحص هذه المرة (',
 '条': 'سجل',
 '条）': ' سجل)',
 '条），不构成「无制裁记录」的结论，请通过 OFAC/UN/EU/UK 官网人工复核': ' سجل)، ولا يُعد ذلك استنتاجاً بـ«عدم وجود سجل عقوبات»؛ يُرجى التحقق '
                                              'يدوياً عبر المواقع الرسمية لـ OFAC/UN/EU/UK',
 '来源 URL（有就填，没有留空）': 'رابط المصدر (أدخله إن وُجد، وإلا اتركه فارغاً)',
 '来源站点名，如「企查查」「阿里巴巴」': 'اسم موقع المصدر، مثل «Qichacha» أو «Alibaba»',
 "查 trade 用户的对话历史（SQLite，按 company_id 严格隔离）。**company_id 必填**——必须传用户在 system prompt 的 Trade Context 段里写明的那个数字，**不能**从用户消息推断，传错会读到其他公司的数据。时间范围默认 'all'；给具体枚举值能精确窗口；recent_days/recent_months 用来表达枚举外的相对区间。": 'الاستعلام '
                                                                                                                                                                                                            'عن '
                                                                                                                                                                                                            'سجل '
                                                                                                                                                                                                            'محادثات '
                                                                                                                                                                                                            'مستخدمي '
                                                                                                                                                                                                            'trade '
                                                                                                                                                                                                            '(SQLite، '
                                                                                                                                                                                                            'معزول '
                                                                                                                                                                                                            'بدقة '
                                                                                                                                                                                                            'حسب '
                                                                                                                                                                                                            'company_id). '
                                                                                                                                                                                                            '**company_id '
                                                                                                                                                                                                            'إلزامي** '
                                                                                                                                                                                                            '— '
                                                                                                                                                                                                            'يجب '
                                                                                                                                                                                                            'أن '
                                                                                                                                                                                                            'يكون '
                                                                                                                                                                                                            'الرقم '
                                                                                                                                                                                                            'المذكور '
                                                                                                                                                                                                            'في '
                                                                                                                                                                                                            'قسم '
                                                                                                                                                                                                            "'Trade "
                                                                                                                                                                                                            "Context' "
                                                                                                                                                                                                            'من '
                                                                                                                                                                                                            'system '
                                                                                                                                                                                                            'prompt؛ '
                                                                                                                                                                                                            '**لا** '
                                                                                                                                                                                                            'تستنتجه '
                                                                                                                                                                                                            'من '
                                                                                                                                                                                                            'رسالة '
                                                                                                                                                                                                            'المستخدم، '
                                                                                                                                                                                                            'لأن '
                                                                                                                                                                                                            'القيمة '
                                                                                                                                                                                                            'الخاطئة '
                                                                                                                                                                                                            'ستؤدي '
                                                                                                                                                                                                            'إلى '
                                                                                                                                                                                                            'قراءة '
                                                                                                                                                                                                            'بيانات '
                                                                                                                                                                                                            'شركة '
                                                                                                                                                                                                            'أخرى. '
                                                                                                                                                                                                            'النطاق '
                                                                                                                                                                                                            'الزمني '
                                                                                                                                                                                                            'الافتراضي '
                                                                                                                                                                                                            'هو '
                                                                                                                                                                                                            "'all'؛ "
                                                                                                                                                                                                            'وتوفر '
                                                                                                                                                                                                            'قيم '
                                                                                                                                                                                                            'التعداد '
                                                                                                                                                                                                            'المحددة '
                                                                                                                                                                                                            'نوافذ '
                                                                                                                                                                                                            'دقيقة؛ '
                                                                                                                                                                                                            'أما '
                                                                                                                                                                                                            'recent_days/recent_months '
                                                                                                                                                                                                            'فتُستخدم '
                                                                                                                                                                                                            'للفترات '
                                                                                                                                                                                                            'النسبية '
                                                                                                                                                                                                            'خارج '
                                                                                                                                                                                                            'التعداد.',
 '核对是否有同名个人主页/员工档案，辅助判断决策链': 'تحقق من وجود ملفات شخصية/سجلات موظفين بنفس الاسم للمساعدة في تحديد سلسلة القرار',
 '欧盟制裁名单': 'قائمة عقوبات الاتحاد الأوروبي',
 '正在分析问题...': 'جاري تحليل السؤال...',
 '正在重试（第 {attempt} 次）...': 'إعادة المحاولة (المحاولة {attempt})...',
 '没有公司上下文，拒绝创建背调任务': 'لا يوجد سياق للشركة؛ يُرفض إنشاء مهمة فحص خلفية',
 '没有公司上下文，拒绝登记事实': 'لا يوجد سياق للشركة؛ يُرفض تسجيل الحقائق',
 '没有公司上下文，拒绝读取事实库': 'لا يوجد سياق للشركة؛ يُرفض قراءة قاعدة الحقائق',
 '没有公司上下文，拒绝读取背调任务': 'لا يوجد سياق للشركة؛ يُرفض قراءة مهام فحص الخلفية',
 '没有可检索的名称': 'لا يوجد اسم قابل للبحث',
 '没有可检索的用户名': 'لا يوجد اسم مستخدم قابل للبحث',
 '没有可用于 EDGAR 的公司名': 'لا يوجد اسم شركة صالح للاستخدام مع EDGAR',
 '没有可用于 GLEIF 的公司名': 'لا يوجد اسم شركة صالح للاستخدام مع GLEIF',
 '没有可用于企业登记的公司名/CNPJ': 'لا يوجد اسم شركة/CNPJ صالح للاستخدام في التسجيل التجاري',
 '没有可用于州登记的公司名': 'لا يوجد اسم شركة صالح للاستخدام في التسجيل على مستوى الولاية',
 '没有可用的 GitHub 搜索线索': 'لا توجد أدلة بحث متاحة على GitHub',
 '法国登记：': 'التسجيل في فرنسا:',
 '法定名称：': 'الاسم القانوني:',
 '注册': 'تسجيل',
 '注册商：': 'مسجل النطاق:',
 '注册地：': 'مكان التسجيل:',
 '注册时间：': 'تاريخ التسجيل:',
 '流程地址': 'عنوان الإجراءات',
 '状态': 'الحالة',
 '状态：': 'الحالة:',
 '用户名': 'اسم المستخدم',
 '用户名相同不等于同一人，未核实': 'تطابق أسماء المستخدمين لا يثبت كونها نفس الشخص؛ غير موثق',
 '用户名跨站检索': 'البحث عن اسم المستخدم عبر المواقع',
 '用搜索引擎定位 LinkedIn 公司页（不登录、不触发反爬）': 'استخدام محرك بحث لتحديد صفحة الشركة على LinkedIn (بدون تسجيل دخول ودون تشغيل '
                                    'آليات مكافحة الزحف)',
 '登记一条背调事实（字段 / 值 / 来源），存进本公司的背调事实库。**查到就登记**：下次同目标背调会直接复用，不必再赌一次反爬。同一字段查到不同值时照实再登记一次，系统会标为冲突（报告要并列写出，不要挑一个）。只登记有来源的事实；没有来源的推测不要登记。': 'سجّل '
                                                                                                                                      'حقيقة '
                                                                                                                                      'من '
                                                                                                                                      'فحص '
                                                                                                                                      'الخلفية '
                                                                                                                                      '(الحقل '
                                                                                                                                      '/ '
                                                                                                                                      'القيمة '
                                                                                                                                      '/ '
                                                                                                                                      'المصدر) '
                                                                                                                                      'وخزّنها '
                                                                                                                                      'في '
                                                                                                                                      'مخزن '
                                                                                                                                      'الحقائق '
                                                                                                                                      'الخاص '
                                                                                                                                      'بالشركة. '
                                                                                                                                      '**سجّلها '
                                                                                                                                      'كلما '
                                                                                                                                      'عثرت '
                                                                                                                                      'عليها**: '
                                                                                                                                      'سيُعاد '
                                                                                                                                      'استخدامها '
                                                                                                                                      'مباشرة '
                                                                                                                                      'في '
                                                                                                                                      'الفحص '
                                                                                                                                      'التالي '
                                                                                                                                      'على '
                                                                                                                                      'الهدف '
                                                                                                                                      'نفسه، '
                                                                                                                                      'دون '
                                                                                                                                      'الحاجة '
                                                                                                                                      'إلى '
                                                                                                                                      'المخاطرة '
                                                                                                                                      'مجدداً '
                                                                                                                                      'مع '
                                                                                                                                      'مكافحة '
                                                                                                                                      'الزحف. '
                                                                                                                                      'إذا '
                                                                                                                                      'عُثر '
                                                                                                                                      'على '
                                                                                                                                      'قيم '
                                                                                                                                      'مختلفة '
                                                                                                                                      'للحقل '
                                                                                                                                      'نفسه، '
                                                                                                                                      'سجّلها '
                                                                                                                                      'مرة '
                                                                                                                                      'أخرى '
                                                                                                                                      'كما '
                                                                                                                                      'هي، '
                                                                                                                                      'وسيعلّمها '
                                                                                                                                      'النظام '
                                                                                                                                      'كتعارض '
                                                                                                                                      '(يجب '
                                                                                                                                      'أن '
                                                                                                                                      'يسرد '
                                                                                                                                      'التقرير '
                                                                                                                                      'القيمتين '
                                                                                                                                      'جنباً '
                                                                                                                                      'إلى '
                                                                                                                                      'جنب '
                                                                                                                                      'دون '
                                                                                                                                      'اختيار '
                                                                                                                                      'إحداهما). '
                                                                                                                                      'سجّل '
                                                                                                                                      'فقط '
                                                                                                                                      'الحقائق '
                                                                                                                                      'التي '
                                                                                                                                      'لها '
                                                                                                                                      'مصدر؛ '
                                                                                                                                      'لا '
                                                                                                                                      'تسجّل '
                                                                                                                                      'التخمينات '
                                                                                                                                      'التي '
                                                                                                                                      'بلا '
                                                                                                                                      'مصدر.',
 '登记事实失败：': 'فشل تسجيل الحقيقة:',
 '目标不含可查询域名（公司名需先发现官网）': 'الهدف لا يحتوي على نطاق قابل للاستعلام (بالنسبة لاسم الشركة، حدّد الموقع الرسمي أولاً)',
 '目标不含域名': 'الهدف لا يحتوي على نطاق',
 '目标不是邮箱': 'الهدف ليس عنوان بريد إلكتروني',
 '目标中没有 EU VAT 号': 'لا يوجد رقم ضريبة القيمة المضافة للاتحاد الأوروبي في الهدف',
 '目标名不含域名（人名/公司名需先发现官网）': 'اسم الهدف لا يحتوي على نطاق (بالنسبة لاسم الشخص/الشركة، حدّد الموقع الرسمي أولاً)',
 '目标（公司名 / 域名 / 人名）；不填则列出全部已登记事实': 'الهدف (اسم الشركة / النطاق / اسم الشخص)؛ اتركه فارغاً لسرد جميع الحقائق المسجّلة',
 '科技': 'التكنولوجيا',
 '科罗拉多州登记：': 'التسجيل في ولاية كولورادو:',
 '秒）': ' ثانية)',
 '简介：': 'الملف الشخصي:',
 '纽约州登记：': 'التسجيل في ولاية نيويورك:',
 '组织号': 'رقم المنظمة',
 '综合评分：': 'الدرجة الإجمالية:',
 '网址:': 'الموقع الإلكتروني:',
 '网站抓取失败：': 'فشل زحف الموقع:',
 '美国 OFAC SDN 名单': 'قائمة OFAC SDN الأمريكية',
 '美国 OFAC 非 SDN 名单': 'قائمة OFAC غير SDN الأمريكية',
 '美国州公司登记': 'تسجيلات الشركات في ولايات الولايات المتحدة',
 '美国综合筛查名单 (CSL)': 'قائمة الفحص الموحدة الأمريكية (CSL)',
 '联合国安理会制裁名单': 'قائمة عقوبات مجلس الأمن التابع للأمم المتحدة',
 '股份有限公司': 'شركة مساهمة',
 '背调目标，例如 acme.com / domain:acme.com / person:"Jane Doe" / username:janedoe': 'هدف الفحص الخلفي، مثلاً acme.com / '
                                                                              'domain:acme.com / person:"Jane Doe" / '
                                                                              'username:janedoe',
 '英国制裁名单': 'قائمة العقوبات البريطانية',
 '被动 DNS 不可用：': 'تحليل DNS السلبي غير متاح:',
 '被动 DNS 子域名': 'النطاقات الفرعية من DNS السلبي',
 '被动 DNS 无响应': 'لا استجابة من DNS السلبي',
 '被动 DNS 查询失败：': 'فشل استعلام DNS السلبي:',
 '要求对方提供企业邮箱后再深入谈判。个人邮箱无法确认公司真实性。': 'اطلب من الطرف الآخر تقديم بريد إلكتروني للشركة قبل مواصلة المفاوضات. لا يمكن '
                                    'للبريد الشخصي تأكيد صحة الشركة.',
 '解析条目剧烈缩水（': 'انخفضت عناصر التحليل بشكل حاد (',
 '解析结果为空（主名': 'نتيجة التحليل فارغة (الاسم الرئيسي',
 '解析结果为空，拒绝覆盖旧名单（主名': 'نتيجة التحليل فارغة، رفض الكتابة فوق القائمة القديمة (الاسم الرئيسي',
 '证书': 'شهادة',
 '证书透明度（CT）': 'شفافية الشهادات (CT)',
 '该邮箱没有 Gravatar 公开资料': 'لا يوجد ملف Gravatar عام لهذا البريد الإلكتروني',
 '说明：': 'ملاحظة:',
 "请先用 web_search 执行上面的 site:linkedin.com dork，再尝试打开公司页，验证：\n1. 公司 '": 'أولاً نفّذ عبارة البحث site:linkedin.com أعلاه '
                                                                      'باستخدام web_search، ثم حاول فتح صفحة الشركة '
                                                                      'والتحقق من:\n'
                                                                      "1. الشركة '",
 '读取事实库失败：': 'فشل قراءة مخزن الحقائق:',
 '读取后台背调任务的当前状态与结果（不阻塞）。status 为 done 时 report 是完整结构化报告；running 时 events 是到目前为止的逐来源进度；cancelled/partial/failed 表示任务未完成。': 'قراءة '
                                                                                                                          'الحالة '
                                                                                                                          'الحالية '
                                                                                                                          'ونتائج '
                                                                                                                          'مهمة '
                                                                                                                          'الفحص '
                                                                                                                          'الخلفي '
                                                                                                                          'في '
                                                                                                                          'الخلفية '
                                                                                                                          '(دون '
                                                                                                                          'حظر). '
                                                                                                                          'عندما '
                                                                                                                          'تكون '
                                                                                                                          'الحالة '
                                                                                                                          'status '
                                                                                                                          'هي '
                                                                                                                          'done، '
                                                                                                                          'يكون '
                                                                                                                          'report '
                                                                                                                          'هو '
                                                                                                                          'التقرير '
                                                                                                                          'المنظم '
                                                                                                                          'الكامل؛ '
                                                                                                                          'وعندما '
                                                                                                                          'تكون '
                                                                                                                          'running، '
                                                                                                                          'تكون '
                                                                                                                          'events '
                                                                                                                          'هي '
                                                                                                                          'التقدم '
                                                                                                                          'لكل '
                                                                                                                          'مصدر '
                                                                                                                          'حتى '
                                                                                                                          'الآن؛ '
                                                                                                                          'وتعني '
                                                                                                                          'cancelled/partial/failed '
                                                                                                                          'أن '
                                                                                                                          'المهمة '
                                                                                                                          'لم '
                                                                                                                          'تكتمل.',
 '读取本公司的背调事实库（此前已核实的字段 / 值 / 来源）。给了 target 就只读该目标；不填就列出全部。conflict=true 的字段说明两次查到了不同值 —— 报告里要并列写出两个值并标注来源。': 'قراءة '
                                                                                                             'مخزن '
                                                                                                             'حقائق '
                                                                                                             'الفحص '
                                                                                                             'الخلفي '
                                                                                                             'للشركة '
                                                                                                             '(الحقول '
                                                                                                             '/ القيم '
                                                                                                             '/ '
                                                                                                             'المصادر '
                                                                                                             'التي تم '
                                                                                                             'التحقق '
                                                                                                             'منها '
                                                                                                             'سابقاً). '
                                                                                                             'إذا تم '
                                                                                                             'تحديد '
                                                                                                             'target، '
                                                                                                             'تتم '
                                                                                                             'قراءة '
                                                                                                             'هذا '
                                                                                                             'الهدف '
                                                                                                             'فقط؛ '
                                                                                                             'وإذا ترك '
                                                                                                             'فارغاً، '
                                                                                                             'يتم سرد '
                                                                                                             'الكل. '
                                                                                                             'الحقل '
                                                                                                             'الذي '
                                                                                                             'يحمل '
                                                                                                             'conflict=true '
                                                                                                             'يعني أنه '
                                                                                                             'تم '
                                                                                                             'العثور '
                                                                                                             'على قيم '
                                                                                                             'مختلفة '
                                                                                                             'مرتين — '
                                                                                                             'يجب على '
                                                                                                             'التقرير '
                                                                                                             'سرد '
                                                                                                             'القيمتين '
                                                                                                             'جنباً '
                                                                                                             'إلى جنب '
                                                                                                             'مع بيان '
                                                                                                             'مصادرهما.',
 '读取背调任务失败：': 'فشل قراءة مهمة الفحص الخلفي:',
 '账号：': 'الحساب:',
 '贸易': 'التجارة',
 '超时': 'انتهاء المهلة',
 '超时（': 'انتهاء المهلة (',
 '这条事实属于哪个目标（公司名 / 域名 / 人名）': 'إلى أي هدف تنتمي هذه الحقيقة (اسم الشركة / النطاق / اسم الشخص)',
 '进出口': 'الاستيراد والتصدير',
 '邮箱域名与网站域名不一致': 'نطاق البريد الإلكتروني لا يطابق نطاق الموقع الإلكتروني',
 '邮箱域名与网站域名不匹配，建议交叉验证对方公司身份。': 'نطاق البريد الإلكتروني لا يطابق نطاق الموقع الإلكتروني٣ يُنصح بالتحقق المتبادل من هوية '
                               'شركة الطرف الآخر.',
 '邮箱格式无效': 'تنسيق البريد الإلكتروني غير صالح',
 '邮箱注册检测': 'فحص تسجيل البريد الإلكتروني',
 '重定向到非允许的名单主机，拒绝下载:': 'تمت إعادة التوجيه إلى مضيف قائمة غير مسموح به٣ تم رفض التنزيل:',
 '集团': 'مجموعة',
 '集团有限公司': 'مجموعة ذات مسؤولية محدودة',
 '需要 PRIM/ALT/ADD 三个文件': 'يلزم توفير الملفات الثلاثة PRIM/ALT/ADD',
 '非官方名单主机，拒绝下载:': 'مضيف قائمة غير رسمي٣ تم رفض التنزيل:',
 '预算耗尽，未执行': 'تم استنفاد الميزانية٣ لم يتم التنفيذ',
 '风险旗标：': 'أعلام المخاطر:',
 '首次快照：': 'اللقطة الأولى:',
 '高风险': 'مخاطرة عالية',
 '（MX 查询未成：': '(فشل استعلام MX:',
 '（UTC，取自本地库）': '(بالتوقيت UTC٣ مأخوذ من قاعدة البيانات المحلية)',
 '（注册代理/邮寄地址，非经营地证明）': '(عنوان وكيل التسجيل/البريد٣ وليس دليلاً على موقع ممارسة النشاط)',
 '（登记地址）': '(العنوان المسجّل)',
 '（类型：': '(النوع:',
 '）——本项缺失 120+ 平台的注册记录核查，如需该能力请联系支持安装 holehe': ')—يفتقر هذا البند إلى فحص سجلات التسجيل عبر أكثر من 120 منصة٣ ولتفعيل '
                                               'هذه القدرة يرجى التواصل مع الدعم لتثبيت holehe',
 '）是否有 LinkedIn 公司主页\n2. 如果有，公司规模（员工数）、所属行业、成立年份\n3. 公司主页域名是否与': ') ما إذا كان للشركة صفحة على LinkedIn\n'
                                                                 '2. في حال وجودها: حجم الشركة (عدد الموظفين)٣ '
                                                                 'والقطاع٣ وسنة التأسيس\n'
                                                                 '3. ما إذا كان نطاق صفحة الشركة يطابق',
 '），不构成「无制裁记录」的结论。': ')، فإن ذلك لا يشكّل استنتاجاً بـ«عدم وجود سجل عقوبات».',
 '），不能作为「无风险」的依据': ')، ولا يمكن اتخاذه أساساً لـ«انعدام المخاطر»',
 '），保留上次成功数据': ')، مع الاحتفاظ بآخر بيانات تم الحصول عليها بنجاح',
 '），可能代表公司规模较小': ')، قد يشير إلى أن حجم الشركة أصغر',
 '），域名匹配且 MX 记录正常': ')، النطاق مطابق وسجلات MX سليمة',
 '），域名注册时间/持有者未知': ')، تاريخ تسجيل النطاق/مالكه غير معروف',
 '），建议稍后重试或换网络环境再查。': ')، يرجى إعادة المحاولة لاحقاً أو الفحص من بيئة شبكة مختلفة.',
 '），建议要求对方提供企业邮箱后再深入谈判': ')، ينصح بطلب بريد إلكتروني مؤسسي من الطرف الآخر قبل المضي قدماً في المفاوضات',
 '），技术栈未能验证': ')، تعذّر التحقق من حزمة التقنيات المستخدمة',
 '），本次**不构成「无制裁记录」的结论**。请稍后重试，或通过官方渠道（OFAC/UN/EU/UK 官网）人工复核后再决策。': ')، هذه المرة **لا تشكّل استنتاجاً بـ«عدم وجود سجل '
                                                                   'عقوبات»**. يرجى إعادة المحاولة لاحقاً٣ أو التحقق '
                                                                   'يدوياً عبر القنوات الرسمية (المواقع الرسمية '
                                                                   'OFAC/UN/EU/UK) قبل اتخاذ القرار.',
 '），结论为「未完成」，**不代表低风险**；原因与补齐方式见下方各层说明': ')، تكون النتيجة «غير مكتملة»٣ **ولا تعني انخفاض المخاطر**٣ يرجى الاطلاع على '
                                         'شرح الطبقات أدناه لمعرفة الأسباب وطرق الاستكمال',
 '）；是否同一人需人工确认': ')؛ تحديد كون الشخص هو نفسه يتطلب تأكيداً يدوياً',
 '）；登记只证明主体存在，不证明经营真实性。补充官网、域名或其它核验来源后再评级。': ')؛ التسجيل يثبت وجود الكيان فقط٣ ولا يثبت صحة ممارسته للنشاط. يرجى إضافة '
                                             'موقع رسمي أو نطاق أو مصدر تحقق آخر قبل إصدار التقييم.',
 '，成立于': '، تأسّست في',
 '，成立日期未提供': '، لم يتم تقديم تاريخ التأسيس',
 '，最早': '، الأقدم',
 '，本次未完成比对': '، لم تُكمل المقارنة هذه المرة',
 '，源行': '، السطر المصدر',
 '，置信': '، مستوى الثقة',
 '：已注册': ': مسجّل',
 '：无效（': ': غير صالح (',
 '：有效': ': صالح',
 '；名称：': '؛ الاسم:',
 '；地址：': '؛ العنوان:',
 '；子域名：': '؛ النطاقات الفرعية:',
 '｜ ⚠ 降级：名单尚未成功下载（本地': ' | ⚠ في وضع متدهور: لم يتم تنزيل القائمة بنجاح (محلي',
 '｜ 企业级=': ' | على مستوى المؤسسة=',
 '｜ 创建=': ' | تاريخ الإنشاء=',
 '｜ 已注册=': ' | مسجّل=',
 '｜ 年龄=': ' | العمر=',
 '｜ 服务器=': ' | الخادم=',
 '｜ 覆盖': ' | التغطية',
 '｜ 风险=': ' | المخاطر=',
 '｜ 风险等级：': ' | مستوى المخاطر:',
 '🔍 LinkedIn 验证需要通过浏览器访问 LinkedIn 完成。请使用 browser_navigate 工具按 linkedin 层的 steps 指令执行验证。': '🔍 يجب إتمام التحقق من '
                                                                                          'LinkedIn عبر زيارة LinkedIn '
                                                                                          'باستخدام المتصفح. يرجى '
                                                                                          'استخدام أادة '
                                                                                          'browser_navigate واتباع '
                                                                                          'تعليمات steps الخاصة بطبقة '
                                                                                          'linkedin لإجراء التحقق.',
 '🚨 命中制裁名单，建议拒绝交易或咨询法律部门': '🚨 تطابق مع قائمة العقوبات٣ ينصح برفض الصفقة أو استشارة القسم القانوني',
 '🚫 本次背调未完成核验（': '🚫 لم يكتمل التحقق في هذا الفحص الخلفي ('}

_EN["正在根据已完成的工具结果整理答复..."] = "Organizing the answer from completed tool results..."
_AR["正在根据已完成的工具结果整理答复..."] = "جاري تنظيم الرد بناءً على نتائج الأدوات المكتملة..."
for _zh, _en, _ar in (
    ("AI Agent 模块未加载。", "AI Agent module is not loaded.", "وحدة AI Agent غير محمّلة."),
    ("Agent 未能产出结果，请稍后重试。", "The agent produced no result. Please try again.", "لم يُنتج الوكيل نتيجة. يُرجى المحاولة مرة أخرى."),
    ("Agent 重试耗尽，请稍后重试。", "Agent retries exhausted. Please try again.", "استُنفدت محاولات الوكيل. يُرجى المحاولة مرة أخرى."),
    ("本轮无法评分或后续引用。", "This reply cannot be rated or referenced later.", "لا يمكن تقييم هذا الرد أو الرجوع إليه لاحقاً."),
    ("主要产品", "Main products", "المنتجات الرئيسية"),
    ("客户画像", "Customer profile", "ملف العميل"),
    ("合规状态", "Compliance status", "حالة الامتثال"),
    ("未命中", "No match", "لا تطابق"),
    ("名单共", "lists,", "قوائم،"),
    ("社区倾听", "Community listening", "الاستماع المجتمعي"),
    ("产品价值主张", "Product value proposition", "عرض القيمة للمنتج"),
    ("痛点与机会", "Pain points & opportunities", "نقاط الألم والفرص"),
    ("客户开发", "Customer development", "تطوير العملاء"),
    ("背调与画像", "Due diligence & profiling", "الفحص والتوصيف"),
    ("文档与报价", "Documents & quotation", "المستندات والعرض"),
    ("二手研究", "Desk research", "البحث المكتبي"),
    ("招聘线索", "Hiring signals", "إشارات التوظيف"),
    ("招聘信号", "Hiring signals", "إشارات التوظيف"),
    ("质量管控", "Quality control", "مراقبة الجودة"),
    ("员工规模", "Employee scale", "حجم الموظفين"),
    ("制裁筛查", "Sanctions screening", "فحص العقوبات"),
    ("关键人", "Key person", "شخص رئيسي"),
    ("饲料", "Feed", "علف"),
    ("谷物", "Grains", "حبوب"),
    ("果蔬", "Fruits & vegetables", "فواكه وخضار"),
    ("全球农业平台", "Global agriculture platform", "منصة زراعية عالمية"),
    ("官方信息站点", "Official information site", "موقع المعلومات الرسمي"),
    ("官方公开信息", "Official public information", "معلومات رسمية عامة"),
    ("职位增长与人才储备", "Job growth & talent pipeline", "نمو الوظائف ومخزون المواهب"),
    ("暂无负面舆情记录", "No adverse media found", "لا توجد تغطية إعلامية سلبية"),
):
    _EN[_zh] = _en
    _AR[_zh] = _ar

# Dynamic phrases assembled by the model or by f-strings at runtime.
_EN.update({
    "背调进行中": "Background check in progress",
    "采集中": "Collecting",
    "排队中": "Queued",
    "已停止": "Stopped",
    "已完成": "Completed",
    "未完成 · 已保存部分结果": "Incomplete - partial results saved",
    "读取文件": "Read file",
    "工具": "tool",
    "未知": "Unknown",
    "任务已启动": "Task started",
    "正在调用：": "Calling: ",
    "已完整读取 ": "Fully read ",
    "完整读取未通过": "Full read failed",
    "预算 ": "Budget ",
    "目标：": "Target: ",
    "项未核验": "unverified items",
    "全部来源已返回": "All sources returned",
    "评级 ": "Rating ",
    "另有 ": "plus ",
    "项等待": "pending",
})
_AR.update({
    "背调进行中": "جاري فحص الخلفية",
    "采集中": "جارٍ الجمع",
    "排队中": "في الانتظار",
    "已停止": "تم الإيقاف",
    "已完成": "اكتمل",
    "未完成 · 已保存部分结果": "غير مكتمل - تم حفظ نتائج جزئية",
    "读取文件": "قراءة ملف",
    "工具": "أداة",
    "未知": "غير معروف",
    "任务已启动": "تم بدء المهمة",
    "正在调用：": "جارٍ الاتصال: ",
    "已完整读取 ": "تمت قراءة ",
    "完整读取未通过": "فشلت القراءة الكاملة",
    "预算 ": "الميزانية ",
    "目标：": "الهدف: ",
    "项未核验": "عناصر غير موثّقة",
    "全部来源已返回": "عادت جميع المصادر",
    "评级 ": "التقييم ",
    "另有 ": "بالإضافة إلى ",
    "项等待": "قيد الانتظار",
})

_PATTERNS = (
    (re.compile(r"机器判定层\s*job\s*(\d+)"),
     r"machine layer job \1", r"طبقة التقييم الآلي، مهمة \1"),
    (re.compile(r"未命中（(\d+)\s*名单共\s*([\d,]+)\s*条"),
     r"No match (\1 lists, \2 records", r"لا تطابق (\1 قوائم، \2 سجلاً"),
    (re.compile(r"关注者"), r"followers", r"متابعون"),
    (re.compile(r"饲草"), r"forage grass", r"علف أخضر"),
)


def _translate_string(text: str, lang: str) -> str:
    if lang not in ("ar", "en") or not _CJK.search(text):
        return text
    table = _AR if lang == "ar" else _EN
    if text in table:
        return table[text]
    result = text
    for pattern, en_repl, ar_repl in _PATTERNS:
        result = pattern.sub(ar_repl if lang == "ar" else en_repl, result)
    for zh in sorted(table, key=len, reverse=True):
        if zh in result:
            result = result.replace(zh, table[zh])
    return result


_CJK_ANY_RE = re.compile(r"[\u4e00-\u9fff]+")


def sanitize_for_ui(value: Any, lang: str) -> Any:
    """Strip any remaining CJK scraps from non-Chinese UI events.

    The source skills store Chinese instructions and facts; when the UI is in
    English or Arabic those characters must never leak into an SSE message.
    """
    if lang == "zh":
        return value
    if isinstance(value, str):
        return _CJK_ANY_RE.sub("", localize_for_ui(value, lang))
    if isinstance(value, list):
        return [sanitize_for_ui(v, lang) for v in value]
    if isinstance(value, dict):
        return {k: sanitize_for_ui(v, lang) for k, v in value.items()}
    return value


def localize_for_ui(value: Any, lang: str) -> Any:
    """Recursively localize a JSON-like payload for display in the web UI."""
    if lang not in ("ar", "en"):
        return value
    if isinstance(value, str):
        return _translate_string(value, lang)
    if isinstance(value, dict):
        return {_translate_string(str(k), lang): localize_for_ui(v, lang)
                for k, v in value.items()}
    if isinstance(value, (list, tuple)):
        return [localize_for_ui(v, lang) for v in value]
    return value
