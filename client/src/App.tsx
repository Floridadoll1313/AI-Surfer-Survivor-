import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useOutletContext } from 'react-router-dom';
import Layout from './components/Layout';

// --- HELPER COMPONENTS ---

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

// --- PAGE COMPONENTS ---

const Home = () => {
  const logs = [
    { id: 1, date: "2026.02.19", msg: "Sector Alpha synchronization stable." },
    { id: 2, date: "2026.02.18", msg: "Pulse Animation module integrated." },
    { id: 3, date: "2026.02.15", msg: "Warning: Digital tide levels rising." }
  ];

  return (
    <div style={{ padding: '40px 20px' }}>
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

const Equipment = () => {
  const { setProgress } = useOutletContext<{ setProgress:
