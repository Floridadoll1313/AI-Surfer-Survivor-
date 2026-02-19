import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout and Global UI
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import Equipment from './pages/Equipment';
import Leaderboard from './pages/Leaderboard';

// --- HELPER COMPONENTS ---

/**
 * LoadingScreen Component
 * Simulates a terminal boot-up sequence before entering the app.
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

// --- MAIN APP ROUTER ---

/**
 * App Component
 * Handles the global loading state and the primary routing table.
 */
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // If system is booting, show the terminal sequence
  if (isLoading) {
    return <LoadingScreen onFinished={() => setIsLoading(false)} />;
  }

  return (
    <Router>
      <Routes>
        {/* All routes are wrapped in the Layout for consistent Header/Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="map" element={<MapPage />} />
          <Route path="equipment" element={<Equipment />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
