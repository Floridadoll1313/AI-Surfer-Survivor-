import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AvatarProvider } from './context/AvatarContext';

// Page Imports
import Home from './pages/Home';
import SurvivorWorld from './pages/SurvivorWorld';
import Profile from './pages/Profile';
import Shop from './pages/Shop';
import Achievements from './pages/Achievements';
import Leaderboard from './pages/Leaderboard';
import Credits from './pages/Credits';

function App() {
  return (
    <AvatarProvider>
      <Router>
        <div className="min-h-screen bg-[#0a192f]">
          <Routes>
            {/* Main Hub */}
            <Route path="/" element={<Home />} />
            
            {/* Core Game */}
            <Route path="/survivor" element={<SurvivorWorld />} />
            
            {/* Player Systems */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/achievements" element={<Achievements />} />
            
            {/* Social & Info */}
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/credits" element={<Credits />} />
          </Routes>
        </div>
      </Router>
    </AvatarProvider>
  );
}

export default App;
