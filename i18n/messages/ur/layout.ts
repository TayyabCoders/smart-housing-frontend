const layout = {
  // ہیڈر کمپوننٹ
  header: {
    logoText: "ڈیش بورڈ",
    toggleSidebarLabel: "سائیڈ بار تبدیل کریں",
    toggleMobileNavLabel: "موبائل نیویگیشن تبدیل کریں",
  },

  // سائیڈ بار کمپوننٹ
  sidebar: {
    navigationLabel: "نیکسٹ بوائلر",
    collapseLabel: "سائڈ بار سمیٹیں",
    expandLabel: "سائڈ بار پھیلائیں",
    logout: "لاگ آؤٹ",
    loggingOut: "لاگ آؤٹ ہو رہا ہے...",
    layoutSettings: "لے آؤٹ سیٹنگز",
    sidebarVariant: "سائڈ بار کی قسم",
    sidebarWidth: "سائڈ بار چوڑائی",
    sidebarWidthValue: "64px",
    headerTitle: "نیکسٹ بوائلر",
    headerLogoAlt: "ایپ کا لوگو",
    footerSettings: "لے آؤٹ سیٹنگز",
    footerVariant: "ویریئنٹ",
    footerWidth: "چوڑائی",
    collapsedFooter: "سائڈ بار سمیٹی گئی ہے",
    items: [
      { href: "/", title: "ہوم" },
      { href: "/dashboard", title: "ڈیش بورڈ" },
      { href: "/users", title: "صارفین" },
      { href: "/chat", title: "چیٹ" },
      { href: "/voting", title: "ووٹنگ سسٹم" },
      { href: "/complaints", title: "شکایات سسٹم" },
      { href: "/announcements", title: "اعلانات" },
      {
        href: "/surveillance",
        title: "AI سريلينس",
        children: [
          { href: "/surveillance", title: "جائزہ" },
          { href: "/surveillance/live", title: "لائیو مانیٹرنگ" },
          { href: "/surveillance/vehicle", title: "گاڑی کی پہچان" },
          { href: "/surveillance/face", title: "چہرے کی پہچان" },
          { href: "/surveillance/alerts", title: "سیکیورٹی الرٹس" },
          { href: "/surveillance/logs", title: "انٹری لاگز" },
        ],
      },
      { href: "/chatbot", title: "Ask OTTO" },
    ],
  },

  // فوٹر کمپوننٹ
  footer: {
    copyright: "© تمام حقوق محفوظ ہیں۔",
    privacyPolicy: "رازداری کی پالیسی",
    termsOfService: "سروس کی شرائط",
    contact: "رابطہ کریں",

    companyName: "نیکسٹ بوائلر",
    companyDescription:
      "ہم ایک جدید SaaS پلیٹ فارم ہیں جو کاروباروں کو بہتر، تیز اور ہوشیار طریقے سے کام کرنے میں مدد فراہم کرتا ہے۔",

    allRightsReserved: "تمام حقوق محفوظ ہیں۔",
    quickLinksTitle: "اہم روابط",
    resourcesTitle: "وسائل",
    servicesTitle: "ہماری خدمات",
    companyTitle: "کمپنی",

    aboutUsTitle: "ہمارے بارے میں",
    documentation: "دستاویزات",
    support: "مدد اور سپورٹ",
    changelog: "تبدیلیوں کی تفصیلات",

    githubLabel: "گِٹ ہب",
    githubAriaLabel: "ہمارا گِٹ ہب پروفائل دیکھیں",
    linkedinLabel: "لنکڈ اِن",
    linkedinAriaLabel: "ہمارا لنکڈ اِن پروفائل دیکھیں",
    instagramLabel: "انسٹاگرام",
    instagramAriaLabel: "ہمارا انسٹاگرام پروفائل دیکھیں",
    twitterLabel: "ٹویٹر",
    twitterAriaLabel: "ہمارا ٹویٹر پروفائل دیکھیں",

    stayConnectedTitle: "جڑے رہیں",

    webDesign: "ویب ڈیزائن",
    uiUxDesign: "UI/UX ڈیزائن",
    webDevelopment: "ویب ڈیولپمنٹ",
    seo: "SEO خدمات",

    aboutUs: "ہمارے بارے میں",
    careers: "ملازمتیں",
    portfolio: "پورٹ فولیو",
    blog: "بلاگ",

    address: "اپنا کاروباری پتہ یہاں درج کریں",
    phone: "فون نمبر",
    email: "ای میل",

    newsletterTitle: "ای میل سبسکرپشن",
    newsletterPlaceholder: "اپنا ای میل درج کریں...",
    subscribeButton: "سبسکرائب کریں",

    home: "ہوم",
    about: "ہمارے بارے میں",
    services: "خدمات",
    contactUs: "رابطہ کریں",
  },

  // تھیم ٹوگل کمپوننٹ
  theme: {
    toggleLabel: "تھیم تبدیل کریں",
    lightMode: "لائٹ موڈ",
    darkMode: "ڈارک موڈ",
    oceanMode: "اوشن موڈ",
    systemMode: "سسٹم موڈ",
  },

  // یوزر پروفائل کمپوننٹ
  profile: {
    profileLabel: "صارف پروفائل",
    accountSettings: "اکاؤنٹ سیٹنگز",
    preferences: "ترجیحات",
    profile: "پروفائل",
    settings: "سیٹنگز",
    help: "مدد اور سپورٹ",
    logout: "لاگ آؤٹ",
    loggingOut: "لاگ آؤٹ ہو رہا ہے...",
    logoutConfirm: "کیا آپ واقعی لاگ آؤٹ کرنا چاہتے ہیں؟",
    cancel: "منسوخ کریں",
    confirm: "تصدیق کریں",
    clickForOptions: "اختیارات کے لیے کلک کریں",
  },

  // تصدیقی سیکشن
  auth: {
    authSection: "تصدیق",
    notLoggedIn: "لاگ ان نہیں ہے",
    loginRequired: "آگے بڑھنے کے لیے براہ کرم لاگ ان کریں",
    guestUser: "مہمان صارف",
  },

  // موبائل مینو کمپوننٹ
  mobileMenu: {
    closeLabel: "مینو بند کریں",
    navigation: "نیویگیشن",
    settings: "سیٹنگز",
  },

  // نیویگیشن آئٹمز
  navigation: {
    dashboard: "ڈیش بورڈ",
    analytics: "تجزیات",
    reports: "رپورٹس",
    settings: "سیٹنگز",
    users: "صارفین",
    profile: "پروفائل",
    help: "مدد",
    documentation: "دستاویزات",
  },
} as const;

export default layout;
export type LayoutMessages = typeof layout;
