import { Route, Routes } from "react-router-dom";
import { pageConfig } from "../../config/config";
import AdminMain from "../../pages/Admin/Main/AdminMain";
import AddFirm from "../../pages/Admin/AddFirm/AddFirm";
import Blogs from "../../pages/Admin/Blogs/Blogs";

import FirmPage from "../../pages/Admin/Database/FirmPage/FirmPage";
import Reports from "../../pages/Admin/Reports/Reports";
import ReviewPage from "../../pages/Admin/Reviews/ReviewPage";
import Profil from "../../pages/Doctor/Profil/Profil";
import NotFound from "../../pages/User/NotFound";
import Settings from "./../../pages/Admin/Settings/Settings";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<NotFound />} />

      <Route path={pageConfig.admin.home} element={<AdminMain />} />
      <Route path={pageConfig.admin.databaseId} element={<FirmPage />} />
      <Route path={pageConfig.admin.reports} element={<Reports />} />
      <Route path={pageConfig.admin.profile} element={<Profil />} />
      <Route path={pageConfig.admin.settings} element={<Settings />} />
      <Route path={pageConfig.admin.reviews} element={<ReviewPage />} />
      <Route path={pageConfig.admin.addFirm} element={<AddFirm />} />
      <Route path={pageConfig.admin.blogs} element={<Blogs />} />
    </Routes>
  );
}

export default AdminRoutes;
