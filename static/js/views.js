                                                         
                                 
// #region task-templates
function buildTaskTemplates() {
return [
    {id:'morning-brief',name:langText('早安简报','Morning Brief'),time:'09:00',required:true,
     desc:langText('使用 web_search 获取实时汇率、大宗商品价格、目标市场新闻，结合昨日对话生成简报','Use web_search to get real-time exchange rates, commodity prices, and target market news, and generate a briefing with yesterday\'s conversation'),
     prompt:langText('按照 b2b-daily-automation 技能中的早安简报规范生成今日简报。必须使用 web_search 逐项搜索实时汇率（USD/EUR/GBP→CNY）、大宗商品价格（金/铜/铝/原油）、目标市场新闻。查询昨日对话记录和客户待跟进清单。所有数值必须来自搜索结果，不得编造或留空。','Follow the b2b-daily-automation morning-briefing spec: use web_search to look up live exchange rates (USD/EUR/GBP→CNY), commodity prices (gold/copper/aluminum/crude) and target-market news. Review yesterday\'s chat history and the customer follow-up list. Every figure must come from search results — never invent or leave blanks.')},
    {id:'email-followup',name:langText('邮件处理与跟进','Email processing and follow-up'),time:'09:00-10:30',required:false,
     desc:langText('回复所有未读消息，发送跟进邮件。新消息 2 小时内回复 100%','Reply to all unread messages and send follow-up emails. 100% of new messages answered within 2 hours'),
     prompt:langText('帮我整理今天待处理的邮件和跟进事项：列出昨日至今天收到的客户消息、需要跟进的客户（按 A/B/C 优先级）、明天需要发送的提醒邮件模板。','Help me organize today\'s pending emails and follow-ups: list customer messages received from yesterday to today, customers who need follow-up (by A/B/C priority), and reminder email templates to send tomorrow.')},
    {id:'linkedin-add',name:langText('精准加人 (LinkedIn)','Targeted connections (LinkedIn)'),time:'10:00-11:30',required:false,
     desc:langText('搜索关键词+职位，发送连接请求+Add Note，目标 30-50 人/天','Search keywords + job titles, send connection requests + Add Note, target 30-50 people/day'),
     prompt:langText('生成本日 LinkedIn 精准加人计划：根据我公司的产品和目标市场，列出今天应该搜索的 5 个关键词组合，每个关键词推荐 3-5 个搜索过滤条件（行业/地区/职位），并生成 Add Note 模板。','Generate today’s precise LinkedIn connection plan: Based on my company’s products and target market, list 5 keyword combinations to search today, recommend 3–5 search filters (industry / region / job title) for each keyword, and generate Add Note templates.')},
    {id:'linkedin-engage',name:langText('评论互动与私信致谢','Comment engagement & DM thanks'),time:'11:30-12:00',required:false,
     desc:langText('评论目标客户 10-15 条动态，新增连接发送感谢私信','Comment on 10-15 posts of target customers; send a thank-you DM to new connections'),
     prompt:langText('帮我生成本日 LinkedIn 互动计划：列出需要评论的客户类型和评论模板（3 种场景），以及新增连接后的感谢私信模板。','Generate today\'s LinkedIn engagement plan: list the customer types to comment on, comment templates (3 scenarios), and thank-you DM templates for new connections.')},
    {id:'linkedin-content',name:langText('LinkedIn 内容发布','LinkedIn Content Publishing'),time:'15:30',required:false,
     desc:langText('发布或转发 1 条内容（案例/痛点/工厂/证书），≥3 帖/周','Publish or repost 1 piece of content (case study/pain point/factory/certificate), at least 3 posts/week'),
     prompt:langText('请生成本日的 LinkedIn 帖子（5 维度轮换：视频/照片/文章/投票/Document）。内容围绕我公司产品和行业，带 5 个 hashtag，可直接复制粘贴发布。','Please generate today\'s LinkedIn post (rotating across 5 formats: video/photo/article/poll/Document). The content should focus on my company\'s products and industry, include 5 hashtags, and be ready to copy and paste directly.')},
    {id:'platform-check',name:langText('B2B 平台检查','B2B platform check'),time:'15:30-17:00',required:false,
     desc:langText('检查阿里国际站/Made-in-China 等平台询盘、排名、发布产品','Check inquiries, rankings, and product posts on Alibaba.com / Made-in-China and other platforms'),
     prompt:langText('生成今日 B2B 平台检查清单：新询盘数量、待回复询盘、产品排名变化、需要发布的产品数量。给出具体可执行的操作步骤。','Generate today\'s B2B platform checklist: number of new inquiries, inquiries awaiting reply, product ranking changes, products to publish. Provide specific, actionable steps.')},
    {id:'customer-dev',name:langText('客户开发','Customer Development'),time:'13:30-15:30',required:false,
     desc:langText('新客户搜索/加人/开发信发送，目标日均 20-30 个有效触达','New customer search/add people/send outreach emails, target 20-30 valid touches per day'),
     prompt:langText('生成本日客户开发计划：根据我公司的产品和目标市场，列出 5 个找客户渠道（LinkedIn/Facebook/Google Maps/B2B平台/海关数据），每个渠道给出具体搜索方法和开发信模板。','Generate today\'s customer development plan: based on our products and target markets, list 5 customer-finding channels (LinkedIn/Facebook/Google Maps/B2B platforms/customs data), and give a specific search method and outreach email template for each channel.')},
    {id:'daily-summary',name:langText('每日工作总结','Daily work summary'),time:'17:00',required:false,
     desc:langText('更新客户表/CRM，复盘当日完成情况，规划次日优先级','Update customer sheet/CRM, review daily completion, and plan next day\'s priorities'),
     prompt:langText('请帮我生成今日工作总结模板，包含：今日完成事项清单、客户互动汇总、新增客户统计、待跟进事项、明日优先级安排。如果是周五，加上本周 KPI 对比和下周计划。','Please generate a daily work summary template for me, including: a list of tasks completed today, a summary of customer interactions, new customer statistics, items pending follow-up, and tomorrow’s priority plan. If it’s Friday, add this week’s KPI comparison and next week’s plan.')},
    {id:'weekly-report',name:langText('每周复盘报告','Weekly review report'),time:langText('周五 17:30','Friday 17:30'),required:false,
     desc:langText('周复盘：亮点/短板/KPI对比/下周行动清单','Weekly review: highlights / weaknesses / KPI comparison / next week\'s action list'),
     prompt:langText('请生成本周复盘报告模板，包含：本周完成事项、KPI 完成情况（新增人脉/有效对话/需求线索/预约会议/内容发布）、亮点与短板分析、竞品洞察、下周行动清单。','Generate this week\'s review report template, including: tasks completed this week, KPI status (new contacts/effective conversations/requirement leads/meetings booked/content published), strengths and weaknesses analysis, competitor insights, and next week\'s action list.')},
];
}
let TASK_TEMPLATES = null;
let _taskTplLang = null;

function getCustomTemplates() {
    try { return JSON.parse(localStorage.getItem('trade_custom_templates') || '[]'); } catch(e) { return []; }
}

// 模板文案在首次用到时才按当前语言生成：脚本加载时 currentLang 仍是默认中文，
// 而语言偏好在 init 阶段才从 localStorage 读取，提前生成会把中文名留在英文/阿文界面。
function getAllTemplates() {
    if (_taskTplLang !== currentLang) {
        TASK_TEMPLATES = buildTaskTemplates();
        _taskTplLang = currentLang;
    }
    return [...TASK_TEMPLATES, ...getCustomTemplates()];
}
// #endregion task-templates

function deleteCustomTemplate(id) {
    if (!confirm(langText('删除此自定义模板？','Delete this custom template?'))) return;
    let customs = getCustomTemplates();
    customs = customs.filter(t => t.id !== id);
    localStorage.setItem('trade_custom_templates', JSON.stringify(customs));
    const ct = currentChatContainer;
    if (ct && currentView === 'tasks') renderTasksViewInto(ct);
}

