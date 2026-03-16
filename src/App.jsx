import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="island" element={<Island />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="progression" element={<Progression />} />
          <Route path="community" element={<Community />} />
          <Route path="members" element={<Members />} />
          <Route path="blog" element={<Blog />} />
          <Route path="free" element={<Free />} />
          <Route path="founders" element={<Founders />} />
          <Route path="campfire" element={<Campfire />} />
          <Route path="arena" element={<Surfer />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ceremony" element={<Ceremony />} />
          <Route path="/gear" element={<GearEquipment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
