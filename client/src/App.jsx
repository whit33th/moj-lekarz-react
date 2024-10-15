import React, { useState } from "react";
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
import { Toaster } from 'sonner';
import ReviewPage from './pages/Admin/Reviews/ReviewPage'

function App() {
  
  const [role, setRole] = useState("admin"); // Возможные роли: 'doctor', 'admin', 'firm'. В реальном проекте это будет приходить с сервера

  const [isAuth, setIsAuth] = useState(true); // ЧИсто для понятия что пользователь авторизован. В реальном проекте это будет приходить с сервера.
  //можешь вписать treu и посмотреть как выглядит страницы

  const doctorRoutes = (
    <Routes>
      <Route path="/" element={<DoctorMain />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/list" element={<PatientList />} />
      <Route path="/patient-info/:id" element={<PatientInfo />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/chat" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/last-visits" element={<LastVisits />} />
      <Route path="/todays-visits" element={<TodaysVisits />} />
      <Route path="/profile" element={<Profil />} />
      
    </Routes>
  );

  // Маршруты для роли "admin"
  const adminRoutes = (
    <Routes>
      <Route path="/" element={<AdminMain />} />
      <Route path="/database" element={<Database />} />
      <Route path="/database/:id" element={<FirmPage />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/profile" element={<Profil />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/reviews" element={<ReviewPage />} />
      <Route path="/chat" element={<Notifications />} />
    </Routes>
  );

  // Маршруты для роли "firm"
  const firmRoutes = (
    <Routes>
      <Route path="/" element={<FirmMain />} />
      <Route path="/workers" element={<Workers />} />
      <Route path="/management" element={<FirmManagement />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/chat" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profil />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  );

  return (
    <Router>
      <ScrollToTop />

      {!isAuth ? (
        <AuthPage />
      ) : (
        <>
          <Sidebar role={role} />
          <div className="container">
            <Navbar />

            {role === "doctor" && doctorRoutes}
            {role === "admin" && adminRoutes}
            {role === "firm" && firmRoutes}
            
            
            <Toaster duration={3500} richColors   />
            <Modal />
          </div>
        </>
      )}
    </Router>
  );
}

export default App;