function renderTasksViewInto(container) {
    const coName = currentCompanyId ? (companies.find(c => c.id === currentCompanyId)?.name || '') : '';
    const allTemplates = getAllTemplates();

    const renderCard = (t) => {
        const isCustom = t.custom === true;
        const hasEdit = templateEdits[t.id];
        const displayTime = (hasEdit && hasEdit.time) || t.time;
        return `
        <div class="task-card" style="position:relative;">
            ${isCustom ? `<button data-act="deleteCustomTemplate" data-arg="${t.id}" style="position:absolute;top:8px;right:8px;background:none;border:none;cursor:pointer;font-size:14px;color:var(--accent-red);">×</button>` : ''}
            <div class="task-card-header">
                <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
                    <input type="checkbox" class="task-template-check" data-id="${t.id}" ${t.required ? 'checked disabled' : ''}>
                    <span class="task-card-name">${esc(t.name)}</span>
                    ${t.required ? '<span style="font-size:10px;color:var(--accent);background:#FEF3C7;padding:1px 6px;border-radius:999px;">' + langText('必选','Required') + '</span>' : ''}
                    ${isCustom ? '<span style="font-size:10px;color:var(--primary);background:#EFF6FF;padding:1px 6px;border-radius:999px;">' + langText('自定义','Custom') + '</span>' : ''}
                </label>
            </div>
            <div style="display:flex;align-items:center;gap:6px;margin:6px 0;">
                <span style="font-size:11px;color:var(--text-muted);">🕐</span>
                <input type="text" class="task-time-input" data-id="${t.id}" value="${esc(displayTime)}" style="width:100px;padding:2px 6px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:11px;font-family:monospace;" data-onchange="onTemplateTimeChange" data-arg="${t.id}" data-append-value="1">
                ${t.cron ? `<span style="font-size:10px;color:var(--text-muted);font-family:monospace;">${esc(t.cron)}</span>` : ''}
            </div>
            <div style="font-size:11px;color:var(--text-secondary);margin-bottom:8px;">${esc(t.desc || '')}</div>
            <div class="task-card-actions">
                <button data-act="editTemplatePrompt" data-arg="${t.id}" style="font-size:11px;">${btnIcon('pencil')}${langText('编辑 Prompt','Edit Prompt')}</button>
                <button data-act="runSingleTemplate" data-arg="${t.id}" style="font-size:11px;">▶${langText('执行一次','Run once')}</button>
            </div>
        </div>`;
    };

    container.innerHTML = `
    <div class="panel-view" style="display:flex;flex-direction:column;height:100%;overflow-y:auto;">
        <div class="panel-topbar">
            <h2>⏰${langText('定时任务','Scheduled Tasks')}${coName ? `<span style="margin-left:10px;padding:3px 10px;background:rgba(59,130,246,0.08);color:var(--primary);border-radius:999px;font-size:12px;font-weight:500;">🏢 ${esc(coName)}</span>` : ''}</h2>
            <div class="panel-topbar-actions">
                <button class="btn btn-primary" data-act="batchCreateCronTasks">${btnIcon('refresh-cw')}${langText('批量生成选中任务','Batch generate selected tasks')}</button>
                <button class="btn btn-danger" data-act="clearAllCronTasks">${btnIcon('trash')}${langText('清空全部任务','Clear all tasks')}</button>
            </div>
        </div>
        <div class="panel-body" style="overflow-y:auto;padding:16px 20px;">
            <!-- 定时任务使用说明书 -->
            <details style="margin-bottom:16px;border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;">
                <summary style="cursor:pointer;padding:12px 16px;font-weight:600;font-size:14px;background:var(--bg);user-select:none;">
                    📖${langText('定时任务使用说明书（点击展开 / 收起）','Scheduled Task User Guide (click to expand / collapse)')}
                </summary>
                <div style="padding:16px 20px;font-size:13px;line-height:1.8;color:var(--text-secondary);">

                <h4 style="margin:0 0 10px 0;color:var(--text-primary);">${langText('一、什么是定时任务？','1. What are scheduled tasks?')}</h4>
                <p>${langText('定时任务就像一个闹钟。你告诉它「每天几点要做什么事」，时间一到，系统会自动帮你去执行。','A scheduled task is like an alarm clock. You tell it what to do and when each day, and when the time comes, the system automatically does it for you.')}</p>
                <p>${langText('比如你可以设置：每天早上 9 点自动搜索当日汇率、每周五下午 5 点生成周报。','For example, you can set: search the day\'s exchange rates automatically every morning at 9:00, and generate a weekly report every Friday at 5:00 PM.')}</p>

                <h4 style="margin:18px 0 10px 0;color:var(--text-primary);">${langText('二、Cron 表达式是什么？','II. What is a Cron expression?')}</h4>
                <p>${langText('Cron 表达式是用来描述「什么时候执行」的一串代码。它由','A Cron expression is a piece of code that describes when a task runs. It consists of')}<b>${langText('5 个数字','5 numbers')}</b>${langText('组成，用空格隔开：','separated by spaces:')}</p>
                <div style="background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:12px 16px;font-family:monospace;font-size:14px;text-align:center;margin:8px 0;">
                    <b>${langText('分钟 小时 日 月 星期','Minute Hour Day Month Weekday')}</b>
                </div>
                <p>${langText('看不懂没关系，下面逐个解释','Don\'t worry if you don\'t understand; we\'ll explain each one below')}👇</p>

                <table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:13px;">
                <thead>
                <tr style="background:var(--bg);">
                    <th style="padding:8px 12px;text-align:left;border:1px solid var(--border);">${langText('位置','Location')}</th>
                    <th style="padding:8px 12px;text-align:left;border:1px solid var(--border);">${langText('叫什么','What to call it')}</th>
                    <th style="padding:8px 12px;text-align:left;border:1px solid var(--border);">${langText('可以填什么','What can be entered')}</th>
                    <th style="padding:8px 12px;text-align:left;border:1px solid var(--border);">${langText('什么意思','What does it mean')}</th>
                </tr>
                </thead>
                <tbody>
                <tr><td style="padding:8px 12px;border:1px solid var(--border);"><b>${langText('第 1 个','1st')}</b></td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('分钟','minutes')}</td><td style="padding:8px 12px;border:1px solid var(--border);">0 ~ 59</td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('在每小时的第几分运行。填 0 代表整点，填 30 代表半点','Runs at the Nth minute of every hour. Enter 0 for the top of the hour, 30 for the half hour')}</td></tr>
                <tr><td style="padding:8px 12px;border:1px solid var(--border);"><b>${langText('第 2 个','2nd')}</b></td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('小时','Hour')}</td><td style="padding:8px 12px;border:1px solid var(--border);">0 ~ 23</td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('在几点运行。0','Which hour to run at. 0')}=${langText('半夜12点，8','Midnight 12, 8')}=${langText('早上8点，14','8:00 AM, 14')}=${langText('下午2点，20','2 PM, 20')}=${langText('晚上8点','8:00 PM')}</td></tr>
                <tr><td style="padding:8px 12px;border:1px solid var(--border);"><b>${langText('第 3 个','3rd')}</b></td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('日','Day')}</td><td style="padding:8px 12px;border:1px solid var(--border);">1 ~ 31</td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('在每月第几天运行。填','Which day of the month to run. Enter')}*${langText('代表每天都行','means any day will do')}</td></tr>
                <tr><td style="padding:8px 12px;border:1px solid var(--border);"><b>${langText('第 4 个','The 4th one')}</b></td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('月','Month')}</td><td style="padding:8px 12px;border:1px solid var(--border);">1 ~ 12</td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('在几月运行。填','Which month to run. Enter')}*${langText('代表每月都行','Means any month is fine')}</td></tr>
                <tr><td style="padding:8px 12px;border:1px solid var(--border);"><b>${langText('第 5 个','5th')}</b></td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('星期','Day of week')}</td><td style="padding:8px 12px;border:1px solid var(--border);">0 ~ 7</td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('星期几运行。0','Which day of the week to run. 0')}=${langText('周日，1','Sunday, 1')}=${langText('周一...6','Mon...6')}=${langText('周六。填','Saturday. Enter')}*${langText('代表每天','means every day')}</td></tr>
                </tbody>
                </table>

                <h4 style="margin:18px 0 10px 0;color:var(--text-primary);">${langText('三、常用写法速查表','III. Common patterns quick reference')}</h4>
                <table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:13px;">
                <thead>
                <tr style="background:var(--bg);">
                    <th style="padding:8px 12px;text-align:left;border:1px solid var(--border);">${langText('你想要的','What you want')}</th>
                    <th style="padding:8px 12px;text-align:left;border:1px solid var(--border);">${langText('Cron 表达式','Cron Expression')}</th>
                    <th style="padding:8px 12px;text-align:left;border:1px solid var(--border);">${langText('大白话解释','Plain-language explanation')}</th>
                </tr>
                </thead>
                <tbody>
                <tr><td style="padding:8px 12px;border:1px solid var(--border);">${langText('每天上午 9:00','9:00 AM every day')}</td><td style="padding:8px 12px;border:1px solid var(--border);font-family:monospace;">0 9 * * *</td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('每天 9 点整触发','Trigger at 9:00 AM every day')}</td></tr>
                <tr><td style="padding:8px 12px;border:1px solid var(--border);">${langText('每天下午 3:30','Every day at 3:30 PM')}</td><td style="padding:8px 12px;border:1px solid var(--border);font-family:monospace;">30 15 * * *</td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('每天 15:30 触发','Triggers daily at 15:30')}</td></tr>
                <tr><td style="padding:8px 12px;border:1px solid var(--border);">${langText('每个工作日（周一到周五）9:00','Every weekday (Monday to Friday) at 9:00')}</td><td style="padding:8px 12px;border:1px solid var(--border);font-family:monospace;">0 9 * * 1-5</td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('周一至周五的早上 9 点','9:00 AM Monday to Friday')}</td></tr>
                <tr><td style="padding:8px 12px;border:1px solid var(--border);">${langText('每周一早上 8:30','Every Monday at 8:30 AM')}</td><td style="padding:8px 12px;border:1px solid var(--border);font-family:monospace;">30 8 * * 1</td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('只在每周一 8:30 触发','Triggers only every Monday at 8:30')}</td></tr>
                <tr><td style="padding:8px 12px;border:1px solid var(--border);">${langText('每周五下午 5:30','Every Friday at 5:30 PM')}</td><td style="padding:8px 12px;border:1px solid var(--border);font-family:monospace;">30 17 * * 5</td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('只在每周五 17:30 触发','Triggers only every Friday at 17:30')}</td></tr>
                <tr><td style="padding:8px 12px;border:1px solid var(--border);">${langText('每月 1 号上午 10:00','10:00 AM on the 1st of every month')}</td><td style="padding:8px 12px;border:1px solid var(--border);font-family:monospace;">0 10 1 * *</td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('每个月 1 号触发','Triggers on the 1st of every month')}</td></tr>
                <tr><td style="padding:8px 12px;border:1px solid var(--border);">${langText('每隔 30 分钟','Every 30 minutes')}</td><td style="padding:8px 12px;border:1px solid var(--border);font-family:monospace;">*/30 * * * *</td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('每 30 分钟跑一次','Run every 30 minutes')}</td></tr>
                </tbody>
                </table>

                <h4 style="margin:18px 0 10px 0;color:var(--text-primary);">${langText('四、特殊符号说明','4. Special symbols')}</h4>
                <table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:13px;">
                <thead>
                <tr style="background:var(--bg);">
                    <th style="padding:8px 12px;text-align:left;border:1px solid var(--border);">${langText('符号','Symbol')}</th>
                    <th style="padding:8px 12px;text-align:left;border:1px solid var(--border);">${langText('名字','Name')}</th>
                    <th style="padding:8px 12px;text-align:left;border:1px solid var(--border);">${langText('怎么用','How to use')}</th>
                    <th style="padding:8px 12px;text-align:left;border:1px solid var(--border);">${langText('举例','Example')}</th>
                </tr>
                </thead>
                <tbody>
                <tr><td style="padding:8px 12px;border:1px solid var(--border);font-family:monospace;">*</td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('星号（通配）','Asterisk (wildcard)')}</td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('代表「所有可能的值」。填在小时位置就是每小时，填在日位置就是每天','Means "all possible values". In the hour field it means every hour; in the day field it means every day')}</td><td style="padding:8px 12px;border:1px solid var(--border);"><code>0 9 * * *</code> =${langText('每天 9 点','Every day at 9:00')}</td></tr>
                <tr><td style="padding:8px 12px;border:1px solid var(--border);font-family:monospace;">,</td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('逗号（列举）','Comma (list)')}</td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('列出多个值，用逗号隔开','List multiple values, separated by commas')}</td><td style="padding:8px 12px;border:1px solid var(--border);"><code>0 9,14,18 * * *</code> =${langText('每天 9点、14点、18点各跑一次','Runs once each day at 9:00, 14:00, and 18:00')}</td></tr>
                <tr><td style="padding:8px 12px;border:1px solid var(--border);font-family:monospace;">-</td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('横线（范围）','Dash (range)')}</td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('从 A 到 B 的所有值','All values from A to B')}</td><td style="padding:8px 12px;border:1px solid var(--border);"><code>0 9 * * 1-5</code> =${langText('周一到周五','Monday to Friday')}</td></tr>
                <tr><td style="padding:8px 12px;border:1px solid var(--border);font-family:monospace;">/</td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('斜杠（间隔）','Slash (interval)')}</td><td style="padding:8px 12px;border:1px solid var(--border);">${langText('每隔多少就触发一次','Triggers at a set interval')}</td><td style="padding:8px 12px;border:1px solid var(--border);"><code>*/15 * * * *</code> =${langText('每 15 分钟跑一次','Runs every 15 minutes')}</td></tr>
                </tbody>
                </table>

                <h4 style="margin:18px 0 10px 0;color:var(--text-primary);">${langText('五、执行时间怎么填？','5. How do I fill in the execution time?')}</h4>
                <p>${langText('在模板中，','In the template,')}<b>${langText('「执行时间」','Execution time')}</b>${langText('字段不需要写 Cron 表达式，直接写时间就行：','You don\'t need to write a Cron expression in this field — just write the time:')}</p>
                <ul style="margin:4px 0;padding-left:20px;">
                    <li>${langText('写','write')}<code>09:00</code>${langText('— 系统会自动生成','The system will generate it automatically')}<code>0 9 * * 1-5</code>${langText('（工作日早 9 点）','(9:00 AM on weekdays)')}</li>
                    <li>${langText('写','write')}<code>09:00-10:30</code>${langText('— 代表一个时间段，系统会用开始时间 09:00','represents a time period; the system will use the start time 09:00')}</li>
                    <li>${langText('写','write')}<code>${langText('周五 17:30','Friday 17:30')}</code>${langText('— 如果你在 Cron 表达式里填了覆盖值，则以 Cron 表达式为准','If you entered an override value in the Cron expression, the Cron expression takes precedence')}</li>
                </ul>
                <p>${langText('如果你想精确控制，直接改右边的','If you want precise control, edit the one on the right directly')}<b>${langText('「Cron 表达式」','Cron expression')}</b>${langText('框。','field.')}</p>

                <h4 style="margin:18px 0 10px 0;color:var(--text-primary);">${langText('六、执行 Prompt 怎么写？','6. How to write the execution Prompt?')}</h4>
                <p>${langText('Prompt 就是告诉 Agent「你要帮我做什么」的一段话。用大白话写就行，就像你在聊天框里打字一样。','Prompt It\'s simply a message telling the Agent "what you want it to do". Write it in plain language, just like typing in a chat box.')}</p>
                <p><b>${langText('写好 Prompt 的 3 个要点：','3 key points for writing a good Prompt:')}</b></p>
                <ol style="margin:4px 0;padding-left:20px;">
                    <li><b>${langText('说清楚目标','State the goal clearly')}</b>${langText('：不要写「帮我查资料」，要写「帮我查今天的 USD/CNY 汇率、铜价、铝价」','Don’t write “help me research”; write “help me check today’s USD/CNY exchange rate, copper price, and aluminum price”')}</li>
                    <li><b>${langText('说清楚格式','Specify the format clearly')}</b>${langText('：不要写「生成简报」，要写「用表格列出，包含实时数值、变化幅度、数据来源」','Don\'t write 「generate a brief」; write 「list it in a table, including real-time values, change magnitude, and data sources」')}</li>
                    <li><b>${langText('说清楚要求','State your requirements clearly')}</b>${langText('：不要写「写开发信」，要写「用英语写，100 字以内，先提客户痛点再讲我们的解决方案」','Don\'t write “write a cold email”; write “write in English, 100 words or fewer, mention the customer\'s pain point first, then our solution”')}</li>
                </ol>
                <p>💡 <b>${langText('重要提醒','Important note')}</b>${langText('：Prompt 要写',': the Prompt must describe')}<b>${langText('任务本身做什么','What the task itself does')}</b>${langText('，不要写多余的话。Agent 会自动执行，不需要你说「请」、「谢谢」。',', with no extra words. The Agent runs automatically — no need to say "please" or "thank you".')}</p>

                <h4 style="margin:18px 0 10px 0;color:var(--text-primary);">${langText('七、操作步骤','7. Steps')}</h4>
                <ol style="margin:4px 0;padding-left:20px;">
                    <li><b>${langText('钩选','Check')}</b>${langText('你想要的任务模板（或点「','the task template you want (or click "')}➕${langText('自定义模板」写自己的）','Custom template” to write your own)')}</li>
                    <li><b>${langText('编辑执行时间','Edit execution time')}</b>${langText('和','and')}<b>${langText('Cron 表达式','Cron Expression')}</b>${langText('（用上面速查表参考）','(refer to the quick-reference table above)')}</li>
                    <li>${langText('点「','Click “')}✏️${langText('编辑 Prompt」检查或修改任务指令','“Edit Prompt” to check or modify the task instruction')}</li>
                    <li>${langText('点','Click the')}<b>「⚡${langText('批量生成选中任务」','Batch generate selected tasks')}</b>${langText('，Agent 自动创建定时任务',', and the Agent creates the scheduled tasks automatically')}</li>
                    <li>${langText('下方「','Below, “')}📡${langText('已激活的定时任务」会显示当前所有运行中的任务','Active scheduled tasks shows all currently running tasks')}</li>
                    <li>${langText('如果需要马上执行，点任务旁的「','If you need to run it right away, click the')}▶${langText('执行一次」按钮','“Execute Once” button')}</li>
                </ol>

                <h4 style="margin:18px 0 10px 0;color:var(--text-primary);">${langText('八、常见问题','8. FAQ')}</h4>
                <p><b>${langText('Q: 任务会在我关掉浏览器后执行吗？','Will the task run after I close the browser?')}</b></p>
                <p>${langText('A: 会的。定时任务由后台服务独立运行，不需要你一直开着浏览器。只要电脑开着、Trade 系统在运行就行。','Yes. Scheduled tasks run independently in a background service, so you don\'t need to keep your browser open. As long as the computer is on and the Trade system is running, that\'s enough.')}</p>
                <p><b>${langText('Q: 我能把电脑关了吗？','Can I turn off the computer?')}</b></p>
                <p>${langText('A: 不能。Trade 系统需要运行时电脑保持开机。可以设置 Trade 开机自启动（安装脚本会提示配置），这样每次开机自动运行。','No. The Trade system needs the computer to stay on while it is running. You can set Trade to start automatically at boot (the installer will prompt you to configure this), so it runs every time you turn on the computer.')}</p>
                <p><b>${langText('Q: 任务执行结果在哪看？','Where can I see the task execution results?')}</b></p>
                <p>${langText('A: 结果会发送到聊天界面中。如果你在早上 9 点前打开界面，可以看到早安简报自动推送。','Results are sent to the chat interface. If you open the interface before 9:00 AM, you\'ll see the morning brief pushed automatically.')}</p>
                <p><b>${langText('Q: Cron 表达式写错了怎么办？','Q: What if I write the Cron expression wrong?')}</b></p>
                <p>${langText('A: 不会造成损害，只是任务不会按时执行或不执行。删掉重建就行。','No harm done — the task just won\'t run on time or at all. Just delete it and recreate it.')}</p>

                </div>
            </details>

            <!-- 模板库 -->
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
                <div style="font-size:13px;font-weight:600;color:var(--text-secondary);">📋${langText('任务模板库（钩选 → 编辑时间 → 批量生成）','Task template library (tick → edit time → bulk create)')}</div>
                <button class="btn btn-xs" data-act="showAddCustomTemplateModal" style="color:var(--primary);">${btnIcon('plus')}${langText('自定义模板','Custom template')}</button>
            </div>
            <div class="task-grid" id="task-templates-grid">
                ${allTemplates.map(renderCard).join('')}
            </div>

            <!-- 分隔线 -->
            <hr style="border:none;border-top:2px dashed var(--border);margin:20px 0;">

            <!-- 已激活任务 -->
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
                <div style="font-size:13px;font-weight:600;color:var(--text-secondary);">📡${langText('已激活的定时任务','Active scheduled tasks')}</div>
                <button class="btn btn-xs" data-act="loadActiveCronJobs">${btnIcon('refresh-cw')}${langText('刷新','Refresh')}</button>
            </div>
            <div class="task-grid" id="active-tasks-grid">
                <div style="color:var(--text-muted);font-size:12px;padding:12px;">${langText('加载中...','Loading...')}</div>
            </div>
        </div>
    </div>`;
    loadActiveCronJobs();
}

             

                                          
let templateEdits = {};

