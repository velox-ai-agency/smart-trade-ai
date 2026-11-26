// ═════════════════════ I18N ═════════════════════
const I18N = {
    en: {
        'nav.daily':'Daily Briefing','nav.lead':'Lead Gen','nav.platform':'Site Audit',
        'nav.social':'Social','nav.linkedin':'LinkedIn','nav.customs':'Customs',
        'nav.customers':'Customers','nav.mailboxes':'Mailboxes','nav.docs':'Documents','nav.docgen':'Doc Gen',
        'nav.osint':'Due Diligence','nav.tasks':'Tasks','nav.history':'History',
        'nav.workbench':'📊 Workspace','nav.outreach':'🔍 Outreach',
        'nav.sales':'👤 Sales','nav.tools':'🛠️ Tools','nav.hist':'💬 History',
        'company.select':'— Select Company —','company.add':'Add',
        'chat.ph.daily':'Ask anything, or say "Morning briefing" to start...',
        'chat.ph.lead':'What do you sell? Where? Who are you looking for?',
        'chat.ph.platform':'Paste any website URL for a full audit...',
        'chat.ph.social':'Describe your social media needs...',
        'chat.ph.linkedin':'Describe your LinkedIn marketing needs...',
        'chat.ph.customs':'Upload customs data, then describe your analysis needs...',
        'chat.ph.docs':'Select a library below, or paste file content...',
        'chat.ph.docgen':'Describe the document: e.g. "Create a quotation PPT for EU client"...',
        'chat.ph.osint':'Enter email/domain/company name for background check...',
        'chat.clr':'🗑️ Clear','chat.export':'Export session','chat.session':'Session','chat.library':'— Select Library —','chat.lib.add':'Add Library',
        'footer.update':'Update','footer.restart':'Restart',
        'footer.skills':'Skills Help','footer.skills_update':'Update Skills',
        'footer.upgrade':'Upgrade Guide','footer.onboarding':'Tutorial',
        'footer.copilot':'Chat Copilot',
        'theme.toDark':'Switch to dark theme','theme.toLight':'Switch to light theme',
        'modal.co.title':'🏢 Company Settings','modal.co.tab_list':'Companies','modal.co.tab_identity':'Agent Identity',
        'modal.co.add_title':'Add Company','modal.co.name':'Company Name *','modal.co.name_ph':'e.g. My Trading Co.',
        'modal.co.slug_ph':'Auto-generated','modal.co.slug_tt':'Auto-generated from company name',
        'modal.co.slug':'Slug','modal.co.import':'Import Company Data',
        'modal.co.empty':'No companies yet. Create one below.','modal.co.export':'Export','modal.co.delete':'Delete',
        'modal.co.import_title':'📦 Import Company Data',
        'modal.co.import_desc':'Select a <code>.zip</code> exported from another computer. It contains customer files, conversations, memory and Agent identity, unencrypted.<br>Desktop knowledge-base files are not included; copy them manually to the target machine if needed.<br>A same-name company is merged by default; tick the box below to force a new company if it is a different business.',
        'modal.co.import_force':'Same name but a different company — force create new (tick first, then choose the file)',
        'imp.analyzing':'Analyzing the package. Please keep this page open…','imp.switch_fail':'Could not switch to the target company. Please retry.',
        'imp.target_prompt':'Multiple companies on this machine share the same name. Enter the company ID to merge into:\n','imp.cancelled':'Cancelled: no target company selected',
        'imp.failed':'Import failed: ','imp.no_conflicts':'No same-name customers found. Starting import…',
        'imp.merge_into':'Merge into “','imp.create_as':'Create as “','imp.close_quote':'”',
        'imp.conflicts_title':'Found {n} same-name customers. Choose one by one:',
        'imp.bulk_merge':'Merge all','imp.bulk_create':'Create all','imp.confirm':'Start Import',
        'imp.link_expired':'Import link expired. Please choose the file again.','imp.importing':'Importing. Please keep this page open…',
        'imp.in_progress':'Import is still running. Please wait.',
        'imp.job_expired':'Import job expired (the service may have restarted). Refresh the page and check the company list.','imp.status_fail':'Could not check import status: ',
        'imp.done_prefix':'Import complete: ','imp.done_short':'Import complete','imp.mode_created':'New company created','imp.mode_merged':'Merged into existing company',
        'imp.report':'Import complete: {mode} ({name})\nCustomers +{customers}, conversations +{conversations}, orders +{orders}, files {files}{memory}',
        'imp.memory_added':', memory +{n}','imp.unknown_error':'Unknown error',
        'imp.queued':'Queued','imp.in_progress_short':'Importing','imp.progress':'Importing… ({phase})',
        'imp.timeout':'Import timed out','imp.timeout_status':'Import timed out. Check the logs or retry.',
        'co.name_required':'Please enter the company name','co.created_workdir':'A desktop folder already exists; created as: {name}',
        'co.created_ok':'Company created. Desktop working folder is ready.','co.create_fail':'Creation failed',
        'co.delete_confirm':'Deactivate this company? Data is retained for 30 days, then automatically removed.','co.deleted':'Deactivated','co.delete_fail':'Deletion failed',
        'co.switch_fail':'Could not switch company. Please retry.',
        'co.export_confirm':'The export package contains customers, conversations, memory and Agent identity. Desktop knowledge-base files are not included (copy them manually) and the package is unencrypted. Keep it safe. Continue?',
        'co.exporting':'PACKAGING','co.export_too_large':'The package is too large to build automatically.\nCopy these manually:\n',
        'co.export_fail':'Export failed: ','co.export_note':'The package was exported, but desktop knowledge-base files are not included.\nCopy the folders below as needed and place them in the company desktop folder on the target machine:\n',
        'co.export_warn':'Export complete, with warnings:\n','co.export_ok':'Export complete. Keep the package safe.',
        'co.identity_saved':'Agent identity saved','co.identity_fail':'Save failed',
        'modal.co.contact':'Contact','modal.co.contact_ph':'Name',
        'modal.co.email':'Email','modal.co.website':'Website',
        'modal.co.identity_desc':'Configure the AI Agent identity for this company. Injected into every conversation.',
        'modal.co.identity_label':'Agent Identity (Markdown)',
        'modal.co.identity_ph':'Paste agent-identity.md content...',
        'modal.co.create':'Create Company','modal.co.save':'Save',
        'modal.cust.title':'Add Customer','modal.cust.title_edit':'Edit Customer',
        'modal.cust.name':'Company Name *','modal.cust.name_ph':'Customer company name',
        'modal.cust.contact':'Contact','modal.cust.contact_ph':'Contact name',
        'modal.cust.title_f':'Title','modal.cust.country':'Country','modal.cust.country_ph':'e.g. Italy',
        'modal.cust.email':'Email','modal.cust.phone':'Phone',
        'modal.cust.whatsapp':'WhatsApp','modal.cust.linkedin':'LinkedIn URL',
        'modal.cust.website':'Website','modal.cust.tier':'Tier',
        'modal.cust.tier_none':'None',
        'modal.cust.buyer':'Buyer Type','modal.cust.buyer_none':'Not set',
        'modal.cust.category':'Main Category','modal.cust.category_ph':'Customer main product category',
        'modal.cust.backup_email':'Backup Email','modal.cust.score':'Match Score',
        'modal.cust.score_none':'Not rated',
        'modal.cust.note':'Notes','modal.cust.note_ph':'Projects, requirements, notes...',
        'modal.cust.follow':'AI Follow-up','modal.cust.follow_ph':'AI-generated follow-up strategy...',
        'cust.name_required':'Please enter the company name','cust.updated':'Customer updated','cust.created':'Customer added',
        'modal.lib.title':'📁 Add Library',
        'modal.lib.desc':'Link a local folder as a document library. Agent can read files via read_file.',
        'modal.lib.name':'Library Name *','modal.lib.name_ph':'e.g. Product Quotes',
        'modal.lib.path':'Folder Path *','modal.lib.path_ph':'/Users/xxx/Documents/clients',
        'modal.lib.path_hint':'📌 Mac: Right-click folder → Hold Option → Copy path',
        'modal.lib.notes':'Description','modal.lib.notes_ph':'Optional',
        'modal.lib.create':'Add',
        'modal.upgrade.title':'⬆️ How to Upgrade Trade',
        'modal.upgrade.p1':'The easiest way is to let <strong>Hermes</strong> (AI assistant) handle it. It runs all commands and retries on errors.',
        'modal.upgrade.steps':'Steps',
        'modal.upgrade.li1':'Open terminal:<br><b>macOS</b> — Launchpad → Terminal<br><b>Windows</b> — <code>Win+R</code> → <code>powershell</code>',
        'modal.upgrade.li2':'Type <code>hermes</code> and press Enter to launch Hermes',
        'modal.upgrade.li3':'In the Hermes dialog, paste the following:',
        'modal.upgrade.cmd':'Help me update Trade and restart it. Repo: https://github.com/chefroger/smart-trade-ai',
        'modal.upgrade.p2':'Wait for completion, then refresh the page (<kbd>Ctrl+Shift+R</kbd>).',
        'modal.upgrade.p3':'If <code>hermes</code> is not found, Hermes Agent is not installed. See install guide first.',
        'modal.skills.title':'📖 All 47 Skills Reference',
        'modal.skills.desc':'Type keywords in chat — Trade auto-matches the right skill. Click copy icon for quick prompts.',
        'btn.close':'Close','btn.cancel':'Cancel','btn.save':'Save','btn.ok':'OK',
        'license.expired':'Expired',
        'license.expired_soft':'Your history and data are still here; drafting is paused until activation',
        'license.trial_summary':'Since trial start: {drafts} drafts · {inquiries} inquiries handled · {lookups} product-library lookups',
        'license.expiring':'Expiring Soon','license.valid_until':'Valid until','license.trial':'Trial',
        'license.active':'Active','license.req_code':'Request Code',
        'license.activate_btn':'🔑 Enter Activation Code','license.days_left':'{n} days left',
        'toast.copied':'Copied','toast.saved':'Saved','toast.deleted':'Deleted',
        'toast.updated':'Updated','toast.error':'Error','toast.network':'Network Error',
        'toast.no_company':'Please select a company first','toast.no_export':'Nothing to export in this session yet','toast.csv_ok':'Imported {n} customers',
        'customer.title':'Customers','customer.add':'Add Customer',
        'customer.import':'📥 Import CSV','customer.search':'Search company, contact, email, tag',
        'customer.detail.save':'💾 Save',
        'customer.detail.libs':'📁 Linked Libraries','customer.detail.orders':'📦 Orders',
        'customer.detail.add_order':'+ New Order','customer.detail.convs':'💬 Recent Conversations',
        'customer.detail.no_convs':'No conversations. Click below to start chatting with this customer.',
        'customer.detail.chat_btn':'💬 Chat with this Customer',
        'customer.detail.basic':'Basic Info',
        'customer.detail.link_lib':'— Select Library —',
        'customer.detail.link_btn':'Link',
        'task.title':'Scheduled Tasks','task.no_active':'No active tasks. Check templates above and click "Batch Generate".',
        'task.run_now':'▶ Run Now','task.template':'📋 Task Templates',
        'task.batch':'Batch Generate','task.running':'● Running','task.paused':'○ Paused',
        'history.title':'Chat History',
        'history.no_records':'No chat history',
        // quality stats（30-day rating overview）
        'quality.rated':'Ratings (30d)','quality.avg':'Avg','quality.worst':'Needs work',
        'order.title':'New Order','order.edit_title':'Edit Order',
        'order.no':'Order No.','order.product':'Product *','order.qty':'Qty',
        'order.unit':'Unit','order.price':'Unit Price','order.currency':'Currency',
        'order.price_pending':'Price TBD',
        'order.price_pending_legacy':'Price TBD (legacy data, price not filled)',
        'order.items':'Line items','order.add_line':'+ Add item','order.remove_line':'Remove this line',
        'order.line_total':'Line total','order.items_count':'({n} items)',
        'order.items_required':'Add at least one line','order.item_name_required':'Enter a product name on every line',
        'order.total_pending':'Total TBD','order.price_per_line':'Priced per line',
        'order.amount':'Total','order.status':'Status','order.delivery':'Delivery',
        'order.payment':'Payment Terms','order.notes':'Notes',
        'order.incoterm':'Incoterm','order.port_loading':'Port of loading','order.port_ph':'e.g. Ningbo',
        'order.container':'Container','order.lead_time':'Lead time','order.lead_time_ph':'e.g. 25 days after deposit',
        'order.shipped_at':'Shipped at','order.shipped_ph':'YYYY-MM or YYYY-MM-DD',
        'onb.welcome':'Welcome to Trade AI Assistant!',
        'onb.welcome_desc':"I'm your AI trade assistant. Let me help you get started.",
        'onb.start_btn':'🚀 Get Started',
        'onb.step1_done':'✓ About Trade','onb.step2_active':'● Find Customers',
        'onb.step2_title':'Try a background check on a prospect',
        'onb.step2_desc':'Enter a company name or website — AI will search public info and generate an outreach email',
        'onb.analyze_btn':'Start Analysis','onb.stop_btn':'🛑 Stop',
        'onb.skip':'Skip tutorial',
        'misc.thinking':'Thinking...','misc.loading':'Loading...',
        'misc.no_data':'No data','misc.empty':'Nothing here yet',
        'misc.loading_orders':'Loading orders...',
        'misc.file_preview':'File content is accessed via the read_file tool during Agent conversations. Select a feature in the sidebar and the Agent will automatically read relevant files.',
        'misc.drop_title':'📁 Drop files here',
        'misc.drop_subdir':'Upload to:','misc.drop_total':'{n} files total',
        'misc.drop_confirm':'Confirm Upload','misc.drop_too_many':'... {n} more files',
        'cust.field.name':'Customer Name','cust.field.title':'Title','cust.field.tier':'Tier',
        'cust.field.website':'Website',
        'cust.field.tier_none':'None','cust.field.buyer':'Buyer Type','cust.field.buyer_none':'Not Set',
        'cust.field.country':'Country','cust.field.city':'City','cust.field.category':'Main Category','cust.field.score':'Match Score',
        'cust.field.score_none':'Not Rated','cust.field.email':'Email','cust.field.phone':'Phone',
        'cust.field.backup_email':'Backup Email','cust.field.contact':'Contact Info','cust.field.note':'Notes',
        'cust.field.function':'Function','cust.field.responsibility':'Responsibility',
        'cust.field.follow':'AI Follow-up','cust.field.no_orders':'No orders yet. Click "+ New Order" to add.',
        'cust.followup_note':'Follow-up note','cust.followup_note_hint':'Customer-level note, shown on the primary contact card',
        'cust.field.order_fail':'Failed to load orders',
        'cust.summary.total':'{n} customers','cust.summary.follow_up':'{n} follow-ups',
        'cust.summary.overdue':'{n} overdue','cust.summary.orders':'{amt} order total',
        'brief.title':'Today brief','brief.new_inquiries':'New inquiries','brief.overdue':'Overdue',
        'brief.pending_ship':'To ship','brief.summary_empty':'Brief not generated yet',
        'brief.todo':'To-do','brief.cron':'Cron outputs','brief.cron_empty':'No cron output today',
        'todo.add':'Add to-do','todo.placeholder':'What needs doing? Press Enter to save',
        'todo.due':'Due date','todo.customer':'Customer','todo.no_customer':'— No customer —',
        'todo.save':'Save','todo.overdue':'Overdue','todo.today':'Today','todo.upcoming':'Upcoming',
        'todo.empty':'No to-dos yet — click + to add','todo.confirm_delete':'Delete this to-do?',
        'todo.empty_label':'This to-do has no text','todo.added':'Added to to-do',
        'chat.cmd.sub':'Give a command · customer dev, inquiry reply, quotes, docs — just say it',
        'brief.dash':'—',
        'chat.blocks.draft_warn':'Draft · will not auto-send','chat.blocks.copy_draft':'Copy draft',
        'chat.blocks.next':'NEXT','chat.blocks.copied':'Copied',
        'chat.blocks.edit_draft':'Edit more','chat.blocks.gen_pi':'Generate PI',
        'chat.blocks.copy_note':'You send it yourself from your mailbox',
        'chat.blocks.edit_prompt':'Revise this email draft','chat.blocks.gen_pi_prompt':'Generate a PI from this quotation',
        'brief.done':'DONE · {n}',
        'profile.open':'Customer profile','profile.title':'Customer profile','profile.back_wall':'← Back to wall',
        'profile.circle':'People circle','profile.prefs':'Prefs & gifts',
        'profile.sec.family':'FAMILY','profile.sec.suppliers':'OTHER SUPPLIERS',
        'profile.sec.prefs':'PREFERENCES','profile.sec.taboos':'TABOOS',
        'profile.sec.dates':'KEY DATES','profile.sec.gifts':'GIFTS',
        'profile.add':'+ Add','profile.add_gift':'+ Gift','profile.extract_chat':'Extract from chat',
        'profile.extract_email':'Extract from email','profile.confirm':'Confirm','profile.void':'Void',
        'profile.delete':'Delete','profile.delete_confirm':'Delete this manual entry?',
        'profile.ai_use':'Use for AI','profile.ai_on':'ON','profile.ai_off':'OFF',
        'profile.show_quote':'Quote','profile.ask':'Asked for',
        'profile.pending':'PENDING · {n}',
        'profile.solicit_note':'Local only · not exported · never sent to AI',
        'profile.restart':'Available after restart','profile.empty_circle':'No circle facts yet',
        'profile.empty_prefs':'No prefs / gifts yet','profile.confirmed':'Confirmed',
        'profile.saved':'Saved','profile.pick_category':'Pick a category',
        'profile.bad_category':'Invalid category','profile.subject_ph':'Subject (e.g. name)',
        'profile.content_ph':'Fact content','profile.pick_direction':'Direction',
        'profile.item_ph':'Item','profile.extract_done':'Extracted: facts {f} · gifts {g} · dropped {d}',
        'profile.src_chat':'Talk','profile.src_email':'Email','profile.src_visit':'Visit','profile.src_manual':'Manual',
        'profile.edit':'Edit','profile.add_fact':'Add profile entry','profile.edit_fact':'Edit profile entry',
        'profile.gift_add_title':'Add gift','profile.gift_edit_title':'Edit gift',
        'profile.category':'Category','profile.subject':'Subject','profile.content':'Content',
        'profile.content_required':'Content is required','profile.item':'Item','profile.item_required':'Item is required',
        'profile.direction':'Direction','profile.approx_value':'Amount','profile.currency':'Currency',
        'profile.gift_date':'Date','profile.occasion':'Occasion','profile.note':'Note',
        'profile.invalid_amount':'Invalid amount',
        'profile.attach':'Attach to','profile.attach_none':'No one',
        'profile.attach_primary':'Primary: {name}','profile.attach_primary_default':'Primary',
        'profile.attach_contact_fallback':'Contact',
        'cust.summary.plus_currencies':'+{n} more',
        'order.cust_label':'Customer *','order.cust_select':'-- Select Customer --',
        'order.status_quoting':'Quoting','order.status_ordered':'Ordered','order.status_shipped':'Shipped','order.status_done':'Completed','order.status_cancelled':'Cancelled',
        'order.btn_delete':'🗑 Delete','order.confirm_delete':'Delete this order?',
        'order.created':'Order created','order.updated':'Order updated','order.deleted':'Order deleted',
        'hist.delete_title':'Delete','hist.confirm_delete':'Delete this conversation? This cannot be undone.',
        'hist.deleted':'Conversation deleted','hist.delete_fail':'Delete failed',
        'toast.input_required':'Please fill in library name and path','toast.lib_added':'Library "{name}" added',
        'toast.lib_add_fail':'Failed to add','toast.saved':'Saved','toast.deleted':'Deleted',
        'toast.cust_product_required':'Please select customer and fill in product name','toast.select_library':'Please select a library',
        'toast.complete_onboarding':'Please complete the tutorial first','toast.enter_company':'Please enter a company name or URL',
        'toast.wizard_product':'What do you sell?','toast.wizard_market':'Which market?',
        'toast.activate_fail':'Activation failed','toast.network_retry':'Network error, please retry',
        'toast.request_timeout':'Request timeout',
        'toast.imported':'Imported {n} files to "{dir}"','toast.import_fail':'Import failed',
        'wiz.step1_title':'First: what do you sell?','wiz.step1_desc':'Anything works — "LED lights", "hardware", "textiles"...',
        'wiz.step1_ph':'e.g. LED high bay lights, stainless steel bolts...',
        'wiz.step1_btn':'Next: which markets? →','wiz.step1_indicator':'● What',
        'wiz.step2_title':'Which country or region?','wiz.step2_desc':'e.g. "Germany", "US", "Middle East", "Southeast Asia"',
        'wiz.step2_ph':'e.g. Germany, US, Middle East...',
        'wiz.step2_btn':'Next: what type of customer? →','wiz.step2_indicator':'● Where',
        'wiz.step3_title':'What type of customer?','wiz.step3_indicator':'● Who',
        'wiz.type_distributor':'Wholesaler / Distributor','wiz.type_distributor_desc':'Bulk purchase for local distribution',
        'wiz.type_oem':'Brand / OEM Factory','wiz.type_oem_desc':'OEM production, long-term large orders',
        'wiz.type_retailer':'Retailer / Chain Store','wiz.type_retailer_desc':'Small batch, high frequency',
        'wiz.type_any':'Any type works','wiz.type_any_desc':'Let AI decide the best fit',
        'wiz.launch_btn':'🚀 Find Customers!','wiz.back':'← Back','wiz.skip':'Skip',
        'wiz.step_done':'✓ Products','wiz.step2_done':'✓ Markets',
        'wiz.searching':'Searching for customers...','wiz.searching_desc':'Multi-channel search in progress',
        'wiz.type_names.distributor':'Wholesaler/Distributor','wiz.type_names.oem':'Brand/OEM',
        'wiz.type_names.retailer':'Retailer/Chain','wiz.type_names.any':'All Types',
        'onb.welcome_title':'Welcome to Trade AI','onb.welcome_desc2':'Trade can <strong>auto-research customer backgrounds (OSINT)</strong> and <strong>write professional B2B outreach emails</strong> based on your products.',
        'onb.feat1':'Customs data · Social media · Website audit','onb.feat2':'AI cold emails · Follow-up · Quotations',
        'onb.feat3':'24/7 auto lead gen · Scheduled tasks',
        'onb.start_btn':'🚀 Find First Customer','onb.skip_btn':'Skip, start directly',
        'sys.updating':'Updating...','sys.restarting':'Restarting...',
        'sys.updating_now':'Pulling latest code and installing dependencies, please wait (~1 min)…',
        'sys.update_done_restart':'✅ Update complete. Click "🔄 Restart" to apply.',
        'sys.update_done':'✅ Update complete. Click "🔄 Restart" to apply.',
        'sys.update_fail':'❌ Update failed: ','sys.update_unknown':'⚠️ Update result unknown, check network',
        'sys.update_network':'⚠️ Update request failed, check network',
        'sys.update_confirm':'This will pull code from the GitHub main branch and install dependencies. You restart manually when it finishes.\nYour database is backed up before upgrading.\n\nUpdate now?',
        'sys.update_confirm_current':'Current version {current}, target commit {target}.\nThis will install that commit; you restart manually when it finishes.\nYour database is backed up before upgrading.\n\nUpdate now?',
        'usage.today':'Today {used} / {limit} tokens',
        'usage.unlimited':'Today {used} tokens',
        'usage.over':'Today {used} / {limit} tokens · over quota (not blocked)',
        'sys.restart_toast':'🔄 Restarting Trade...',
        'sys.restart_ok':'✅ Restart command sent, page will refresh soon',
        'sys.restart_fail':'❌ Restart failed: ',
        'sys.restart_busy_update':'Update in progress — restart after it finishes.',
        'sys.restart_wait':'🔄 Service restarting, page will refresh...',
        'sys.restart_timeout':'⚠️ Restart timeout, please refresh manually',
        'sys.skills_updating':'Updating...',
        'sys.skills_ok':'✅ Skills updated!',
        'sys.skills_fail':'❌ Update failed: ',
        'sys.skills_error':'❌ Update error: ',
        'skills.copied':'Prompt copied: ',
        'import.importing':'Importing...','import.confirm':'Confirm Upload',
        'guide.rest':'No task scheduled now',
        'guide.progress':"Today's Progress",
        'mailbox.title':'Mailboxes',
        'mailbox.guide_en_tip':'Guide in Chinese only for now — ask us if you need English help.',
        'mailbox.guide_title':'Connection guide',
        'mailbox.form_title':'Bind a mailbox',
        'mailbox.list_title':'Bound mailboxes',
        'mailbox.preset':'Provider',
        'mailbox.preset_custom':'Other IMAP',
        'mailbox.email':'Email address',
        'mailbox.secret':'Auth code / app password',
        'mailbox.secret_ph':'IMAP authorization code — not your web login password',
        'mailbox.display_name':'Display name (optional)',
        'mailbox.display_name_ph':'e.g. Inquiry inbox',
        'mailbox.host':'IMAP host',
        'mailbox.port':'Port',
        'mailbox.username':'Login username',
        'mailbox.username_ph':'Usually same as email address',
        'mailbox.test':'Test connection',
        'mailbox.bind':'Bind',
        'mailbox.testing':'Testing…',
        'mailbox.test_ok':'Connected',
        'mailbox.test_fail':'Connection failed',
        'mailbox.test_first':'Test the connection successfully before binding',
        'mailbox.need_email_secret':'Enter email address and authorization code',
        'mailbox.bind_ok':'Mailbox bound',
        'mailbox.faq':'FAQ',
        'mailbox.empty_title':'No mailbox bound yet',
        'mailbox.empty_hint':'Follow the guide above, test, then bind',
        'mailbox.col_email':'Mailbox',
        'mailbox.col_status':'Sync status',
        'mailbox.col_actions':'Actions',
        'mailbox.synced_at':'Last sync',
        'mailbox.never_synced':'Never pulled',
        'mailbox.email_count':'{n} messages cached locally',
        'mailbox.pull':'Pull',
        'mailbox.pulling':'Pulling…',
        'mailbox.pull_done':'Pulled {n} new message(s)',
        'mailbox.update_secret':'Update auth code',
        'mailbox.secret_prompt':'New IMAP authorization code (keeps old code if test fails)',
        'mailbox.secret_updated':'Authorization code updated',
        'mailbox.unbind':'Unbind',
        'mailbox.unbind_confirm':'Unbind removes cached mail for this account. Continue?',
        'mailbox.unbind_ok':'Unbound',
        'contacts.add':'Add contact',
        'contacts.empty':'No contacts yet',
        'contacts.primary_badge':'Primary',
        'contacts.extra_badge':'Extra',
        'contacts.edit':'Edit',
        'contacts.delete':'Delete',
        'contacts.delete_confirm':'Delete contact "{name}"?',
        'contacts.deleted':'Contact deleted',
        'contacts.add_title':'Add contact',
        'contacts.edit_title':'Edit contact',
        'contacts.name':'Name *',
        'contacts.function':'Function',
        'contacts.title_f':'Title',
        'contacts.responsibility':'Responsibility',
        'contacts.email':'Email',
        'contacts.phone':'Phone',
        'contacts.whatsapp':'WhatsApp',
        'contacts.wechat':'WeChat',
        'contacts.note':'Note',
        'contacts.name_required':'Name is required',
        'contacts.saved':'Contact saved',
        'contacts.tags_title':'Tags',
        'contacts.tags_ph':'Type a tag, Enter or comma to add',
        'contacts.tags_add':'Add',
        'contacts.tags_empty':'No tags yet',
        'contacts.tags_too_long':'Each tag max 20 characters',
        'contacts.tags_too_many':'At most 20 tags',
        'inquiry.section':'Inquiries',
        'inquiry.empty':'No inquiries yet — create one to start tracking',
        'inquiry.title_ph':'Inquiry title',
        'inquiry.create':'New inquiry',
        'inquiry.delete':'Delete',
        'inquiry.stage_auto':'Auto (from inquiries)',
        'inquiry.manual_badge':'M',
        'inquiry.manual_title':'Manually locked — open the wall to switch back to Auto',
        'inquiry.created':'Inquiry created',
        'inquiry.updated':'Inquiry updated',
        'inquiry.deleted':'Inquiry deleted',
        'guide.progress': "Today's progress",
        'onb.welcome_desc': "I'm your AI foreign-trade assistant — let me help you get started quickly.",
        'onb.osint_placeholder': "Paste a company name or website, e.g. acme-corp.com",
        'rail.osint': "Background OSINT",
        'onb.wait_title': 'TRADE · ONBOARDING  ///  WAITING FOR REPLY',
'dock.bg_tasks': 'BACKGROUND TASKS · {n}',
'dock.collecting': 'Collecting {done} / {total} · {running} running',
'dock.composing': 'Collection complete, generating reply…',
'dock.all_done': 'All complete',
'dock.check_title': 'BACKGROUND CHECK',
'dock.check_status': 'Check in progress',
'dock.collected': 'Collection complete',
'dock.partial': 'Partial — saved results',
'job.queued': 'Queued',
'job.running': 'Running',
'job.done': 'Completed',
'job.partial': 'Partial',
'job.failed': 'Failed',
'job.cancelled': 'Cancelled',
        'onb.request_failed': 'Request failed ({code})',
        'onb.no_response': 'AI returned no valid reply — please try again.',
        'onb.stopped': 'Generation stopped.',
        'onb.network_error': 'Network error: {msg}',
        'onb.save_customer': 'Save to customer library',
        'onb.enter_main': 'Enter main screen',
        'onb.saved_customer': 'Customer saved to library',
        'onb.save_failed': 'Save failed, please retry',
        'onb.osint_prompt': 'Please run a comprehensive customer background check (OSINT) on {q}, then write a professional B2B outreach email based on my company products.',
        'skills.group.客户开发': 'Customer Development',
        'skills.group.内容营销': 'Content Marketing',
        'skills.group.文档管理': 'Document Management',
        'skills.group.招投标': 'Tendering & Bidding',
        'skills.group.平台与数据': 'Platforms & Data',
        'skills.group.客户与销售': 'Customer & Sales',
        'skills.group.合规与支持': 'Compliance & Support',
        'skills.group.Egypt': 'Egypt Pack',
        'skills.b2b-osint.d': 'Customer background check (6 layers: WHOIS/email/sanctions/tech stack/LinkedIn/scoring)',
        'skills.b2b-osint.t': 'background check, company lookup, domain lookup, email lookup, due diligence',
        'skills.b2b-email-intel.d': 'Email intelligence — check registration status across 120+ platforms',
        'skills.b2b-email-intel.t': 'email lookup, email registration, email background check, email intelligence',
        'skills.b2b-lead-generation.d': 'Multi-channel lead generation (Google Maps/LinkedIn/Facebook)',
        'skills.b2b-lead-generation.t': 'find customers, lead generation, cold email, customer development',
        'skills.b2b-customer-finder.d': 'Simple customer development wizard — three questions + auto search + outreach email generation',
        'skills.b2b-customer-finder.t': 'how to find customers, customer finder wizard, customer finder, find customers',
        'skills.b2b-china-leads.d': 'Domestic company lead mining — find suppliers (main) / identify competitor factories (focus) / find domestic customers, via free public channels (industry clusters + search engines + customs records + manual verification, no paid APIs)',
        'skills.b2b-china-leads.t': 'find suppliers, competitor factories, find factories, OEM factories, domestic customers, similar factories, find vendors, factory mining, 1688, Qichacha, Tianyancha',
        'skills.b2b-cold-outreach.d': 'B2B cold outreach email writing (prospecting/promotional/follow-up emails)',
        'skills.b2b-cold-outreach.t': 'prospecting email, promotional email, cold email, outreach',
        'skills.b2b-email-imitation.d': 'Outreach email imitation and rewriting — analyze sample emails, learn structure and style',
        'skills.b2b-email-imitation.t': 'imitate outreach email, based on sample, imitate email, email imitation',
        'skills.b2b-buyer-persona.d': 'Buyer persona and role segmentation — tailor FAB value propositions by role',
        'skills.b2b-buyer-persona.t': 'buyer persona, write by role, write for procurement, buyer persona',
        'skills.auto-trade-customer-development.d': 'Fully automated customer development pipeline — search → background check → scoring → email writing → draft delivery',
        'skills.auto-trade-customer-development.t': 'fully automated customer development, one-click development, auto customer development',
        'skills.b2b-social-media.d': 'Social media marketing (Facebook/Instagram/TikTok/YouTube)',
        'skills.b2b-social-media.t': 'social media, Facebook, TikTok, content calendar, social media marketing',
        'skills.b2b-linkedin-marketing.d': 'LinkedIn marketing strategy and content (profile/posts/InMail)',
        'skills.b2b-linkedin-marketing.t': 'LinkedIn, LinkedIn China, linkedin marketing, InMail',
        'skills.b2b-kol-imitation.d': 'LinkedIn/social media KOL style imitation — analyze style and apply to your own brand',
        'skills.b2b-kol-imitation.t': 'imitate style, learn from influencers, KOL imitation, imitate influencer',
        'skills.b2b-reddit-engagement.d': 'Reddit community engagement — build trust and drive traffic through expert comments',
        'skills.b2b-reddit-engagement.t': 'Reddit, community comments, reddit comment, expert comments',
        'skills.b2b-seo-aeo.d': 'SEO + AEO article generation — optimized for Google + AI search',
        'skills.b2b-seo-aeo.t': 'SEO article, AEO article, search engine optimization, seo article',
        'skills.b2b-short-video.d': 'B2B short video script generation (TikTok/Shorts/Reels)',
        'skills.b2b-short-video.t': 'short video, video script, TikTok script, short video scripts',
        'skills.b2b-market-analysis.d': 'Market analysis battle map — certifications, tariffs, keywords, 3-second hook',
        'skills.b2b-market-analysis.t': 'market analysis, target market, battle map, market analysis',
        'skills.b2b-daily-automation.d': 'Scheduled tasks (morning brief, daily/weekly reports, LinkedIn and social media copy generation)',
        'skills.b2b-daily-automation.t': 'daily tasks, scheduled tasks, morning brief, cron, daily report',
        'skills.b2b-document.d': 'Local document analysis and extraction (PDF, Word, Excel, etc.)',
        'skills.b2b-document.t': 'analyze document, read quotation, review contract, analyze document',
        'skills.b2b-doc-generation.d': 'Generate quotations, contracts, proposals, and PPTs (DOCX/XLSX/PPTX)',
        'skills.b2b-doc-generation.t': 'generate quotation, generate contract, create PPT, generate document',
        'skills.b2b-tech-drawing.d': 'Engineering drawing analysis (experimental) — extract materials, dimensions, and tolerances from PDF drawings',
        'skills.b2b-tech-drawing.t': 'drawing, engineering drawing, casting drawing, technical drawing, blueprint',
        'skills.b2b-data-directory.d': 'Data directory structure management and initialization',
        'skills.b2b-data-directory.t': 'data directory, data structure, where my data is stored',
        'skills.b2b-tender-info.d': 'Tender information scraping and filtering — scheduled keyword search for tender notices',
        'skills.b2b-tender-info.t': 'find tenders, search tenders, tender information, tender notice, tender opportunities',
        'skills.b2b-tender-mail.d': 'Tender email and attachment archiving — pull from inbox without ever marking as read',
        'skills.b2b-tender-mail.t': 'tender email, email archiving, fetch emails, fetch missing attachments, monitor inbox',
        'skills.b2b-tender-processing.d': 'Convert tender documents into an inquiry sheet — generate a fixed 11-column Excel file',
        'skills.b2b-tender-processing.t': 'inquiry sheet, generate inquiry sheet, organize tender, tender document organization',
        'skills.b2b-tender-download.d': 'Bulk download of tender attachments — chunked resume with size and checksum verification',
        'skills.b2b-tender-download.t': 'download tender documents, resumable download, chunked download, download by list',
        'skills.b2b-tender-archive.d': 'Batch extraction and archiving of archives — expand nested packages in multiple rounds, move originals to Trash',
        'skills.b2b-tender-archive.t': 'extract, compressed archive, batch extraction, nested archives, archive cleanup',
        'skills.b2b-tender-doc-match.d': 'Match archived files against a list — match by number and name, package as complete sets',
        'skills.b2b-tender-doc-match.t': 'archive by list, match by number, drawing matching, tender list matching',
        'skills.b2b-platform.d': 'B2B platform store diagnostics and optimization (Alibaba/MIC/independent site)',
        'skills.b2b-platform.t': 'platform diagnostics, Alibaba.com, keyword optimization, store diagnostics',
        'skills.b2b-customs-data.d': 'Customs data analysis to find buyers and market trends',
        'skills.b2b-customs-data.t': 'customs data, import/export records, find buyers, customs data',
        'skills.b2b-customer-intel.d': 'In-depth profile of a single customer — 15-dimension intelligence dossier',
        'skills.b2b-customer-intel.t': 'customer profile, in-depth profile, gift recommendations, kickback, understand customer',
        'skills.b2b-customer-mgmt.d': 'Customer profiles and tiering (A/B/C levels, order tracking)',
        'skills.b2b-customer-mgmt.t': 'customer management, customer profiles, customer tiering, CRM',
        'skills.b2b-sales-pipeline.d': 'Sales pipeline strategy — 30-day follow-up plan + KPI tracking + health dashboard',
        'skills.b2b-sales-pipeline.t': 'sales advancement, follow-up plan, how to follow up, sales pipeline',
        'skills.b2b-inquiry-training.d': 'Inquiry replies and top-sales training — dual-AI adversarial practice',
        'skills.b2b-inquiry-training.t': 'inquiry training, reply practice, simulated buyer, objections',
        'skills.b2b-exhibition.d': 'Full trade-show management — pre-show invitations, on-site follow-up, post-show conversion',
        'skills.b2b-exhibition.t': 'exhibition, trade show participation, Canton Fair, trade show',
        'skills.b2b-product-description.d': 'Product description generator — FAB method for selling points and sales collateral',
        'skills.b2b-product-description.t': 'product description, product copy, Sales Kit, product description tool',
        'skills.b2b-trade-ops.d': 'Trade fulfillment and after-sales communication (payment reminders/claims/exhibitions/factory audits/logistics/after-sales)',
        'skills.b2b-trade-ops.t': 'payment reminders, claims, exhibitions, factory audits, holiday greetings, logistics',
        'skills.b2b-inquiry-meeting.d': 'Inquiry review meeting facilitation — weekly reviews/individual feedback/key inquiries/follow-up action list',
        'skills.b2b-inquiry-meeting.t': 'inquiry analysis meeting, inquiry review, weekly meeting, sales rep review',
        'skills.b2b-sales-playbook.d': 'Top-performer playbook builder — SOPs/script library/onboarding path/pitfall checklist/hook arsenal',
        'skills.b2b-sales-playbook.t': 'top-sales experience, sales SOP, script library, new-hire training',
        'skills.b2b-guarantee-proposal.d': 'Business proposal generator — three-tier options/ROI analysis/implementation roadmap',
        'skills.b2b-guarantee-proposal.t': 'business proposal, strategic recommendation, ROI analysis, solution proposal',
        'skills.b2b-trade-compliance.d': 'Trade compliance checks — cultural taboos/abbreviations/Incoterms/translation review/bidding',
        'skills.b2b-trade-compliance.t': 'cultural taboos, Incoterms, translation review, Amazon listing check',
        'skills.b2b-onboarding.d': 'Complete onboarding package for new companies (company intro/products/marketing/competitor analysis)',
        'skills.b2b-onboarding.t': 'new company, setup, complete solution, how to start, initial setup',
        'skills.b2b-skill-generator.d': 'Auto-create new B2B skills from a requirement description',
        'skills.b2b-skill-generator.t': 'generate skill, create skill, create skill, new skill',
        'skills.b2b-six-thinking-hats.d': 'Six Thinking Hats decision coach — systematic analysis of complex trade decisions',
        'skills.b2b-six-thinking-hats.t': 'decision analysis, thinking hats, pros and cons analysis, decision making',
        'skills.chat-memory.d': 'Chat history lookup (search by today/this week/this month/all)',
        'skills.chat-memory.t': 'said before, talked about last week, history, chat history',
        'skills.auto-smtp-email.d': '[Disabled] Click to learn about the design concept',
        'skills.auto-smtp-email.t': '[This skill is disabled] send email, bulk send, SMTP sending',
        'skills.b2b-egypt-pack.d': 'Egypt market pack — localized overlay for OSINT / cold outreach / customer intel (bilingual output, certifications, sanctions gate)',
        'skills.b2b-egypt-pack.t': 'Egypt market, Egyptian company, Egypt pack, Egypt client, targeting Egypt',
        'skills.egypt-export-sources.d': 'Egypt export source map — Nafeza / GOEIC / CargoX / Central Bank of Egypt sources with verification notes',
        'skills.egypt-export-sources.t': 'Egypt export sources, GOEIC, Nafeza, CargoX, Central Bank of Egypt, Egypt export declaration',
        // START onboarding UI
        'start.button':'Start',
        'start.cancel':'Cancel','start.title':'Set up your company profile',
        'start.no_company':'Select a company first before any private data is loaded.',
        'start.loading':'Loading…','start.error':'Failed to load: {msg}',
        'start.intro':'Answer a few short questions to build a reusable company profile.',
        'start.begin':'Begin','start.skip':'Skip','start.send':'Submit','start.close':'Close',
        'start.answer_ph':'Type your answer','start.undecided':'undecided',
        'start.review_hint':'Only the basics are shown here; optional details can be added later.',
        'start.correct':'Correct','start.confirm':'Confirm',
        'start.edit_hint':'These are the proposed changes. Your confirmed profile stays intact until you apply them.',
        'start.no_changes':'No changes detected. Edit a field above first, then click Correct.',
        'start.edit_token':'Edit token','start.apply':'Apply','start.cancel':'Cancel',
        'start.edit_cancelled':'Edit cancelled — your original profile was preserved.',
        'start.edit_applied':'Changes applied. Please review and confirm.',
        'start.detail_title':'Add detail','start.detail_key':'Field','start.detail_value':'Value',
        'start.detail_reason':'Why it is needed (required)','start.detail_add':'Add',
        'start.detail_why':'Why this is needed: {reason}','start.detail_reason_required':'Please enter a reason first',
        'start.detail_bad_key':'Invalid detail field',
        'start.field.name':'Company name','start.field.country':'Country','start.field.activity':'Activity',
        'start.field.products':'Products','start.field.markets':'Markets',
        'start.question.basics.name':'What is your company name?','start.question.basics.country':'Which country or region is your company in?',
        'start.question.basics.activity':'What is your main business activity?','start.question.basics.products':'Which products do you sell?',
        'start.question.basics.markets':'Which markets do you target? ("undecided" is valid)',
        'start.detail.specifications':'Specifications','start.detail.moq':'MOQ','start.detail.capacity':'Capacity',
        'start.detail.lead_times':'Lead times','start.detail.pricing':'Pricing','start.detail.payment_terms':'Payment terms',
        'start.detail.shipping_terms':'Shipping terms','start.detail.buyer_preferences':'Buyer preferences',
        'start.detail.previous_markets':'Previous markets','start.detail.correspondence_preferences':'Correspondence preferences','start.detail.signature':'Signature',
        'start.credential_title':'Credentials','start.credential_claim':'Credential name or number',
        'start.credential_add':'Add claim','start.credential_unverified':'User-provided, unverified',
        'start.shipment_title':'Shipment paperwork','start.shipment_ref':'Shipment reference','start.shipment_doctype':'Document type',
        'start.shipment_file':'File name','start.shipment_note':'Note','start.shipment_add':'Add document',
        'start.shipment_warning':'Shipment papers apply to a single shipment only — they are not permanent certifications.',
        'start.shipment_bad_type':'Invalid document type',
        'start.doc.certificate_of_origin':'Certificate of origin','start.doc.invoice':'Invoice',
        'start.doc.packing_list':'Packing list','start.doc.bill_of_lading':'Bill of lading',
        'start.reusable_title':'Reusable data','start.reusable_load':'Load reusable data','start.empty_reusable':'No reusable data yet.',
        'start.done':'Profile confirmed.',
        'start.next_hint':'Suggested next step (fills the chat draft only — nothing is sent automatically):',
        'start.next_task':'Open task prompt (fills draft only)','start.next_chat':'Research target markets (fills draft only)',
        'start.next.chat_prompt':'Use skill b2b-market-analysis to research market selection for our products ({products}). Current markets: {markets}. Report target countries, certification requirements, tariffs, keywords and a 3-second hook.',
        'start.next.task_prompt':'Run the {label} task using the confirmed company profile — products: {products}; markets: {markets}.',
    },
    ar: {
        'nav.daily': "الإحاطة اليومية",
        'nav.lead': "توليد العملاء المحتملين",
        'nav.platform': "تدقيق الموقع",
        'nav.social': "وسائل التواصل",
        'nav.linkedin': "LinkedIn",
        'nav.customs': "الجمارك",
        'nav.customers': "العملاء",
        'nav.mailboxes': "صناديق البريد",
        'nav.docs': "المستندات",
        'nav.docgen': "توليد المستندات",
        'nav.osint': "فحص خلفية العميل",
        'nav.tasks': "المهام",
        'nav.history': "السجل",
        'nav.workbench': "📊 مساحة العمل",
        'nav.outreach': "🔍 التواصل مع العملاء",
        'nav.sales': "👤 المبيعات",
        'nav.tools': "🛠️ الأدوات",
        'nav.hist': "💬 السجل",
        'company.select': "— اختر شركة —",
        'company.add': "إضافة",
        'chat.ph.daily': "اسأل أي شيء، أو قل «إحاطة الصباح» للبدء...",
        'chat.ph.lead': "ماذا تبيع؟ أين؟ ومن تبحث عنه؟",
        'chat.ph.platform': "الصق أي رابط موقع (منصة B2B / موقع الشركة / متجر مستقل) لتشخيصه وتحسينه بشكل شامل...",
        'chat.ph.social': "صف احتياجاتك من وسائل التواصل...",
        'chat.ph.linkedin': "اشرح احتياجاتك من تسويق LinkedIn...",
        'chat.ph.customs': "ارفع بيانات الجمارك، ثم صف احتياجاتك من التحليل...",
        'chat.ph.docs': "اختر مكتبة مستندات أدناه ثم اسأل، أو الصق محتوى الملف مباشرة...",
        'chat.ph.docgen': "صف المستند المطلوب، مثلاً: \"أنشئ عرض سعر بصيغة PPT لعميل أوروبي\"...",
        'chat.ph.osint': "أدخل البريد الإلكتروني/النطاق/اسم الشركة لإجراء فحص شامل للخلفية...",
        'chat.clr': "🗑️ مسح",
        'chat.export': "تصدير المحادثة",
        "chat.session": "جلسة",
        'chat.library': "— اختر مكتبة المستندات —",
        'chat.lib.add': "إضافة مكتبة مستندات",
        'footer.update': "تحديث",
        'footer.restart': "إعادة تشغيل",
        'footer.skills': "مساعدة المهارات",
        'footer.skills_update': "تحديث المهارات",
        'footer.upgrade': "دليل الترقية",
        'footer.onboarding': "دليل البداية",
        'footer.copilot': "مساعد الدردشة Copilot",
        'theme.toDark': "التبديل إلى الوضع الداكن", 'theme.toLight': "التبديل إلى الوضع الفاتح",
        'modal.co.title': "🏢 إعدادات الشركة",
        'modal.co.tab_list': "الشركات",
        'modal.co.tab_identity': "هوية الوكيل",
        'modal.co.add_title': "إضافة شركة جديدة",
        'modal.co.name': "اسم الشركة *",
        'modal.co.name_ph': "مثال: شركة التجارة الخاصة بي",
        'modal.co.slug_ph': "توليد تلقائي",
        'modal.co.slug_tt': "يُنشأ تلقائياً من اسم الشركة",
        'modal.co.slug': "المعرّف",
        'modal.co.import': "استيراد بيانات الشركة",
        'modal.co.empty': "لا توجد شركات بعد. أنشئ شركة جديدة أدناه.",
        'modal.co.export': "تصدير",
        'modal.co.delete': "حذف",
        'modal.co.import_title': "📦 استيراد بيانات الشركة",
        'modal.co.import_desc': "اختر ملف <code>.zip</code> المُصدَّر من جهاز كمبيوتر آخر. يحتوي على ملفات العملاء والمحادثات والذاكرة وهوية الوكيل، وهو غير مشفر.<br>لا تتضمن الحزمة ملفات مكتبة المعرفة الموجودة على سطح المكتب؛ انسخها يدوياً إلى المجلد المقابل على الجهاز الهدف عند الحاجة.<br>تتم دمج الشركة التي تحمل الاسم نفسه تلقائياً؛ وإذا كانت شركة مختلفة، فعّل الخيار أدناه لإنشاء شركة جديدة.",
        'modal.co.import_force': "الاسم نفسه لشركة مختلفة — فرض إنشاء شركة جديدة (فعّل الخيار أولاً، ثم اختر الملف)",
        'imp.analyzing': "جارٍ تحليل الحزمة. يُرجى إبقاء هذه الصفحة مفتوحة…",
        'imp.switch_fail': "تعذّر التبديل إلى الشركة الهدف. يُرجى المحاولة مرة أخرى.",
        'imp.target_prompt': "توجد عدة شركات بالاسم نفسه على هذا الجهاز. أدخل معرّف الشركة المراد الدمج فيها:\n",
        'imp.cancelled': "تم الإلغاء: لم يتم اختيار شركة هدف",
        'imp.failed': "فشل الاستيراد: ",
        'imp.no_conflicts': "لم يتم العثور على عملاء بالاسم نفسه. بدء الاستيراد…",
        'imp.merge_into': "الدمج في «",
        'imp.create_as': "الإنشاء باسم «",
        'imp.close_quote': "»",
        'imp.conflicts_title': "تم العثور على {n} عميل بالاسم نفسه. يُرجى الاختيار واحداً تلو الآخر:",
        'imp.bulk_merge': "دمج الكل",
        'imp.bulk_create': "إنشاء الكل",
        'imp.confirm': "بدء الاستيراد",
        'imp.link_expired': "انتهت صلاحية رابط الاستيراد. يُرجى اختيار الملف مرة أخرى.",
        'imp.importing': "جارٍ الاستيراد. يُرجى إبقاء هذه الصفحة مفتوحة…",
        'imp.in_progress': "الاستيراد لا يزال قيد التنفيذ. يُرجى الانتظار.",
        'imp.job_expired': "انتهت صلاحية مهمة الاستيراد (ربما أُعيد تشغيل الخدمة). حدّث الصفحة وتحقق من قائمة الشركات.",
        'imp.status_fail': "تعذّر التحقق من حالة الاستيراد: ",
        'imp.done_prefix': "اكتمل الاستيراد: ",
        'imp.done_short': "اكتمل الاستيراد",
        'imp.mode_created': "تم إنشاء شركة جديدة",
        'imp.mode_merged': "تم الدمج في شركة موجودة",
        'imp.report': "اكتمل الاستيراد: {mode} ({name})\nالعملاء +{customers}، المحادثات +{conversations}، الطلبات +{orders}، الملفات {files}{memory}",
        'imp.memory_added': "، الذاكرة +{n}",
        'imp.unknown_error': "خطأ غير معروف",
        'imp.queued': "في الانتظار",
        'imp.in_progress_short': "جارٍ الاستيراد",
        'imp.progress': "جارٍ الاستيراد… ({phase})",
        'imp.timeout': "انتهت مهلة الاستيراد",
        'imp.timeout_status': "انتهت مهلة الاستيراد. راجع السجلات أو أعد المحاولة.",
        'co.name_required': "يُرجى إدخال اسم الشركة",
        'co.created_workdir': "يوجد مجلد على سطح المكتب بالاسم نفسه؛ تم الإنشاء باسم: {name}",
        'co.created_ok': "تم إنشاء الشركة. مجلد العمل على سطح المكتب جاهز.",
        'co.create_fail': "فشل الإنشاء",
        'co.delete_confirm': "هل تريد تعطيل هذه الشركة؟ تُحتفظ بالبيانات 30 يوماً ثم تُحذف تلقائياً.",
        'co.deleted': "تم التعطيل",
        'co.delete_fail': "فشل الحذف",
        'co.switch_fail': "تعذّر التبديل إلى الشركة. يُرجى المحاولة مرة أخرى.",
        'co.export_confirm': "تحتوي حزمة التصدير على العملاء والمحادثات والذاكرة وهوية الوكيل. لا تشمل ملفات مكتبة المعرفة على سطح المكتب (انسخها يدوياً) وهي غير مشفرة. يُرجى حفظها جيداً. هل تريد المتابعة؟",
        'co.exporting': "جارٍ التجميع",
        'co.export_too_large': "الحزمة كبيرة جداً ولا يمكن تجميعها تلقائياً.\nيُرجى نسخ ما يلي يدوياً:\n",
        'co.export_fail': "فشل التصدير: ",
        'co.export_note': "تم تصدير الحزمة، لكن ملفات مكتبة المعرفة على سطح المكتب غير مضمّنة.\nانسخ المجلدات التالية حسب الحاجة وضعها في مجلد الشركة على الجهاز الهدف:\n",
        'co.export_warn': "اكتمل التصدير مع تحذيرات:\n",
        'co.export_ok': "اكتمل التصدير. يُرجى حفظ الحزمة جيداً.",
        'co.identity_saved': "تم حفظ هوية الوكيل",
        'co.identity_fail': "فشل الحفظ",
        'modal.co.contact': "جهة الاتصال",
        'modal.co.contact_ph': "الاسم",
        'modal.co.email': "البريد الإلكتروني",
        'modal.co.website': "الموقع الإلكتروني",
        'modal.co.identity_desc': "قم بتكوين هوية وكيل الذكاء الاصطناعي لهذه الشركة. تُحقن في كل محادثة.",
        'modal.co.identity_label': "هوية الوكيل (Markdown)",
        'modal.co.identity_ph': "الصق محتوى agent-identity.md...",
        'modal.co.create': "إنشاء شركة",
        'modal.co.save': "حفظ",
        'modal.cust.title': "إضافة عميل",
        'modal.cust.title_edit': "تعديل العميل",
        'modal.cust.name': "اسم الشركة *",
        'modal.cust.name_ph': "اسم شركة العميل",
        'modal.cust.contact': "جهة الاتصال",
        'modal.cust.contact_ph': "اسم جهة الاتصال",
        'modal.cust.title_f': "المسمى الوظيفي",
        'modal.cust.country': "الدولة",
        'modal.cust.country_ph': "مثال: إيطاليا",
        'modal.cust.email': "البريد الإلكتروني",
        'modal.cust.phone': "الهاتف",
        'modal.cust.whatsapp': "WhatsApp",
        'modal.cust.linkedin': "رابط LinkedIn",
        'modal.cust.website': "الموقع الإلكتروني",
        'modal.cust.tier': "مستوى العميل",
        'modal.cust.tier_none': "بدون تصنيف",
        'modal.cust.buyer': "نوع المشتري",
        'modal.cust.buyer_none': "غير محدد",
        'modal.cust.category': "الفئة الرئيسية",
        'modal.cust.category_ph': "فئة المنتجات الرئيسية للعميل أو قطاعه",
        'modal.cust.backup_email': "البريد الإلكتروني الاحتياطي",
        'modal.cust.score': "درجة التطابق",
        'modal.cust.score_none': "غير مُقيّم",
        'modal.cust.note': "ملاحظات",
        'modal.cust.note_ph': "المشاريع، المتطلبات، الملاحظات...",
        'modal.cust.follow': "متابعة الذكاء الاصطناعي",
        'modal.cust.follow_ph': "استراتيجية متابعة يُنشئها الذكاء الاصطناعي بناءً على ملف العميل...",
        'cust.name_required': "يرجى إدخال اسم الشركة",
        'cust.updated': "تم تحديث العميل",
        'cust.created': "تمت إضافة العميل",
        'modal.lib.title': "📁 إضافة مكتبة مستندات",
        'modal.lib.desc': "اربط مجلدًا محليًا كمكتبة مستندات. يمكن للوكيل قراءة الملفات عبر read_file.",
        'modal.lib.name': "اسم المكتبة *",
        'modal.lib.name_ph': "مثال: عروض أسعار المنتجات",
        'modal.lib.path': "مسار المجلد *",
        'modal.lib.path_ph': "/Users/xxx/Documents/clients",
        'modal.lib.path_hint': "📌 ماك: انقر بزر الماوس الأيمن على المجلد → اضغط Option → انسخ المسار",
        'modal.lib.notes': "الوصف",
        'modal.lib.notes_ph': "اختياري",
        'modal.lib.create': "إضافة",
        'modal.upgrade.title': "⬆️ كيفية ترقية Trade",
        'modal.upgrade.p1': "أسهل طريقة لترقية Trade هي السماح لـ <strong>Hermes</strong> (مساعد الذكاء الاصطناعي) بتولي الأمر؛ فهو ينفّذ جميع الأوامر تلقائياً ويتحقق من الأخطاء ويعيد المحاولة.",
        'modal.upgrade.steps': "الخطوات",
        'modal.upgrade.li1': "افتح الطرفية:<br><b>macOS</b> — Launchpad → الطرفية<br><b>Windows</b> — <code>Win+R</code> → <code>powershell</code>",
        'modal.upgrade.li2': "اكتب <code>hermes</code> ثم اضغط Enter لتشغيل Hermes",
        'modal.upgrade.li3': "في نافذة Hermes، الصق ما يلي ثم اضغط Enter:",
        'modal.upgrade.cmd': "ساعدني في تحديث Trade وإعادة تشغيله. المستودع: https://github.com/chefroger/smart-trade-ai",
        'modal.upgrade.p2': "انتظر حتى اكتمال التنفيذ، ثم حدّث الصفحة (<kbd>Ctrl+Shift+R</kbd>).",
        'modal.upgrade.p3': "إذا لم يتم العثور على <code>hermes</code>، فهذا يعني أن Hermes Agent غير مثبت. راجع دليل التثبيت أولاً.",
        'modal.skills.title': "📖 دليل سريع بجميع المهارات الـ47",
        'modal.skills.desc': "اكتب كلمات مفتاحية في المحادثة — سيطابق Trade المهارة المناسبة تلقائياً. انقر على أيقونة النسخ للحصول على مطالبات سريعة.",
        'btn.close': "إغلاق",
        'btn.cancel': "إلغاء",
        'btn.save': "حفظ",
        'btn.ok': "موافق",
        'license.expired': "منتهية الصلاحية",
        'license.expired_soft': "سجلاتك وبياناتك ما زالت محفوظة؛ تم إيقاف الصياغة مؤقتاً حتى التفعيل",
        'license.trial_summary': "منذ بداية التجربة: {drafts} مسودة · {inquiries} استفساراً تمت معالجتها · {lookups} استعلاماً عن مكتبة المنتجات",
        'license.expiring': "تنتهي قريباً",
        'license.valid_until': "صالحة حتى",
        'license.trial': "تجريبي",
        'license.active': "مُفعّل",
        'license.req_code': "طلب رمز",
        'license.activate_btn': "🔑 إدخال رمز التفعيل",
        'license.days_left': "متبقٍ {n} يوم",
        'toast.copied': "تم النسخ",
        'toast.saved': "تم الحفظ",
        'toast.deleted': "تم الحذف",
        'toast.updated': "تم التحديث",
        'toast.error': "خطأ في العملية",
        'toast.network': "خطأ في الشبكة",
        "toast.no_company": "يرجى اختيار شركة أولًا", "toast.no_export": "لا توجد رسائل لتصديرها في هذه الجلسة",
        'toast.csv_ok': "تم استيراد {n} عميل",
        'customer.title': "العملاء",
        'customer.add': "إضافة عميل",
        'customer.import': "📥 استيراد CSV",
        'customer.search': "ابحث عن شركة أو جهة اتصال أو بريد إلكتروني أو وسم",
        'customer.detail.save': "💾 حفظ التغييرات",
        'customer.detail.libs': "📁 المكتبات المرتبطة",
        'customer.detail.orders': "📦 الطلبات",
        'customer.detail.add_order': "+ طلب جديد",
        'customer.detail.convs': "💬 المحادثات الأخيرة",
        'customer.detail.no_convs': "لا توجد محادثات. انقر أدناه لبدء المحادثة مع هذا العميل.",
        'customer.detail.chat_btn': "💬 بدء محادثة مع هذا العميل",
        'customer.detail.basic': "المعلومات الأساسية",
        'customer.detail.link_lib': "— اختر مكتبة المستندات —",
        'customer.detail.link_btn': "ربط",
        'task.title': "المهام المجدولة",
        'task.no_active': "لا توجد مهام مفعّلة. حدد القوالب أعلاه ثم انقر على «توليد جماعي».",
        'task.run_now': "▶ تشغيل الآن",
        'task.template': "📋 قوالب المهام",
        'task.batch': "توليد دفعات",
        'task.running': "● قيد التشغيل",
        'task.paused': "○ متوقف مؤقتاً",
        'history.title': "سجل المحادثات",
        'history.no_records': "لا توجد سجلات محادثة",
        'quality.rated': "التقييمات (30 يوماً)",
        'quality.avg': "المتوسط",
        'quality.worst': "يحتاج تحسيناً",
        'order.title': "طلب جديد",
        'order.edit_title': "تعديل الطلب",
        'order.no': "رقم الطلب",
        'order.product': "المنتج *",
        'order.qty': "الكمية",
        'order.unit': "الوحدة",
        'order.price': "سعر الوحدة",
        'order.currency': "العملة",
        'order.price_pending': "السعر قيد التفاوض",
        'order.price_pending_legacy': "السعر لم يُحدد (بيانات قديمة، السعر غير مدخل)",
        'order.items': "تفاصيل المنتجات",
        'order.add_line': "+ إضافة منتج",
        'order.remove_line': "إزالة هذا السطر",
        'order.line_total': "إجمالي السطر",
        'order.items_count': "({n} عناصر)",
        'order.items_required': "أضف منتجاً واحداً على الأقل",
        'order.item_name_required': "أدخل اسم المنتج في كل سطر",
        'order.total_pending': "الإجمالي لم يُحدد",
        'order.price_per_line': "التسعير لكل بند",
        'order.amount': "الإجمالي",
        'order.status': "الحالة",
        'order.delivery': "التسليم",
        'order.payment': "شروط الدفع",
        'order.notes': "ملاحظات",
        'order.incoterm': "Incoterm",
        'order.port_loading': "ميناء التحميل",
        'order.port_ph': "مثال: نينغبو",
        'order.container': "الحاوية",
        'order.lead_time': "مدة التسليم",
        'order.lead_time_ph': "مثال: 25 يوماً بعد الدفعة المقدمة",
        'order.shipped_at': "تاريخ الشحن",
        'order.shipped_ph': "YYYY-MM أو YYYY-MM-DD",
        'onb.welcome': "مرحبًا بك في Trade AI Assistant!",
        'onb.welcome_desc': "أنا مساعدك الذكي للتجارة الخارجية، دعني أساعدك على البدء بسرعة.",
        'onb.start_btn': "🚀 العثور على أول عميل",
        'onb.step1_done': "✓ عن Trade",
        'onb.step2_active': "● البحث عن عملاء",
        'onb.step2_title': "جرّب إجراء بحث خلفية عن عميل محتمل",
        'onb.step2_desc': "أدخل اسم شركة العميل أو موقعه — سيبحث الذكاء الاصطناعي في المعلومات العامة وينشئ رسالة تواصل",
        'onb.analyze_btn': "بدء التحليل",
        'onb.stop_btn': "🛑 إيقاف",
        'onb.skip': "تخطي الدليل والبدء مباشرة",
        'misc.thinking': "يفكر...",
        'misc.loading': "جارٍ التحميل...",
        'misc.no_data': "لا توجد بيانات",
        'misc.empty': "لا يوجد شيء هنا بعد",
        'misc.loading_orders': "جارٍ تحميل الطلبات...",
        'misc.file_preview': "يتم الوصول إلى محتوى الملفات عبر أداة read_file أثناء محادثات الوكيل. اختر ميزة من الشريط الجانبي ليقوم الوكيل بقراءة الملفات ذات الصلة تلقائياً.",
        'misc.drop_title': "📁 أفلت الملفات هنا",
        'misc.drop_subdir': "الرفع إلى:",
        'misc.drop_total': "{n} ملفات إجمالاً",
        'misc.drop_confirm': "تأكيد الرفع",
        'misc.drop_too_many': "... {n} ملفات أخرى",
        'cust.field.name': "اسم العميل",
        'cust.field.title': "المسمى الوظيفي",
        'cust.field.tier': "المستوى",
        'cust.field.website': "الموقع الإلكتروني",
        'cust.field.tier_none': "لا يوجد",
        'cust.field.buyer': "نوع المشتري",
        'cust.field.buyer_none': "غير محدد",
        'cust.field.country': "الدولة",
        'cust.field.city': "المدينة",
        'cust.field.category': "الفئة الرئيسية",
        'cust.field.score': "درجة التطابق",
        'cust.field.score_none': "غير مقيم",
        'cust.field.email': "البريد الإلكتروني",
        'cust.field.phone': "الهاتف",
        'cust.field.backup_email': "بريد احتياطي",
        'cust.field.contact': "معلومات الاتصال",
        'cust.field.note': "ملاحظات",
        'cust.field.function': "الوظيفة",
        'cust.field.responsibility': "المسؤولية",
        'cust.field.follow': "متابعة بالذكاء الاصطناعي",
        'cust.field.no_orders': "لا توجد طلبات بعد. انقر على «+ طلب جديد» للإضافة.",
        'cust.followup_note': "ملاحظة المتابعة",
        'cust.followup_note_hint': "ملاحظة على مستوى العميل، تظهر على بطاقة جهة الاتصال الرئيسية",
        'cust.field.order_fail': "فشل تحميل الطلبات",
        'cust.summary.total': "{n} عميل",
        'cust.summary.follow_up': "{n} بانتظار المتابعة",
        'cust.summary.overdue': "{n} متأخرة",
        'cust.summary.orders': "{amt} إجمالي الطلبات",
        'brief.title': "ملخص اليوم",
        'brief.new_inquiries': "استفسارات جديدة",
        'brief.overdue': "متأخر",
        'brief.pending_ship': "بانتظار الشحن",
        'brief.summary_empty': "لم يتم إنشاء الملخص بعد",
        'brief.todo': "المهام",
        'brief.cron': "مخرجات Cron",
        'brief.cron_empty': "لا يوجد ناتج للمهام المجدولة اليوم",
        'todo.add': "إضافة مهمة",
        'todo.placeholder': "ما الذي يجب فعله؟ اضغط Enter للحفظ",
        'todo.due': "تاريخ الاستحقاق",
        'todo.customer': "العميل",
        'todo.no_customer': "— لا يوجد عميل —",
        'todo.save': "حفظ",
        'todo.overdue': "متأخر",
        'todo.today': "اليوم",
        'todo.upcoming': "القادمة",
        'todo.empty': "لا توجد مهام بعد — انقر + للإضافة",
        'todo.confirm_delete': "حذف هذه المهمة؟",
        'todo.empty_label': "هذه المهمة لا تحتوي على نص",
        'todo.added': "تمت الإضافة إلى المهام",
        'chat.cmd.sub': "أصدر أمراً · تطوير العملاء، الرد على الاستفسارات، عروض الأسعار، المستندات — قلها مباشرة",
        'brief.dash': "—",
        'chat.blocks.draft_warn': "مسودة · لن تُرسل تلقائيًا",
        'chat.blocks.copy_draft': "نسخ المسودة",
        'chat.blocks.next': "التالي",
        'chat.blocks.copied': "تم النسخ",
        'chat.blocks.edit_draft': "واصل التعديل",
        'chat.blocks.gen_pi': "توليد PI",
        'chat.blocks.copy_note': "انسخها ثم أرسلها بنفسك من بريدك الإلكتروني",
        'chat.blocks.edit_prompt': "تعديل مسودة البريد هذه",
        'chat.blocks.gen_pi_prompt': "إنشاء PI من هذا العرض",
        'brief.done': "مكتمل · {n}",
        'profile.open': "ملف العميل",
        'profile.title': "ملف العميل",
        'profile.back_wall': "← العودة إلى اللوحة",
        'profile.circle': "دائرة الأشخاص",
        'profile.prefs': "التفضيلات والمحرمات والهدايا",
        'profile.sec.family': "العائلة",
        'profile.sec.suppliers': "موردون آخرون",
        'profile.sec.prefs': "التفضيلات",
        'profile.sec.taboos': "المحرمات",
        'profile.sec.dates': "تواريخ مهمة",
        'profile.sec.gifts': "الهدايا",
        'profile.add': "+ إضافة",
        'profile.add_gift': "+ هدية",
        'profile.extract_chat': "استخراج من المحادثة",
        'profile.extract_email': "استخراج من البريد الإلكتروني",
        'profile.confirm': "تأكيد",
        'profile.void': "إلغاء",
        'profile.delete': "حذف",
        'profile.delete_confirm': "حذف هذا السجل اليدوي؟",
        'profile.ai_use': "للاستخدام مع الذكاء الاصطناعي",
        'profile.ai_on': "تشغيل",
        'profile.ai_off': "إيقاف",
        'profile.show_quote': "الاقتباس",
        'profile.ask': "مطلوب",
        'profile.pending': "بانتظار التأكيد · {n}",
        'profile.solicit_note': "محلي فقط · لا يُصدّر · لا يُرسل إلى الذكاء الاصطناعي",
        'profile.restart': "متاح بعد إعادة التشغيل",
        'profile.empty_circle': "لا توجد معلومات عن الأشخاص بعد",
        'profile.empty_prefs': "لا توجد تفضيلات / محرمات / هدايا بعد",
        'profile.confirmed': "مؤكد",
        'profile.saved': "تم الحفظ",
        'profile.pick_category': "اختر فئة",
        'profile.bad_category': "فئة غير صالحة",
        'profile.subject_ph': "الموضوع (مثلاً الاسم)",
        'profile.content_ph': "محتوى الحقيقة",
        'profile.pick_direction': "الاتجاه",
        'profile.item_ph': "العنصر",
        'profile.extract_done': "تم الاستخراج: حقائق {f} · هدايا {g} · مستبعد {d}",
        'profile.src_chat': "محادثة",
        'profile.src_email': "البريد الإلكتروني",
        'profile.src_visit': "زيارة المصنع",
        'profile.src_manual': "يدوي",
        'profile.edit': "تعديل",
        'profile.add_fact': "إضافة عنصر للملف الشخصي",
        'profile.edit_fact': "تعديل عنصر الملف",
        'profile.gift_add_title': "إضافة هدية",
        'profile.gift_edit_title': "تعديل الهدية",
        'profile.category': "الفئة",
        'profile.subject': "الموضوع",
        'profile.content': "المحتوى",
        'profile.content_required': "المحتوى مطلوب",
        'profile.item': "العنصر",
        'profile.item_required': "العنصر مطلوب",
        'profile.direction': "الاتجاه",
        'profile.approx_value': "المبلغ",
        'profile.currency': "العملة",
        'profile.gift_date': "التاريخ",
        'profile.occasion': "المناسبة",
        'profile.note': "ملاحظة",
        'profile.invalid_amount': "مبلغ غير صالح",
        'profile.attach': "إرفاق بـ",
        'profile.attach_none': "لا أحد",
        'profile.attach_primary': "الرئيسي: {name}",
        'profile.attach_primary_default': "الرئيسي",
        'profile.attach_contact_fallback': "جهة الاتصال",
        'cust.summary.plus_currencies': "+{n} أخرى",
        'order.cust_label': "العميل *",
        'order.cust_select': "-- اختر العميل --",
        'order.status_quoting': "قيد التسعير",
        'order.status_ordered': "تم الطلب",
        'order.status_shipped': "تم الشحن",
        'order.status_done': "مكتمل",
        'order.status_cancelled': "ملغي",
        'order.btn_delete': "🗑 حذف",
        'order.confirm_delete': "حذف هذا الطلب؟",
        'order.created': "تم إنشاء الطلب",
        'order.updated': "تم تحديث الطلب",
        'order.deleted': "تم حذف الطلب",
        'hist.delete_title': "حذف",
        'hist.confirm_delete': "حذف هذه المحادثة؟ لا يمكن التراجع عن هذا الإجراء.",
        'hist.deleted': "تم حذف المحادثة",
        'hist.delete_fail': "فشل الحذف",
        'toast.input_required': "يرجى إدخال اسم المكتبة والمسار",
        'toast.lib_added': "تمت إضافة المكتبة «{name}»",
        'toast.lib_add_fail': "فشل الإضافة",
        'toast.cust_product_required': "يرجى اختيار العميل وإدخال اسم المنتج",
        'toast.select_library': "يرجى اختيار مكتبة",
        'toast.complete_onboarding': "يرجى إكمال الدليل أولاً",
        'toast.enter_company': "يرجى إدخال اسم شركة أو رابط موقع",
        'toast.wizard_product': "ما المنتجات التي تبيعها؟",
        'toast.wizard_market': "أي سوق؟",
        'toast.activate_fail': "فشل التفعيل",
        'toast.network_retry': "خطأ في الشبكة، يرجى إعادة المحاولة",
        'toast.request_timeout': "انتهت مهلة الطلب",
        'toast.imported': "تم استيراد {n} ملفات إلى \"{dir}\"",
        'toast.import_fail': "فشل الاستيراد",
        'wiz.step1_title': "أولاً: ما الذي تبيعه؟",
        'wiz.step1_desc': "أي شيء ينفع — \"مصابيح LED\"، \"أدوات معدنية\"، \"منسوجات\"...",
        'wiz.step1_ph': "مثال: مصابيح LED الصناعية، البراغي المصنوعة من الفولاذ المقاوم للصدأ...",
        'wiz.step1_btn': "التالي: إلى أي أسواق؟ →",
        'wiz.step1_indicator': "● ماذا",
        'wiz.step2_title': "أي دولة أو منطقة؟",
        'wiz.step2_desc': "مثال: «ألمانيا»، «الولايات المتحدة»، «الشرق الأوسط»، «جنوب شرق آسيا»",
        'wiz.step2_ph': "مثال: ألمانيا، الولايات المتحدة، الشرق الأوسط...",
        'wiz.step2_btn': "التالي: أي نوع من العملاء؟ →",
        'wiz.step2_indicator': "● الوجهة",
        'wiz.step3_title': "ما نوع العميل؟",
        'wiz.step3_indicator': "● من",
        'wiz.type_distributor': "تاجر جملة / موزّع",
        'wiz.type_distributor_desc': "شراء بكميات كبيرة للتوزيع محلياً",
        'wiz.type_oem': "علامة تجارية / مصنع OEM",
        'wiz.type_oem_desc': "إنتاج OEM، طلبات كبيرة طويلة الأجل",
        'wiz.type_retailer': "تاجر تجزئة / سلسلة متاجر",
        'wiz.type_retailer_desc': "كميات صغيرة بتكرار عالٍ",
        'wiz.type_any': "أي نوع يناسب",
        'wiz.type_any_desc': "دع الذكاء الاصطناعي يحدد الأنسب",
        'wiz.launch_btn': "🚀 ابدأ البحث عن العملاء!",
        'wiz.back': "← رجوع",
        'wiz.skip': "تخطي",
        'wiz.step_done': "✓ المنتجات",
        'wiz.step2_done': "✓ الأسواق",
        'wiz.searching': "جارٍ البحث عن عملاء...",
        'wiz.searching_desc': "جارٍ البحث متعدد القنوات",
        'wiz.type_names.distributor': "تاجر جملة/موزع",
        'wiz.type_names.oem': "علامة تجارية / OEM",
        'wiz.type_names.retailer': "تاجر تجزئة/سلسلة",
        'wiz.type_names.any': "جميع الأنواع",
        'onb.welcome_title': "مرحباً بك في Trade AI",
        'onb.welcome_desc2': "يمكن لـ Trade أن <strong>يبحث تلقائياً في خلفية العملاء (OSINT)</strong> و<strong>كتب رسائل تواصل B2B احترافية</strong> بناءً على منتجاتك.",
        'onb.feat1': "بيانات الجمارك · وسائل التواصل · تدقيق الموقع",
        'onb.feat2': "رسائل تواصل باردة بالذكاء الاصطناعي · المتابعة · العروض",
        'onb.feat3': "توليد تلقائي للعملاء على مدار الساعة · مهام مجدولة",
        'onb.skip_btn': "تخطِّ الجولة، ابدأ مباشرة",
        'sys.updating': "جارٍ التحديث...",
        'sys.restarting': "جارٍ إعادة التشغيل...",
        'sys.updating_now': "جارٍ سحب أحدث التعليمات البرمجية وتثبيت التبعيات، يرجى الانتظار (حوالي دقيقة)…",
        'sys.update_done_restart': "✅ اكتمل التحديث. انقر \"🔄 إعادة التشغيل\" لتطبيق الإصدار الجديد.",
        'sys.update_done': "✅ اكتمل التحديث. انقر على \"🔄 إعادة التشغيل\" للتطبيق.",
        'sys.update_fail': "❌ فشل التحديث:",
        'sys.update_unknown': "⚠️ نتيجة التحديث غير معروفة، تحقق من الشبكة",
        'sys.update_network': "⚠️ فشل طلب التحديث، تحقق من اتصال الشبكة ثم أعد المحاولة",
        'sys.update_confirm': "سيتم سحب الكود من الفرع الرئيسي في GitHub وتثبيت التبعيات. ستقوم بإعادة التشغيل يدوياً عند الاكتمال.\nسيتم نسخ احتياطي لقاعدة البيانات قبل الترقية.\n\nهل تريد التحديث الآن؟",
        'sys.update_confirm_current': "الإصدار الحالي {current}، الالتزام المستهدف {target}.\nسيتم تثبيت هذا الالتزام، وعليك إعادة التشغيل يدويًا عند اكتماله.\nيتم نسخ قاعدة البيانات احتياطيًا قبل الترقية.\n\nهل تريد التحديث الآن؟",
        'usage.today': "اليوم {used} / {limit} توكن",
        'usage.unlimited': "اليوم تم استخدام {used} tokens",
        'usage.over': "اليوم {used} / {limit} رمز · تجاوزت الحصة (بدون حظر)",
        'sys.restart_toast': "🔄 جارٍ إعادة تشغيل Trade...",
        'sys.restart_ok': "✅ تم إرسال أمر إعادة التشغيل، ستُحدَّث الصفحة قريباً",
        'sys.restart_fail': "❌ فشل إعادة التشغيل:",
        'sys.restart_busy_update': "التحديث جارٍ — أعد التشغيل بعد اكتماله.",
        'sys.restart_wait': "🔄 جارٍ إعادة تشغيل الخدمة، ستُحدَّث الصفحة...",
        'sys.restart_timeout': "⚠️ انتهت مهلة إعادة التشغيل، يرجى تحديث الصفحة يدوياً",
        'sys.skills_updating': "جارٍ التحديث...",
        'sys.skills_ok': "✅ تم تحديث المهارات!",
        'sys.skills_fail': "❌ فشل التحديث:",
        'sys.skills_error': "❌ خطأ في التحديث:",
        'skills.copied': "تم نسخ الموجه:",
        'import.importing': "جارٍ الاستيراد...",
        'import.confirm': "تأكيد الرفع",
        'guide.rest': "لا توجد مهمة مجدولة حالياً",
        'guide.progress': "تقدم اليوم",
        'mailbox.title': "صناديق البريد",
        'mailbox.guide_en_tip': "الدليل متاح بالصينية فقط حاليًا — أخبرنا إذا كنت تحتاج مساعدة باللغة الإنجليزية.",
        'mailbox.guide_title': "دليل الاتصال",
        'mailbox.form_title': "ربط صندوق بريد جديد",
        'mailbox.list_title': "صناديق البريد المرتبطة",
        'mailbox.preset': "مزوّد الخدمة",
        'mailbox.preset_custom': "IMAP أخرى",
        'mailbox.email': "عنوان البريد الإلكتروني",
        'mailbox.secret': "رمز التفويض / كلمة مرور التطبيق",
        'mailbox.secret_ph': "رمز تفويض IMAP — وليس كلمة مرور تسجيل الدخول إلى الويب",
        'mailbox.display_name': "الاسم المعروض (اختياري)",
        'mailbox.display_name_ph': "مثال: صندوق الاستفسارات",
        'mailbox.host': "مضيف IMAP",
        'mailbox.port': "المنفذ",
        'mailbox.username': "اسم المستخدم لتسجيل الدخول",
        'mailbox.username_ph': "يُطابق عنوان البريد الإلكتروني افتراضياً",
        'mailbox.test': "اختبار الاتصال",
        'mailbox.bind': "ربط",
        'mailbox.testing': "جارٍ الاختبار…",
        'mailbox.test_ok': "تم الاتصال بنجاح",
        'mailbox.test_fail': "فشل الاتصال",
        'mailbox.test_first': "اختبر الاتصال بنجاح قبل الربط",
        'mailbox.need_email_secret': "أدخل عنوان البريد الإلكتروني ورمز التفويض",
        'mailbox.bind_ok': "تم ربط صندوق البريد",
        'mailbox.faq': "الأسئلة الشائعة",
        'mailbox.empty_title': "لا يوجد صندوق بريد مرتبط بعد",
        'mailbox.empty_hint': "اتبع الدليل أعلاه، ثم اختبر، ثم اربط",
        'mailbox.col_email': "صندوق البريد",
        'mailbox.col_status': "حالة المزامنة",
        'mailbox.col_actions': "الإجراءات",
        'mailbox.synced_at': "آخر مزامنة",
        'mailbox.never_synced': "لم يتم السحب بعد",
        'mailbox.email_count': "{n} رسالة مخزنة محلياً",
        'mailbox.pull': "سحب",
        'mailbox.pulling': "جارٍ السحب…",
        'mailbox.pull_done': "تم سحب {n} رسالة جديدة",
        'mailbox.update_secret': "تحديث رمز التفويض",
        'mailbox.secret_prompt': "رمز تفويض IMAP جديد (يُحتفظ بالرمز القديم إذا فشل الاختبار)",
        'mailbox.secret_updated': "تم تحديث رمز التفويض",
        'mailbox.unbind': "إلغاء الربط",
        'mailbox.unbind_confirm': "إلغاء الربط يحذف الرسائل المخزنة لهذا الحساب. هل تريد المتابعة؟",
        'mailbox.unbind_ok': "تم فك الارتباط",
        'contacts.add': "إضافة جهة اتصال",
        'contacts.empty': "لا توجد جهات اتصال بعد",
        'contacts.primary_badge': "رئيسي",
        'contacts.extra_badge': "إضافي",
        'contacts.edit': "تعديل",
        'contacts.delete': "حذف",
        'contacts.delete_confirm': "حذف جهة الاتصال \"{name}\"؟",
        'contacts.deleted': "تم حذف جهة الاتصال",
        'contacts.add_title': "إضافة جهة اتصال",
        'contacts.edit_title': "تعديل جهة الاتصال",
        'contacts.name': "الاسم *",
        'contacts.function': "الوظيفة",
        'contacts.title_f': "المسمى الوظيفي",
        'contacts.responsibility': "المسؤولية (مثل: الشخص الرئيسي للتواصل)",
        'contacts.email': "البريد الإلكتروني",
        'contacts.phone': "الهاتف",
        'contacts.whatsapp': "WhatsApp",
        'contacts.wechat': "WeChat",
        'contacts.note': "ملاحظة",
        'contacts.name_required': "الاسم مطلوب",
        'contacts.saved': "تم حفظ جهة الاتصال",
        'contacts.tags_title': "الوسوم",
        'contacts.tags_ph': "اكتب وسماً، ثم Enter أو فاصلة للإضافة",
        'contacts.tags_add': "إضافة",
        'contacts.tags_empty': "لا توجد وسوم بعد",
        'contacts.tags_too_long': "الحد الأقصى 20 حرفاً لكل وسم",
        'contacts.tags_too_many': "20 وسماً كحد أقصى",
        'inquiry.section': "الاستفسارات",
        'inquiry.empty': "لا توجد استفسارات بعد — أنشئ واحداً للبدء في المتابعة",
        'inquiry.title_ph': "عنوان الاستفسار",
        'inquiry.create': "استفسار جديد",
        'inquiry.delete': "حذف",
        'inquiry.stage_auto': "تلقائي (من الاستفسارات)",
        'inquiry.manual_badge': "ي",
        'inquiry.manual_title': "مثبت يدوياً — افتح اللوحة للعودة إلى الوضع التلقائي",
        'inquiry.created': "تم إنشاء الاستفسار",
        'inquiry.updated': "تم تحديث الاستفسار",
        'inquiry.deleted': "تم حذف الاستفسار",
        'guide.progress': "تقدم اليوم",
        'onb.welcome_desc': "أنا مساعدك الذكي للتجارة الخارجية، دعني أساعدك في البدء بسرعة.",
        'onb.osint_placeholder': "الصق اسم الشركة أو الموقع، مثلاً: acme-corp.com",
        'rail.osint': "فحص خلفية تلقائي",
        'onb.wait_title': 'TRADE · ONBOARDING  ///  بانتظار الرد',
'dock.bg_tasks': 'المهام الجارية · {n}',
'dock.collecting': 'جارٍ الجمع {done} / {total} · {running} قيد التنفيذ',
'dock.composing': 'اكتمل الجمع، جارٍ توليد الرد…',
'dock.all_done': 'اكتمل كل شيء',
'dock.check_title': 'فحص الخلفية',
'dock.check_status': 'الفحص جارٍ',
'dock.collected': 'اكتمل الجمع',
'dock.partial': 'جزئي — تم حفظ النتائج',
'job.queued': 'في الانتظار',
'job.running': 'قيد التنفيذ',
'job.done': 'مكتمل',
'job.partial': 'جزئي',
'job.failed': 'فشل',
'job.cancelled': 'أُلغي',
        'onb.request_failed': 'فشل الطلب ({code})',
        'onb.no_response': 'لم يُرجع الذكاء الاصطناعي ردًا صالحًا، يُرجى المحاولة مرة أخرى.',
        'onb.stopped': 'تم إيقاف التوليد.',
        'onb.network_error': 'خطأ في الشبكة: {msg}',
        'onb.save_customer': 'حفظ في مكتبة العملاء',
        'onb.enter_main': 'الدخول إلى الواجهة الرئيسية',
        'onb.saved_customer': 'تم حفظ العميل في مكتبة العملاء',
        'onb.save_failed': 'فشل الحفظ، يُرجى المحاولة مرة أخرى',
        'onb.osint_prompt': 'يرجى إجراء بحث خلفية شامل (OSINT) عن {q}، ثم كتابة رسالة تواصل B2B احترافية بناءً على منتجات شركتي.',
        'skills.group.客户开发': 'تطوير العملاء',
        'skills.group.内容营销': 'التسويق بالمحتوى',
        'skills.group.文档管理': 'إدارة المستندات',
        'skills.group.招投标': 'العطاءات والمناقصات',
        'skills.group.平台与数据': 'المنصات والبيانات',
        'skills.group.客户与销售': 'العملاء والمبيعات',
        'skills.group.合规与支持': 'الامتثال والدعم',
        'skills.group.Egypt': 'حزمة السوق المصرية',
        'skills.b2b-osint.d': 'فحص خلفية العميل (6 طبقات: WHOIS/البريد/العقوبات/المجموعة التقنية/LinkedIn/التقييم)',
        'skills.b2b-osint.t': 'فحص الخلفية، البحث عن الشركة، البحث عن النطاق، البحث عن البريد، due diligence',
        'skills.b2b-email-intel.d': 'استخبارات البريد الإلكتروني — التحقق من حالة التسجيل في أكثر من 120 منصة',
        'skills.b2b-email-intel.t': 'البحث عن البريد، تسجيل البريد، فحص خلفية البريد، استخبارات البريد',
        'skills.b2b-lead-generation.d': 'توليد العملاء المحتملين عبر قنوات متعددة (Google Maps/LinkedIn/Facebook)',
        'skills.b2b-lead-generation.t': 'إيجاد العملاء، توليد العملاء المحتملين، cold email، تطوير العملاء',
        'skills.b2b-customer-finder.d': 'معالج مبسط لتطوير العملاء — ثلاثة أسئلة + بحث تلقائي + إنشاء رسائل تواصل',
        'skills.b2b-customer-finder.t': 'كيفية إيجاد العملاء، معالج تطوير العملاء، أداة إيجاد العملاء، إيجاد العملاء',
        'skills.b2b-china-leads.d': 'تنقيب عن شركات محلية — إيجاد الموردين (الرئيسي) / تحديد مصانع المنافسين (التركيز) / إيجاد عملاء محليين، عبر قنوات عامة مجانية (التجمعات الصناعية + محركات البحث + سجلات الجمارك + التحقق اليدوي، دون واجهات مدفوعة)',
        'skills.b2b-china-leads.t': 'إيجاد الموردين، مصانع المنافسين، إيجاد المصانع، مصانع OEM، عملاء محليون، مصانع مشابهة، إيجاد البائعين، تنقيب المصانع، 1688، Qichacha، Tianyancha',
        'skills.b2b-cold-outreach.d': 'كتابة رسائل التواصل الباردة B2B (رسائل استكشاف/ترويج/متابعة)',
        'skills.b2b-cold-outreach.t': 'رسالة استكشاف، رسالة ترويجية، cold email، تواصل',
        'skills.b2b-email-imitation.d': 'تقليد رسائل التواصل وإعادة صياغتها — تحليل نماذج الرسائل، تعلّم البنية والأسلوب',
        'skills.b2b-email-imitation.t': 'تقليد رسالة التواصل، بناءً على نموذج، تقليد البريد، تقليد الرسائل',
        'skills.b2b-buyer-persona.d': 'شخصية المشتري وتقسيم الأدوار — تخصيص مقترحات القيمة FAB حسب الدور',
        'skills.b2b-buyer-persona.t': 'شخصية المشتري، الكتابة حسب الدور، الكتابة لقسم المشتريات، buyer persona',
        'skills.auto-trade-customer-development.d': 'خط أنابيب تطوير عملاء مؤتمت بالكامل — بحث → فحص خلفية → تقييم → كتابة رسائل → تسليم المسودات',
        'skills.auto-trade-customer-development.t': 'تطوير عملاء مؤتمت بالكامل، تطوير بنقرة واحدة، تطوير عملاء تلقائي',
        'skills.b2b-social-media.d': 'تسويق وسائل التواصل الاجتماعي (Facebook/Instagram/TikTok/YouTube)',
        'skills.b2b-social-media.t': 'وسائل التواصل، Facebook، TikTok، تقويم المحتوى، تسويق وسائل التواصل',
        'skills.b2b-linkedin-marketing.d': 'استراتيجية ومحتوى تسويق LinkedIn (الملف/المنشورات/InMail)',
        'skills.b2b-linkedin-marketing.t': 'LinkedIn، لينكد إن، تسويق LinkedIn، InMail',
        'skills.b2b-kol-imitation.d': 'تقليد أسلوب مؤثري LinkedIn/وسائل التواصل — تحليل الأسلوب وتطبيقه على علامتك',
        'skills.b2b-kol-imitation.t': 'تقليد الأسلوب، التعلم من المؤثرين، تقليد المؤثرين، تقليد مؤثر',
        'skills.b2b-reddit-engagement.d': 'التفاعل في مجتمع Reddit — بناء الثقة وجذب الزيارات عبر تعليقات الخبراء',
        'skills.b2b-reddit-engagement.t': 'Reddit، تعليقات المجتمع، تعليق Reddit، تعليقات الخبراء',
        'skills.b2b-seo-aeo.d': 'إنشاء مقالات SEO + AEO — محسّنة لـ Google + البحث بالذكاء الاصطناعي',
        'skills.b2b-seo-aeo.t': 'مقال SEO، مقال AEO، تحسين محركات البحث، مقال seo',
        'skills.b2b-short-video.d': 'إنشاء سكريبتات فيديو قصيرة B2B (TikTok/Shorts/Reels)',
        'skills.b2b-short-video.t': 'فيديو قصير، سكريبت فيديو، سكريبت TikTok، فيديوهات قصيرة',
        'skills.b2b-market-analysis.d': 'خريطة تحليل السوق — الشهادات والرسوم الجمركية والكلمات المفتاحية وخطاف الثلاث ثوانٍ',
        'skills.b2b-market-analysis.t': 'تحليل السوق، السوق المستهدف، خريطة العمل، تحليل السوق',
        'skills.b2b-daily-automation.d': 'المهام المجدولة (نشرة الصباح، والتقارير اليومية والأسبوعية، وتوليد نصوص LinkedIn ووسائل التواصل الاجتماعي)',
        'skills.b2b-daily-automation.t': 'مهام يومية، مهام مجدولة، نشرة الصباح، cron، تقرير يومي',
        'skills.b2b-document.d': 'تحليل المستندات المحلية واستخراج البيانات (PDF وWord وExcel إلخ)',
        'skills.b2b-document.t': 'تحليل مستند، قراءة عرض سعر، مراجعة عقد، analyze document',
        'skills.b2b-doc-generation.d': 'توليد عروض الأسعار والعقود والمقترحات والعروض التقديمية (DOCX/XLSX/PPTX)',
        'skills.b2b-doc-generation.t': 'توليد عرض سعر، توليد عقد، إنشاء عرض تقديمي، توليد مستند',
        'skills.b2b-tech-drawing.d': 'تحليل الرسومات الهندسية (تجريبي) — استخراج المواد والأبعاد والتفاوتات من رسومات PDF',
        'skills.b2b-tech-drawing.t': 'رسم، رسم هندسي، رسم قطعة مصبوبة، رسم تقني، blueprint',
        'skills.b2b-data-directory.d': 'إدارة بنية دليل البيانات وتهيئته',
        'skills.b2b-data-directory.t': 'دليل البيانات، بنية البيانات، أين تُحفظ بياناتي',
        'skills.b2b-tender-info.d': 'جمع معلومات العطاءات وتصفيتها — بحث مجدول عن إعلانات العطاءات حسب الكلمات المفتاحية',
        'skills.b2b-tender-info.t': 'البحث عن عطاءات، الاستعلام عن عطاءات، معلومات العطاءات، إعلان عطاء، فرص العطاءات',
        'skills.b2b-tender-mail.d': 'أرشفة رسائل العطاءات ومرفقاتها — السحب من صندوق البريد دون تحديدها كمقروءة',
        'skills.b2b-tender-mail.t': 'رسائل العطاءات، أرشفة البريد، جلب الرسائل، إضافة مرفقات ناقصة، مراقبة صندوق البريد',
        'skills.b2b-tender-processing.d': 'تحويل مستندات العطاء إلى جدول طلب عروض — توليد ملف Excel من 11 عمودًا ثابتة',
        'skills.b2b-tender-processing.t': 'جدول طلب عروض، توليد جدول طلب عروض، تنظيم العطاء، تنظيم مستندات العطاء',
        'skills.b2b-tender-download.d': 'تنزيل مرفقات العطاءات دفعة واحدة — استئناف مجزأ مع التحقق من الحجم والمجموع الاختباري',
        'skills.b2b-tender-download.t': 'تنزيل مستندات العطاء، استئناف التنزيل، تنزيل مجزأ، تنزيل حسب القائمة',
        'skills.b2b-tender-archive.d': 'استخراج وأرشفة الحزم المضغوطة دفعة واحدة — فك الحزم المتداخلة على عدة مراحل، ونقل الحزم الأصلية إلى سلة المهملات',
        'skills.b2b-tender-archive.t': 'فك ضغط، حزمة مضغوطة، فك ضغط جماعي، حزمة داخل حزمة، تنظيف الأرشيف',
        'skills.b2b-tender-doc-match.d': 'مطابقة الملفات المؤرشفة مع قائمة — مطابقة بالرقم والاسم، وتجميعها في حزم كاملة',
        'skills.b2b-tender-doc-match.t': 'أرشفة حسب القائمة، مطابقة حسب الرقم، مطابقة الرسومات، مطابقة قائمة العطاء',
        'skills.b2b-platform.d': 'تشخيص وتحسين متاجر منصات B2B (علي بابا/MIC/الموقع المستقل)',
        'skills.b2b-platform.t': 'تشخيص المنصة، علي بابا الدولية، تحسين الكلمات المفتاحية، تشخيص المتجر',
        'skills.b2b-customs-data.d': 'تحليل بيانات الجمارك للعثور على المشترين واتجاهات السوق',
        'skills.b2b-customs-data.t': 'بيانات الجمارك، سجلات الاستيراد والتصدير، البحث عن مشترين، بيانات الجمارك',
        'skills.b2b-customer-intel.d': 'ملف متعمق لعميل واحد — وثيقة استخبارات من 15 بُعدًا',
        'skills.b2b-customer-intel.t': 'ملف العميل، ملف متعمق، اقتراحات الهدايا، العمولات غير القانونية، التعرف على العميل',
        'skills.b2b-customer-mgmt.d': 'إدارة ملفات العملاء وتصنيفها (المستويات A/B/C، تتبع الطلبات)',
        'skills.b2b-customer-mgmt.t': 'إدارة العملاء، ملفات العملاء، تصنيف العملاء، CRM',
        'skills.b2b-sales-pipeline.d': 'استراتيجية خط المبيعات — خطة متابعة ٣٠ يومًا + تتبع مؤشرات الأداء + لوحة صحة',
        'skills.b2b-sales-pipeline.t': 'تقدم المبيعات، خطة المتابعة، كيفية المتابعة، sales pipeline',
        'skills.b2b-inquiry-training.d': 'الرد على الاستفسارات وتدريب أفضل المبيعات — أسلوب تدريب تنافسي بالذكاء الاصطناعي المزدوج',
        'skills.b2b-inquiry-training.t': 'تدريب الاستفسارات، تدريب الردود، مشترٍ محاكى، الاعتراضات',
        'skills.b2b-exhibition.d': 'إدارة المعارض الكاملة — دعوات ما قبل المعرض، متابعة أثناءه، تحويل ما بعده',
        'skills.b2b-exhibition.t': 'معرض، المشاركة في المعارض، معرض كانتون، trade show',
        'skills.b2b-product-description.d': 'مولّد أوصاف المنتجات — طريقة FAB لنقاط البيع والمواد التسويقية',
        'skills.b2b-product-description.t': 'وصف المنتج، نسخة المنتج، Sales Kit، أداة وصف المنتج',
        'skills.b2b-trade-ops.d': 'تنفيذ التجارة والتواصل بعد البيع (تذكير الدفع/المطالبات/المعارض/تدقيق المصنع/اللوجستيات/خدمة ما بعد البيع)',
        'skills.b2b-trade-ops.t': 'تذكير الدفع، المطالبات، المعارض، تدقيق المصنع، تحيات الأعياد، اللوجستيات',
        'skills.b2b-inquiry-meeting.d': 'إدارة اجتماع تحليل الاستفسارات — مراجعة أسبوعية/ملاحظات فردية/استفسارات رئيسية/قائمة إجراءات المتابعة',
        'skills.b2b-inquiry-meeting.t': 'اجتماع تحليل الاستفسارات، مراجعة الاستفسارات، الاجتماع الأسبوعي، مراجعة مندوبي المبيعات',
        'skills.b2b-sales-playbook.d': 'مولّد دليل أفضل المبيعات — إجراءات قياسية/مكتبة نصوص/مسار المبتدئين/قائمة الأخطاء الشائعة/مخزون العبارات الجذابة',
        'skills.b2b-sales-playbook.t': 'خبرة أفضل المبيعات، إجراءات المبيعات القياسية، مكتبة النصوص، تدريب المبتدئين',
        'skills.b2b-guarantee-proposal.d': 'مولّد المقترحات التجارية — خيارات من ثلاث مستويات/تحليل العائد على الاستثمار/خارطة التنفيذ',
        'skills.b2b-guarantee-proposal.t': 'مقترح تجاري، توصية استراتيجية، تحليل العائد على الاستثمار، مقترح الحلول',
        'skills.b2b-trade-compliance.d': 'فحص الامتثال التجاري — المحرمات الثقافية/الاختصارات/Incoterms/مراجعة الترجمة/العطاءات',
        'skills.b2b-trade-compliance.t': 'المحرمات الثقافية، Incoterms، مراجعة الترجمة، فحص إدراج Amazon',
        'skills.b2b-onboarding.d': 'حزمة إعداد شاملة للشركات الجديدة (تعريف بالشركة/المنتجات/التسويق/تحليل المنافسين)',
        'skills.b2b-onboarding.t': 'شركة جديدة، إعداد، حل متكامل، كيفية البدء، الإعداد الأولي',
        'skills.b2b-skill-generator.d': 'إنشاء مهارات B2B جديدة تلقائيًا من وصف المتطلبات',
        'skills.b2b-skill-generator.t': 'توليد مهارة، إنشاء مهارة، create skill، new skill',
        'skills.b2b-six-thinking-hats.d': 'مدرب اتخاذ القرار بطريقة القبعات الست — تحليل منهجي للقرارات التجارية المعقدة',
        'skills.b2b-six-thinking-hats.t': 'تحليل القرار، القبعات الست، تحليل الإيجابيات والسلبيات، decision making',
        'skills.chat-memory.d': 'البحث في سجل المحادثات (حسب اليوم/هذا الأسبوع/هذا الشهر/الكل)',
        'skills.chat-memory.t': 'ما قيل سابقًا، ما نوقش الأسبوع الماضي، السجل، chat history',
        'skills.auto-smtp-email.d': '[معطل] انقر للتعرف على فكرة التصميم',
        'skills.auto-smtp-email.t': '[هذه المهارة معطلة] إرسال البريد، إرسال جماعي، إرسال عبر SMTP',
        'skills.b2b-egypt-pack.d': 'حزمة السوق المصرية — طبقة توطين لبحوث العملاء ورسائل التواصل ومعلومات العملاء (مخرجات ثنائية اللغة، شهادات، فحص عقوبات)',
        'skills.b2b-egypt-pack.t': 'السوق المصرية، شركة مصرية، حزمة مصر، عميل مصري، استهداف مصر',
        'skills.egypt-export-sources.d': 'خريطة مصادر التصدير في مصر — نافذة وهيئة الرقابة على الصادرات والواردات وCargoX والبنك المركزي المصري مع ملاحظات التحقق',
        'skills.egypt-export-sources.t': 'مصادر التصدير في مصر، هيئة الرقابة، نافذة، CargoX، البنك المركزي المصري',
        // START onboarding UI
        'start.button':'ابدأ','start.title':'إعداد ملف شركتك',
        'start.no_company':'اختر شركة أولاً قبل تحميل أي بيانات خاصة.',
        'start.loading':'جار التحميل…','start.error':'فشل التحميل: {msg}',
        'start.intro':'أجب عن بضعة أسئلة قصيرة لبناء ملف شركة قابل لإعادة الاستخدام.',
        'start.begin':'البدء','start.skip':'تخطي','start.send':'إرسال','start.close':'إغلاق',
        'start.answer_ph':'اكتب إجابتك','start.undecided':'لم يُحدد بعد',
        'start.review_hint':'يُعرض هنا الأساسيات فقط؛ يمكن إضافة التفاصيل الاختيارية لاحقاً.',
        'start.correct':'تعديل','start.confirm':'تأكيد',
        'start.edit_hint':'هذه هي التغييرات المقترحة. يبقى ملفك المؤكد كما هو حتى تقوم بتطبيقها.',
        'start.no_changes':'لم يتم اكتشاف أي تغيير. عدّل أحد الحقول أعلاه ثم انقر على «تصحيح».',
        'start.edit_token':'رمز التعديل','start.apply':'تطبيق','start.cancel':'إلغاء',
        'start.edit_cancelled':'تم إلغاء التعديل — تم الحفاظ على ملفك الأصلي.',
        'start.edit_applied':'تم تطبيق التغييرات. يُرجى المراجعة والتأكيد.',
        'start.detail_title':'إضافة تفصيل','start.detail_key':'الحقل','start.detail_value':'القيمة',
        'start.detail_reason':'سبب الحاجة إليه (مطلوب)','start.detail_add':'إضافة',
        'start.detail_why':'سبب الحاجة: {reason}','start.detail_reason_required':'يرجى إدخال السبب أولاً',
        'start.detail_bad_key':'حقل تفصيل غير صالح',
        'start.field.name':'اسم الشركة','start.field.country':'البلد','start.field.activity':'النشاط الرئيسي',
        'start.field.products':'المنتجات','start.field.markets':'الأسواق',
        'start.question.basics.name':'ما اسم شركتك؟','start.question.basics.country':'في أي بلد أو منطقة تقع شركتك؟',
        'start.question.basics.activity':'ما هو نشاط شركتك الرئيسي؟','start.question.basics.products':'ما المنتجات التي تبيعها؟',
        'start.question.basics.markets':'ما الأسواق التي تستهدفها؟ (كلمة undecided مقبولة)',
        'start.detail.specifications':'مواصفات المنتج','start.detail.moq':'الحد الأدنى للطلب','start.detail.capacity':'القدرة الإنتاجية',
        'start.detail.lead_times':'مدد التسليم','start.detail.pricing':'الأسعار','start.detail.payment_terms':'شروط الدفع',
        'start.detail.shipping_terms':'شروط الشحن','start.detail.buyer_preferences':'تفضيلات المشترين',
        'start.detail.previous_markets':'الأسواق السابقة','start.detail.correspondence_preferences':'تفضيلات المراسلة','start.detail.signature':'التوقيع',
        'start.credential_title':'الشهادات','start.credential_claim':'اسم الشهادة أو رقمها',
        'start.credential_add':'إضافة بيان','start.credential_unverified':'مقدَّم من المستخدم، غير موثَّق',
        'start.shipment_title':'مستندات الشحن','start.shipment_ref':'رقم الشحنة','start.shipment_doctype':'نوع المستند',
        'start.shipment_file':'اسم الملف','start.shipment_note':'ملاحظة','start.shipment_add':'إضافة مستند',
        'start.shipment_warning':'مستندات الشحن خاصة بشحنة واحدة فقط — ليست شهادات دائمة.',
        'start.shipment_bad_type':'نوع مستند غير صالح',
        'start.doc.certificate_of_origin':'شهادة المنشأ','start.doc.invoice':'الفاتورة',
        'start.doc.packing_list':'قائمة التعبئة','start.doc.bill_of_lading':'بوليصة الشحن',
        'start.reusable_title':'البيانات القابلة لإعادة الاستخدام','start.reusable_load':'تحميل البيانات القابلة لإعادة الاستخدام','start.empty_reusable':'لا توجد بيانات قابلة لإعادة الاستخدام بعد.',
        'start.done':'تم تأكيد الملف.',
        'start.next_hint':'الخطوة التالية المقترحة (تُملأ المسودة فقط — لا يُرسل شيء تلقائياً):',
        'start.next_task':'فتح موجه المهمة (يملأ المسودة فقط)','start.next_chat':'بحث الأسواق المستهدفة (يملأ المسودة فقط)',
        'start.next.chat_prompt':'استخدم المهارة b2b-market-analysis لبحث اختيار الأسواق لمنتجاتنا ({products}). الأسواق الحالية: {markets}. اذكر الدول المستهدفة ومتطلبات الشهادات والرسوم الجمركية والكلمات المفتاحية وخطاف الثلاث ثوانٍ.',
        'start.next.task_prompt':'شغّل مهمة «{label}» باستخدام الملف المؤكد للشركة — المنتجات: {products}؛ الأسواق: {markets}.',
    }
};

