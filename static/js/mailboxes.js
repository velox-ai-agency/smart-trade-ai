// ═════════════════════ MAILBOXES VIEW（全局 IMAP 绑定，不按公司隔离）═════════════════════

/** 预设 IMAP 服务器（与 trade/mailbox.py PRESETS 一致） */
const MAILBOX_PRESETS = {
    '126': { host: 'imap.126.com', port: 993 },
    '163': { host: 'imap.163.com', port: 993 },
    'qq': { host: 'imap.qq.com', port: 993 },
    'gmail': { host: 'imap.gmail.com', port: 993 },
    custom: { host: '', port: 993 },
};

/** 连接指南正文（附录全文；仅按设计稿改三处措辞） */
const MAILBOX_GUIDE = {
    intro: `
        <p><b>先在邮箱那边开好，再回这里填。</b></p>
        <p>trade 只读你的收件箱，不删信、不标已读、不发信。连接分两步：第一步去你的邮箱网页版开 IMAP、
        拿一个 16 位授权码；第二步回这里填表、点「测试连接」。</p>
        <p><b>最重要的一句话：密码栏填的是「授权码」，不是你的邮箱登录密码。</b>
        四家邮箱都不许用登录密码连 trade 这类软件，填登录密码一定连不上（报错 535）。
        授权码是邮箱专门给 trade 发的另一把钥匙，只显示一次，拿到就立即复制保存；丢了可以重新生成一个，旧的作废。</p>`,
    '126': `
        <ol style="margin:4px 0;padding-left:20px;">
            <li>电脑浏览器打开 mail.126.com，用邮箱账号和密码登录（这是唯一一次用登录密码的地方）。</li>
            <li>点页面上方的「设置」，在下拉菜单里选「POP3/SMTP/IMAP」。</li>
            <li>找到「IMAP/SMTP 服务」，点右边的「开启」。如果页面推荐你装「邮箱大师」，不用装，点「继续开启」。</li>
            <li>按提示验证身份：用绑定手机扫码发一条短信，或点「手动发送短信」，发完回页面点「我已发送」。</li>
            <li>页面会出现一串 16 位字母和数字，这就是授权码。<b>立即复制，存到一个你找得到的地方</b>
            （记事本、备忘录都行）。关掉页面就再也看不到了，丢了只能在同个页面点「新增授权密码」重新生成一个。</li>
            <li>回 trade 填表：邮箱类型选 126，邮箱地址填完整地址（比如 name@126.com），密码栏粘贴刚才的授权码。
            服务器和端口不用动（已经给你填好了：imap.126.com，端口 993）。</li>
            <li>点「测试连接」。测通后点「绑定」。点「手动拉取」开始收信。</li>
        </ol>`,
    '163': `
        <p>和 126 一模一样，只换地址：</p>
        <ol style="margin:4px 0;padding-left:20px;">
            <li>打开 mail.163.com 登录。</li>
            <li>「设置」→「POP3/SMTP/IMAP」。</li>
            <li>开启「IMAP/SMTP 服务」，短信验证。</li>
            <li>复制 16 位授权码，立即保存。</li>
            <li>回 trade：类型选 163，地址填 name@163.com，密码栏粘贴授权码。服务器 imap.163.com，端口 993。</li>
            <li>点「测试连接」。测通后点「绑定」。</li>
        </ol>`,
    qq: `
        <ol style="margin:4px 0;padding-left:20px;">
            <li>电脑浏览器打开 mail.qq.com 登录。</li>
            <li>点页面顶部的「设置」，选「帐户」标签页（如果你的页面是新版，在「设置」→「账号与安全」→「安全设置」里找）。</li>
            <li>往下翻，找到「POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV 服务」这一栏。</li>
            <li>点「IMAP/SMTP 服务」后面的「开启」，按提示用绑定手机发短信验证，点「我已发送」。</li>
            <li>点「生成授权码」，按提示再验证一次（短信或 QQ 手机版确认）。页面会弹出 16 位授权码，
            <b>立即复制保存</b>，关掉就看不到了。</li>
            <li>回 trade：类型选 QQ，地址填完整 QQ 邮箱，密码栏粘贴授权码。服务器 imap.qq.com，端口 993。</li>
            <li>注意两点：QQ 开完 IMAP 有时要等几小时才生效，刚开完连不上先等一等再试；
            以后你改了 QQ 密码，授权码会失效，要重新生成一个，到 trade 列表点「更新授权码」。</li>
        </ol>`,
    gmail: `
        <p>Gmail 要多做一步：先开「两步验证」，才能生成「应用专用密码」（这就是 Gmail 的授权码）。</p>
        <ol style="margin:4px 0;padding-left:20px;">
            <li>打开 mail.google.com 登录，点右上角齿轮「设置」→「查看所有设置」。</li>
            <li>点「转发和 POP/IMAP」标签页，在「IMAP 访问」一栏选「启用 IMAP」，拉到页面最下面点「保存修改」。</li>
            <li>点右上角头像 →「管理您的 Google 账号」→ 左边选「安全性」。</li>
            <li>找到「两步验证」，点进去按提示开启（要收一条手机短信验证码，或用验证器 App）。</li>
            <li>开完两步验证，回到「安全性」页面，找到「应用专用密码」（找不到就直接打开
            myaccount.google.com/apppasswords）。如果没开两步验证，这个入口是不显示的。</li>
            <li>在应用名那栏填 trade（随便写个你认得出的名字就行），点「创建」。页面会显示 16 位密码，
            分成 4 组、每组 4 个字母，<b>立即复制保存</b>，关掉就看不到了。</li>
            <li>回 trade：类型选 Gmail，地址填完整 Gmail 地址，密码栏粘贴这 16 位密码。
            <b>粘贴后把中间的空格去掉</b>（比如 abcd efgh ijkl mnop 要变成 abcdefghijklmnop）。
            服务器 imap.gmail.com，端口 993。</li>
            <li>点「测试连接」。测通后点「绑定」。</li>
        </ol>`,
    custom: `
        <ol style="margin:4px 0;padding-left:20px;">
            <li>向邮箱服务商或 IT 索取 <b>IMAP 服务器地址、端口</b>，并在网页版开启 IMAP（若提供）。</li>
            <li>确认登录名：多数邮箱与邮箱地址相同；少数企业邮需单独用户名，可在下方展开填写。</li>
            <li>密码栏填 <b>IMAP 授权码或应用专用密码</b>，不是网页登录密码（除非服务商明确说明相同）。</li>
            <li>填齐后点「测试连接」。测通后点「绑定」。</li>
        </ol>`,
    faq: `
        <ul style="margin:4px 0;padding-left:20px;">
            <li><b>报「密码不对 / 535」</b>：十有八九是把登录密码填进去了。回去确认密码栏里是 16 位授权码
            （Gmail 是应用专用密码），不是登录密码。</li>
            <li><b>授权码前后多了空格</b>：粘贴后检查一下，前后不要有空格；Gmail 的密码要去掉中间的空格。</li>
            <li><b>提示「IMAP 没开」</b>：回去确认第一步里的 IMAP 服务已经是「已开启」状态。</li>
            <li><b>QQ 刚开完 IMAP 就连</b>：QQ 有时要等几小时才生效，等一等再点测试连接。</li>
            <li><b>授权码找不到了</b>：授权码只显示一次，关掉页面就没有了。回邮箱设置里重新生成一个
            （126/163 点「新增授权密码」，QQ 点「生成授权码」，Gmail 重新创建一个应用专用密码），
            再到 trade 列表点「更新授权码」。</li>
            <li><b>改了邮箱密码或 QQ 密码</b>：旧授权码会失效，重新生成一个，trade 列表点「更新授权码」。</li>
            <li><b>授权码不小心给别人看到了</b>：立即回邮箱设置里删掉它、重新生成一个；trade 里还是安全的
            （授权码只存在你自己的电脑上，不上传、不进导出包）。</li>
        </ul>`,
};



