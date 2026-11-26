---
name: auto-smtp-email
description: "(Disabled) SMTP Email Sending — This skill is disabled and will not be triggered by the system"
when_to_use:
  - 'Configure automatic SMTP email'
  - 'The user mentioned "automatic email sending" and "smtp configuration"'
  - 'Do not use for: Manual single mailing (use b2b-cold-outreach)'
triggers:
  - 'send email'
  - 'smtp send'
  - 'send cold email'
  - 'bulk send'
  - 'mail out'
  - 'dispatch email'
category: system tools
version: 1.0.0
author: Trade
injection_prompt: |
  This skill has been disabled by Trade (auto-smtp-email is not in the installation list and will not be triggered by routing).

  **Do not call SMTP/smtplib, do not read or write SMTP credentials, and do not automatically send any mail. **

  When you need to send an email: Use b2b-cold-outreach to generate a draft, which the user can copy and send.
---

# auto-smtp-email — (disabled, retained as reference record only)

This skill **will not be installed, will not be registered, and will not be triggered by routing** (`trade/skill_registry.py`
`_BLOCKED_SKILLS` intercepted, cleaned up by `_purge_blocked_skills` during installation and startup).

This file is kept just to document Trade's design decisions: the AI can draft emails, but it can't send them on behalf of the user.
If you need to write a development letter, please use `b2b-cold-outreach`. The draft will be checked by the user before being sent manually.