function t(key, params) {
    var s = (I18N[currentLang] && I18N[currentLang][key]) || (I18N.en && I18N.en[key]) || key;
    if (params) { for (var k in params) s = s.replace('{'+k+'}', params[k]); }
    return s;
}


var AR_TERMS = {
  
   // Customers 视图动态行（不经过 _translateStaticHtml，必须由 langText 就地翻译）
   "客户": "العميل",
   "导出 CSV": "تصدير CSV",
   "导出失败": "فشل التصدير",
   "客户已导出为 CSV": "تم تصدير العملاء إلى CSV",
   "分级": "التصنيف",
   "标签": "الوسوم",
   "最近联系": "آخر تواصل",
   "最近": "الأحدث",
   "询盘": "استفسار",
   "报价": "عرض السعر",
   "样品": "عينة",
   "搜索客户": "البحث عن العملاء",
   "显示 ": "عرض ",
   "邮件 ": "بريد إلكتروني ",
   " · 对话 ": " · محادثات ",
   "已确认 ": "تم التأكيد ",
   " · 待确认 ": " · بانتظار التأكيد ",
   " · 索要 ": " · مطلوب ",
   " 仅本机": " (محلي فقط)",
   "财务": "مالية",
   "仓储": "مستودع",
   "未命名联系人": "جهة اتصال بدون اسم",
   "星标": "مفضلة",
   "不关联客户": "بدون عميل",
   "点击复制提示词": "انقر لنسخ الموجه",
   "客户列表": "العملاء",
   "导入 CSV": "استيراد CSV",
   "导入中...": "جارٍ الاستيراد...",
   "导入完成：新增 %n% 条，跳过 %s% 条（重复或空行）": "تم الاستيراد: أُضيف %n%، وتُخطي %s% (مكرر أو فارغ)",
   // CSV import backend errors: translated in localizeApiError() below
   "文件编码不是 UTF-8，请用 Excel 另存为 CSV UTF-8": "ترميز ملف CSV ليس UTF-8. احفظه في Excel بصيغة «CSV UTF-8» ثم أعد المحاولة",
   "CSV 中没有有效数据（至少需要 name 列）": "لم يتم العثور على صفوف صالحة. يجب أن يحتوي الملف على عمود باسم name بعناوين إنجليزية — نزّل القالب من تصدير CSV",
   "CSV 文件为空或缺少表头": "ملف CSV فارغ أو بلا صف عناوين — استخدم القالب من تصدير CSV",
   "CSV 中没有有效数据（至少需要 name 列）。": "لم يتم العثور على صفوف صالحة. يجب أن يحتوي الملف على عمود name بعنوان إنجليزي أو عربي — أو استخدم القالب من تصدير CSV.",
   "识别到的表头：": "العناوين المكتشفة: ",
   "name 列存在但整列为空": "عمود name موجود لكنه فارغ في كل الصفوف",
   "这是 Excel 工作簿（.xlsx）不是 CSV；请在 Excel 里「另存为 → CSV UTF-8（逗号分隔）」后再导入": "هذا ملف Excel ‏(.xlsx) وليس CSV. احفظه من Excel بصيغة «CSV UTF-8 (مفصول بفواصل)» ثم أعد الاستيراد",
   "这是网页/HTML 表格不是 CSV；请在 Excel 里「另存为 → CSV UTF-8（逗号分隔）」后再导入": "هذا جدول ويب/HTML وليس CSV. احفظه من Excel بصيغة «CSV UTF-8 (مفصول بفواصل)» ثم أعد الاستيراد",
   "请上传 .csv 格式的文件": "يرجى اختيار ملف بصيغة .csv",
   "CSV 文件过大（上限 10MB）": "ملف CSV كبير جدًا (الحد الأقصى 10 ميغابايت)",
   "CSV 格式解析失败": "تعذّر تحليل ملف CSV — تأكد أنه ملف UTF-8 مفصول بفواصل",
   "新建客户": "عميل جديد",
   "国家": "البلد",
   "全部国家": "جميع البلدان",
   "买家类型": "نوع المشتري",
   "全部类型": "جميع أنواع المشترين",
   "只看星标": "المفضلة فقط",
   "只看逾期": "المتأخرة فقط",
   "排序": "ترتيب",
   "待跟进优先": "المتابعة أولاً",
   "按名称排序": "مرتبة بالاسم",
   "按最近跟进": "المحدثة مؤخراً",
   "全部买家类型": "جميع أنواع المشترين",
   "多币种": "متعدد",
   "逾期 ": "متأخر",
   " 天": "ي",
   "今天": "اليوم",
   "处理": "معالجة",
   "未分级": "غير متاح",
   "暂无客户": "لا يوجد عملاء",
   "按「待跟进优先」· 逾期 → 今天 → 下次跟进日期": "المتابعة أولاً · متأخر → اليوم → التاريخ التالي",
   "全部": "الكل",
   "商机阶段": "المرحلة",
   "跟进处理": "معالجة المتابعة",
   "原跟进日 ": "كان مستحقاً",
   "不再跟进（清空下次跟进日）": "لا مزيد من المتابعة (مسح التاريخ)",
   "下次跟进日": "تاريخ المتابعة التالي",
   "本次跟进备注（可选）": "ملاحظة (اختياري)",
   "处理后该客户不再计入逾期；处理记录会出现在客户详情时间线。": "سيخرج هذا العميل من قائمة المتأخرات؛ ويُسجّل حدث في الخط الزمني.",
   "取消": "إلغاء",
   "保存并解决逾期": "حفظ ومعالجة",
   "请选择下次跟进日，或勾选不再跟进": "اختر تاريخاً أو حدد عدم المتابعة",
   "保存中…": "جارٍ الحفظ…",
   "已处理，逾期角标已更新": "تمت المعالجة؛ تم تحديث شارة المتأخرات",
   "客户管理": "العملاء",
   "加载客户详情失败": "فشل تحميل لوحة العميل",
   "重要对话": "المحادثات الرئيسية",
   "最近对话": "المحادثات الأخيرة",
   "人物": "الأشخاص",
   "主要联系人": "جهة الاتصال الرئيسية",
   "决策人": "صانع القرار",
   "其他": "أخرى",
   "订单": "الطلبات",
   "暂无订单记录": "لا توجد طلبات بعد",
   "金额待谈": "السعر غير محدد",
   " 出货": "تم الشحن",
   "已取消": "ملغي",
   "邮件": "البريد الإلكتروني",
   "刷新": "تحديث",
   "主": "رئيسي",
   "暂无邮箱": "لا يوجد بريد إلكتروني مسجل",
   "只显示邮箱地址，不读取邮箱": "العناوين فقط — اربط صندوق بريد لقراءة الرسائل.",
   "去绑定邮箱": "فتح صناديق البريد",
   "暂无已同步的邮件记录": "لا توجد رسائل متزامنة بعد.",
   "（无主题）": "(بدون موضوع)",
   "暂无关联对话": "لا توجد محادثات مرتبطة",
   "双击编辑标题": "انقر مرتين للتحرير",
   "互动时间线": "الخط الزمني",
   "暂无互动记录": "لا يوجد نشاط بعد",
   "客户分级 ": "المستوى",
   "商机阶段 · ": "المرحلة ·",
   "切换星标": "تبديل النجمة",
   "已逾期 ": "متأخر",
   "待跟进": "متابعة",
   "关联人物": "الأشخاص",
   "订单数": "الطلبات",
   " 单报价中": "عرض سعر",
   "订单总额": "إجمالي الطلبات",
   "← 返回客户列表": "← العودة إلى القائمة",
   "编辑档案": "تحرير الملف الشخصي",
   "验厂": "زيارة الموقع",
   "添加订单": "إضافة طلب",
   "下次跟进": "متابعة",
   "保存": "حفظ",
   "客户详情": "العميل",
   "对话标题（最多 60 字）": "عنوان المحادثة (بحد أقصى 60)",
   "对话摘要（最多 200 字）": "ملخص المحادثة (بحد أقصى 200)",
   "已保存": "تم الحفظ",
   "拉取中…": "جارٍ السحب…",
   "低": "منخفض",
   "中": "متوسط",
   "高": "مرتفع",
   "品牌商": "علامة تجارية",
   "分销商": "موزع",
   "代理商": "وكيل",
   "安装商": "مثبت",
   "维保商": "الصيانة",
   "同行": "منافس",
   "取消关联": "إلغاء الارتباط",
   "主联系人": "رئيسي",
   "主联系人 ": "رئيسي",
   "加载客户画像失败": "فشل تحميل الملف الشخصي",
   "客户画像": "الملف الشخصي",
   "返回客户详情": "العودة إلى العميل",
   "请先选择客户": "اختر عميلاً أولاً",
   "搜索对话...": "البحث في المحادثات...",
   "输入消息": "رسالة",
   "添加文件": "إرفاق ملفات",
   "发送": "إرسال",
   "停止": "إيقاف",
   "关联客户": "العميل المرتبط",
   "调用技能": "المهارات",
   "文件、邮件里的内容只作资料，不当指令执行": "محتوى الملفات والبريد الإلكتروني للمرجعية فقط، وليس تعليمات.",
   "释放以添加文件": "أفلت الملفات للإضافة",
   "来自缓存提取": "من الذاكرة المؤقتة",
   "分析完成": "اكتمل التحليل",
   "复制到剪贴板": "نسخ إلى الحافظة",
   "评价此回复：": "قيّم هذه الإجابة:",
   "感谢反馈": "شكراً لملاحظاتك",
   "已关联客户：": "العميل المرتبط:",
   "查这家客户的海关进口记录": "البحث عن سجلات الاستيراد الجمركي لهذا العميل",
   "Trade AI Assistant — 智能外贸销售助手": "مساعد التجارة الذكي",
   "今日简报": "ملخص اليوم",
   "客户开发": "تطوير العملاء",
   "网站诊断": "تشخيص الموقع",
   "社媒营销": "التسويق عبر وسائل التواصل",
   "海关数据": "بيانات الجمارك",
   "营销素材": "مواد تسويقية",
   "认证资质": "الشهادات والمؤهلات",
   "物流单据": "مستندات الشحن",
   "发票": "الفواتير",
   "产品规格": "مواصفات المنتجات",
   "客户资料": "ملفات العملاء",
   "合同": "العقود",
   "报价单": "عروض الأسعار",
   "文档库": "مكتبة المستندات",
   "文档生成": "توليد المستندات",
   "客户背调": "فحص خلفية العميل",
   "邮箱": "البريد الإلكتروني",
   "定时任务": "المهام المجدولة",
   "对话记录": "سجل المحادثات",
   "验厂计划": "خطة زيارة المصنع",
   "工作台": "لوحة العمل",
   "获客引流": "جذب العملاء",
   "销售管理": "إدارة المبيعات",
   "工具": "الأدوات",
   "历史": "السجل",
   "早安简报": "النشرة الصباحية",
   "使用 web_search 获取实时汇率、大宗商品价格、目标市场新闻，结合昨日对话生成简报": "استخدم web_search للحصول على أسعار الصرف الفورية وأسعار السلع وأخبار السوق المستهدف، وإنشاء موجز بالاستناد إلى محادثة الأمس",
   "按照 b2b-daily-automation 技能中的早安简报规范生成今日简报。必须使用 web_search 逐项搜索实时汇率（USD/EUR/GBP→CNY）、大宗商品价格（金/铜/铝/原油）、目标市场新闻。查询昨日对话记录和客户待跟进清单。所有数值必须来自搜索结果，不得编造或留空。": "اتّبع مواصفات موجز الصباح في مهارة b2b-daily-automation: استخدم web_search للبحث عن أسعار الصرف المباشرة (USD/EUR/GBP→CNY) وأسعار السلع (الذهب/النحاس/الألومنيوم/النفط) وأخبار الأسواق المستهدفة. راجع محادثات الأمس وقائمة متابعة العملاء. يجب أن تأتي كل الأرقام من نتائج البحث — لا تختلقها ولا تتركها فارغة.",
   "邮件处理与跟进": "معالجة البريد والمتابعة",
   "回复所有未读消息，发送跟进邮件。新消息 2 小时内回复 100%": "الرد على جميع الرسائل غير المقروءة وإرسال رسائل متابعة. الرد على 100% من الرسائل الجديدة خلال ساعتين",
   "帮我整理今天待处理的邮件和跟进事项：列出昨日至今天收到的客户消息、需要跟进的客户（按 A/B/C 优先级）、明天需要发送的提醒邮件模板。": "ساعدني في تنظيم رسائل البريد والمتابعات المعلقة اليوم: اذكر رسائل العملاء الواردة من الأمس إلى اليوم، والعملاء الذين يحتاجون متابعة (حسب الأولوية A/B/C)، وقوالب رسائل التذكير التي يجب إرسالها غداً.",
   "精准加人 (LinkedIn)": "إضافة جهات اتصال مستهدفة (LinkedIn)",
   "搜索关键词+职位，发送连接请求+Add Note，目标 30-50 人/天": "ابحث بالكلمات المفتاحية + المسميات الوظيفية، أرسل طلبات اتصال + Add Note، الهدف 30-50 شخصاً/يوم",
   "生成本日 LinkedIn 精准加人计划：根据我公司的产品和目标市场，列出今天应该搜索的 5 个关键词组合，每个关键词推荐 3-5 个搜索过滤条件（行业/地区/职位），并生成 Add Note 模板。": "أنشئ خطة اليوم الدقيقة لإضافة جهات الاتصال على LinkedIn: بناءً على منتجات شركتنا والسوق المستهدف، اعرض 5 مجموعات كلمات رئيسية للبحث اليوم، واقترح 3–5 معايير تصفية بحث (الصناعة / المنطقة / المسمى الوظيفي) لكل كلمة رئيسية، وأنشئ قوالب Add Note.",
   "评论互动与私信致谢": "التفاعل بالتعليقات والشكر عبر الرسائل الخاصة",
   "评论目标客户 10-15 条动态，新增连接发送感谢私信": "علّق على 10-15 منشوراً للعملاء المستهدفين، وأرسل رسالة شكر الخاصة إلى الاتصالات الجديدة",
   "帮我生成本日 LinkedIn 互动计划：列出需要评论的客户类型和评论模板（3 种场景），以及新增连接后的感谢私信模板。": "أنشئ خطة تفاعل LinkedIn لليوم: حدد أنواع العملاء المراد التعليق عليها، وقوالب التعليقات (3 سيناريوهات)، وقوالب رسائل الشكر الخاصة للاتصالات الجديدة.",
   "LinkedIn 内容发布": "نشر محتوى LinkedIn",
   "3 帖/周": "3 منشور/أسبوع",
   "发布或转发 1 条内容（案例/痛点/工厂/证书），": "نشر أو إعادة نشر محتوى واحد (حالة/نقطة ألم/مصنع/شهادة)،",
   "请生成本日的 LinkedIn 帖子（5 维度轮换：视频/照片/文章/投票/Document）。内容围绕我公司产品和行业，带 5 个 hashtag，可直接复制粘贴发布。": "يرجى إنشاء منشور LinkedIn لهذا اليوم (بالتبديل بين 5 صيغ: فيديو/صورة/مقال/استطلاع/Document). يجب أن يدور المحتوى حول منتجات شركتي وقطاعنا، وأن يتضمن 5 وسوم (hashtags)، ويكون جاهزًا للنسخ واللصق مباشرةً.",
   "B2B 平台检查": "فحص منصة B2B",
   "检查阿里国际站/Made-in-China 等平台询盘、排名、发布产品": "فحص الاستفسارات والترتيب ومنشورات المنتجات على Alibaba.com / Made-in-China وغيرها من المنصات",
   "生成今日 B2B 平台检查清单：新询盘数量、待回复询盘、产品排名变化、需要发布的产品数量。给出具体可执行的操作步骤。": "أنشئ قائمة فحص منصة B2B لليوم: عدد الاستفسارات الجديدة، الاستفسارات التي تنتظر الرد، تغيّرات ترتيب المنتجات، عدد المنتجات المطلوب نشرها. قدّم خطوات عملية محددة.",
   "新客户搜索/加人/开发信发送，目标日均 20-30 个有效触达": "البحث عن عملاء جدد/إضافة أشخاص/إرسال رسائل تواصل، الهدف 20-30 تواصلًا فعّالًا يوميًا",
   "生成本日客户开发计划：根据我公司的产品和目标市场，列出 5 个找客户渠道（LinkedIn/Facebook/Google Maps/B2B平台/海关数据），每个渠道给出具体搜索方法和开发信模板。": "أنشئ خطة تطوير العملاء لليوم: استناداً إلى منتجات شركتنا والأسواق المستهدفة، اذكر 5 قنوات للعثور على العملاء (LinkedIn/Facebook/Google Maps/منصات B2B/بيانات الجمارك)، وقدّم لكل قناة طريقة بحث محددة ونموذج رسالة تواصل.",
   "每日工作总结": "ملخص العمل اليومي",
   "更新客户表/CRM，复盘当日完成情况，规划次日优先级": "تحديث جدول العملاء/CRM، ومراجعة ما أُنجز اليوم، وتخطيط أولويات الغد",
   "请帮我生成今日工作总结模板，包含：今日完成事项清单、客户互动汇总、新增客户统计、待跟进事项、明日优先级安排。如果是周五，加上本周 KPI 对比和下周计划。": "يرجى إنشاء قالب ملخص عمل يومي لي، يتضمن: قائمة المهام المكتملة اليوم، ملخص تفاعل العملاء، إحصائيات العملاء الجدد، الأمور المعلقة للمتابعة، وترتيب أولويات الغد. إذا كان اليوم الجمعة، أضف مقارنة KPI لهذا الأسبوع وخطة الأسبوع القادم.",
   "周五 17:30": "الجمعة 17:30",
   "每周复盘报告": "تقرير المراجعة الأسبوعي",
   "周复盘：亮点/短板/KPI对比/下周行动清单": "مراجعة أسبوعية: الإيجابيات / أوجه القصور / مقارنة KPI / قائمة إجراءات الأسبوع القادم",
   "请生成本周复盘报告模板，包含：本周完成事项、KPI 完成情况（新增人脉/有效对话/需求线索/预约会议/内容发布）、亮点与短板分析、竞品洞察、下周行动清单。": "أنشئ قالب تقرير مراجعة هذا الأسبوع، بما في ذلك: ما أُنجز هذا الأسبوع، حالة KPI (جهات اتصال جديدة/محادثات فعّالة/فرص طلب/اجتماعات محجوزة/نشر محتوى)، تحليل نقاط القوة والضعف، رؤى المنافسين، وقائمة إجراءات الأسبوع القادم.",
   "删除此自定义模板？": "حذف هذا القالب المخصص؟",
   "必选": "إلزامي",
   "自定义": "مخصص",
   "编辑 Prompt": "تحرير Prompt",
   "执行一次": "تشغيل مرة واحدة",
   "批量生成选中任务": "إنشاء المهام المحددة دفعة واحدة",
   "清空全部任务": "مسح جميع المهام",
   "-- 定时任务使用说明书 --": "دليل استخدام المهام المجدولة --",
   "定时任务使用说明书（点击展开 / 收起）": "دليل استخدام المهام المجدولة (انقر للتوسيع / الطي)",
   "一、什么是定时任务？": "١. ما هي المهام المجدولة؟",
   "定时任务就像一个闹钟。你告诉它「每天几点要做什么事」，时间一到，系统会自动帮你去执行。": "المهمة المجدولة تشبه المنبه. تخبرها 「ماذا تفعل وأي وقت كل يوم」، وحين يحين الوقت ينفّذ النظام ذلك تلقائياً نيابةً عنك.",
   "比如你可以设置：每天早上 9 点自动搜索当日汇率、每周五下午 5 点生成周报。": "على سبيل المثال، يمكنك الإعداد: البحث التلقائي عن أسعار صرف اليوم كل صباح الساعة 9:00، وإنشاء تقرير أسبوعي كل جمعة الساعة 5:00 مساءً.",
   "二、Cron 表达式是什么？": "ثانياً: ما هو تعبير Cron؟",
   "组成，用空格隔开：": "مكوّنة من، مفصولة بمسافات:",
   "5 个数字": "5 أرقام",
   "Cron 表达式是用来描述「什么时候执行」的一串代码。它由": "Cron التعبير هو سلسلة برمجية تصف «متى يتم التنفيذ». وهو مكوّن من",
   "分钟 小时 日 月 星期": "الدقيقة الساعة اليوم الشهر يوم الأسبوع",
   "看不懂没关系，下面逐个解释": "لا بأس إن لم تفهم، سنشرح كل واحد فيما يلي",
   "位置": "الموقع",
   "叫什么": "ماذا تسمّيه",
   "可以填什么": "ما الذي يمكن إدخاله",
   "什么意思": "ماذا يعني",
   "在每小时的第几分运行。填 0 代表整点，填 30 代表半点": "يشغّل في الدقيقة الكذا من كل ساعة. أدخل 0 لبداية الساعة، و 30 للنصف",
   "分钟": "دقائق",
   "第 1 个": "الأول",
   "晚上8点": "الثامنة مساءً",
   "下午2点，20": "الساعة 2 مساءً، 20",
   "早上8点，14": "الثامنة صباحاً، 14",
   "半夜12点，8": "منتصف الليل 12، 8",
   "在几点运行。0": "الساعة التي يُشغَّل فيها. 0",
   "小时": "ساعة",
   "第 2 个": "الثاني",
   "代表每天都行": "يعني أن أي يوم مقبول",
   "在每月第几天运行。填": "في أي يوم من الشهر يعمل. أدخل",
   "日": "اليوم",
   "第 3 个": "الثالث",
   "代表每月都行": "يعني أي شهر مقبول",
   "在几月运行。填": "في أي شهر يعمل. أدخل",
   "月": "الشهر",
   "第 4 个": "العنصر رقم 4",
   "代表每天": "يعني كل يوم",
   "周六。填": "السبت. أدخل",
   "周一...6": "الإثنين...6",
   "周日，1": "الأحد، 1",
   "星期几运行。0": "أي يوم من الأسبوع يعمل. 0",
   "星期": "يوم الأسبوع",
   "第 5 个": "الخامس",
   "三、常用写法速查表": "ثالثاً: جدول سريع للصيغ الشائعة",
   "你想要的": "ما تريده",
   "Cron 表达式": "Cron التعبير",
   "大白话解释": "شرح بلغة بسيطة",
   "每天 9 点整触发": "التفعيل الساعة 9:00 صباحًا كل يوم",
   "每天上午 9:00": "الساعة 9:00 صباحًا كل يوم",
   "每天 15:30 触发": "يُفعَّل يوميًا الساعة 15:30",
   "每天下午 3:30": "كل يوم الساعة 3:30 مساءً",
   "周一至周五的早上 9 点": "التاسعة صباحاً من الاثنين إلى الجمعة",
   "每个工作日（周一到周五）9:00": "كل يوم عمل (من الاثنين إلى الجمعة) الساعة 9:00",
   "只在每周一 8:30 触发": "يُفعَّل فقط كل يوم اثنين الساعة 8:30",
   "每周一早上 8:30": "كل إثنين الساعة 8:30 صباحاً",
   "只在每周五 17:30 触发": "يُفعَّل فقط كل جمعة الساعة 17:30",
   "每周五下午 5:30": "كل جمعة الساعة 5:30 مساءً",
   "每个月 1 号触发": "يُفعَّل في اليوم الأول من كل شهر",
   "每月 1 号上午 10:00": "الساعة 10:00 صباحًا في اليوم 1 من كل شهر",
   "每 30 分钟跑一次": "التشغيل كل 30 دقيقة",
   "每隔 30 分钟": "كل 30 دقيقة",
   "四、特殊符号说明": "4. شرح الرموز الخاصة",
   "符号": "الرمز",
   "名字": "الاسم",
   "怎么用": "كيفية الاستخدام",
   "举例": "مثال",
   "每天 9 点": "كل يوم الساعة 9",
   "代表「所有可能的值」。填在小时位置就是每小时，填在日位置就是每天": "يعني «كل القيم الممكنة». إذا كُتب في خانة الساعة فمعناه كل ساعة، وفي خانة اليوم فمعناه كل يوم",
   "星号（通配）": "النجمة (حرف بدل)",
   "每天 9点、14点、18点各跑一次": "يشغّل مرة واحدة يومياً في 9:00 و 14:00 و 18:00",
   "列出多个值，用逗号隔开": "أدرج قيمًا متعددة مفصولة بفواصل",
   "逗号（列举）": "الفاصلة (قائمة)",
   "周一到周五": "من الإثنين إلى الجمعة",
   "从 A 到 B 的所有值": "جميع القيم من A إلى B",
   "横线（范围）": "الشرطة (نطاق)",
   "每 15 分钟跑一次": "يُشغَّل كل 15 دقيقة",
   "每隔多少就触发一次": "يُفعَّل بفاصل محدد",
   "斜杠（间隔）": "الشرطة المائلة (الفاصل)",
   "五、执行时间怎么填？": "5. كيف أحدّد وقت التنفيذ؟",
   "字段不需要写 Cron 表达式，直接写时间就行：": "لا تحتاج إلى كتابة تعبير Cron في هذا الحقل، اكتب الوقت مباشرةً:",
   "「执行时间」": "وقت التنفيذ」",
   "在模板中，": "في القالب،",
   "（工作日早 9 点）": "（التاسعة صباحاً في أيام العمل)",
   "— 系统会自动生成": "سيقوم النظام بإنشائه تلقائياً",
   "写": "اكتب",
   "— 代表一个时间段，系统会用开始时间 09:00": "تمثل فترة زمنية، وسيستخدم النظام وقت البدء 09:00",
   "— 如果你在 Cron 表达式里填了覆盖值，则以 Cron 表达式为准": "إذا أدخلت قيمة تجاوز في تعبير Cron، فيعمل بتعبير Cron",
   "框。": "الخانة.",
   "「Cron 表达式」": "「Cron التعبير»",
   "如果你想精确控制，直接改右边的": "إذا أردت تحكمًا دقيقًا، عدّل مباشرةً الموجود على اليمين",
   "六、执行 Prompt 怎么写？": "٦. كيف أكتب Prompt التنفيذ؟",
   "Prompt 就是告诉 Agent「你要帮我做什么」的一段话。用大白话写就行，就像你在聊天框里打字一样。": "Prompt هي مجرد رسالة تقول للـ Agent «ماذا تريدني أن أفعل لك». اكتبها بلغة بسيطة، كما لو كنت تكتب في مربع المحادثة.",
   "写好 Prompt 的 3 个要点：": "3 نقاط أساسية لكتابة Prompt جيد:",
   "：不要写「帮我查资料」，要写「帮我查今天的 USD/CNY 汇率、铜价、铝价」": "لا تكتب «ساعدني في البحث»، بل اكتب «ساعدني في التحقق من سعر صرف USD/CNY اليوم وسعر النحاس وسعر الألومنيوم»",
   "说清楚目标": "وضّح الهدف بوضوح",
   "：不要写「生成简报」，要写「用表格列出，包含实时数值、变化幅度、数据来源」": "لا تكتب 「أنشئ موجزاً」، بل اكتب 「اعرضها في جدول يتضمن القيم الفورية ومقدار التغير ومصادر البيانات」",
   "说清楚格式": "وضّح التنسيق بوضوح",
   "：不要写「写开发信」，要写「用英语写，100 字以内，先提客户痛点再讲我们的解决方案」": "لا تكتب «اكتب رسالة تطوير عملÂ»، بل اكتب «اكتب باللغة الإنجليزية، في 100 كلمة أو أقل، اذكر نقطة ألم العميل أولاً ثم حلناÂ»",
   "说清楚要求": "وضّح متطلباتك بوضوح",
   "，不要写多余的话。Agent 会自动执行，不需要你说「请」、「谢谢」。": "，لا تكتب كلامًا زائدًا. سينفّذ الـ Agent المهمة تلقائيًا، ولا داعي لقول «من فضلك» أو «شكرًا».",
   "任务本身做什么": "ما تفعله المهمة نفسها",
   "：Prompt 要写": "：Prompt اكتب",
   "重要提醒": "تنبيه مهم",
   "七、操作步骤": "٧. خطوات التشغيل",
   "自定义模板」写自己的）": "القالب المخصص» لكتابة قالبك الخاص)",
   "你想要的任务模板（或点「": "قالب المهمة الذي تريده (أو انقر «",
   "钩选": "علّم",
   "（用上面速查表参考）": "（راجع الجدول المختصر أعلاه)",
   "和": "و",
   "编辑执行时间": "تعديل وقت التنفيذ",
   "编辑 Prompt」检查或修改任务指令": "«تعديل PromptÂ» لفحص توجيه المهمة أو تعديله",
   "点「": "انقر على «",
   "，Agent 自动创建定时任务": "，Agent إنشاء مهام مجدولة تلقائياً",
   "批量生成选中任务」": "إنشاء دفعات للمهام المحددةÂ»",
   "点": "الساعة",
   "已激活的定时任务」会显示当前所有运行中的任务": "المهام المجدولة المفعّلة」 تعرض جميع المهام قيد التشغيل حالياً",
   "下方「": "أدناه «",
   "执行一次」按钮": "زر «تنفيذ مرة واحدةÂ»",
   "如果需要马上执行，点任务旁的「": "إذا أردت التنفيذ فوراً، انقر على 「",
   "八、常见问题": "ثامناً: الأسئلة الشائعة",
   "Q: 任务会在我关掉浏览器后执行吗？": "هل ستُنفَّذ المهمة بعد إغلاق المتصفح؟",
   "A: 会的。定时任务由后台服务独立运行，不需要你一直开着浏览器。只要电脑开着、Trade 系统在运行就行。": "نعم. تعمل المهام المجدولة بشكل مستقل عبر خدمة في الخلفية، ولا تحتاج إلى إبقاء المتصفح مفتوحاً. يكفي أن يكون الجهاز مشغلًً ونظام Trade قيد التشغيل.",
   "Q: 我能把电脑关了吗？": "هل يمكنني إيقاف تشغيل الجهاز؟",
   "A: 不能。Trade 系统需要运行时电脑保持开机。可以设置 Trade 开机自启动（安装脚本会提示配置），这样每次开机自动运行。": "لا. يحتاج نظام Trade إلى أن يظل الجهاز قيد التشغيل أثناء عمله. يمكنك ضبط Trade للبدء تلقائيًا عند الإقلاع (سيطلب المثبّت إعداد ذلك)، فيعمل تلقائيًا في كل مرة تشغّل فيها الجهاز.",
   "Q: 任务执行结果在哪看？": "أين أرى نتائج تنفيذ المهمة؟",
   "A: 结果会发送到聊天界面中。如果你在早上 9 点前打开界面，可以看到早安简报自动推送。": "تُرسل النتائج إلى واجهة الدردشة. إذا فتحت الواجهة قبل الساعة 9:00 صباحاً، سترى الموجز الصباحي يُرسل تلقائياً.",
   "Q: Cron 表达式写错了怎么办？": "Q: Cron ماذا أفعل إذا كتبت التعبير بشكل خاطئ؟",
   "A: 不会造成损害，只是任务不会按时执行或不执行。删掉重建就行。": "لن يترتب على ذلك ضرر، فقط لن تُنفَّذ المهمة في موعدها أو لن تُنفَّذ إطلاقاً. احذفها وأعد إنشائها.",
   "-- 模板库 --": "مكتبة القوالب --",
   "任务模板库（钩选 → 编辑时间 → 批量生成）": "مكتبة قوالب المهام (حدّد → عدّل الوقت → أنشئ دفعة واحدة)",
   "自定义模板": "قالب مخصص",
   "-- 分隔线 --": "فاصل --",
   "-- 已激活任务 --": "المهام المفعّلة --",
   "已激活的定时任务": "المهام المجدولة النشطة",
   "加载中...": "جارٍ التحميل...",
   "Prompt 已更新": "Prompt تم التحديث",
   "编辑：": "تحرير:",
   "任务 Prompt（Agent 将按此指令执行）": "Prompt المهمة (سيتبع Agent هذا التوجيه)",
   "自定义任务模板": "قالب مهمة مخصص",
   "例如：海关数据每日监控": "مثال: مراقبة بيانات الجمارك يوميًا",
   "任务名称": "اسم المهمة",
   "09:00 或 09:00-10:30": "09:00 أو 09:00-10:30",
   "执行时间": "وقت التنفيذ",
   "简要描述任务内容": "صف المهمة باختصار",
   "任务描述": "وصف المهمة",
   "Agent 将按此指令执行...": "سينفّذ الوكيل هذا التوجيه...",
   "执行 Prompt": "تنفيذ Prompt",
   "保存模板": "حفظ القالب",
   "请填写任务名称、时间和 Prompt": "أدخل اسم المهمة والوقت و Prompt",
   "」已添加": "」تمت الإضافة",
   "自定义模板「": "قالب مخصص «",
   "请先选择公司": "يرجى اختيار شركة أولاً",
   "请至少选择一个任务模板": "يرجى اختيار قالب مهمة واحد على الأقل",
   "任务名:": "اسم المهمة:",
   "定时任务批量创建": "إنشاء مهام مجدولة بالجملة",
   "n请为每个任务创建 cron job 并返回创建结果。": "يرجى إنشاء cron job لكل مهمة وإرجاع نتائج الإنشاء.",
   "请使用 cronjob 工具为我批量创建以下定时任务，所有任务使用 --deliver local：": "يرجى استخدام أداة cronjob لإنشاء المهام المجدولة التالية دفعة واحدة، مع استخدام --deliver local لجميع المهام:",
   "确定删除所有已激活的定时任务？此操作不可恢复。": "هل تريد بالتأكيد حذف جميع المهام المجدولة النشطة؟ لا يمكن التراجع عن هذا الإجراء.",
   "清空定时任务": "مسح المهام المجدولة",
   "请使用 cronjob 工具列出并删除所有现有的 cron 定时任务。逐一删除，完成后告知结果。": "يرجى استخدام أداة cronjob لعرض وحذف جميع مهام cron المجدولة الحالية. احذفها واحدة تلو الأخرى وأبلغ بالنتيجة عند الانتهاء.",
   "暂无已激活的定时任务。请从上方模板库钩选后点击「批量生成」。": "لا توجد مهام مجدولة نشطة بعد. اختر من مكتبة القوالب أعلاه ثم انقر «إنشاء دفعي».",
   "已暂停": "موقوفة",
   "运行中": "قيد التشغيل",
   "立即执行": "تنفيذ فوري",
   "立即执行任务": "تنفيذ المهمة الآن",
   "，将结果输出到当前对话。": "，أخرج النتيجة إلى المحادثة الحالية.",
   "请使用 cronjob 工具手动触发一次任务 ID": "يرجى استخدام أداة cronjob لتشغيل المهمة يدوياً مرة واحدة، معرّف المهمة",
   "发布或转发 1 条内容（案例/痛点/工厂/证书），≥3 帖/周": "انشر أو أعد نشر المحتوى (دراسة حالة/نقطة ألم/مصنع/شهادة)، ≥٣ منشورات أسبوعيًا",
   "▶ 下次执行：": "▶ التشغيل القادم: ",
   // Site Visit / SITE VISIT (runtime-rendered strings; langText falls back to EN if absent)
   "生成建议": "إنشاء اقتراحات",
   "打印 A4": "طباعة A4",
   "手机长图": "صورة طويلة للجوال",
   "私密备忘录": "مذكرة خاصة",
   "＋ 新建一次来访": "＋ زيارة جديدة",
   "行程与来访人": "البرنامج والزوار",
   "标题": "العنوان",
   "日期": "التاريخ",
   "天数": "عدد الأيام",
   "地点": "المكان",
   "暂无来访计划": "لا توجد زيارات بعد",
   "密语": "كلمة المرور",
   "再输入一次": "أعد الإدخال",
   "确定": "موافق",
   "每次输入密语": "اطلب كلمة المرور دائمًا",
   "本会话内有效": "صالحة لهذه الجلسة",
   "家庭 / 私密档案": "الأسرة / الملف الخاص",
   "无": "لا شيء",
   "仅本机查看；不会进入 AI、打印、长图或导出。": "للعرض محليًا فقط؛ لا تُرسل إلى الذكاء الاصطناعي أو الطباعة أو الصورة الطويلة أو التصدير.",
   "天": "يوم",
   "公开页": "النسخة العامة",
   "内部页": "النسخة الداخلية",
   "SITE VISIT / 资料": "زيارة الموقع / ملف",
   "SITE VISIT / 内部资料": "زيارة الموقع / داخلي",
   "SITE VISIT / 验厂资料": "زيارة الموقع / ملف",
   "TRADE · 内部资料 · 请勿外传": "TRADE · داخلي · لا يشارك",
   "TRADE · 验厂资料": "TRADE · ملف الزيارة",
   "内部 · 勿外传": "داخلي · لا يشارك",
   "含内部信息": "تضمين المعلومات الداخلية",
   "默认公开版：来访人 / 日程 / 对外说明；勾选后加入人员 / 清单 / 内部风险": "الافتراضي هو النسخة العامة: الزوار / البرنامج / البيان الخارجي؛ أضف الطاقم / القائمة / المخاطر الداخلية عند التحديد",
   "下载长图": "تنزيل الصورة الطويلة",
   "验厂长图": "صورة زيارة الموقع الطويلة",
   "新计划": "خطة جديدة",
   "已载入 ": "تم تحميل ",
   "公开页给客户看；内部页只上内部，页头带「内部 · 勿外传」": "النسخة العامة للعميل؛ النسخة الداخلية للاستخدام الداخلي فقط وبها تنبيه «داخلي · لا يشارك»",
   "打印": "طباعة",
   "密语策略": "وضع كلمة المرور",
   "内部资料": "مواد داخلية",
   "验厂资料": "ملف الزيارة",
   "不关联客户": "بدون عميل",
   "来访人": "الزوار",
   "日程": "البرنامج",
   "人员与分工": "الطاقم والمهام",
   "访前清单": "قائمة ما قبل الزيارة",
   "内部风险": "المخاطر الداخلية",
   "对外说明": "البيان الخارجي",
   "验厂计划已保存": "تم حفظ زيارة الموقع",
   "已填入建议（可自行修改）": "تم إدراج الاقتراحات (يمكنك التعديل)",
   "生成长图失败": "فشل إنشاء الصورة الطويلة",
   "请输入密语": "أدخل كلمة المرور",
   "输入私密备忘录密语": "أدخل كلمة مرور المذكرة الخاصة",
   "两次输入不一致": "كلمتا المرور غير متطابقتين",
   "密语至少 4 位": "يجب أن تكون كلمة المرور 4 أحرف على الأقل",
   "首次使用：设置私密备忘录密语（至少 4 位）": "أول استخدام: أنشئ كلمة مرور للمذكرة الخاصة (4 أحرف على الأقل)",
   "密语已失效，请重新输入": "انتهت صلاحية كلمة المرور، أعد الإدخال",
   "密语已锁定，请 ": "كلمة المرور مقفلة، حاول بعد ",
   " 秒后再试": " ثانية",
   "密语策略已更新": "تم تحديث وضع كلمة المرور",
   "读取私密备忘录失败": "فشل تحميل المذكرة الخاصة",
   "客户索要": "طلب العميل",
   "关闭": "إغلاق",
   "【客户档案提醒 · 内部】": "【ملاحظة ملف العميل · داخلي】",
   "-公开": "-عامة",
   "-内部": "-داخلية",
   "-长图.png": "-صورة-طويلة.png",
   "12-08 上午 参观车间…": "12-08 صباحًا زيارة الورشة…",
   "接待：张三 / 技术：…": "الاستقبال: محمد / التقني:…",
   "点击「新建客户」逐个添加，或用「导入 CSV」批量导入": "أضف العملاء واحدًا بواحد عبر «عميل جديد»، أو استوردهم دفعة واحدة عبر «استيراد CSV»",
   "报价中": "قيد العرض",
   "已下单": "تم الطلب",
   "已出货": "تم الشحن",
   "已完成": "مكتمل",
   "请为每个任务创建 cron job 并返回创建结果。": "أنشئ مهمة cron لكل مهمة وأعد نتيجة الإنشاء.",
   "删除": "حذف",
   "原因（可选）": "السبب (اختياري)",
   "✓ 已完整读取 ": "تمت القراءة كاملة ✓ ",
   "⚠ 完整读取未通过，已完整读取 ": "تعذّر التحقق الكامل، تمت القراءة ",
   " 个文件": " ملف(ات)",
   "已启动（预算 ": "تم البدء (الميزانية ",
   " 秒）": " ثانية)",
   "查询 ": "جارٍ الاستعلام: ",
   "评级 ": "التقييم: ",
   "任务 ": "المهمة ",
   "客户: ": "العميل: ",
   "导入失败: ": "فشل الاستيراد: ",
   "上传导入": "استيراد بالرفع",
   "下载管理表格失败: ": "فشل تحميل جدول الإدارة: ",
   "下载模板失败: ": "فشل تحميل القالب: ",
    " Prompt 已更新": "تم التحديث",
    "。完成后告知结果。": "أبلغ بالنتيجة بعد الانتهاء.",
    "下次执行：": "التشغيل القادم:",
    "当前公司暂无已激活的定时任务": "لا توجد مهام مجدولة مفعّلة للشركة الحالية",
    "最近产出：": "آخر النتائج:",
    "查看输出": "عرض النتائج",
    "请使用 cronjob 工具仅删除当前公司的以下定时任务（按 job_id 逐一执行 remove，不要列出或操作其它任务）：": "استخدم أداة cronjob لحذف مهام الشركة الحالية التالية فقط (remove لكل job_id على حدة؛ لا تعرض أو تعدّل مهام أخرى):",
   " 可以按下面的步骤手动重装。": " يمكنك إعادة التثبيت يدويًا بالخطوات أدناه.",
   " 项": " عنصر",
   " 项进行中": " قيد التنفيذ",
   "Hermes 升级 · UPGRADE": "ترقية Hermes",
   "Hermes 升级中": "جارٍ ترقية Hermes",
   "Hermes 已升级完成。请点击「重启 Trade」使新版本生效。": "تمت ترقية Hermes. اضغط «إعادة تشغيل Trade» لتفعيل الإصدار الجديد.",
   "Hermes 没有升级成功。请确认网络通畅后点「重试」。": "لم تنجح ترقية Hermes. تأكد من الاتصال ثم اضغط «إعادة المحاولة».",
   "Trade 需要 Hermes 才能聊天。按下面的步骤安装并配置模型，然后重新打开 Trade。": "يحتاج Trade إلى Hermes للمحادثة. اتبع الخطوات أدناه لتثبيته وضبط النموذج ثم أعد فتح Trade.",
   "Trade 需要更新版本的 Hermes，正在准备升级…": "يحتاج Trade إلى إصدار أحدث من Hermes، ويجري التحضير للترقية…",
   "Trade 需要重建运行环境": "يحتاج Trade إلى إعادة بناء بيئة التشغيل",
   "← 返回修改": "← رجوع للتعديل",
   "下一步：卖到哪里去？ →": "التالي: إلى أين تبيع؟ →",
   "下一步：找什么类型？ →": "التالي: أي نوع من المشترين؟ →",
   "下载模板失败": "فشل تنزيل القالب",
   "你的 Hermes 已经是新版，但 Trade 的运行环境还是旧的。点下面的按钮重建一次即可，数据不会丢。": "إصدار Hermes محدّث، لكن بيئة تشغيل Trade قديمة. اضغط الزر أدناه لإعادة البناء مرة واحدة — بياناتك محفوظة.",
   "例如：LED工矿灯、不锈钢螺丝、全棉T恤...": "مثال: مصابيح LED صناعية، براغي ستانلس، قمصان قطنية…",
   "例如：德国、美国、中东...": "مثال: ألمانيا، الولايات المتحدة، الشرق الأوسط…",
   "先告诉我：你卖什么产品？": "أولًا: ماذا تبيع؟",
   "全部完成": "اكتمل الكل",
   "关联失败": "فشل الربط",
   "准备升级 Hermes": "التحضير لترقية Hermes",
   "功能开发中：将在文件管理器中打开": "قيد التطوير: سيُفتح في مدير الملفات",
   "加载目录结构...": "جارٍ تحميل شجرة المجلدات…",
   "升级中": "جارٍ الترقية",
   "升级失败": "فشلت الترقية",
   "升级完成": "اكتملت الترقية",
   "升级进行中，请勿关闭 Trade。这一步可能需要几分钟。": "الترقية جارية — أبقِ Trade مفتوحًا. قد يستغرق هذا دقائق.",
   "卖什么": "ماذا تبيع",
   "卖到哪": "إلى أين",
   "后台任务 · ": "المهام الخلفية · ",
   "品牌商 / OEM 工厂": "علامة تجارية / مصنع OEM",
   "品牌商/OEM工厂": "علامة تجارية/مصنع OEM",
   "在新标签页打开图片（": "افتح الصورة في تبويب جديد (",
   "大量采购再分销到本地市场": "يشتري بكميات كبيرة ويعيد التوزيع محليًا",
   "对话详情": "المحادثة",
   "小批量多频次采购": "طلبات صغيرة ومتكررة",
   "展开": "توسيع",
   "已关联": "تم الربط",
   "已取消关联": "تم إلغاء الربط",
   "帮我找客户。产品=": "ابحث لي عن عملاء. المنتج=",
   "开始找客户！": "ابحث عن عملاء",
   "开始重建": "ابدأ إعادة البناء",
   "想卖到哪个国家或地区？": "إلى أي دولة أو منطقة تريد البيع؟",
   "想找什么类型的客户？": "أي نوع من المشترين تريد؟",
   "所有类型": "كل الأنواع",
   "打开目录": "افتح المجلد",
   "批发商 / 分销商": "تاجر جملة / موزّع",
   "批发商/分销商": "تاجر جملة/موزّع",
   "找谁": "من تبحث عنه",
   "收起": "إخفاء",
   "数据目录": "مجلد البيانات",
   "文件内容通过 Agent 对话中的 read_file 工具访问。在侧边栏中选择对应功能入口后，Agent 会自动读取相关文件。": "تُقرأ الملفات عبر أداة read_file في محادثة الوكيل. اختر المدخل المناسب من الشريط الجانبي وسيقرأ الوكيل الملفات تلقائيًا.",
   "无法访问 GitHub，升级没有开始。请开启代理（VPN）后点「重试」。": "تعذّر الوصول إلى GitHub ولم تبدأ الترقية. شغّل الـVPN ثم اضغط «إعادة المحاولة».",
   "期间 Trade 会暂时打不开，完成后页面会自动刷新。": "سيكون Trade غير متاح خلال ذلك، وستُحدَّث الصفحة تلقائيًا عند الانتهاء.",
   "未安装 Hermes（AI 引擎）": "Hermes (محرك الذكاء الاصطناعي) غير مثبّت",
   "检查网络": "فحص الشبكة",
   "正在升级 Hermes": "جارٍ ترقية Hermes",
   "正在启动…": "جارٍ البدء…",
   "正在帮你找客户...": "جارٍ البحث عن عملاء…",
   "正在检查网络": "جارٍ فحص الشبكة",
   "正在确认能否访问 GitHub…": "جارٍ التحقق من إمكانية الوصول إلى GitHub…",
   "正在重建运行环境": "جارٍ إعادة بناء بيئة التشغيل",
   "正在重装 Trade 的运行环境（约 5~10 分钟），期间 Trade 会暂时打不开。完成后页面会自动刷新，请不要关闭。": "جارٍ إعادة تثبيت بيئة تشغيل Trade (نحو 5–10 دقائق)؛ سيكون Trade غير متاح خلالها. ستُحدَّث الصفحة عند الانتهاء — لا تغلقها.",
   "正在重试…": "جارٍ إعادة المحاولة…",
   "比如“德国”“美国”“中东”“东南亚”，可以写多个": "مثال: ألمانيا، الولايات المتحدة، الشرق الأوسط، جنوب شرق آسيا — يمكن ذكر عدة دول.",
   "点击左侧文件查看内容": "اختر ملفًا من اليسار لمعاينته",
   "现在开始吗？": "أتبدأ الآن؟",
   "背调 · BACKGROUND CHECK": "فحص الخلفية",
   "背调进行中": "فحص الخلفية جارٍ",
   "自动多通道搜索中，请稍候": "جارٍ البحث في عدة قنوات — لحظة.",
   "让 AI 自动判断最合适的类型": "دع الذكاء الاصطناعي يختار الأنسب",
   "贴牌生产，长期大单": "إنتاج بعلامة خاصة وطلبات كبيرة طويلة الأمد",
   "跳过向导": "تخطّي المعالج",
   "进行中": "قيد التنفيذ",
   "都行，帮我一起找": "أي نوع — ابحث عنها كلها",
   "采集中 ": "جارٍ الجمع ",
   "采集完成，正在生成回复…": "اكتمل الجمع، جارٍ كتابة الرد…",
   "重启 Trade": "إعادة تشغيل Trade",
   "重建没有启动。": "لم تبدأ إعادة البناء.",
   "重建耗时较长。如果页面没有自动刷新，请手动刷新一次；若一直打不开，请联系技术支持。": "تستغرق إعادة البناء وقتًا. إن لم تُحدَّث الصفحة تلقائيًا فحدّثها يدويًا؛ وإن ظل Trade لا يفتح فتواصل مع الدعم.",
   "重建运行环境大约需要 5~10 分钟。": "تستغرق إعادة بناء بيئة التشغيل نحو 5–10 دقائق.",
   "重试升级": "إعادة محاولة الترقية",
   "随便说就行，“LED灯”“五金”“纺织品”都可以": "كلمات بسيطة تكفي — «مصابيح LED»، «أدوات معدنية»، «منسوجات».",
   "零售商 / 连锁店": "تاجر تجزئة / سلسلة متاجر",
   "零售商/连锁店": "تاجر تجزئة/سلسلة متاجر",
   "需要先开启代理": "شغّل الـVPN أولًا",
   "）": ")",
   "，客户类型=": "، نوع المشتري=",
   "，市场=": "، السوق=",
   "；未纳入：": "؛ غير مشمولة: ",
   // Backend API details (English literals, added 2026-11-26). Keyed by the
   // English backend message because there is no Chinese source anymore.
   "File is not UTF-8 encoded. In Excel use \"Save As → CSV UTF-8 (Comma delimited)\" and import again.": "ملف CSV غير مشفّر بـ UTF-8. في Excel استخدم \"حفظ باسم → CSV UTF-8 (مفصول بفواصل)\" ثم استورد مرة أخرى.",
   "This is an Excel workbook (.xlsx), not a CSV; re-save it as CSV UTF-8 first": "هذا مصنف Excel (‏.xlsx) وليس ملف CSV. في Excel استخدم \"حفظ باسم → CSV UTF-8 (مفصول بفواصل)\" ثم استورد مرة أخرى.",
   "This is a web/HTML table, not a CSV; copy the data into a CSV file first": "هذا جدول ويب/HTML وليس ملف CSV. انسخ الصفوف إلى ملف CSV ثم استورد مرة أخرى.",
   "CSV is empty or has no header row": "ملف CSV فارغ أو بلا صف عناوين. استخدم القالب من \"تصدير CSV\".",
   "Please upload a .csv file": "اختر ملفًا بامتداد .csv من فضلك.",
   "CSV file too large (limit 10MB)": "ملف CSV كبير جدًا (الحد 10 ميغابايت).",
   "Failed to parse the CSV format": "تعذّر تحليل ملف CSV. تأكد أنه ملف UTF-8 مفصول بفواصل.",
   "Company data import/export is a paid feature — activate your license to use it.": "استيراد/تصدير بيانات الشركة ميزة مدفوعة — فعّل الترخيص لاستخدامها.",
   "Export target does not match the bound X-Company-ID": "هدف التصدير لا يطابق الشركة المرتبطة.",
   "Export is rate-limited — please retry later": "التصدير محدود المعدل — أعد المحاولة لاحقًا.",
   "You can only import into the currently bound company — switch to the target company first.": "يمكن الاستيراد إلى الشركة المرتبطة حاليًا فقط — بدّل إلى الشركة الهدف أولًا.",
   "Run the preflight upload first (preflight=true) and confirm how same-name customers are handled before importing": "شغّل رفع الفحص المسبق أولًا وحدد كيفية التعامل مع العملاء المكررين قبل الاستيراد.",
   "Preflight is rate-limited — please retry later": "الفحص المسبق محدود المعدل — أعد المحاولة لاحقًا.",
   "Package exceeds the upload size limit": "حجم الحزمة يتجاوز حد الرفع.",
   "The file is not a valid company data package (zip)": "الملف ليس حزمة بيانات شركة صالحة (zip).",
   "Preflight failed — please retry later": "فشل الفحص المسبق — أعد المحاولة لاحقًا.",
   "The import link has expired — pick the file again": "انتهت صلاحية رابط الاستيراد — اختر الملف مرة أخرى.",
   "An import is already running": "هناك استيراد قيد التنفيذ بالفعل.",
   "Import is rate-limited — please retry later": "الاستيراد محدود المعدل — أعد المحاولة لاحقًا.",
   "Import job not found or expired": "مهمة الاستيراد غير موجودة أو انتهت صلاحيتها.",
   "Currency must be 3 uppercase letters (e.g. USD/EUR).": "يجب أن تكون العملة 3 أحرف كبيرة (مثل USD/EUR).",
   "An order needs at least one item line.": "يحتاج الطلب إلى سطر صنف واحد على الأقل.",
   "Fill in the product name, or add at least one item line.": "أدخل اسم المنتج، أو أضف سطر صنف واحد على الأقل.",
   "Passphrase is locked — retry in": "العبارة السرية مقفلة — أعد المحاولة بعد",
   "Incorrect passphrase": "العبارة السرية غير صحيحة.",
   "Passphrase is not configured yet": "لم تُضبط العبارة السرية بعد.",
   "Customer not found": "العميل غير موجود.",
   "Todo not found": "المهمة غير موجودة.",
   // dynamic CSV detail (localizeApiError prefix matcher)
   "No valid rows found": "لا توجد صفوف صالحة. يحتاج ملف CSV إلى عمود \"name\" (بعنوان إنجليزي أو عربي) — أو استخدم القالب من تصدير CSV.",
   "detected headers: ": "العناوين المكتشفة: ",
   "the \"name\" column exists but is empty in every row": "عمود \"name\" موجود لكنه فارغ في كل الصفوف.",
};
function langText(zh, en) {
    // zh is the lookup key only (Arabic terms are keyed by the Chinese source
    // string). Chinese is no longer a display language, so anything that is
    // not Arabic displays English.
    if (currentLang === 'ar') return AR_TERMS[zh] || en;
    return en;
}

