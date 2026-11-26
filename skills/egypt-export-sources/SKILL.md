---
name: egypt-export-sources
description: Source map for Egyptian export playbooks — Nafeza export declarations, GOEIC export/origin services, and Central Bank of Egypt external-operations rules. Verified public sources only; it does not replace official confirmation.
triggers:
  - "egypt export sources"
  - "egypt export declaration"
  - "export from egypt"
  - "GOEIC"
  - "Nafeza"
  - "CargoX"
  - "Central Bank of Egypt"
  - "埃及出口资料"
  - "埃及出口来源"
  - "نافذة"
  - "البنك المركزي المصري"
injection_prompt: |
  You are the Egypt export source map: Nafeza export declarations, GOEIC export/origin services, and Central Bank of Egypt external-operations rules. It is a source map, not legal, customs or banking advice.

  Before any checklist, confirm four inputs: direction (export from / import into / transit), destination, product or 4–6 digit HS code, and transport mode.

  Quote each source by name; state clearly that anything not re-checked with the competent authority and the exporter's bank may be out of date.

  Load the source list with `skill_view`.
---

# Egypt Export Sources (source map only)

This skill is a **shared source map** for other Egyptian-market playbooks. It is not legal, customs or banking advice, and it does not translate or modify any existing playbook. Every requirement quoted from these sources must be re-checked with the competent authority and the exporter's bank before it is relied on.

## Mandatory first questions

Before using any checklist based on this map, ask for all four:

1. **Direction** — export from Egypt, import into Egypt, or transit?
2. **Destination** — country and, where relevant, port/authority.
3. **Product / HS code** — at least 4 digits, preferably 6.
4. **Transport mode** — sea, air, land or rail.

If any of the four is missing, stop and ask. Do not guess a filing requirement from a generic template.

## Never mix these two systems

- **Nafeza / ACI / CargoX = import side.** ACI (Advance Cargo Information) and the ACID number apply to goods **entering Egypt**; the foreign shipper uses a verified CargoX account. Do not ask an Egyptian exporter for an ACID for an outgoing shipment.
- **Nafeza export declaration services = export side.** For goods **leaving Egypt**, use the export declaration services on https://www.nafeza.gov.eg/ and confirm the current service list with Egypt Customs (https://customs.gov.eg/). Destination-side pre-arrival systems (Fasah, IPAFFS, TRACES/CHED, MOCCAE, etc.) belong to the destination, not to ACI.

## Source map

### 1. Egypt Customs / Nafeza — export declarations and import-side ACI

- Egypt Customs: https://customs.gov.eg/
- Nafeza portal: https://www.nafeza.gov.eg/
- Import-side ACI service page: https://customs.gov.eg/Services/ACI
- ACI support: 15460 / aci.support@customs.gov.eg

Use for: export declaration steps from the Egyptian side; separately, import-into-Egypt pre-registration. Keep the two flows in separate sections of any checklist. The ACI legal basis is Article 39 of Customs Law 207/2020 and the relevant ministerial decisions; verify current applicability before quoting it.

### 2. GOEIC — exporter registration and certificates of origin

- Exporters' register: https://www.goeic.gov.eg/en/electronicServices/12
- Exports and origin services: https://www.goeic.gov.eg/en/services-and-activities/Exports-and-origin
- Authorized exporter / approved source: https://www.goeic.gov.eg/ar/services-and-activities/authorized-source
- Contact: 19591

Use for: whether the company is listed in the exporters' register, and for preferential/non-preferential certificates of origin and approved-source codes. Note that published renewal periods conflict between instruments — confirm the actual period with GOEIC rather than stating a number.

### 3. Central Bank of Egypt — external operations

- Circulars index: https://www.cbe.org.eg/en/laws-regulations/regulations/circulars
- Regulations Book 8 (foreign exchange): https://www.cbe.org.eg/ar/laws-regulations/regulations/regulations-book/book-8

Use for: export-proceeds rules, collection/repatriation deadlines, bank guarantees before shipment in specific cases, documentary collections vs. letters of credit, and FX rules. Book 8 is published in Arabic; unofficial English translations exist and must not be quoted as authoritative. Circular texts are often PDFs not exposed through the index — treat any non-indexed summary as unverified.

## Rules for playbooks using this map

1. Ask the four questions above first.
2. Separate export requirements from import requirements explicitly.
3. Cite the source URL and access date for each requirement.
4. Mark anything not directly confirmed on an official page as **unverified** and route it to the bank or authority.
5. Never invent a filing requirement, deadline, form code or fee. If the official page does not show it, say that it could not be confirmed.
6. This map is scaffolding only: do not translate or rewrite existing playbook content as part of using it.
