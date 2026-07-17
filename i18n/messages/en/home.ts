const home = {
  // Brand / Header
  brand: "Smart Housing",

  nav: {
    features: "Features",
    dashboard: "Dashboard",
    pricing: "Pricing",
    signIn: "Sign in",
    getStarted: "Get started",
    toggleMenu: "Toggle menu",
  },

  // Main hero section
  hero: {
    waitlistBadge: "AI-Powered Society Management Platform",
    titleLine1: "Secure, smart &",
    titleHighlight: "connected",
    titleLine2: "societies",
    description:
      "AI facial recognition, vehicle access control, digital voting, and complaint management — one platform that keeps residents safe and management in control.",
    primaryButton: "Go to Dashboard",
    secondaryButton: "Book a Demo",
    trustLine: "Trusted by 500+ modern residential communities",
    tags: ["AI Surveillance", "Digital Voting", "Vehicle Access", "24/7 Alerts", "Multilingual"],
    marqueeLogos: [
      "Sunrise Society",
      "Palm Heights",
      "Green Valley",
      "Royal Enclave",
      "City Towers",
      "Metro Park",
      "Hillcrest",
      "Lake View",
    ],
  },

  // Feature showcase
  features: {
    eyebrow: "Platform capabilities",
    title: "Everything your society needs, in one platform",
    subtitle:
      "Security, resident services, and governance — built for gated communities of every size.",
    newBadge: "New",
    learnMore: "Learn more",
    aiAutomation: {
      title: "AI Facial Recognition",
      description:
        "Instantly identify residents and flag unknown visitors at every entry point with ArcFace-powered surveillance.",
    },
    lightningFast: {
      title: "Vehicle & Access Control",
      description:
        "Automatic number plate recognition logs every vehicle in and out — no manual gate registers required.",
    },
    enterpriseSecurity: {
      title: "24/7 Live Monitoring",
      description:
        "Watch every camera feed in real time and get instant alerts the moment something looks wrong.",
    },
    scalableInfrastructure: {
      title: "Digital Voting & Elections",
      description:
        "Run transparent society elections and polls residents can trust, with results tallied automatically.",
    },
    cloudNative: {
      title: "Complaint Management",
      description:
        "Residents log issues in seconds; management tracks, assigns, and resolves them without the paperwork.",
    },
    developerFirst: {
      title: "Multilingual Support",
      description:
        "Full English, Urdu, and Arabic support so every resident feels at home in the app.",
    },
  },

  stats: {
    societiesServed: "Societies served",
    activeResidents: "Active residents",
    uptimeGuarantee: "Uptime guarantee",
    languagesSupported: "Languages supported",
  },

  dashboardSection: {
    eyebrow: "Full control",
    viewDemo: "View Dashboard Demo",
    bookCall: "Book a Call",
  },

  // Navigation (unrelated legacy block — still referenced by components/layout/sidebar.tsx)
  navigation: {
    home: "Home",
    dashboard: "Dashboard",
    settings: "Settings",
    docs: "Documentation",
    about: "About",
  },

  cta: {
    titleLine1: "Ready to modernize",
    titleLine2: "your housing society?",
    description:
      "Join 500+ housing societies already running smarter, safer communities on Smart Housing. Setup takes under 10 minutes.",
    primaryButton: "Get Started — It's Free",
    secondaryButton: "Book a Demo",
    trustLine: "No credit card required · Cancel anytime",
  },

  showcase: {
    title: "One dashboard for your entire society",
    description:
      "From the security gate to the AGM, Smart Housing brings surveillance, access control, resident services, and governance into a single real-time view.",
    features: {
      layoutSystem: "Live camera monitoring across every gate and common area",
      formBuilder: "Digital complaint & maintenance request forms",
      realtimeDashboard: "Real-time society dashboard with instant alerts",
      enterpriseAuth: "Role-based access for residents, guards, and management",
      uiComponents: "Verified resident directory and profiles",
      stateManagement: "Automatic visitor and vehicle logging",
      testingSuite: "AI-verified facial recognition entry",
      performance: "Fast and reliable, even on society Wi-Fi",
      storybook: "Transparent digital voting and elections",
      socketTesting: "Instant notifications for security events",
      apiNetworking: "Integrates with your existing CCTV and gate hardware",
      logging: "Full audit trail for every entry and exit",
      theming: "Light and dark themes for day and night shifts",
      styling: "Available in English, Urdu, and Arabic",
    },
  },

  pricing: {
    eyebrow: "Pricing",
    title: "Simple pricing for societies of any size",
    subtitle: "Pick a plan based on how many units and residents you manage.",
    period: "/month",
    getStarted: "Get Started",
    contactSales: "Contact Sales",
    mostPopular: "Most Popular",
    plans: {
      basic: {
        name: "Starter",
        description: "For small societies just getting started with digital management",
        price: "9",
        features: ["Up to 50 units", "Resident directory", "Complaint management", "Email support"],
      },
      pro: {
        name: "Growth",
        description: "For growing societies that need surveillance and voting",
        price: "29",
        features: [
          "Up to 300 units",
          "AI facial recognition",
          "Vehicle access control",
          "Digital voting & elections",
          "Priority support",
          "Real-time alerts",
        ],
      },
      team: {
        name: "Enterprise",
        description: "For large gated communities and multi-block societies",
        price: "79",
        features: [
          "Unlimited units",
          "Multi-gate surveillance network",
          "Custom integrations",
          "Dedicated onboarding",
          "24/7 support",
          "Advanced analytics",
          "SSO authentication",
          "White-labeling",
        ],
      },
    },
  },

  footer: {
    brand: "Smart Housing",
    tagline:
      "A modern SaaS platform empowering housing societies to work smarter, faster, and better with technology.",
    servicesTitle: "Services",
    services: [
      "AI Surveillance",
      "Vehicle Access",
      "Digital Voting",
      "Complaint Portal",
      "Resident App",
    ],
    companyTitle: "Company",
    company: ["About Us", "Blog", "Careers", "Terms of Service", "Privacy Policy"],
    newsletterTitle: "Stay Connected",
    newsletterDescription: "Get product updates and security news in your inbox.",
    newsletterPlaceholder: "Enter your email",
    newsletterButton: "Subscribe",
    contactEmail: "hello@smarthousing.com",
    copyright: "© 2026 Smart Housing. All rights reserved.",
  },
} as const;

export default home;
export type HomeMessages = typeof home;