// Backend details are English literals now (Chinese removed 2026-11-26).
// pair[0] is the AR_TERMS lookup key (the English backend message itself),
// pair[1] the English fallback. Unknown details pass through untouched.
const API_ERROR_L10N = {
    'File is not UTF-8 encoded. In Excel use "Save As → CSV UTF-8 (Comma delimited)" and import again.': [
        'File is not UTF-8 encoded. In Excel use "Save As → CSV UTF-8 (Comma delimited)" and import again.',
        'CSV file is not UTF-8 encoded. In Excel use "Save As → CSV UTF-8 (Comma delimited)" and import again.',
    ],
    'This is an Excel workbook (.xlsx), not a CSV; re-save it as CSV UTF-8 first': [
        'This is an Excel workbook (.xlsx), not a CSV; re-save it as CSV UTF-8 first',
        'This is an Excel workbook (.xlsx), not a CSV. In Excel use "Save As → CSV UTF-8 (Comma delimited)" and import again.',
    ],
    'This is a web/HTML table, not a CSV; copy the data into a CSV file first': [
        'This is a web/HTML table, not a CSV; copy the data into a CSV file first',
        'This is a web/HTML table, not a CSV. Copy the rows into a CSV file and import again.',
    ],
    'CSV is empty or has no header row': [
        'CSV is empty or has no header row',
        'The CSV is empty or has no header row. Use the template from Export CSV.',
    ],
    'Please upload a .csv file': [
        'Please upload a .csv file',
        'Please choose a .csv file.',
    ],
    'CSV file too large (limit 10MB)': [
        'CSV file too large (limit 10MB)',
        'The CSV file is too large (10 MB limit).',
    ],
    'Failed to parse the CSV format': [
        'Failed to parse the CSV format',
        'Could not parse the CSV. Check it is a comma-separated UTF-8 file.',
    ],
    // company import / export
    'Company data import/export is a paid feature — activate your license to use it.': [
        'Company data import/export is a paid feature — activate your license to use it.',
        'Company data import/export is a paid feature — activate your license to use it.',
    ],
    'Export target does not match the bound X-Company-ID': [
        'Export target does not match the bound X-Company-ID',
        'Export target does not match the bound company.',
    ],
    'Export is rate-limited — please retry later': [
        'Export is rate-limited — please retry later',
        'Export is rate-limited — please retry later.',
    ],
    'You can only import into the currently bound company — switch to the target company first.': [
        'You can only import into the currently bound company — switch to the target company first.',
        'You can only import into the currently bound company — switch to the target company first.',
    ],
    'Run the preflight upload first (preflight=true) and confirm how same-name customers are handled before importing': [
        'Run the preflight upload first (preflight=true) and confirm how same-name customers are handled before importing',
        'Run the preflight upload first and confirm how same-name customers are handled before importing.',
    ],
    'Preflight is rate-limited — please retry later': [
        'Preflight is rate-limited — please retry later',
        'Preflight is rate-limited — please retry later.',
    ],
    'Package exceeds the upload size limit': [
        'Package exceeds the upload size limit',
        'The package exceeds the upload size limit.',
    ],
    'The file is not a valid company data package (zip)': [
        'The file is not a valid company data package (zip)',
        'The file is not a valid company data package (zip).',
    ],
    'Preflight failed — please retry later': [
        'Preflight failed — please retry later',
        'Preflight failed — please retry later.',
    ],
    'The import link has expired — pick the file again': [
        'The import link has expired — pick the file again',
        'The import link has expired — pick the file again.',
    ],
    'An import is already running': [
        'An import is already running',
        'An import is already running.',
    ],
    'Import is rate-limited — please retry later': [
        'Import is rate-limited — please retry later',
        'Import is rate-limited — please retry later.',
    ],
    'Import job not found or expired': [
        'Import job not found or expired',
        'Import job not found or expired.',
    ],
    // orders
    'Currency must be 3 uppercase letters (e.g. USD/EUR).': [
        'Currency must be 3 uppercase letters (e.g. USD/EUR).',
        'Currency must be 3 uppercase letters (e.g. USD/EUR).',
    ],
    'An order needs at least one item line.': [
        'An order needs at least one item line.',
        'An order needs at least one item line.',
    ],
    'Fill in the product name, or add at least one item line.': [
        'Fill in the product name, or add at least one item line.',
        'Fill in the product name, or add at least one item line.',
    ],
    // customer profile / memo
    'Passphrase is locked — retry in': [
        'Passphrase is locked — retry in',
        'Passphrase is locked — retry in',
    ],
    'Incorrect passphrase': [
        'Incorrect passphrase',
        'Incorrect passphrase.',
    ],
    'Passphrase is not configured yet': [
        'Passphrase is not configured yet',
        'Passphrase is not configured yet.',
    ],
    'Customer not found': [
        'Customer not found',
        'Customer not found.',
    ],
    'Todo not found': [
        'Todo not found',
        'Todo not found.',
    ],
};
delete API_ERROR_L10N['No valid rows found']; // keep only real exact matches

