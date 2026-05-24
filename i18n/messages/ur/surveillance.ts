const surveillance = {
  header: {
    societyName: "گرین ویلی سوسائٹی",
    societyLocation: "گلشن اقبال، کراچی",
    title: "AI سر ویلینس آپریشنز",
    subtitle: "سوسائٹی گیٹس پر ریئل ٹائم گاڑی اور شناختی کی تصدیق۔",
    camerasStreaming: "کیمراس اسٹریمنگ"
  },
  stats: {
    vehiclesToday: "آج گاڑیاں",
    facesVerified: "چہرے کی تصدیق",
    activeVisitors: "فعال مہمانین",
    alerts24h: "الرٹس (24 گھنٹے)",
    detectedToday: "آج کی پہچان",
    residents: "رہائشی",
    visitors: "مہمانین",
    blacklistHits: "بلیک لسٹ ہٹس",
    facesToday: "آج چہرے",
    unknown: "نامعلوم",
    watchlist: "واچ لسٹ"
  },
  tabs: {
    liveCamera: "لائیو کیمرہ",
    uploadImage: "تصویر اپ لوڈ کریں",
    watchlist: "واچ لسٹ"
  },
  overview: {
    title: "AI سر ویلینس",
    subtitle: "تمام سرگرمیاں",
    recentVehicles: "حالیہ گاڑیاں",
    recentFaces: "حالیہ چہرے",
    recentAlerts: "حالیہ الرٹس"
  },
  vehicle: {
    title: "گاڑی کی پلیٹ کی پہچان",
    subtitle: "سوسائٹی گیٹس پر لائیو ALPR رہائشی، مہمان اور بلیک لسٹ میچنگ کے ساتھ۔",
    registerVehicle: "گاڑی رجسٹر کریں",
    recentEntries: "حالیہ اندراج",
    searchPlaceholder: "پلیٹ یا رہائشی تلاش کریں",
    detected: "پہچان گئی",
    plate: "پلیٹ",
    owner: "مالک",
    flat: "فلیٹ",
    type: "قسم",
    camera: "کیمرہ",
    matchConfidence: "میچ کی اعتمادیت",
    openGate: "گیٹ کھولیں",
    block: "روکیں",
    markAsVisitor: "مہمان کے طور پر نشان زد کریں",
    uploadTitle: "تصویر ڈراپ کریں یا اپ لوڈ کرنے کے لیے کلک کریں",
    uploadHint: "JPG, PNG · FastAPI /detect-plate بھیجا گیا",
    detectionResult: "پہچان کا نتیجہ",
    file: "فائل",
    status: "حیثیت",
    awaitingResponse: "بیک اینڈ کا جواب کا انتظار",
    uploadHint2: "پلیٹ کی پہچان کے لیے تصویر اپ لوڈ کریں۔",
    runDetection: "پہچان چلائیں",
    sentToFastAPI: "FastAPI بھیجا گیا"
  },
  face: {
    title: "چہرے کی پہچان",
    subtitle: "رہائشی، عملہ اور مہمانین کے لیے لائیو چہرے میچنگ واچ لسٹ الرٹس کے ساتھ۔",
    enrollFace: "چہرہ انرول کریں",
    recentIdentifications: "حالیہ شناخت",
    verified: "تصدیق شدہ",
    unknownDetected: "نامعلوم شخص پہچان گیا",
    unknownDesc: "71 فیصد اعتماد پر ثانوی چہرہ کا رہائشی، عملہ یا مہمارڈ میں کوئی میچ نہیں ہے۔",
    registerVisitor: "مہمان رجسٹر کریں",
    denyEntry: "داخلہ منع کریں",
    allow: "اجازت دیں",
    deny: "منع کریں",
    uploadTitle: "چہرے کی تصویر ڈراپ کریں یا اپ لوڈ کرنے کے لیے کلک کریں",
    uploadHint: "FastAPI /recognize-face بھیجا گیا",
    watchlistTitle: "واچ لسٹ",
    noFlagged: "کوئی نشان زد افراد نہیں۔",
    permanentlyDenied: "مستقل طور پر مسترد"
  },
  live: {
    title: "لائیو مانیٹرنگ",
    subtitle: "ملٹی کیمرہ",
    subtitle2: "تمام گیٹس اور زونز ایک ساتھ اسٹریمنگ۔"
  },
  alerts: {
    title: "سیکیورٹی الرٹس",
    subtitle: "پچھلے 24 گھنٹوں کے واقعات۔",
    blacklist: "بلیک لسٹ",
    unknown: "نامعلوم",
    tailgate: "ٹیل گیٹ",
    expired: "میعاد ختم",
    review: "جائزہ",
    dismiss: "برخاست"
  },
  logs: {
    title: "انٹری لاگز",
    subtitle: "تمام اندراج و باہراج کے ریکارڈز۔"
  },
  common: {
    empty: "—",
    gateOpened: "گیٹ کھول دیا گیا",
    entryBlocked: "داخلہ روک دیا گیا",
    visitorLogged: "مہمان لاگ شدہ",
    accessGranted: "رسائی دی گئی",
    accessDenied: "رسائی مسترد",
    vehicleRegistrationComingSoon: "گاڑی کی رجسٹریشن جلد آ رہی ہے",
    enrollingNewFace: "نیا چہرہ انرول کر رہا ہے"
  }
};

export default surveillance;
