import { Route, Routes } from "react-router-dom";
import { useState } from 'react'
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
import ResearchResultsPage from "../../pages/User/ResearchResults/ResearchResultsPage";
import Profile from "../../pages/User/Profile/Profile";
import SearchClinicPage from "../../pages/User/Clinic/SearchClinicPage";
import ProfileClinic from "../../pages/User/Clinic/ProfileClinic";
import PolicyRegulamin from "../../pages/User/Policy/PolicyRegulamin";
import PolicyPersonalData from "../../pages/User/Policy/PolicyPersonalData";
import PolicyCookies from "../../pages/User/Policy/PolicyCookies";
import HowItWorks from "../../pages/User/HowItWorks/HowItWorks";
import ZnajdzLekarzaContainer from "../../pages/User/ZnaidzLekarza/ZnaidzLekarzaConteiner";
import ZnajdzLekarzaVersion2 from "../../pages/User/ZhaidzLekarzaVaersion2";
import PolicyPrivacy from "../../pages/User/Policy/PolicyPrivacy";

function UserRoutes() {
    const [isAuth, setIsAuth] = useState(true); 
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/*" element={<AuthPage setIsAuth={setIsAuth} />} />
      <Route path="/reviews/user/:id" element={<ReviewsUser />} />
      <Route path="/clinic-zapis/:id" element={<ClinicZapisPage />} />
      <Route path="/firm" element={<Firm />} />
      <Route path="/mobilna" element={<MobileAppPage />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/QA" element={<QAComponent />} />
      <Route path="/Blog" element={<Blog />} />
      <Route path="/visits" element={<VisitsPage />} />
      <Route path="/visits-version2" element={<VisitsPageTwo />} />
      <Route path="/profileDoctor/:id" element={<DoctorProfile />} />
      <Route path="/ResearchResult" element={<ResearchResultsPage />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Search-clinic" element={<SearchClinicPage />} />
      <Route path="/profile-clinic/:id" element={<ProfileClinic />} />
      <Route path="/policy/regulamin" element={<PolicyRegulamin />} />
      <Route path="/policy/personal-data" element={<PolicyPersonalData />} />
      <Route path="/policy/cookies" element={<PolicyCookies />} />
      <Route path="/how-it-work" element={<HowItWorks />} />
      <Route path="/znajdz-lekarza/*" element={<ZnajdzLekarzaContainer />} />
      <Route
        path="/znajdz-lekarza-version2/"
        element={<ZnajdzLekarzaVersion2 />}
      />
      <Route path="/policy/privacy" element={<PolicyPrivacy />} />
    </Routes>
  );
}

export default UserRoutes;