function onTemplateCheckChange() {
                                  
}

function onTemplateTimeChange(id, value) {
    if (!templateEdits[id]) templateEdits[id] = {};
    templateEdits[id].time = value;
}

function editTemplatePrompt(id) {
    const t = getAllTemplates().find(x => x.id === id);
    if (!t) return;
    const currentPrompt = (templateEdits[id] && templateEdits[id].prompt) || t.prompt;
    showPromptEditorModal(t.name, currentPrompt, (newPrompt) => {
        if (!templateEdits[id]) templateEdits[id] = {};
        templateEdits[id].prompt = newPrompt;
        toast(`"${t.name}"${langText('Prompt 已更新','Prompt Updated')}`);
    });
}

function showPromptEditorModal(title, currentText, onSave) {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.id = 'prompt-editor-modal';
    backdrop.onclick = function(e) { if (e.target === backdrop) backdrop.remove(); };
    backdrop.innerHTML = `
    <div class="modal" style="max-width:640px;width:95%;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <h3>✏️${langText('编辑：','Edit:')}${esc(title)}</h3>
            <button class="slide-panel-close" data-act="removeById" data-arg="prompt-editor-modal">×</button>
        </div>
        <div class="form-group">
            <label for="prompt-editor-text">${langText('任务 Prompt（Agent 将按此指令执行）','Task Prompt (the Agent will follow this instruction)')}</label>
            <textarea id="prompt-editor-text" style="width:100%;min-height:200px;font-family:monospace;font-size:13px;padding:10px;">${esc(currentText)}</textarea>
        </div>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;">
            <button class="btn" data-act="removeById" data-arg="prompt-editor-modal">${langText('取消','Cancel')}</button>
            <button class="btn btn-primary">${btnIcon('check')}${langText('保存','Save')}</button>
        </div>
    </div>`;
             
    const saveBtn = backdrop.querySelector('.btn-primary');
    saveBtn.setAttribute('data-onsave', 'true');
                   
    const textarea = backdrop.querySelector('#prompt-editor-text');
    saveBtn.onclick = function() {
        const newText = textarea.value;
        backdrop.remove();
        onSave(newText);
    };
    document.body.appendChild(backdrop);
}

function showAddCustomTemplateModal() {
    const old = document.getElementById('custom-template-modal');
    if (old) old.remove();                  
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.id = 'custom-template-modal';
    backdrop.onclick = function(e) { if (e.target === backdrop) backdrop.remove(); };
    backdrop.innerHTML = `
    <div class="modal" style="max-width:600px;width:95%;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <h3>➕${langText('自定义任务模板','Custom task template')}</h3>
            <button class="slide-panel-close" data-act="removeById" data-arg="custom-template-modal">×</button>
        </div>
        <div class="form-group"><label for="custom-tmpl-name">${langText('任务名称','Task name')}*</label><input type="text" id="custom-tmpl-name" placeholder="${langText('例如：海关数据每日监控','e.g., Daily customs data monitoring')}"></div>
        <div class="form-row">
            <div class="form-group"><label for="custom-tmpl-time">${langText('执行时间','Execution time')}*</label><input type="text" id="custom-tmpl-time" placeholder="${langText('09:00 或 09:00-10:30','09:00 or 09:00-10:30')}" value="09:00"></div>
            <div class="form-group"><label for="custom-tmpl-cron">${langText('Cron 表达式','Cron Expression')}</label><input type="text" id="custom-tmpl-cron" placeholder="0 9 * * 1-5" value="0 9 * * 1-5"></div>
        </div>
        <div class="form-group"><label for="custom-tmpl-desc">${langText('任务描述','Task description')}</label><input type="text" id="custom-tmpl-desc" placeholder="${langText('简要描述任务内容','Briefly describe the task')}"></div>
        <div class="form-group"><label for="custom-tmpl-prompt">${langText('执行 Prompt','Execute Prompt')}*</label><textarea id="custom-tmpl-prompt" style="width:100%;min-height:150px;font-family:monospace;font-size:13px;padding:10px;" placeholder="${langText('Agent 将按此指令执行...','The Agent will execute this instruction...')}"></textarea></div>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;">
            <button class="btn" data-act="removeById" data-arg="custom-template-modal">${langText('取消','Cancel')}</button>
            <button class="btn btn-primary" data-act="saveCustomTemplate">${btnIcon('check')}${langText('保存模板','Save template')}</button>
        </div>
    </div>`;
    document.body.appendChild(backdrop);
}

function saveCustomTemplate() {
    const name = document.getElementById('custom-tmpl-name').value.trim();
    const time = document.getElementById('custom-tmpl-time').value.trim();
    const cron = document.getElementById('custom-tmpl-cron').value.trim();
    const desc = document.getElementById('custom-tmpl-desc').value.trim();
    const prompt = document.getElementById('custom-tmpl-prompt').value.trim();
    if (!name || !time || !prompt) { toast(langText('请填写任务名称、时间和 Prompt','Enter task name, time, and Prompt')); return; }

    const id = 'custom-' + Date.now();
    const tpl = {id, name, time, cron, desc, prompt, custom: true};
    let customs = [];
    try { customs = JSON.parse(localStorage.getItem('trade_custom_templates') || '[]'); } catch(e) {}
    customs.push(tpl);
    localStorage.setItem('trade_custom_templates', JSON.stringify(customs));
    document.getElementById('custom-template-modal').remove();
    toast(`${langText('自定义模板「','Custom template “')}${name}${langText('」已添加','" added')}`);
           
    const ct = currentChatContainer;
    if (ct && currentView === 'tasks') renderTasksViewInto(ct);
}

function runSingleTemplate(id) {
    const t = getAllTemplates().find(x => x.id === id);
    if (!t) return;
    const prompt = (templateEdits[id] && templateEdits[id].prompt) || t.prompt;
    runSingleTask(t.name, prompt);
}

function runSingleTask(taskName, prompt) {
    if (!currentCompanyId) { toast(langText('请先选择公司','Please select a company first')); return; }
    navToView('chat', 'daily', taskName);
    setTimeout(() => {
        const ct = currentChatContainer;
        const input = ct ? ct.querySelector('#msg-input') : null;
        if (input) {
            input.value = prompt;
            sendMsg();
        }
    }, 300);
}

function batchCreateCronTasks() {
    if (!currentCompanyId) { toast(langText('请先选择公司','Please select a company first')); return; }
    const checks = document.querySelectorAll('.task-template-check:checked');
    if (!checks.length) { toast(langText('请至少选择一个任务模板','Please select at least one task template')); return; }

    const allTemplates = getAllTemplates();
    const selected = [];
    checks.forEach(cb => {
        const id = cb.dataset.id;
        const t = allTemplates.find(x => x.id === id);
        if (!t) return;
        const time = (templateEdits[id] && templateEdits[id].time) || t.time;
        const cronExpr = t.cron || cronFromTime(time);
        const prompt = (templateEdits[id] && templateEdits[id].prompt) || t.prompt;
        selected.push(`${langText('任务名:','Task name:')}${t.name} | schedule: ${cronExpr} | Prompt: ${prompt}`);
    });

    navToView('chat', 'daily', langText('定时任务批量创建','Batch create scheduled tasks'));
    setTimeout(() => {
        const ct = currentChatContainer;
        const input = ct ? ct.querySelector('#msg-input') : null;
        if (input) {
            input.value = `${langText('请使用 cronjob 工具为我批量创建以下定时任务，所有任务使用 --deliver local：','Please use the cronjob tool to batch-create the following scheduled tasks for me; use --deliver local for all of them:')}\n${selected.join('\n')}\n\n${langText('请为每个任务创建 cron job 并返回创建结果。','Please create a cron job for each task and return the creation results.')}`;
            sendMsg();
        }
    }, 300);
}

async function clearAllCronTasks() {
    if (!confirm(langText('确定删除所有已激活的定时任务？此操作不可恢复。','Are you sure you want to delete all active scheduled tasks? This action cannot be undone.'))) return;
    navToView('chat', 'daily', langText('清空定时任务','Clear scheduled tasks'));
    setTimeout(() => {
        const ct = currentChatContainer;
        const input = ct ? ct.querySelector('#msg-input') : null;
        if (input) {
            input.value = langText('请使用 cronjob 工具列出并删除所有现有的 cron 定时任务。逐一删除，完成后告知结果。','Please use the cronjob tool to list and delete all existing cron scheduled tasks. Delete them one by one and report the result when done.');
            sendMsg();
                   
            setTimeout(loadActiveCronJobs, 5000);
        }
    }, 300);
}

async function loadActiveCronJobs() {
    if (!currentCompanyId) return;
    const data = await api('GET', '/api/trade/cron/jobs');
    const grid = document.getElementById('active-tasks-grid');
    if (!grid) return;
    if (!data || !data.length) {
        grid.innerHTML = langText('暂无已激活的定时任务。请从上方模板库钩选后点击「批量生成」。','No active scheduled tasks yet. Select from the template library above and click “Batch generate”.');
        return;
    }
    grid.innerHTML = data.map(j => `
        <div class="task-card">
            <div class="task-card-header">
                <span class="task-card-name">${esc(j.name)}</span>
                <span style="font-size:10px;color:${j.enabled ? 'var(--accent-green)' : 'var(--text-muted)'};">${j.enabled ? '●' + langText('运行中','Running') : '○' + langText('已暂停','Paused')}</span>
            </div>
            <div class="task-card-schedule">🕐 ${esc(j.schedule)}</div>
            ${j.next_run ? `<div style="font-size:11px;color:var(--accent-green);margin-bottom:6px;">${esc(langText('▶ 下次执行：','▶ Next run:'))}${esc(j.next_run)}</div>` : ''}
            <div class="task-card-actions">
                <button data-act="runActiveJob" data-arg="${esc(j.id)}">▶${langText('立即执行','Run now')}</button>
            </div>
        </div>
    `).join('');
}

