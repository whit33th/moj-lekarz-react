import { Route, Routes } from "react-router-dom";
import { pageConfig } from "../../config/config";
import AdminMain from "../../pages/Admin/Main/AdminMain";
import Database from "../../pages/Admin/Database/Database";
import FirmPage from "../../pages/Admin/Database/FirmPage/FirmPage";
import Reports from "../../pages/Admin/Reports/Reports";
import Profil from "../../pages/Doctor/Profil/Profil";
import ReviewPage from "../../pages/Admin/Reviews/ReviewPage";
import Notifications from "../../pages/Doctor/Notifications/Notifications";
import AddFirm from "../../pages/Admin/AddFirm/AddFirm";
import Statistic from "../../pages/Admin/Statistic/Statistic";
import Settings from "./../../pages/Admin/Settings/Settings";
import NotFound from "../../pages/User/NotFound";
import AuthPage from "../../pages/Auth/AuthPage";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";

function AdminRoutes() {
  return (
    <Routes>
      <Route path={pageConfig.login} element={<AuthPage />} />
      <Route path={pageConfig.registration} element={<AuthPage />} />
      <Route path="/*" element={<NotFound />} />

      <Route element={<AuthOutlet fallbackPath="/login" />}>
        <Route path={pageConfig.admin.home} element={<AdminMain />} />
        <Route path={pageConfig.admin.database} element={<Database />} />
        <Route path={pageConfig.admin.databaseId} element={<FirmPage />} />
        <Route path={pageConfig.admin.reports} element={<Reports />} />
        <Route path={pageConfig.admin.profile} element={<Profil />} />
        <Route path={pageConfig.admin.settings} element={<Settings />} />
        <Route path={pageConfig.admin.reviews} element={<ReviewPage />} />
        <Route path={pageConfig.admin.chat} element={<Notifications />} />
        <Route path={pageConfig.admin.addFirm} element={<AddFirm />} />
        <Route path={pageConfig.admin.statistic} element={<Statistic />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
