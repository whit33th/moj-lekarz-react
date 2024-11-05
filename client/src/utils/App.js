import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header'
import Layout from './Layout'
import HowItWorks from './pages/HowItWorks/HowItWorks';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Firm from './pages/Firm';
import { useState } from 'react';
import MobileAppPage from './pages/MobileAppPage';
import Blog from './pages/Blog';
import QAComponent from './pages/QAComponent';
import PolicyRegulamin from './pages/Policy/PolicyRegulamin';
import PolicyPersonalData from './pages/Policy/PolicyPersonalData';
import PolicyCookies from './pages/Policy/PolicyCookies';
import PolicyPrivacy from './pages/Policy/PolicyPrivacy';
import Home from './pages/Home';
import AuthPage from './pages/Auth/AuthPage';
import ZnaidzLekarzaConteiner from './pages/ZnaidzLekarza/ZnaidzLekarzaConteiner';
import DoctorProfile from './pages/ZnaidzLekarza/DoctorProfile';
import ReviewsUser from './pages/ReviewsUser';
import SearchClinicPage from './pages/Clinic/SearchClinicPage';
import ProfileClinic from './pages/Clinic/ProfileClinic';
import ClinicZapisPage from './pages/ClinicZapisPage';
import ZhaidzLekarzaVersion2 from './pages/ZhaidzLekarzaVaersion2';
import NotFound from './pages/NotFound';
import VisitsPage from './pages/Visits/VisitsPage';
import RecipesPage from './pages/RecipesPage';
import ResearchResultsPage from './pages/ResearchResults/ResearchResultsPage';
import Profile from './pages/Profile/Profile';
import VisitsPageTwo from './pages/Visits/VisitsPageTwo';
import ZapisDone from './pages/ZnaidzLekarza/Zapis/ZapisDone';
import AddReviewsPage from './pages/AddReviewsPage/AddReviewsPage';


function App() {
  const [activePage, setActivePage] = useState('Jak to działa');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Layout activePage={activePage} setActivePage={setActivePage} isLoggedIn={isLoggedIn}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/*" element={<AuthPage setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/howitwork" element={<HowItWorks />} />
            <Route path="/znajdz-lekarza/*" element={<ZnaidzLekarzaConteiner isLoggedIn={isLoggedIn}/>} />
            <Route path="/znajdz-lekarzaversion2/" element={<ZhaidzLekarzaVersion2 />} />
            <Route path="/visits" element={<VisitsPage isLoggedIn={isLoggedIn}/>} />
            <Route path="/visits-version2" element={<VisitsPageTwo isLoggedIn={isLoggedIn}/>} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/ResearchResult" element={<ResearchResultsPage />} />
            <Route path="/Profile" element={<Profile />} />


            <Route path="/review-visits/:id" element={<AddReviewsPage isLoggedIn={isLoggedIn}/>} />

            <Route path="/profileDoctor/:id" element={<DoctorProfile />} />
            <Route path="/reviews/user/:id" element={<ReviewsUser />} />
            <Route path="/Search-clinic" element={<SearchClinicPage />} />
            <Route path="/profile-clinic/:id" element={<ProfileClinic />} />
            <Route path="/clinic-zapis/:id" element={<ClinicZapisPage />} />

            <Route path="/firm" element={<Firm />} />
            <Route path="/mobilna" element={<MobileAppPage />} />
            <Route path="/Blog" element={<Blog />} />
            <Route path="/QA" element={<QAComponent />} />
            <Route path="/policy/regulamin" element={<PolicyRegulamin />} />
            <Route path="/policy/personaldata" element={<PolicyPersonalData />} />
            <Route path="/policy/cookies" element={<PolicyCookies />} />
            <Route path="/policy/privacy" element={<PolicyPrivacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