/** Localized connection guide (display only; presets unchanged) */
const MAILBOX_GUIDE_EN = {
    "intro": "<p><b>Set it up in your mailbox first, then come back and fill this in.</b></p>\n<p>trade only reads your inbox — it does not delete messages, mark them as read, or send mail. Connecting takes two steps: first enable IMAP in your mailbox's web interface and generate a 16-character app password; then return here, fill in the form, and click <b>Test connection</b>.</p>\n<p><b>Most important: the password field takes an app password, not your mailbox login password.</b> All four providers reject login passwords for apps like trade (error 535). An app password is a separate key your mailbox issues for trade. It is shown only once — copy and save it immediately. If you lose it, generate a new one; the old one stops working.</p>",
    "126": "<ol style=\"margin:4px 0;padding-left:20px;\">\n<li>Open mail.126.com in a desktop browser and sign in with your mailbox account and password (this is the only time you use the login password).</li>\n<li>Click <b>Settings</b> at the top of the page and choose <b>POP3/SMTP/IMAP</b> from the menu.</li>\n<li>Find <b>IMAP/SMTP service</b> and click <b>Enable</b> on the right. If the page suggests installing \"Mail Master\", skip it and click <b>Continue enabling</b>.</li>\n<li>Verify your identity as prompted: scan the QR code with your bound phone to send an SMS, or click <b>Send SMS manually</b>, then click <b>I have sent it</b> back on the page.</li>\n<li>A 16-character string of letters and numbers appears — this is your app password. <b>Copy it now and store it somewhere you can find it</b> (notepad or notes app is fine). You cannot see it again after closing the page; click <b>Add new authorization password</b> to generate another.</li>\n<li>Back in trade: set provider to 126, enter your full email address (e.g. name@126.com), and paste the app password into the password field.</li>\n<li>Leave the server and port unchanged (already filled in: imap.126.com, port 993).</li>\n<li>Click <b>Test connection</b>. Once it passes, click <b>Bind</b>, then <b>Pull now</b> to start receiving mail.</li></ol>",
    "163": "<p>Same as 126 — only the address changes:</p>\n<ol style=\"margin:4px 0;padding-left:20px;\">\n<li>Open mail.163.com and sign in.</li>\n<li><b>Settings</b> → <b>POP3/SMTP/IMAP</b>.</li>\n<li>Enable <b>IMAP/SMTP service</b> and verify by SMS.</li>\n<li>Copy the 16-character app password and save it immediately.</li>\n<li>Back in trade: set provider to 163, address to name@163.com, and paste the app password into the password field. Server: imap.163.com, port 993.</li>\n<li>Click <b>Test connection</b>. Once it passes, click <b>Bind</b>.</li></ol>",
    "qq": "<ol style=\"margin:4px 0;padding-left:20px;\">\n<li>Open mail.qq.com in a desktop browser and sign in.</li>\n<li>Click <b>Settings</b> at the top and open the <b>Account</b> tab (on newer layouts go to <b>Settings</b> → <b>Account &amp; Security</b> → <b>Security settings</b>).</li>\n<li>Scroll down to <b>POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV services</b>.</li>\n<li>Click <b>Enable</b> next to <b>IMAP/SMTP service</b>, verify by SMS from your bound phone, and click <b>I have sent it</b>.</li>\n<li>Click <b>Generate app password</b> and verify once more (SMS or QQ mobile confirmation). A 16-character password appears — <b>copy and save it immediately</b>; you cannot see it after closing the page.</li>\n<li>Back in trade: set provider to QQ, enter your full QQ email address, and paste the app password. Server: imap.qq.com, port 993.</li>\n<li>Two things to note: QQ IMAP can take several hours to activate — if it fails right away, wait and retry; and changing your QQ password invalidates the app password — generate a new one from the trade list via <b>Update password</b>.</li></ol>",
    "gmail": "<p>Gmail needs one extra step: turn on <b>2-Step Verification</b> before you can create an <b>app password</b> (this is Gmail's app password).</p>\n<ol style=\"margin:4px 0;padding-left:20px;\">\n<li>Open mail.google.com, sign in, and click the gear icon → <b>See all settings</b>.</li>\n<li>Open the <b>Forwarding and POP/IMAP</b> tab, select <b>Enable IMAP</b> under IMAP access, scroll to the bottom, and click <b>Save changes</b>.</li>\n<li>Click your avatar → <b>Manage your Google Account</b> → <b>Security</b> in the left menu.</li>\n<li>Find <b>2-Step Verification</b> and turn it on (you will receive an SMS code or use an authenticator app).</li>\n<li>Back on the <b>Security</b> page, find <b>App passwords</b> (or open myaccount.google.com/apppasswords directly). This option is hidden until 2-Step Verification is enabled.</li>\n<li>Enter a name such as trade, then click <b>Create</b>. A 16-character password appears in four groups of four — <b>copy and save it immediately</b>; you cannot see it again.</li>\n<li>Back in trade: set provider to Gmail, enter your full Gmail address, and paste the password. <b>Remove the spaces in the middle</b> (abcd efgh ijkl mnop becomes abcdefghijklmnop). Server: imap.gmail.com, port 993.</li>\n<li>Click <b>Test connection</b>. Once it passes, click <b>Bind</b>.</li></ol>",
    "custom": "<ol style=\"margin:4px 0;padding-left:20px;\">\n<li>Ask your mail provider or IT team for the <b>IMAP server address and port</b>, and enable IMAP in the web interface if available.</li>\n<li>Confirm the login name: for most mailboxes it is the full email address; some corporate accounts need a separate username — expand the field below to enter it.</li>\n<li>In the password field use an <b>IMAP app password or app-specific password</b>, not your web login password (unless your provider explicitly says they are the same).</li>\n<li>When everything is filled in, click <b>Test connection</b>. Once it passes, click <b>Bind</b>.</li></ol>",
    "faq": "<ul style=\"margin:4px 0;padding-left:20px;\">\n<li><b>Error \"wrong password / 535\"</b>: most likely you entered the login password. Check that the password field holds the 16-character app password (app-specific password for Gmail), not your login password.</li>\n<li><b>Spaces before or after the app password</b>: after pasting, make sure there are no leading or trailing spaces; for Gmail, remove the spaces inside the password too.</li>\n<li><b>\"IMAP not enabled\"</b>: go back and confirm the IMAP service from step one is actually enabled.</li>\n<li><b>QQ IMAP just enabled</b>: activation can take a few hours — wait a while before clicking Test connection again.</li>\n<li><b>Lost the app password</b>: it is shown only once. Generate a new one in your mailbox settings (126/163: add authorization password; QQ: generate app password; Gmail: create a new app password), then click <b>Update password</b> in the trade list.</li>\n<li><b>Changed your mailbox or QQ password</b>: the old app password stops working — generate a new one and click <b>Update password</b> in the trade list.</li>\n<li><b>Someone saw your app password</b>: delete it in your mailbox settings immediately and generate a new one. Inside trade it stays safe — the password is stored only on your own machine and is never uploaded or included in exports.</li></ul>"
};
const MAILBOX_GUIDE_AR = {
    "intro": "<p><b>فعّل IMAP في صندوق بريدك أولاً، ثم عد إلى هنا وأدخل البيانات.</b></p>\n<p>يقرأ trade صندوق الوارد فقط — لا يحذف الرسائل ولا يوسمها كمقروءة ولا يرسل بريداً. الاتصال يتم على خطوتين: أولاً فعّل IMAP من واجهة بريدك على الويب وأنشئ كلمة مرور للتطبيقات من 16 حرفاً؛ ثم عد إلى هنا، املأ النموذج، واضغط <b>اختبار الاتصال</b>.</p>\n<p><b>الأهم: حقل كلمة المرور يستقبل كلمة مرور التطبيقات، وليس كلمة مرور الدخول إلى بريدك.</b> مزوّدو البريد الأربعة يرفضون كلمات مرور الدخول لتطبيقات مثل trade (خطأ 535). كلمة مرور التطبيقات هي مفتاح منفصل يصدره بريدك خصيصاً لـ trade، ويظهر مرة واحدة فقط — انسخها واحفظها فوراً. إذا فقدتها، أنشئ كلمة جديدة؛ القديمة تتوقف عن العمل.</p>",
    "126": "<ol style=\"margin:4px 0;padding-left:20px;\">\n<li>افتح mail.126.com في متصفح على الكمبيوتر وسجّل الدخول بحساب البريد وكلمة المرور (هذه هي المرة الوحيدة التي تستخدم فيها كلمة مرور الدخول).</li>\n<li>اضغط <b>الإعدادات</b> أعلى الصفحة واختر <b>POP3/SMTP/IMAP</b> من القائمة.</li>\n<li>ابحث عن <b>خدمة IMAP/SMTP</b> واضغط <b>تفعيل</b> على اليمين. إذا اقترحت الصفحة تثبيت \"تطبيق بريد إضافي\"، تجاهلها واضغط <b>متابعة التفعيل</b>.</li>\n<li>تحقّق من هويتك كما هو مطلوب: امسح رمز QR بهاتفك المرتبط لإرسال رسالة، أو اضغط <b>إرسال رسالة يدوياً</b>، ثم عد إلى الصفحة واضغط <b>أرسلتُها</b>.</li>\n<li>تظهر سلسلة من 16 حرفاً ورقماً هي كلمة مرور التطبيقات. <b>انسخها واحفظها في مكان تجده لاحقاً</b> (مفكرة أو تطبيق ملاحظات). لا يمكنك رؤيتها مرة أخرى بعد إغلاق الصفحة؛ اضغط <b>إضافة كلمة تفويض جديدة</b> لإنشاء غيرها.</li>\n<li>عد إلى trade: اختر المزوّد 126، وأدخل بريدك الكامل (مثل name@126.com)، والصق كلمة مرور التطبيقات في الحقل.</li>\n<li>اترك الخادم والمنفذ كما هما (تم تعبئتهما مسبقاً: imap.126.com، المنفذ 993).</li>\n<li>اضغط <b>اختبار الاتصال</b>، وبعد نجاحه اضغط <b>ربط</b>، ثم <b>سحب الآن</b> لبدء استلام الرسائل.</li></ol>",
    "163": "<p>نفس خطوات 126 —يتغير العنوان فقط:</p>\n<ol style=\"margin:4px 0;padding-left:20px;\">\n<li>افتح mail.163.com وسجّل الدخول.</li>\n<li><b>الإعدادات</b> ← <b>POP3/SMTP/IMAP</b>.</li>\n<li>فعّل <b>خدمة IMAP/SMTP</b> وتحقق عبر رسالة نصية.</li>\n<li>انسخ كلمة مرور التطبيقات المكوّنة من 16 حرفاً واحفظها فوراً.</li>\n<li>عد إلى trade: اختر المزوّد 163 والعنوان name@163.com والصق كلمة مرور التطبيقات. الخادم imap.163.com، المنفذ 993.</li>\n<li>اضغط <b>اختبار الاتصال</b>، وبعد نجاحه اضغط <b>ربط</b>.</li></ol>",
    "qq": "<ol style=\"margin:4px 0;padding-left:20px;\">\n<li>افتح mail.qq.com في متصفح على الكمبيوتر وسجّل الدخول.</li>\n<li>اضغط <b>الإعدادات</b> أعلى الصفحة وافتح تبويب <b>الحساب</b> (في الواجهات الأحدث: <b>الإعدادات</b> ← <b>الحساب والأمان</b> ← <b>إعدادات الأمان</b>).</li>\n<li>مرّر للأسفل حتى قسم <b>خدمات POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV</b>.</li>\n<li>اضغط <b>تفعيل</b> بجانب <b>خدمة IMAP/SMTP</b>، وتحقق برسالة من هاتفك المرتبط، ثم اضغط <b>أرسلتُها</b>.</li>\n<li>اضغط <b>إنشاء كلمة مرور للتطبيقات</b> وتحقق مرة أخرى (رسالة أو تأكيد من تطبيق QQ). تظهر كلمة من 16 حرفاً — <b>انسخها واحفظها فوراً</b>؛ لن تراها بعد إغلاق الصفحة.</li>\n<li>عد إلى trade: اختر المزوّد QQ، وأدخل بريد QQ الكامل، والصق كلمة مرور التطبيقات. الخادم imap.qq.com، المنفذ 993.</li>\n<li>نقطتان: قد يستغرق تفعيل IMAP في QQ عدة ساعات — إذا فشل الاتصال فوراً انتظر وأعد المحاولة؛ وإذا غيّرت كلمة مرور QQ تبطل كلمة مرور التطبيقات — أنشئ واحدة جديدة من قائمة trade عبر <b>تحديث كلمة المرور</b>.</li></ol>",
    "gmail": "<p>يتطلب Gmail خطوة إضافية: فعّل <b>التحقق بخطوتين</b> قبل أن تتمكن من إنشاء <b>كلمة مرور للتطبيقات</b> (هي كلمة مرور Gmail للتطبيقات).</p>\n<ol style=\"margin:4px 0;padding-left:20px;\">\n<li>افتح mail.google.com وسجّل الدخول، ثم اضغط أيقونة الترس ← <b>عرض كل الإعدادات</b>.</li>\n<li>افتح تبويب <b>إعادة التوجيه وPOP/IMAP</b>، واختر <b>تمكين IMAP</b>، ثم انزل إلى الأسفل واضغط <b>حفظ التغييرات</b>.</li>\n<li>اضغط صورتك ← <b>إدارة حساب Google</b> ← <b>الأمان</b> من القائمة الجانبية.</li>\n<li>ابحث عن <b>التحقق بخطوتين</b> وفعّله (ستستقبل رمزاً عبر رسالة أو تطبيق مصادقة).</li>\n<li>عد إلى صفحة <b>الأمان</b> وابحث عن <b>كلمات مرور التطبيقات</b> (أو افتح myaccount.google.com/apppasswords مباشرة). لا يظهر هذا الخيار قبل تفعيل التحقق بخطوتين.</li>\n<li>اكتب اسماً مثل trade ثم اضغط <b>إنشاء</b>. تظهر كلمة من 16 حرفاً في أربع مجموعات من أربعة — <b>انسخها واحفظها فوراً</b>؛ لن تراها مجدداً.</li>\n<li>عد إلى trade: اختر المزوّد Gmail، وأدخل بريدك الكامل، والصق الكلمة. <b>احذف المسافات بين المجموعات</b> (abcd efgh ijkl mnop تصبح abcdefghijklmnop). الخادم imap.gmail.com، المنفذ 993.</li>\n<li>اضغط <b>اختبار الاتصال</b>، وبعد نجاحه اضغط <b>ربط</b>.</li></ol>",
    "custom": "<ol style=\"margin:4px 0;padding-left:20px;\">\n<li>اطلب من مزوّد البريد أو قسم تقنية المعلومات <b>عنوان خادم IMAP والمنفذ</b>، وفعّل IMAP من الواجهة على الويب إن وُجد.</li>\n<li>تأكد من اسم الدخول: في معظم الصناديق هو البريد الكامل؛ بعض الحسابات المؤسسية تحتاج اسماً مستقلاً — افتح الحقل أدناه لإدخاله.</li>\n<li>في حقل كلمة المرور استخدم <b>كلمة مرور IMAP للتطبيقات</b>، وليس كلمة دخول الويب (ما لم يذكر المزوّد أنهما متطابقتان).</li>\n<li>بعد تعبئة كل الحقول اضغط <b>اختبار الاتصال</b>، وبعد نجاحه اضغط <b>ربط</b>.</li></ol>",
    "faq": "<ul style=\"margin:4px 0;padding-left:20px;\">\n<li><b>خطأ \"كلمة مرور غير صحيحة / 535\"</b>: غالباً أدخلت كلمة مرور الدخول. تأكد أن الحقل يحتوي كلمة مرور التطبيقات المكوّنة من 16 حرفاً (أو كلمة Gmail الخاصة بالتطبيقات)، وليس كلمة الدخول.</li>\n<li><b>مسافات قبل أو بعد كلمة مرور التطبيقات</b>: بعد اللصق تأكد من عدم وجود مسافات في الطرفين؛ وفي Gmail احذف المسافات داخل الكلمة أيضاً.</li>\n<li><b>رسالة \"IMAP غير مفعّل\"</b>: ارجع وتأكد أن خدمة IMAP في الخطوة الأولى مفعّلة بالفعل.</li>\n<li><b>تم تفعيل IMAP في QQ للتو</b>: قد يستغرق الأمر ساعات — انتظر قليلاً قبل الضغط على اختبار الاتصال مجدداً.</li>\n<li><b>فقدت كلمة مرور التطبيقات</b>: تظهر مرة واحدة فقط. أنشئ واحدة جديدة من إعدادات بريدك (126/163: إضافة كلمة تفويض؛ QQ: إنشاء كلمة مرور للتطبيقات؛ Gmail: إنشاء كلمة جديدة)، ثم اضغط <b>تحديث كلمة المرور</b> في قائمة trade.</li>\n<li><b>غيّرت كلمة مرور البريد أو QQ</b>: تبطل كلمة مرور التطبيقات القديمة — أنشئ واحدة جديدة واضغط <b>تحديث كلمة المرور</b> في قائمة trade.</li>\n<li><b>رأى شخص ما كلمة مرور التطبيقات</b>: احذفها فوراً من إعدادات بريدك وأنشئ غيرها. داخل trade تبقى آمنة — تُحفظ الكلمة على جهازك فقط ولا تُرفع ولا تظهر في أي تصدير.</li></ul>"
};
function _mailboxGuide() {
    if (currentLang === 'ar') return MAILBOX_GUIDE_AR;
    if (currentLang === 'en') return MAILBOX_GUIDE_EN;
    return MAILBOX_GUIDE;
}

