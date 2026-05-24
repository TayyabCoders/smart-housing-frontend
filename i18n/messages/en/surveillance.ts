const surveillance = {
  header: {
    societyName: "Green Valley Society",
    societyLocation: "Gulshan-e-Iqbal, Karachi",
    title: "AI Surveillance Operations",
    subtitle: "Real-time vehicle and identity verification across society gates.",
    camerasStreaming: "cameras streaming"
  },
  stats: {
    vehiclesToday: "Vehicles Today",
    facesVerified: "Faces Verified",
    activeVisitors: "Active Visitors",
    alerts24h: "Alerts (24h)",
    detectedToday: "Detected Today",
    residents: "Residents",
    visitors: "Visitors",
    blacklistHits: "Blacklist Hits",
    facesToday: "Faces Today",
    unknown: "Unknown",
    watchlist: "Watchlist"
  },
  tabs: {
    liveCamera: "Live Camera",
    uploadImage: "Upload Image",
    watchlist: "Watchlist"
  },
  overview: {
    title: "AI Surveillance",
    subtitle: "All Activity",
    recentVehicles: "Recent Vehicles",
    recentFaces: "Recent Faces",
    recentAlerts: "Recent Alerts"
  },
  vehicle: {
    title: "Vehicle Plate Recognition",
    subtitle: "Live ALPR at society gates with resident, visitor, and blacklist matching.",
    registerVehicle: "Register Vehicle",
    recentEntries: "Recent Entries",
    searchPlaceholder: "Search plate or resident",
    detected: "DETECTED",
    plate: "Plate",
    owner: "Owner",
    flat: "Flat",
    type: "Type",
    camera: "Camera",
    matchConfidence: "Match confidence",
    openGate: "Open Gate",
    block: "Block",
    markAsVisitor: "Mark as Visitor",
    uploadTitle: "Drop an image or click to upload",
    uploadHint: "JPG, PNG · sent to FastAPI /detect-plate",
    detectionResult: "Detection Result",
    file: "File",
    status: "Status",
    awaitingResponse: "Awaiting backend response",
    uploadHint2: "Upload an image to test plate detection.",
    runDetection: "Run Detection",
    sentToFastAPI: "Sent to FastAPI"
  },
  face: {
    title: "Facial Recognition",
    subtitle: "Live face matching for residents, staff, and visitors with watchlist alerts.",
    enrollFace: "Enroll Face",
    recentIdentifications: "Recent Identifications",
    verified: "VERIFIED",
    unknownDetected: "Unknown person detected",
    unknownDesc: "Secondary face at 71% confidence has no match in resident, staff, or visitor records.",
    registerVisitor: "Register Visitor",
    denyEntry: "Deny Entry",
    allow: "Allow",
    deny: "Deny",
    uploadTitle: "Drop a face image or click to upload",
    uploadHint: "Sent to FastAPI /recognize-face",
    watchlistTitle: "Watchlist",
    noFlagged: "No flagged individuals.",
    permanentlyDenied: "Permanently denied"
  },
  live: {
    title: "Live Monitoring",
    subtitle: "Multi-Camera",
    subtitle2: "All gates and zones streaming simultaneously."
  },
  alerts: {
    title: "Security Alerts",
    subtitle: "Incidents from the last 24 hours.",
    blacklist: "Blacklist",
    unknown: "Unknown",
    tailgate: "Tailgate",
    expired: "Expired",
    review: "Review",
    dismiss: "Dismiss"
  },
  logs: {
    title: "Entry Logs",
    subtitle: "All entry and exit records."
  },
  common: {
    empty: "—",
    gateOpened: "Gate opened",
    entryBlocked: "Entry blocked",
    visitorLogged: "Visitor logged",
    accessGranted: "Access granted",
    accessDenied: "Access denied",
    vehicleRegistrationComingSoon: "Vehicle registration coming soon",
    enrollingNewFace: "Enrolling new face"
  }
};

export default surveillance;
