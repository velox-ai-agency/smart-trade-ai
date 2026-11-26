---
name: b2b-egypt-pack
description: "Use for Egypt targets with Trade-AI skills."
version: 1.0.0
author: Velox-AI
license: MIT
triggers:
  - "egypt pack"
  - "targeting egypt"
  - "egypt market"
  - "egyptian company"
  - "埃及市场"
  - "埃及客户"
  - "埃及公司"
  - "باكت مصر"
  - "شركة مصرية"
  - "السوق المصرية"
metadata:
  hermes:
    tags: [egypt, b2b, osint, sanctions, fresh-produce]
    related_skills: [b2b-osint, b2b-lead-generation, b2b-cold-outreach, b2b-customer-intel]
injection_prompt: |
  You are the Egypt pack. Apply it FIRST whenever the target company, buyer or market is Egyptian, then apply the underlying b2b-* skill on top of it.

  Rules: use Egypt-specific public sources and Arabic-language search (company name, Nafeza/GOEIC registration); do not assume Gulf, Chinese or EU market norms; keep every claim sourced and mark unverified items "Not found yet"; drafts only — never send anything yourself.

  Before answering, load the overrides with `skill_view`.
---

# Egypt pack for Trade-AI skills

## When to use
Use whenever a smart-trade-ai / `b2b-*` skill is applied to an Egyptian company, especially small and mid-size fresh-produce exporters. Load this skill FIRST, then load the specific Trade-AI skill and apply the overrides below on top of it.

Do not use for Chinese-domestic lead mining (`b2b-china-leads`) or Alibaba/MIC platform diagnostics.

## Project-level adaptation
- When the user asks to make the Trade-AI **project** Egyptian rather than Chinese, keep the original Chinese skills untouched and put every Egypt-specific source, playbook and bot rule in this overlay. Mirror the overlay into the project repo at `skills/b2b-egypt-pack/` as well as the Hermes skills directory, so the project itself carries the adaptation; treat the Hermes copy as the source of truth and re-sync after edits.
- The external-facing bot requirement for this project is a **Customer Support Chatbot for the company's own customers**. Do not reframe it as lead generation, OSINT, or an internal staff assistant; its scope is answering customer questions, handling order/shipping/payment/document queries and escalating to a human.
- If a requirement arrives truncated or garbled, ask for the missing clause once. A short corrective phrase from the user is the complete replacement — proceed with the remaining items instead of re-asking or waiting for the original wording.

## Golden rules
1. Default output language: Arabic (Egyptian, technical terms in English). Switch to English when the user asks. **Override any underlying skill rule that forces Chinese** (e.g. `b2b-customer-intel` and `b2b-daily-automation` force Chinese analysis/summaries; the `b2b-tender-*` skills default to Chinese unless `TRADE_LANG=en`). Set `TRADE_LANG=en` when running a tender skill.
2. Label every claim: `[Fact]` with source URL + access date, `[Inference]`, or `[Missing]`. Never invent a contact, certification, volume, or price.
3. "No sanctions match" is not a clearance certificate. It means no watchlist hit in OpenSanctions at query time.
4. This pack overrides China-specific assumptions in the underlying skill. Where they conflict, this pack wins.

## Egypt override block (paste into the active skill's instructions)
```
TARGET MARKET: Egypt. Default company type: fresh-produce exporter (small/mid).
DATA SOURCES: expoegypt.gov.eg exporter directory, company website, LinkedIn,
Google Maps, agri.gov.eg, customs.gov.eg, GOEIC approved-exporter list,
Trade Map, Panjiva/Volza where licensed.
CERTS TO CHECK: GlobalG.A.P., GRASP, HACCP, ISO 22000, BRCGS, Organic,
Halal (for GCC buyers), phytosanitary certificate, EU MRL compliance.
TRADE TERMS: Incoterms 2020 (FOB Alexandria / Port Said, CIF), USD or EGP,
not RMB. Buyers: GCC, EU, UK, North Africa.
CHANNELS: Email, LinkedIn, WhatsApp, phone; WeChat/1688/Alibaba-China
only if explicitly relevant.
LANGUAGE: Arabic (Egyptian) default, English technical terms; produce a
ready-to-send English version of every outreach asset.
RISK GATE: run sanctions_check.py on the company name and key people
before any outreach or deal progression.
```

