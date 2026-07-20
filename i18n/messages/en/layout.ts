const layout = {
  // Header component
  header: {
    logoText: "Dashboard", // Main app title shown beside the logo
    logoAlt: "Dashboard Logo", // Accessible alt text for logo
    goToHomeLabel: "Go to Home", // Used in aria-labels for accessibility
    toggleSidebarLabel: "Toggle sidebar", // Tooltip or aria label for sidebar toggle
    toggleMobileNavLabel: "Toggle mobile navigation", // Tooltip or aria label for mobile nav toggle
    toggleThemeLabel: "Toggle theme", // Optional: used by ThemeToggle if you want localization
    toggleLanguageLabel: "Change language", // Optional: for LanguageSwitcher accessibility
    navigationLinks: [
      { href: "/dashboard", title: "Dashboard", external: false },
      { href: "/projects", title: "Projects", external: false },
      { href: "/settings", title: "Settings", external: false },
      { href: "/help", title: "Help Center", external: false },
      { href: "https://docs.example.com", title: "Documentation", external: true },
    ],
    auth: {
      loginLabel: "Sign in",
      registerLabel: "Create account",
      profileLabel: "My Profile",
      logoutLabel: "Sign out",
      loadingLabel: "Loading user...",
    },
    sidebarVisibleLabel: "Sidebar expanded",
    sidebarHiddenLabel: "Sidebar collapsed",
    mobileNavOpenLabel: "Mobile navigation opened",
    mobileNavClosedLabel: "Mobile navigation closed",
    lastUpdatedLabel: "Last updated",
    userGreeting: "Welcome back",
    noNotifications: "You're all caught up!",
  },

  sidebar: {
    navigationLabel: "Smart Hosuing",
    collapseLabel: "Collapse sidebar",
    expandLabel: "Expand sidebar",
    logout: "Logout",
    loggingOut: "Logging out...",
    layoutSettings: "Layout Settings",
    sidebarVariant: "Sidebar Variant",
    sidebarWidth: "Sidebar Width",
    sidebarWidthValue: "64px",
    headerTitle: "Next Boiler",
    headerLogoAlt: "App Logo",
    footerSettings: "Layout Settings",
    footerVariant: "Variant",
    footerWidth: "Width",
    collapsedFooter: "Sidebar collapsed",
    items: [
      { href: "/", title: "Home" },
      { href: "/dashboard", title: "Dashboard" },
      { href: "/users", title: "Users" },
      { href: "/chat", title: "Chats" },
      { href: "/voting", title: "Voting System" },
      { href: "/complaints", title: "Complaint System" },
      { href: "/announcements", title: "Announcements" },
      {
        href: "/surveillance",
        title: "AI Surveillance",
        children: [
          { href: "/surveillance", title: "Overview" },
          { href: "/surveillance/live", title: "Live Monitoring" },
          { href: "/surveillance/vehicle", title: "Vehicle Recognition" },
          { href: "/surveillance/face", title: "Facial Recognition" },
          { href: "/surveillance/alerts", title: "Security Alerts" },
          { href: "/surveillance/logs", title: "Entry Logs" },
        ],
      },
      { href: "/chatbot", title: "Ask OTTO" },
    ],
  },

  // Footer component
  footer: {
    copyright: "All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    contact: "Contact",

    companyName: "Smart Hosuing",
    companyDescription:
      "We are a modern SaaS platform empowering businesses to work smarter, faster, and better with technology.",

    allRightsReserved: "All rights reserved.",
    quickLinksTitle: "Quick Links",
    resourcesTitle: "Resources",
    servicesTitle: "Services",
    companyTitle: "Company",

    aboutUsTitle: "About Us",
    documentation: "Documentation",
    support: "Support",
    changelog: "Changelog",

    githubLabel: "GitHub",
    githubAriaLabel: "Visit our GitHub profile",
    linkedinLabel: "LinkedIn",
    linkedinAriaLabel: "Visit our LinkedIn profile",
    instagramLabel: "Instagram",
    instagramAriaLabel: "Visit our Instagram profile",
    twitterLabel: "Twitter",
    twitterAriaLabel: "Visit our Twitter profile",

    stayConnectedTitle: "Stay Connected",

    webDesign: "Web Design",
    uiUxDesign: "UI/UX Design",
    webDevelopment: "Web Development",
    seo: "SEO Services",

    aboutUs: "About Us",
    careers: "Careers",
    portfolio: "Portfolio",
    blog: "Blog",

    address: "Enter your business address here",
    phone: "Phone number",
    email: "Email address",

    newsletterTitle: "Email Subscription",
    newsletterPlaceholder: "Enter your email...",
    subscribeButton: "Subscribe",

    home: "Home",
    about: "About",
    services: "Services",
    contactUs: "Contact",
  },

  // Theme toggle component
  theme: {
    toggleLabel: "Toggle theme",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    oceanMode: "Ocean mode",
    systemMode: "System mode",
  },

  // User profile component
  profile: {
    profileLabel: "User profile",
    accountSettings: "Account Settings",
    preferences: "Preferences",
    profile: "Profile",
    settings: "Settings",
    help: "Help & Support",
    logout: "Logout",
    loggingOut: "Logging out...",
    logoutConfirm: "Are you sure you want to logout?",
    cancel: "Cancel",
    confirm: "Confirm",
    clickForOptions: "Click for options",
  },

  // Authentication section
  auth: {
    authSection: "Authentication",
    notLoggedIn: "Not logged in",
    loginRequired: "Please login to continue",
    guestUser: "Guest User",
  },

  // Mobile menu component
  mobileMenu: {
    closeLabel: "Close menu",
    navigation: "Navigation",
    settings: "Settings",
  },
} as const;

export default layout;
export type LayoutMessages = typeof layout;
