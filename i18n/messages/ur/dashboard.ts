const dashboard = {
  // Page Title and Meta
  title: "ڈیش بورڈ",
  description: "ریئل ٹائم میٹرکس اور اینالیٹکس کے ساتھ جامع ڈیش بورڈ",

  // Page sections
  sections: {
    metrics: "تجزیات",
    metricsDescription: "اہم کارکردگی میٹرکس اور شماریات",
    charts: "ڈیٹا کی بصری نمائندگی",
    chartsDescription: "انٹرایکٹو چارٹس اور ڈیٹا ویژولائزیشن",
    dataLists: "حالیہ سرگرمیاں",
    dataListsDescription: "تازہ ترین اپ ڈیٹس اور سرگرمی لاگز",
    userManagement: "صارف مینجمنٹ",
    topProducts: "نمایاں مصنوعات",
    recentOrders: "حالیہ آرڈرز",
    systemLogs: "سسٹم لاگز",
    analytics: "تجزیات",
  },

  // Buttons and actions
  actions: {
    refresh: "ریفریش کریں",
    loadingDemo: "ڈیمو لوڈ ہو رہا ہے",
    settings: "ترتیبات",
    export: "ایکسپورٹ کریں",
    filter: "فلٹر کریں",
    viewAll: "سب دیکھیں",
    configure: "تشکیل دیں",
  },

  // Loading states
  loading: {
    refreshing: "ریفریش ہو رہا ہے...",
    loadingCharts: "چارٹس لوڈ ہو رہے ہیں...",
    loadingData: "ڈیٹا لوڈ ہو رہا ہے...",
    processing: "پروسیسنگ ہو رہی ہے...",
  },

  // Success messages
  success: {
    refreshed: "ڈیش بورڈ کامیابی سے ریفریش ہو گیا",
    dataUpdated: "ڈیٹا کامیابی سے اپ ڈیٹ ہو گیا",
    settingsSaved: "ترتیبات کامیابی سے محفوظ ہو گئیں",
  },

  // Error messages
  errors: {
    refreshFailed: "ڈیش بورڈ ڈیٹا ریفریش کرنے میں ناکامی",
    loadFailed: "ڈیش بورڈ لوڈ کرنے میں ناکامی",
    connectionError: "کنکشن میں خرابی",
    dataError: "ڈیٹا لوڈ کرنے میں خرابی",
  },

  // Metrics Cards
  metrics: {
    totalUsers: "کل صارفین",
    totalComplaints: "کل شکایات",
    pendingComplaints: "زیر التواء شکایات",
    totalVoters: "کل ووٹرز",
    descriptions: {
      totalUsers: "کل رجسٹرڈ صارفین",
      totalComplaints: "کل درج شدہ شکایات",
      pendingComplaints: "حل کا انتظار کرنے والی شکایات",
      totalVoters: "کل رجسٹرڈ ووٹرز",
    },
    fromLastMonth: "پچھلے مہینے سے",
    loading: "میٹرکس لوڈ ہو رہے ہیں...",
  },

  // Chart Titles and Descriptions
  charts: {
    complaintRequests: {
      title: "شکایات کی درخواستیں",
      description: "شکایات کی حیثیت کی تقسیم",
    },
    performanceMetrics: {
      title: "کارکردگی کے پیمانے",
      description: "اہم کارکردگی کے اشارے",
    },
    conversionFunnel: {
      title: "کنورژن فنل",
      description: "صارف کنورژن کا سفر",
    },
    // Chart data translations
    data: {
      months: {
        jan: "جنوری",
        feb: "فروری",
        mar: "مارچ",
        apr: "اپریل",
        may: "مئی",
        jun: "جون",
        jul: "جولائی",
        aug: "اگست",
        sep: "ستمبر",
        oct: "اکتوبر",
        nov: "نومبر",
        dec: "دسمبر",
      },
      complaints: {
        pending: "زیر التواء",
        inProgress: "جاری ہے",
        resolved: "حل ہو گیا",
        rejected: "مسترد",
      },
      labels: {
        revenue: "آمدنی",
        sales: "فروخت",
        profit: "منافع",
        users: "صارفین",
        orders: "آرڈرز",
        active: "فعال صارفین",
        visitors: "وزٹرز",
      },
      times: {
        midnight: "۰۰:۰۰",
        earlyMorning: "۰۴:۰۰",
        morning: "۰۸:۰۰",
        noon: "۱۲:۰۰",
        afternoon: "۱۶:۰۰",
        evening: "۲۰:۰۰",
        night: "۲۳:۵۹",
      },
      activeCounts: {
        twelve: "۱۲",
        eight: "۸",
        fortyFive: "۴۵",
        seventyEight: "۷۸",
        ninetyTwo: "۹۲",
        sixtyFive: "۶۵",
        twentyThree: "۲۳",
      },
    },
    noDataAvailable: "کوئی ڈیٹا دستیاب نہیں",
    loading: "چارٹ ڈیٹا لوڈ ہو رہا ہے...",
    error: "چارٹ ڈیٹا لوڈ کرنے میں ناکامی",
  },

  // Data Table
  table: {
    headers: {
      name: "نام",
      email: "ای میل",
      status: "اسٹیٹس",
      role: "کردار",
      createdAt: "بنایا گیا",
      lastLogin: "آخری لاگ اِن",
      actions: "اعمال",
      product: "مصنوعہ",
      price: "قیمت",
      quantity: "مقدار",
      total: "کل",
      date: "تاریخ",
      user: "صارف",
      activity: "سرگرمی",
      time: "وقت",
      department: "محکمہ",
      phone: "فون",
      joinDate: "شمولیت کی تاریخ",
      category: "زمرہ",
      sales: "فروخت",
      revenue: "آمدنی",
      customer: "گاہک",
      amount: "رقم",
      id: "آئی ڈی",
      order: "آرڈر",
    },
    noData: "کوئی ڈیٹا دستیاب نہیں",
    loading: "لوڈ ہو رہا ہے...",
    error: "ڈیٹا لوڈ کرنے میں ناکامی",
    empty: "کوئی ریکارڈ نہیں ملا",
    rowsSelected: "صفیں منتخب کی گئیں",
  },

  // Status Labels
  status: {
    active: "فعال",
    inactive: "غیر فعال",
    pending: "زیر التواء",
    completed: "مکمل",
    cancelled: "منسوخ",
    processing: "پروسیسنگ",
    verified: "تصدیق شدہ",
    suspended: "معطل",
    shipped: "بھیجا گیا",
    failed: "ناکام",
    success: "کامیاب",
    warning: "انتباہ",
    error: "خرابی",
    info: "معلومات",
  },

  // Time periods for filtering
  timePeriods: {
    today: "آج",
    yesterday: "کل",
    last7Days: "گزشتہ 7 دن",
    last30Days: "گزشتہ 30 دن",
    thisMonth: "اس مہینے",
    lastMonth: "پچھلے مہینے",
    thisYear: "اس سال",
    lastYear: "پچھلے سال",
    custom: "حسب ضرورت رینج",
  },

  // Chart colors
  colors: {
    primary: "#3b82f6",
    secondary: "#64748b",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#06b6d4",
    purple: "#8b5cf6",
    pink: "#ec4899",
  },

  // Notification messages
  notifications: {
    dataLoaded: "ڈیٹا کامیابی سے لوڈ ہو گیا",
    dataError: "ڈیٹا لوڈ کرنے میں خرابی",
    exportSuccess: "ڈیٹا کامیابی سے ایکسپورٹ ہو گیا",
    saveSuccess: "تبدیلیاں کامیابی سے محفوظ ہو گئیں",
    updateAvailable: "نیا ڈیٹا دستیاب ہے",
    connectionLost: "کنکشن ختم ہوگیا، دوبارہ کوشش کی جا رہی ہے...",
  },

  // Placeholders
  placeholders: {
    search: "تلاش کریں...",
    selectDate: "تاریخ منتخب کریں",
    noData: "کوئی ڈیٹا دستیاب نہیں",
    loading: "لوڈ ہو رہا ہے...",
    selectOption: "ایک آپشن منتخب کریں",
    enterValue: "ویلیو درج کریں",
    chooseFile: "فائل منتخب کریں",
  },

  // Tooltips
  tooltips: {
    refresh: "ڈیش بورڈ ڈیٹا ریفریش کریں",
    export: "ڈیٹا CSV میں ایکسپورٹ کریں",
    filter: "نتائج فلٹر کریں",
    settings: "ڈیش بورڈ کی ترتیبات",
    fullscreen: "فل اسکرین ٹوگل کریں",
    help: "مدد حاصل کریں",
  },

  // Performance section
  performance: {
    title: "کارکردگی کے پیمانے",
    uptime: "اپ ٹائم",
    uptimeValue: "۹۹.۹٪",
    avgResponse: "اوسط ردعمل کا وقت",
    avgResponseValue: "۱.۲ سیکنڈ",
    apiCalls: "اے پی آئی کالز",
    apiCallsValue: "۱۵.۳ ہزار",
    dataTransfer: "ڈیٹا ٹرانسفر",
    dataTransferValue: "۲.۱ گیگا بائٹ",
  },

  // Sample data for data-lists component
  sampleData: {
    never: "کبھی نہیں",
    users: {
      user1: {
        name: "جان ڈو",
        email: "john@example.com",
        role: "ایڈمن",
        status: "فعال",
        lastLogin: "2 گھنٹے پہلے",
        department: "انجینئرنگ",
        phone: "+1 (555) 123-4567",
        joinDate: "15 جنوری، 2023",
      },
      user2: {
        name: "جین اسمتھ",
        email: "jane@example.com",
        role: "مینجر",
        status: "فعال",
        lastLogin: "5 منٹ پہلے",
        department: "مارکیٹنگ",
        phone: "+1 (555) 234-5678",
        joinDate: "22 مارچ، 2023",
      },
      user3: {
        name: "باب جانسن",
        email: "bob@example.com",
        role: "صارف",
        status: "غیر فعال",
        lastLogin: "3 دن پہلے",
        department: "سیلز",
        phone: "+1 (555) 345-6789",
        joinDate: "5 دسمبر، 2022",
      },
      user4: {
        name: "ایلس براؤن",
        email: "alice@example.com",
        role: "صارف",
        status: "فعال",
        lastLogin: "1 گھنٹہ پہلے",
        department: "سپورٹ",
        phone: "+1 (555) 456-7890",
        joinDate: "10 اگست، 2023",
      },
      user5: {
        name: "چارلی ولسن",
        email: "charlie@example.com",
        role: "مینجر",
        status: "فعال",
        lastLogin: "30 منٹ پہلے",
        department: "انجینئرنگ",
        phone: "+1 (555) 567-8901",
        joinDate: "18 مئی، 2023",
      },
    },
    products: {
      product1: {
        name: "پریمیئم سبسکرپشن",
        category: "سافٹ ویئر",
        price: "$99.99",
        sales: "1,234",
        revenue: "$123,400",
        status: "فعال",
      },
      product2: {
        name: "بیسک پلان",
        category: "سافٹ ویئر",
        price: "$29.99",
        sales: "2,567",
        revenue: "$76,980",
        status: "فعال",
      },
      product3: {
        name: "انٹرپرائز سلوشن",
        category: "سافٹ ویئر",
        price: "$299.99",
        sales: "456",
        revenue: "$136,800",
        status: "فعال",
      },
      product4: {
        name: "2 انٹرپرائز سلوشن",
        category: "سافٹ ویئر",
        price: "$299.99",
        sales: "456",
        revenue: "$136,800",
        status: "فعال",
      },
      product5: {
        name: "3 انٹرپرائز سلوشن",
        category: "سافٹ ویئر",
        price: "$299.99",
        sales: "456",
        revenue: "$136,800",
        status: "فعال",
      },
    },
    orders: {
      order1: {
        id: "#ORD-001",
        customer: "جان ڈو",
        product: "پریمیئم سبسکرپشن",
        amount: "$99.99",
        status: "مکمل",
        date: "2024-01-15",
      },
      order2: {
        id: "#ORD-002",
        customer: "جین اسمتھ",
        product: "بیسک پلان",
        amount: "$29.99",
        status: "پروسیسنگ",
        date: "2024-01-14",
      },
      order3: {
        id: "#ORD-003",
        customer: "باب جانسن",
        product: "انٹرپرائز سلوشن",
        amount: "$299.99",
        status: "بھیجا گیا",
        date: "2024-01-13",
      },
    },
  },

  // Complaint Management
  complaints: {
    title: "شکایات کی انتظام",
    description: "شکایات کی درخواستوں کی انتظام اور ٹریکنگ",
    table: {
      username: "صارف کا نام",
      gender: "جنس",
      complaintDetail: "شکایت کی تفصیلات",
      trackingId: "ٹریکنگ آئی ڈی",
      status: "حیثیت",
      createdAt: "بنایا گیا",
      updatedAt: "اپ ڈیٹ کیا گیا",
      actions: "اقدامات",
    },
    gender: {
      male: "مرد",
      female: "عورت",
      other: "دیگر",
    },
    status: {
      pending: "زیر التواء",
      inProgress: "جاری ہے",
      resolved: "حل ہو گیا",
      rejected: "مسترد",
    },
    actions: {
      changeStatus: "حیثیت تبدیل کریں",
    },
    noData: "کوئی شکایات نہیں ملی",
  },

  // Common text fragments
  text: {
    fromLastMonth: "پچھلے مہینے سے %",
    loadingChartsText: "چارٹس لوڈ ہو رہے ہیں...",
    loadingMetricsText: "اگلے بوائلر میٹرکس لوڈ ہو رہے ہیں...",
    updated: "اپ ڈیٹ شدہ",
    productSalesDescription: "مصنوعات کی فروخت بمقابلہ منافع کا موازنہ",
    trafficSourcesDescription: "ویب سائٹ ٹریفک کی تفصیل ذرائع کے لحاظ سے",
    userActivityDescription: "روزانہ صارف کی سرگرمی کا پیٹرن",
    performanceDescription: "اہم کارکردگی کے اشارے وقت کے ساتھ",
  },
} as const;

export default dashboard;
export type DashboardMessages = typeof dashboard;
