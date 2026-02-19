import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import Equipment from './pages/Equipment';
import Leaderboard from './pages/Leaderboard';
import Challenges from './pages/Challenges';
import Archive from './pages/Archive';
import AvatarSelector from './pages/AvatarSelector';
import DailyReward from './pages/DailyReward';
import Diagnostic from './pages/Diagnostic';

const LoadingScreen = ({ onFinished }: { onFinished: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const bootMessages = ["> INITIALIZING...", "> LOADING NEURAL_OS...", "> ACCESS GRANTED."];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootMessages.length) {
        setLogs(prev => [...prev, bootMessages[currentLine]]);
        currentLine++;
      } else { clearInterval(interval); setTimeout(onFinished, 1000); }
    }, 600);
    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#020c1b', color: '#35c9ff', zIndex: 9999, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10%', fontFamily: 'monospace' }}>
      {logs.map((log, i) => <p key={i}>{log}</p>)}
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  if (isLoading) return <LoadingScreen onFinished={() => setIsLoading(false)} />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="map" element={<MapPage />} />
          <Route path="equipment" element={<Equipment />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="archive" element={<Archive />} />
          <Route path="identity" element={<AvatarSelector />} />
          <Route path="rewards" element={<DailyReward />} />
          <Route path="diagnostic" element={<Diagnostic />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
