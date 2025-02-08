class PageConfig {
  // General routes
  home = "/";
  settings = "/settings";
  profile = "/profile";
  login = "/login";
  registration = "/registration";
  resetPassword = "/reset-password";
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
    blogs: "/blogs",
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
    workersInfo: "/workers/:id",
    patient: "/patients",
  };

  // Patient routes
  patient = {
    home: this.home,
    settings: this.settings,
    profile: this.profile,
    reviews: "/reviews",
    clinicAppointments: "/clinic-appointments/:id",
    firmInfo: "/firm/:id",
    mobileApp: "/mobile-app",
    recipes: "/recipes",
    qA: "/QA",
    blog: "/blog",
    visits: "/visits",
    researchResults: "/research-results",
    searchClinics: "/search-clinics",
    clinicProfile: "/profileDoctor/:id",
    doctorProfile: "/doctor-profile",
    firm: "/firm",
    policy: {
      regulations: "/policy/regulations",
      personalData: "/policy/personal-data",
      cookies: "/policy/cookies",
      privacy: "/policy/privacy",
    },
    howItWorks: "/how-it-works",
    searchVisits: "/search",
    confirmVisit: "/confirm-visit",
    ZapisFormPage: "/zapis-form-page", // Проверьте, что путь совпадает с маршрутом
    zapisDone: "/zapis-done",
    doctorVersion2: "/find-doctor-version2",
    document,
  };
}

export const pageConfig = new PageConfig();
