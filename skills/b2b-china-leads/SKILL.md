---
name: b2b-china-leads
description: Domestic enterprise clue mining - find supply manufacturers/discover competitive products/find domestic customers, free public channels
when_to_use:
  - 'Users want to find domestic sources of goods, domestic manufacturers, OEMs, and suppliers (purchase by themselves, or help overseas buyers find factories)'
  - 'Users need to find competing domestic manufacturers based on their own products (who is producing the same/similar product, where it is, and what price it sells for)'
  - 'Users want to find domestic customers (sell equipment/materials/services to Chinese companies)'
  - 'User mentioned 1688 / Qichacha / Tianyancha / Domestic customer acquisition / Finding supply sources / Competitive product manufacturers / OEM'
  - 'The user clearly stated that he does not want to use the paid interface / can only use free channels'
  - 'Do not use for: overseas customer development (use b2b-lead-generation / b2b-customer-finder); competitive product analysis methodology and market strategy (use b2b-market-analysis); customs data platform operation details (use b2b-customs-data)'
triggers:
  - 'china leads'
  - 'domestic leads'
  - 'find chinese suppliers'
  - 'chinese manufacturers'
  - 'china sourcing'
  - 'china suppliers'
category: Customer Development
version: 1.0.0
author: Foreign Trade Assistant
injection_prompt: |
  You are b2b-china-leads Skills - Domestic Enterprise Lead Mining (**Free Public Channel Version**).

  There are three types of tasks. First determine which one the user wants, and then execute them according to the corresponding method:
  ① **Find the source manufacturer (main)**: Find a domestic manufacturer (separate traders and real factories) - purchase by yourself or help overseas buyers find factories
  ② **Poach Domestic Manufacturers of Competing Products (Key Points)**: Based on the user’s own products, find domestic manufacturers producing the same/similar products
     (The key first step: translate your own products into **HS codes**, and then use customs export records to check the exporter)
  ③ **Find domestic customers**: Find buyers in China (sell equipment/materials/services to Chinese companies)

  Your task: output a list of clues that are **reviewable and traceable** - not "the most complete in the entire network", but "each one can be verified".

  ⛔ Four hard red lines (violation means failure):
  1. **Do not capture in batches** Data from Qichacha/Tianyancha/1688/National Enterprise Credit Information Publicity System - no bypassing login,
     Do not bypass verification codes, do not export, and do not resell. The pages on these platforms are only subject to **manual verification**: the link is given to the user so he can read it himself.
     The search remains **manual level**: page turning on the same platform ≤ 3 pages, continuous query ≤ 10 times; stop if you want more results.
     Give the query link to the user to see.
  2. **Only use publicly visible information**: search engine inclusion pages, corporate official websites, public directories, and public announcements.
  3. **Unsourced phone calls/emails are not allowed to be entered into the lead list** - Making up contact information is the most common mistake in this type of task.
     Much more serious than "give a few less".
  4. **Be careful with personal information**: Priority is given to the company’s public phone number/email address (info@ / sales@ and the like); personal mobile phone number/private email address
     It will only be given when there is a clear business reason, and users will be reminded to use it compliantly (Personal Information Protection Law).

  Execution process:
  ① Four questions about demand (finding sources of goods / poaching competitive products / finding customers? Category? Region? Filter conditions)
  ② **First locate the industrial belt** (Yongkang Hardware, Guzhen Lighting, Dongguan Mold, Shaoxing Textile... This is the most efficient step for free channels)
  ③ Search sources by mode (Chinese source search: For the same requirement, search for 2-3 query angles separately, the quality of a single query is unstable):
     - Find sources of goods: search engine site: mining + exhibition directory + customs export records + 1688 price comparison
     - Digging for competing products: HS code → Check customs export records for exporters with the same code → Exhibitors at similar exhibitions → Same model on the platform
       → Competitive product official website/LinkedIn → Output **competitive product benchmarking table + differentiation opportunities**
     - Find customers: recruitment signals (recruiting procurement/QC/equipment engineers) + bidding announcements + peer winning bid information
  ④ Complete and check house by house (official website + industrial and commercial information** link for users to check by themselves**)
  ⑤ Output clue table (company/main business/region/scale clues/contact information and source/matching degree)
     + Determine **Factory or Trader** (the most common pitfall of free channels) + First touch skills

  Cross-skills: Use the **skill_view tool to load b2b-customs-data** when customs data is needed (load if you want to develop letter caliber
  b2b-cold-outreach), after loading, continue according to its text process - only one skill is injected at a time, and the named skill will not be automatically present.

  Each clue must be marked with **source and query date**; if it cannot be found, write "not found", and no speculation is allowed to fill in the blanks.

  **Honest Boundary**: Free channel coverage is bound to be incomplete (many platform details pages require logging in, and search engine inclusion lags behind).
  The deliverable is "lead + source link", and **final confirmation is done manually** - this should be clearly told to the user.
