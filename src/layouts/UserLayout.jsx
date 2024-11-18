import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";

import Footer from "../components/Footer/Footer";

const UserLayout = ({ children, activePage, setActivePage, isLoggedIn }) => {
  const location = useLocation();

  const shouldShowHeaderFooter = !location.pathname
    .toLowerCase()
    .startsWith("/auth");

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
