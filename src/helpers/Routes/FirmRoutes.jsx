import { Route, Routes } from "react-router-dom";
import { pageConfig } from "../../config/config";
import FirmMain from "../../pages/Firm/Main/FirmMain";
import GraphManagement from "../../pages/Firm/GraphManagement/GraphManagement";
import SelectedGraph from "../../pages/Firm/GraphManagement/SelectedGraph";
import Workers from "../../pages/Firm/Workers/Workers";
import FirmManagement from "../../pages/Firm/FirmManagement/FirmManagement";
import Notifications from "../../pages/Doctor/Notifications/Notifications";
import SettingsAdmin from "../../pages/Doctor/Settings/Settings";
import WorkersInfo from "../../pages/Firm/Workers/WorkersInfo";
import Patients from "../../pages/Firm/Patients/Patients";
import NotFound from "../../pages/User/NotFound";
import AuthPage from "../../pages/Auth/AuthPage";
import CalendarClinic from "../../pages/Doctor/Calendar/CalendarClinic";
import ProfilFirm from "../../pages/Firm/Profil/Profil";

function FirmRoutes() {
  return (
    <Routes>
      <Route path={pageConfig.login} element={<AuthPage />} />
      <Route path={pageConfig.registration} element={<AuthPage />} />
      <Route path="/*" element={<NotFound />} />
      
        <Route path={pageConfig.firm.home} element={<FirmMain />} />
        <Route path={pageConfig.firm.calendar} element={<CalendarClinic />} />
        <Route path={pageConfig.firm.graph} element={<GraphManagement />} />
        <Route path={pageConfig.firm.graphManage} element={<SelectedGraph />} />
        <Route path={pageConfig.firm.workers} element={<Workers />} />
        <Route path={pageConfig.firm.patient} element={<Patients />} />
        <Route path={pageConfig.firm.management} element={<FirmManagement />} />
        <Route
          path={pageConfig.firm.notifications}
          element={<Notifications />}
        />
        {/* <Route path={pageConfig.firm.chat} element={<Notifications />} /> */}
        
        <Route path={pageConfig.firm.profile} element={<ProfilFirm />} />
        <Route path={pageConfig.firm.workersInfo} element={<WorkersInfo />} />
      
    </Routes>
  );
}

export default FirmRoutes;
