import { Route, Routes } from "react-router-dom";
import { pageConfig } from "../../config/config";
import DoctorMain from "../../pages/Doctor/Main/DoctorMain";

import PatientList from "../../pages/Doctor/PatientList/PatientList";
import PatientInfo from "../../pages/Doctor/PatientInfo/PatientInfo";
import Recipes from "../../pages/Doctor/Recipes/Recipes";
import Notifications from "../../pages/Doctor/Notifications/Notifications";
import SettingsAdmin from "../../pages/Doctor/Settings/Settings";
import LastVisits from "../../pages/Doctor/LastVisits/LastVisits";
import TodaysVisits from "../../pages/Doctor/TodaysVisits/TodaysVisits";
import Profil from "../../pages/Doctor/Profil/Profil";
import Calendar from "./../../pages/Doctor/Calendar/Calendar";
import NotFound from "../../pages/User/NotFound";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import AuthPage from "../../pages/Auth/AuthPage";

function DoctorRoutes() {
  return (
    <Routes>
      <Route path={pageConfig.login} element={<AuthPage />} />
      <Route path={pageConfig.registration} element={<AuthPage />} />
      <Route path="/*" element={<NotFound />} />
      <Route element={<AuthOutlet fallbackPath={pageConfig.doctor.login} />}>
        <Route path={pageConfig.doctor.calendar} element={<Calendar />} />
        <Route path={pageConfig.doctor.home} element={<DoctorMain />} />
        <Route path={pageConfig.doctor.list} element={<PatientList />} />
        <Route path={pageConfig.doctor.patientInfo} element={<PatientInfo />} />
        <Route path={pageConfig.doctor.recipes} element={<Recipes />} />
        <Route
          path={pageConfig.doctor.notifications}
          element={<Notifications />}
        />
        <Route path={pageConfig.doctor.settings} element={<SettingsAdmin />} />
        <Route path={pageConfig.doctor.lastVisits} element={<LastVisits />} />
        <Route
          path={pageConfig.doctor.todaysVisits}
          element={<TodaysVisits />}
        />
        <Route path={pageConfig.doctor.profile} element={<Profil />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default DoctorRoutes;
