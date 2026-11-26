# Trade-AI Egypt Edition — bilingual index / دليل ثنائي اللغة

Combined index of the 14 Egypt-relevant Trade-AI skills and their full English and Arabic mirrors. Generated 2026-11-25.

فهرس مشترك لأهم 14 مهارة من Trade-AI مرتبطة بمصر، مع نسخ كاملة بالإنجليزية والعربية. تم الإعداد في 2026-11-25.

## How to use / طريقة الاستخدام

- Load the English mirror: `skill_view(name='b2b-osint-en')` / تحميل النسخة الإنجليزية.
- Load the Arabic mirror: `skill_view(name='b2b-osint-ar')` / تحميل النسخة العربية.
- For Egyptian targets, load `b2b-egypt-pack` FIRST. It overrides both mirrors on language, sources and risk screening.
  للمشاريع المصرية، حمّل `b2b-egypt-pack` أولاً؛ هو الذي يتحكم في اللغة والمصادر وفحص المخاطر.
- The original Chinese skills are authoritative; the mirrors are for human reading and review.
  المهارات الصينية الأصلية هي المرجع المعتمد؛ النسخ المترجمة للقراءة والمراجعة البشرية.

## Index / الفهرس

| # | Original | English mirror | Arabic mirror | Purpose (EN) | الغرض (AR) |
|---|---|---|---|---|---|
| 1 | b2b-osint | b2b-osint-en | b2b-osint-ar | Customer OSINT: 6-layer verification and risk scoring | تحريات العميل: WHOIS وبريد وعقوبات وتقييم مخاطر |
| 2 | b2b-customer-intel | b2b-customer-intel-en | b2b-customer-intel-ar | Deep customer profile: decision chain, buying preferences | ملف عميل متعمق: سلسلة القرار وتفضيلات الشراء |
| 3 | b2b-email-intel | b2b-email-intel-en | b2b-email-intel-ar | Email intel: 120+ platform check and authenticity scan | فحص خلفية البريد: كشف المنصات وتقييم الموثوقية |
| 4 | b2b-email-imitation | b2b-email-imitation-en | b2b-email-imitation-ar | Email imitation: learn from samples, write originals | تقليد البريد: تحليل النماذج وكتابة رسائل أصلية |
| 5 | b2b-cold-outreach | b2b-cold-outreach-en | b2b-cold-outreach-ar | B2B cold outreach: promo, outreach, follow-up | كتابة رسائل B2B الباردة: ترويج، تواصل، متابعة |
| 6 | b2b-linkedin-marketing | b2b-linkedin-marketing-en | b2b-linkedin-marketing-ar | LinkedIn marketing: profile, content, 6-step lead pipeline | تسويق LinkedIn: الملف الشخصي والمحتوى وتطوير العملاء |
| 7 | b2b-social-media | b2b-social-media-en | b2b-social-media-ar | Social media calendars: Facebook, Instagram, TikTok, YouTube | وسائل التواصل: خطط محتوى Facebook وInstagram وTikTok وYouTube |
| 8 | b2b-seo-aeo | b2b-seo-aeo-en | b2b-seo-aeo-ar | SEO + AEO: Google and AI search content optimization | تحسين SEO + AEO لمحتوى Google والبحث بالذكاء الاصطناعي |
| 9 | b2b-sales-pipeline | b2b-sales-pipeline-en | b2b-sales-pipeline-ar | Sales pipeline: 5-stage mapping, 30-day plan, KPI | استراتيجية خط المبيعات: تخطيط ٥ مراحل، متابعة ٣٠ يومًا، KPI |
| 10 | b2b-customer-mgmt | b2b-customer-mgmt-en | b2b-customer-mgmt-ar | Customer profiles and A/B/C tiering, CSV import | إدارة ملفات العملاء وتصنيفهم A/B/C واستيراد CSV |
| 11 | b2b-data-directory | b2b-data-directory-en | b2b-data-directory-ar | Data directory: knowledge base setup and upkeep | إدارة دليل البيانات: إعداد قاعدة المعرفة وصيانة الملفات |
| 12 | b2b-market-analysis | b2b-market-analysis-en | b2b-market-analysis-ar | Market analysis and go-to-market war map | تحليل الأسواق وخريطة دخول السوق |
| 13 | b2b-product-description | b2b-product-description-en | b2b-product-description-ar | High-conversion B2B product descriptions using FAB | أوصاف منتجات B2B عالية التحويل بطريقة FAB |
| 14 | b2b-guarantee-proposal | b2b-guarantee-proposal-en | b2b-guarantee-proposal-ar | Multi-agent B2B proposals with tiered ROI analysis | مقترحات أعمال B2B متعددة الوكلاء مع تحليل ROI |

## File locations / أماكن الملفات

Base: `/Users/h/.hermes/skills/`

Default pattern: `b2b-<name>-en/SKILL.md` and `b2b-<name>-ar/SKILL.md`.

Exceptions (stored in category folders):
- `customer-development/b2b-email-intel-en/SKILL.md`, `customer-development/b2b-email-intel-ar/SKILL.md`
- `sales-conversion/b2b-email-imitation-en/SKILL.md`, `sales-conversion/b2b-email-imitation-ar/SKILL.md`
- `sales/b2b-cold-outreach-en/SKILL.md`, `sales/b2b-cold-outreach-ar/SKILL.md`
- `marketing/b2b-linkedin-marketing-en/SKILL.md`, `marketing/b2b-linkedin-marketing-ar/SKILL.md`

## Verification / التحقق

All 28 mirrors were checked: no Chinese characters remain, source/translation metadata is correct, section headings, code fences and table rows are preserved, and all register as available skills.
تم التحقق من النسخ الـ 28: لا توجد أحرف صينية متبقية، البيانات الوصفية صحيحة، وتم الحفاظ على العناوين والجداول والأكواد، وكلها مسجلة ك مهارات متاحة.
