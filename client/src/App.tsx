import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    { id: 2, date: "2026.02.18", msg: "New Trial: 'The Sailing Ship' now active." },
    { id: 3, date: "2026.02.15", msg: "Warning: Digital tide levels rising in Hub." }
  ];

  return (
    <div style={{ padding: '40px 20px', position: 'relative' }}>
      {showPass && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 2000, display: 'flex',
          justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            background: '#0a192f', padding: '40px', borderRadius: '20px',
            border: '2px solid #35c9ff', maxWidth: '500px', textAlign: 'center',
            boxShadow: '0 0 50px rgba(53, 201, 255, 0.3)'
          }}>
            <h2 style={{ color: '#35c9ff', fontSize: '2rem', marginBottom: '10px' }}>FOUNDER'S PASS</h2>
            <p style={{ color: '#ffffff', lineHeight: '1.6', marginBottom: '25px' }}>
              Welcome, Original Survivor. Your biometric signature has been logged. 
              Access to early-stage trials and the Never Ending Realm is now granted.
            </p>
            <button onClick={() => setShowPass(false)} style={{
                background: '#35c9ff', color: '#020817', border: 'none',
                padding: '12px 30px', borderRadius: '5px', fontWeight: 'bold',
                cursor: 'pointer', textTransform: 'uppercase'
            }}>Accept Credentials</button>
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3.5rem', color: '#ffffff', letterSpacing: '4px' }}>OCEAN TIDE DROP</h1>
        <p style={{ color: '#35c9ff', textTransform: 'uppercase', letterSpacing: '2px' }}>System Status: Online</p>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ color: '#ffffff', fontSize: '1.2rem', borderBottom: '1px solid #35c9ff', paddingBottom: '10px', marginBottom: '20px' }}>SURVIVAL LOGS</h2>
        {logs.map(log => (
          <div key={log.id} style={{ 
            background: 'rgba(53, 201, 255, 0.05)', padding: '15px', borderRadius: '4px', 
            marginBottom: '10px', display: 'flex', gap: '20px', borderLeft: '3px solid #35c9ff'
          }}>
            <span style={{ color: '#35c9ff', fontFamily: 'monospace' }}>[{log.date}]</span>
            <span style={{ color: '#ffffff' }}>{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Equipment = () => {
  const items = [
    { name: "Biometric Link", desc: "Syncs your pulse to the Realm's data flow.", rarity: "Essential" },
    { name: "Digital Compass", desc: "Points toward the nearest stable synchronization node.", rarity: "Common" }
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: '#35c9ff', fontSize: '2.5rem' }}>SURVIVAL GEAR</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: '#0a192f', border: '1px solid rgba(53, 201, 255, 0.3)', padding: '20px', borderRadius: '10px' }}>
            <div style={{ color: '#ff9f40', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '5px' }}>{item.rarity}</div>
            <h3 style={{ color: '#ffffff', margin: '0 0 10px 0' }}>{item.name}</h3>
            <p style={{ color: '#b0c4de', fontSize: '0.9rem', lineHeight: '1.4' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Island = () => (
  <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
    <h1 style={{ color: '#35c9ff', fontSize: '2.5rem' }}>SURVIVOR MAP</h1>
    <img src="https://otdaisurfer.surf/AI%20Surfer%20Survivor%20Island%20Map.png" alt="Map" style={{ width: '100%', borderRadius: '15px', border: '2px solid rgba(53, 201, 255, 0.4)' }} />
  </div>
);

const Challenges = () => (
  <div style={{ maxWidth: '850px', margin: '0 auto' }}>
    <h1 style={{ color: '#ff9f40', fontSize: '2.5rem' }}>ACTIVE TRIALS</h1>
    <div style={{ background: 'rgba(255, 159, 64, 0.05)', padding: '40px', borderRadius: '16px', borderLeft: '8px solid #ff9f40' }}>
      <h3 style={{ color: '#ffffff', fontSize: '1.8rem' }}>Trial 01: The Sailing Ship</h3>
      <p style={{ color: '#d1d1d1' }}>Navigate the wooden walkways and rope bridges.</p>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="world" element={<Island />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="equipment" element={<Equipment />} />
        </Route>
      </Routes>
    </Router>
  );
}