function runActiveJob(jobId) {
    if (!currentCompanyId) return;
    navToView('chat', 'daily', langText('立即执行任务','Run Task Now'));
    setTimeout(() => {
        const ct = currentChatContainer;
        const input = ct ? ct.querySelector('#msg-input') : null;
        if (input) {
            input.value = `${langText('请使用 cronjob 工具手动触发一次任务 ID','Please use the cronjob tool to manually trigger once, task ID')}${jobId}${langText('，将结果输出到当前对话。',', and output the result to the current conversation.')}`;
            sendMsg();
        }
    }, 300);
}

function cronFromTime(timeStr) {
                                             
    const first = timeStr.split('-')[0].trim();           
    const parts = first.split(':');
    if (parts.length !== 2) return '0 9 * * 1-5';
    const h = parseInt(parts[0]), m = parseInt(parts[1]);
    return `${m} ${h} * * 1-5`;
}

// ═════════════════════ DIRECTORY VIEW ═════════════════════
function renderDirectoryViewInto(container) {
    const coName = currentCompanyId ? (companies.find(c => c.id === currentCompanyId)?.name || '') : '';
    container.innerHTML = `
        <div class="panel-topbar">
            <h2>📂 ${esc(langText('数据目录', 'Data directory'))}${coName ? `<span style="margin-left:10px;padding:3px 10px;background:rgba(59,130,246,0.08);color:var(--primary);border-radius:999px;font-size:12px;font-weight:500;">🏢 ${esc(coName)}</span>` : ''}</h2>
            <div class="panel-topbar-actions">
                <button class="btn" data-act="toastArg" data-arg="${esc(langText('功能开发中：将在文件管理器中打开', 'Coming soon: open in your file manager'))}">${btnIcon('folder-open')} ${esc(langText('打开目录', 'Open folder'))}</button>
            </div>
        </div>
        <div class="panel-body" style="display:flex;gap:16px;">
            <div style="width:320px;flex-shrink:0;">
                <div class="dir-tree" id="dir-tree">
                    <div class="loading-row"><div class="spinner"></div>${esc(langText('加载目录结构...', 'Loading the folder tree…'))}</div>
                </div>
            </div>
            <div style="flex:1;">
                <div class="file-preview" id="file-preview">
                    <div style="color:var(--text-muted);text-align:center;padding:40px;">👈 ${esc(langText('点击左侧文件查看内容', 'Pick a file on the left to preview it'))}</div>
                </div>
            </div>
        </div>`;
    loadDirectoryTree();
}

async function loadDirectoryTree() {
    // Build tree from known structure since we can't browse server filesystem via API
    // Show the standard ~/.trade/ layout
    const co = companies.find(c => c.id === currentCompanyId);
    const slug = co?.slug || 'default';

    const tree = [
        {name:'company-profile.md',icon:'📄',type:'file'},
        {name:'products.md',icon:'📄',type:'file'},
        {name:'agent-identity.md',icon:'📄',type:'file'},
        {name:'business-scope.md',icon:'📄',type:'file'},
        {name:'competitors.md',icon:'📄',type:'file'},
        {name:'certifications.md',icon:'📄',type:'file'},
        {name:'marketing-strategy.md',icon:'📄',type:'file'},
        {name:'sales-playbook.md',icon:'📄',type:'file'},
        {name:'libraries/',icon:'📂',type:'dir',children:[
            {name:'{lib-slug}/',icon:'📂',type:'dir',children:[
                {name:'index.md',icon:'📄',type:'file'},
                {name:'changelog.md',icon:'📄',type:'file'},
                {name:'metadata.md',icon:'📄',type:'file'},
            ]}
        ]},
        {name:'clients/',icon:'📂',type:'dir',children:[
            {name:'{client-slug}/',icon:'📂',type:'dir',children:[
                {name:'profile.md',icon:'📄',type:'file'},
                {name:'contacts.md',icon:'📄',type:'file'},
                {name:'interactions.md',icon:'📄',type:'file'},
                {name:'requirements.md',icon:'📄',type:'file'},
                {name:'quotes.md',icon:'📄',type:'file'},
                {name:'orders.md',icon:'📄',type:'file'},
                {name:'notes.md',icon:'📄',type:'file'},
            ]}
        ]},
    ];

    $('dir-tree').innerHTML = `<div style="font-weight:600;margin-bottom:8px;color:var(--text-secondary);">~/.trade/${esc(slug)}/</div>` +
        renderTreeItems(tree, 0);

    // 委托事件：文件树点击（避免 onclick 中直接拼接文件名导致 XSS）
    $('dir-tree').onclick = function(e) {
        var el = e.target.closest && e.target.closest('[data-file-click]');
        if (el && el.getAttribute('data-file-click') === 'preview') {
            previewFile(el.getAttribute('data-file-name'));
        }
    };

    // Also load agent identity preview if available
    const identity = await api('GET', `/api/trade/companies/${currentCompanyId}/agent-identity`);
    if (identity?.agent_identity_md) {
        $('file-preview').innerHTML = `<div class="file-preview-header"><h3>📄 agent-identity.md</h3></div>
            <div>${DOMPurify.sanitize(marked.parse(identity.agent_identity_md), {ALLOWED_TAGS:['p','br','strong','em','ul','ol','li','h1','h2','h3','blockquote','code','pre','a','table','thead','tbody','tr','th','td','hr','span'],ALLOWED_ATTR:['href','target','class'],ALLOW_DATA_ATTR:false})}</div>`;
    }
}

function renderTreeItems(items, depth) {
    return items.map(item => {
        const indent = depth * 20;
        const attrs = item.type === 'file'
            ? `data-file-name="${esc(item.name)}" data-file-click="preview"`
            : '';
        return `<div class="dir-tree-item ${item.type}" style="padding-left:${indent}px;" ${attrs}>
            <span class="tree-icon">${item.icon}</span> ${esc(item.name)}
        </div>` + (item.children ? renderTreeItems(item.children, depth+1) : '');
    }).join('');
}

function previewFile(name) {
    $('file-preview').innerHTML = `<div class="file-preview-header"><h3>📄 ${esc(name)}</h3></div>
        <p style="color:var(--text-muted);">${esc(langText('文件内容通过 Agent 对话中的 read_file 工具访问。在侧边栏中选择对应功能入口后，Agent 会自动读取相关文件。', 'File contents are read through the read_file tool in the Agent chat. Pick the matching entry in the sidebar and the Agent loads the files for you.'))}</p>`;
}

// ═════════════════════ HISTORY VIEW ═════════════════════
async function renderHistoryViewInto(container) {
    const coName = currentCompanyId ? (companies.find(c => c.id === currentCompanyId)?.name || '') : '';
    container.innerHTML = `
        <div class="panel-topbar">
            <h2>💬 ${t('history.title')}${coName ? '<span style="margin-left:10px;padding:3px 10px;background:rgba(59,130,246,0.08);color:var(--primary);border-radius:999px;font-size:12px;font-weight:500;">🏢 '+esc(coName)+'</span>' : ''}</h2>
            <div class="panel-topbar-actions">
                <input class="panel-search" id="conv-search" aria-label="搜索对话" placeholder="${langText('搜索对话...','Search conversations...')}" data-oninput="filterConversations">
            </div>
        </div>
        <div class="panel-body">
            <div class="quality-bar" id="quality-bar" style="display:none;"></div>
            <div class="conv-list" id="conv-list">
                <div class="loading-row"><div class="spinner"></div>加载对话记录...</div>
            </div>
        </div>`;
    await loadConversations();
    loadQualityStats();
}

// 质量概览（rating 闭环）：近 30 天评分总数 / 均分 / 低分最多的技能
async function loadQualityStats() {
    const bar = $('quality-bar');
    if (!bar || !currentCompanyId) return;
    const s = await api('GET', '/api/trade/conversations/quality-stats?days=30');
    // 无评分数据时不占位（新用户/未评分公司）
    if (!s || !s.total_rated) { bar.style.display = 'none'; return; }
    // by_skill 已按「低分优先」排序，取第一个有低分的技能作为待改进项
    const worst = (s.by_skill || []).find(x => x.low_count > 0);
    let txt = `📊 ${t('quality.rated')} ${s.total_rated} · ${t('quality.avg')} ${s.avg_rating}`;
    if (worst) txt += ` · ${t('quality.worst')} ${worst.skill} (👎×${worst.low_count})`;
    // 用 textContent 赋值，避免技能名/上下文注入 HTML
    bar.textContent = txt;
    bar.style.display = 'block';
}

let allConversations = [];
async function loadConversations() {
    if (!currentCompanyId) return;
    allConversations = await api('GET', '/api/trade/conversations?limit=100') || [];
    renderConversationsList(allConversations);
}

function renderConversationsList(data) {
    const container = $('conv-list');
    if (!data.length) {
        container.innerHTML = '<div class="empty-state"><div class="empty-icon">💬</div><h2>'+t('history.no_records')+'</h2></div>';
        return;
    }
    container.innerHTML = data.map(c => `
        <div class="conv-list-item" style="display:flex;align-items:flex-start;gap:8px;">
            <div style="flex:1;min-width:0;" data-act="showConversationDetail" data-arg="${c.id}">
                <div class="conv-meta">
                    <span>${esc((c.created_at||'').slice(0,16))}</span>
                    ${c.library_id ? '<span style="background:#EFF6FF;color:var(--primary);padding:2px 6px;border-radius:4px;">📁 '+t('nav.docs')+'</span>' : ''}
                </div>
                <div class="conv-q">${esc(c.query||'').slice(0,100)}</div>
                <div class="conv-a">${esc(c.response||'').slice(0,150)}</div>
            </div>
            <button class="btn-xs" style="color:var(--accent-red);border-color:var(--accent-red);flex-shrink:0;margin-top:2px;"
                data-act="deleteConversation" data-stop="1" data-arg="${c.id}" title="${t('hist.delete_title')}">${btnIcon('trash')}</button>
        </div>
    `).join('');
}

async function deleteConversation(cid) {
    if (!confirm(t('hist.confirm_delete'))) return;
    const r = await api('DELETE', `/api/trade/conversations/${cid}`);
    if (r && r.ok) {
        toast(t('hist.deleted'));
        allConversations = allConversations.filter(c => c.id !== cid);
        renderConversationsList(allConversations);
    } else {
        toast(r?.detail || t('hist.delete_fail'));
    }
}

function filterConversations() {
    const search = ($('conv-search')?.value||'').toLowerCase();
    if (!search) { renderConversationsList(allConversations); return; }
    const filtered = allConversations.filter(c =>
        (c.query||'').toLowerCase().includes(search) || (c.response||'').toLowerCase().includes(search)
    );
    renderConversationsList(filtered);
}

function showConversationDetail(cid) {
    const c = allConversations.find(x => x.id === cid);
    if (!c) return;

    // 从对话记录读取真实的 context；旧数据无 context 则回退到旧逻辑
    if (c.context) {
        currentChatContext = c.context;
    } else if (c.library_id) {
        currentChatContext = 'docs';
    } else {
        currentChatContext = 'daily';
    }
    currentLibraryId = c.library_id || null;
    currentChatName = langText('对话详情', 'Conversation');
    currentCustomerId = null;

    // 强制重建目标视图
    const cacheKey = 'chat-' + currentChatContext;
    if (viewCache[cacheKey]) {
        viewCache[cacheKey].element.remove();
        delete viewCache[cacheKey];
    }

    navToView('chat', currentChatContext, currentChatName);

    // 用 MutationObserver 等 DOM 渲染完成后再拉取数据
    const tryLoad = () => {
        const ct = currentChatContainer;
        if (!ct || !ct.querySelector('#chat-messages')) {
            // DOM 还没到位，再等一轮
            requestAnimationFrame(tryLoad);
            return;
        }
        loadChatHistory();
    };
    requestAnimationFrame(tryLoad);
}

// ═════════════════════ ONBOARDING GUIDE ═════════════════════

function showOnboardingGuide() {
    for (const key in viewCache) {
        viewCache[key].element.remove();
        delete viewCache[key];
    }
    _onboardingStep = 1;
    _onboardingInputText = '';
    _onboardingOsinResponse = '';
    if (_onboardingStreamCtl) { _onboardingStreamCtl.abort(); }
    _onboardingStreamCtl = null;
    _replaceMainContent(`<div id="onboarding-panel" class="onboarding-panel"><div class="onboarding-card" id="onboarding-card">${renderOnboardingStep1HTML()}</div></div>`);
}

