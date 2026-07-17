const layout = {
  // ہیڈر کمپوننٹ
  header: {
    logoText: "لوحة التحكم",
    toggleSidebarLabel: "تبديل الشريط الجانبي",
    toggleMobileNavLabel: "تبديل التنقل في الجوال",
  },

  // سائیڈ بار کمپوننٹ
  sidebar: {
    navigationLabel: "نيكست بويلر",
    collapseLabel: "طيّ الشريط الجانبي",
    expandLabel: "توسيع الشريط الجانبي",
    logout: "تسجيل الخروج",
    loggingOut: "جارٍ تسجيل الخروج...",
    layoutSettings: "إعدادات التخطيط",
    sidebarVariant: "نوع الشريط الجانبي",
    sidebarWidth: "عرض الشريط الجانبي",
    sidebarWidthValue: "64px",
    headerTitle: "نيكست بويلر",
    headerLogoAlt: "شعار التطبيق",
    footerSettings: "إعدادات التخطيط",
    footerVariant: "النوع",
    footerWidth: "العرض",
    collapsedFooter: "تم طيّ الشريط الجانبي",
    items: [
      { href: "/", title: "الرئيسية" },
      { href: "/dashboard", title: "لوحة التحكم" },
      { href: "/users", title: "المستخدمون" },
      { href: "/chat", title: "دردشة" },
      { href: "/voting", title: "نظام التصويت" },
      { href: "/complaints", title: "نظام الشكاوى" },
      {
        href: "/surveillance",
        title: "AI المراقبة",
        children: [
          { href: "/surveillance", title: "نظرة عامة" },
          { href: "/surveillance/live", title: "المراقبة المباشرة" },
          { href: "/surveillance/vehicle", title: "التعرف على المركبات" },
          { href: "/surveillance/face", title: "التعرف على الوجوه" },
          { href: "/surveillance/alerts", title: "تنبيهات الأمان" },
          { href: "/surveillance/logs", title: "سجلات الدخول" },
        ],
      },
      { href: "/chatbot", title: "Ask OTTO" },
    ],
  },

  // فوٹر کمپوننٹ
  footer: {
    copyright: "© جميع الحقوق محفوظة.",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    contact: "تواصل معنا",

    companyName: "نيكست بويلر",
    companyDescription: "نحن منصة SaaS حديثة تساعد الشركات على العمل بشكل أفضل، أسرع، وأكثر ذكاءً.",

    allRightsReserved: "جميع الحقوق محفوظة.",
    quickLinksTitle: "روابط مهمة",
    resourcesTitle: "الموارد",
    servicesTitle: "خدماتنا",
    companyTitle: "الشركة",

    aboutUsTitle: "من نحن",
    documentation: "الوثائق",
    support: "الدعم والمساعدة",
    changelog: "سجل التغييرات",

    githubLabel: "GitHub",
    githubAriaLabel: "عرض ملف GitHub الخاص بنا",
    linkedinLabel: "LinkedIn",
    linkedinAriaLabel: "عرض ملف LinkedIn الخاص بنا",
    instagramLabel: "Instagram",
    instagramAriaLabel: "عرض ملف Instagram الخاص بنا",
    twitterLabel: "Twitter",
    twitterAriaLabel: "عرض ملف Twitter الخاص بنا",

    stayConnectedTitle: "ابقَ على تواصل",

    webDesign: "تصميم مواقع",
    uiUxDesign: "تصميم UI/UX",
    webDevelopment: "تطوير ويب",
    seo: "خدمات SEO",

    aboutUs: "من نحن",
    careers: "وظائف",
    portfolio: "أعمالنا",
    blog: "مدونة",

    address: "أدخل عنوان عملك هنا",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",

    newsletterTitle: "النشرة البريدية",
    newsletterPlaceholder: "أدخل بريدك الإلكتروني...",
    subscribeButton: "اشترك",

    home: "الرئيسية",
    about: "من نحن",
    services: "الخدمات",
    contactUs: "تواصل معنا",
  },

  // تھیم ٹوگل کمپوننٹ
  theme: {
    toggleLabel: "تغيير السمة",
    lightMode: "الوضع الفاتح",
    darkMode: "الوضع الداكن",
    oceanMode: "وضع المحيط",
    systemMode: "الوضع التلقائي (النظام)",
  },

  // یوزر پروفائل کمپوننٹ
  profile: {
    profileLabel: "الملف الشخصي",
    accountSettings: "إعدادات الحساب",
    preferences: "التفضيلات",
    profile: "الملف الشخصي",
    settings: "الإعدادات",
    help: "المساعدة والدعم",
    logout: "تسجيل الخروج",
    loggingOut: "جارٍ تسجيل الخروج...",
    logoutConfirm: "هل أنت متأكد أنك تريد تسجيل الخروج؟",
    cancel: "إلغاء",
    confirm: "تأكيد",
    clickForOptions: "اضغط لعرض الخيارات",
  },

  // تصدیقی سیکشن
  auth: {
    authSection: "المصادقة",
    notLoggedIn: "غير مسجل الدخول",
    loginRequired: "يرجى تسجيل الدخول للمتابعة",
    guestUser: "مستخدم زائر",
  },

  // موبائل مینو کمپوننٹ
  mobileMenu: {
    closeLabel: "إغلاق القائمة",
    navigation: "التنقل",
    settings: "الإعدادات",
  },

  // نیویگیشن آئٹمز
  navigation: {
    dashboard: "لوحة التحكم",
    analytics: "التحليلات",
    reports: "التقارير",
    settings: "الإعدادات",
    users: "المستخدمون",
    profile: "الملف الشخصي",
    help: "المساعدة",
    documentation: "الوثائق",
  },
} as const;

export default layout;
export type LayoutMessages = typeof layout;
