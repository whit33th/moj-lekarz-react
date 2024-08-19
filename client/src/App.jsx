import { useState } from "react";
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

function App() {
  const [role, setRole] = useState("doctor");



  const doctorRoutes = (
    <Routes>
      <Route path="/" element={<DoctorMain />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/list" element={<PatientList />} />
      <Route path="/list/patient-info" element={<PatientInfo />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/last-visits" element={<LastVisits />} />
      <Route path="/todays-visits" element={<TodaysVisits />} />
      <Route path="/profile" element={<Profil />} />
    </Routes>
  );

  const adminRoutes = (
    <Routes>
      <Route path="/" element={<AdminMain />} />
      <Route path="/profile" element={<Profil />} />
    </Routes>
  );

  const firmRoutes = (
    <Routes>
      <Route path="/" element={<FirmMain />} />
      <Route path="/workers" element={<Workers />} />
      <Route path="/firm-management" element={<FirmManagement />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profil />} />
    </Routes>
  );

  return (
    <Router>
      <ScrollToTop />
      <Sidebar role={role} />
      <div className="container">
        <Navbar />
        
        {role === "doctor" && doctorRoutes}
        {role === "admin" && adminRoutes}
        {role === "firm" && firmRoutes}

        <Modal />
      </div>
    </Router>
  );
}

export default App;
