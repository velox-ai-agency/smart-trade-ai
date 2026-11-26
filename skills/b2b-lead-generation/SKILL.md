---
name: b2b-lead-generation
description: Multi-channel customer development — searching, development letters, inquiry responses, quotation objection handling, and negotiations
when_to_use:
  - "Users mention 'find customers', 'develop customers', 'development letters'"
  - "Need multi-channel customer search (Google Maps / LinkedIn / Facebook / customs data)"
  - "Received an inquiry and need to respond promptly (not training/review)"
  - "Customer finds price too high, haggles, compares prices, needs price objection handling"
  - "Generate inquiry replies / quotation negotiations / follow-up emails"
  - "Analyze B2B platforms (AliInternational Station / China Manufacturing Network) for potential customers"
  - "User pastes product/company info to find potential buyers"
  - "Do not use for: single customer deep profiling (use b2b-customer-intel)"
triggers:
  - 'lead generation'
  - 'find customers'
  - 'customer development'
  - 'prospect'
  - 'prospecting'
  - 'lead gen'
  - 'leadgen'
  - 'follow up'
  - 'follow-up'
  - 'negotiation'
  - 'closing'
  - 'inquiry'
  - 'payment terms'
  - 'delivery time'
  - 'lead time negotiation'
  - 'price negotiation'
  - 'target price'
  - 'subject line'
  - 'subject line optimization'
  - 'multi-language email'
  - 'multilingual email'
  - 'arabic email'
  - 'spanish email'
  - 'german email'
  - 'french email'
  - 'portuguese email'
  - 'russian email'
  - 'japanese email'
  - 'korean email'
  - 'find buyers'
  - 'get customers'
  - 'look for customers'
  - 'new customers'
  - 'buyer'
  - 'purchasing manager'
  - 'procurement'
  - 'reply to inquiry'
  - 'inquiry reply'
  - 'first response'
  - 'respond to inquiry'
  - 'price objection'
  - 'too expensive'
  - 'price is too high'
  - 'price too high'
  - 'negotiate price'
  - 'customer says expensive'