let _mailboxList = [];
let _mailboxTestPassed = false;
let _mailboxPullingId = null;

/**
 * 渲染邮箱面板：连接指南 → 绑定表单 → 已绑列表。
 */
async function renderMailboxesViewInto(container) {
    const guideHtml = _renderMailboxGuideAccordion();
    container.innerHTML = `
        <div class="panel-topbar">
            <h2>${typeof iconHtml === 'function' ? iconHtml('mail', 20) : ''} ${esc(t('mailbox.title'))}</h2>
        </div>
        <div class="panel-body" style="overflow-y:auto;padding:16px 20px;">`
        + `
            <div class="mailbox-guide-block" style="margin-bottom:20px;">
                <div style="font-size:13px;font-weight:600;color:var(--text-secondary);margin-bottom:8px;">${esc(t('mailbox.guide_title'))}</div>`
        + guideHtml + `
            </div>
            <div style="font-size:13px;font-weight:600;color:var(--text-secondary);margin:16px 0 10px 0;">${esc(t('mailbox.form_title'))}</div>
            <div class="mailbox-bind-card" style="border:1px solid var(--border);border-radius:var(--radius);padding:16px 18px;margin-bottom:24px;background:var(--bg);">
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px 16px;">
                    <label style="display:flex;flex-direction:column;gap:4px;font-size:12px;">
                        ${esc(t('mailbox.preset'))}
                        <select id="mb-preset" data-onchange="onMailboxPresetChange">
                            <option value="126">126</option>
                            <option value="163">163</option>
                            <option value="qq">QQ</option>
                            <option value="gmail">Gmail</option>
                            <option value="custom">${esc(t('mailbox.preset_custom'))}</option>
                        </select>
                    </label>
                    <label style="display:flex;flex-direction:column;gap:4px;font-size:12px;">
                        ${esc(t('mailbox.email'))}
                        <input type="email" id="mb-email" placeholder="name@example.com" data-oninput="onMailboxFormDirty">
                    </label>
                    <label style="display:flex;flex-direction:column;gap:4px;font-size:12px;">
                        ${esc(t('mailbox.secret'))}
                        <input type="password" id="mb-secret" autocomplete="off" placeholder="${esc(t('mailbox.secret_ph'))}" data-oninput="onMailboxFormDirty">
                    </label>
                    <label style="display:flex;flex-direction:column;gap:4px;font-size:12px;">
                        ${esc(t('mailbox.display_name'))}
                        <input type="text" id="mb-display" placeholder="${esc(t('mailbox.display_name_ph'))}">
                    </label>
                    <label style="display:flex;flex-direction:column;gap:4px;font-size:12px;">
                        ${esc(t('mailbox.host'))}
                        <input type="text" id="mb-host" data-oninput="onMailboxFormDirty">
                    </label>
                    <label style="display:flex;flex-direction:column;gap:4px;font-size:12px;">
                        ${esc(t('mailbox.port'))}
                        <input type="number" id="mb-port" min="1" max="65535" data-oninput="onMailboxFormDirty">
                    </label>
                    <label id="mb-username-wrap" style="display:none;flex-direction:column;gap:4px;font-size:12px;">
                        ${esc(t('mailbox.username'))}
                        <input type="text" id="mb-username" placeholder="${esc(t('mailbox.username_ph'))}" data-oninput="onMailboxFormDirty">
                    </label>
                </div>
                <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:14px;align-items:center;">
                    <button type="button" class="btn" id="mb-test-btn" data-act="testMailboxConnection">${esc(t('mailbox.test'))}</button>
                    <button type="button" class="btn btn-primary" id="mb-bind-btn" disabled data-act="bindMailbox">${esc(t('mailbox.bind'))}</button>
                    <span id="mb-test-status" style="font-size:12px;color:var(--text-muted);"></span>
                </div>
            </div>
            <div style="font-size:13px;font-weight:600;color:var(--text-secondary);margin-bottom:10px;">${esc(t('mailbox.list_title'))}</div>
            <div id="mailbox-list-wrap"></div>
            <div id="mailbox-list-empty" class="empty-state hidden" style="padding:24px 12px;">
                <div class="empty-icon">${typeof iconHtml === 'function' ? iconHtml('mail', 32) : '📬'}</div>
                <h2 style="font-size:15px;margin:8px 0;">${esc(t('mailbox.empty_title'))}</h2>
                <p style="font-size:13px;color:var(--text-muted);">${esc(t('mailbox.empty_hint'))}</p>
            </div>
        </div>`;
    onMailboxPresetChange(false);
    await loadMailboxesList();
}

