import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// --- PAGE COMPONENTS ---

const Home = () => {
  const logs = [
    { id: 1, date: "2026.02.19", msg: "Sector Alpha synchronization stable." },
    { id: 2, date: "2026.02.18", msg: "New Trial: 'The Sailing Ship' now active." },
    { id: 3, date: "2026.02.15", msg: "Warning: Digital tide levels rising in Hub." }
  ];

  return (
    <div style={{ padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3.5rem', color: '#ffffff', letterSpacing: '4px', marginBottom: '15px' }}>
          OCEAN TIDE DROP
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#35c9ff', textTransform: 'uppercase', letterSpacing: '2px' }}>
          System Status: Online // Survivor Verified
        </p>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ color: '#ffffff', fontSize: '1.2rem', borderBottom: '1px solid #35c9ff', paddingBottom: '10px', marginBottom: '20px' }}>
          SURVIVAL LOGS
        </h2>
        {logs.map(log => (
          <div key={log.id} style={{ 
            background: 'rgba(53, 201, 255, 0.05)', 
            padding: '15px', 
            borderRadius: '4px', 
            marginBottom: '10px',
            display: 'flex',
            gap: '20px',
            borderLeft: '3px solid #35c9ff'
          }}>
            <span style={{ color: '#35c9ff', fontFamily: 'monospace', fontSize: '0.9rem' }}>[{log.date}]</span>
            <span style={{ color: '#ffffff', fontSize: '0.95rem' }}>{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Island = () => (
  <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
    <h1 style={{ color: '#35c9ff', fontSize: '2.5rem', marginBottom: '10px' }}>SURVIVOR MAP</h1>
    <p style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '30px' }}>
      Tactical overview of the Maritime Hub and surrounding digital territories.
    </p>
    <div style={{ 
      border: '2px solid rgba(53, 201, 255, 0.4)', 
      padding: '20px', 
      borderRadius: '15px', 
      background: '#0a192f'
    }}>
      <img 
        src="https://otdaisurfer.surf/AI%20Surfer%20Survivor%20Island%20Map.png" 
        alt="Island Map" 
        style={{ width: '100%', borderRadius: '10px', display: 'block' }} 
      />
    </div>
  </div>
);

const Challenges = () => {
  const startTrial = () => alert("SYSTEM ALERT: Trial 01 Initialized.");
  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <h1 style={{ color: '#ff9f40', fontSize: '2.5rem', marginBottom: '10px' }}>ACTIVE TRIALS</h1>
      <div style={{ 
        background: 'rgba(255, 159, 64, 0.05)', 
        padding: '40px', 
        borderRadius: '16px', 
        borderLeft: '8px solid #ff9f40'
      }}>
        <h3 style={{ color: '#ffffff', fontSize: '1.8rem' }}>Trial 01: The Sailing Ship</h3>
        <p style={{ color: '#d1d1d1', fontSize: '1.1rem', lineHeight: '1.7' }}>
          Navigate the wooden walkways and rope bridges.
        </p>
        <button onClick={startTrial} style={{
          marginTop: '25px', padding: '15px 35px', background: '#ff9f40', border: 'none',
          color: '#020817', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
        }}>Begin Initialization</button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="world" element={<Island />} />
          <Route path="challenges" element={<Challenges />} />
        </Route>
      </Routes>
    </Router>
  );
}
