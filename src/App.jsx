import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/HomePage';
import Island from './pages/Island';
import Challenges from './pages/Challenges';
import Progression from './pages/Progression';
import Community from './pages/Community';
import Members from './pages/Members';
import Blog from './pages/Blog';
import Free from './pages/Free';
import Founders from './pages/Founders';
import Campfire from './pages/Campfire';
import Surfer from './pages/Arena';
import Dashboard from './pages/Dashboard';
import Ceremony from './pages/Ceremony';
import ThirdPartyTools from './pages/ThirdPartyTools';
import GearEquipment from './pages/GearEquipment';

// Optional: Fixes the "scroll position" bug on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Landing / Index Page */}
          <Route index element={<Home />} />
          
          {/* Core Dashboards / Tiers */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="free" element={<Free />} /> {/* This serves as your "Pink" path */}
          <Route path="founders" element={<Founders />} /> {/* This serves as your "Blue" path */}
          
          {/* Game & Community Features */}
          <Route path="island" element={<Island />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="progression" element={<Progression />} />
          <Route path="community" element={<Community />} />
          <Route path="campfire" element={<Campfire />} />
          <Route path="arena" element={<Surfer />} />
          <Route path="ceremony" element={<Ceremony />} />
          
          {/* Content & Resources */}
          <Route path="members" element={<Members />} />
          <Route path="blog" element={<Blog />} />
          <Route path="gear" element={<GearEquipment />} />
          <Route path="tools" element={<ThirdPartyTools />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