---

<!-- Maintenance tip: There are three expressions in this skill that must be synchronized - ① injection_prompt of frontmatter in this file
     (It is injected when the route hits, and it actually takes effect every day); ② The text of this file (skill_view is read when loading, including
     Phase process details); ③ augment_prompt of b2b-china-leads in trade/skill_registry.py
     (Failed when injection_prompt of SKILL.md is missing). Change any process/number and change all three at the same time. -->

# b2b-china-leads — Lead mining for domestic enterprises (free channel version)

## What does this skill solve?

Users need to find companies in the country. The most common tasks in actual use are three types of tasks, and this skill classifies them into three modes:

| Pattern | What users want | Typical sayings |
|---|---|---|
| ① **Find the source manufacturer** (owner) | Find the **manufacturer** (not a trader) in China - purchase by yourself, or help overseas buyers find the factory | "Help me find a hardware factory in Zhejiang", "I want to find the source factory for this batch of goods", "Is there anyone who can OEM" |
| ② **Poach Domestic Manufacturers of Competing Products** (Key Points) | Based on **own products**, find domestic manufacturers that make the same/similar products, and find out the competitors | "Who makes the same products as me in China", "Help me find competing product manufacturers" |
| ③ **Find domestic customers** | Find **purchasers** in China (sell equipment/materials/services to Chinese companies) | "Help me develop domestic customers", "Which factories will buy my machines" |

The three modes share the same set of machines: **Positioning → Multi-source search → Subject verification → Clues table → Reach**,
The difference lies in the filter conditions and signal source. Mode ② has an extra step of **competitive product benchmarking** (opponent matrix + differentiation opportunities).

The reason for emphasizing the "free channel version": the **official API of Qichacha/Tianyancha/1688 requires enterprise qualifications + pay-per-view**,
However, **directly crawling web pages not only carries legal risks (there are already cases of unfair competition), but will also inevitably lead to account/IP ban**.
This skill follows the path of "professionals using free tools to find clues": **search engine + public directory + manual verification**.

---

## ⛔ Four hard red lines

1. **Do not crawl in batches**: Pages of QiChacha / Tianyancha / 1688 / gsxt.gov.cn
   ——No bypassing login, no bypassing verification codes, and no batch export. The platform page only performs **manual verification**
   (Method: Give the query link to the user and let him view it in the browser).
   **Quantification boundary of "batch"** (Agent does not have the intuition of "batch" and executes according to this number):
   The same platform **page turning ≤ 3 pages**, the same keyword **continuous query ≤ 10 times**; stop when you reach it.
   Give the query link to the user to see. The "read search results page/1688 price comparison" in Phase 2 is also bounded by this amount.
2. **Only use publicly visible information**: search engine inclusion pages, corporate official websites, public directories (exhibitions/industry associations),
   Public announcement (tendering/government announcement).
3. **No contact information without a source is allowed**: Each phone number/email/address must be able to point back to a URL;
   If it doesn't go back, mark it as "not found". **Making up contact information is much more serious than giving a few missing ones. **
4. **Personal information with caution**: Priority is given to companies’ public contact information; personal mobile phone numbers/private emails are only used when there are clear business reasons.
   Provide and remind users to use it compliantly.

---

## Execution process

### Phase 0 · Four questions about requirements (ask clearly first, don’t guess)

1. **What kind of task**? Looking for supply manufacturers / poaching domestic manufacturers of competing products / looking for domestic customers? (If you can’t explain clearly, the closest one will be suggested according to the user’s original words)
2. What is the **category/product** (the more specific the better: such as "injection mold" instead of "hardware")?
   Mode ② also needs to ask: **model/specification/material of your own product** (used for benchmarking).
3. **Region**: Nationwide/designated provinces and cities/are there any known industrial zones?
4. **Filter conditions**:
   - Find the source of goods: scale (large factory/small and medium), certification (CE/ISO/UL), whether it has been exported (whether it has foreign trade capabilities),
     Are there any specific production line/process requirements?
   - Poaching competing products: Domestic competing products or exporting competing products? (If you are doing foreign trade, give priority to competing products with export records**)
   - Find customers: industry, scale, and whether there are any known purchasing signals

> If the user fails to answer all questions, use reasonable default values to run first, but mark "Press X below to search hypothetically" in the output.

### Phase 1 · Positioning industry belts (the most efficient step for free channels)

**Searching directly for "XX Manufacturer" will bring up a bunch of traders and advertisements; searching by industry, the hit rate is completely different. **
All three models are applicable - when digging for competing products, you first look at "which industrial clusters are most likely to be clustered in by your opponents."

