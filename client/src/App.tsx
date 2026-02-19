import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Global Layout
import Layout from './components/Layout';

// Individual Pages
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import Equipment from './pages/Equipment';
import Leaderboard from './pages/Leaderboard';
import Challenges from './pages/Challenges';
import Archive from './pages/Archive';
import AvatarSelector from './pages/AvatarSelector';

// --- LOADING TERMINAL COMPONENT ---

/**
 * LoadingScreen Component
 * Simulates the terminal boot-up sequence.
 */
const LoadingScreen = ({ onFinished }: { onFinished: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const bootMessages = [
    "> INITIALIZING SECTOR_ALPHA_TERMINAL...",
    "> LOADING NEURAL_OS v1.0.4",
    "> SCANNING BIOMETRICS...",
    "> ESTABLISHING REALM CONNECTION...",
    "> ACCESS GRANTED. WELCOME, SURFER."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootMessages.length) {
        setLogs(prev => [...prev, bootMessages[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(onFinished, 1000);
      }
    }, 600);
    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: '#020c1b', color: '#35c9ff', zIndex: 9999,
      fontFamily: '"Courier New", Courier, monospace',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10%'
    }}>
      <div style={{ maxWidth: '600px' }}>
        {logs.map((log, i) => <p key={i} style={{ margin: '5px 0', fontSize: '1.2rem' }}>{log}</p>)}
        <div style={{ 
          marginTop: '20px', width: '20px', height: '30px', 
          background: '#35c9ff', animation: 'blink 1s infinite' 
        }} />
      </div>
      <style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
    </div>
  );
};

// --- MAIN ROUTER ---

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onFinished={() => setIsLoading(false)} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Default Landing Page */}
          <Route index element={<Home />} />
          
          {/* Functional Pages */}
          <Route path="map" element={<MapPage />} />
          <Route path="equipment" element={<Equipment />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="archive" element={<Archive />} />
          
          {/* Profile & Identity */}
          <Route path="identity" element={<AvatarSelector />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