function renderOnboardingStep1HTML() {
    return `<div id="onboarding-step1"><div class="onboarding-icon">🎉</div><h2 class="onboarding-title">${t('onb.welcome_title')}</h2><p class="onboarding-subtitle">${t('onb.welcome_desc2')}</p><div class="onboarding-features"><div class="onb-feature"><span>🔍</span> ${t('onb.feat1')}</div><div class="onb-feature"><span>📧</span> ${t('onb.feat2')}</div><div class="onb-feature"><span>🤖</span> ${t('onb.feat3')}</div></div><button class="btn btn-primary btn-lg" data-act="onboardingGoToStep2">${btnIcon('target')} ${t('onb.start_btn')}</button><div class="onboarding-skip"><a href="#" data-act="onboardingSkip" data-event="1">${t('onb.skip')}</a></div></div>`;
}

function renderOnboardingStep2HTML() {
    return `<div id="onboarding-step2"><div class="onboarding-step-indicator"><span class="onb-step done">${t('onb.step1_done')}</span><span class="onb-step-arrow">→</span><span class="onb-step active">${t('onb.step2_active')}</span></div><h3 class="onboarding-title" style="font-size:18px;margin-bottom:6px;">${t('onb.step2_title')}</h3><p style="color:var(--text-secondary);font-size:13px;margin-bottom:16px;">${t('onb.step2_desc')}</p><div class="onboarding-input-row"><input type="text" id="onboarding-osint-input" placeholder="${t('onb.osint_placeholder')}" class="onboarding-text-input" data-enter="onboardingStartOSINT" autofocus /><button class="btn btn-primary" id="onboarding-send-btn" data-act="onboardingStartOSINT">${t('onb.analyze_btn')}</button><button id="onboarding-stop-btn" class="hidden" style="background:var(--accent-red);color:#fff;border:none;padding:8px 16px;border-radius:var(--radius-sm);cursor:pointer;" data-act="onboardingStopOSINT">${btnIcon('x')} ${t('onb.stop_btn')}</button></div><div id="onboarding-results-area"></div><div id="onboarding-actions" class="hidden"></div><div class="onboarding-skip"><a href="#" data-act="onboardingSkip" data-event="1">${t('onb.skip')}</a></div></div>`;
}

function onboardingGoToStep2() {
    _onboardingStep = 2;
    $('onboarding-card').innerHTML = renderOnboardingStep2HTML();
    setTimeout(function() { var inp = $('onboarding-osint-input'); if (inp) inp.focus(); }, 100);
}

async function onboardingStartOSINT() {
    var input = $('onboarding-osint-input');
    var query = input.value.trim();
    if (!query) { toast(t('toast.enter_company')); return; }
    _onboardingInputText = query;
    input.disabled = true;
    $('onboarding-send-btn').disabled = true;
    $('onboarding-stop-btn').classList.remove('hidden');
    var resultsArea = $('onboarding-results-area');
    resultsArea.innerHTML = '';
    var prompt = t('onb.osint_prompt', { q: query });
    _onboardingStreamCtl = new AbortController();
    _chatStreamActive++;
    var progDiv = document.createElement('div');
    progDiv.className = 'onboarding-progress';
    progDiv.innerHTML = '<div class="wait-body"></div>';
    resultsArea.appendChild(progDiv);
    var wait = null;
    try {
        if (typeof TradeWait !== 'undefined') {
            wait = TradeWait.mount(progDiv.querySelector('.wait-body'), {
                mode: 'chat',
                title: t('onb.wait_title'),
                onCancel: function () { onboardingStopOSINT(); }
            });
        }
    } catch (e) {
        console.warn('Onboarding wait panel failed to mount, falling back', e);
        wait = null;
    }
    if (!wait) progDiv.innerHTML = '<div class="thinking-msg">💭 '+t('misc.thinking')+'</div>';
    var onbStopBtn = $('onboarding-stop-btn');
    if (onbStopBtn) { if (wait) onbStopBtn.classList.add('hidden'); else onbStopBtn.classList.remove('hidden'); }
    var toolEls = {};
    var progressDiv = null;
    var responseText = '';
    function ensureProgress() {
        if (!progressDiv) { progressDiv = document.createElement('div'); progressDiv.className = 'tool-progress'; progDiv.appendChild(progressDiv); }
        return progressDiv;
    }
    function addToolItem(tcId, name, status) {
        var div = ensureProgress();
        var el = document.createElement('div');
        el.className = 'tool-item ' + status;
        el.id = 'onb-tool-' + tcId;
        // Build DOM safely: textContent prevents injection
        var icon = document.createElement('span');
        icon.className = 'tool-icon';
        icon.textContent = status === 'running' ? '◌' : status === 'done' ? '✓' : '✗';
        var body = document.createElement('div');
        body.className = 'tool-body';
        var nameEl = document.createElement('div');
        nameEl.className = 'tool-name';
        nameEl.textContent = fmtTool(name);
        // Do not display tool args — they may contain customer data
        body.appendChild(nameEl);
        el.appendChild(icon);
        el.appendChild(body);
        div.appendChild(el);
        resultsArea.scrollTop = resultsArea.scrollHeight;
        toolEls[tcId] = el;
    }
    function updateTool(tcId, status) {
        var el = toolEls[tcId]; if (!el) return;
        el.className = 'tool-item ' + status;
        var icon = el.querySelector('.tool-icon'); if (icon) icon.textContent = status==='running'?'◌':status==='done'?'✓':'✗';
        resultsArea.scrollTop = resultsArea.scrollHeight;
    }
    function resetInputs() {
        if (input) input.disabled = false;
        var sb = $('onboarding-send-btn'); if (sb) sb.disabled = false;
        var st = $('onboarding-stop-btn'); if (st) st.classList.add('hidden');
        _onboardingStreamCtl = null;
    }
    try {
        var resp = await fetch('/api/trade/chat/stream', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Hermes-Session-Token': TOKEN, 'X-Company-ID': String(currentCompanyId) },
            body: JSON.stringify({ query: prompt, language: currentLang }),
            signal: _onboardingStreamCtl.signal
        });
        if (!resp.ok) {
            progDiv.remove();
            resultsArea.innerHTML = '<div class="onb-error">' + esc(t('onb.request_failed', { code: resp.status })) + '</div>';
            resetInputs();
            return;
        }
        var reader = resp.body.getReader();
        var decoder = new TextDecoder();
        var buffer = '';
        while (true) {
            var _a = await reader.read(), done = _a.done, value = _a.value;
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            var lines = buffer.split('\n');
            buffer = lines.pop() || '';
            var eventType = '', dataStr = '';
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i].replace(/\r$/, '');
                if (line.startsWith('event: ')) { eventType = line.slice(7).trim(); continue; }
                if (line.startsWith('data: ')) { dataStr = line.slice(6).trimStart(); continue; }
                if (line === '' && eventType && dataStr) {
                    var data;
                    try { data = JSON.parse(dataStr); } catch(e) { eventType=''; dataStr=''; continue; }
                    switch (eventType) {
                        case 'tool_start':
                            if (wait) wait.push({type:'tool_start', id:data.tool_call_id, label:fmtTool(data.name)});
                            else addToolItem(data.tool_call_id, data.name, 'running');
                            break;
                        case 'tool_complete':
                            if (wait) wait.push({type:'tool_complete', id:data.tool_call_id});
                            else updateTool(data.tool_call_id, 'done');
                            break;
                        case 'thinking':
                            if (wait) wait.push({type:'thinking', message:data.message});
                            break;
                        case 'job_attached':
                            // Attach the OSINT task panel on the onboarding screen too
                            _attachOsintTaskPanel(resultsArea, data);
                            break;
                        case 'response':
                            responseText = data.text || '';
                            if (wait) { wait.destroy(); wait = null; }
                            break;
                        case 'error':
                            if (wait) { wait.finish({phase:'failed'}); wait = null; }
                            progDiv.innerHTML = '<div class="onb-error">' + esc(data.message) + '</div>';
                            resetInputs();
                            return;
                    }
                    eventType = ''; dataStr = '';
                }
            }
        }
        progDiv.remove();
        if (responseText) {
            _onboardingOsinResponse = responseText;
            var respDiv = document.createElement('div');
            respDiv.className = 'onboarding-response';
            var raw = marked.parse(responseText);
            respDiv.innerHTML = DOMPurify.sanitize(raw, { ALLOWED_TAGS: ['p','br','strong','em','b','i','ul','ol','li','h1','h2','h3','h4','h5','h6','blockquote','code','pre','a','table','thead','tbody','tr','th','td','hr','span','div','img'], ALLOWED_ATTR: ['href','target','class','src','alt','width','height'], ALLOW_DATA_ATTR: false });
            if (typeof neutralizeRemoteImages === 'function') neutralizeRemoteImages(respDiv);
            resultsArea.appendChild(respDiv);
            showOnboardingActions();
        } else {
            resultsArea.innerHTML = '<div class="onb-error">' + esc(t('onb.no_response')) + '</div>';
        }
    } catch(e) {
        if (e.name === 'AbortError') {
            // Keep the panel in place to show ABORTED
            if (wait) { wait.finish({phase:'aborted'}); wait = null; }
            else { progDiv.remove(); resultsArea.innerHTML = '<div class="onb-info">' + esc(t('onb.stopped')) + '</div>'; }
        } else {
            if (wait) { wait.finish({phase:'failed'}); wait = null; }
            progDiv.remove();
            resultsArea.innerHTML = '<div class="onb-error">' + esc(t('onb.network_error', { msg: e.message })) + '</div>';
        }
    } finally {
        if (wait && !wait.final) { try { wait.destroy(); } catch (_) {} }
        _chatStreamActive = Math.max(0, _chatStreamActive - 1);
        _flushPendingDockVerdicts();
        _updateDock();
        resetInputs();
    }
}

function onboardingStopOSINT() {
    if (_onboardingStreamCtl) { _onboardingStreamCtl.abort(); _onboardingStreamCtl = null; }
}

function showOnboardingActions() {
    var actionsDiv = $('onboarding-actions');
    actionsDiv.classList.remove('hidden');
    actionsDiv.innerHTML = '<button class="btn btn-primary" data-act="onboardingSaveAndContinue">' + btnIcon('check') + ' ' + esc(t('onb.save_customer')) + '</button><button class="btn" data-act="onboardingFinish">' + esc(t('onb.enter_main')) + '</button>';
}

async function onboardingSaveAndContinue() {
    var inputText = _onboardingInputText.trim();
    var customerName = inputText;
    var website = '';
    try {
        var url = new URL(inputText.startsWith('http') ? inputText : 'https://' + inputText);
        customerName = url.hostname.replace(/^www\./, '').split('.')[0];
        website = url.hostname;
    } catch(_) {}
    var body = { name: customerName, note: _onboardingOsinResponse };
    if (website) body.company_website = website;
    var r = await api('POST', '/api/trade/customers', body);
    if (r?.id) { toast(t('onb.saved_customer')); onboardingFinish(); }
    else toast(r?.detail || t('onb.save_failed'));
}

function onboardingFinish() {
    try { localStorage.setItem('_onboarding_completed', '1'); } catch(_) {}
    navToView('chat', 'daily', t('nav.daily'));
}

function restartOnboarding() {
    // Clear onboarding flag and restart the guide
    try { localStorage.removeItem('_onboarding_completed'); } catch(_) {}
    showOnboardingGuide();
}

function onboardingSkip(e) {
    if (e) e.preventDefault();
    // Mark completed — the guide is optional and won't show again
    try { localStorage.setItem('_onboarding_completed', '1'); } catch(_) {}
    navToView('chat', 'daily', t('nav.daily'));
}

// ═════════════════════ COMPANY MANAGEMENT ═════════════════════
function showAddCompanyModal() {
    switchModalTab('tab-companies');
    showModal('company-modal');
    loadCompanyListUI();
}

function switchModalTab(tab) {
    $('tab-companies').classList.toggle('hidden', tab !== 'tab-companies');
    $('tab-identity').classList.toggle('hidden', tab !== 'tab-identity');
    $('tab-btn-companies').classList.toggle('active', tab === 'tab-companies');
    $('tab-btn-identity').classList.toggle('active', tab === 'tab-identity');
    if (tab === 'tab-identity') loadIdentityForCurrentCompany();
}

async function loadCompanies() {
    const prev = currentCompanyId;
    companies = await api('GET', '/api/trade/companies') || [];
    const sel = $('company-select');
    sel.innerHTML = '<option value="">' + esc(t('company.select') || 'Select company') + '</option>' +
        companies.map(c => `<option value="${c.id}" ${c.id===prev?'selected':''}>${esc(c.name)}</option>`).join('');
    if (prev && !companies.find(c=>c.id===prev)) {
        // Previously selected company was deleted
        currentCompanyId = null;
        saveState();
    }
}

function loadCompanyListUI() {
    const container = $('company-list-ui');
    if (!companies.length) {
        container.innerHTML = `<p style="color:var(--text-muted);font-size:13px;">${t('modal.co.empty')}</p>`;
        return;
    }
    container.innerHTML = companies.map(c => `
        <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border-light);">
            <div style="flex:1;"><div style="font-weight:600;font-size:13px;">${esc(c.name)}</div>
            <div style="font-size:11px;color:var(--text-muted);">${esc(c.slug)} · ${c.contact_email ? ' · ' + esc(c.contact_email) : ''}</div></div>
            <button class="btn btn-xs" data-act="exportCompany" data-arg="${c.id}">${t('modal.co.export')}</button>
            <button class="btn btn-danger btn-xs" data-act="deleteCompany" data-arg="${c.id}">${t('modal.co.delete')}</button>
        </div>`).join('');
}

