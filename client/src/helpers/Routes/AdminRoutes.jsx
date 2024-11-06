import { Route, Routes } from 'react-router-dom'
import { pageConfig } from '../../config/config'
import AdminMain from '../../pages/Admin/Main/AdminMain'
import Database from '../../pages/Admin/Database/Database'
import FirmPage from '../../pages/Admin/Database/FirmPage/FirmPage'
import Reports from '../../pages/Admin/Reports/Reports'
import Profil from '../../pages/Doctor/Profil/Profil'
import Settings from '../../pages/Doctor/Settings/Settings'
import ReviewPage from '../../pages/Admin/Reviews/ReviewPage'
import Notifications from '../../pages/Doctor/Notifications/Notifications'


function AdminRoutes() {
	return (
    <Routes>
      <Route path={pageConfig.admin.home} element={<AdminMain />} />
      <Route path={pageConfig.admin.database} element={<Database />} />
      <Route path={pageConfig.admin.databaseId} element={<FirmPage />} />
      <Route path={pageConfig.admin.reports} element={<Reports />} />
      <Route path={pageConfig.admin.profile} element={<Profil />} />
      <Route path={pageConfig.admin.settings} element={<Settings />} />
      <Route path={pageConfig.admin.reviews} element={<ReviewPage />} />
      <Route path={pageConfig.admin.chat} element={<Notifications />} />
    </Routes>
  );
}

export default AdminRoutes