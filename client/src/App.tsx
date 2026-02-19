import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useOutletContext } from 'react-router-dom';
import Layout from './components/Layout';

// --- PAGE COMPONENTS ---

const Home = () => {
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPass(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const logs = [
    { id: 1, date: "2026.02.19", msg: "Sector Alpha synchronization stable." },
    { id: 2, date: "2026.02.18", msg: "Pulse Animation module integrated." },
    { id: 3, date: "2026.02.15", msg: "Warning: Digital tide levels rising." }
  ];

  return (
    <div style={{ padding: '40px 20px' }}>
      {showPass && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 2000,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            background: '#0a192f', padding: '40px', borderRadius: '20px',
            border: '2px solid #35c9ff', maxWidth: '500px', textAlign: 'center'
          }}>
            <h2 style={{ color: '#35c9ff', fontSize: '2rem' }}>FOUNDER'S PASS</h2>
            <p style={{ color: '#ffffff', marginBottom: '25px' }}>Access to the Realm is granted.</p>
            <button 
              onClick={() => setShowPass(false)} 
              style={{ background: '#35c9ff', color: '#020817', border: 'none', padding: '12px 30px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Accept Credentials
            </button>
          </div>
        </div>
      )}

      <h1 style={{ textAlign: 'center', fontSize: '3.5rem', color: '#ffffff' }}>OCEAN TIDE DROP</h1>
      
      <div style={{ maxWidth: '700px', margin: '40px auto' }}>
        <h2 style={{ color: '#ffffff', borderBottom: '1px solid #35c9ff' }}>SURVIVAL LOGS</h2>
        {logs.map(log => (
          <div key={log.id} style={{ background: 'rgba(53, 201, 255, 0.05)', padding: '15px', marginBottom: '10px', borderLeft: '3px solid #35c9ff', color: '#ffffff' }}>
            <span style={{ color: '#35c9ff' }}>[{log.date}]</span> {log.msg}
          </div>
        ))}
      </div>
    </div>
  );
};

const Equipment = () => {
  const { setProgress } = useOutletContext<{ setProgress: React.Dispatch<React.SetStateAction<number>> }>();

  const items = [
    { name: "Biometric Link", desc: "Syncs your pulse to the Realm.", rarity: "Essential", boost: 25 },
    { name: "Digital Compass", desc: "Points toward stable nodes.", rarity: "Common", boost: 15 },
    { name: "Neural Overdrive", desc: "Instantly boosts sync levels.", rarity: "Rare", boost: 50 }
  ];

  const collectItem = (boost: number) => {
    setProgress(prev => Math.min(prev + boost, 100));
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ color: '#35c9ff', fontSize: '2.5rem' }}>SURVIVAL GEAR</h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px', 
        marginTop: '30px' 
      }}>
        {items.map((item, index) => (
          <div key={index} style={{ 
            background: '#112240', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid #35c9ff', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between' 
          }}>
            <div>
              <h3 style={{ color: '#35c9ff', margin: '0 0 10px 0' }}>{item.name}</h3>
              <p style={{ color: '#8892b0', fontSize: '0.9rem' }}>{item.desc}</p>
              <span style={{ fontSize: '0.8rem', color: '#64ffda', textTransform: 'uppercase' }}>{item.rarity}</span>
            </div>
            <button 
              onClick={() => collectItem(item.boost)}
              style={{ 
                marginTop: '20px', 
                background: 'transparent', 
                border: '1px solid #35c9ff', 
                color: '#35c9ff', 
                padding: '10px', 
                cursor: 'pointer', 
                borderRadius: '4px',
                transition: '0.3s'
              }}
            >
              Equip (+{item.boost}%)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN APP ROUTER ---

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="equipment" element={<Equipment />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