/** 指南手风琴 HTML（共用开头 + 四提供商 + 自定义 + FAQ 七条） */
function _renderMailboxGuideAccordion() {
    const sections = [
        { key: '126', title: currentLang === 'ar' ? 'بريد 126' : '126 Mail' },
        { key: '163', title: currentLang === 'ar' ? 'بريد 163' : '163 Mail' },
        { key: 'qq', title: currentLang === 'ar' ? 'بريد QQ' : 'QQ Mail' },
        { key: 'gmail', title: 'Gmail' },
        { key: 'custom', title: t('mailbox.preset_custom') },
    ];
    const intro = '<div class="mailbox-guide-intro" style="padding:12px 14px;margin-bottom:10px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:13px;line-height:1.75;color:var(--text-secondary);background:var(--bg-muted);">'
        + _mailboxGuide().intro + '</div>';
    const cards = sections.map(function (s) {
        return '<details class="mailbox-guide-details" data-mailbox-guide="' + esc(s.key) + '" style="margin-bottom:8px;border:1px solid var(--border);border-radius:var(--radius-sm);overflow:hidden;">'
            + '<summary style="cursor:pointer;padding:10px 14px;font-weight:600;font-size:13px;background:var(--bg-muted);user-select:none;">' + esc(s.title) + '</summary>'
            + '<div style="padding:12px 16px;font-size:13px;line-height:1.75;color:var(--text-secondary);">' + _mailboxGuide()[s.key] + '</div>'
            + '</details>';
    }).join('');
    return intro + cards
        + '<details style="margin-top:8px;border:1px solid var(--border);border-radius:var(--radius-sm);">'
        + '<summary style="cursor:pointer;padding:10px 14px;font-weight:600;font-size:13px;background:var(--bg-muted);">' + esc(t('mailbox.faq')) + '</summary>'
        + '<div style="padding:12px 16px;font-size:13px;line-height:1.75;color:var(--text-secondary);">' + _mailboxGuide().faq + '</div>'
        + '</details>';
}