// Dynamic CSV detail: the backend appends either the detected headers or the
// "name column empty" hint after the fixed prefix. Match on the English prefix.
const _CSV_NO_ROWS = 'No valid rows found';
const _CSV_HEADERS_HINT = 'detected headers: ';
const _CSV_NAME_EMPTY = 'the "name" column exists but is empty in every row';
function localizeApiError(msg) {
    if (typeof msg !== 'string') return msg;
    const pair = API_ERROR_L10N[msg];
    if (pair) return langText(pair[0], pair[1]);
    if (msg.indexOf(_CSV_NO_ROWS) === 0) {
        // Dynamic detail: the backend appends the detected headers or the
        // "name column empty" hint. English UI shows the backend text as-is;
        // Arabic UI rebuilds the sentence from AR_TERMS lookups.
        const base = langText(_CSV_NO_ROWS, null);
        if (!base) return msg;
        let rest = msg.slice(_CSV_NO_ROWS.length).replace(/^\.\s*/, '');
        if (rest.indexOf(_CSV_HEADERS_HINT) === 0) {
            return base + ' ' + langText(_CSV_HEADERS_HINT, 'Detected headers: ') + rest.slice(_CSV_HEADERS_HINT.length);
        }
        if (rest.indexOf(_CSV_NAME_EMPTY) === 0) {
            return base + ' ' + langText(_CSV_NAME_EMPTY, 'The "name" column exists but is empty in every row.');
        }
        return rest ? base + ' ' + rest : base;
    }
    if (msg.indexOf('Passphrase is locked — retry in') === 0) {
        const m = msg.match(/retry in (\d+) seconds/);
        return langText(
            'Passphrase is locked — retry in',
            (m ? 'Passphrase is locked — retry in ' + m[1] + ' seconds' : msg)
        );
    }
    return msg;
}