// ── 公司数据导出 / 导入 ─────────────────────────────────────────────
let _pendingImportFile = null;
// 两阶段导入：预检返回的 upload_id，确认导入时凭它取回临时包（30 分钟有效）
let _importUploadId = null;

function _downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'trade-company.zip';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
}

async function exportCompany(cid) {
    if (!confirm(t('co.export_confirm'))) return;
    const expBtn = document.querySelector(
        'button[data-act="exportCompany"][data-arg="' + cid + '"]',
    );
    const restoreExp = (expBtn && typeof TradeWait !== 'undefined')
        ? TradeWait.inline(expBtn, {en: t('co.exporting'), zh: t('co.exporting')}) : null;
    try {
        const resp = await fetch(`/api/trade/companies/${cid}/export`, {
            headers: {
                'X-Hermes-Session-Token': TOKEN,
                'X-Company-ID': String(cid),
            },
        });
        if (resp.status === 413) {
            const data = await resp.json().catch(() => ({}));
            alert(t('co.export_too_large') + (data.paths || []).join('\n'));
            return;
        }
        if (!resp.ok) {
            const data = await resp.json().catch(() => ({}));
            toast(t('co.export_fail') + (data.detail || resp.status));
            return;
        }
        // 桌面目录超限时包内不含资料库文件，后端通过响应头告知需手动拷贝的路径
        let exportNote = null;
        const warnHeader = resp.headers.get('X-Trade-Export-Warnings');
        if (warnHeader) {
            try {
                const info = JSON.parse(decodeURIComponent(warnHeader));
                if (info.manual_paths && info.manual_paths.length) {
                    exportNote = t('co.export_note') + info.manual_paths.join('\n');
                } else if (info.warnings && info.warnings.length) {
                    exportNote = t('co.export_warn') + info.warnings.join('\n');
                }
            } catch(_) { /* 头解析失败不影响下载 */ }
        }
        const blob = await resp.blob();
        const cd = resp.headers.get('content-disposition') || '';
        const match = /filename="?([^";]+)"?/.exec(cd);
        _downloadBlob(blob, match ? decodeURIComponent(match[1]) : `trade-company-${cid}.zip`);
        if (exportNote) alert(exportNote);
        else toast(t('co.export_ok'));
    } catch (err) {
        toast(t('co.export_fail') + (err && err.message ? err.message : err));
    } finally {
        if (restoreExp) restoreExp();
    }
}

function showImportCompanyDialog() {
    // 导入/导出在本构建中始终可用。
    document.querySelectorAll('.import-company-backdrop').forEach(el => el.remove());
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop import-company-backdrop';
    backdrop.innerHTML = `
        <div class="modal" style="max-width:560px;">
            <h3>${t('modal.co.import_title')}</h3>
            <p style="font-size:12px;color:var(--text-muted);line-height:1.6;">
                ${t('modal.co.import_desc')}
            </p>
            <label style="display:flex;align-items:center;gap:8px;font-size:12px;margin:10px 0;">
                <input type="checkbox" id="imp-force-new"> ${t('modal.co.import_force')}
            </label>
            <input type="file" id="imp-file" accept=".zip" style="width:100%;margin:10px 0;">
            <div id="imp-status" style="font-size:12px;color:var(--text-secondary);white-space:pre-wrap;line-height:1.6;min-height:40px;"></div>
            <div class="form-actions">
                <button class="btn" data-act="closeBackdrop">${t('btn.close')}</button>
            </div>
        </div>`;
    document.body.appendChild(backdrop);
    document.getElementById('imp-file').addEventListener('change', (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;
        _pendingImportFile = file;
        const forceNew = document.getElementById('imp-force-new').checked;
        uploadCompanyImport(file, null, forceNew);
    });
}

async function uploadCompanyImport(file, targetCompanyId, forceNew) {
    const status = document.getElementById('imp-status');
    if (status) status.textContent = t('imp.analyzing');
    // 合并到非当前公司时先切换 session 绑定：导入端点会拒绝「绑定 A 却写 B」
    if (targetCompanyId && targetCompanyId !== currentCompanyId) {
        const switched = await api('POST', '/api/trade/companies/' + targetCompanyId + '/switch').catch(() => null);
        // 切换失败：停止上传，避免带着旧绑定去写另一个公司
        if (!switched) {
            if (status) status.textContent = t('imp.switch_fail');
            return;
        }
        currentCompanyId = targetCompanyId;
        saveState();
    }
    const fd = new FormData();
    fd.append('file', file);
    // 两阶段导入：先只读预检，列出同名客户冲突，用户逐对决定后再确认
    fd.append('preflight', 'true');
    if (targetCompanyId) fd.append('target_company_id', String(targetCompanyId));
    if (forceNew) fd.append('force_new', 'true');
    try {
        const resp = await fetch('/api/trade/companies/import-package', {
            method: 'POST',
            headers: { 'X-Hermes-Session-Token': TOKEN },
            body: fd,
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) {
            // 公司级歧义（多个同名公司）：和 job 阶段一样用 prompt() 让用户指定目标，再重新预检
            if (resp.status === 409 && data.candidates) {
                const list = (data.candidates || [])
                    .map(function (c) { return c.id + ': ' + c.name + ' (' + c.slug + ')'; })
                    .join('\n');
                const answer = prompt(t('imp.target_prompt') + list);
                const targetId = parseInt(answer, 10);
                // 用户给了有效 ID：清掉旧的上传状态，带目标公司重新预检
                if (targetId) {
                    _importUploadId = null;
                    uploadCompanyImport(_pendingImportFile || file, targetId, false);
                } else if (status) {
                    // 用户取消：保留文件选择，提示后可再次选文件重试
                    status.textContent = t('imp.cancelled');
                }
                return;
            }
            // 其它失败（非 zip / 过大 / 包不合规）：显示原因并清空选择以便重试
            if (status) status.textContent = t('imp.failed') + (data.detail || resp.status);
            // 清空选择：否则重新选同一个文件不会触发 change，用户无法重试
            const inp = document.getElementById('imp-file');
            if (inp) inp.value = '';
            return;
        }
        // 预检成功：交给冲突渲染决定「无冲突直接确认」还是「逐对选择」
        _renderImportConflicts(data);
    } catch (err) {
        if (status) status.textContent = t('imp.failed') + (err && err.message ? err.message : err);
        const inp = document.getElementById('imp-file');
        if (inp) inp.value = '';
    }
}

function _renderImportConflicts(data) {
    /** 预检结果：无冲突直接确认；有冲突渲染逐对选择（2026-11-20 审计 C2）。 */
    const status = document.getElementById('imp-status');
    _importUploadId = data.upload_id;

    // 无冲突：与今天一样的「一键导入」体验
    if (!data.conflicts || !data.conflicts.length) {
        if (status) status.textContent = t('imp.no_conflicts');
        _confirmImport([]);
        return;
    }

    if (status) {
        // 每个冲突一行：左侧源客户名，右侧选择「合并到目标」或「新建为提议名」
        const rows = data.conflicts.map(function (c) {
            // 后端没算新名字时兜底为「原名 (2)」，避免出现空选项
            const newName = c.proposed_new_name || ((c.source_name || '') + ' (2)');
            return '<div class="imp-conflict" data-source-id="' + esc(String(c.source_id)) + '">' +
                '<div class="imp-conflict-name">' + esc(c.source_name || '') + '</div>' +
                '<select data-role="imp-action">' +
                '<option value="merge">' + t('imp.merge_into') + esc(c.target_name || '') + t('imp.close_quote') + '</option>' +
                '<option value="create">' + t('imp.create_as') + esc(newName) + t('imp.close_quote') + '</option>' +
                '</select></div>';
        }).join('');
        status.innerHTML =
            '<div class="imp-conflict-title">' + esc(t('imp.conflicts_title', {n: String(data.conflicts.length)})) + '</div>' +
            rows +
            '<div class="imp-conflict-actions">' +
            '<button type="button" class="btn btn-xs" data-imp-bulk="merge">' + esc(t('imp.bulk_merge')) + '</button>' +
            '<button type="button" class="btn btn-xs" data-imp-bulk="create">' + esc(t('imp.bulk_create')) + '</button>' +
            '<button type="button" class="btn btn-primary btn-xs" id="imp-confirm-btn">' + esc(t('imp.confirm')) + '</button>' +
            '</div>';
    }

    // 批量按钮：把每行的 select 统一设成同一动作
    document.querySelectorAll('[data-imp-bulk]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const action = btn.getAttribute('data-imp-bulk');
            document.querySelectorAll('select[data-role="imp-action"]').forEach(function (sel) {
                sel.value = action;
            });
        });
    });
    // 开始导入：收集逐对选择后确认
    document.getElementById('imp-confirm-btn')?.addEventListener('click', function () {
        // 逐行读取，batch 按钮只是「预填」，最终仍以用户的逐对选择为准
        const decisions = Array.prototype.map.call(
            document.querySelectorAll('.imp-conflict'),
            function (el) {
                return {
                    source_id: Number(el.getAttribute('data-source-id')),
                    action: el.querySelector('select[data-role="imp-action"]').value,
                };
            },
        );
        _confirmImport(decisions);
    });
}

async function _confirmImport(decisions) {
    /** 用预检结果 + 逐对选择开始导入。 */
    const status = document.getElementById('imp-status');
    // 没有 upload_id：预检没跑完或状态被清掉，只能让用户重新选文件
    if (!_importUploadId) {
        if (status) status.textContent = t('imp.link_expired');
        return;
    }
    if (status) status.textContent = t('imp.importing');
    try {
        const resp = await fetch(
            '/api/trade/companies/import-package/' + encodeURIComponent(_importUploadId) + '/confirm',
            {
                method: 'POST',
                headers: {
                    'X-Hermes-Session-Token': TOKEN,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({customer_decisions: decisions}),
            },
        );
        const data = await resp.json().catch(function () { return {}; });
        if (!resp.ok) {
            // 过期：upload_id 已被清掉，链接不能再用，提示重选文件
            if (resp.status === 410) {
                if (status) status.textContent = t('imp.link_expired');
            } else if (resp.status === 409) {
                // 409：另一请求正在导入，或还有未选择的冲突
                if (status) status.textContent = data.detail || t('imp.in_progress');
            } else {
                // 其它错误：显示后端原因，让用户可重试
                if (status) status.textContent = t('imp.failed') + (data.detail || resp.status);
            }
            // 清空选择：确认失败后让用户能重新选同一个文件发起新一轮预检
            const inp = document.getElementById('imp-file');
            if (inp) inp.value = '';
            return;
        }
        // 确认成功：upload_id 已消耗，轮询后台任务进度
        _importUploadId = null;
        pollImportJob(data.job_id);
    } catch (err) {
        if (status) status.textContent = t('imp.failed') + (err && err.message ? err.message : err);
        const inp = document.getElementById('imp-file');
        if (inp) inp.value = '';
    }
}

async function pollImportJob(jobId) {
    const status = document.getElementById('imp-status');
    // task 模式面板：阶段只跟着真实的 status/phase 走，不估算、不显示百分比
    let wait = null;
    let waitHost = null;
    const revealWait = function () { if (waitHost) waitHost.style.display = ''; };
    if (status && status.parentNode && typeof TradeWait !== 'undefined') {
        const host = document.createElement('div');
        host.className = 'wait-import-host';
        status.parentNode.insertBefore(host, status);
        waitHost = host;
        try {
            wait = TradeWait.mount(host, {
                mode: 'task',
                title: t('modal.co.import'),
                statusLabel: t('modal.co.import'),
                cancelText: t('btn.close'),
                // “关闭”只收起面板，后台导入继续；完成/失败时自动重新显示
                onDismiss: function () { host.style.display = 'none'; }
            });
            wait.phase('working', t('imp.queued'));
        } catch (e) { console.warn('导入等待面板挂载失败', e); wait = null; }
    }
    for (let i = 0; i < 1800; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        let data = null;
        try {
            const resp = await fetch(`/api/trade/companies/import-package/${jobId}`, {
                headers: { 'X-Hermes-Session-Token': TOKEN },
            });
            data = await resp.json();
            if (!resp.ok) {
                // 任务只存在进程内存里：服务重启后 404，再轮询 30 分钟也没用
                revealWait();
                if (wait) wait.finish({phase: 'failed'});
                if (status) {
                    status.textContent = resp.status === 404
                        ? t('imp.job_expired')
                        : t('imp.status_fail') + (data.detail || resp.status);
                }
                return;
            }
        } catch (err) {
            continue;
        }
        if (!data) continue;
        if (data.status === 'done') {
            const report = data.report || {};
            revealWait();
            if (wait) wait.finish({phase: 'acquired', zh: t('imp.done_short')});
            if (status) {
                status.textContent = t('imp.report', {
                    mode: report.mode === 'created' ? t('imp.mode_created') : t('imp.mode_merged'),
                    name: (report.target && report.target.name) || '',
                    customers: (report.tables && report.tables.customers && report.tables.customers.inserted) || 0,
                    conversations: (report.tables && report.tables.conversations && report.tables.conversations.inserted) || 0,
                    orders: (report.tables && report.tables.orders && report.tables.orders.inserted) || 0,
                    files: (report.files && report.files.copied) || 0,
                    memory: report.memory && report.memory.added ? t('imp.memory_added', {n: report.memory.added}) : ''
                });
                // 导出时跳过的资料库文件：这里给出目标机的精确落盘位置
                if (report.warnings && report.warnings.length) {
                    status.textContent += '\n⚠️ ' + report.warnings.join('\n');
                }
            }
            await loadCompanies();
            if (report.target && report.target.id) {
                await onCompanyChange(report.target.id);
            }
            setTimeout(() => {
                const backdrop = document.querySelector('.import-company-backdrop');
                if (backdrop) backdrop.remove();
            }, 2000);
            return;
        }
        if (data.status === 'error') {
            revealWait();
            if (wait) wait.finish({phase: 'failed'});
            if (data.code === 'ambiguous_company') {
                // prompt() 是纯文本，不能走 esc()（HTML 转义会把 A&B 显示成 A&amp;B），
                // 也不用模板插值，免得 XSS 守卫把它当成 innerHTML 渲染点
                const list = (data.candidates || [])
                    .map(function (c) { return c.id + ': ' + c.name + ' (' + c.slug + ')'; })
                    .join('\n');
                const answer = prompt(t('imp.target_prompt') + list);
                const targetId = parseInt(answer, 10);
                if (targetId && _pendingImportFile) {
                    uploadCompanyImport(_pendingImportFile, targetId, false);
                } else if (status) {
                    status.textContent = t('imp.cancelled');
                }
                return;
            }
            if (status) status.textContent = t('imp.failed') + (data.error || t('imp.unknown_error'));
            return;
        }
        if (wait) wait.phase('working', data.phase === 'queued' ? t('imp.queued') : t('imp.in_progress_short'));
        if (status) status.textContent = t('imp.progress', {phase: data.phase || data.status});
    }
    revealWait();
    if (wait) wait.finish({phase: 'failed', zh: t('imp.timeout')});
    if (status) status.textContent = t('imp.timeout_status');
}

function autoSlug() {
    const name = $('co-name').value.trim();
    const slugEl = $('co-slug');
    if (!name) {
        slugEl.value = '';
        slugEl.placeholder = t('modal.co.slug_ph');
        slugEl.style.color = 'var(--text-muted)';
        return;
    }
    // 前端实时生成 slug 预览（与后端的 _slugify 逻辑一致）
    let s = name.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/--+/g, '-')
        .replace(/^-|-$/g, '') || 'company';
    slugEl.value = s;
    slugEl.style.color = '';
}