/** 按预设展开对应指南段 */
function _expandMailboxGuide(preset) {
    document.querySelectorAll('[data-mailbox-guide]').forEach(function (el) {
        el.open = el.getAttribute('data-mailbox-guide') === preset;
    });
}

/** 预设切换：预填 host/port，custom 显示用户名 */
function onMailboxPresetChange(resetTest) {
    if (resetTest !== false) onMailboxFormDirty();
    const preset = ($('mb-preset') && $('mb-preset').value) || '126';
    const p = MAILBOX_PRESETS[preset] || MAILBOX_PRESETS.custom;
    const hostEl = $('mb-host');
    const portEl = $('mb-port');
    const userWrap = $('mb-username-wrap');
    if (hostEl) hostEl.value = p.host || '';
    if (portEl) portEl.value = String(p.port || 993);
    // custom 才展示独立用户名栏
    if (userWrap) userWrap.style.display = preset === 'custom' ? 'flex' : 'none';
    _expandMailboxGuide(preset);
}

/** 表单改动后需重新测试才能绑定 */
function onMailboxFormDirty() {
    _mailboxTestPassed = false;
    const bindBtn = $('mb-bind-btn');
    const status = $('mb-test-status');
    if (bindBtn) bindBtn.disabled = true;
    if (status) status.textContent = '';
}

