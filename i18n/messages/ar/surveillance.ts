const surveillance = {
  header: {
    societyName: "جمعية غرين فالي",
    societyLocation: "غولشن إقبال، كراتشي",
    title: "عمليات المراقبة بالذكاء الاصطناعي",
    subtitle: "التحقق من المركبات والهوية في الوقت الفعلي عبر بوابات المجتمع.",
    camerasStreaming: "كاميرات البث"
  },
  stats: {
    vehiclesToday: "المركبات اليوم",
    facesVerified: "الوجوه الم verifiedة",
    activeVisitors: "الزوار النشطون",
    alerts24h: "التنبيهات (24 ساعة)",
    detectedToday: "الكشف اليوم",
    residents: "السكان",
    visitors: "الزوار",
    blacklistHits: "ضربات القائمة السوداء",
    facesToday: "الوجوه اليوم",
    unknown: "غير معروف",
    watchlist: "قائمة المراقبة"
  },
  tabs: {
    liveCamera: "كاميرا مباشرة",
    uploadImage: "تحميل صورة",
    watchlist: "قائمة المراقبة"
  },
  overview: {
    title: "المراقبة بالذكاء الاصطناعي",
    subtitle: "جميع الأنشطة",
    recentVehicles: "المركبات الأخيرة",
    recentFaces: "الوجوه الأخيرة",
    recentAlerts: "التنبيهات الأخيرة"
  },
  vehicle: {
    title: "التعرف على لوحة المركبة",
    subtitle: "ALPR المباشر في بوابات المجتمع مع مطابقة السكان والزوار والقائمة السوداء.",
    registerVehicle: "تسجيل مركبة",
    recentEntries: "الإدخالات الأخيرة",
    searchPlaceholder: "البحث عن لوحة أو ساكن",
    detected: "تم الكشف",
    plate: "لوحة",
    owner: "المالك",
    flat: "شقة",
    type: "نوع",
    camera: "كاميرا",
    matchConfidence: "ثقة المطابقة",
    openGate: "فتح البوابة",
    block: "حظر",
    markAsVisitor: "تعليم كزائر",
    uploadTitle: "إسقاط صورة أو انقر للتحميل",
    uploadHint: "JPG, PNG · أرسل إلى FastAPI /detect-plate",
    detectionResult: "نتيجة الكشف",
    file: "ملف",
    status: "الحالة",
    awaitingResponse: "في انتظار الاستجابة من الخادم",
    uploadHint2: "تحميل صورة لاختبار كشف اللوحة.",
    runDetection: "تشغيل الكشف",
    sentToFastAPI: "أرسل إلى FastAPI"
  },
  face: {
    title: "التعرف على الوجه",
    subtitle: "مطابقة الوجه المباشر للسكان والموظفين والزوار مع تنبيهات قائمة المراقبة.",
    enrollFace: "تسجيل وجه",
    recentIdentifications: "التعريفات الأخيرة",
    verified: "تم التحقق",
    unknownDetected: "تم الكشف عن شخص غير معروف",
    unknownDesc: "الوجه الثانوي بنسبة ثقة 71٪ لا يوجد له تطابق في سجلات السكان أو الموظفين أو الزوار.",
    registerVisitor: "تسجيل زائر",
    denyEntry: "رفض الدخول",
    allow: "السماح",
    deny: "رفض",
    uploadTitle: "إسقاط صورة وجه أو انقر للتحميل",
    uploadHint: "أرسل إلى FastAPI /recognize-face",
    watchlistTitle: "قائمة المراقبة",
    noFlagged: "لا يوجد أشخاص محددون.",
    permanentlyDenied: "مرفوض بشكل دائم"
  },
  live: {
    title: "المراقبة المباشرة",
    subtitle: "كاميرات متعددة",
    subtitle2: "جميع البوابات والمناطق تبث في وقت واحد."
  },
  alerts: {
    title: "تنبيهات الأمان",
    subtitle: "الحوادث من آخر 24 ساعة.",
    blacklist: "القائمة السوداء",
    unknown: "غير معروف",
    tailgate: "الذيل",
    expired: "منتهي",
    review: "مراجعة",
    dismiss: "رفض"
  },
  logs: {
    title: "سجلات الدخول",
    subtitle: "جميع سجلات الدخول والخروج."
  },
  common: {
    empty: "—",
    gateOpened: "تم فتح البوابة",
    entryBlocked: "تم حظر الدخول",
    visitorLogged: "تم تسجيل الزائر",
    accessGranted: "تم منح الوصول",
    accessDenied: "تم رفض الوصول",
    vehicleRegistrationComingSoon: "تسجيل المركبة قريباً",
    enrollingNewFace: "تسجيل وجه جديد"
  }
};

export default surveillance;
