import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ProgressionProvider } from './source/hooks/ProgressionContext';

// Core & Hubs
import Home from './pages/Home';
import Homepage from './pages/Homepage'; // Renamed from homepage.ts
import Island from './pages/Island';
import SurvivorWorld from './pages/SurvivorWorld';
import MapPage from './pages/MapPage';

// Gameplay & Progression
import Arena from './pages/Arena';
import Ceremony from './pages/Ceremony';
import ProgressionDashboard from './pages/ProgressionDashboard';
import Progression from './pages/progression'; // Supporting state view
import Achievements from './pages/Achievements';
import Success from './pages/Success';
import DailyReward from './pages/DailyReward';

// Learning & Lore
import LessonList from './pages/LessonList';
import Lessons from './pages/Lessons';
import Diagnostic from './pages/Diagnostic';
import LoreArchive from './pages/LoreArchive';
import Lore from './pages/lore';
import LoreId from './pages/loreId'; // Dynamic route

// Economy & Gear
import Shop from './pages/Shop';
import PricingPage from './pages/PricingPage';
import Gear from './pages/Gear';
import Equipment from './pages/Equipment';
import TheVault from './pages/TheVault';
import AvatarSelector from './pages/AvatarSelector';
import ThirdPartyTools from './pages/ThirdPartyTools';

// Community & Account
import Login from './pages/login';
import Members from './pages/Members';
import MembersSection from './pages/MembersSection';
import Founders from './pages/Founders';
import Credits from './pages/Credits';

function App() {
  return (
    <Router>
      <ProgressionProvider>
        <div className="bg-black min-h-screen text-white font-sans selection:bg-neon-pink selection:text-black">
          <Navbar />
          <Routes>
            {/* Main Hubs */}
            <Route path="/" element={<Homepage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/island" element={<Island />} />
            <Route path="/world" element={<SurvivorWorld />} />
            <Route path="/map" element={<MapPage />} />

            {/* Gameplay */}
            <Route path="/arena" element={<Arena />} />
            <Route path="/ceremony" element={<Ceremony />} />
            <Route path="/dashboard" element={<ProgressionDashboard />} />
            <Route path="/stats" element={<Progression />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/daily" element={<DailyReward />} />
            <Route path="/success" element={<Success />} />

            {/* Knowledge Base */}
            <Route path="/lessons" element={<LessonList />} />
            <Route path="/lesson/:id" element={<Lessons />} />
            <Route path="/diagnostic" element={<Diagnostic />} />
            <Route path="/lore" element={<LoreArchive />} />
            <Route path="/lore-view" element={<Lore />} />
            <Route path="/lore/:id" element={<LoreId />} />

            {/* Gear & Market */}
            <Route path="/shop" element={<Shop />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/gear" element={<Gear />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/vault" element={<TheVault />} />
            <Route path="/avatar" element={<AvatarSelector />} />
            <Route path="/tools" element={<ThirdPartyTools />} />

            {/* Community */}
            <Route path="/login" element={<Login />} />
            <Route path="/members" element={<Members />} />
            <Route path="/founders" element={<Founders />} />
            <Route path="/credits" element={<Credits />} />
          </Routes>
        </div>
      </ProgressionProvider>
    </Router>
  );
}
