const dashboard = {
  // Page Title and Meta
  title: "لوحة التحكم",
  description: "لوحة تحكم شاملة مع مقاييس وتحليلات في الوقت الحقيقي",

  // Page sections
  sections: {
    metrics: "التحليلات",
    metricsDescription: "مقاييس وأرقام الأداء الرئيسية",
    charts: "الرسوم البيانية",
    chartsDescription: "رسوم تفاعلية وتمثيل بصري للبيانات",
    dataLists: "النشاطات الأخيرة",
    dataListsDescription: "أحدث التحديثات وسجلات النشاط",
    userManagement: "إدارة المستخدمين",
    topProducts: "أفضل المنتجات",
    recentOrders: "الطلبات الأخيرة",
    systemLogs: "سجلات النظام",
    analytics: "التحليلات",
  },

  // Buttons and actions
  actions: {
    refresh: "تحديث",
    loadingDemo: "جارٍ تحميل العرض التوضيحي",
    settings: "الإعدادات",
    export: "تصدير",
    filter: "تصفية",
    viewAll: "عرض الكل",
    configure: "تكوين",
  },

  // Loading states
  loading: {
    refreshing: "جارٍ التحديث...",
    loadingCharts: "جارٍ تحميل الرسوم البيانية...",
    loadingData: "جارٍ تحميل البيانات...",
    processing: "جارٍ المعالجة...",
  },

  // Success messages
  success: {
    refreshed: "تم تحديث لوحة التحكم بنجاح",
    dataUpdated: "تم تحديث البيانات بنجاح",
    settingsSaved: "تم حفظ الإعدادات بنجاح",
  },

  // Error messages
  errors: {
    refreshFailed: "فشل تحديث بيانات لوحة التحكم",
    loadFailed: "فشل في تحميل لوحة التحكم",
    connectionError: "خطأ في الاتصال",
    dataError: "خطأ أثناء تحميل البيانات",
  },

  // Metrics Cards
  metrics: {
    totalUsers: "إجمالي المستخدمين",
    totalComplaints: "إجمالي الشكاوى",
    pendingComplaints: "الشكاوى المعلقة",
    totalVoters: "إجمالي الناخبين",
    descriptions: {
      totalUsers: "إجمالي المستخدمين المسجلين",
      totalComplaints: "إجمالي الشكاوى المقدمة",
      pendingComplaints: "الشكاوى بانتظار الحل",
      totalVoters: "إجمالي الناخبين المسجلين",
    },
    fromLastMonth: "منذ الشهر الماضي",
    loading: "جارٍ تحميل المقاييس...",
  },

  // Chart Titles and Descriptions
  charts: {
    complaintRequests: {
      title: "طلبات الشكاوى",
      description: "توزيع حالة الشكاوى",
    },
    performanceMetrics: {
      title: "مقاييس التصويت",
      description: "نتائج تصويت المرشح",
    },
    conversionFunnel: {
      title: "قمع التحويل",
      description: "رحلة تحويل المستخدم",
    },
    // Chart data translations
    data: {
      months: {
        jan: "يناير",
        feb: "فبراير",
        mar: "مارس",
        apr: "أبريل",
        may: "مايو",
        jun: "يونيو",
        jul: "يوليو",
        aug: "أغسطس",
        sep: "سبتمبر",
        oct: "أكتوبر",
        nov: "نوفمبر",
        dec: "ديسمبر",
      },
      complaints: {
        pending: "قيد الانتظار",
        inProgress: "قيد المعالجة",
        resolved: "تم الحل",
        rejected: "مرفوض",
      },
      labels: {
        revenue: "الإيرادات",
        sales: "المبيعات",
        profit: "الربح",
        users: "المستخدمون",
        orders: "الطلبات",
        active: "المستخدمون النشطون",
        visitors: "الزوار",
      },
      times: {
        midnight: "00:00",
        earlyMorning: "04:00",
        morning: "08:00",
        noon: "12:00",
        afternoon: "16:00",
        evening: "20:00",
        night: "23:59",
      },
      activeCounts: {
        twelve: "12",
        eight: "8",
        fortyFive: "45",
        seventyEight: "78",
        ninetyTwo: "92",
        sixtyFive: "65",
        twentyThree: "23",
      },
    },
    noDataAvailable: "لا توجد بيانات متاحة",
    loading: "جارٍ تحميل بيانات الرسوم البيانية...",
    error: "فشل تحميل بيانات الرسم البياني",
  },

  // Data Table
  table: {
    headers: {
      name: "الاسم",
      email: "البريد الإلكتروني",
      status: "الحالة",
      role: "الدور",
      createdAt: "تاريخ الإنشاء",
      lastLogin: "آخر تسجيل دخول",
      actions: "الإجراءات",
      product: "المنتج",
      price: "السعر",
      quantity: "الكمية",
      total: "الإجمالي",
      date: "التاريخ",
      user: "المستخدم",
      activity: "النشاط",
      time: "الوقت",
      department: "القسم",
      phone: "الهاتف",
      joinDate: "تاريخ الانضمام",
      category: "الفئة",
      sales: "المبيعات",
      revenue: "الإيرادات",
      customer: "العميل",
      amount: "المبلغ",
      id: "المعرف",
      order: "الطلب",
    },
    noData: "لا توجد بيانات متاحة",
    loading: "جارٍ التحميل...",
    error: "فشل تحميل البيانات",
    empty: "لا توجد سجلات",
    rowsSelected: "صفوف محددة",
  },

  // Status Labels
  status: {
    active: "نشط",
    inactive: "غير نشط",
    pending: "قيد الانتظار",
    completed: "مكتمل",
    cancelled: "ملغى",
    processing: "قيد المعالجة",
    verified: "مُحقق",
    suspended: "معلّق",
    shipped: "تم الشحن",
    failed: "فشل",
    success: "نجاح",
    warning: "تحذير",
    error: "خطأ",
    info: "معلومات",
  },

  // Time periods for filtering
  timePeriods: {
    today: "اليوم",
    yesterday: "أمس",
    last7Days: "آخر 7 أيام",
    last30Days: "آخر 30 يوماً",
    thisMonth: "هذا الشهر",
    lastMonth: "الشهر الماضي",
    thisYear: "هذا العام",
    lastYear: "العام الماضي",
    custom: "نطاق مخصص",
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
    dataLoaded: "تم تحميل البيانات بنجاح",
    dataError: "خطأ أثناء تحميل البيانات",
    exportSuccess: "تم تصدير البيانات بنجاح",
    saveSuccess: "تم حفظ التغييرات بنجاح",
    updateAvailable: "توجد بيانات جديدة متاحة",
    connectionLost: "فُقد الاتصال، تتم إعادة المحاولة...",
  },

  // Placeholders
  placeholders: {
    search: "ابحث...",
    selectDate: "اختر التاريخ",
    noData: "لا توجد بيانات",
    loading: "جارٍ التحميل...",
    selectOption: "اختر خياراً",
    enterValue: "أدخل القيمة",
    chooseFile: "اختر ملفاً",
  },

  // Tooltips
  tooltips: {
    refresh: "تحديث بيانات لوحة التحكم",
    export: "تصدير البيانات إلى CSV",
    filter: "تصفية النتائج",
    settings: "إعدادات لوحة التحكم",
    fullscreen: "تبديل وضع ملء الشاشة",
    help: "الحصول على المساعدة",
  },

  // Performance section
  performance: {
    title: "مقاييس الأداء",
    uptime: "مدة التشغيل",
    uptimeValue: "99.9٪",
    avgResponse: "متوسط زمن الاستجابة",
    avgResponseValue: "1.2 ثانية",
    apiCalls: "مكالمات API",
    apiCallsValue: "15.3 ألف",
    dataTransfer: "نقل البيانات",
    dataTransferValue: "2.1 جيجابايت",
  },

  // Sample data for data-lists component
  sampleData: {
    never: "أبداً",
    users: {
      user1: {
        name: "جون دو",
        email: "john@example.com",
        role: "مسؤول",
        status: "نشط",
        lastLogin: "منذ ساعتين",
        department: "الهندسة",
        phone: "+1 (555) 123-4567",
        joinDate: "15 يناير 2023",
      },
      user2: {
        name: "جين سميث",
        email: "jane@example.com",
        role: "مدير",
        status: "نشط",
        lastLogin: "قبل 5 دقائق",
        department: "التسويق",
        phone: "+1 (555) 234-5678",
        joinDate: "22 مارس 2023",
      },
      user3: {
        name: "بوب جونسون",
        email: "bob@example.com",
        role: "مستخدم",
        status: "غير نشط",
        lastLogin: "قبل 3 أيام",
        department: "المبيعات",
        phone: "+1 (555) 345-6789",
        joinDate: "5 ديسمبر 2022",
      },
      user4: {
        name: "أليس براون",
        email: "alice@example.com",
        role: "مستخدم",
        status: "نشط",
        lastLogin: "قبل ساعة",
        department: "الدعم",
        phone: "+1 (555) 456-7890",
        joinDate: "10 أغسطس 2023",
      },
      user5: {
        name: "تشارلي ويلسون",
        email: "charlie@example.com",
        role: "مدير",
        status: "نشط",
        lastLogin: "قبل 30 دقيقة",
        department: "الهندسة",
        phone: "+1 (555) 567-8901",
        joinDate: "18 مايو 2023",
      },
    },
    products: {
      product1: {
        name: "اشتراك بريميوم",
        category: "برمجيات",
        price: "$99.99",
        sales: "1,234",
        revenue: "$123,400",
        status: "نشط",
      },
      product2: {
        name: "الخطة الأساسية",
        category: "برمجيات",
        price: "$29.99",
        sales: "2,567",
        revenue: "$76,980",
        status: "نشط",
      },
      product3: {
        name: "حل المؤسسات",
        category: "برمجيات",
        price: "$299.99",
        sales: "456",
        revenue: "$136,800",
        status: "نشط",
      },
      product4: {
        name: "حل المؤسسات 2",
        category: "برمجيات",
        price: "$299.99",
        sales: "456",
        revenue: "$136,800",
        status: "نشط",
      },
      product5: {
        name: "حل المؤسسات 3",
        category: "برمجيات",
        price: "$299.99",
        sales: "456",
        revenue: "$136,800",
        status: "نشط",
      },
    },
    orders: {
      order1: {
        id: "#ORD-001",
        customer: "جون دو",
        product: "اشتراك بريميوم",
        amount: "$99.99",
        status: "مكتمل",
        date: "2024-01-15",
      },
      order2: {
        id: "#ORD-002",
        customer: "جين سميث",
        product: "الخطة الأساسية",
        amount: "$29.99",
        status: "قيد المعالجة",
        date: "2024-01-14",
      },
      order3: {
        id: "#ORD-003",
        customer: "بوب جونسون",
        product: "حل المؤسسات",
        amount: "$299.99",
        status: "تم الشحن",
        date: "2024-01-13",
      },
    },
  },

  // Complaint Management
  complaints: {
    title: "إدارة الشكاوى",
    description: "إدارة وتتبع طلبات الشكاوى",
    table: {
      username: "اسم المستخدم",
      gender: "الجنس",
      complaintDetail: "تفاصيل الشكوى",
      trackingId: "رقم التتبع",
      status: "الحالة",
      createdAt: "تم الإنشاء في",
      updatedAt: "تم التحديث في",
      actions: "الإجراءات",
    },
    gender: {
      male: "ذكر",
      female: "أنثى",
      other: "آخر",
    },
    status: {
      pending: "قيد الانتظار",
      inProgress: "قيد المعالجة",
      resolved: "تم الحل",
      rejected: "مرفوض",
    },
    actions: {
      changeStatus: "تغيير الحالة",
    },
    noData: "لم يتم العثور على شكاوى",
  },

  // Common text fragments
  text: {
    fromLastMonth: "منذ الشهر الماضي %",
    loadingChartsText: "جارٍ تحميل الرسوم البيانية...",
    loadingMetricsText: "جارٍ تحميل المقاييس...",
    updated: "محدث",
    productSalesDescription: "مقارنة بين مبيعات المنتجات والأرباح",
    trafficSourcesDescription: "تفصيل مصادر زيارات الموقع",
    userActivityDescription: "أنماط نشاط المستخدم اليومي",
    performanceDescription: "مؤشرات الأداء الرئيسية بمرور الوقت",
  },
} as const;

export default dashboard;
export type DashboardMessages = typeof dashboard;
