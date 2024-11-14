import { useState, lazy, Suspense } from "react";

import { BrowserRouter as Router } from "react-router-dom";

import { Toaster } from "sonner";
import ScrollToTop from "./utils/scrollToTop";
const Sidebar = lazy(() => import("./components/Sidebar/Sidebar"));
const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const Header = lazy(() => import("./components/Header/Header"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const FirmRoutes = lazy(() => import("./helpers/Routes/FirmRoutes"));
const AdminRoutes = lazy(() => import("./helpers/Routes/AdminRoutes"));
const UserRoutes = lazy(() => import("./helpers/Routes/UserRoutes"));
const DoctorRoutes = lazy(() => import("./helpers/Routes/DoctorRoutes"));
const Modal = lazy(() => import("./components/Modal/Modal"));

function App() {
  const [role] = useState("admin"); // 'doctor', 'admin', 'firm'.

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
