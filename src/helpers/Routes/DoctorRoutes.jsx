import { Route, Routes } from "react-router-dom"
import { pageConfig } from "../../config/config"
import DoctorMain from "../../pages/Doctor/Main/DoctorMain"
import LastVisits from "../../pages/Doctor/LastVisits/LastVisits"
import PatientInfo from "../../pages/Doctor/PatientInfo/PatientInfo"
import PatientList from "../../pages/Doctor/PatientList/PatientList"
import Profil from "../../pages/Doctor/Profil/Profil"
import Recipes from "../../pages/Doctor/Recipes/Recipes"
import SettingsAdmin from "../../pages/Doctor/Settings/Settings"
import TodaysVisits from "../../pages/Doctor/TodaysVisits/TodaysVisits"
import NotFound from "../../pages/User/NotFound"
import Calendar from "./../../pages/Doctor/Calendar/Calendar"

function DoctorRoutes({ isAuth }) {
  if (!isAuth) {
    return <NotFound />
  }
  return (
    <Routes >
      
      <Route path={pageConfig.doctor.calendar} element={<Calendar />} />
      <Route path={pageConfig.doctor.home} element={<DoctorMain />} />
      <Route path={pageConfig.doctor.list} element={<PatientList />} />
      <Route path={pageConfig.doctor.patientInfo} element={<PatientInfo />} />
      <Route path={pageConfig.doctor.recipes} element={<Recipes />} />
      <Route path={pageConfig.doctor.settings} element={<SettingsAdmin />} />
      <Route path={pageConfig.doctor.lastVisits} element={<LastVisits />} />
      <Route path={pageConfig.doctor.todaysVisits} element={<TodaysVisits />}/>
      <Route path={pageConfig.doctor.profile} element={<Profil />} />
      <Route path="/*" element={<NotFound />} />

    </Routes>
  )
}

export default DoctorRoutes
