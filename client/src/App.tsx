import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// --- PAGE COMPONENTS ---

const Home = () => (
  <div style={{ textAlign: 'center', padding: '80px 20px' }}>
    <h1 style={{ fontSize: '4rem', color: '#ffffff', letterSpacing: '4px', marginBottom: '20px' }}>
      OCEAN TIDE DROP
    </h1>
    <p style={{ fontSize: '1.2rem', color: '#35c9ff', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
      SYSTEM STATUS: ONLINE. Prepare to interface with the Never Ending Realm. 
      Your survival depends on your ability to synchronize with the AI pulse.
    </p>
  </div>
);

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
      background: '#0a192f',
      boxShadow: '0 0 30px rgba(53, 201, 255, 0.1)'
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
  const startTrial = () => {
    alert("SYSTEM ALERT: Trial 01 Initialized. Synchronizing biometric data...");
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <h1 style={{ color: '#ff9f40', fontSize: '2.5rem', marginBottom: '10px' }}>ACTIVE TRIALS</h1>
      <p style={{ color: '#ffffff', marginBottom: '40px' }}>Complete objectives to increase your synchronization levels.</p>
      
      <div style={{ 
        background: 'rgba(255, 159, 64, 0.05)', 
        padding: '40px', 
        borderRadius: '16px', 
        border: '1px solid rgba(255, 159, 64, 0.3)',
        borderLeft: '8px solid #ff9f40'
      }}>
        <h3 style={{ color: '#ffffff', fontSize: '1.8rem', marginTop: '0' }}>Trial 01: The Sailing Ship</h3>
        <p style={{ color: '#d1d1d1', fontSize: '1.1rem', lineHeight: '1.7' }}>
          Navigate the wooden walkways and rope bridges. Maintain equilibrium within the digital tide. 
          Failure to balance will result in immediate session desync.
        </p>
        <button 
          onClick={startTrial}
          style={{
            marginTop: '25px',
            padding: '15px 35px',
            background: '#ff9f40',
            border: 'none',
            color: '#020817',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
          Begin Initialization
        </button>
      </div>
    </div>
  );
};

// --- ROUTING CONFIGURATION ---

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
