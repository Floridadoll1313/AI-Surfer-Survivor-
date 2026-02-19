import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useOutletContext } from 'react-router-dom';
import Layout from './components/Layout';

// --- PAGE COMPONENTS ---

/**
 * Home Component: Founder's Pass & Survival Logs
 */
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
      <h1 style={{ textAlign: 'center', fontSize: '3.5rem', color: '#ffffff', textShadow: '0 0 20px #35c9ff' }}>OCEAN TIDE DROP</h1>
      <div style={{ maxWidth: '700px', margin: '40px auto' }}>
        <h2 style={{ color: '#ffffff', borderBottom: '1px solid #35c9ff', paddingBottom: '10px' }}>SURVIVAL LOGS</h2>
        {logs.map(log => (
          <div key={log.id} style={{ background: 'rgba(53, 201, 255, 0.05)', padding: '15px', marginBottom: '10px', borderLeft: '3px solid #35c9ff', color: '#ffffff' }}>
            <span style={{ color: '#35c9ff', fontWeight: 'bold' }}>[{log.date}]</span> {log.msg}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Equipment Component: Item collection with LocalStorage persistence
 */
const Equipment = () => {
  const { setProgress } = useOutletContext<{ setProgress: React.Dispatch<React.SetStateAction<number>> }>();
  const items = [
    { id: 'bio