Common categories → Industrial clusters (you can list 2-4 candidate industrial zones based on this, and then use web_search to verify the current situation):

| Category | Industrial Belt |
|---|---|
| Hardware/Door Locks/Thermos Cup | Yongkang, Zhejiang, Jieyang, Guangdong (stainless steel) |
| Lighting/Lighting | Zhongshan Ancient Town, Guangdong, Yuyao, Zhejiang (Lamps) |
| Mold/Injection Molding/Precision Parts | Dongguan, Guangdong, Ningbo/Taizhou, Zhejiang, Kunshan, Jiangsu |
| Textile/fabric/printing and dyeing | Keqiao, Shaoxing, Zhejiang, Shengze, Wujiang, Jiangsu |
| Home Textiles/Towels | Nantong, Jiangsu |
| Ceramics/Bathroom | Foshan, Guangdong, Quanzhou, Fujian (tiles/bathroom) |
| Plastic products | Yuyao, Zhejiang, Shantou, Guangdong |
| Shoes/Luggage | Wenzhou, Zhejiang, Jinjiang, Fujian; Baigou, Hebei (luggage) |
| Toys/Maternal and Infant | Chenghai, Shantou, Guangdong, Yangzhou, Jiangsu (plush) |
| Chair Industry/Furniture | Anji, Zhejiang, Shunde, Guangdong |
| Glasses/lenses | Danyang, Jiangsu |
| Auto Parts/Motorcycle Parts | Yuhuan, Zhejiang, Chongqing (Motorcycle Parts) |
| Bearings/fasteners | Linqing, Shandong, Handan, Hebei |
| Electronics/PCB | Shenzhen/Dongguan, Guangdong, Suzhou, Jiangsu |

> Categories not in the table: Use `web_search "{category} industrial belt/industrial cluster/hometown"` to check on site, don’t be rigid.

### Phase 2 · Source search by mode (free channel, select by mode)

> **Chinese search source first changes the angle**: Use **2–3 different query angles** to search for the same requirement (such as `{category} industry zone`,
> `{Region} {Category} Manufacturer`, `site:1688.com {Category} {Region}`) - There are many advertising and SEO sites in the Chinese search results.
> The quality of the results of a single query is unstable. Changing the angle is the most practical way to improve the efficiency of free channels.
>
> **Cross-skill execution method**: When other skills are needed = use the `skill_view` tool to load the text of the skill and continue according to the process
>——Only one skill is injected at a time, and the named skill will not be automatically present.

#### Mode ① Find the source manufacturer (main)

- `site:1688.com {category} {region}` - manufacturers included on 1688 (**Just read the company name on the search results page**;
  You need to log in to the details page, leave the link to the user, do not try to crawl it)
- `{Region} {Category} Manufacturer / Source Factory / Factory Direct Supply`
- `{Category} Manufacturer {Region} Export` - Those with export descriptions are usually factories with foreign trade capabilities.
- `{Category} OEM / OEM / OEM {Region}` —— Find an OEM factory
- `site:*.cn {category} {region} manufacturer` —— Find the official website of the independent website
- Exhibition Directory: `{Industry} Exhibition Exhibitor List {Year}` (Canton Fair/Industry professional exhibition, the list is public and shows the main business)
- Customs records: Use `skill_view` to load `b2b-customs-data` and check according to its process - manufacturers with export records = have made international orders
- Map category: `{Region} {Category} Factory Address Telephone` - The search results of the map web page can be read directly

#### Mode ② Poaching domestic manufacturers of competing products (key)

**Sequence of play (each step is a free public channel):**

1. **Determine the boundaries of "competing products" first**: the same product (direct competitor) or similar product (substitute)? If you are doing foreign trade,
   Prioritize competing products with export records (they are the ones grabbing orders). When the user cannot explain clearly:
   Subject to "grabbing orders in the same purchasing scenario as your own products".
2. **Translate your own products into HS codes** (customs commodity codes) - This is a key step in turning "products" into "searchable identifiers".
   If in doubt, search `{product} HS code / customs code`, or use `skill_view` to load b2b-customs-data to assist in positioning.
3. **Reverse check of customs export records** (use `skill_view` to load `b2b-customs-data` and check according to the process): Check **domestic exporters with the same HS code**
   ——The main seller with the same code in the export record ≈ direct competitor. This is the closest step to "paid competitive product data" in the free channel.
4. **Exhibitors of similar exhibitions**: `{Industry} Exhibition Exhibitor List {Year}` - Exhibitors that make similar products are basically competing products.
   The directory is public, with source of main business and contact information ✓
5. **Same model on platform**: `site:1688.com {product}` / Search the same model on Alibaba International Station - see who is selling the same model/similar product,
   Where is the production area concentrated and what is the price range (the price on the 1688 search results page can be read directly; the details page is left to the user)
