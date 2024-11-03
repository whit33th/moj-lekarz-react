class PageConfig {
  // General routes
  home = "/";

  // Doctor routes
  doctor = {
    home: this.home,
    calendar: "/calendar",
    list: "/list",
    patientInfo: "/patient-info/:id",
    recipes: "/recipes",
    notifications: "/notifications",
    chat: "/chat",
    settings: "/settings",
    lastVisits: "/last-visits",
    todaysVisits: "/todays-visits",
    profile: "/profile",
  };

  // Admin routes
  admin = {
    home: this.home,
    database: "/database",
    databaseId: "/database/:id",
    reports: "/reports",
    profile: "/profile",
    settings: "/settings",
    reviews: "/reviews",
    chat: "/chat",
  };

  // Firm routes
  firm = {
    home: this.home,
    calendar: "/calendar",
    graph: "/graph",
    graphManage: "/graph/manage",
    workers: "/workers",
    management: "/management",
    notifications: "/notifications",
    chat: "/chat",
    settings: "/settings",
    profile: "/profile",
  };
}

export const pageConfig = new PageConfig();