// 内置文档库名称是后端标识（供 read_file / API 使用），界面只翻译显示文本。
var _LIB_LABEL_EN = {
    '海关数据': 'Customs data',
    '营销素材': 'Marketing assets',
    '认证资质': 'Certifications',
    '物流单据': 'Shipping documents',
    '发票': 'Invoices',
    '产品规格': 'Product specs',
    '客户资料': 'Customer profiles',
    '合同': 'Contracts',
    '报价单': 'Quotations',
};
function _libLabel(name) {
    if (currentLang === 'en') return _LIB_LABEL_EN[name] || name;
    if (currentLang === 'ar') return AR_TERMS[name] || name;
    return name;
}

var HTML_TERMS = {
 "three.js 背景特效开关": {
  "en": "three.js background effects toggle",
  "ar": "مفتاح تأثيرات الخلفية three.js"
 },
 "选择公司": {
  "en": "Select company",
  "ar": "اختر الشركة"
 },
 "添加公司": {
  "en": "Add company",
  "ar": "أضف شركة"
 },
 "[&quot;chat&quot;,&quot;daily&quot;,&quot;今日简报&quot;]": {
  "en": "[&quot;chat&quot;,&quot;daily&quot;,&quot;Daily Brief&quot;]",
  "ar": "[&quot;chat&quot;,&quot;daily&quot;,&quot;التقرير اليومي&quot;]"
 },
 "[&quot;chat&quot;,&quot;lead&quot;,&quot;客户开发&quot;]": {
  "en": "[&quot;chat&quot;,&quot;lead&quot;,&quot;Lead Development&quot;]",
  "ar": "[&quot;chat&quot;,&quot;lead&quot;,&quot;تطوير العملاء&quot;]"
 },
 "[&quot;chat&quot;,&quot;platform&quot;,&quot;平台诊断&quot;]": {
  "en": "[&quot;chat&quot;,&quot;platform&quot;,&quot;Platform Diagnosis&quot;]",
  "ar": "[&quot;chat&quot;,&quot;platform&quot;,&quot;تشخيص المنصة&quot;]"
 },
 "[&quot;chat&quot;,&quot;social&quot;,&quot;社媒营销&quot;]": {
  "en": "[&quot;chat&quot;,&quot;social&quot;,&quot;Social Media Marketing&quot;]",
  "ar": "[&quot;chat&quot;,&quot;social&quot;,&quot;التسويق عبر وسائل التواصل&quot;]"
 },
 "[&quot;chat&quot;,&quot;linkedin&quot;,&quot;LinkedIn 营销&quot;]": {
  "en": "[&quot;chat&quot;,&quot;linkedin&quot;,&quot;LinkedIn Marketing&quot;]",
  "ar": "[&quot;chat&quot;,&quot;linkedin&quot;,&quot;تسويق LinkedIn&quot;]"
 },
 "[&quot;chat&quot;,&quot;customs&quot;,&quot;海关数据&quot;]": {
  "en": "[&quot;chat&quot;,&quot;customs&quot;,&quot;Customs Data&quot;]",
  "ar": "[&quot;chat&quot;,&quot;customs&quot;,&quot;بيانات الجمارك&quot;]"
 },
 "[&quot;chat&quot;,&quot;docs&quot;,&quot;文档库&quot;]": {
  "en": "[&quot;chat&quot;,&quot;docs&quot;,&quot;Document Library&quot;]",
  "ar": "[&quot;chat&quot;,&quot;docs&quot;,&quot;مكتبة المستندات&quot;]"
 },
 "[&quot;chat&quot;,&quot;docgen&quot;,&quot;文档生成&quot;]": {
  "en": "[&quot;chat&quot;,&quot;docgen&quot;,&quot;Document Generation&quot;]",
  "ar": "[&quot;chat&quot;,&quot;docgen&quot;,&quot;توليد المستندات&quot;]"
 },
 "[&quot;chat&quot;,&quot;osint&quot;,&quot;客户背调&quot;]": {
  "en": "[&quot;chat&quot;,&quot;osint&quot;,&quot;Customer Background Check&quot;]",
  "ar": "[&quot;chat&quot;,&quot;osint&quot;,&quot;التحري عن خلفية العميل&quot;]"
 },
 "更新系统": {
  "en": "Update system",
  "ar": "تحديث النظام"
 },
 "重启": {
  "en": "Restart",
  "ar": "إعادة تشغيل"
 },
 "技能帮助": {
  "en": "Skill help",
  "ar": "مساعدة المهارات"
 },
 "更新技能": {
  "en": "Update skills",
  "ar": "تحديث المهارات"
 },
 "升级说明": {
  "en": "Upgrade guide",
  "ar": "دليل الترقية"
 },
 "新手引导": {
  "en": "Getting started",
  "ar": "دليل البداية"
 },
 "聊天副驾": {
  "en": "Chat copilot",
  "ar": "مساعد الدردشة"
 },
 "今日简报与待办": {
  "en": "Daily Brief & To-Do",
  "ar": "التقرير اليومي والمهام"
 },
 "例如：Acme Bank": {
  "en": "e.g., Acme Bank",
  "ar": "مثال: Acme Bank"
 },
 "例如：我的外贸公司": {
  "en": "e.g., My Trading Company",
  "ar": "مثال: شركتي للتجارة"
 },
 "自动生成": {
  "en": "Auto-generate",
  "ar": "توليد تلقائي"
 },
 "由系统根据公司名称自动生成": {
  "en": "Auto-generated by the system from the company name",
  "ar": "يولّده النظام تلقائياً من اسم الشركة"
 },
 "姓名": {
  "en": "Name",
  "ar": "الاسم"
 },
 "粘贴 agent-identity.md 内容...": {
  "en": "Paste agent-identity.md content...",
  "ar": "الصق محتوى agent-identity.md..."
 },
 "客户公司名称": {
  "en": "Customer company name",
  "ar": "اسم شركة العميل"
 },
 "联系人姓名": {
  "en": "Contact name",
  "ar": "اسم جهة الاتصال"
 },
 "决策人": {
  "en": "Decision maker",
  "ar": "صانع القرار"
 },
 "财务": {
  "en": "Finance",
  "ar": "المالية"
 },
 "仓储": {
  "en": "Warehouse",
  "ar": "المستودعات"
 },
 "其他": {
  "en": "Other",
  "ar": "أخرى"
 },
 "如：主要对接人": {
  "en": "e.g., primary contact",
  "ar": "مثال: جهة الاتصال الرئيسية"
 },
 "如 Italy": {
  "en": "e.g., Italy",
  "ar": "مثال: إيطاليا"
 },
 "如 Hamburg": {
  "en": "e.g., Hamburg",
  "ar": "مثال: هامبورغ"
 },
 "品牌商": {
  "en": "Brand owner",
  "ar": "العلامة التجارية"
 },
 "分销商": {
  "en": "Distributor",
  "ar": "الموزّع"
 },
 "代理商": {
  "en": "Agent",
  "ar": "الوكيل"
 },
 "安装商": {
  "en": "Installer",
  "ar": "المُثبِّت"
 },
 "维保商": {
  "en": "Maintenance provider",
  "ar": "مزوّد الصيانة"
 },
 "同行": {
  "en": "Competitor",
  "ar": "المنافس"
 },
 "客户主营产品或行业": {
  "en": "Customer's main products or industry",
  "ar": "منتجات العميل الرئيسية أو قطاعه"
 },
 "该联系人负责的项目、需求、注意事项等": {
  "en": "Projects, needs, notes, etc. handled by this contact",
  "ar": "المشاريع والاحتياجات والملاحظات التي يتولاها هذا الشخص"
 },
 "AI 基于客户画像自动生成的跟进策略...": {
  "en": "AI-generated follow-up strategy based on the customer profile...",
  "ar": "استراتيجية متابعة يولّدها AI بناءً على ملف العميل..."
 },
 "例如：产品报价库": {
  "en": "e.g., Product Quote Library",
  "ar": "مثال: مكتبة عروض الأسعار"
 },
 "/Users/xxx/Documents/客户资料": {
  "en": "/Users/xxx/Documents/customer-data",
  "ar": "/Users/xxx/Documents/بيانات-العملاء"
 },
 "可选": {
  "en": "Optional",
  "ar": "اختياري"
 },
 "后台任务": {
  "en": "Background tasks",
  "ar": "المهام في الخلفية"
 },
 "中文": {
  "en": "Chinese",
  "ar": "الصينية"
 },
 "B2B 外贸助手 · TRADE": {
  "en": "B2B Trade Assistant · TRADE",
  "ar": "مساعد التجارة B2B · TRADE"
 },
 "特效": {
  "en": "Effects",
  "ar": "التأثيرات"
 },
 "COMPANY / 当前公司": {
  "en": "COMPANY / Current Company",
  "ar": "COMPANY / الشركة الحالية"
 },
 "— 选择公司 —": {
  "en": "— Select company —",
  "ar": "— اختر الشركة —"
 },
 "工作台 · DESK": {
  "en": "Workspace · DESK",
  "ar": "مساحة العمل · DESK"
 },
 "今日简报": {
  "en": "Daily Brief",
  "ar": "التقرير اليومي"
 },
 "获客引流 · LEADS": {
  "en": "Lead Generation · LEADS",
  "ar": "توليد العملاء المحتملين · LEADS"
 },
 "客户开发": {
  "en": "Lead Development",
  "ar": "تطوير العملاء"
 },
 "网站诊断": {
  "en": "Website Diagnosis",
  "ar": "تشخيص الموقع"
 },
 "社媒营销": {
  "en": "Social Media Marketing",
  "ar": "التسويق عبر وسائل التواصل"
 },
 "海关数据": {
  "en": "Customs Data",
  "ar": "بيانات الجمارك"
 },
 "销售转化 · CONVERT": {
  "en": "Sales Conversion · CONVERT",
  "ar": "تحويل المبيعات · CONVERT"
 },
 "客户管理": {
  "en": "Customer Management",
  "ar": "إدارة العملاء"
 },
 "邮箱": {
  "en": "Email",
  "ar": "البريد الإلكتروني"
 },
 "文档库": {
  "en": "Document Library",
  "ar": "مكتبة المستندات"
 },
 "文档生成": {
  "en": "Document Generation",
  "ar": "توليد المستندات"
 },
 "工具 · TOOLS": {
  "en": "Tools · TOOLS",
  "ar": "الأدوات · TOOLS"
 },
 "客户背调": {
  "en": "Customer Background Check",
  "ar": "التحري عن خلفية العميل"
 },
 "定时任务": {
  "en": "Scheduled Tasks",
  "ar": "المهام المجدولة"
 },
 "历史 · LOG": {
  "en": "History · LOG",
  "ar": "السجل · LOG"
 },
 "对话记录": {
  "en": "Conversation History",
  "ar": "سجل المحادثات"
 },
 "🪟 聊天副驾": {
  "en": "🪟 Chat copilot",
  "ar": "🪟 مساعد الدردشة"
 },
 "截图或剪贴板文本发给你配置的视觉模型做识别；识别出的文字与产品库摘录会发给你配置的对话模型生成草稿；不会自动转给未配置的其他服务商。": {
  "en": "Screenshots or clipboard text are sent to your configured vision model for recognition; the recognized text and product-library excerpts are sent to your configured chat model to generate a draft; nothing is forwarded automatically to unconfigured providers.",
  "ar": "تُرسل لقطات الشاشة أو نصوص الحافظة إلى نموذج الرؤية الذي هيّأته للتعرف عليها؛ ثم تُرسل النصوص المُعرَّفة ومقتطفات مكتبة المنتجات إلى نموذج الدردشة المُهيَّأ لتوليد المسودة؛ ولا تُحوَّل تلقائياً إلى مزودين غير مُهيَّأين."
 },
 "密码管理器、网银/支付类应用在拒读名单内；剪贴板通道默认关闭。": {
  "en": "Password managers and online-banking/payment apps are on the deny-list; the clipboard channel is off by default.",
  "ar": "تطبيقات إدارة كلمات المرور والخدمات المصرفية/الدفع عبر الإنترنت مدرجة في قائمة الحظر؛ وقناة الحافظة معطّلة افتراضياً."
 },
 "我已阅读并同意上面的说明（隐私说明版本": {
  "en": "I have read and agree to the notice above (Privacy notice version",
  "ar": "لقد قرأتُ الإشعار أعلاه وأوافق عليه (نسخة إشعار الخصوصية"
 },
 "开启聊天副驾（默认关闭）": {
  "en": "Enable chat copilot (off by default)",
  "ar": "تفعيل مساعد الدردشة (معطّل افتراضياً)"
 },
 "允许读取剪贴板（默认关闭）": {
  "en": "Allow clipboard access (off by default)",
  "ar": "السماح بقراءة الحافظة (معطّل افتراضياً)"
 },
 "剪贴板单次上限（字符，默认 3000）": {
  "en": "Clipboard per-read limit (characters, default 3000)",
  "ar": "الحد الأقصى للقراءة من الحافظة (أحرف، الافتراضي 3000)"
 },
 "额外拒读应用（每行一个，可留空）": {
  "en": "Additional denied apps (one per line, may be left blank)",
  "ar": "تطبيقات محظورة إضافية (واحد في كل سطر، يمكن تركه فارغاً)"
 },
 "全局热键": {
  "en": "Global hotkey",
  "ar": "مفتاح الاختصار العام"
 },
 "取消": {
  "en": "Cancel",
  "ar": "إلغاء"
 },
 "保存": {
  "en": "Save",
  "ar": "حفظ"
 },
 "🏢 公司设置": {
  "en": "🏢 Company Settings",
  "ar": "🏢 إعدادات الشركة"
 },
 "公司列表": {
  "en": "Company List",
  "ar": "قائمة الشركات"
 },
 "Agent 身份": {
  "en": "Agent Identity",
  "ar": "هوية Agent"
 },
 "导入公司数据": {
  "en": "Import company data",
  "ar": "استيراد بيانات الشركة"
 },
 "添加新公司": {
  "en": "Add new company",
  "ar": "إضافة شركة جديدة"
 },
 "公司名称 *": {
  "en": "Company name *",
  "ar": "اسم الشركة *"
 },
 "联系人": {
  "en": "Contact",
  "ar": "جهة الاتصال"
 },
 "网站": {
  "en": "Website",
  "ar": "الموقع الإلكتروني"
 },
 "关闭": {
  "en": "Close",
  "ar": "إغلاق"
 },
 "创建公司": {
  "en": "Create company",
  "ar": "إنشاء شركة"
 },
 "请先选择或创建公司": {
  "en": "Select or create a company",
  "ar": "اختر شركة أو أنشئ واحدة"
 },
 "Trade AI 为多公司隔离架构": {
  "en": "Trade AI keeps each company's data separate",
  "ar": "يعزل Trade AI بيانات كل شركة على حدة"
 },
 "导入已有公司数据": {
  "en": "Import existing company data",
  "ar": "استيراد بيانات شركة موجودة"
 },
 "创建公司 / 选择公司": {
  "en": "Create / select a company",
  "ar": "إنشاء / اختيار شركة"
 },
 "配置当前选中公司的 AI Agent 身份。系统会在对话时注入此内容。": {
  "en": "Configure the AI Agent identity of the currently selected company. The system injects this content during conversations.",
  "ar": "اضبط هوية AI Agent للشركة المحددة حالياً. يحقن النظام هذا المحتوى أثناء المحادثات."
 },
 "Agent 身份 (Markdown)": {
  "en": "Agent Identity (Markdown)",
  "ar": "هوية Agent (Markdown)"
 },
 "添加客户": {
  "en": "Add customer",
  "ar": "إضافة عميل"
 },
 "职位": {
  "en": "Job title",
  "ar": "المسمى الوظيفي"
 },
 "职能": {
  "en": "Function",
  "ar": "الوظيفة"
 },
 "职责": {
  "en": "Responsibilities",
  "ar": "المهام"
 },
 "国家": {
  "en": "Country",
  "ar": "البلد"
 },
 "城市": {
  "en": "City",
  "ar": "المدينة"
 },
 "电话": {
  "en": "Phone",
  "ar": "الهاتف"
 },
 "公司网站": {
  "en": "Company website",
  "ar": "موقع الشركة"
 },
 "客户等级": {
  "en": "Customer tier",
  "ar": "مستوى العميل"
 },
 "未分级": {
  "en": "Unrated",
  "ar": "غير مصنّف"
 },
 "A 级": {
  "en": "A Tier",
  "ar": "المستوى A"
 },
 "B 级": {
  "en": "B Tier",
  "ar": "المستوى B"
 },
 "C 级": {
  "en": "C Tier",
  "ar": "المستوى C"
 },
 "买家类型": {
  "en": "Buyer type",
  "ar": "نوع المشتري"
 },
 "未设置": {
  "en": "Not set",
  "ar": "غير محدد"
 },
 "主营品类": {
  "en": "Main product categories",
  "ar": "الفئات الرئيسية"
 },
 "备用邮箱": {
  "en": "Alternate email",
  "ar": "بريد إلكتروني بديل"
 },
 "匹配度": {
  "en": "Match score",
  "ar": "درجة التطابق"
 },
 "未评分": {
  "en": "Unscored",
  "ar": "غير مُقيَّم"
 },
 "1 - 低": {
  "en": "1 - Low",
  "ar": "1 - منخفض"
 },
 "3 - 中": {
  "en": "3 - Medium",
  "ar": "3 - متوسط"
 },
 "5 - 高": {
  "en": "5 - High",
  "ar": "5 - مرتفع"
 },
 "备注 / 跟进项目": {
  "en": "Notes / Follow-up projects",
  "ar": "ملاحظات / مشاريع المتابعة"
 },
 "AI 跟进建议": {
  "en": "AI follow-up suggestions",
  "ar": "اقتراحات المتابعة من AI"
 },
 "📁 添加文档库": {
  "en": "📁 Add document library",
  "ar": "📁 إضافة مكتبة مستندات"
 },
 "将本地文件夹关联为文档库，Agent 可通过 read_file 读取其中的文件。": {
  "en": "Link a local folder as a document library so the Agent can read its files via read_file.",
  "ar": "اربط مجلداً محلياً كمكتبة مستندات ليتمكن Agent من قراءة ملفاته عبر read_file."
 },
 "库名称 *": {
  "en": "Library name *",
  "ar": "اسم المكتبة *"
 },
 "文件夹路径 *": {
  "en": "Folder path *",
  "ar": "مسار المجلد *"
 },
 "📌 Mac: 文件夹上右键 → Option键 → 复制路径名": {
  "en": "📌 Mac: Right-click the folder → Option key → Copy Path Name",
  "ar": "📌 Mac: انقر بالزر الأيمن على المجلد → مفتاح Option → نسخ اسم المسار"
 },
 "描述": {
  "en": "Description",
  "ar": "الوصف"
 },
 "添加": {
  "en": "Add",
  "ar": "إضافة"
 },
 "⬆️ 如何升级 Trade": {
  "en": "⬆️ How to upgrade Trade",
  "ar": "⬆️ كيفية ترقية Trade"
 },
 "通过": {
  "en": "Via",
  "ar": "عبر"
 },
 "（AI 助手）来升级 Trade 是最简单的方式。Hermes 会自动执行所有更新命令，遇到报错会自行排查重试。": {
  "en": "(AI assistant) is the easiest way to upgrade Trade. Hermes runs all update commands automatically and troubleshoots and retries on errors.",
  "ar": "(مساعد AI) هو أسهل طريقة لترقية Trade. ينفّذ Hermes جميع أوامر التحديث تلقائياً ويتحقق من الأخطاء ويعيد المحاولة."
 },
 "操作步骤": {
  "en": "Steps",
  "ar": "الخطوات"
 },
 "打开终端：": {
  "en": "Open Terminal:",
  "ar": "افتح Terminal:"
 },
 "— 在 Launchpad 搜索「终端」": {
  "en": "— Search for \"Terminal\" in Launchpad",
  "ar": "— ابحث عن \"Terminal\" في Launchpad"
 },
 "— 按": {
  "en": "— Press",
  "ar": "— اضغط"
 },
 "，输入": {
  "en": ", then type",
  "ar": "، ثم اكتب"
 },
 "，回车": {
  "en": ", then press Enter",
  "ar": "، ثم اضغط Enter"
 },
 "输入": {
  "en": "Type",
  "ar": "اكتب"
 },
 "并回车，启动 Hermes": {
  "en": "and press Enter to launch Hermes",
  "ar": "وضغط Enter لتشغيل Hermes"
 },
 "在 Hermes 对话框中输入以下内容并回车：": {
  "en": "Type the following in the Hermes chat box and press Enter:",
  "ar": "اكتب ما يلي في مربع دردشة Hermes واضغط Enter:"
 },
 "帮我更新trade，并重启trade，地址是https://github.com/chefroger/smart-trade-ai": {
  "en": "Help me update trade and restart trade, the URL is https://github.com/chefroger/smart-trade-ai",
  "ar": "ساعدني في تحديث trade وإعادة تشغيله، العنوان هو https://github.com/chefroger/smart-trade-ai"
 },
 "等待执行完毕，看到「重启完成」提示后，刷新浏览器页面（": {
  "en": "Wait until it finishes, then refresh the browser page when you see the \"Restart complete\" message (",
  "ar": "انتظر حتى اكتمال التنفيذ، ثم حدّث صفحة المتصفح عند ظهور رسالة \"اكتملت إعادة التشغيل\" ("
 },
 "）即可。": {
  "en": ").",
  "ar": ")."
 },
 "如果": {
  "en": "If",
  "ar": "إذا"
 },
 "命令找不到，说明 Hermes Agent 未安装。请先参考": {
  "en": "the command is not found, Hermes Agent is not installed. Please refer to",
  "ar": "لم يُعثر على الأمر، فهذا يعني أن Hermes Agent غير مُثبَّت. يُرجى الرجوع إلى"
 },
 "安装说明": {
  "en": "installation instructions",
  "ar": "تعليمات التثبيت"
 },
 "安装 Hermes。": {
  "en": "to install Hermes.",
  "ar": "لتثبيت Hermes."
 },
 "📖 全部 47 个技能速查": {
  "en": "📖 Quick reference for all 47 skills",
  "ar": "📖 مرجع سريع لجميع المهارات الـ47"
 },
 "在聊天框输入关键词，Trade 自动匹配合适的技能。点击复制图标可复制快速启动提示词。": {
  "en": "Type a keyword in the chat box and Trade matches the right skill automatically. Click the copy icon to copy the quick-start prompt.",
  "ar": "اكتب كلمة مفتاحية في مربع الدردشة، وسيطابق Trade المهارة المناسبة تلقائياً. انقر على أيقونة النسخ لنسخ موجه البدء السريع."
 },
 "正在升级 Hermes": {
  "en": "Upgrading Hermes",
  "ar": "جارٍ ترقية Hermes"
 },
 "升级详情": {
  "en": "Upgrade details",
  "ar": "تفاصيل الترقية"
 },
 "收起": {
  "en": "Collapse",
  "ar": "طيّ"
 }
};
// 动态 JS 里硬编码的短文案：zh 原文 -> {en, ar}。由合并脚本填充。
var JS_TERMS = {
 "中": {
  "en": "Medium",
  "ar": "متوسط"
 },
 " 个": {
  "en": " items",
  "ar": " عناصر"
 },
 "丈夫": {
  "en": "Husband",
  "ar": "الزوج"
 },
 "侄女": {
  "en": "Niece",
  "ar": "ابنة الأخ"
 },
 "兄弟": {
  "en": "Brothers",
  "ar": "الإخوة"
 },
 "分级": {
  "en": "Tiering",
  "ar": "التصنيف"
 },
 "可用": {
  "en": "Available",
  "ar": "متاح"
 },
 "国家": {
  "en": "Country",
  "ar": "البلد"
 },
 "失败": {
  "en": "Failed",
  "ar": "فشل"
 },
 "妻子": {
  "en": "Wife",
  "ar": "الزوجة"
 },
 "孙女": {
  "en": "Granddaughter",
  "ar": "حفيدة"
 },
 "家人": {
  "en": "Family",
  "ar": "العائلة"
 },
 "岳父": {
  "en": "Father-in-law",
  "ar": "والد الزوجة"
 },
 "报价": {
  "en": "Quote",
  "ar": "عرض السعر"
 },
 "来源": {
  "en": "Source",
  "ar": "المصدر"
 },
 "爷爷": {
  "en": "Grandfather",
  "ar": "الجد"
 },
 "自动": {
  "en": "Auto",
  "ar": "تلقائي"
 },
 "跳过": {
  "en": "Skip",
  "ar": "تخطي"
 },
 "验厂": {
  "en": "Factory Audit",
  "ar": "تدقيق المصنع"
 },
 "中风险": {
  "en": "Medium Risk",
  "ar": "مخاطرة متوسطة"
 },
 "分销商": {
  "en": "Distributor",
  "ar": "الموزّع"
 },
 "多币种": {
  "en": "Multi-currency",
  "ar": "عملات متعددة"
 },
 "已保存": {
  "en": "Saved",
  "ar": "تم الحفظ"
 },
 "已删除": {
  "en": "Deleted",
  "ar": "تم الحذف"
 },
 "待跟进": {
  "en": "Pending Follow-up",
  "ar": "قيد المتابعة"
 },
 "排队中": {
  "en": "Queued",
  "ar": "في قائمة الانتظار"
 },
 "未婚夫": {
  "en": "Fiancé",
  "ar": "الخطيب"
 },
 "检索中": {
  "en": "Searching",
  "ar": "جارٍ البحث"
 },
 "订单数": {
  "en": "Orders",
  "ar": "عدد الطلبات"
 },
 "邮件 ": {
  "en": "Email ",
  "ar": "بريد إلكتروني "
 },
 " 仅本机": {
  "en": " Local only",
  "ar": " محلي فقط"
 },
 "主联系人": {
  "en": "Primary Contact",
  "ar": "جهة الاتصال الرئيسية"
 },
 "保存失败": {
  "en": "Save Failed",
  "ar": "فشل الحفظ"
 },
 "关联客户": {
  "en": "Linked Customer",
  "ar": "العميل المرتبط"
 },
 "删除失败": {
  "en": "Delete Failed",
  "ar": "فشل الحذف"
 },
 "同名候选": {
  "en": "Same-name Candidates",
  "ar": "مرشحون بنفس الاسم"
 },
 "客户 +": {
  "en": "Customer +",
  "ar": "عميل +"
 },
 "客户索要": {
  "en": "Customer Request",
  "ar": "طلب العميل"
 },
 "对话记录": {
  "en": "Conversation History",
  "ar": "سجل المحادثات"
 },
 "已逾期 ": {
  "en": "Overdue ",
  "ar": "متأخر "
 },
 "拉取中…": {
  "en": "Fetching…",
  "ar": "جارٍ السحب…"
 },
 "早安简报": {
  "en": "Morning Brief",
  "ar": "النشرة الصباحية"
 },
 "未知错误": {
  "en": "Unknown Error",
  "ar": "خطأ غير معروف"
 },
 "添加客户": {
  "en": "Add Customer",
  "ar": "إضافة عميل"
 },
 "编辑档案": {
  "en": "Edit Profile",
  "ar": "تعديل الملف الشخصي"
 },
 "访前清单": {
  "en": "Pre-visit Checklist",
  "ar": "قائمة ما قبل الزيارة"
 },
 "采集中 ": {
  "en": "Collecting ",
  "ar": "جارٍ الجمع "
 },
 "验厂计划": {
  "en": "Factory Audit Plan",
  "ar": "خطة تدقيق المصنع"
 },
 "💾 保存": {
  "en": "💾 Save",
  "ar": "💾 حفظ"
 },
 " 单报价中": {
  "en": " orders being quoted",
  "ar": " طلبات قيد التسعير"
 },
 "○ 已暂停": {
  "en": "○ Paused",
  "ar": "○ متوقف مؤقتًا"
 },
 "互动时间线": {
  "en": "Interaction Timeline",
  "ar": "الخط الزمني للتفاعل"
 },
 "副驾已关闭": {
  "en": "Copilot Off",
  "ar": "المساعد الذكي متوقف"
 },
 "客户分级 ": {
  "en": "Customer Tiering ",
  "ar": "تصنيف العملاء "
 },
 "导入完成：": {
  "en": "Import complete:",
  "ar": "اكتمل الاستيراد:"
 },
 "按名称排序": {
  "en": "Sort by Name",
  "ar": "ترتيب حسب الاسم"
 },
 "正在调用：": {
  "en": "Invoking:",
  "ar": "جارٍ الاستدعاء:"
 },
 "（无主题）": {
  "en": "(No Subject)",
  "ar": "(بدون موضوع)"
 },
 "🖥️ 终端": {
  "en": "🖥️ Terminal",
  "ar": "🖥️ الطرفية"
 },
 "126 邮箱": {
  "en": "126 Mail",
  "ar": "بريد 126"
 },
 "复制到剪贴板": {
  "en": "Copy to Clipboard",
  "ar": "نسخ إلى الحافظة"
 },
 "已完整读取 ": {
  "en": "Fully read ",
  "ar": "تمت القراءة بالكامل "
 },
 "来自缓存提取": {
  "en": "Extracted from cache",
  "ar": "مُستخرج من الذاكرة المؤقتة"
 },
 "立即执行任务": {
  "en": "Run Task Now",
  "ar": "تنفيذ المهمة الآن"
 },
 "🌅 早安简报": {
  "en": "🌅 Morning Brief",
  "ar": "🌅 النشرة الصباحية"
 },
 " · 待确认 ": {
  "en": " · Pending confirmation ",
  "ar": " · بانتظار التأكيد "
 },
 "两次输入不一致": {
  "en": "The two inputs don't match",
  "ar": "المدخلان غير متطابقين"
 },
 "完整读取未通过": {
  "en": "Full Read Failed",
  "ar": "فشلت القراءة الكاملة"
 },
 "请填写公司名称": {
  "en": "Please enter the company name",
  "ar": "يرجى إدخال اسم الشركة"
 },
 "零售商/连锁店": {
  "en": "Retailer/Chain Store",
  "ar": "تاجر تجزئة/سلسلة متاجر"
 },
 "✓ 已完整读取 ": {
  "en": "✓ Fully read ",
  "ar": "✓ تمت القراءة بالكامل "
 },
 "加载客户详情失败": {
  "en": "Failed to Load Customer Details",
  "ar": "فشل تحميل تفاصيل العميل"
 },
 "正在重建运行环境": {
  "en": "Rebuilding runtime environment",
  "ar": "جارٍ إعادة بناء بيئة التشغيل"
 },
 "[重启] 超时 (": {
  "en": "[Restart] Timeout (",
  "ar": "[إعادة تشغيل] انتهت المهلة ("
 },
 "当前选中的库/客户": {
  "en": "Currently selected library/customer",
  "ar": "المكتبة/العميل المحدد حاليًا"
 },
 "Hermes 升级中": {
  "en": "Hermes Upgrading",
  "ar": "جارٍ ترقية Hermes"
 },
 "在新标签页打开图片（": {
  "en": "Open image in new tab (",
  "ar": "فتح الصورة في علامة تبويب جديدة ("
 },
 "🏪 B2B 平台检查": {
  "en": "🏪 B2B Platform Check",
  "ar": "🏪 فحص منصة B2B"
 },
 "已取消：未选择目标公司": {
  "en": "Cancelled: No target company selected",
  "ar": "تم الإلغاء: لم يتم تحديد شركة مستهدفة"
 },
 "TRADE · 验厂资料": {
  "en": "TRADE · Factory Audit Documents",
  "ar": "TRADE · مستندات تدقيق المصنع"
 },
 "采集完成，正在生成回复…": {
  "en": "Collection complete, generating response…",
  "ar": "اكتمل الجمع، جارٍ إنشاء الرد…"
 },
 "回复社媒评论，发送感谢私信": {
  "en": "Reply to social media comments, send thank-you DMs",
  "ar": "الرد على تعليقات وسائل التواصل وإرسال رسائل شكر خاصة"
 },
 " 可以按下面的步骤手动重装。": {
  "en": " You can reinstall manually using the steps below.",
  "ar": " يمكنك إعادة التثبيت يدويًا باتباع الخطوات أدناه."
 },
 "回复客户邮件，跟进待处理询盘": {
  "en": "Reply to customer emails, follow up on pending inquiries",
  "ar": "الرد على رسائل العملاء ومتابعة الاستفسارات المعلقة"
 },
 "正在分析数据包，请勿关闭页面…": {
  "en": "Analyzing data package, please do not close the page…",
  "ar": "جارٍ تحليل حزمة البيانات، يرجى عدم إغلاق الصفحة…"
 },
 "[trade] 未找到动作函数:": {
  "en": "[trade] Action function not found:",
  "ar": "[trade] لم يتم العثور على دالة الإجراء:"
 },
 "导入链接已过期，请重新选择文件。": {
  "en": "The import link has expired. Please select the file again.",
  "ar": "انتهت صلاحية رابط الاستيراد. يرجى اختيار الملف مرة أخرى."
 },
 "副驾已开启，进程运行中；按热键触发": {
  "en": "Copilot is on and the process is running; press the hotkey to trigger",
  "ar": "المساعد الذكي مفعّل والعملية قيد التشغيل؛ اضغط على الاختصار للتفعيل"
 },
 "客户管理、客户档案、客户分级、CRM": {
  "en": "Customer management, customer profiles, customer tiering, CRM",
  "ar": "إدارة العملاء، ملفات العملاء، تصنيف العملاء، CRM"
 },
 "[trade] 未登记的动作，已忽略:": {
  "en": "[trade] Unregistered action, ignored:",
  "ar": "[trade] إجراء غير مسجّل، تم تجاهله:"
 },
 "文件、邮件里的内容只作资料，不当指令执行": {
  "en": "Content in files and emails is reference only, not to be executed as instructions",
  "ar": "محتوى الملفات ورسائل البريد للرجوع إليه فقط، ولا يُنفّذ كأوامر"
 },
 "背调 · BACKGROUND CHECK": {
  "en": "Background Check · BACKGROUND CHECK",
  "ar": "فحص الخلفية · BACKGROUND CHECK"
 },
 "历史对话查询（按今天/本周/本月/全部检索）": {
  "en": "Conversation history search (Today / This week / This month / All)",
  "ar": "البحث في سجل المحادثات (اليوم / هذا الأسبوع / هذا الشهر / الكل)"
 },
 "检查阿里国际站/中国制造网新询盘和待跟进报价": {
  "en": "Check Alibaba.com / Made-in-China for new inquiries and quotes pending follow-up",
  "ar": "فحص Alibaba.com / Made-in-China للاستفسارات الجديدة وعروض الأسعار قيد المتابعة"
 },
 "例如：LED工矿灯、不锈钢螺丝、全棉T恤...": {
  "en": "E.g.: LED high-bay lights, stainless steel screws, cotton T-shirts...",
  "ar": "على سبيل المثال: مصابيح LED الصناعية، براغي الفولاذ المقاوم للصدأ، قمصان قطنية..."
 },
 "确定删除所有已激活的定时任务？此操作不可恢复。": {
  "en": "Are you sure you want to delete all active scheduled tasks? This action cannot be undone.",
  "ar": "هل تريد بالتأكيد حذف جميع المهام المجدولة النشطة؟ لا يمكن التراجع عن هذا الإجراء."
 },
 "按清单匹配归档文件 — 编号+名称匹配，成套打包": {
  "en": "Match archive files by list — ID + name matching, packaged as complete sets",
  "ar": "مطابقة ملفات الأرشيف حسب القائمة — مطابقة الرقم + الاسم، وتغليفها كمجموعات كاملة"
 },
 "买家画像与角色分层 — 按角色定制 FAB 价值主张": {
  "en": "Buyer personas and role segmentation — tailor FAB value propositions by role",
  "ar": "شخصيات المشترين وتقسيم الأدوار — تخصيص مقترحات القيمة FAB حسب الدور"
 },
 "更新客户表/CRM，复盘当日完成情况，规划次日优先级": {
  "en": "Update customer sheet/CRM, review daily completion, and plan next day's priorities",
  "ar": "تحديث جدول العملاء/CRM، ومراجعة ما أُنجز اليوم، وتخطيط أولويات الغد"
 },
 "海关数据、进出口记录、找买家、customs data": {
  "en": "Customs data, import/export records, find buyers, customs data",
  "ar": "بيانات الجمارك، سجلات الاستيراد/التصدير، العثور على مشترين، customs data"
 },
 "升级进行中，请勿关闭 Trade。这一步可能需要几分钟。": {
  "en": "Upgrade in progress, please do not close Trade. This step may take a few minutes.",
  "ar": "الترقية جارية، يرجى عدم إغلاق Trade. قد تستغرق هذه الخطوة بضع دقائق."
 },
 "决策分析、思考帽、利弊分析、decision making": {
  "en": "Decision analysis, thinking hats, pros and cons analysis, decision making",
  "ar": "تحليل القرارات، القبعات الست للتفكير، تحليل الإيجابيات والسلبيات، decision making"
 },
 "询盘回复与 Top Sales 训练 — 双AI对抗训练法": {
  "en": "Inquiry replies and Top Sales training — dual-AI adversarial training method",
  "ar": "الرد على الاستفسارات وتدريب أفضل المبيعات — أسلوب التدريب التنافسي باستخدام AI مزدوج"
 },
 "市场分析、目标市场、作战地图、market analysis": {
  "en": "Market analysis, target market, battle map, market analysis",
  "ar": "تحليل السوق، السوق المستهدف، خريطة المعركة، market analysis"
 },
 "傻瓜式客户开发向导 — 三问启动 + 自动搜索 + 开发信生成": {
  "en": "Foolproof customer development wizard — 3-question start + automatic search + outreach email generation",
  "ar": "معامل تطوير العملاء السهل — البدء بثلاثة أسئلة + بحث تلقائي + إنشاء رسائل تواصل مع العملاء المحتملين"
 },
 "回复所有未读消息，发送跟进邮件。新消息 2 小时内回复 100%": {
  "en": "Reply to all unread messages and send follow-up emails. 100% of new messages answered within 2 hours",
  "ar": "الرد على جميع الرسائل غير المقروءة وإرسال رسائل متابعة. الرد على 100% من الرسائل الجديدة خلال ساعتين"
 },
 "LinkedIn/社媒 KOL 风格模仿 — 分析风格应用到自家品牌": {
  "en": "LinkedIn / social media KOL style imitation — analyze style and apply it to your own brand",
  "ar": "تقليد أسلوب مؤثري LinkedIn/وسائل التواصل الاجتماعي — تحليل الأسلوب وتطبيقه على علامتك التجارية"
 },
 "检查阿里国际站/Made-in-China 等平台询盘、排名、发布产品": {
  "en": "Check inquiries, rankings, and product posts on Alibaba.com / Made-in-China and other platforms",
  "ar": "فحص الاستفسارات والترتيب ومنشورات المنتجات على Alibaba.com / Made-in-China وغيرها من المنصات"
 },
 "[重启] 开始轮询 /api/status (old started_at=": {
  "en": "[Restart] Start polling /api/status (old started_at=",
  "ar": "[إعادة تشغيل] بدء الاستقصاء الدوري لـ /api/status (old started_at="
 },
 "模仿风格、学大V、KOL imitation、imitate influencer": {
  "en": "Imitate styles, learn from influencers, KOL imitation, imitate influencer",
  "ar": "تقليد الأساليب، التعلم من المؤثرين، KOL imitation، imitate influencer"
 },
 "找货源、竞品厂家、找厂家、代工厂、国内客户、同类厂家、找供应商、厂商挖掘、1688、企查查、天眼查": {
  "en": "Find sources, competitor factories, find manufacturers, OEM factories, domestic customers, similar factories, find suppliers, manufacturer mining, 1688, Qichacha, Tianyancha",
  "ar": "إيجاد المصادر، مصانع المنافسين، إيجاد المصنعين، مصانع OEM، عملاء محليون، مصانع مماثلة، إيجاد الموردين، التنقيب عن المصنعين، 1688، Qichacha، Tianyancha"
 },
 "帮我生成本日 LinkedIn 互动计划：列出需要评论的客户类型和评论模板（3 种场景），以及新增连接后的感谢私信模板。": {
  "en": "Generate today's LinkedIn engagement plan: list the customer types to comment on, comment templates (3 scenarios), and thank-you DM templates for new connections.",
  "ar": "أنشئ خطة تفاعل LinkedIn لليوم: حدد أنواع العملاء المراد التعليق عليها، وقوالب التعليقات (3 سيناريوهات)، وقوالب رسائل الشكر الخاصة للاتصالات الجديدة."
 },
 "主": {
  "en": "Main",
  "ar": "الرئيسي"
 },
 " 天": {
  "en": " Days",
  "ar": " أيام"
 },
 "中东": {
  "en": "Middle East",
  "ar": "الشرق الأوسط"
 },
 "侄子": {
  "en": "Nephew",
  "ar": "ابن الأخ"
 },
 "全部": {
  "en": "All",
  "ar": "الكل"
 },
 "刷新": {
  "en": "Refresh",
  "ar": "تحديث"
 },
 "合同": {
  "en": "Contract",
  "ar": "عقد"
 },
 "处理": {
  "en": "Process",
  "ar": "معالجة"
 },
 "女儿": {
  "en": "Daughter",
  "ar": "ابنة"
 },
 "姐妹": {
  "en": "Sisters",
  "ar": "أخوات"
 },
 "孙子": {
  "en": "Grandson",
  "ar": "حفيد"
 },
 "家属": {
  "en": "Family members",
  "ar": "أفراد الأسرة"
 },
 "工具": {
  "en": "Tools",
  "ar": "أدوات"
 },
 "排序": {
  "en": "Sort",
  "ar": "ترتيب"
 },
 "样品": {
  "en": "Sample",
  "ar": "عينة"
 },
 "爸爸": {
  "en": "Dad",
  "ar": "أب"
 },
 "舅舅": {
  "en": "Uncle (maternal)",
  "ar": "خال"
 },
 "邮件": {
  "en": "Email",
  "ar": "بريد إلكتروني"
 },
 " 出货": {
  "en": " Shipment",
  "ar": " شحن"
 },
 "代理商": {
  "en": "Agent",
  "ar": "وكيل"
 },
 "升级中": {
  "en": "Upgrading",
  "ar": "جارٍ الترقية"
 },
 "奥さん": {
  "en": "Wife",
  "ar": "زوجة"
 },
 "已停止": {
  "en": "Stopped",
  "ar": "متوقف"
 },
 "已取消": {
  "en": "Cancelled",
  "ar": "ملغي"
 },
 "打包中": {
  "en": "Packaging",
  "ar": "جارٍ التغليف"
 },
 "文档库": {
  "en": "Document Library",
  "ar": "مكتبة المستندات"
 },
 "未婚妻": {
  "en": "Fiancée",
  "ar": "خطيبة"
 },
 "男朋友": {
  "en": "Boyfriend",
  "ar": "صديق"
 },
 "评级 ": {
  "en": "Rating ",
  "ar": "تقييم "
 },
 "重启中": {
  "en": "Restarting",
  "ar": "جارٍ إعادة التشغيل"
 },
 " 项等待": {
  "en": " items waiting",
  "ar": " عناصر قيد الانتظار"
 },
 "买家类型": {
  "en": "Buyer Type",
  "ar": "نوع المشتري"
 },
 "全部国家": {
  "en": "All Countries",
  "ar": "جميع الدول"
 },
 "内容营销": {
  "en": "Content Marketing",
  "ar": "التسويق بالمحتوى"
 },
 "升级失败": {
  "en": "Upgrade Failed",
  "ar": "فشلت الترقية"
 },
 "后台任务": {
  "en": "Background Tasks",
  "ar": "المهام في الخلفية"
 },
 "客户: ": {
  "en": "Customer: ",
  "ar": "العميل: "
 },
 "客户背调": {
  "en": "Customer Due Diligence",
  "ar": "فحص خلفية العميل"
 },
 "对话详情": {
  "en": "Conversation Details",
  "ar": "تفاصيل المحادثة"
 },
 "开始重建": {
  "en": "Start Rebuild",
  "ar": "بدء إعادة البناء"
 },
 "搜索客户": {
  "en": "Search Customers",
  "ar": "البحث عن العملاء"
 },
 "暂无客户": {
  "en": "No Customers Yet",
  "ar": "لا يوجد عملاء بعد"
 },
 "查询中…": {
  "en": "Querying…",
  "ar": "جارٍ الاستعلام…"
 },
 "添加订单": {
  "en": "Add Order",
  "ar": "إضافة طلب"
 },
 "网站诊断": {
  "en": "Website Diagnostics",
  "ar": "تشخيص الموقع"
 },
 "调度未知": {
  "en": "Scheduling Unknown",
  "ar": "جدولة غير معروفة"
 },
 "采集完成": {
  "en": "Collection Complete",
  "ar": "اكتمل الجمع"
 },
 "（目标 ": {
  "en": "（Target ",
  "ar": "（الهدف "
 },
 "📥 抓取": {
  "en": "📥 Fetch",
  "ar": "📥 جلب"
 },
 " 秒后再试": {
  "en": " seconds, then retry",
  "ar": " ثانية ثم أعد المحاولة"
 },
 "● 运行中": {
  "en": "● Running",
  "ar": "● قيد التشغيل"
 },
 "人员与分工": {
  "en": "Staff & Roles",
  "ar": "الموظفون وتوزيع المهام"
 },
 "副驾进程：": {
  "en": "Copilot Process:",
  "ar": "عملية Copilot:"
 },
 "客户已更新": {
  "en": "Customer Updated",
  "ar": "تم تحديث العميل"
 },
 "导出失败：": {
  "en": "Export failed:",
  "ar": "فشل التصدير:"
 },
 "按最近跟进": {
  "en": "By Recent Follow-up",
  "ar": "حسب آخر متابعة"
 },
 "测试连接中": {
  "en": "Testing Connection",
  "ar": "جارٍ اختبار الاتصال"
 },
 "，对话 +": {
  "en": ", chat +",
  "ar": "، محادثة +"
 },
 " · 另有 ": {
  "en": " · plus ",
  "ar": " · بالإضافة إلى "
 },
 "163 邮箱": {
  "en": "163 Mail",
  "ar": "بريد 163"
 },
 "导入 CSV": {
  "en": "Import CSV",
  "ar": "استيراد CSV"
 },
 "思考中...": {
  "en": "Thinking...",
  "ar": "جارٍ التفكير..."
 },
 "正在检查网络": {
  "en": "Checking Network",
  "ar": "جارٍ فحص الشبكة"
 },
 "评价此回复：": {
  "en": "Rate this response:",
  "ar": "قيّم هذه الإجابة:"
 },
 "👥 客户开发": {
  "en": "👥 Customer Development",
  "ar": "👥 تطوير العملاء"
 },
 "-长图.png": {
  "en": "-long image.png",
  "ar": "-صورة طويلة.png"
 },
 "仅完成制裁筛查": {
  "en": "Sanctions screening only completed",
  "ar": "اكتمل فحص العقوبات فقط"
 },
 "密语策略已更新": {
  "en": "Code-word Strategy Updated",
  "ar": "تم تحديث استراتيجية الكلمات السرية"
 },
 "请填写客户名称": {
  "en": "Please enter the customer name",
  "ar": "يرجى إدخال اسم العميل"
 },
 "需要先开启代理": {
  "en": "Proxy must be enabled first",
  "ar": "يجب تفعيل الوكيل أولاً"
 },
 "下载模板失败: ": {
  "en": "Failed to download template: ",
  "ar": "فشل تنزيل القالب: "
 },
 "周五 17:30": {
  "en": "Friday 17:30",
  "ar": "الجمعة 17:30"
 },
 "简要描述任务内容": {
  "en": "Briefly describe the task",
  "ar": "صف المهمة باختصار"
 },
 "✅ 系统更新完成！": {
  "en": "✅ System update complete!",
  "ar": "✅ اكتمل تحديث النظام!"
 },
 "查询导入状态失败：": {
  "en": "Failed to query import status:",
  "ar": "فشل الاستعلام عن حالة الاستيراد:"
 },
 "✅ 管理表格下载完成": {
  "en": "✅ Management sheet download complete",
  "ar": "✅ اكتمل تنزيل جدول الإدارة"
 },
 "导入等待面板挂载失败": {
  "en": "Import waiting panel failed to mount",
  "ar": "فشل تحميل لوحة انتظار الاستيراد"
 },
 " 次轮询)，请手动刷新": {
  "en": " polls), please refresh manually",
  "ar": " استطلاعات)، يُرجى التحديث يدوياً"
 },
 "已处理，逾期角标已更新": {
  "en": "Processed; overdue badge updated",
  "ar": "تمت المعالجة، وتم تحديث شارة التأخير"
 },
 "导入正在进行中，请稍候。": {
  "en": "Import in progress, please wait.",
  "ar": "الاستيراد قيد التنفيذ، يرجى الانتظار."
 },
 "LinkedIn 内容发布": {
  "en": "LinkedIn Content Publishing",
  "ar": "نشر محتوى LinkedIn"
 },
 "填写当日工作成果和明日计划": {
  "en": "Fill in today's achievements and tomorrow's plan",
  "ar": "أدخل إنجازات اليوم وخطة الغد"
 },
 "Trade 需要重建运行环境": {
  "en": "Trade needs to rebuild its runtime environment",
  "ar": "يحتاج Trade إلى إعادة بناء بيئة التشغيل"
 },
 "对话摘要（最多 200 字）": {
  "en": "Conversation summary (max 200 characters)",
  "ar": "ملخص المحادثة (بحد أقصى 200 حرف)"
 },
 "海关数据分析找采购商与市场趋势": {
  "en": "Customs data analysis to find buyers and market trends",
  "ar": "تحليل بيانات الجمارك للعثور على المشترين واتجاهات السوق"
 },
 "⚠ 完整读取未通过，已完整读取 ": {
  "en": "⚠ Full-read check failed; fully read ",
  "ar": "⚠ فشلت القراءة الكاملة؛ تمت القراءة بالكامل "
 },
 "正在确认能否访问 GitHub…": {
  "en": "Checking GitHub access…",
  "ar": "جارٍ التحقق من إمكانية الوصول إلى GitHub…"
 },
 "引导页等待界面挂载失败，使用旧样式": {
  "en": "Onboarding waiting screen failed to mount; using legacy style",
  "ar": "فشل تحميل شاشة انتظار صفحة التوجيه؛ يتم استخدام النمط القديم"
 },
 "确认框看到的版本 = 实际安装的版本": {
  "en": "Version shown in the dialog = actually installed version",
  "ar": "الإصدار المعروض في مربع التأكيد = الإصدار المثبّت فعلياً"
 },
 "催款、索赔、展会、验厂、节日问候、物流": {
  "en": "Payment reminders, claims, trade shows, factory audits, holiday greetings, logistics",
  "ar": "تذكير الدفع، المطالبات، المعارض، تدقيق المصنع، تحيات الأعياد، اللوجستيات"
 },
 "查看今日汇率、大宗商品行情、客户跟进提醒": {
  "en": "View today's exchange rates, commodity prices, and customer follow-up reminders",
  "ar": "عرض أسعار الصرف اليومية وأسعار السلع وتذكيرات متابعة العملاء"
 },
 "背调与画像 · DUE DILIGENCE": {
  "en": "Due Diligence & Profiling · DUE DILIGENCE",
  "ar": "الفحص وبناء الملف الشخصي · DUE DILIGENCE"
 },
 "周复盘：亮点/短板/KPI对比/下周行动清单": {
  "en": "Weekly review: highlights / weaknesses / KPI comparison / next week's action list",
  "ar": "مراجعة أسبوعية: الإيجابيات / أوجه القصور / مقارنة KPI / قائمة إجراءات الأسبوع القادم"
 },
 "每日任务、定时任务、早安简报、cron、日报": {
  "en": "Daily tasks, scheduled tasks, morning briefing, cron, daily report",
  "ar": "المهام اليومية، المهام المجدولة، موجز الصباح، cron، التقرير اليومي"
 },
 "六顶思考帽决策教练 — 系统化分析复杂外贸决策": {
  "en": "Six Thinking Hats decision coach — systematic analysis of complex trade decisions",
  "ar": "مدرب القرار بقبعات التفكير الست — تحليل منهجي للقرارات التجارية المعقدة"
 },
 " 次 — 检测到新进程 (started_at=": {
  "en": " times — new process detected (started_at=",
  "ar": " مرة — تم رصد عملية جديدة (started_at="
 },
 "确定停用该公司？数据将保留 30 天后自动清理。": {
  "en": "Deactivate this company? Data will be kept for 30 days then auto-deleted.",
  "ar": "هل تريد إيقاف هذه الشركة؟ سيتم الاحتفاظ بالبيانات 30 يوماً ثم حذفها تلقائياً."
 },
 "压缩包批量解压归档 — 嵌套包多轮展开，原包进回收站": {
  "en": "Batch archive extraction — nested packages expanded in multiple rounds, originals moved to recycle bin",
  "ar": "استخراج مجمّع للأرشيفات — توسيع الحزم المتداخلة على عدة مراحل، ونقل الأصل إلى سلة المحذوفات"
 },
 "查邮箱、邮箱注册、邮箱背调、email lookup": {
  "en": "Find email, email registration, email background check, email lookup",
  "ar": "البحث عن البريد، تسجيل البريد، فحص خلفية البريد، email lookup"
 },
 "评论目标客户 10-15 条动态，新增连接发送感谢私信": {
  "en": "Comment on 10-15 posts of target customers; send a thank-you DM to new connections",
  "ar": "علّق على 10-15 منشوراً للعملاء المستهدفين، وأرسل رسالة شكر الخاصة إلى الاتصالات الجديدة"
 },
 "外贸履约与售后沟通（催款/索赔/展会/验厂/物流/售后）": {
  "en": "Trade fulfillment & after-sales communication (payment reminders / claims / trade shows / factory audits / logistics / after-sales)",
  "ar": "تنفيذ التجارة والتواصل بعد البيع (تذكير الدفع / المطالبات / المعارض / تدقيق المصنع / اللوجستيات / خدمة ما بعد البيع)"
 },
 "分析文档、读报价、看合同、analyze document": {
  "en": "Analyze documents, read quotes, review contracts, analyze document",
  "ar": "تحليل المستندات، قراءة العروض، مراجعة العقود، analyze document"
 },
 "销售推进、跟进计划、怎么跟进、sales pipeline": {
  "en": "Sales advancement, follow-up plan, how to follow up, sales pipeline",
  "ar": "تقدم المبيعات، خطة المتابعة، كيفية المتابعة، sales pipeline"
 },
 "文化禁忌、Incoterms、翻译二审、Amazon上架检查": {
  "en": "Cultural taboos, Incoterms, second-round translation review, Amazon listing check",
  "ar": "المحرمات الثقافية، Incoterms، مراجعة الترجمة الثانية، فحص إدراج Amazon"
 },
 "发布或转发 1 条内容（案例/痛点/工厂/证书），≥3 帖/周": {
  "en": "Publish or repost 1 piece of content (case / pain point / factory / certificate), ≥3 posts/week",
  "ar": "انشر أو أعد نشر محتوى واحد (حالة / نقطة ألم / مصنع / شهادة)، ≥3 منشورات/أسبوع"
 },
 "定时任务（早安简报/日报/周报/LinkedIn/社媒文案生成）": {
  "en": "Scheduled tasks (morning briefing / daily report / weekly report / LinkedIn / social copy generation)",
  "ar": "المهام المجدولة (موجز الصباح / التقرير اليومي / التقرير الأسبوعي / LinkedIn / توليد نصوص التواصل الاجتماعي)"
 },
 "SEO+AEO 文章生成 — 针对 Google + AI 搜索优化": {
  "en": "SEO+AEO article generation — optimized for Google + AI search",
  "ar": "توليد مقالات SEO+AEO — مُحسّنة لـ Google + بحث AI"
 },
 "无法访问 GitHub，升级没有开始。请开启代理（VPN）后点「重试」。": {
  "en": "Cannot access GitHub; the upgrade did not start. Please enable the proxy (VPN), then click \"Retry\".",
  "ar": "تعذّر الوصول إلى GitHub، ولم تبدأ الترقية. يُرجى تفعيل الوكيل (VPN) ثم النقر على «إعادة المحاولة»."
 },
 "找招标、查招标、招标信息、招标公告、tender opportunities": {
  "en": "Find tenders, check tenders, tender info, tender announcements, tender opportunities",
  "ar": "البحث عن المناقصات، الاستعلام عن المناقصات، معلومات المناقصات، إعلانات المناقصات، tender opportunities"
 },
 "重建耗时较长。如果页面没有自动刷新，请手动刷新一次；若一直打不开，请联系技术支持。": {
  "en": "The rebuild takes a while. If the page does not refresh automatically, refresh it manually once; if it still won't open, please contact technical support.",
  "ar": "قد تستغرق إعادة البناء وقتاً طويلاً. إذا لم تُحدَّث الصفحة تلقائياً، حدّثها يدوياً مرة واحدة؛ إذا استمرت في عدم الفتح، يُرجى التواصل مع الدعم التقني."
 },
 "⚠️ 服务端未能给出回复（请求已结束但内容为空）。请重试一次；若反复出现，请把这条消息发给技术支持。": {
  "en": "⚠️ The server failed to respond (the request ended with empty content). Please retry once; if it happens again, send this message to technical support.",
  "ar": "⚠️ لم يتمكن الخادم من تقديم رد (انتهى الطلب بمحتوى فارغ). يُرجى المحاولة مرة واحدة؛ إذا تكرر ذلك، أرسل هذه الرسالة إلى الدعم التقني."
 },
 "低": {
  "en": "Low",
  "ar": "منخفض"
 },
 " 条": {
  "en": " items",
  "ar": " عنصر"
 },
 "五金": {
  "en": "Hardware",
  "ar": "الحديديات"
 },
 "保存": {
  "en": "Save",
  "ar": "حفظ"
 },
 "公公": {
  "en": "Father-in-law (husband's father)",
  "ar": "والد الزوج"
 },
 "发票": {
  "en": "Invoice",
  "ar": "فاتورة"
 },
 "同行": {
  "en": "Industry peers",
  "ar": "الأقران في القطاع"
 },
 "外公": {
  "en": "Maternal grandfather",
  "ar": "جد الأم"
 },
 "女婿": {
  "en": "Son-in-law",
  "ar": "صهر"
 },
 "姐姐": {
  "en": "Older sister",
  "ar": "الأخت الكبرى"
 },
 "孙辈": {
  "en": "Grandchildren",
  "ar": "الأحفاد"
 },
 "家庭": {
  "en": "Family",
  "ar": "الأسرة"
 },
 "弟弟": {
  "en": "Younger brother",
  "ar": "الأخ الأصغر"
 },
 "收起": {
  "en": "Collapse",
  "ar": "طي"
 },
 "母亲": {
  "en": "Mother",
  "ar": "الأم"
 },
 "禁忌": {
  "en": "Taboos",
  "ar": "المحرمات"
 },
 "订单": {
  "en": "Order",
  "ar": "طلب"
 },
 "邮箱": {
  "en": "Email",
  "ar": "البريد الإلكتروني"
 },
 " 秒）": {
  "en": " sec)",
  "ar": " ثانية)"
 },
 "任务 ": {
  "en": "Task ",
  "ar": "مهمة "
 },
 "原因：": {
  "en": "Reason:",
  "ar": "السبب:"
 },
 "女朋友": {
  "en": "Girlfriend",
  "ar": "الصديقة"
 },
 "已停用": {
  "en": "Disabled",
  "ar": "معطل"
 },
 "已完成": {
  "en": "Completed",
  "ar": "مكتمل"
 },
 "报价中": {
  "en": "Quoting",
  "ar": "قيد التسعير"
 },
 "显示 ": {
  "en": "Show ",
  "ar": "عرض "
 },
 "未完成": {
  "en": "Incomplete",
  "ar": "غير مكتمل"
 },
 "目标：": {
  "en": "Target:",
  "ar": "الهدف:"
 },
 "请对 ": {
  "en": "Please ",
  "ar": "يرجى "
 },
 "错误：": {
  "en": "Error:",
  "ar": "خطأ:"
 },
 "LED灯": {
  "en": "LED light",
  "ar": "مصباح LED"
 },
 "产品规格": {
  "en": "Product specs",
  "ar": "مواصفات المنتج"
 },
 "全部完成": {
  "en": "All done",
  "ar": "اكتمل الكل"
 },
 "内部风险": {
  "en": "Internal risk",
  "ar": "مخاطر داخلية"
 },
 "升级完成": {
  "en": "Upgrade complete",
  "ar": "اكتملت الترقية"
 },
 "后台背调": {
  "en": "Background check",
  "ar": "فحص الخلفية"
 },
 "客户列表": {
  "en": "Customer list",
  "ar": "قائمة العملاء"
 },
 "客户详情": {
  "en": "Customer details",
  "ar": "تفاصيل العميل"
 },
 "导入完成": {
  "en": "Import complete",
  "ar": "اكتمل الاستيراد"
 },
 "悬浮窗：": {
  "en": "Tooltip:",
  "ar": "نافذة تلميح:"
 },
 "搜索对话": {
  "en": "Search conversations",
  "ar": "البحث في المحادثات"
 },
 "暂无邮箱": {
  "en": "No email yet",
  "ar": "لا يوجد بريد إلكتروني"
 },
 "标记完成": {
  "en": "Mark complete",
  "ar": "تحديد كمكتمل"
 },
 "物流单据": {
  "en": "Shipping documents",
  "ar": "مستندات الشحن"
 },
 "自动生成": {
  "en": "Auto-generate",
  "ar": "إنشاء تلقائي"
 },
 "调用技能": {
  "en": "Invoke skill",
  "ar": "استدعاء مهارة"
 },
 "重要对话": {
  "en": "Important conversations",
  "ar": "محادثات مهمة"
 },
 "，市场=": {
  "en": ", Market=",
  "ar": "، السوق="
 },
 "📦 技能": {
  "en": "📦 Skills",
  "ar": "📦 المهارات"
 },
 " 项未核验": {
  "en": " items unverified",
  "ar": " عناصر غير مُتحقَّق منها"
 },
 "上次启动：": {
  "en": "Last started:",
  "ar": "آخر تشغيل:"
 },
 "任务已启动": {
  "en": "Task started",
  "ar": "تم بدء المهمة"
 },
 "原跟进日 ": {
  "en": "Original follow-up date ",
  "ar": "تاريخ المتابعة الأصلي "
 },
 "客户已添加": {
  "en": "Customer added",
  "ar": "تمت إضافة العميل"
 },
 "已取消关联": {
  "en": "Link removed",
  "ar": "تم إلغاء الارتباط"
 },
 "整理答复中": {
  "en": "Preparing reply",
  "ar": "جارٍ تجهيز الرد"
 },
 "背调进行中": {
  "en": "Background check in progress",
  "ar": "فحص الخلفية جارٍ"
 },
 "，订单 +": {
  "en": ", Orders +",
  "ar": "، الطلبات +"
 },
 " · 对话 ": {
  "en": " · Conversations ",
  "ar": " · محادثات "
 },
 "AI 提取中": {
  "en": "AI extracting",
  "ar": "جارٍ الاستخراج بواسطة AI"
 },
 "导入中...": {
  "en": "Importing...",
  "ar": "جارٍ الاستيراد..."
 },
 "显示工作清单": {
  "en": "Show task list",
  "ar": "عرض قائمة العمل"
 },
 "每日工作总结": {
  "en": "Daily work summary",
  "ar": "ملخص العمل اليومي"
 },
 "请先选择公司": {
  "en": "Please select a company first",
  "ar": "يرجى اختيار شركة أولاً"
 },
 "📂 列出文件": {
  "en": "📂 List files",
  "ar": "📂 عرض الملفات"
 },
 "[号码已隐藏]": {
  "en": "[Number hidden]",
  "ar": "[تم إخفاء الرقم]"
 },
 "保存并解决逾期": {
  "en": "Save and resolve overdue",
  "ar": "حفظ ومعالجة المتأخرات"
 },
 "导入公司数据包": {
  "en": "Import company data pack",
  "ar": "استيراد حزمة بيانات الشركة"
 },
 "身份配置已保存": {
  "en": "Identity config saved",
  "ar": "تم حفظ إعدادات الهوية"
 },
 "验厂计划已保存": {
  "en": "Factory audit plan saved",
  "ar": "تم حفظ خطة تدقيق المصنع"
 },
 "下载管理表格失败": {
  "en": "Failed to download management sheet",
  "ar": "فشل تنزيل جدول الإدارة"
 },
 "定时任务批量创建": {
  "en": "Batch create scheduled tasks",
  "ar": "إنشاء مهام مجدولة بالجملة"
 },
 "重启 Trade": {
  "en": "Restart Trade",
  "ar": "إعادة تشغيل Trade"
 },
 "删除此自定义模板？": {
  "en": "Delete this custom template?",
  "ar": "حذف هذا القالب المخصص؟"
 },
 "评论互动与私信致谢": {
  "en": "Comment engagement & DM thanks",
  "ar": "التفاعل بالتعليقات والشكر عبر الرسائل الخاصة"
 },
 "下载管理表格失败: ": {
  "en": "Failed to download management sheet: ",
  "ar": "فشل تنزيل جدول الإدارة: "
 },
 "暂无已同步的邮件记录": {
  "en": "No synced email records yet",
  "ar": "لا توجد سجلات بريد مُزامَنة"
 },
 "⚠️ 升级完成，但有 ": {
  "en": "⚠️ Upgrade complete, but ",
  "ar": "⚠️ اكتملت الترقية، لكن "
 },
 "正在升级 Hermes": {
  "en": "Upgrading Hermes",
  "ar": "جارٍ ترقية Hermes"
 },
 "已填入建议（可自行修改）": {
  "en": "Suggestion filled in (editable)",
  "ar": "تم إدراج الاقتراح (يمكن تعديله)"
 },
 "【客户档案提醒 · 内部】": {
  "en": "【Customer Profile Reminder · Internal】",
  "ar": "【تنبيه ملف العميل · داخلي】"
 },
 "对话标题（最多 60 字）": {
  "en": "Conversation title (max 60 chars)",
  "ar": "عنوان المحادثة (بحد أقصى 60 حرفاً)"
 },
 "[已禁用] 点此了解设计理念": {
  "en": "[Disabled] Click to learn the design philosophy",
  "ar": "[معطل] انقر للتعرف على فلسفة التصميم"
 },
 "导入超时，请查看日志或重试。": {
  "en": "Import timed out. Check the logs or retry.",
  "ar": "انتهت مهلة الاستيراد. راجع السجلات أو أعد المحاولة."
 },
 "精准加人 (LinkedIn)": {
  "en": "Targeted connections (LinkedIn)",
  "ar": "إضافة جهات اتصال مستهدفة (LinkedIn)"
 },
 "公司创建成功，桌面工作目录已就绪": {
  "en": "Company created; desktop workspace ready",
  "ar": "تم إنشاء الشركة؛ مجلد العمل على سطح المكتب جاهز"
 },
 "请选择下次跟进日，或勾选不再跟进": {
  "en": "Select the next follow-up date, or check 'No more follow-up'",
  "ar": "اختر تاريخ المتابعة التالي، أو حدد «عدم المتابعة»"
 },
 "数据目录、数据结构、我的数据存在哪": {
  "en": "Data directory, data structure, where my data is stored",
  "ar": "دليل البيانات، بنية البيانات، مكان تخزين بياناتي"
 },
 "请填写任务名称、时间和 Prompt": {
  "en": "Enter task name, time, and Prompt",
  "ar": "أدخل اسم المهمة والوقت و Prompt"
 },
 "询盘分析会、询盘复盘、周会、业务员复盘": {
  "en": "Inquiry review, inquiry recap, weekly meeting, sales rep review",
  "ar": "اجتماع تحليل الاستفسارات، مراجعة الاستفسارات، اجتماع أسبوعي، مراجعة مندوبي المبيعات"
 },
 "解压、压缩包、批量解压、包中包、归档清理": {
  "en": "Extract, archive, batch extract, nested archives, archive cleanup",
  "ar": "فك الضغط، الأرشيفات المضغوطة، فك الضغط بالجملة، أرشيف داخل أرشيف، تنظيف الأرشيفات"
 },
 "询价单、生成询价单、整理招标、招标文件整理": {
  "en": "RFQ, generate RFQ, organize tender, tender document organization",
  "ar": "طلب عرض سعر، إنشاء طلب عرض سعر، تنظيم المناقصة، تنظيم مستندات المناقصة"
 },
 "商业提案、战略建议书、ROI分析、方案建议书": {
  "en": "Business proposal, strategic recommendation, ROI analysis, solution proposal",
  "ar": "مقترح تجاري، توصية استراتيجية، تحليل ROI، مقترح حلول"
 },
 "邮箱情报 — 120+ 平台检测邮箱注册状态": {
  "en": "Email intelligence — check registration status across 120+ platforms",
  "ar": "استخبارات البريد الإلكتروني — فحص حالة التسجيل في أكثر من 120 منصة"
 },
 "单一客户深度画像 — 15 维度全方位情报档案": {
  "en": "Single-customer deep profile — 15-dimension intelligence dossier",
  "ar": "ملف عميل متعمق — ملف استخبارات شامل بـ 15 بُعداً"
 },
 "B2B 平台店铺诊断优化（阿里/MIC/独立站）": {
  "en": "B2B platform store diagnosis & optimization (Alibaba/MIC/independent site)",
  "ar": "تشخيص وتحسين متجر منصة B2B (علي بابا/MIC/موقع مستقل)"
 },
 "图纸、工程图、铸件图、技术图纸、blueprint": {
  "en": "Drawings, engineering drawings, casting drawings, technical drawings, blueprint",
  "ar": "رسومات، رسوم هندسية، رسوم سبك، رسومات تقنية، blueprint"
 },
 "商业提案生成器 — 三档方案/ROI分析/实施路线图": {
  "en": "Business proposal generator — 3 tiers / ROI analysis / implementation roadmap",
  "ar": "مولّد المقترحات التجارية — ثلاث فئات / تحليل ROI / خارطة تنفيذ"
 },
 "之前说过、上周聊的、历史记录、chat history": {
  "en": "Said before, discussed last week, history, chat history",
  "ar": "ما قيل سابقاً، ما نوقش الأسبوع الماضي، السجل التاريخي، سجل المحادثة"
 },
 "Hermes 没有升级成功。请确认网络通畅后点「重试」。": {
  "en": "Hermes upgrade failed. Check your network connection, then click 'Retry'.",
  "ar": "لم تنجح ترقية Hermes. تأكد من اتصال الشبكة ثم انقر «إعادة المحاولة»."
 },
 "开发信、写推广信、cold email、outreach": {
  "en": "Cold outreach email, write promo email, cold email, outreach",
  "ar": "رسالة تواصل تجاري، كتابة رسالة ترويجية، cold email، outreach"
 },
 "处理后该客户不再计入逾期；处理记录会出现在客户详情时间线。": {
  "en": "Once handled, this customer is no longer counted as overdue; the action is logged in the customer's detail timeline.",
  "ar": "بعد المعالجة، لم يعد هذا العميل يُحتسب ضمن المتأخرات؛ ويظهر سجل المعالجة في الخط الزمني لتفاصيل العميل."
 },
 "SEO文章、AEO文章、搜索引擎优化、seo article": {
  "en": "SEO article, AEO article, search engine optimization, seo article",
  "ar": "مقال SEO، مقال AEO، تحسين محركات البحث، مقال seo"
 },
 "生成报价/合同/提案/PPT（DOCX/XLSX/PPTX）": {
  "en": "Generate quote/contract/proposal/PPT (DOCX/XLSX/PPTX)",
  "ar": "إنشاء عرض سعر/عقد/مقترح/عرض تقديمي (DOCX/XLSX/PPTX)"
 },
 "工程图纸分析（实验性）— 从 PDF 图纸提取材料/尺寸/公差": {
  "en": "Engineering drawing analysis (experimental) — extract material/dimensions/tolerances from PDF drawings",
  "ar": "تحليل الرسوم الهندسية (تجريبي) — استخراج المواد/الأبعاد/التفاوتات من رسوم PDF"
 },
 "怎么找客户、客户开发向导、customer finder、找客户": {
  "en": "How to find customers, customer development guide, customer finder, find customers",
  "ar": "كيفية العثور على العملاء، دليل تطوير العملاء، customer finder، البحث عن عملاء"
 },
 "外贸合规检查 — 文化禁忌/缩写/Incoterms/翻译二审/投标": {
  "en": "Trade compliance check — cultural taboos/abbreviations/Incoterms/translation review/bidding",
  "ar": "فحص الامتثال التجاري — المحرمات الثقافية/الاختصارات/Incoterms/مراجعة الترجمة/العطاءات"
 },
 "生成 skill、创建技能、create skill、new skill": {
  "en": "Generate skill, create skill, create skill, new skill",
  "ar": "إنشاء مهارة، إنشاء مهارة، create skill، new skill"
 },
 "产品描述、产品文案、Sales Kit、product description": {
  "en": "Product description, product copy, Sales Kit, product description",
  "ar": "وصف المنتج، نص المنتج، Sales Kit، product description"
 },
 " 做全面的客户背景调查（OSINT），然后基于我的公司产品生成一封专业的 B2B 开发信。": {
  "en": " Conduct a comprehensive customer background check (OSINT), then write a professional B2B outreach email based on my company's products.",
  "ar": " إجراء فحص شامل لخلفية العميل (OSINT)، ثم كتابة رسالة تواصل B2B احترافية بناءً على منتجات شركتي."
 },
 "你的 Hermes 已经是新版，但 Trade 的运行环境还是旧的。点下面的按钮重建一次即可，数据不会丢。": {
  "en": "Your Hermes is up to date, but Trade's runtime environment is still old. Click the button below to rebuild once — no data will be lost.",
  "ar": "إصدار Hermes لديك محدث، لكن بيئة تشغيل Trade ما زالت قديمة. انقر الزر أدناه لإعادة البناء مرة واحدة — ولن تُفقد أي بيانات."
 },
 "妻": {
  "en": "Wife",
  "ar": "الزوجة"
 },
 " 秒": {
  "en": " seconds",
  "ar": " ثانية"
 },
 "人物": {
  "en": "People",
  "ar": "أشخاص"
 },
 "停止": {
  "en": "Stop",
  "ar": "إيقاف"
 },
 "关闭": {
  "en": "Close",
  "ar": "إغلاق"
 },
 "发送": {
  "en": "Send",
  "ar": "إرسال"
 },
 "命中": {
  "en": "Hit",
  "ar": "إصابة"
 },
 "外婆": {
  "en": "Maternal grandmother",
  "ar": "الجدة لأمها"
 },
 "奶奶": {
  "en": "Paternal grandmother",
  "ar": "الجدة لأبيها"
 },
 "姑姑": {
  "en": "Aunt",
  "ar": "العمة"
 },
 "孩子": {
  "en": "Child",
  "ar": "الطفل"
 },
 "小孩": {
  "en": "Kid",
  "ar": "طفل صغير"
 },
 "待谈": {
  "en": "Pending discussion",
  "ar": "قيد النقاش"
 },
 "日程": {
  "en": "Schedule",
  "ar": "الجدول"
 },
 "爱人": {
  "en": "Partner",
  "ar": "الشريك"
 },
 "美国": {
  "en": "United States",
  "ar": "الولايات المتحدة"
 },
 "询盘": {
  "en": "Inquiry",
  "ar": "استفسار"
 },
 "配偶": {
  "en": "Spouse",
  "ar": "الزوج"
 },
 "-公开": {
  "en": "-Public",
  "ar": "-عام"
 },
 "低风险": {
  "en": "Low risk",
  "ar": "منخفض المخاطر"
 },
 "品牌商": {
  "en": "Brand owner",
  "ar": "صاحب علامة تجارية"
 },
 "安装商": {
  "en": "Installer",
  "ar": "مُركِّب"
 },
 "已关联": {
  "en": "Linked",
  "ar": "مرتبط"
 },
 "已确认": {
  "en": "Confirmed",
  "ar": "مؤكد"
 },
 "报价单": {
  "en": "Quotation",
  "ar": "عرض سعر"
 },
 "更新中": {
  "en": "Updating",
  "ar": "جارٍ التحديث"
 },
 "未运行": {
  "en": "Not running",
  "ar": "غير قيد التشغيل"
 },
 "纺织品": {
  "en": "Textiles",
  "ar": "المنسوجات"
 },
 "运行中": {
  "en": "Running",
  "ar": "قيد التشغيل"
 },
 "预算 ": {
  "en": "Budget ",
  "ar": "الميزانية "
 },
 "[路径]": {
  "en": "[Path]",
  "ar": "[المسار]"
 },
 "今日任务": {
  "en": "Today's tasks",
  "ar": "مهام اليوم"
 },
 "全部类型": {
  "en": "All types",
  "ar": "جميع الأنواع"
 },
 "分析完成": {
  "en": "Analysis complete",
  "ar": "اكتمل التحليل"
 },
 "取消完成": {
  "en": "Undo completion",
  "ar": "إلغاء الإكمال"
 },
 "商机阶段": {
  "en": "Opportunity stage",
  "ar": "مرحلة الفرصة"
 },
 "客户开发": {
  "en": "Customer development",
  "ar": "تطوير العملاء"
 },
 "客户资料": {
  "en": "Customer profile",
  "ar": "بيانات العميل"
 },
 "导入超时": {
  "en": "Import timeout",
  "ar": "انتهت مهلة الاستيراد"
 },
 "感谢反馈": {
  "en": "Thanks for feedback",
  "ar": "شكرًا لملاحظاتك"
 },
 "文档生成": {
  "en": "Document generation",
  "ar": "توليد المستندات"
 },
 "最近对话": {
  "en": "Recent conversations",
  "ar": "المحادثات الأخيرة"
 },
 "检查网络": {
  "en": "Check network",
  "ar": "تحقق من الشبكة"
 },
 "礼物往来": {
  "en": "Gift exchanges",
  "ar": "تبادل الهدايا"
 },
 "营销素材": {
  "en": "Marketing materials",
  "ar": "مواد التسويق"
 },
 "跟进处理": {
  "en": "Follow-up handling",
  "ar": "معالجة المتابعة"
 },
 "重要日期": {
  "en": "Important dates",
  "ar": "تواريخ مهمة"
 },
 "，文件 ": {
  "en": ", file ",
  "ar": "، ملف "
 },
 "🤖 委派": {
  "en": "🤖 Delegate",
  "ar": "🤖 تفويض"
 },
 " 项警告：": {
  "en": " warnings: ",
  "ar": " تحذيرات: "
 },
 "下次跟进日": {
  "en": "Next follow-up date",
  "ar": "تاريخ المتابعة التالي"
 },
 "全局热键：": {
  "en": "Global hotkeys: ",
  "ar": "اختصارات عامة: "
 },
 "去绑定邮箱": {
  "en": "Bind email",
  "ar": "ربط البريد الإلكتروني"
 },
 "对话处理中": {
  "en": "Processing conversation",
  "ar": "جارٍ معالجة المحادثة"
 },
 "已新建公司": {
  "en": "Company created",
  "ar": "تم إنشاء الشركة"
 },
 "未完成核验": {
  "en": "Verification incomplete",
  "ar": "التحقق غير مكتمل"
 },
 "请输入密语": {
  "en": "Enter passphrase",
  "ar": "أدخل رمز المرور"
 },
 "，记忆 +": {
  "en": ", memory +",
  "ar": "، ذاكرة +"
 },
 " · 最近 ": {
  "en": " · Recent ",
  "ar": " · الأحدث "
 },
 "下载模板失败": {
  "en": "Failed to download template",
  "ar": "فشل تنزيل القالب"
 },
 "导入失败: ": {
  "en": "Import failed: ",
  "ar": "فشل الاستيراد: "
 },
 "暂无互动记录": {
  "en": "No interaction records yet",
  "ar": "لا توجد سجلات تفاعل بعد"
 },
 "清空定时任务": {
  "en": "Clear scheduled tasks",
  "ar": "مسح المهام المجدولة"
 },
 "请先选择客户": {
  "en": "Please select a customer first",
  "ar": "يرجى اختيار العميل أولاً"
 },
 "📄 读取文件": {
  "en": "📄 Read file",
  "ar": "📄 قراءة الملف"
 },
 "[邮箱已隐藏]": {
  "en": "[Email hidden]",
  "ar": "[البريد مخفي]"
 },
 "全部来源已返回": {
  "en": "All sources returned",
  "ar": "تم إرجاع جميع المصادر"
 },
 "已启动（预算 ": {
  "en": "Started (budget ",
  "ar": "تم البدء (الميزانية "
 },
 "邮件处理与跟进": {
  "en": "Email processing and follow-up",
  "ar": "معالجة البريد والمتابعة"
 },
 " · 正在调用：": {
  "en": " · Calling: ",
  "ar": " · جارٍ الاستدعاء: "
 },
 "保存失败，请重试": {
  "en": "Save failed, please retry",
  "ar": "فشل الحفظ، يرجى المحاولة مرة أخرى"
 },
 "密语已锁定，请 ": {
  "en": "Passphrase locked, please ",
  "ar": "تم قفل رمز المرور، يرجى "
 },
 "📊 每日工作总结": {
  "en": "📊 Daily work summary",
  "ar": "📊 ملخص العمل اليومي"
 },
 "品牌商/OEM工厂": {
  "en": "Brand/OEM factory",
  "ar": "علامة تجارية/مصنع OEM"
 },
 "读取私密备忘录失败": {
  "en": "Failed to read private memo",
  "ar": "فشل قراءة المذكرة الخاصة"
 },
 "停止 · ABORT": {
  "en": "Stop · ABORT",
  "ar": "إيقاف · ABORT"
 },
 "本次跟进备注（可选）": {
  "en": "Follow-up note for this time (optional)",
  "ar": "ملاحظة المتابعة الحالية (اختياري)"
 },
 "例如：海关数据每日监控": {
  "en": "e.g., Daily customs data monitoring",
  "ar": "مثال: مراقبة بيانات الجمارك يوميًا"
 },
 "请至少选择一个任务模板": {
  "en": "Please select at least one task template",
  "ar": "يرجى اختيار قالب مهمة واحد على الأقل"
 },
 "数据目录结构管理与初始化": {
  "en": "Data directory structure management and initialization",
  "ar": "إدارة بنية دليل البيانات وتهيئتها"
 },
 "不再跟进（清空下次跟进日）": {
  "en": "No longer follow up (clear next follow-up date)",
  "ar": "إيقاف المتابعة (مسح تاريخ المتابعة التالي)"
 },
 "导出完成，请妥善保管数据包": {
  "en": "Export complete, please keep the data package safe",
  "ar": "اكتمل التصدير، يرجى الحفاظ على حزمة البيانات"
 },
 "fx pass 出错，已移除": {
  "en": "fx pass error, removed",
  "ar": "خطأ في fx pass، تمت الإزالة"
 },
 "等待界面挂载失败，使用旧样式": {
  "en": "Failed to mount waiting UI, using legacy style",
  "ar": "فشل تحميل واجهة الانتظار، يتم استخدام النمط القديم"
 },
 "📢 LinkedIn 内容发布": {
  "en": "📢 LinkedIn content publishing",
  "ar": "📢 نشر محتوى LinkedIn"
 },
 "副驾设置已保存，但进程启动失败：": {
  "en": "Copilot settings saved, but process failed to start: ",
  "ar": "تم حفظ إعدادات المساعد، لكن فشل بدء العملية: "
 },
 "SITE VISIT / 内部资料": {
  "en": "SITE VISIT / Internal documents",
  "ar": "SITE VISIT / مستندات داخلية"
 },
 "文档与报价 · DOCUMENTS": {
  "en": "Documents & Quotation · DOCUMENTS",
  "ar": "المستندات وعروض الأسعار · DOCUMENTS"
 },
 "09:00 或 09:00-10:30": {
  "en": "09:00 or 09:00-10:30",
  "ar": "09:00 أو 09:00-10:30"
 },
 "询盘训练、回复练习、模拟买家、反对意见": {
  "en": "Inquiry training, reply practice, simulated buyer, objections",
  "ar": "تدريب على الاستفسارات، ممارسة الردود، مشترٍ محاكى، اعتراضات"
 },
 "在 LinkedIn 上搜索并添加目标客户": {
  "en": "Search and add target customers on LinkedIn",
  "ar": "ابحث عن العملاء المستهدفين وأضفهم على LinkedIn"
 },
 "3D 推镜初始化失败，使用 Canvas2D": {
  "en": "3D camera push init failed, using Canvas2D",
  "ar": "فشل تهيئة دفع الكاميرا ثلاثية الأبعاد، يتم استخدام Canvas2D"
 },
 "客户画像、深度画像、送礼建议、回扣、了解客户": {
  "en": "Customer persona, deep profiling, gift suggestions, commissions, understanding the customer",
  "ar": "صورة العميل، ملف متعمق، اقتراحات الهدايا، العمولات، فهم العميل"
 },
 "首次使用：设置私密备忘录密语（至少 4 位）": {
  "en": "First use: set private memo passphrase (at least 4 characters)",
  "ar": "أول استخدام: تعيين كلمة مرور المذكرة الخاصة (4 أحرف على الأقل)"
 },
 "客户档案与分级管理（A/B/C 级、订单跟踪）": {
  "en": "Customer profile and tiering (A/B/C tiers, order tracking)",
  "ar": "ملفات العملاء وتصنيفهم (المستويات A/B/C، تتبع الطلبات)"
 },
 "。图片文件请使用 vision 工具识别文字内容": {
  "en": ". For image files, use the vision tool to recognize text content",
  "ar": ". بالنسبة لملفات الصور، استخدم أداة vision للتعرف على محتوى النص"
 },
 "招标附件批量下载 — 分块续传 + 大小/校验双验": {
  "en": "Batch download of tender attachments — chunked resume + size/checksum dual verification",
  "ar": "تنزيل مرفقات المناقصات بالجملة — استئناف مجزأ + تحقق مزدوج من الحجم/المجموع الاختباري"
 },
 "招标文件转询价单 — 生成固定 11 列 Excel": {
  "en": "Convert tender documents to inquiry sheet — generate fixed 11-column Excel",
  "ar": "تحويل مستندات المناقصة إلى جدول استفسار — إنشاء Excel بـ11 عمودًا ثابتًا"
 },
 "产品描述生成器 — FAB 方法生成产品卖点与销售资料": {
  "en": "Product description generator — FAB method for product selling points and sales materials",
  "ar": "مولّد أوصاف المنتجات — طريقة FAB لنقاط البيع ومواد المبيعات"
 },
 "TRADE · ASSISTANT  ///  等待回复": {
  "en": "TRADE · ASSISTANT  ///  Awaiting reply",
  "ar": "TRADE · ASSISTANT  ///  في انتظار الرد"
 },
 "背调、查公司、查域名、查邮箱、due diligence": {
  "en": "Background check, company lookup, domain lookup, email lookup, due diligence",
  "ar": "فحص الخلفية، البحث عن الشركة، البحث عن النطاق، البحث عن البريد، العناية الواجبة"
 },
 "市场分析作战地图 — 认证/关税/关键词/3 秒 Hook": {
  "en": "Market analysis war map — certification/tariffs/keywords/3-second hook",
  "ar": "خريطة تحليل السوق — الشهادات/الرسوم الجمركية/الكلمات المفتاحية/خطاف 3 ثوانٍ"
 },
 "✅ Hermes 升级完成，请点击「🔄 重启」使新版本生效。": {
  "en": "✅ Hermes upgrade complete, please click \"🔄 Restart\" for the new version to take effect.",
  "ar": "✅ اكتملت ترقية Hermes، يرجى النقر على «🔄 إعادة التشغيل» لتفعيل الإصدار الجديد."
 },
 "询盘分析会主持 — 周度复盘/逐人点评/重点询盘/跟进行动表": {
  "en": "Inquiry review meeting host — weekly retrospective/individual feedback/key inquiries/follow-up action table",
  "ar": "ميسّر اجتماع مراجعة الاستفسارات — مراجعة أسبوعية/تقييم فردي/استفسارات رئيسية/جدول إجراءات المتابعة"
 },
 "新客户搜索/加人/开发信发送，目标日均 20-30 个有效触达": {
  "en": "New customer search/add people/send outreach emails, target 20-30 valid touches per day",
  "ar": "البحث عن عملاء جدد/إضافة أشخاص/إرسال رسائل تواصل، الهدف 20-30 تواصلًا فعّالًا يوميًا"
 },
 "Hermes 已升级完成。请点击「重启 Trade」使新版本生效。": {
  "en": "Hermes upgrade complete. Please click \"Restart Trade\" for the new version to take effect.",
  "ar": "اكتملت ترقية Hermes. يرجى النقر على «إعادة تشغيل Trade» لتفعيل الإصدار الجديد."
 },
 "LinkedIn 营销策略与内容（Profile/帖子/InMail）": {
  "en": "LinkedIn marketing strategy and content (Profile/posts/InMail)",
  "ar": "استراتيجية ومحتوى تسويق LinkedIn (الملف الشخصي/المنشورات/InMail)"
 },
 "社媒、Facebook、TikTok、内容日历、social media": {
  "en": "Social media, Facebook, TikTok, content calendar, social media",
  "ar": "وسائل التواصل، Facebook، TikTok، تقويم المحتوى، social media"
 },
 "社媒营销（Facebook/Instagram/TikTok/YouTube）": {
  "en": "Social media marketing (Facebook/Instagram/TikTok/YouTube)",
  "ar": "التسويق عبر وسائل التواصل (Facebook/Instagram/TikTok/YouTube)"
 },
 "使用 web_search 获取实时汇率、大宗商品价格、目标市场新闻，结合昨日对话生成简报": {
  "en": "Use web_search to get real-time exchange rates, commodity prices, and target market news, and generate a briefing with yesterday's conversation",
  "ar": "استخدم web_search للحصول على أسعار الصرف الفورية وأسعار السلع وأخبار السوق المستهدف، وإنشاء موجز بالاستناد إلى محادثة الأمس"
 },
 "项": {
  "en": "Items",
  "ar": "عناصر"
 },
 " 等": {
  "en": " etc",
  "ar": " إلخ"
 },
 "今天": {
  "en": "Today",
  "ar": "اليوم"
 },
 "儿媳": {
  "en": "Daughter-in-law",
  "ar": "زوجة الابن"
 },
 "其他": {
  "en": "Other",
  "ar": "أخرى"
 },
 "叔叔": {
  "en": "Uncle",
  "ar": "عم"
 },
 "哥哥": {
  "en": "Older brother",
  "ar": "الأخ الأكبر"
 },
 "外甥": {
  "en": "Nephew",
  "ar": "ابن الأخت"
 },
 "妈妈": {
  "en": "Mom",
  "ar": "الأم"
 },
 "婆婆": {
  "en": "Mother-in-law",
  "ar": "والدة الزوج"
 },
 "完成": {
  "en": "Complete",
  "ar": "مكتمل"
 },
 "展开": {
  "en": "Expand",
  "ar": "توسيع"
 },
 "德国": {
  "en": "Germany",
  "ar": "ألمانيا"
 },
 "未填": {
  "en": "Not filled",
  "ar": "غير مُعبّأ"
 },
 "父亲": {
  "en": "Father",
  "ar": "الأب"
 },
 "老公": {
  "en": "Husband",
  "ar": "الزوج"
 },
 "财务": {
  "en": "Finance",
  "ar": "المالية"
 },
 "错误": {
  "en": "Error",
  "ar": "خطأ"
 },
 "-内部": {
  "en": "-Internal",
  "ar": "-داخلي"
 },
 "决策人": {
  "en": "Decision maker",
  "ar": "صانع القرار"
 },
 "处理中": {
  "en": "Processing",
  "ar": "قيد المعالجة"
 },
 "导入中": {
  "en": "Importing",
  "ar": "جارٍ الاستيراد"
 },
 "已出货": {
  "en": "Shipped",
  "ar": "تم الشحن"
 },
 "已禁用": {
  "en": "Disabled",
  "ar": "معطّل"
 },
 "拉取中": {
  "en": "Fetching",
  "ar": "جارٍ الجلب"
 },
 "未分级": {
  "en": "Ungraded",
  "ar": "غير مُصنّف"
 },
 "来访人": {
  "en": "Visitor",
  "ar": "الزائر"
 },
 "绑定中": {
  "en": "Binding",
  "ar": "جارٍ الربط"
 },
 "进行中": {
  "en": "In progress",
  "ar": "قيد التنفيذ"
 },
 "高风险": {
  "en": "High risk",
  "ar": "مخاطرة عالية"
 },
 "下次跟进": {
  "en": "Next follow-up",
  "ar": "المتابعة القادمة"
 },
 "今日简报": {
  "en": "Today's brief",
  "ar": "ملخص اليوم"
 },
 "关联人物": {
  "en": "Related people",
  "ar": "الأشخاص ذوو الصلة"
 },
 "切换星标": {
  "en": "Toggle star",
  "ar": "تبديل النجمة"
 },
 "只看星标": {
  "en": "Starred only",
  "ar": "ذوو النجمة فقط"
 },
 "回到底部": {
  "en": "Back to bottom",
  "ar": "العودة إلى الأسفل"
 },
 "客户画像": {
  "en": "Customer profile",
  "ar": "ملف العميل"
 },
 "客户赠送": {
  "en": "Gift from customer",
  "ar": "هدية من العميل"
 },
 "工作清单": {
  "en": "Task list",
  "ar": "قائمة المهام"
 },
 "我方赠送": {
  "en": "Gift from us",
  "ar": "هدية منا"
 },
 "文档管理": {
  "en": "Document management",
  "ar": "إدارة المستندات"
 },
 "未定日期": {
  "en": "No date set",
  "ar": "لم يُحدد التاريخ"
 },
 "正在导入": {
  "en": "Importing",
  "ar": "جارٍ الاستيراد"
 },
 "社媒营销": {
  "en": "Social media marketing",
  "ar": "التسويق عبر وسائل التواصل"
 },
 "订单总额": {
  "en": "Total order amount",
  "ar": "إجمالي قيمة الطلب"
 },
 "跳过向导": {
  "en": "Skip wizard",
  "ar": "تخطي المعالج"
 },
 "重试升级": {
  "en": "Retry upgrade",
  "ar": "إعادة محاولة الترقية"
 },
 "🌐 搜索": {
  "en": "🌐 Search",
  "ar": "🌐 بحث"
 },
 "🧠 回忆": {
  "en": "🧠 Recall",
  "ar": "🧠 استذكار"
 },
 " 项进行中": {
  "en": " items in progress",
  "ar": " عناصر قيد التنفيذ"
 },
 "主联系人 ": {
  "en": "Primary contact ",
  "ar": "جهة الاتصال الرئيسية "
 },
 "关联文档库": {
  "en": "Linked document library",
  "ar": "مكتبة المستندات المرتبطة"
 },
 "合规与支持": {
  "en": "Compliance & support",
  "ar": "الامتثال والدعم"
 },
 "导入中…（": {
  "en": "Importing… (",
  "ar": "جارٍ الاستيراد… ("
 },
 "平台与数据": {
  "en": "Platform & data",
  "ar": "المنصة والبيانات"
 },
 "正在启动…": {
  "en": "Starting…",
  "ar": "جارٍ بدء التشغيل…"
 },
 "连接等待中": {
  "en": "Waiting for connection",
  "ar": "في انتظار الاتصال"
 },
 "；未纳入：": {
  "en": "; Not included: ",
  "ar": "؛ غير مُدرج: "
 },
 " · 索要 ": {
  "en": " · Request ",
  "ar": " · طلب "
 },
 "全部买家类型": {
  "en": "All buyer types",
  "ar": "جميع أنواع المشترين"
 },
 "已关联客户：": {
  "en": "Linked customer: ",
  "ar": "العميل المرتبط: "
 },
 "暂无关联对话": {
  "en": "No linked conversations",
  "ar": "لا توجد محادثات مرتبطة"
 },
 "现在开始吗？": {
  "en": "Start now?",
  "ar": "البدء الآن؟"
 },
 "返回客户详情": {
  "en": "Back to customer details",
  "ar": "العودة إلى تفاصيل العميل"
 },
 "📋 提取文档": {
  "en": "📋 Extract document",
  "ar": "📋 استخراج المستند"
 },
 "[重启] 第 ": {
  "en": "[Restart] No. ",
  "ar": "[إعادة تشغيل] رقم "
 },
 "后台任务 · ": {
  "en": "Background task · ",
  "ar": "مهمة في الخلفية · "
 },
 "批发商/分销商": {
  "en": "Wholesaler/Distributor",
  "ar": "تاجر جملة/موزّع"
 },
 "释放以添加文件": {
  "en": "Release to add files",
  "ar": "أفلت لإضافة الملفات"
 },
 "B2B 平台检查": {
  "en": "B2B platform check",
  "ar": "فحص منصة B2B"
 },
 "其他供应商或竞品": {
  "en": "Other suppliers or competitors",
  "ar": "موردون آخرون أو منافسون"
 },
 "密语至少 4 位": {
  "en": "Passphrase must be at least 4 characters",
  "ar": "يجب أن تكون كلمة المرور 4 أحرف على الأقل"
 },
 "📋 每周复盘报告": {
  "en": "📋 Weekly review report",
  "ar": "📋 تقرير المراجعة الأسبوعية"
 },
 "客户已保存到客户库": {
  "en": "Customer saved to customer library",
  "ar": "تم حفظ العميل في مكتبة العملاء"
 },
 "输入私密备忘录密语": {
  "en": "Enter private memo passphrase",
  "ar": "أدخل كلمة مرور المذكرة الخاصة"
 },
 "切换公司失败，请重试": {
  "en": "Failed to switch company, please retry",
  "ar": "فشل التبديل إلى الشركة، يُرجى المحاولة مرة أخرى"
 },
 "请先勾选同意隐私说明": {
  "en": "Please agree to the privacy notice first",
  "ar": "يُرجى الموافقة على إشعار الخصوصية أولاً"
 },
 "准备升级 Hermes": {
  "en": "Preparing to upgrade Hermes",
  "ar": "جارٍ التحضير لترقية Hermes"
 },
 "💬 评论互动与私信致谢": {
  "en": "💬 Comment engagement & thank-you DMs",
  "ar": "💬 التفاعل بالتعليقات وشكر عبر الرسائل الخاصة"
 },
 "查这家客户的海关进口记录": {
  "en": "Check this customer's customs import records",
  "ar": "الاطلاع على سجلات الاستيراد الجمركية لهذا العميل"
 },
 "切换目标公司失败，请重试。": {
  "en": "Failed to switch target company, please retry.",
  "ar": "فشل التبديل إلى الشركة المستهدفة، يُرجى المحاولة مرة أخرى."
 },
 "未发现同名客户，开始导入…": {
  "en": "No customer with the same name found, starting import…",
  "ar": "لم يُعثر على عميل بنفس الاسم، جارٍ بدء الاستيراد…"
 },
 "例如：德国、美国、中东...": {
  "en": "e.g. Germany, USA, Middle East...",
  "ar": "مثال: ألمانيا، الولايات المتحدة، الشرق الأوسط..."
 },
 "背调 task 面板挂载失败": {
  "en": "Failed to mount background-check task panel",
  "ar": "فشل تحميل لوحة مهمة التحقق من الخلفية"
 },
 "Agent 将按此指令执行...": {
  "en": "The Agent will execute this instruction...",
  "ar": "سينفّذ الوكيل هذا التوجيه..."
 },
 "功能开发中：将在文件管理器中打开": {
  "en": "Feature under development: will open in file manager",
  "ar": "الميزة قيد التطوير: ستُفتح في مدير الملفات"
 },
 "SITE VISIT / 验厂资料": {
  "en": "SITE VISIT / Factory audit documents",
  "ar": "زيارة الموقع / مستندات تدقيق المصنع"
 },
 "未安装 Hermes（AI 引擎）": {
  "en": "Hermes (AI engine) not installed",
  "ar": "Hermes (محرك الذكاء الاصطناعي) غير مُثبّت"
 },
 "Hermes 升级 · UPGRADE": {
  "en": "Hermes upgrade · UPGRADE",
  "ar": "ترقية Hermes · UPGRADE"
 },
 "销冠经验、销售SOP、话术库、新人培训": {
  "en": "Top-sales experience, sales SOP, script library, onboarding training",
  "ar": "خبرة أفضل المبيعات، إجراءات المبيعات القياسية، مكتبة النصوص، تدريب المبتدئين"
 },
 "平台诊断、阿里国际站、关键词优化、店铺诊断": {
  "en": "Platform diagnostics, Alibaba.com, keyword optimization, store diagnostics",
  "ar": "تشخيص المنصة، علي بابا الدولية، تحسين الكلمات المفتاحية، تشخيص المتجر"
 },
 "【此技能已禁用】发邮件、群发、SMTP 发送": {
  "en": "[This skill is disabled] Send email, bulk send, SMTP sending",
  "ar": "[هذه المهارة معطّلة] إرسال البريد، الإرسال الجماعي، الإرسال عبر SMTP"
 },
 "招标邮件、邮件归档、抓邮件、补附件、监控邮箱": {
  "en": "Tender emails, email archiving, email fetching, attachment recovery, mailbox monitoring",
  "ar": "رسائل العطاءات، أرشفة البريد، جلب الرسائل، استكمال المرفقات، مراقبة صندوق البريد"
 },
 "/// SURVEILLANCE · 监视画面": {
  "en": "/// SURVEILLANCE · Monitoring feed",
  "ar": "/// SURVEILLANCE · شاشة المراقبة"
 },
 "招标信息抓取与筛选 — 按关键词定时搜招标公告": {
  "en": "Tender info scraping & filtering — scheduled tender search by keywords",
  "ar": "جلب معلومات العطاءات وتصفيتها — بحث مجدول عن إعلانات العطاءات حسب الكلمات المفتاحية"
 },
 "展会全流程管理 — 展前邀约、展中跟进、展后转化": {
  "en": "Full exhibition management — pre-show invitations, on-site follow-up, post-show conversion",
  "ar": "إدارة المعرض من البداية إلى النهاية — دعوات ما قبل المعرض، متابعة أثناءه، تحويل ما بعده"
 },
 "Reddit 社区互动 — 通过专业评论建立信任引流": {
  "en": "Reddit community engagement — build trust and drive traffic via expert comments",
  "ar": "التفاعل في مجتمع Reddit — بناء الثقة وجذب الزيارات عبر تعليقات الخبراء"
 },
 "按「待跟进优先」· 逾期 → 今天 → 下次跟进日期": {
  "en": "By 'Follow-up first' · Overdue → Today → Next follow-up date",
  "ar": "حسب «أولوية المتابعة» · متأخر → اليوم → تاريخ المتابعة القادم"
 },
 "开发信仿写与再创作 — 分析优秀邮件样本，学结构学风格": {
  "en": "Cold email imitation & rewriting — analyze sample emails, learn structure and style",
  "ar": "محاكاة رسائل التواصل وإعادة صياغتها — تحليل نماذج الرسائل الجيدة، تعلّم البنية والأسلوب"
 },
 "Trade 需要更新版本的 Hermes，正在准备升级…": {
  "en": "Trade needs a newer version of Hermes, preparing upgrade…",
  "ar": "يحتاج Trade إلى إصدار أحدث من Hermes، جارٍ التحضير للترقية…"
 },
 "TRADE · ONBOARDING  ///  等待回复": {
  "en": "TRADE · ONBOARDING  ///  Awaiting reply",
  "ar": "TRADE · ONBOARDING  ///  في انتظار الرد"
 },
 "生成报价单、生成合同、做 PPT、generate doc": {
  "en": "Generate quotes, generate contracts, create PPT, generate doc",
  "ar": "إنشاء عروض الأسعار، إنشاء العقود، إعداد PPT، توليد مستند"
 },
 "全自动客户开发、一键开发、auto customer dev": {
  "en": "Fully automated customer development, one-click development, auto customer dev",
  "ar": "تطوير العملاء الآلي بالكامل، تطوير بنقرة واحدة، auto customer dev"
 },
 "Reddit、社区评论、reddit comment、专业评论": {
  "en": "Reddit, community comments, reddit comment, expert comments",
  "ar": "Reddit، تعليقات المجتمع، reddit comment، تعليقات الخبراء"
 },
 "B2B 冷 outreach 邮件撰写（开发信/推广信/跟进信）": {
  "en": "B2B cold outreach email writing (prospecting/promo/follow-up)",
  "ar": "كتابة رسائل B2B الباردة (رسائل تواصل/ترويج/متابعة)"
 },
 "销冠经验封装器 — SOP/话术库/新人路线/避坑清单/钩子武器库": {
  "en": "Top-sales playbook packager — SOP/script library/onboarding path/pitfall checklist/hook arsenal",
  "ar": "حزمة خبرة أفضل المبيعات — إجراءات قياسية/مكتبة نصوص/مسار المبتدئين/قائمة الأخطاء الشائعة/مكتبة العبارات الجذابة"
 },
 "外贸 B2B 短视频脚本生成（TikTok/Shorts/Reels）": {
  "en": "B2B short-video script generation (TikTok/Shorts/Reels)",
  "ar": "توليد نصوص فيديوهات قصيرة للتجارة B2B (TikTok/Shorts/Reels)"
 },
 "LinkedIn、领英、linkedin marketing、InMail": {
  "en": "LinkedIn, LinkedIn marketing, InMail",
  "ar": "LinkedIn، تسويق LinkedIn، InMail"
 },
 "多通道客户搜索与开发（Google Maps/LinkedIn/Facebook）": {
  "en": "Multi-channel customer search & development (Google Maps/LinkedIn/Facebook)",
  "ar": "البحث عن العملاء وتطويرهم عبر قنوات متعددة (Google Maps/LinkedIn/Facebook)"
 },
 "Trade 需要 Hermes 才能聊天。按下面的步骤安装并配置模型，然后重新打开 Trade。": {
  "en": "Trade needs Hermes to chat. Follow the steps below to install and configure the model, then reopen Trade.",
  "ar": "يحتاج Trade إلى Hermes للدردشة. اتّبع الخطوات أدناه لتثبيت النموذج وإعداده، ثم أعد فتح Trade."
 },
 "生成今日 B2B 平台检查清单：新询盘数量、待回复询盘、产品排名变化、需要发布的产品数量。给出具体可执行的操作步骤。": {
  "en": "Generate today's B2B platform checklist: number of new inquiries, inquiries awaiting reply, product ranking changes, products to publish. Provide specific, actionable steps.",
  "ar": "أنشئ قائمة فحص منصة B2B لليوم: عدد الاستفسارات الجديدة، الاستفسارات التي تنتظر الرد، تغيّرات ترتيب المنتجات، عدد المنتجات المطلوب نشرها. قدّم خطوات عملية محددة."
 },
 "高": {
  "en": "High",
  "ar": "مرتفع"
 },
 " 项": {
  "en": " items",
  "ar": " عناصر"
 },
 "仓储": {
  "en": "Warehousing",
  "ar": "التخزين"
 },
 "儿子": {
  "en": "Son",
  "ar": "الابن"
 },
 "出错": {
  "en": "Error",
  "ar": "خطأ"
 },
 "取消": {
  "en": "Cancel",
  "ar": "إلغاء"
 },
 "喜好": {
  "en": "Preferences",
  "ar": "التفضيلات"
 },
 "太太": {
  "en": "Wife",
  "ar": "الزوجة"
 },
 "妹妹": {
  "en": "Younger sister",
  "ar": "الأخت الصغرى"
 },
 "媳妇": {
  "en": "Daughter-in-law",
  "ar": "الكنة"
 },
 "宝宝": {
  "en": "Baby",
  "ar": "الطفل"
 },
 "岳母": {
  "en": "Mother-in-law",
  "ar": "أم الزوجة"
 },
 "息子": {
  "en": "Son",
  "ar": "الابن"
 },
 "未知": {
  "en": "Unknown",
  "ar": "غير معروف"
 },
 "父母": {
  "en": "Parents",
  "ar": "الوالدان"
 },
 "老婆": {
  "en": "Wife",
  "ar": "الزوجة"
 },
 "超时": {
  "en": "Timeout",
  "ar": "انتهاء المهلة"
 },
 "阿姨": {
  "en": "Aunt",
  "ar": "العمة"
 },
 "东南亚": {
  "en": "Southeast Asia",
  "ar": "جنوب شرق آسيا"
 },
 "分析中": {
  "en": "Analyzing",
  "ar": "جارٍ التحليل"
 },
 "外甥女": {
  "en": "Niece",
  "ar": "ابنة الأخت"
 },
 "已下单": {
  "en": "Ordered",
  "ar": "تم الطلب"
 },
 "已创建": {
  "en": "Created",
  "ar": "تم الإنشاء"
 },
 "待确认": {
  "en": "Pending confirmation",
  "ar": "بانتظار التأكيد"
 },
 "招投标": {
  "en": "Tendering",
  "ar": "المناقصات والعطاءات"
 },
 "未命中": {
  "en": "No match",
  "ar": "لا توجد مطابقة"
 },
 "查询 ": {
  "en": "Query ",
  "ar": "استعلام "
 },
 "维保商": {
  "en": "Maintenance provider",
  "ar": "مزوّد الصيانة"
 },
 "逾期 ": {
  "en": "Overdue ",
  "ar": "متأخر "
 },
 " 个文件": {
  "en": " files",
  "ar": " ملفات"
 },
 "不可用（": {
  "en": "Unavailable (",
  "ar": "غير متاح ("
 },
 "保存中…": {
  "en": "Saving…",
  "ar": "جارٍ الحفظ…"
 },
 "关联失败": {
  "en": "Association failed",
  "ar": "فشل الربط"
 },
 "创建失败": {
  "en": "Creation failed",
  "ar": "فشل الإنشاء"
 },
 "只看逾期": {
  "en": "Overdue only",
  "ar": "المتأخرة فقط"
 },
 "定时任务": {
  "en": "Scheduled tasks",
  "ar": "المهام المجدولة"
 },
 "客户管理": {
  "en": "Customer Management",
  "ar": "إدارة العملاء"
 },
 "对外说明": {
  "en": "External notes",
  "ar": "ملاحظات خارجية"
 },
 "已确认 ": {
  "en": "Confirmed ",
  "ar": "تم التأكيد "
 },
 "所有类型": {
  "en": "All types",
  "ar": "كل الأنواع"
 },
 "新建客户": {
  "en": "New Customer",
  "ar": "عميل جديد"
 },
 "未知原因": {
  "en": "Unknown reason",
  "ar": "سبب غير معروف"
 },
 "海关数据": {
  "en": "Customs Data",
  "ar": "بيانات الجمارك"
 },
 "编辑客户": {
  "en": "Edit Customer",
  "ar": "تعديل العميل"
 },
 "认证资质": {
  "en": "Certifications",
  "ar": "الشهادات والمؤهلات"
 },
 "还没到点": {
  "en": "Not due yet",
  "ar": "لم يحن الوقت بعد"
 },
 "金额待谈": {
  "en": "Amount to be discussed",
  "ar": "المبلغ قيد التفاوض"
 },
 "💻 代码": {
  "en": "💻 Code",
  "ar": "💻 الكود"
 },
 " 上传导入": {
  "en": " Upload & import",
  "ar": " رفع واستيراد"
 },
 "QQ 邮箱": {
  "en": "QQ Mail",
  "ar": "بريد QQ"
 },
 "主要联系人": {
  "en": "Primary contact",
  "ar": "جهة الاتصال الرئيسية"
 },
 "关联比对中": {
  "en": "Matching associations",
  "ar": "جارٍ مطابقة الارتباطات"
 },
 "客户与销售": {
  "en": "Customers & Sales",
  "ar": "العملاء والمبيعات"
 },
 "导入失败：": {
  "en": "Import failed:",
  "ar": "فشل الاستيراد:"
 },
 "待跟进优先": {
  "en": "Follow-up priority",
  "ar": "أولوية المتابعة"
 },
 "正在查询：": {
  "en": "Querying:",
  "ar": "جارٍ الاستعلام:"
 },
 "选择文档库": {
  "en": "Select document library",
  "ar": "اختر مكتبة المستندات"
 },
 "👁️ 图像": {
  "en": "👁️ Image",
  "ar": "👁️ صورة"
 },
 ")，刷新页面": {
  "en": "), refresh the page",
  "ar": ")، حدّث الصفحة"
 },
 "双击编辑标题": {
  "en": "Double-click to edit title",
  "ar": "انقر مرتين لتعديل العنوان"
 },
 "已完成 · ": {
  "en": "Completed · ",
  "ar": "مكتمل · "
 },
 "暂无订单记录": {
  "en": "No order records yet",
  "ar": "لا توجد سجلات طلبات بعد"
 },
 "生成长图失败": {
  "en": "Failed to generate long image",
  "ar": "فشل توليد الصورة الطويلة"
 },
 "，客户类型=": {
  "en": ", customer type=",
  "ar": "، نوع العميل="
 },
 "🔎 搜索文件": {
  "en": "🔎 Search files",
  "ar": "🔎 البحث في الملفات"
 },
 "❌ 更新失败：": {
  "en": "❌ Update failed:",
  "ar": "❌ فشل التحديث:"
 },
 "商机阶段 · ": {
  "en": "Opportunity stage · ",
  "ar": "مرحلة الفرصة · "
 },
 "点击复制提示词": {
  "en": "Click to copy prompt",
  "ar": "انقر لنسخ الموجه"
 },
 "重建没有启动。": {
  "en": "Rebuild did not start.",
  "ar": "لم يبدأ إعادة البناء."
 },
 "← 返回客户列表": {
  "en": "← Back to customer list",
  "ar": "← العودة إلى قائمة العملاء"
 },
 "加载客户画像失败": {
  "en": "Failed to load customer profile",
  "ar": "فشل تحميل ملف العميل"
 },
 "已合并到已有公司": {
  "en": "Merged into an existing company",
  "ar": "تم الدمج في شركة موجودة"
 },
 "🛑 已停止生成。": {
  "en": "🛑 Generation stopped.",
  "ar": "🛑 تم إيقاف التوليد."
 },
 "帮我找客户。产品=": {
  "en": "Find customers for me. Product=",
  "ar": "ساعدني في العثور على عملاء. المنتج="
 },
 "📧 邮件处理与跟进": {
  "en": "📧 Email handling & follow-up",
  "ar": "📧 معالجة البريد والمتابعة"
 },
 "升级等待面板挂载失败": {
  "en": "Failed to mount upgrade waiting panel",
  "ar": "فشل تحميل لوحة انتظار الترقية"
 },
 "请先点击一个聊天入口": {
  "en": "Please click a chat entry first",
  "ar": "يرجى النقر على مدخل المحادثة أولاً"
 },
 "密语已失效，请重新输入": {
  "en": "Passphrase expired, please re-enter",
  "ar": "انتهت صلاحية كلمة المرور، يرجى إعادة الإدخال"
 },
 " 就能闭合 value=": {
  "en": " closes value=",
  "ar": " يُغلق value="
 },
 "正在导入，请勿关闭页面…": {
  "en": "Importing, please do not close the page…",
  "ar": "جارٍ الاستيراد، يرجى عدم إغلاق الصفحة…"
 },
 "只显示邮箱地址，不读取邮箱": {
  "en": "Show email addresses only; do not read email content",
  "ar": "عرض عناوين البريد فقط دون قراءة محتوى البريد"
 },
 "未完成 · 已保存部分结果": {
  "en": "Incomplete · Partial results saved",
  "ar": "غير مكتمل · تم حفظ نتائج جزئية"
 },
 "发布 LinkedIn 内容": {
  "en": "Publish LinkedIn content",
  "ar": "نشر محتوى على LinkedIn"
 },
 "客户开发 · LEAD GEN": {
  "en": "Lead Generation · LEAD GEN",
  "ar": "تطوير العملاء · LEAD GEN"
 },
 "B2B 外贸助手 · TRADE": {
  "en": "B2B Trade Assistant · TRADE",
  "ar": "مساعد التجارة B2B · TRADE"
 },
 "导入链接已失效，请重新选择文件。": {
  "en": "The import link has expired, please select the file again.",
  "ar": "انتهت صلاحية رابط الاستيراد، يرجى اختيار الملف مرة أخرى."
 },
 "分析客户资料，生成开发信和跟进序列": {
  "en": "Analyze customer profiles, generate outreach emails and follow-up sequences",
  "ar": "تحليل بيانات العملاء وتوليد رسائل التوعية وتسلسلات المتابعة"
 },
 "🔍 精准加人 (LinkedIn)": {
  "en": "🔍 Targeted connection requests (LinkedIn)",
  "ar": "🔍 إضافة جهات اتصال مستهدفة (LinkedIn)"
 },
 "TRADE · 内部资料 · 请勿外传": {
  "en": "TRADE · Internal use only · Do not distribute",
  "ar": "TRADE · للاستخدام الداخلي · يرجى عدم النشر"
 },
 "展会、参展、广交会、trade show": {
  "en": "Exhibitions, attending fairs, Canton Fair, trade show",
  "ar": "المعارض، المشاركة في المعارض، معرض كانتون، trade show"
 },
 "新公司、部署、全套方案、怎么开始、首次设置": {
  "en": "New company, deployment, full solution, how to start, first-time setup",
  "ar": "شركة جديدة، نشر، حل متكامل، كيفية البدء، الإعداد الأولي"
 },
 "下载招标文件、断点续传、分块下载、按清单下载": {
  "en": "Download tender documents, resumable download, chunked download, download by list",
  "ar": "تنزيل مستندات المناقصة، الاستئناف من نقطة التوقف، التنزيل المجزأ، التنزيل حسب القائمة"
 },
 "根据需求描述自动创建新的 B2B Skill": {
  "en": "Automatically create a new B2B Skill from a requirement description",
  "ar": "إنشاء B2B Skill جديد تلقائياً بناءً على وصف المتطلبات"
 },
 "⚠️ 连接中断，未收到回复。请检查网络后重试。": {
  "en": "⚠️ Connection interrupted, no response received. Please check your network and retry.",
  "ar": "⚠️ انقطع الاتصال، لم يتم استلام رد. يرجى التحقق من الشبكة والمحاولة مرة أخرى."
 },
 "按清单归档、按编号匹配、图纸匹配、招标清单匹配": {
  "en": "Archive by list, match by number, drawing matching, tender list matching",
  "ar": "الأرشفة حسب القائمة، المطابقة حسب الرقم، مطابقة الرسومات، مطابقة قائمة المناقصة"
 },
 "招标邮件与附件归档 — 从邮箱拉取，全程不置已读": {
  "en": "Tender email & attachment archiving — fetched from mailbox without marking as read",
  "ar": "أرشفة رسائل المناقصات ومرفقاتها — تُجلب من صندوق البريد دون تحديدها كمقروءة"
 },
 "three.js 背景初始化失败，已关闭 3D 特效": {
  "en": "Failed to initialize three.js background; 3D effects disabled",
  "ar": "فشل تهيئة خلفية three.js، تم تعطيل تأثيرات 3D"
 },
 "新公司全套部署方案（公司介绍/产品/营销/竞品分析）": {
  "en": "Full deployment plan for a new company (company intro / products / marketing / competitor analysis)",
  "ar": "خطة نشر متكاملة لشركة جديدة (نبذة عن الشركة / المنتجات / التسويق / تحليل المنافسين)"
 },
 "本地文档分析与提取（PDF/Word/Excel 等）": {
  "en": "Local document analysis and extraction (PDF/Word/Excel, etc.)",
  "ar": "تحليل المستندات المحلية واستخراج البيانات (PDF/Word/Excel إلخ)"
 },
 "买家画像、按角色写、给采购写、buyer persona": {
  "en": "Buyer personas, role-based writing, writing for procurement, buyer persona",
  "ar": "ملفات المشترين، الكتابة حسب الدور، الكتابة لقسم المشتريات، buyer persona"
 },
 "全自动客户开发流水线 — 搜索→背调→评分→写信→交付草稿": {
  "en": "Fully automated lead generation pipeline — search → background check → scoring → email drafting → draft delivery",
  "ar": "خط أنابيب تلقائي بالكامل لتطوير العملاء — البحث → فحص الخلفية → التقييم → كتابة الرسائل → تسليم المسودات"
 },
 "短视频、视频脚本、TikTok脚本、short video": {
  "en": "Short videos, video scripts, TikTok scripts, short video",
  "ar": "فيديوهات قصيرة، نصوص فيديو، نصوص TikTok، short video"
 },
 "导入任务已失效（服务可能重启过），请刷新页面后检查公司列表。": {
  "en": "The import task has expired (the service may have restarted); please refresh the page and check the company list.",
  "ar": "انتهت صلاحية مهمة الاستيراد (ربما أُعيد تشغيل الخدمة)، يرجى تحديث الصفحة ثم التحقق من قائمة الشركات."
 },
 "仿写开发信、按照样本、模仿邮件、email imitation": {
  "en": "Imitating outreach emails, based on samples, mimicking emails, email imitation",
  "ar": "تقليد رسائل التوعية، بناءً على عينات، تقليد البريد، email imitation"
 },
 "销售管线策略 — 30 天跟进表 + KPI 追踪 + 健康度看板": {
  "en": "Sales pipeline strategy — 30-day follow-up plan + KPI tracking + health dashboard",
  "ar": "استراتيجية خط المبيعات — خطة متابعة 30 يوماً + تتبع KPI + لوحة الصحة"
 },
 "找客户、开发客户、lead generation、cold email": {
  "en": "Find customers, develop customers, lead generation, cold email",
  "ar": "العثور على العملاء، تطوير العملاء، lead generation، cold email"
 },
 "搜索关键词+职位，发送连接请求+Add Note，目标 30-50 人/天": {
  "en": "Search keywords + job titles, send connection requests + Add Note, target 30-50 people/day",
  "ar": "ابحث بالكلمات المفتاحية + المسميات الوظيفية، أرسل طلبات اتصال + Add Note، الهدف 30-50 شخصاً/يوم"
 },
 "客户背景调查（6 层检测：WHOIS/邮箱/制裁/技术栈/LinkedIn/评分）": {
  "en": "Customer background check (6 layers: WHOIS / email / sanctions / tech stack / LinkedIn / scoring)",
  "ar": "فحص خلفية العميل (6 طبقات: WHOIS / البريد / العقوبات / البنية التقنية / LinkedIn / التقييم)"
 },
 "请使用 cronjob 工具列出并删除所有现有的 cron 定时任务。逐一删除，完成后告知结果。": {
  "en": "Please use the cronjob tool to list and delete all existing cron scheduled tasks. Delete them one by one and report the result when done.",
  "ar": "يرجى استخدام أداة cronjob لعرض وحذف جميع مهام cron المجدولة الحالية. احذفها واحدة تلو الأخرى وأبلغ بالنتيجة عند الانتهاء."
 },
 "导出包包含客户资料、对话、记忆和 Agent 身份，不包含桌面资料库文件（需自行拷贝），且未加密。请妥善保管。继续导出？": {
  "en": "The export package includes customer profiles, conversations, memory and Agent identity; it does not include desktop knowledge-base files (copy those separately) and is not encrypted. Please store it securely. Continue exporting?",
  "ar": "تتضمن حزمة التصدير ملفات العملاء والمحادثات والذاكرة وهوية Agent، ولا تتضمن ملفات قاعدة المعرفة على سطح المكتب (يجب نسخها يدوياً)، وهي غير مشفرة. يرجى حفظها بأمان. هل تتابع التصدير؟"
 }
};
function _term(k) { return HTML_TERMS[k] || JS_TERMS[k]; }
var _origNodeText = new WeakMap();
function _translateStaticHtml() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while ((node = walker.nextNode())) {
        var raw = node.nodeValue, key = raw.trim();
        if (!key) continue;
        if (!_origNodeText.has(node) && _term(key)) _origNodeText.set(node, raw);
        var orig = _origNodeText.get(node);
        if (orig === undefined || !_term(orig.trim())) continue;
        var term = _term(orig.trim());
        var val = currentLang === 'ar' ? (term.ar || term.en) : term.en;
        if (node.nodeValue !== val) node.nodeValue = val;
    }
    ['title','aria-label','placeholder'].forEach(function(a) {
        document.querySelectorAll('[' + a + ']').forEach(function(el) {
            var v = el.getAttribute(a); if (!v) return;
            var ok = 'data-orig-' + a, o = el.getAttribute(ok);
            if (o === null && _term(v.trim())) { el.setAttribute(ok, v); o = v; }
            if (o === null || !_term(o.trim())) return;
            var term = _term(o.trim());
            var val = currentLang === 'ar' ? (term.ar || term.en) : term.en;
            if (el.getAttribute(a) !== val) el.setAttribute(a, val);
        });
    });
}