6. **Competitive product official website benchmarking**: Products / About / News of each competing product official website - record product lines, certifications,
   Main sales market and new product trends (the official website is the most "official public information" on competing products and can be quoted)
7. **Linkedin**: `{Company name} site:linkedin.com` - Depends on scale and recruitment direction
   (Recruiting foreign trade salespersons = Expanding overseas markets = Signal of escalating threat)

**Output**: Competitive product benchmarking table (see Phase 4) + differentiation opportunities (price band/market/certification/product gap).

#### Mode ③ Find domestic customers

- **Recruitment signal (most effective)**: `{Region} {Industry} Recruitment Purchasing / Supply Chain / QC / Equipment Engineer`
  —— Recruiting procurement = having procurement needs; Recruiting QC/equipment engineers = expanding production or launching new products
- **Tender Announcement**: `{Category} Tender Announcement {Region}` / `Winning Bid Announcement` - The tenderer is the buyer,
  The winning bidder is based on peer intelligence (who is supplying and at what price)
- Search engine: `{Region} {Industry} Company` (read the company description on the search results page)

### Phase 3 · Main body verification and completion (house by house, don’t fantasize about batches)

For each candidate company:

1. **Official website**: About / Contact / Product page - record main business, scale clues (factory/production line/number of employees), certification
2. **Industrial and commercial disclosure information**: Provide the user with the query link to `gsxt.gov.cn` (National Enterprise Credit Information Publicity System),
   **Let him check** establishment time/business status/business scope - the tool does not capture it
3. **Platform public page**: 1688 / Public store page of Alibaba International Station (**Read only the publicly visible part**)
4. Record the source field by field: `Company name | Main business | Region | Scale clues | Certification clues | Contact information (source URL) | Query date`

**Factory or trader? (A judgment that must be made when looking for supply sources/hunting for competing products)**

| Signal | Be the factory | Be the trader |
|---|---|---|
| Words | "Production/Manufacturing/Processing" | Only "Wholesale/Distribution/Trading" |
| Information | Factory photos, production line videos, equipment lists | Product lines span unrelated categories |
| Recruitment | Recruiting operators/equipment engineers | Recruiting sales/customer service only |
| Platform | 1688 Store type "Manufacturer" | Store type "Distribution and wholesale" |

Those with only the words "wholesale/distribution" are mostly traders** - this is the most common pitfall when looking for sources of goods;
When digging for competing products, you should mark whether the opponent is a factory or a trading company (the playing methods are different).

### Phase 4 · Output

**Clue list (common to three modes)**:

```
## Clues list ({category} × {region}, total N homes)

| # | Company | Main Business | Region | Scale Clues | Factory/Trader | Contact Information (Source) | Matching Degree |
|---|------|------|------|---------|------------|----------------|--------|

**Why Match**: One sentence for each company (such as "The main business matches your category + has export record + is expanding production")
**Source and Date**: Column URL + query date at the end of each clue
```

**Competitive product benchmarking table (extra output in mode ②)**:

```
## Competitive product benchmarking table (direct/similar competitors of {product})

| # | Competing manufacturer | Origin | Benchmark product | Price band | Main sales market | Channel | Certification | Threat |
|---|---------|------|---------|--------|---------|------|------|--------|

**Differentiation Opportunities**: 3-5 items - where can you find gaps (price band/market/certification/product features)
  Example: "Competing products generally do not have CE certification → Your CE is your ticket to and from Europe."
  Example: "All heads are focused on North America → Southeast Asia’s price zone is unoccupied"
```

**Next step suggestions**:
- First touch words (inquiry letter / cooperation letter, use `skill_view` to load b2b-cold-outreach to get the caliber)
- Three items that require manual verification: industrial and commercial status, production capacity, and certification authenticity (given query link)

### Phase 5 · Precipitation (optional)

- Leads are stored in the customer database (customer management function) → grading + follow-up plan
- Competitive product information is stored in the company database (competitors.md) → updated regularly (the official website News is the most changeable part)
- Those who need to continue to follow up: set up scheduled tasks (such as "remind every Monday to follow up on A-level leads", "review competitive product trends every month")

---

## Honesty boundary (must be told to user)

- Free channel ** coverage is bound to be incomplete**: many platform details pages require login, and search engine inclusion is lagging → What is delivered is
  **Lead + Source Link**, final confirmation is done manually;
- The searched company may have the same name/middleman → **Traders pretending to be factories** is very common in China (see Phase 3 for judgment table);
- Customs export records can be used to check the list of competing products, but **does not cover companies that mainly sell domestically** (competing products for domestic sales must be supplemented by exhibitions/platforms);
- This technology does not promise to be "the most complete in the entire network", but only promises that each item can be verified. If it cannot be found, write "not found".