/** 读取绑定表单 payload */
function _mailboxFormPayload() {
    const preset = $('mb-preset').value;
    const email = ($('mb-email').value || '').trim();
    const secret = $('mb-secret').value || '';
    const host = ($('mb-host').value || '').trim();
    const port = parseInt($('mb-port').value, 10) || 993;
    const payload = {
        preset: preset,
        email_address: email,
        secret: secret,
        host: host || null,
        port: port,
        display_name: ($('mb-display').value || '').trim(),
    };
    // 非 custom：username 由后端默认邮箱；custom 可填
    if (preset === 'custom') {
        const un = ($('mb-username') && $('mb-username').value || '').trim();
        payload.username = un || email;
    }
    return payload;
}

/** POST /mailboxes/test */
async function testMailboxConnection() {
    const payload = _mailboxFormPayload();
    if (!payload.email_address || !payload.secret) {
        toast(t('mailbox.need_email_secret'));
        return;
    }
    const btn = $('mb-test-btn');
    const status = $('mb-test-status');
    if (btn) btn.disabled = true;
    var restore = (status && typeof TradeWait !== 'undefined')
        ? TradeWait.inline(status, {en: 'TESTING', zh: '测试连接中'}) : null;
    if (!restore && status) status.textContent = t('mailbox.testing');
    _mailboxTestPassed = false;
    if ($('mb-bind-btn')) $('mb-bind-btn').disabled = true;
    let res = null;
    try {
        res = await api('POST', '/api/trade/mailboxes/test', payload);
    } finally {
        if (restore) restore();
        if (btn) btn.disabled = false;
    }
    if (res && res.ok) {
        _mailboxTestPassed = true;
        if ($('mb-bind-btn')) $('mb-bind-btn').disabled = false;
        if (status) status.textContent = t('mailbox.test_ok');
        toast(t('mailbox.test_ok'));
    } else {
        if (status) status.textContent = t('mailbox.test_fail');
    }
}

