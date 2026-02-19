import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useOutletContext } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MapPage from './pages/MapPage';

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
        <div style={{ marginTop: '20px', width: '20px', height: '30px', background: '#35c9ff', animation: 'blink 1s infinite' }} />
      </div>
      <style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
    </div>
  );
};

// --- REMAINING IN-LINE COMPONENTS (Move these to /pages/ later) ---

const Equipment = () => {
  const { setProgress } = useOutletContext<{ setProgress: React.Dispatch<React.SetStateAction<number>> }>();
  const [flash, setFlash] = useState(false);

  const items = [
    { id: 'bio_link', name: "Biometric Link", desc: "Syncs your pulse to the Realm.", rarity: "Essential", boost: 25 },
    { id: 'neu_over', name: "Neural Overdrive", desc: "Instantly boosts sync levels.", rarity: "Rare", boost: 50 }
  ];

  const collectItem = (boost: number) => {
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
    setProgress(prev => {
      const nextValue = Math.min(prev + boost, 100);
      localStorage.setItem('survivor_progress', nextValue.toString());
      return nextValue;
    });
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
      {flash && <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(53, 201, 255, 0.2)', zIndex: 1000, pointerEvents: 'none' }} />}
      <h1 style={{ color: '#35c9ff', fontSize: '2.5rem' }}>SURVIVAL GEAR</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
        {items.map((item) => (
          <div key={item.id} style={{ background: '#112240', padding: '25px', borderRadius: '12px', border: '1px solid #35c9ff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ color: '#35c9ff', margin: '0 0 10px 0' }}>{item.name}</h3>
              <p style={{ color: '#8892b0', fontSize: '0.9rem' }}>{item.desc}</p>
            </div>
            <button onClick={() => collectItem(item.boost)} style={{ marginTop: '20px', background: 'transparent', border: '1px solid #35c9ff', color: '#35c9ff', padding: '10px', cursor: 'pointer', borderRadius: '4px' }}>
              Equip (+{item.boost}%)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const rankings = [{ rank: 1, name: "Neon_Ghost", sync: 99 }, { rank: 2, name: "Tide_Runner", sync: 85 }];
  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', color: '#ffffff' }}>
      <h1 style={{ color: '#35c9ff', textAlign: 'center' }}>GLOBAL RANKINGS</h1>
      <div style={{ background: 'rgba(17, 34, 64, 0.8)', padding: '20px', borderRadius: '15px', border: '1px solid #35c9ff' }}>
        {rankings.map(r => <div key={r.rank} style={{ padding: '10px 0', borderBottom: '1px solid #35c9ff' }}>#{r.rank} {r.name} - {r.sync}%</div>)}
      </div>
    </div>
  );
};

// --- MAIN APP ROUTER ---

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) return <LoadingScreen onFinished={() => setIsLoading(false)} />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="equipment" element={<Equipment />} />
          <Route path="map" element={<MapPage />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
