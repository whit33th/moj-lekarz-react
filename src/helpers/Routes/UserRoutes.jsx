import { Route, Routes } from "react-router-dom";
import { pageConfig } from "../../config/config";
import Home from "../../pages/User/Home";
import AuthPage from "../../pages/Auth/AuthPage";
import ReviewsUser from "../../pages/User/ReviewsUser";
import ClinicZapisPage from "../../pages/User/ClinicZapisPage";
import Firm from "../../pages/User/Firm";
import MobileAppPage from "../../pages/User/MobileAppPage";
import NotFound from "../../pages/User/NotFound";
import RecipesPage from "../../pages/User/RecipesPage";
import QAComponent from "../../pages/User/QAComponent";
import Blog from "../../pages/User/Blog";
import VisitsPage from "../../pages/User/Visits/VisitsPage";
import VisitsPageTwo from "../../pages/User/Visits/VisitsPageTwo";
import DoctorProfile from "../../pages/User/ZnaidzLekarza/DoctorProfile";
import Profile from "../../pages/User/Profile/Profile";
import SearchClinicPage from "../../pages/User/Clinic/SearchClinicPage";
import ProfileClinic from "../../pages/User/Clinic/ProfileClinic";
import PolicyRegulamin from "../../pages/User/Policy/PolicyRegulamin";
import PolicyPersonalData from "../../pages/User/Policy/PolicyPersonalData";
import PolicyCookies from "../../pages/User/Policy/PolicyCookies";
import HowItWorks from "../../pages/User/HowItWorks/HowItWorks";
import SearchVisitsContainer from "../../pages/User/ZnaidzLekarza/SearchVisitsConteiner";
import ZnajdzLekarzaVersion2 from "../../pages/User/ZhaidzLekarzaVaersion2";
import PolicyPrivacy from "../../pages/User/Policy/PolicyPrivacy";
import ZapisFormPage from "./../../pages/User/ZnaidzLekarza/Zapis/ZapisFormPage";
import ZapisDone from "../../pages/User/ZnaidzLekarza/Zapis/ZapisDone";
import useStore from "../../data/store";
import ResetPassword from "../../pages/Auth/ResetPassword";
import DocumentsPage from "../../pages/User/ResearchResults/DocumentsPage";

function UserRoutes() {
  const { isAuth } = useStore();
  return (
    <Routes>
      <Route path={pageConfig.login} element={<AuthPage />} />
      <Route path={pageConfig.registration} element={<AuthPage />} />
      <Route path={pageConfig.patient.home} element={<Home />} />
      <Route path="/reviews/user/:id" element={<ReviewsUser />} />
      <Route path="/firm" element={<Firm />} />
      <Route path={pageConfig.patient.mobileApp} element={<MobileAppPage />} />
      <Route path={pageConfig.patient.qA} element={<QAComponent />} />
      <Route path={pageConfig.patient.blog} element={<Blog />} />
      <Route path="/profileDoctor/:id" element={<DoctorProfile />} />
      <Route path="/profileClinic/:id" element={<ProfileClinic />} />
      <Route
        path={pageConfig.patient.searchClinics}
        element={<SearchClinicPage />}
      />
      <Route path={pageConfig.patient.howItWorks} element={<HowItWorks />} />
      <Route
        path={pageConfig.patient.searchVisits}
        element={<SearchVisitsContainer />}
      />
      <Route
        path="/znajdz-lekarza-version2/"
        element={<ZnajdzLekarzaVersion2 />}
      />

      <Route
        path={pageConfig.patient.policy.regulations}
        element={<PolicyRegulamin />}
      />
      <Route
        path={pageConfig.patient.policy.privacy}
        element={<PolicyPersonalData />}
      />
      <Route
        path={pageConfig.patient.policy.cookies}
        element={<PolicyCookies />}
      />
      <Route
        path={pageConfig.patient.policy.privacy}
        element={<PolicyPrivacy />}
      />
      <Route path={pageConfig.resetPassword} element={<ResetPassword />} />

      {/* Protected */}
      {isAuth && (
        <>
          <Route path={pageConfig.patient.recipes} element={<RecipesPage />} />
          <Route path="/visits" element={<VisitsPage />} />
          <Route path="/visits-version2" element={<VisitsPageTwo />} />
          <Route path={pageConfig.patient.profile} element={<Profile />} />
          <Route
            path={`${pageConfig.patient.confirmVisit}/:id`}
            element={<ClinicZapisPage />}
          />
          <Route
            path={pageConfig.patient.ZapisFormPage}
            element={<ZapisFormPage />}
          />
          <Route path={pageConfig.patient.zapisDone} element={<ZapisDone />} />
          <Route
            path={pageConfig.patient.documents}
            element={<DocumentsPage />}
          />
        </>
      )}

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default UserRoutes;
