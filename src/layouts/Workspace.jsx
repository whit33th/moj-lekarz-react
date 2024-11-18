import { lazy } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Toaster } from "sonner";

import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
const Modal = lazy(() => import("../components/Modal/Modal"));

function Workspace({ role, children }) {
  const isAuth = useIsAuthenticated();
  console.log(isAuth);
  return (
    <>
      {isAuth ? (
        <>
          <Sidebar role={role} />
          <div className="container">
            <Navbar />

            {children}

            <Toaster duration={3500} richColors />
            <Modal />
          </div>
        </>
      ) : (
        children
      )}
    </>
  );
}

export default Workspace;
