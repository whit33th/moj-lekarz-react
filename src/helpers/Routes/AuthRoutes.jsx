import { Route, Routes } from "react-router-dom";
import { pageConfig } from "../../config/config";
import AuthPage from "../../pages/Auth/AuthPage";
import NotFound from '../../pages/User/NotFound'

function AuthRoutes() {
  
  return (
    
    <Routes>
      <Route path={pageConfig.login} element={<AuthPage />} />
      <Route path={pageConfig.registration} element={<AuthPage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default AuthRoutes;