## Workflow
1. **Intake** — company name (Arabic + English variants), website, city, product line, target export markets.
2. **Discover** — `b2b-customer-finder` / `b2b-lead-generation` with the Egypt source list in `references/egypt-sources.md`. Prefer the official exporter directory; dedupe by website domain and phone.
3. **Profile** — `b2b-osint` + `b2b-customer-intel` + `b2b-email-intel`. Drop China-specific checks (China sourcing experience, Canton Fair, Alibaba seller grades); add exporter-registration and cert checks.
4. **Screen** — run `python3 scripts/sanctions_check.py "Company Name" --country eg --schema Organization` (and once per known decision-maker with `--schema Person`, no `--country` flag). Review any score >= 0.85 manually; treat >= 0.95 as HOLD pending human review.
5. **Engage** — `b2b-cold-outreach` / `b2b-email-imitation` / `b2b-linkedin-marketing`, then `b2b-sales-pipeline` for follow-up. Every asset must be bilingual (Arabic + English) and reference one verified, company-specific fact.

## Language override (important)
43 of the 44 Trade-AI skills are written in Chinese. Most already send client-facing content in the target language (usually English), but several force Chinese for analysis and status text. This pack wins: produce the whole deliverable in Arabic (or English on request), including analysis, checks and summaries. For the six `b2b-tender-*` skills export `TRADE_LANG=en` first.

## Skill routing for Egypt
- **Direct**: `b2b-osint`, `b2b-customer-intel`, `b2b-email-intel`, `b2b-cold-outreach`, `b2b-email-imitation`, `b2b-linkedin-marketing`, `b2b-social-media`, `b2b-seo-aeo`, `b2b-sales-pipeline`, `b2b-customer-mgmt`, `b2b-data-directory`, `b2b-market-analysis`, `b2b-product-description`, `b2b-guarantee-proposal`.
- **Adapt with this pack**: `b2b-customs-data` (Egypt/Trade Map sources), `b2b-inquiry-training` (Egypt supplier objections), `b2b-trade-compliance` (fresh-produce certs), `b2b-platform` (independent-site module only), `b2b-exhibition` (local + GCC/EU fairs).
- **Avoid**: `b2b-china-leads`, Alibaba/MIC-specific modules.

## Playbooks installed in this pack (reviewed 2026-11-26)
Load the matching reference before acting. **Status note:** the user cancelled the Egypt-market repositioning; the Egypt trade/Egypt-market playbooks below are dormant reference material, not active product direction. The only active playbook is `references/customer-support-chatbot.md` (the external support bot for the company's own customers).
1. `references/lead-generation.md` — discovery + A/B/C scoring (22–30 = A). Stops at 15 search rounds / 30 candidates. Never contacts anyone. [dormant reference]
2. `references/buyer-deep-check.md` — A-leads only, before any quotation. 6 mechanical layers + 9 manual units, fixed red/yellow/green rule, source+link+date mandatory. [dormant reference]
3. `references/egypt-official-sources.md` — authoritative Egyptian sources (Nafeza/ACI, GOEIC, CBE), exact URLs, caveats and 8 verification queries. **ACI is for incoming cargo to Egypt, not outbound exports.** [dormant reference]
4. `references/shipping-docs-by-destination.md` — document sets per destination (GCC / EU / UK / North Africa) and rejection risks; every rule marked [verified] or [unverified]. [dormant reference]
5. `references/customer-support-chatbot.md` — external-facing support bot for the company's own customers; Arabic + English, escalation-first, no invented facts. [ACTIVE]
6. `references/egypt-market-repo-recon.md` — code/HTML map of the repo changes (pending final approval). [dormant reference]

Not created: a payment-risk playbook (LC / advance / credit terms / EGE / bank-account-change fraud) — deferred by the user; do not cite it as if it exists.

These playbooks never export a customer list to a third party. In all support replies, use `t()` / `langText()` for display only and keep canonical stored values (including Chinese ones in the existing backend) unchanged.

## Bilingual mirrors
Full English and Arabic translations of all 14 direct-routing skills are installed as `b2b-<skill>-en` and `b2b-<skill>-ar` (e.g. `b2b-osint-en`, `b2b-osint-ar`). Originals remain authoritative; translations are for human reading. This pack still overrides both for Egyptian targets. See `references/bilingual-index.md` for the full index and file paths.

## Deliverable shape
Return: (1) company snapshot with sourced facts, (2) sanctions screening result with score and caveat, (3) qualification A/B/C with rationale, (4) one Arabic + one English outreach draft, (5) list of still-missing data.

## Sanctions script
`scripts/sanctions_check.py` reads `OPENSANCTIONS_API_KEY` from the environment (or `~/.hermes/.env`), calls `POST /match/default`, and prints CLEAR / REVIEW / HOLD with the top matches and their dataset names. No API key is ever written into a skill file or report.