category: Customer Development
version: 1.3.2
author: Foreign Trade Assistant
injection_prompt: |
  You are b2b-lead-generation skills. Used for multi-channel customer development with three parallel search channels.

  ════════════════════ ════════════════════
  Iron Rule: Always use three-channel parallel search
  ════════════════════ ════════════════════

  When users say "find customers", "find leads", "find buyers", enable three-channel parallel search. Single-channel search misses many quality customers, so three-channel parallel is mandatory.

  **Three channels for customer search**:

  **Channel A — Google Maps** (local distributors/wholesalers):
  - `{product} distributor in {country/city}`
  - `{product} wholesaler near {city}`
  - `{product} supplier {country}`
  - Execution: `web_search` each query, then `browser_navigate` to Google Maps pages to extract business name/website/phone/address

  **Channel B — Google Search** (B2B buyer sites):
  - `{product} buyer OR importer OR purchasing {country}`
  - `site:linkedin.com/in {product} procurement {country}`
  - `site:linkedin.com/company {product} {country}`
  - `{product} "purchasing manager" OR "procurement lead" {country}`
  - `{product} trade shows {country} 2026` → get exhibition exhibitor lists
  - Execution: `web_search` for each query (top 20 results), `browser_navigate` to linkedin.com/company pages to extract website domain + employee size

  **Channel C — Facebook Pages / LinkedIn Company Pages**:
  - Facebook: `site:facebook.com {product} {country}`
  - Facebook: `site:facebook.com "{product brand}" {country}`
  - LinkedIn: `site:linkedin.com/company {product} {country} "1-10 employees" OR "11-50 employees"`
  - Execution: `web_search` and extract company name/website/employee count/key people

  **Cross-channel deduplication** (critical):
  1. Extract `company_website` from each result (strip www./http://, normalize to domain.com)
  2. Keep only the most complete entry for each domain (prefer contact+LinkedIn+phone)
  3. No website → deduplicate by facebook.com/{page-id}

  **Post-deduplication sorting**:
  - Priority 1: Hits all 3 channels (strongest signal)
  - Priority 2: Hits 2 channels
  - Priority 3: Hits 1 channel but complete info (email+phone+LinkedIn)

  **Blacklist filter** (remove these entirely):
  | Category | Blacklist Pattern | Example |
  |--------|------------------|---------|
  | Platform directory pages | URL contains alibaba.com / made-in-china.com / tradekey.com / globalsources.com | Product pages are not buyers |
  | Aggregation pages | URL contains yellowpages.com / yelp.com / opencorporates.com | These are directories not customers |
  | Competitors | Same industry supplier websites (you sell same products) | Same product + manufacturer search results |
  | Government institutions | URL contains .gov / .edu / .org (unless clearly procurement) | Usually not target customers |
  | Broken links | browser_navigate returns 404 / 503 | Unreachable |
  | Placeholder pages | Website uses Wix/Squarespace template with no business details | Usually hollow companies |

  **Multi-language querying**:
  For non-English target markets, must generate local language query variants:
  - Spanish markets (Latin America/Spain): `{product} distribuidor {country}` / `{product} mayorista {country}`
  - Arabic markets (Middle East): `{product} موزع {country}` / `{product} مستورد {country}`
  - German markets (DACH): `{product} Händler {country}` / `{product} Großhändler {country}`
  - French markets: `{product} distributeur {country}` / `{product} grossiste {country}`
  - Russian markets: `{product} дистрибьютор {country}` / `{product} оптовый {country}`
  - Portuguese markets (Brazil/Portugal): `{product} distribuidor {country}` / `{product} atacadista {country}`

  **Output format**:
  ```
  ## 🔍 Three-channel Search Results

  ### Channel Distribution
  | Channel | Raw Results | After Deduplication | After Blacklist |
  |-------|-------------|---------------------|-----------------|
  | A: Google Maps | N1 | N1' | N1'' |
  | B: Google Search | N2 | N2' | N2'' |
  | C: FB/LinkedIn | N3 | N3' | N3'' |
  **Final Candidates**: N companies

  ### TOP 10 Candidate Customers
  | # | Company Name | Website | Country | Channel | Email | LinkedIn | Phone |
  |---|--------------|---------|---------|---------|-------|----------|-------|
  | 1 | ... | ... | ... | A+B+C | ... | ... | ... |
  ```

  **Lead Scoring Matrix**:
  After search results, score each candidate on 6 dimensions (0-5 points each, 30 total):

  | Dimension | Weight | 0 points | 3 points | 5 points |
  |-----------|--------|----------|----------|----------|
  | **Industry Match** | Does product match customer's main business? | Unrelated industry | Relevant but not core | Perfect core business match |
  | **Purchasing Power** | Company size/employee count/estimated annual revenue | Micro enterprise | Medium enterprise | Large enterprise/chain |
  | **Decision Chain Reachability** | Found key contact email/LinkedIn | Only info@ | Found department head | Found decision maker+direct email |
  | **Import Maturity** | Has import experience/multi-language site/certifications | Pure domestic | Some import traces | Active importer/multi-supplier |
  | **Market Signal** | Recent news/hiring/expansion signals | No signal/contraction | Stable operation | Expansion/hiring/funding |
  | **Competitive Barrier** | Does customer have stable China supplier? | Exclusive supplier | Multiple suppliers, no China | No China supplier/sourcing |

  **Scoring output format**:
  ```
  | # | Company | Industry Match | Purchasing Power | Decision Reach | Import Maturity | Market Signal | Competitive Barrier | Total | Tier |
  |---|---------|----------------|------------------|----------------|-----------------|---------------|---------------------|-------|------|
  | 1 | XXX | 5 | 4 | 3 | 4 | 5 | 3 | 24 | A |
  ```

  Tier standards: A-tier ≥22 points | B-tier 16-21 points | C-tier <16 points

  For A-tier customers, prioritize b2b-osint for deep background check. B/C-tier customers, label as "batch developable" or "low priority".
  Before delivering, run the self-check and the quality-gate checklist in this skill's body.
  ## Inquiry first response + quote / price objections
  - First response: reply to every inquiry within 30 minutes during working hours; outside hours, next working day within 2 hours.
  - Price objection ladder: concede 5% → 3% → 1% only after confirming volume, payment terms and delivery window.
  - Never lead with a discount; lead with value, then anchor the concession to a trade-off.
  
  ## Red lines (never cross)
  - Never fabricate scarcity, competition, price rises, lead times, or "manager approval".
  - Never promise price, payment terms, lead time or exclusivity beyond your authority.
  - No off-book commissions or kickbacks, ever.
  - This module is derived from training material and has not yet been validated with real users.
---

## Phase 4: Follow-up Sequences

### Standard Follow-up Sequence

| Day | Action | Channel | Content |
|-----|--------|---------|---------|
| Day 1 | Initial outreach | Email | Cold email |
| Day 3 | Follow-up #1 | Email | Brief reminder + new value |
| Day 7 | Follow-up #2 | LinkedIn | Connection note or InMail |
| Day 14 | Follow-up #3 | Email | Different angle or question |
| Day 30 | Final attempt | Email | Break-up email (last chance) |

### Follow-up Email Templates

#### Day 3 — Gentle Reminder

```
Subject: Re: [Previous subject]

Hi [Name],

Just following up on my note below — wanted to make sure it didn't get buried.

Happy to hop on a quick call if you'd find it helpful, or if now's not the right time, no worries at all.

Just reply here and I'll leave you alone! 😅

Best,
[Your name]
```

#### Day 14 — Different Angle

```
Subject: [Question related to their business]

Hi [Name],

Quick question: What's your biggest challenge right now with [topic related to your product]?

We recently helped a company in your space solve [specific problem] — might be relevant to what you're working on.

Worth a quick chat?

Best,
[Your name]
```

#### Day 30 — Break-Up Email

```
Subject: Last note from me 👋

Hi [Name],

I've tried reaching out a few times but haven't heard back — I imagine you're busy!

I'm going to close your file for now. But if you ever want to chat about [topic], my door's always open.

Best of luck with [their goals],
[Your name]
```

## Phase 5: Customer Types & Communication Strategies

### Type 1: Retailer / Small Wholesaler

| Characteristic | Description |
|----------------|-------------|
| Decision speed | Fast — days to weeks |
| Order size | Small (1-3 months inventory) |
| Price sensitivity | High |
| Communication | Direct, no fluff |
| MOQ expectations | Flexible preferred |

**Strategy**: Fast response, competitive pricing, small MOQ options, focus on speed

**Key phrase**: "Fast, precise, aggressive"

### Type 2: Trading Company / Middleman

| Characteristic | Description |
|----------------|-------------|
| Decision speed | Medium — weeks to months |
| Order size | Medium |
| Price sensitivity | Medium-high |
| Communication | Professional, formal |
| Commission expectation | Often expect kickback |

**Strategy**: Find the real decision-maker, offer reasonable commission, be their preferred supplier

**Key phrase**: "Find the real decision-maker, leave room for commissions"

### Type 3: OEM / Brand Buyer

| Characteristic | Description |
|----------------|-------------|
| Decision speed | Slow — months to years |
| Order size | Large (long-term contracts) |
| Quality focus | Very high |
| Communication | Technical, detailed |
| Customization | Expects ODM/OEM capability |

**Strategy**: Show R&D capability, certifications, quality control, samples before commitment

**Key phrase**: "Display R&D and certification capabilities"

### Type 4: Chain Supermarket / Big Box

| Characteristic | Description |
|----------------|-------------|
| Decision speed | Very slow — 6-18 months |
| Order size | Very large (national rollout) |
| Compliance focus | Extremely high |
| Communication | Very formal, legal-heavy |
| Margin pressure | High |

**Strategy**: Be patient, expect audits, prepare for strict compliance, long runway

**Key phrase**: "Prepare for prolonged battle"

## Phase 6: Inquiry Handling — The 30-Minute Rule

**Reply to all inquiries within 30 minutes during working hours.**

### Inquiry Response Template

```
Subject: Re: [Product inquiry from XXX]

Dear [Name],

Thank you for your inquiry about [product]!

I've attached our [product catalog / quotation sheet / specifications] for your reference.

[Answer to their specific question(s)]

Regarding your requirements:
- MOQ: [X] pieces
- Lead time: [X] days
- Payment terms: [Your standard terms]

Could you please clarify:
1. [Specific question 1]
2. [Specific question 2]

Looking forward to your feedback!

Best regards,
[Your name]
[Title] | [Company]
[Phone] | [WeChat/WhatsApp]
```

## Phase 7: Price Negotiation Framework

### The 3-Step Price Negotiation

**Step 1: Reframe the Comparison**
```
"While our price might be higher than [competitor/supplier], consider:
✅ [Certification/quality advantage]
✅ [Lead time advantage]
✅ [After-sales service advantage]"
```

**Step 2: Value Breakdown**
```
"Our pricing includes:
📦 [Full package contents]
✅ [Included service 1]
✅ [Included service 2]
💰 [Payment terms advantage]"
```

**Step 3: Win-Win Analysis**
```
"Let's look at this from both sides:
[Your concern] → [Our solution]
[Their concern] → [Your flexibility]
= [Mutually beneficial outcome]"
```

### Price Positioning Strategies

| Strategy | When to Use | Approach |
|----------|------------|----------|
| **Low-price leader** | Commoditized product, high volume | Competitive pricing, accept thin margins |
| **Value-based pricing** | Differentiated product, strong position | Price reflects total value including service |
| **Penetration pricing** | New market entry | Set initial low price to gain market share |
| **Premium pricing** | High quality, strong brand | Higher price signals quality |

## Phase 8: Quote Generation

### Quote Must Include

```
QUOTATION
Date: [Date]
Quote No.: [XXX]

To: [Client Name]
Company: [Company]
Email: [Email]

Product: [Product name]
Model/Spec: [Model/spec details]
MOQ: [X] pieces
Unit Price: [Price] [Currency]
Total (for MOQ): [Total]

Price Terms: [FOB/CIF/EXW/DDP]
Payment Terms: [T/T 30/70]
Lead Time: [X] days
Validity: [X] days

Remarks:
- [Additional terms or notes]

Best regards,
[Your name]
[Company]
```

## Phase 9: Sample Management

### Sample Process

```
1. SAMPLE REQUEST
   → Confirm sample requirements (quantity, specs)
   → Confirm sample fee and shipping

2. SAMPLE PREPARATION
   → Produce/procure sample
   → Quality check before shipping

3. SAMPLE SHIPPING
   → Choose appropriate shipping method
   → Provide tracking number
   → Include thank-you note and business card

4. SAMPLE FOLLOW-UP
   → Check if received
   → Ask for feedback
   → Answer any questions

5. SAMPLE TO ORDER
   → Convert sample order to bulk order
   → Negotiate terms and pricing
```

## Phase 10: Order Follow-Up & Tracking

### Order Tracking Timeline

| Stage | Action | Communication |
|-------|--------|---------------|
| Order Confirmed | Send PI for signature | Email |
| Production Started | Photo/video of production | WeChat/Email |
| QC Inspection | Send inspection report | Email |
| Shipping | Send BL/tracking | Email |
| Delivery | Confirm receipt | Phone/WeChat |
| 30-Day Follow-up | Check satisfaction | Email |
| 90-Day Follow-up | Request review/referral | Email |

## Quality Standards

1. **Response time**: Reply to all inquiries within 30 minutes during business hours
2. **Personalization**: Every outreach message must reference something specific about the prospect
3. **No placeholders**: All templates must be filled with actual prospect data before sending
4. **Professionalism**: Consistent formatting, grammar, and branding in all communications
5. **Follow-through**: If you promise something (quote, sample, call), deliver it
6. **Documentation**: Log all customer interactions in the customer record

---

## Subject Line Variants (Lavender.ai style)

Generate 3-5 variants for every email. Apply to any email template above.

**Example — For a hydraulic tool OEM reaching out to a distributor:**

- Strategy A — Personalized Reference: `[Company] | Streamlining Tooling Supply`
- Strategy B — Question/Curiosity: `Quick question about your tooling lead times`
- Strategy C — Trigger Event: `Re: Hannover Messe — hydraulic solutions for your lineup`
- Strategy D — Value-First: `30% faster tooling delivery for [Company Name]`

**Example — For a food packaging buyer in Germany:**

- Strategy A — Personalized Reference: `[Company] | Sustainable tray solutions`
- Strategy B — Question/Curiosity: `Still struggling with moisture in meat packaging?`
- Strategy C — Value-First: `15% lower leak rate vs industry average`
- Strategy D — Trigger Event: `Following up on Anuga Food Fair`

## Multi-Language Email Variants

When target market is non-English, generate dual-language versions with localized formatting.

### Arabic + English (Middle East buyers)

```
Subject: Supporting [Company]'s [pain point] with [solution]

Dear [Name],

[Same value proposition in English, not literal translation]

We help companies in the [industry] sector [solution] through:
→ [Specific benefit 1]
→ [Specific benefit 2]

Looking forward to discussing how we can support your business.

Best regards,
[Your name]
```

### Spanish + English (Latin American buyers)

```
Subject: Optimización de [pain point] para [Company Name]

Estimateado/a [Name],

Noté que [Company Name] enfrenta desafíos con [pain point]. En [Your Company] ayudamos a empresas del sector [industry] a [solution].

→ [Specific benefit 1]
→ [Specific benefit 2]

¿Le parece bien una llamada de 15 minutos esta semana?

Saludos cordiales,
[Your name]
```

### German + English (DACH buyers)

```
Subject: Effizientere [solution] für [Company Name]

Sehr geehrte/r Herr/Frau [Name],

ich habe festgestellt, dass [Company Name] im Bereich [industry] tätig ist. Eine häufige Herausforderung ist [pain point].

Wir unterstützen Unternehmen wie Ihres dabei, [solution] zu erreichen:
→ [Specific benefit 1]
→ [Specific benefit 2]

Ich freue mich auf ein kurzes Gespräch.

Mit freundlichen Grüßen,
[Your name]
```

### Regional Language Quick Reference

| Region | Language | Subject Tone | Formal Greeting |
|--------|----------|-------------|-----------------|
| Middle East | Arabic + English | Formal, relationship-first | السيد المحترم / Dear |
| Latin America | Spanish + English | Warm, professional | Estimado/a / Dear |
| Brazil | Portuguese + English | Warm, personal | Prezado/a / Dear |
| Germany/Austria | German + English | Direct, formal | Sehr geehrte/r |
| France | French + English | Formal, polite | Madame/Monsieur |
| Russia/CIS | Russian + English | Formal, direct | Уважаемый/ая |
| Japan | Japanese + English | Very formal, humble | 敬具 / Dear |
| South Korea | Korean + English | Formal, respectful | 안녕하세요 / Dear |

## Common Pitfalls

1. **Product-first mentality** 🔴 **Most critical**: First sentence introduces company and product. Correct method: Talk about customer's difficulty → what you can do → briefly mention product
2. **One-size-fits-all outreach**: Always personalize — mass messages get ignored
3. **Giving up too early**: Multiple follow-ups usually outperform a single touch; conversion varies by industry and client (no fixed percentage)
4. **Empty marketing speak**: Don't say "quality good price advantage service good" — specify "each batch has X inspection data" / "from order to shipment takes Y days" / "we are certified by CE/FDA in EU/US"
5. **Ignoring time zones**: Respect the prospect's working hours
6. **Weak subject lines**: The subject line determines if your email gets opened
7. **No clear CTA**: Always tell the prospect what to do next
8. **Price-only negotiation**: Never compete on price alone — compete on unique value only you provide
9. **Skipping sample phase**: Always insist on sample approval before bulk orders

## Anti-Marketing Tone Self-Check (Must execute before delivery)

> After generating any development letter/email/reply, must check against the following checklist item by item. Any item that fails must be rewritten before checking again; cannot skip.

### Forbidden Words List (Rewrite if found)

| Category | Forbidden Expression | Replace With |
|----------|---------------------|--------------|
| Empty marketing speak | "Quality good price advantage service good" | "Each batch has X inspection data / From order to shipment takes Y days / We are certified by CE/FDA" |
| Marketing hard sell | "Best price / Lowest price / Best quality" | Specific data + comparison anchor (e.g., "MOQ 200 vs Industry 500")|
| Pushy phrases | "Act now / Limited time / Don't miss out" | Objective time window (e.g., "Our Q3 production capacity is only 30% remaining")|
| Boasting | "We are the leading / We are the best" | Customer endorsement (e.g., "X company has used us for 3 years, with 85% repeat rate")|
| Vague promises | ""We can do anything / We support everything"" | Clear boundaries (e.g., "We do X do not do Y, because X is our strength")|

### Anti-Marketing Tone Grammar Check

Read the development letter and ask yourself 5 questions:

1. **Does the first sentence talk about the customer rather than yourself?** — Must be customer ("I noticed your...") not yourself ("We are...")
2. **Is 60% of the text about the customer's pain points rather than about the product?** — Must be customer pain points
3. **Is there specific detail about this customer?** — Must have (customer website/dynamic/product line section)
4. **If you remove the company name, is this email applicable to any industry?** — If yes, it fails (too generic)
5. **Can the customer feel within 5 seconds that "this letter is about me"?** — Cannot if yes, rewrite

### Anti-Spam Rules (Avoid Junk Folder)

**Subject line**:
- [ ] No spam trigger words: FREE / GUARANTEED / 100% / WINNER / URGENT / ACT NOW / LIMITED TIME / NO OBLIGATION
- [ ] No all caps (e.g., "BUY NOW" → "Buy now")
- [ ] No excessive exclamation marks (max 1)
- [ ] Character count 30-50 (mobile preview 5-7 words)
- [ ] No excessive special characters ($$$ / !!! / ???)

**Body**:
- [ ] Max 1 capitalized word (proper nouns excepted)
- [ ] Emphasis (bold) ≤2 places
- [ ] Image area < 50% of total area
- [ ] Include unsubscribe method ("Reply STOP to unsubscribe")
- [ ] Attachment < 10MB
- [ ] Recipient not role email (info@/sales@/contact@ reminds user to find specific person name)
- [ ] HTML email must also have plain text version (multipart/alternative)
- [ ] Font uses web-safe (Arial / Helvetica / Georgia)

## A/B Testing (Mandatory for every development letter)

> Generate 2 text variants for the same customer, choose one to send. This is not optional — 99% of development letters die because "I thought this was good".

### Variant Generation Rules

For the same background research result, generate 2 variants:

- **Variant A — Problem-first**: Open with 1-2 sentences that directly hit the customer's likely pain point, then 2-3 bullet points for solution, finally 1 CTA
- **Variant B — Value-first**: Open with 1-2 sentences showing specific value they'll get (data), then 1-2 evidence supports, finally 1 CTA

The two variants must:
- Be based on the same background research result (cannot use different info for A and B)
- Have different subject lines (A uses strategy A personalization, B uses strategy B curiosity)
- Have the same CTA (avoid testing too many variables)
- Have word count difference ≤20%

### Selection Rules

Default recommend Variant A (problem-first), reason: overseas buyer pain-point driven > value-driven.
But choose Variant B when:
- Customer is chain supermarket / big brand (they're surrounded by suppliers, pain-point emails too common, value-email more fresh)
- Customer posted hiring / expansion signals on LinkedIn (indicating budget, value-email more direct)
- Customer is trading company / middleman (they care about "how much can I profit" rather than "what problem can you solve")

### Output Format

```
━━━ Variant A — Problem-first ━━━
Subject: [Subject A]
Body:
[Body A]

━━━ Variant B — Value-first ━━━
Subject: [Subject B]
Body:
[Body B]

━━━ Recommendation ━━━
Recommend variant [A/B], reason: [based on customer type]

⚠️ Anti-marketing tone check: [PASS/FAIL]
⚠️ Anti-spam check: [PASS/FAIL]
```

## Phase 11: 6 Standard Email Promotion Sequences

(Letter 1-6 from LinkedIn customer acquisition to deal completion)

**Letter 1 (Product Introduction)**: A short introduction + a differentiating selling point. Subject contains the other party's company name or industry word. Don't mention the price.

**Letter 2 (Profit Margin/Value Guidance)**: Help the customer calculate — "Your retail price is $X, our FOB price is $Y, your gross profit margin is 4x." Data speaks.

**Letter 3 (Offer Sheet)**: Attached is a PDF quotation, including MOQ/delivery/payment terms. Indicate an expiration date to create a sense of urgency.

**Cover 4 (Certification/Testing Report)**: Attached are ISO/CE/UL and other certifications. Industrial product buyers value this most. "We are certified by..." works better than any sales pitch.

**Letter 5 (Factory inspection/factory strength)**: Attached is the factory inspection report (SMETA/BSCI), factory videos or photos, and production line introduction. "Come visit our factory".

**Letter No. 6 (Trial order promotes Pilot Order)**: Lower the threshold — "We can start with a 20pcs trial order." Attached are screenshots of customer reviews.

## Quality Gate Checklist — 60-second check before sending

> Each time generate email/quote/reply, check against the corresponding scenario's checklist. Missing any item can cause customer loss.

### 1. Development Letter (Cold Email)
- [ ] References a specific detail from customer's website/dynamic/product line? (not generic "I saw your website")
- [ ] Title ≤ 8 words? (mobile 5-7 word preview)
- [ ] Is 60% customer pain points + 25% hard power + 15% CTA?
- [ ] 3-5 subject line variants provided (strategy A/B/C/D)?

### 2. Inquiry Reply (Inquiry Reply)
- [ ] First, confirm customer's needs (specifications, quantity, certification) before quoting?
- [ ] Ask at least 2 clarifying questions?
- [ ] Reply within 30 minutes during business hours? (next day before 2 hours for non-working time; give substantive progress)
- [ ] Attached product catalog / quotation sheet / specification sheet?

### 3. Quotation (Quotation)
- [ ] Written explicit validity period? (Validity: X days)
- [ ] Written explicit trade terms (FOB/CIF/EXW) + specific location?
- [ ] Written packaging method? (carton/pallet/wooden case)?
- [ ] Written minimum order quantity? (MOQ)?
- [ ] Written payment terms? (T/T 30/70, L/C sight etc.)?
- [ ] Quotation number is unique and traceable?

### 4. Follow-up Email (Follow-up)
- [ ] Provided additional value (market info/similar case/industry news) instead of just reminder?
- [ ] Day 3: Only light reminder ("making sure it didn't get buried")?
- [ ] Day 7: Changed angle (LinkedIn / question)?
- [ ] Day 14: Provided new info instead of repeating first one?
- [ ] Day 30: Has clear "break-up" closure?

### 5. Price Negotiation (Price Negotiation)
- [ ] First asked "What is your target price" before lowering?
- [ ] Compete on differentiated value (certification/delivery/after-sales) instead of just lower price?
- [ ] If must lower price, also **reduced service scope** (like increasing MOQ / extending delivery)?
- [ ] Given 3-step negotiation framework (Reframe → Value Breakdown → Win-Win)?

### 6. Payment Terms Negotiation (Payment Terms)
- [ ] Suggested "30% deposit + 70% balance before bill of lading copy" as compromise solution?
- [ ] Explained why this payment term is needed (material cost/customization degree)?
- [ ] For large orders (>$50K), suggested L/C sight?
- [ ] For old customers, gave more flexible options (like "This time is an exception, next time restore standard")?

### 7. Delivery Time Negotiation (Delivery Time)
- [ ] Warning about rush fee (**"Rush order adds approximately 5% air freight fee"**)?
- [ ] Give customer choice (Air x days vs Sea y days + price difference)?
- [ ] Explain delivery time composition (material preparation N days + production M days + inspection P days)?

### 8. Sample Shipping (Sample Shipping)
- [ ] Notified tracking number (Tracking Number)?
- [ ] Notified estimated arrival date (ETA)?
- [ ] Attached sample usage instructions or inspection points?
- [ ] Followed up same day/next day to confirm receipt?