async function createCompany() {
    const name = $('co-name').value.trim();
    if (!name) { toast(t('co.name_required')); return; }
    const slug = $('co-slug').value.trim();
    const body = {name};
    if (slug) body.slug = slug;
    ['contact_name','contact_email','website'].forEach(f => {
        const elId = 'co-' + f.replace(/_/g, '-');
        const v = (document.getElementById(elId)?.value || '').trim();
        if (v) body[f] = v;
    });
    const r = await api('POST', '/api/trade/companies', body);
    if (r?.id) {
        if (r.work_dir_is_new === false) {
            toast(t('co.created_workdir', {name: r.work_dir.split('/').pop()}));
        } else {
            toast(t('co.created_ok'));
        }
        ['co-name','co-slug','co-contact-name','co-contact-email','co-website'].forEach(id=>$(id).value='');
        // 创建成功即关闭弹窗 —— 不需要用户再点一次「关闭」
        hideModal('company-modal');
        await loadCompanies();
        onCompanyChange(r.id);
    } else toast(r?.detail||t('co.create_fail'));
}

async function deleteCompany(id) {
    if (!confirm(t('co.delete_confirm'))) return;
    // 后端要求 X-Confirm-Delete: yes，否则 400（审计 P1-8）
    const r = await api('DELETE', `/api/trade/companies/${id}`, null, {
        'X-Confirm-Delete': 'yes',
    });
    if (r?.ok) { toast(t('co.deleted')); if (currentCompanyId===id) onCompanyChange(''); await loadCompanies(); loadCompanyListUI(); }
    else toast(r?.detail||t('co.delete_fail'));
}

async function onCompanyChange(cid) {
    // 清空视图缓存
    for (const key in viewCache) {
        viewCache[key].element.remove();
        delete viewCache[key];
    }
    // 中止进行中的新手引导流，防止 reader 泄漏
    if (_onboardingStreamCtl) { _onboardingStreamCtl.abort(); _onboardingStreamCtl = null; }
    // 中止进行中的聊天流：否则它会继续消耗 token，且结束后把回复写进新公司的会话窗口
    _abortChatStream();
    // 清空 cron 输出记录，防止跨公司污染
    _shownCronOutputs = new Set();
    // 清空"当前选中的库/客户"——它们是**上一家公司**的 id。留着会让下一次
    // 发消息把旧库塞进请求体：后端按新公司过滤后查不到（不会串数据），
    // 但 build_query 仍会走文档库分支注入 doc_context → 每次对话多付
    // 约 5700 token，并让 Agent 去扫一个不属于当前公司的目录。
    currentLibraryId = null;
    currentCustomerId = null;
    if (cid) {
        const newCid = parseInt(cid);
        const prevCid = currentCompanyId;
        // 先更新前端状态（让后续 API 调用带上正确的 X-Company-ID header）
        currentCompanyId = newCid;
        // 通知后端切换 session 绑定（旧 cid 会触发 403，因此 _enforce_company_binding 需放行 /switch 端点）。
        // 网络异常时 api() 会 throw；.catch 折算成 null，与 HTTP 失败走同一条回滚，
        // 否则前端显示新公司、后端仍绑旧公司，后续每个请求都 403（审计 O-7）。
        const switched = await api('POST', '/api/trade/companies/' + newCid + '/switch').catch(() => null);
        if (!switched) {
            // 切换失败：回滚前端选中，避免后续请求带着未绑定的公司 ID
            currentCompanyId = prevCid;
            const sel = $('company-select');
            if (sel && prevCid != null) sel.value = String(prevCid);
            toast(t('co.switch_fail'));
            return;
        }
        saveState();
        loadUsageToday();
        // 首个公司 + 引导未完成 → 显示新手引导
        if (companies.length === 1 && !isOnboardingCompleted()) {
            showOnboardingGuide();
            return;
        }
        navToView('chat', 'daily', t('nav.daily'));
    } else {
        currentCompanyId = null;
        saveState();
        loadUsageToday();
        renderNoCompanyPage();
    }
}

async function loadIdentityForCurrentCompany() {
    if (!currentCompanyId) return;
    const r = await api('GET', `/api/trade/companies/${currentCompanyId}/agent-identity`);
    if (r) $('identity-editor').value = r.agent_identity_md || '';
}

async function saveCompanyIdentity() {
    if (!currentCompanyId) return;
    const identity = $('identity-editor').value;
    const r = await api('PUT', `/api/trade/companies/${currentCompanyId}/agent-identity`, {agent_identity_md:identity});
    if (r?.company_id) { toast(t('co.identity_saved')); hideModal('company-modal'); }
    else toast(r?.detail||t('co.identity_fail'));
}

// ═════════════════════ HERMES 版本过旧 → 升级面板 ═════════════════════
// Trade 进程内嵌 Hermes：Hermes 版本过旧时 agent 功能全废。桌面端（tradewin）用户
// 看不到终端，所以必须有个界面把「出什么问题 / 正在做什么 / 现在该做什么」讲清楚。
// 自动升级由后端在启动时已经拉起，这里只负责显示进度、失败重试、成功后刷新。
// #region hermes-upgrade

const HERMES_UPGRADE_TEXT = {
    idle:             {icon:'⬆️', title: langText('准备升级 Hermes', 'Preparing the Hermes upgrade'),
                       message: langText('Trade 需要更新版本的 Hermes，正在准备升级…', 'Trade needs a newer Hermes and is preparing the upgrade…')},
    checking_network: {icon:'🔍', title: langText('正在检查网络', 'Checking the network'),
                       message: langText('正在确认能否访问 GitHub…', 'Checking whether GitHub is reachable…')},
    upgrading:        {icon:'⬆️', title: langText('正在升级 Hermes', 'Upgrading Hermes'),
                       message: langText('升级进行中，请勿关闭 Trade。这一步可能需要几分钟。', 'Upgrade in progress — keep Trade open. This can take a few minutes.')},
    done:             {icon:'✅', title: langText('升级完成', 'Upgrade complete'),
                       message: langText('Hermes 已升级完成。请点击「重启 Trade」使新版本生效。', 'Hermes is upgraded. Click "Restart Trade" to load the new version.')},
    offline:          {icon:'🌐', title: langText('需要先开启代理', 'Turn on your VPN first'),
                       message: langText('无法访问 GitHub，升级没有开始。请开启代理（VPN）后点「重试」。', 'GitHub is unreachable, so the upgrade did not start. Turn on your VPN and click Retry.')},
    failed:           {icon:'⚠️', title: langText('升级失败', 'Upgrade failed'),
                       message: langText('Hermes 没有升级成功。请确认网络通畅后点「重试」。', 'The Hermes upgrade did not succeed. Check your connection and click Retry.')},
    // 不是「升级 Hermes」能解决的问题：Hermes 已经是新版，旧的是 Trade 自己的运行环境。
    // 用独立文案，否则会显示「正在准备升级 Hermes」把用户引到一条没结果的路上去
    // （2026-10-15 客户机实测：那一版就是这么卡住的）。
    rebuild_needed:   {icon:'🧰', title: langText('Trade 需要重建运行环境', 'Trade needs a runtime rebuild'),
                       message: langText('你的 Hermes 已经是新版，但 Trade 的运行环境还是旧的。点下面的按钮重建一次即可，数据不会丢。', 'Hermes is already current, but the Trade runtime is not. Click the button below to rebuild once — your data is kept.')},
    // S11/R12：本机根本没装 Hermes。独立文案 + 安装步骤（后端 fix=install_hermes），
    // 不能落回「准备升级 Hermes」——那是升级，不是安装。
    install_needed:   {icon:'⬇️', title: langText('未安装 Hermes（AI 引擎）', 'Hermes (the AI engine) is not installed'),
                       message: langText('Trade 需要 Hermes 才能聊天。按下面的步骤安装并配置模型，然后重新打开 Trade。', 'Trade needs Hermes to chat. Follow the steps below to install it, configure a model, then reopen Trade.')},
    // 重建进行中：服务已经被停掉（否则换不了 venv），所以这一段界面是「最后一屏」——
    // 用户接下来看到的是轮询等待，不是进度条。文案必须说清「会自己回来」，否则他会以为卡死。
    rebuilding:       {icon:'🧰', title: langText('正在重建运行环境', 'Rebuilding the runtime'),
                       message: langText('正在重装 Trade 的运行环境（约 5~10 分钟），期间 Trade 会暂时打不开。完成后页面会自动刷新，请不要关闭。', 'Reinstalling the Trade runtime (about 5–10 minutes); Trade is unavailable meanwhile. The page reloads when it is done — do not close it.')},
};

let _hermesUpgradeAbort = null;
let _hermesWait = null;
let _hermesWaitHost = null;

/** 升级等待面板：task 模式；读数行来自真实日志，先过滤路径与长 token。 */
function _mountHermesWait() {
    if (_hermesWait && _hermesWait.final) {
        try { _hermesWait.destroy(); } catch (e) {}
        _hermesWait = null;
    }
    if (_hermesWait) return _hermesWait;
    const host = $('hermes-upgrade-wait');
    if (!host || typeof TradeWait === 'undefined') return null;
    _hermesWaitHost = host;
    host.style.display = '';
    try {
        _hermesWait = TradeWait.mount(host, {
            mode: 'task',
            title: langText('Hermes 升级 · UPGRADE', 'HERMES UPGRADE'),
            statusLabel: langText('Hermes 升级中', 'Upgrading Hermes'),
            cancelText: langText('收起', 'Hide'),
            // “收起”只隐藏面板，升级继续；完成/失败时自动重新显示
            onDismiss: function () { host.style.display = 'none'; }
        });
        _hermesWait.phase('working', langText('升级中', 'Upgrading'));
    } catch (e) {
        console.warn('升级等待面板挂载失败', e);
        _hermesWait = null;
    }
    return _hermesWait;
}

/**
 * 升级日志脱敏（审计 O-20）：读数面板和折叠的原始日志共用同一套规则。
 * 覆盖绝对路径（Windows/POSIX/UNC）、JWT、以及 24 位以上的密钥/哈希。
 * 顺序：先整段 JWT，再泛化长串，避免 JWT 被 24 位规则切碎后仍留残留。
 */
