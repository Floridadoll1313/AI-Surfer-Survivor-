import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AvatarProvider } from './context/AvatarContext';
import AvatarSelector from './pages/AvatarSelector';
import Home from './pages/Home';
import SurvivorWorld from './pages/SurvivorWorld';
import Leaderboard from './pages/Leaderboard';
import Header from './components/Header';

function App() {
  return (
    <AvatarProvider>
      <Router>
        <div style={{ 
          minHeight: '100vh', 
          backgroundColor: '#0a192f',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/avatar" element={<AvatarSelector />} />
              <Route path="/game" element={<SurvivorWorld />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AvatarProvider>
  );
}

export default App;
