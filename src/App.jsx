import { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./utils/scrollToTop";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import Workspace from "./layouts/Workspace";
import UserLayout from "./layouts/UserLayout";

const FirmRoutes = lazy(() => import("./helpers/Routes/FirmRoutes"));
const AdminRoutes = lazy(() => import("./helpers/Routes/AdminRoutes"));
const UserRoutes = lazy(() => import("./helpers/Routes/UserRoutes"));
const DoctorRoutes = lazy(() => import("./helpers/Routes/DoctorRoutes"));

function App() {
  const [role] = useState("firm"); // 'doctor', 'admin', 'firm'
  const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,

    cookieSecure: window.location.protocol === "https:",
  });
  return (
    <AuthProvider store={store}>
      <Router>
        <ScrollToTop />

        <Suspense>
          {role === "user" ? (
            <UserLayout>
              <UserRoutes />
            </UserLayout>
          ) : (
            <Workspace role={role}>
              {role === "doctor" && <DoctorRoutes />}
              {role === "admin" && <AdminRoutes />}
              {role === "firm" && <FirmRoutes />}
            </Workspace>
          )}
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
