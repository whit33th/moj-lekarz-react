import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";

import Footer from "../components/Footer/Footer";
import { pageConfig } from "../config/config";

const UserLayout = ({ children, activePage, setActivePage, isLoggedIn }) => {
  const location = useLocation();

  const shouldShowHeaderFooter = ![
    pageConfig.login,
    pageConfig.registration,
  ].some((path) => location.pathname.toLowerCase().startsWith(path));
  return (
    <>
      {shouldShowHeaderFooter && (
        <Header
          activePage={activePage}
          changeActivePage={setActivePage}
          isLoggedIn={isLoggedIn}
        />
      )}
      {children}
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
};

export default UserLayout;
