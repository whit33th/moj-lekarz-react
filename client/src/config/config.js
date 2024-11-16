class PageConfig {
  // General routes
  home = "/";

  // User routes
  user = {
  home : this.home,
    profileUser: "/Profile-user", //profile
    JakToDziala: "/jak-to-dziala", //howitwork
    ZnajdzLekarza: "/znajdz-lekarza", //znajdz-lekarza
    MojeWizyty: "/moje-wizity", //visits
    MojeRecepty: "/moje0recepty", //recipies
    Dokumenty: "/dokumenty", ///ResearchResult
    AplikacjaMobilna: "/aplikacja-mobilna", //mobilna
    Blog: "/blog", //blog
    ProfileDoktor: "/profile-doktor", //profileDoctor
    ZnajdzZapis: "/znajdz-zapis" ///znajdz-lekarza/zapis/0
    ZnajdzLekarzaZapis: "/znajdz-lekarza-zapis", ///znajdz-lekarza/zapis/0
    PlacowkiMedyczne: "/placowki-medyczne", ///Search-clinic
    ProfileKlinik: "profile-clinic", ///profile-clinic/1


  }

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