function _redactHermesLine(line) {
    return String(line || '')
        .replace(/\beyJ[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+/g, '[token]')
        .replace(/\b[A-Za-z0-9_\-]{20,}\.[A-Za-z0-9_\-]{20,}\.[A-Za-z0-9_\-]{10,}\b/g, '[token]')
        .replace(/[A-Za-z]:\\[^\s"']+/g, '[路径]')
        .replace(/\\\\[^\s"']+/g, '[路径]')
        .replace(/(?:\/[\w.\-]+){2,}/g, '[路径]')
        // W15 O-25：阈值降到 20 —— 20–23 位密钥此前会原样通过
        .replace(/\b[A-Za-z0-9_\-]{20,}\b/g, '[token]');
}

function _hermesWaitLine(line) {
    if (!_hermesWait) return;
    // 隐私/噪声过滤：绝对路径与超长标识不进读数
    const safe = _redactHermesLine(line).slice(0, 120);
    if (safe) _hermesWait.note(safe);
}

/**
 * 启动时检查 Hermes 是否过旧；需要升级则显示面板并返回 true。
 * 调用方据此中断常规初始化 —— 此时聊天/公司数据都还用不了。
 *
 * 用裸 fetch 而不是 api()：本检查发生在公司选择之前，api() 会附带 X-Company-ID
 * 并在失败时弹 toast，两者在这里都不合适。
 */
async function checkHermesCompatOrShowPanel() {
    let compat = null;
    try {
        const r = await fetch('/api/trade/system/hermes-compat', {
            headers: {'X-Hermes-Session-Token': TOKEN}, cache: 'no-store',
        });
        if (r.ok) compat = await r.json();
    } catch(_) {}
    // Hermes 后台升级成功但 Trade 还没重启：提示手动重启（不自动重启）
    if (compat && compat.usable && compat.restart_required) {
        _showRestartPrompt();
        toast('✅ Hermes 升级完成，请点击「🔄 重启」使新版本生效。');
    }
    // 拿不到状态就不拦 —— 不能因为一个检查把整个软件挡在门外
    if (!compat || compat.usable) return false;
    showHermesUpgradePanel(compat);
    return true;
}

/** 显示升级面板，渲染已有状态，并开始消费进度流。 */
function showHermesUpgradePanel(compat) {
    const overlay = $('hermes-upgrade-overlay');
    if (!overlay) return;
    overlay.classList.remove('hidden');
    renderHermesUpgradeSteps(compat.steps || []);
    const upgrade = compat.upgrade || {status:'idle', message:''};
    // 需要「重建 Trade 运行环境」时后端**没有**升级任务在跑（升级 Hermes 也解决不了），
    // 所以要显示专属文案，而不是 upgrade.status 的默认态。
    //
    // ⚠️ 这条分支**不能**再启动进度流：重建场景下后端状态恒为 idle，流的第一个 state
    // 事件就是 {status:'idle'}，会把刚设好的标题盖回「准备升级 Hermes」—— 正好又变成
    // 我们要消灭的那种误导（2026-10-15 用户截图实证）。重建没有进度可看，也不需要流。
    if (compat.fix === 'rebuild_trade_venv' && !upgrade.running) {
        applyHermesUpgradeState({status:'rebuild_needed', message: compat.reason});
    } else if (compat.fix === 'install_hermes') {
        // S11/R12：没有 Hermes 时后端不会有升级任务，状态恒为 idle —— 同样不能启动
        // 进度流，否则首个 idle 事件会把「未安装」标题盖回「准备升级 Hermes」。
        applyHermesUpgradeState({status:'install_needed', message: compat.reason});
    } else {
        applyHermesUpgradeState(upgrade);
        _mountHermesWait();
        startHermesUpgradeStream(0);
    }
}

/** 渲染三条可照做的升级步骤；命令整行可选中，方便复制。 */
function renderHermesUpgradeSteps(steps) {
    const box = $('hermes-upgrade-steps');
    if (!box) return;
    box.innerHTML = '';
    if (!steps.length) return;
    steps.forEach(function(step, i) {
        const div = document.createElement('div');
        div.className = 'hermes-upgrade-step';
        const title = document.createElement('div');
        title.className = 'hermes-upgrade-step-title';
        title.textContent = (i + 1) + ') ' + (step.title || '');
        const detail = document.createElement('div');
        detail.className = 'hermes-upgrade-step-detail';
        detail.textContent = step.detail || '';
        const code = document.createElement('code');
        code.textContent = step.command || '';
        div.appendChild(title);
        div.appendChild(detail);
        div.appendChild(code);
        box.appendChild(div);
    });
}

/** 按状态刷新面板文案与按钮（文案集中在上面的 HERMES_UPGRADE_TEXT）。 */
function applyHermesUpgradeState(upgrade) {
    const status = upgrade.status || 'idle';
    const text = HERMES_UPGRADE_TEXT[status] || HERMES_UPGRADE_TEXT.idle;
    const icon = $('hermes-upgrade-icon'), title = $('hermes-upgrade-title');
    const msg = $('hermes-upgrade-message'), actions = $('hermes-upgrade-actions');
    if (icon) icon.textContent = text.icon;
    if (title) title.textContent = text.title;
    // 后端可能给出更具体的说明（如退出码），有就用它
    if (msg) msg.textContent = upgrade.message || text.message;
    if (!actions) return;
    actions.innerHTML = '';

    // 只在「停下来了」的失败态给重试按钮：运行中给按钮会让用户以为可以加速
    const canRetry = (status === 'failed' || status === 'offline');
    if (canRetry) {
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary';
        btn.textContent = langText('重试升级', 'Retry upgrade');
        btn.onclick = function() { retryHermesUpgrade(); };
        actions.appendChild(btn);
    }
    // 需要重建运行环境：给「开始重建」按钮，取代原来让用户自己去终端粘一行 curl。
    // 客群是电脑小白，那一行对他们等于「软件坏了」—— 按钮才是他们能用的东西。
    // 下面的步骤指引仍保留（折叠在按钮之后），作为万一自动重建走不通时的手动兜底。
    if (status === 'rebuild_needed') {
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary';
        btn.textContent = langText('开始重建', 'Start rebuild');
        btn.onclick = function() { startVenvRebuild(btn); };
        actions.appendChild(btn);
    }
    // Hermes 升级成功不再自动重启：与系统更新一致，由用户点重启
    if (status === 'done') {
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary';
        btn.textContent = langText('重启 Trade', 'Restart Trade');
        btn.onclick = function() { doRestartTrade({currentTarget: btn}); };
        actions.appendChild(btn);
    }
    // 升级已在进行/已结束时，步骤指引不占地方（失败时再显示出来给用户照做）。
    // rebuilding 也要隐藏：那时服务已经停了，屏上的「步骤」只会让人以为还要自己动手。
    const stepsBox = $('hermes-upgrade-steps');
    if (stepsBox) stepsBox.style.display = (status === 'upgrading' || status === 'checking_network' || status === 'done' || status === 'rebuilding') ? 'none' : 'block';
    // 统一等待面板跟着真实状态走
    if (_hermesWait) {
        if (status === 'done' || status === 'failed' || status === 'offline') {
            if (_hermesWaitHost) _hermesWaitHost.style.display = '';
        }
        if (status === 'done') _hermesWait.finish({phase: 'acquired', zh: langText('升级完成', 'Upgrade complete')});
        else if (status === 'failed' || status === 'offline') _hermesWait.finish({phase: 'failed'});
        else if (status === 'upgrading') _hermesWait.phase('working', langText('升级中', 'Upgrading'));
        else if (status === 'checking_network') _hermesWait.phase('working', langText('检查网络', 'Checking the network'));
    }
}

/** 手动重试：让后端重新走一遍「探网络 → hermes update」。 */
async function retryHermesUpgrade() {
    const actions = $('hermes-upgrade-actions');
    if (actions) actions.innerHTML = '<span style="font-size:12px;color:var(--text-muted);">'
        + esc(langText('正在重试…', 'Retrying…')) + '</span>';
    try {
        await fetch('/api/trade/system/hermes-upgrade', {
            method: 'POST', headers: {'X-Hermes-Session-Token': TOKEN},
        });
    } catch(_) {}
    startHermesUpgradeStream(0);
}

/**
 * 一键重建 Trade 的运行环境（venv 的解释器版本不对时）。
 *
 * 为什么不复用 doTradeUpdate：那是「升级代码」，这是「换掉跑代码的解释器」——
 * 后者要停服务 5~10 分钟、且必须替换 venv 目录，用户必须知情并确认（客群是电脑
 * 小白，服务毫无预兆地消失会让他们以为软件坏了）。
 *
 * 后端收到请求后会派一个独立子进程、随即本进程退出，所以这里的 fetch
 * **大概率拿不到响应**（连接被掐断）—— 那不是失败，是预期行为，照常进入等待。
 */
async function startVenvRebuild(btn) {
    const okToGo = confirm(
        langText('重建运行环境大约需要 5~10 分钟。', 'The runtime rebuild takes about 5–10 minutes.') + '\n\n' +
        langText('期间 Trade 会暂时打不开，完成后页面会自动刷新。', 'Trade is unavailable meanwhile and the page reloads when it is done.') + '\n\n' +
        langText('现在开始吗？', 'Start now?')
    );
    if (!okToGo) return;

    if (btn) { btn.disabled = true; btn.textContent = langText('正在启动…', 'Starting…'); }
    let rejected = null;
    try {
        const r = await fetch('/api/trade/system/rebuild-venv', {
            method: 'POST', headers: {'X-Hermes-Session-Token': TOKEN},
        });
        const data = await r.json().catch(function(){ return null; });
        // 只有后端**明确拒绝**（例如当前其实不需要重建）才停手；
        // 拿不到响应时按「已开始」处理 —— 见上面的说明
        if (data && data.ok === false) rejected = data.error || langText('重建没有启动。', 'The rebuild did not start.');
    } catch(_) { /* 服务在响应回来之前就被子进程停掉了 —— 预期之内 */ }

    if (rejected) {
        applyHermesUpgradeState({status:'failed', message: rejected + langText(' 可以按下面的步骤手动重装。', ' You can reinstall manually with the steps below.')});
        return;
    }
    applyHermesUpgradeState({status:'rebuilding'});
    // 重建比普通重启慢得多，兜底窗口给到 15 分钟
    // （默认的 2 分钟会在它真正成功之前就报「超时」，把用户吓去手动折腾）
    _waitForRestartAndReload(function() {
        toast(langText('重建耗时较长。如果页面没有自动刷新，请手动刷新一次；若一直打不开，请联系技术支持。', 'The rebuild takes a while. If the page does not reload by itself, refresh it once; if Trade still will not open, contact support.'));
    }, 900);
}

/**
 * 消费升级进度流（SSE）。断线不致命：面板上的「重试」和刷新页面都能恢复，
 * 所以这里吞掉异常，不弹错误。
 */
async function startHermesUpgradeStream(offset) {
    _mountHermesWait();
    if (_hermesUpgradeAbort) _hermesUpgradeAbort.abort();
    _hermesUpgradeAbort = new AbortController();
    try {
        const r = await fetch('/api/trade/system/hermes-upgrade/stream?offset=' + (offset || 0), {
            headers: {'X-Hermes-Session-Token': TOKEN},
            signal: _hermesUpgradeAbort.signal,
        });
        if (!r.ok || !r.body) return;
        const reader = r.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        while (true) {
            const chunk = await reader.read();
            if (chunk.done) break;
            buffer += decoder.decode(chunk.value, {stream: true});
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';
            for (const raw of lines) {
                const line = raw.replace(/\r$/, '');
                if (!line.startsWith('data: ')) continue;
                let data;
                try { data = JSON.parse(line.slice(6)); } catch(_) { continue; }
                if (data.type === 'log') { appendHermesUpgradeLog(data.line); _hermesWaitLine(data.line); }
                else if (data.type === 'state') {
                    applyHermesUpgradeState(data);
                    // 升级成功不再自动重启：提示用户点重启（与系统更新一致）
                    if (data.status === 'done') { promptRestartAfterHermesUpgrade(); return; }
                }
            }
        }
    } catch(_) {}
}

/** 追加一行升级日志（自动滚到底部，让用户看到「有在动」）。
 *  原始日志同样要脱敏 —— 它只是默认折叠，点开就能看到全文（审计 O-20）。 */
function appendHermesUpgradeLog(line) {
    const box = $('hermes-upgrade-log');
    if (!box) return;
    box.textContent += _redactHermesLine(line) + '\n';
    box.scrollTop = box.scrollHeight;
}

/** Hermes 升级成功：提示手动重启，不再自动等待服务重启。 */
function promptRestartAfterHermesUpgrade() {
    _showRestartPrompt();
    toast('✅ Hermes 升级完成，请点击「🔄 重启」使新版本生效。');
}

// #endregion hermes-upgrade

