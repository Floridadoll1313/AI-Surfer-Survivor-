import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Core Pages (Built Out in previous steps)
import Island from './pages/Island';
import Arena from './pages/Arena';
import ProgressionDashboard from './pages/ProgressionDashboard';
import Campfire from './pages/Campfire';
import Ceremony from './pages/Ceremony';

// Additional Survivor Realm Pages (To be built out)
import Challenges from './pages/Challenges';
import Store from './pages/Store';
import Leaderboard from './pages/Leaderboard';
import Inventory from './pages/Inventory';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tutorial from './pages/Tutorial';
import Lore from './pages/Lore';
import Archive from './pages/Archive';

function App() {
  return (
    <Router>
      {/* Global Wrapper for Neon Aesthetics */}
      <div className="bg-black min-h-screen text-white selection:bg-neon-pink selection:text-black">
        
        {/* Navbar remains static to ensure "never-ending" flow */}
        <Navbar />
        
        <Routes>
          {/* Main Gameplay and Hubs */}
          <Route path="/" element={<Island />} />
          <Route path="/island" element={<Island />} />
          <Route path="/arena" element={<Arena />} />
          <Route path="/progression" element={<ProgressionDashboard />} />
          <Route path="/campfire" element={<Campfire />} />
          <Route path="/ceremony" element={<Ceremony />} />

          {/* Survivor Utilities and Social */}
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/store" element={<Store />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/inventory" element={<Inventory />} />
          
          {/* Metadata and Configuration */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/lore" element={<Lore />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;