/** POST /mailboxes 绑定 */
async function bindMailbox() {
    if (!_mailboxTestPassed) {
        toast(t('mailbox.test_first'));
        return;
    }
    const payload = _mailboxFormPayload();
    const bindBtn = $('mb-bind-btn');
    var restore = (bindBtn && typeof TradeWait !== 'undefined')
        ? TradeWait.inline(bindBtn, {en: 'BINDING', zh: '绑定中'}) : null;
    let res = null;
    try {
        res = await api('POST', '/api/trade/mailboxes', payload);
    } finally {
        if (restore) restore();
    }
    if (!res) return;
    toast(t('mailbox.bind_ok'));
    $('mb-secret').value = '';
    onMailboxFormDirty();
    await loadMailboxesList();
}

/** GET /mailboxes 列表 */
async function loadMailboxesList() {
    _mailboxList = await api('GET', '/api/trade/mailboxes') || [];
    const wrap = $('mailbox-list-wrap');
    const empty = $('mailbox-list-empty');
    if (!wrap) return;
    if (!_mailboxList.length) {
        wrap.innerHTML = '';
        if (empty) empty.classList.remove('hidden');
        return;
    }
    if (empty) empty.classList.add('hidden');
    const rows = _mailboxList.map(_renderMailboxRow).join('');
    wrap.innerHTML = '<table class="data-table" id="mailbox-table">'
        + '<thead><tr>'
        + '<th>' + esc(t('mailbox.col_email')) + '</th>'
        + '<th>' + esc(t('mailbox.col_status')) + '</th>'
        + '<th style="width:220px;">' + esc(t('mailbox.col_actions')) + '</th>'
        + '</tr></thead>'
        + '<tbody>' + rows + '</tbody>'
        + '</table>';
}

