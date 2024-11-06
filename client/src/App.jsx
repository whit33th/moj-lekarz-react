import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorMain from "./pages/Doctor/Main/DoctorMain";
import Calendar from "./pages/Doctor/Calendar/Calendar";
import Navbar from "./components/Navbar/Navbar";
import PatientList from "./pages/Doctor/PatientList/PatientList";
import Recipes from "./pages/Doctor/Recipes/Recipes";
import Notifications from "./pages/Doctor/Notifications/Notifications";
import Settings from "./pages/Doctor/Settings/Settings";
import LastVisits from "./pages/Doctor/LastVisits/LastVisits";
import TodaysVisits from "./pages/Doctor/TodaysVisits/TodaysVisits";
import ScrollToTop from "./utils/scrollToTop";
import Profil from "./pages/Doctor/Profil/Profil";
import AdminMain from "./pages/Admin/Main/AdminMain";
import FirmMain from "./pages/Firm/Main/FirmMain";
import FirmManagement from "./pages/Firm/FirmManagement/FirmManagement";
import Workers from "./pages/Firm/Workers/Workers";
import Modal from "./components/Modal/Modal";
import PatientInfo from "./pages/Doctor/PatientInfo/PatientInfo";
import AuthPage from "./pages/Auth/AuthPage";
import Database from "./pages/Admin/Database/Database";
import FirmPage from "./pages/Admin/Database/FirmPage/FirmPage";
import Reports from "./pages/Admin/Reports/Reports";
import { Toaster } from "sonner";
import ReviewPage from "./pages/Admin/Reviews/ReviewPage";
import GraphManagement from "./pages/Firm/GraphManagement/GraphManagement";
import SelectedGraph from "./pages/Firm/GraphManagement/SelectedGraph";
import { pageConfig } from "./config/config";
import WorkersInfo from "./pages/Firm/Workers/WorkersInfo";
import Home from './pages/User/Home';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import ReviewsUser from './pages/User/ReviewsUser';
import ClinicZapisPage from './pages/User/ClinicZapisPage';
import Firm from './pages/User/Firm';
import MobileAppPage from './pages/User/MobileAppPage';
import NotFound from './pages/User/NotFound';
import RecipesPage from './pages/User/RecipesPage';
import QAComponent from './pages/User/QAComponent';
import Blog from './pages/User/Blog';
import VisitsPage from './pages/User/Visits/VisitsPage';
import VisitsPageTwo from './pages/User/Visits/VisitsPageTwo';
import DoctorProfile from './pages/User/ZnaidzLekarza/DoctorProfile';
import ResearchResultsPage from './pages/User/ResearchResults/ResearchResultsPage';

