import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ScrollToTop from "./utils/scrollToTop";
import Modal from "./components/Modal/Modal";
import { Toaster } from "sonner";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DoctorRoutes from "./helpers/Routes/DoctorRoutes";
import FirmRoutes from "./helpers/Routes/FirmRoutes";
import AdminRoutes from "./helpers/Routes/AdminRoutes";
import UserRoutes from "./helpers/Routes/UserRoutes";

function App() {
  const [role] = useState("firm"); // Возможные роли: 'doctor', 'admin', 'firm'. В реальном проекте это будет приходить с сервера

  return (
    <Router>
      <ScrollToTop />
      {role === "user" ? (
        <>
          <Header />
          <UserRoutes />
          <Footer />
        </>
      ) : (
        <>
          <Sidebar role={role} />
          <div className="container">
            <Navbar />

            {role === "doctor" && <DoctorRoutes />}
            {role === "admin" && <AdminRoutes />}
            {role === "firm" && <FirmRoutes />}

            <Toaster duration={3500} richColors />
            <Modal />
          </div>
        </>
      )}
    </Router>
  );
}

export default App;
