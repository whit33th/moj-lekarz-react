class PageConfig {
  // General routes
  home = "/";
  settings = "/settings";
  profile = "/profile";
  login = "/login";
  registration = "/registration";
  // Doctor routes
  doctor = {
    home: this.home,
    settings: this.settings,
    profile: this.profile,
    calendar: "/calendar",
    list: "/list",
    patientInfo: "/patient-info/:id",
    visitInfo: "/visit-info/:id",
    recipes: "/recipes",
    notifications: "/notifications",
    chat: "/chat",
    lastVisits: "/last-visits",
    todaysVisits: "/todays-visits",
  };

  // Admin routes
  admin = {
    home: this.home,
    settings: this.settings,
    profile: this.profile,
    database: "/database",
    databaseId: "/database/:id",
    reports: "/reports",
    reviews: "/reviews",
    chat: "/chat",
    addFirm: "/add-firm",
    statistic: "/statistic",
  };

  // Firm routes
  firm = {
    home: this.home,
    settings: this.settings,
    profile: this.profile,
    calendar: "/calendar",
    graph: "/graph",
    graphManage: "/graph/manage",
    workers: "/workers",
    management: "/management",
    notifications: "/notifications",
    chat: "/chat",
    workersInfo: "/workers/id",
    patient: "/patients",
  };
}

export const pageConfig = new PageConfig();