function App() {
  const [role, setRole] = useState("user"); // Возможные роли: 'doctor', 'admin', 'firm'. В реальном проекте это будет приходить с сервера

  const [isAuth, setIsAuth] = useState(true); // ЧИсто для понятия что пользователь авторизован. В реальном проекте это будет приходить с сервера.
  //можешь вписать treu и посмотреть как выглядит страницы
  // Initialize Lenis

  // Listen for the scroll event and log the event data

  const doctorRoutes = (
    <Routes>
      <Route path={pageConfig.doctor.home} element={<DoctorMain />} />
      <Route path={pageConfig.doctor.calendar} element={<Calendar />} />
      <Route path={pageConfig.doctor.list} element={<PatientList />} />
      <Route path={pageConfig.doctor.patientInfo} element={<PatientInfo />} />
      <Route path={pageConfig.doctor.recipes} element={<Recipes />} />
      <Route
        path={pageConfig.doctor.notifications}
        element={<Notifications />}
      />
      <Route path={pageConfig.doctor.chat} element={<Notifications />} />
      <Route path={pageConfig.doctor.settings} element={<Settings />} />
      <Route path={pageConfig.doctor.lastVisits} element={<LastVisits />} />
      <Route path={pageConfig.doctor.todaysVisits} element={<TodaysVisits />} />
      <Route path={pageConfig.doctor.profile} element={<Profil />} />
    </Routes>
  );

  // Admin routes
  const adminRoutes = (
    <Routes>
      <Route path={pageConfig.admin.home} element={<AdminMain />} />
      <Route path={pageConfig.admin.database} element={<Database />} />
      <Route path={pageConfig.admin.databaseId} element={<FirmPage />} />
      <Route path={pageConfig.admin.reports} element={<Reports />} />
      <Route path={pageConfig.admin.profile} element={<Profil />} />
      <Route path={pageConfig.admin.settings} element={<Settings />} />
      <Route path={pageConfig.admin.reviews} element={<ReviewPage />} />
      <Route path={pageConfig.admin.chat} element={<Notifications />} />
    </Routes>
  );

  // Firm routes
  const firmRoutes = (
    <Routes>
      <Route path={pageConfig.firm.home} element={<FirmMain />} />
      <Route path={pageConfig.firm.calendar} element={<Calendar />} />
      <Route path={pageConfig.firm.graph} element={<GraphManagement />} />
      <Route path={pageConfig.firm.graphManage} element={<SelectedGraph />} />
      <Route path={pageConfig.firm.workers} element={<Workers />} />
      <Route path={pageConfig.firm.management} element={<FirmManagement />} />
      <Route path={pageConfig.firm.notifications} element={<Notifications />} />
      <Route path={pageConfig.firm.chat} element={<Notifications />} />
      <Route path={pageConfig.firm.settings} element={<Settings />} />
      <Route path={pageConfig.firm.profile} element={<Profil />} />
      <Route path="/workers/id" element={<WorkersInfo />} />
    </Routes>
  );

  const userRoutes = (
    <Routes>
      {/* Эти работают +- */}

      <Route path="/" element={<Home />} />
      <Route path="/auth/*" element={<AuthPage setIsAuth={setIsAuth} />} />
      <Route path="/reviews/user/:id" element={<ReviewsUser />} />
      <Route path="/clinic-zapis/:id" element={<ClinicZapisPage />} />
      <Route path="/firm" element={<Firm />} />
      <Route path="/mobilna" element={<MobileAppPage />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/QA" element={<QAComponent />} />
      <Route path="/Blog" element={<Blog />} />
      <Route path="/visits" element={<VisitsPage />} />
      <Route path="/visits-version2" element={<VisitsPageTwo />} />
      <Route path="/profileDoctor/:id" element={<DoctorProfile />} />
      <Route path="/ResearchResult" element={<ResearchResultsPage />} />
      <Route path="/Profile" element={<Profile />} />
      {/* Эти нет! */}

      {/* <Route
        path="/znajdz-lekarzaversion2/"
        element={<ZhaidzLekarzaVersion2 />}
      /> */}

      {/*
       */}
      {/* 
      

       */}
      {/* <Route path="/Search-clinic" element={<SearchClinicPage/>} />
      <Route path="/profile-clinic/:id" element={<ProfileClinic />} /> */}
      {/* <Route path="/policy/regulamin" element={<PolicyRegulamin />} />
      <Route path="/policy/personaldata" element={<PolicyPersonalData />} />
      <Route path="/policy/cookies" element={<PolicyCookies />} />
      <Route path="/policy/privacy" element={<PolicyPrivacy />} /> */}
      {/* <Route path="/howitwork" element={<HowItWorks />} /> */}
      {/* <Route path="/znajdz-lekarza/*" element={<ZnaidzLekarzaConteiner />} /> */}
    </Routes>
  );

  return (
    <Router>
      <ScrollToTop />
      {role === "user" ? (
        <>
           <Header />
          {userRoutes}
          <Footer />
        </>
      ) : (
        <>
          <Sidebar role={role} />
          <div className="container">
            <Navbar />

            {role === "doctor" && doctorRoutes}
            {role === "admin" && adminRoutes}
            {role === "firm" && firmRoutes}

            <Toaster duration={3500} richColors />
            <Modal />
          </div>
        </>
      )}
    </Router>
  );
}

export default App;