function switchLang(lang) {
    if (lang !== 'ar' && lang !== 'en') lang = 'en';
    if (lang === currentLang) return;
    currentLang = lang;
    try { localStorage.setItem('trade_lang', lang); } catch(_) {}
    // 完整刷新 UI
    _applyLanguage();
    // Template labels are resolved at load time — rebuild them for the new language
    if (typeof buildTaskTemplates === 'function' && typeof TASK_TEMPLATES !== 'undefined') {
        TASK_TEMPLATES = buildTaskTemplates();
    }
    // Cron template names are resolved at load time — redraw the active Cron view
    if (typeof currentView !== 'undefined' && currentView === 'tasks' &&
        typeof renderTasksViewInto === 'function') {
        var ct = document.getElementById('main-content');
        if (ct) renderTasksViewInto(ct);
    }
}

function initLang() {
    try { currentLang = localStorage.getItem('trade_lang') || 'en'; } catch(_) { currentLang = 'en'; }
    // 中文已停用：旧客户端可能还存着 'zh'，统一回落到英文，避免整个界面回退成
    // 原始 key（字典里已经没有 zh 了）。
    if (currentLang !== 'ar' && currentLang !== 'en') currentLang = 'en';
    try { localStorage.setItem('trade_lang', currentLang); } catch(_) {}
    var sel = document.getElementById('lang-select');
    if (sel) sel.value = currentLang;
    _applyLanguage();
}