function _renderMailboxRow(m) {
    const label = m.display_name ? esc(m.display_name) + ' · ' : '';
    const sync = m.last_error
        ? '<span style="color:var(--accent-red);font-size:11px;">' + esc(m.last_error) + '</span>'
        : (m.last_sync_at
            ? '<span style="font-size:11px;color:var(--text-muted);">' + esc(t('mailbox.synced_at')) + ' ' + esc(m.last_sync_at) + '</span>'
            : '<span style="font-size:11px;color:var(--text-muted);">' + esc(t('mailbox.never_synced')) + '</span>');
    const count = typeof m.email_count === 'number' ? m.email_count : 0;
    const pulling = _mailboxPullingId === m.id;
    const pullLabel = pulling ? esc(t('mailbox.pulling')) : esc(t('mailbox.pull'));
    return '<tr>'
        + '<td>'
        + '<div style="font-weight:600;font-size:13px;">' + label + esc(m.email_address || '') + '</div>'
        + '<div style="font-size:11px;color:var(--text-muted);">' + esc(m.preset || '') + ' · ' + esc(m.host || '') + ':' + esc(String(m.port || '')) + '</div>'
        + '<div style="font-size:11px;margin-top:2px;">' + esc(t('mailbox.email_count', { n: count })) + '</div>'
        + '</td>'
        + '<td>' + sync + '</td>'
        + '<td style="white-space:nowrap;">'
        + '<button type="button" class="btn-xs"' + (pulling ? ' disabled' : '') + ' data-act="pullMailbox" data-arg="' + m.id + '">' + pullLabel + '</button> '
        + '<button type="button" class="btn-xs" data-act="updateMailboxSecret" data-arg="' + m.id + '">' + esc(t('mailbox.update_secret')) + '</button> '
        + '<button type="button" class="btn-xs" style="color:var(--accent-red);" data-act="unbindMailbox" data-arg="' + m.id + '">' + esc(t('mailbox.unbind')) + '</button>'
        + '</td>'
        + '</tr>';
}

/** 单箱手动拉取 */
async function pullMailbox(id) {
    _mailboxPullingId = id;
    await loadMailboxesList();
    let pullingBtn = null;
    document.querySelectorAll('#mailbox-list-wrap button').forEach(function (b) {
        if (b.getAttribute('onclick') === 'pullMailbox(' + id + ')') pullingBtn = b;
    });
    var restore = (pullingBtn && typeof TradeWait !== 'undefined')
        ? TradeWait.inline(pullingBtn, {en: 'PULLING', zh: '拉取中'}) : null;
    let res = null;
    try {
        res = await api('POST', '/api/trade/mailboxes/' + id + '/pull');
    } finally {
        if (restore) restore();
    }
    _mailboxPullingId = null;
    if (res) {
        toast(t('mailbox.pull_done', { n: res.pulled != null ? res.pulled : 0 }));
    }
    await loadMailboxesList();
}

/** 更新授权码 */
async function updateMailboxSecret(id) {
    const secret = prompt(t('mailbox.secret_prompt'));
    if (!secret) return;
    const res = await api('PUT', '/api/trade/mailboxes/' + id + '/secret', { secret: secret });
    if (res && res.ok) toast(t('mailbox.secret_updated'));
    await loadMailboxesList();
}

/** 解绑 */
async function unbindMailbox(id) {
    if (!confirm(t('mailbox.unbind_confirm'))) return;
    const res = await api('DELETE', '/api/trade/mailboxes/' + id);
    if (res && res.ok) {
        toast(t('mailbox.unbind_ok'));
        await loadMailboxesList();
    }
}