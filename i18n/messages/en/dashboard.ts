const dashboard = {
  // Page Title and Meta
  title: "Dashboard",
  description: "Comprehensive dashboard with real-time metrics and analytics",

  // Page sections
  sections: {
    metrics: "Analytics",
    metricsDescription: "Key performance metrics and statistics",
    charts: "Data Visualization",
    chartsDescription: "Interactive charts and data visualizations",
    dataLists: "Recent Activity",
    dataListsDescription: "Latest updates and activity logs",
    userManagement: "User Management",
    topProducts: "Top Products",
    recentOrders: "Recent Orders",
    systemLogs: "System Logs",
    analytics: "Analytics",
  },

  // Buttons and actions
  actions: {
    refresh: "Refresh",
    loadingDemo: "Loading Demo",
    settings: "Settings",
    export: "Export",
    filter: "Filter",
    viewAll: "View All",
    configure: "Configure",
  },

  // Loading states
  loading: {
    refreshing: "Refreshing...",
    loadingCharts: "Loading charts...",
    loadingData: "Loading data...",
    processing: "Processing...",
  },

  // Success messages
  success: {
    refreshed: "Dashboard refreshed successfully",
    dataUpdated: "Data updated successfully",
    settingsSaved: "Settings saved successfully",
  },

  // Error messages
  errors: {
    refreshFailed: "Failed to refresh dashboard data",
    loadFailed: "Failed to load dashboard",
    connectionError: "Connection error occurred",
    dataError: "Error loading data",
  },

  // Metrics Cards
  metrics: {
    totalUsers: "Total Users",
    totalComplaints: "Total Complaints",
    pendingComplaints: "Pending Complaints",
    totalVoters: "Total Voters",
    descriptions: {
      totalUsers: "Total registered users",
      totalComplaints: "Total complaints filed",
      pendingComplaints: "Complaints awaiting resolution",
      totalVoters: "Total registered voters",
    },
    fromLastMonth: "from last month",
    loading: "Loading metrics...",
  },

  performance: {
    title: "Performance Metrics",
    uptime: "Uptime",
    uptimeValue: "99.9%",
    avgResponse: "Average Response Time",
    avgResponseValue: "1.2s",
    apiCalls: "API Calls",
    apiCallsValue: "15.3k",
    dataTransfer: "Data Transfer",
    dataTransferValue: "2.1GB",
  },

  // Chart Titles and Descriptions
  charts: {
    complaintRequests: {
      title: "Complaint Requests",
      description: "Complaint status distribution",
    },
    performanceMetrics: {
      title: "Performance Metrics",
      description: "Key performance indicators",
    },
    conversionFunnel: {
      title: "Conversion Funnel",
      description: "User conversion journey",
    },
    // Chart data translations
    data: {
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec",
      },
      complaints: {
        pending: "Pending",
        inProgress: "In Progress",
        resolved: "Resolved",
        rejected: "Rejected",
      },
      labels: {
        revenue: "Revenue",
        sales: "Sales",
        profit: "Profit",
        users: "Users",
        orders: "Orders",
        active: "Active Users",
        visitors: "Visitors",
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
        twelve: 12,
        eight: 8,
        fortyFive: 45,
        seventyEight: 78,
        ninetyTwo: 92,
        sixtyFive: 65,
        twentyThree: 23,
      },
    },
    noDataAvailable: "No data available",
    loading: "Loading chart data...",
    error: "Failed to load chart data",
  },

  // Data Table
  table: {
    headers: {
      name: "Name",
      email: "Email",
      status: "Status",
      role: "Role",
      createdAt: "Created At",
      lastLogin: "Last Login",
      actions: "Actions",
      product: "Product",
      price: "Price",
      quantity: "Quantity",
      total: "Total",
      date: "Date",
      user: "User",
      activity: "Activity",
      time: "Time",
      department: "Department",
      phone: "Phone",
      joinDate: "Join Date",
      category: "Category",
      sales: "Sales",
      revenue: "Revenue",
      customer: "Customer",
      amount: "Amount",
      id: "ID",
      order: "Order",
    },
    noData: "No data available",
    loading: "Loading...",
    error: "Failed to load data",
    empty: "No records found",
    rowsSelected: "rows selected",
  },

  // Status Labels
  status: {
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
    completed: "Completed",
    cancelled: "Cancelled",
    processing: "Processing",
    verified: "Verified",
    suspended: "Suspended",
    shipped: "Shipped",
    failed: "Failed",
    success: "Success",
    warning: "Warning",
    error: "Error",
    info: "Info",
  },

  // Time periods for filtering
  timePeriods: {
    today: "Today",
    yesterday: "Yesterday",
    last7Days: "Last 7 Days",
    last30Days: "Last 30 Days",
    thisMonth: "This Month",
    lastMonth: "Last Month",
    thisYear: "This Year",
    lastYear: "Last Year",
    custom: "Custom Range",
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
    dataLoaded: "Data loaded successfully",
    dataError: "Error loading data",
    exportSuccess: "Data exported successfully",
    saveSuccess: "Changes saved successfully",
    updateAvailable: "New data available",
    connectionLost: "Connection lost, retrying...",
  },

  // Placeholders
  placeholders: {
    search: "Search...",
    selectDate: "Select date range",
    noData: "No data available",
    loading: "Loading...",
    selectOption: "Select an option",
    enterValue: "Enter value",
    chooseFile: "Choose file",
  },

  // Tooltips
  tooltips: {
    refresh: "Refresh dashboard data",
    export: "Export data to CSV",
    filter: "Filter results",
    settings: "Dashboard settings",
    fullscreen: "Toggle fullscreen",
    help: "Get help",
  },

  // Sample data for data-lists component
  sampleData: {
    never: "Never",
    users: {
      user1: {
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "Active",
        lastLogin: "2 hours ago",
        department: "Engineering",
        phone: "+1 (555) 123-4567",
        joinDate: "Jan 15, 2023",
      },
      user2: {
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Manager",
        status: "Active",
        lastLogin: "5 minutes ago",
        department: "Marketing",
        phone: "+1 (555) 234-5678",
        joinDate: "Mar 22, 2023",
      },
      user3: {
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "User",
        status: "Inactive",
        lastLogin: "3 days ago",
        department: "Sales",
        phone: "+1 (555) 345-6789",
        joinDate: "Dec 5, 2022",
      },
      user4: {
        name: "Alice Brown",
        email: "alice@example.com",
        role: "User",
        status: "Active",
        lastLogin: "1 hour ago",
        department: "Support",
        phone: "+1 (555) 456-7890",
        joinDate: "Aug 10, 2023",
      },
      user5: {
        name: "Charlie Wilson",
        email: "charlie@example.com",
        role: "Manager",
        status: "Active",
        lastLogin: "30 minutes ago",
        department: "Engineering",
        phone: "+1 (555) 567-8901",
        joinDate: "May 18, 2023",
      },
    },
    products: {
      product1: {
        name: "Premium Subscription",
        category: "Software",
        price: "$99.99",
        sales: "1,234",
        revenue: "$123,400",
        status: "Active",
      },
      product2: {
        name: "Basic Plan",
        category: "Software",
        price: "$29.99",
        sales: "2,567",
        revenue: "$76,980",
        status: "Active",
      },
      product3: {
        name: "Enterprise Solution",
        category: "Software",
        price: "$299.99",
        sales: "456",
        revenue: "$136,800",
        status: "Active",
      },
      product4: {
        name: "Enterprise Solution 2",
        category: "Software",
        price: "$299.99",
        sales: "456",
        revenue: "$136,800",
        status: "Active",
      },
      product5: {
        name: "Enterprise Solution 3",
        category: "Software",
        price: "$299.99",
        sales: "456",
        revenue: "$136,800",
        status: "Active",
      },
    },
    orders: {
      order1: {
        id: "#ORD-001",
        customer: "John Doe",
        product: "Premium Subscription",
        amount: "$99.99",
        status: "Completed",
        date: "2024-01-15",
      },
      order2: {
        id: "#ORD-002",
        customer: "Jane Smith",
        product: "Basic Plan",
        amount: "$29.99",
        status: "Processing",
        date: "2024-01-14",
      },
      order3: {
        id: "#ORD-003",
        customer: "Bob Johnson",
        product: "Enterprise Solution",
        amount: "$299.99",
        status: "Shipped",
        date: "2024-01-13",
      },
    },
  },

  // Complaint Management
  complaints: {
    title: "Complaint Management",
    description: "Manage and track complaint requests",
    table: {
      username: "Username",
      gender: "Gender",
      complaintDetail: "Complaint Detail",
      trackingId: "Tracking ID",
      status: "Status",
      createdAt: "Created At",
      updatedAt: "Updated At",
      actions: "Actions",
    },
    gender: {
      male: "Male",
      female: "Female",
      other: "Other",
    },
    status: {
      pending: "Pending",
      inProgress: "In Progress",
      resolved: "Resolved",
      rejected: "Rejected",
    },
    actions: {
      changeStatus: "Change Status",
    },
    noData: "No complaints found",
  },

  // Common text fragments
  text: {
    fromLastMonth: "% from last month",
    loadingChartsText: "Loading charts...",
    loadingMetricsText: "Loading Next Boiler metrics...",
    updated: "Updated",
    productSalesDescription: "Product sales vs profit comparison",
    trafficSourcesDescription: "Website traffic breakdown by source",
    userActivityDescription: "Daily user activity pattern",
    performanceDescription: "Key performance indicators over time",
  },
} as const;

export default dashboard;
export type DashboardMessages = typeof dashboard;