function _applyLanguage() {
    // 0. 文档级语言与方向（阿拉伯语需要 RTL 布局）
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    // 1. 侧边栏
    _updateSidebarLabels();
    // 2. 公司选择器
    var cs = document.getElementById('company-select');
    if (cs && cs.options[0]) cs.options[0].text = t('company.select');
    var addBtn = document.querySelector('.csel-row button');
    if (addBtn) { addBtn.title = t('company.add'); addBtn.textContent = '+'; }
    // 3. Footer 按钮 —— 图标（textContent）写在 HTML 里，这里只填悬停提示。
    //    早期把图标和文字一起塞进 i18n（'⬆️ 系统更新'），改图标要同步改两份翻译；
    //    现在翻译只管文字。
    var map = {
        'system-update-btn': 'footer.update', 'system-restart-btn': 'footer.restart',
        'copilot-settings-btn': 'footer.copilot',
        'skills-help-btn': 'footer.skills', 'skills-update-btn': 'footer.skills_update',
        'upgrade-help-btn': 'footer.upgrade',
        'onboarding-btn': 'footer.onboarding',
        'start-btn': 'start.button',
    };
    for (var id in map) {
        var b = document.getElementById(id);
        if (b) b.setAttribute('data-tip', t(map[id]));
    }
    if (typeof window.refreshThemeToggle === 'function') window.refreshThemeToggle();
    // 4. 静态 modal 文本更新
    _updateStaticModals();
    // 4b. 语言切换时重建视图缓存：聊天输入框等由 langText() 生成，
    //     仅靠 navToView 复用缓存会残留旧语言文案。
    if (typeof viewCache !== 'undefined') {
        Object.keys(viewCache).forEach(function (k) { delete viewCache[k]; });
    }
    // 5. 重新渲染当前视图
    if (currentView === 'chat') {
        navToView('chat', currentChatContext, t('nav.' + currentChatContext));
    } else {
        navToView(currentView);
    }
    // 6. 更新页面标题
    document.title = currentLang === 'ar' ? 'Trade AI Assistant — مساعد المبيعات الذكي'
        : 'Trade AI Assistant';
    // 7. 用量文案随语言刷新（公司未选时函数内部自行隐藏）
    loadUsageToday();
    // 7b. 顶栏轮播状态与右栏 KPI 也含文案，语言切换后需重刷
    if (typeof applyStatusText === 'function') applyStatusText();
    if (typeof loadTodayBrief === 'function') loadTodayBrief(true);
    // 8. 静态 HTML 文案（含动态渲染节点）
    _translateStaticHtml();
    // 9. START onboarding modal/button (rendered by start.js via t())
    if (typeof refreshStartI18n === 'function') refreshStartI18n();
}

