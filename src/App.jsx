import useIsAuth from "@hooks/AuthHooks/useIsAuth";
import { lazy, Suspense, useCallback, useEffect } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";
import LoadingPage from "./components/UI/Loading/LoadingPage";
import useStore from "./data/store";
import UserLayout from "./layouts/UserLayout";
import Workspace from "./layouts/Workspace";
import ScrollToTop from "./utils/scrollToTop";
const FirmRoutes = lazy(() => import("./helpers/Routes/FirmRoutes"));
const AdminRoutes = lazy(() => import("./helpers/Routes/AdminRoutes"));
const UserRoutes = lazy(() => import("./helpers/Routes/UserRoutes"));
const DoctorRoutes = lazy(() => import("./helpers/Routes/DoctorRoutes"));
const Modal = lazy(() => import("@components/Modal/Modal"));

function App() {
  const { checkIsAuth } = useIsAuth();
  const { role, isAuth } = useStore();

  const stableCheckIsAuth = useCallback(() => {
    checkIsAuth();
  }, [checkIsAuth]);

  useEffect(() => {
    stableCheckIsAuth();
  }, [stableCheckIsAuth]);
  console.log(isAuth, role);

  return (
    <SkeletonTheme
      baseColor="#f0f0f0"
      highlightColor="#ececec"
      borderRadius={12}
    >
      <Router>
        <ScrollToTop />

        <Suspense fallback={<LoadingPage />}>
          {role === "patient" || !isAuth ? (
            <UserLayout isLoggedIn={isAuth}>
              <UserRoutes isAuth={isAuth} />
            </UserLayout>
          ) : (
            <Workspace isAuth={isAuth} role={role}>
              {role === "doctor" && <DoctorRoutes isAuth={isAuth} />}
              {role === "admin" && <AdminRoutes isAuth={isAuth} />}
              {role === "clinic" && <FirmRoutes isAuth={isAuth} />}
            </Workspace>
          )}
          <Modal />
          <Toaster duration={3500} richColors />
        </Suspense>
      </Router>
    </SkeletonTheme>
  );
}

export default App;