function _updateSidebarLabels() {
    var sectionKeys = ['nav.workbench', 'nav.outreach', 'nav.sales', 'nav.tools', 'nav.hist'];
    document.querySelectorAll('.nav-section-title').forEach(function(el, i) {
        if (i < sectionKeys.length) el.textContent = t(sectionKeys[i]);
    });
    var ctxMap = {
        'daily':'nav.daily','lead':'nav.lead','platform':'nav.platform',
        'social':'nav.social','linkedin':'nav.linkedin','customs':'nav.customs',
        'docs':'nav.docs','docgen':'nav.docgen','osint':'nav.osint',
    };
    var viewMap = {'customers':'nav.customers','mailboxes':'nav.mailboxes','tasks':'nav.tasks','history':'nav.history'};
    document.querySelectorAll('.nav-item').forEach(function(el) {
        var ctx = el.getAttribute('data-chat-context');
        var view = el.getAttribute('data-view');
        var key = (ctx && ctxMap[ctx]) || (view && viewMap[view]);
        if (key) {
            var label = el.querySelector('.nav-label');
            if (label) label.textContent = t(key);
            if (ctx && view === 'chat') {
                // O-17：不再动态写 onclick（CSP script-src-attr 'none'），
                // 改更新 data-args，语言切换时导航名一起翻译
                el.setAttribute('data-act', 'navToView');
                el.setAttribute('data-args', JSON.stringify(['chat', ctx, t(key)]));
            }
        }
    });
    if (currentView === 'chat') currentChatName = t('nav.' + currentChatContext);
}

function _updateStaticModals() {
    // Company modal
    var cm = document.getElementById('company-modal');
    if (cm) {
        var h3 = cm.querySelector('h3'); if (h3) h3.textContent = t('modal.co.title');
        var tb1 = document.getElementById('tab-btn-companies'); if (tb1) tb1.textContent = t('modal.co.tab_list');
        var tb2 = document.getElementById('tab-btn-identity'); if (tb2) tb2.textContent = t('modal.co.tab_identity');
        var h4 = cm.querySelector('#tab-companies h4'); if (h4) h4.textContent = t('modal.co.add_title');
        var lbls = cm.querySelectorAll('label');
        lbls.forEach(function(l) {
            var f = l.getAttribute('for');
            if (f === 'co-name') l.textContent = t('modal.co.name');
            else if (f === 'co-slug') l.textContent = t('modal.co.slug');
            else if (f === 'co-contact-name') l.textContent = t('modal.co.contact');
            else if (f === 'co-contact-email') l.textContent = t('modal.co.email');
            else if (f === 'co-website') l.textContent = t('modal.co.website');
            else if (f === 'identity-editor') l.textContent = t('modal.co.identity_label');
        });
        var inps = cm.querySelectorAll('input');
        inps.forEach(function(inp) {
            if (inp.id === 'co-name') inp.placeholder = t('modal.co.name_ph');
            else if (inp.id === 'co-slug') { inp.placeholder = t('modal.co.slug_ph'); inp.title = t('modal.co.slug_tt'); }
            else if (inp.id === 'co-contact-name') inp.placeholder = t('modal.co.contact_ph');
        });
        var importLbl = document.getElementById('co-import-label');
        if (importLbl) importLbl.textContent = t('modal.co.import');
        var identityDesc = cm.querySelector('#tab-identity > p');
        if (identityDesc) identityDesc.textContent = t('modal.co.identity_desc');
        var ta = cm.querySelector('#identity-editor'); if (ta) ta.placeholder = t('modal.co.identity_ph');
        var cmBtns = {
            'co-btn-close-list': t('btn.close'),
            'co-btn-close-identity': t('btn.close'),
            'co-btn-create': t('modal.co.create'),
            'co-btn-save-identity': t('btn.save')
        };
        Object.keys(cmBtns).forEach(function (id) {
            var b = document.getElementById(id); if (b) b.textContent = cmBtns[id];
        });
    }
    // Customer modal
    var cum = document.getElementById('customer-modal');
    if (cum) {
        var ch3 = cum.querySelector('h3'); if (ch3 && !ch3.textContent.includes('编辑') && !ch3.textContent.includes('Edit')) ch3.textContent = t('modal.cust.title');
        var clbls = cum.querySelectorAll('label');
        clbls.forEach(function(l) {
            var f = l.getAttribute('for');
            var m = {'cust-name':'modal.cust.name','cust-contact':'modal.cust.contact','cust-title':'modal.cust.title_f',
                'cust-country':'modal.cust.country','cust-email':'modal.cust.email','cust-phone':'modal.cust.phone',
                'cust-whatsapp':'modal.cust.whatsapp','cust-linkedin':'modal.cust.linkedin','cust-website':'modal.cust.website',
                'cust-tier':'modal.cust.tier','cust-buyer-type':'modal.cust.buyer','cust-main-category':'modal.cust.category',
                'cust-backup-email':'modal.cust.backup_email','cust-match-score':'modal.cust.score',
                'cust-note':'modal.cust.note','cust-follow-up-note':'modal.cust.follow'};
            if (m[f]) l.textContent = t(m[f]);
        });
        var cpls = cum.querySelectorAll('input[placeholder]');
        cpls.forEach(function(inp) {
            if (inp.id === 'cust-name') inp.placeholder = t('modal.cust.name_ph');
            else if (inp.id === 'cust-contact') inp.placeholder = t('modal.cust.contact_ph');
            else if (inp.id === 'cust-country') inp.placeholder = t('modal.cust.country_ph');
        });
        var cta = cum.querySelector('#cust-note'); if (cta) cta.placeholder = t('modal.cust.note_ph');
        var cfa = cum.querySelector('#cust-follow-up-note'); if (cfa) cfa.placeholder = t('modal.cust.follow_ph');
        var csels = cum.querySelectorAll('select');
        csels.forEach(function(s) {
            if (s.id === 'cust-tier' && s.options[0]) s.options[0].text = t('modal.cust.tier_none');
            if (s.id === 'cust-buyer-type' && s.options[0]) s.options[0].text = t('modal.cust.buyer_none');
            if (s.id === 'cust-match-score' && s.options[0]) s.options[0].text = t('modal.cust.score_none');
        });
        var cbtns = cum.querySelectorAll('.form-actions button');
        cbtns.forEach(function(b) {
            if (b.textContent.includes('取消') || b.textContent.includes('Cancel')) b.textContent = t('btn.cancel');
            else if (b.textContent.includes('保存') || b.textContent.includes('Save')) b.textContent = t('btn.save');
        });
    }
    // Library modal
    var lm = document.getElementById('library-modal');
    if (lm) {
        var lh3 = lm.querySelector('h3'); if (lh3) lh3.textContent = t('modal.lib.title');
        var lp = lm.querySelector('p'); if (lp) lp.textContent = t('modal.lib.desc');
        var llbls = lm.querySelectorAll('label');
        llbls.forEach(function(l) {
            var f = l.getAttribute('for');
            if (f === 'lib-name') l.textContent = t('modal.lib.name');
            else if (f === 'lib-path') l.textContent = t('modal.lib.path');
            else if (f === 'lib-desc') l.textContent = t('modal.lib.notes');
        });
        var lips = lm.querySelectorAll('input');
        lips.forEach(function(inp) {
            if (inp.id === 'lib-name') inp.placeholder = t('modal.lib.name_ph');
            else if (inp.id === 'lib-path') inp.placeholder = t('modal.lib.path_ph');
            else if (inp.id === 'lib-desc') inp.placeholder = t('modal.lib.notes_ph');
        });
        var lhint = lm.querySelector('.hint'); if (lhint) lhint.textContent = t('modal.lib.path_hint');
        var lbtns = lm.querySelectorAll('.form-actions button');
        lbtns.forEach(function(b) {
            if (b.textContent.includes('取消') || b.textContent.includes('Cancel')) b.textContent = t('btn.cancel');
            else if (b.textContent.includes('添加') || b.textContent.includes('Add')) b.textContent = t('modal.lib.create');
        });
    }
    // Upgrade help modal
    var um = document.getElementById('upgrade-help-modal');
    if (um) {
        var uh3 = um.querySelector('h3'); if (uh3) uh3.textContent = t('modal.upgrade.title');
        var btns = um.querySelectorAll('.form-actions button');
        btns.forEach(function(b) { b.textContent = t('btn.close'); });
    }
    // Skills help modal
    var sm = document.getElementById('skills-help-modal');
    if (sm) {
        var sh3 = sm.querySelector('h3'); if (sh3) sh3.textContent = t('modal.skills.title');
        var sp = sm.querySelector('p'); if (sp) sp.textContent = t('modal.skills.desc');
        var sbtns = sm.querySelectorAll('.form-actions button');
        sbtns.forEach(function(b) { b.textContent = t('btn.close'); });
    }
}
let _onboardingOsinResponse = ''; // accumulated AI response text
let _onboardingStreamCtl = null;  // AbortController for SSE stream

