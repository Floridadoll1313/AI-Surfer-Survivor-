import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

// --- BACKGROUND ENGINE ---
const NeuralRain = ({ color }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const columns = Math.floor(canvas.width / 20);
    const drops = new Array(columns).fill(1);
    const draw = () => {
      ctx.fillStyle = 'rgba(10, 25, 47, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.font = '15px monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30A0 + Math.random() * 33);
        ctx.fillText(text, i * 20, drops[i] * 20);
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 33);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); };
  }, [color]);
  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0, opacity: 0.2 }} />;
};

// --- COMPONENT: LOGIN ---
const Login = () => {
  const [key, setKey] = useState('');
  const entry = (e) => {
    e.preventDefault();
    if (key === 'surfer1313') {
      localStorage.setItem('isMember', 'true');
      window.location.href = '/members';
    } else { alert('KEY REJECTED'); }
  };
  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '40px', background: '#0f172a', border: '1px solid #22d3ee44', borderRadius: '24px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
      <h2 style={{ fontStyle: 'italic', fontWeight: '900', color: '#fff', marginBottom: '30px' }}>SECTOR 7 AUTH</h2>
      <form onSubmit={entry}>
        <input type="password" value={key} onChange={e => setKey(e.target.value)} placeholder="ACCESS KEY" style={{ width: '100%', padding: '15px', background: '#000', border: '1px solid #ffffff22', borderRadius: '12px', color: '#22d3ee', textAlign: 'center', marginBottom: '20px', outline: 'none' }} />
        <button style={{ width: '100%', padding: '15px', background: '#fff', color: '#000', fontWeight: '900', borderRadius: '12px', cursor: 'pointer', border: 'none' }}>DECRYPT</button>
      </form>
    </div>
  );
};

// --- COMPONENT: LOUNGE ---
const Lounge = () => {
  const [m, setM] = useState(Number(localStorage.getItem('survivorMastery')) || 0);
  const sync = () => {
    const next = Math.min(m + 10, 100);
    setM(next);
    localStorage.setItem('survivorMastery', next.toString());
  };
  return (
    <div style={{ maxWidth: '600px', margin: '60px auto', padding: '40px', background: '#0f172a99', border: '1px solid #ffffff11', borderRadius: '32px', textAlign: 'center', position: 'relative', zIndex: 10, backdropFilter: 'blur(10px)' }}>
      <h2 style={{ fontWeight: '900', fontStyle: 'italic', color: '#fff', marginBottom: '10px' }}>SURVIVOR LOUNGE</h2>
      <p style={{ color: '#22d3ee', fontSize: '12px', letterSpacing: '2px', marginBottom: '30px' }}>NEURAL SYNC: {m}%</p>
      <div style={{ width: '100%', height: '8px', background: '#ffffff11', borderRadius: '10px', overflow: 'hidden', marginBottom: '40px' }}>
        <div style={{ width: `${m}%`, height: '100%', background: '#22d3ee', boxShadow: '0 0 15px #22d3ee', transition: 'width 1s ease' }} />
      </div>
      <button onClick={sync} style={{ width: '100%', padding: '20px', background: '#22d3ee', color: '#000', fontWeight: '900', borderRadius: '16px', border: 'none', cursor: 'pointer' }}>INITIATE TRAINING SYNC</button>
      {m >= 100 && <p style={{ marginTop: '20px', color: '#facc15', fontWeight: '900', animation: 'pulse 2s infinite' }}>GOD MODE ENABLED</p>}
    </div>
  );
};

// --- MASTER APPLICATION ---
export default function App() {
  const [auth, setAuth] = useState(localStorage.getItem('isMember') === 'true');
  const [god, setGod] = useState(false);
  const mastery = Number(localStorage.getItem('survivorMastery')) || 0;

  useEffect(() => {
    const check = setInterval(() => setAuth(localStorage.getItem('isMember') === 'true'), 1000);
    return () => clearInterval(check);
  }, []);

  const color = god ? '#facc15' : '#22d3ee';

  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#0a192f', color: '#fff', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, sans-serif', margin: 0, overflowX: 'hidden' }}>
        <NeuralRain color={color} />
        
        {/* NAV */}
        <nav style={{ padding: '20px 40px', borderBottom: '1px solid #ffffff08', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 50, background: '#0a192fcc', backdropFilter: 'blur(5px)' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#fff', fontWeight: '900', fontStyle: 'italic', fontSize: '22px', letterSpacing: '-1px' }}>AI SURFER <span style={{ color }}>{god ? 'LEGEND' : 'SURVIVOR'}</span></Link>
          <div style={{ display: 'flex', gap: '25px', fontSize: '10px', fontWeight: '900', letterSpacing: '2px', alignItems: 'center' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>HOME</Link>
            {auth ? (
              <>
                <Link to="/members" style={{ color: color, textDecoration: 'none' }}>LOUNGE</Link>
                {mastery >= 100 && <button onClick={() => setGod(!god)} style={{ background: 'none', border: `1px solid ${color}`, color: color, borderRadius: '20px', padding: '4px 12px', cursor: 'pointer', fontSize: '9px' }}>GOD MODE</button>}
                <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontWeight: '900' }}>EXIT</button>
              </>
            ) : <Link to="/login" style={{ background: '#fff', color: '#000', padding: '8px 20px', borderRadius: '8px', textDecoration: 'none' }}>ENTRY</Link>}
          </div>
        </nav>

        {/* MAIN */}
        <main style={{ flexGrow: 1, padding: '40px', position: 'relative', zIndex: 5 }}>
          <Routes>
            <Route path="/" element={<div style={{ textAlign: 'center', marginTop: '120px' }}><h1 style={{ fontSize: '80px', fontWeight: '900', fontStyle: 'italic', margin: 0, letterSpacing: '-4px' }}>SECTOR 7</h1><p style={{ letterSpacing: '8px', opacity: 0.4, fontSize: '12px', marginTop: '10px' }}>OTDAISURFER.SURF // NEURAL REALM</p></div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/members" element={auth ? <Lounge /> : <Navigate to="/login" />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer style={{ padding: '12px', borderTop: '1px solid #ffffff08', background: '#0a192f', zIndex: 50, overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <div style={{ display: 'inline-block', color: color, fontSize: '10px', fontWeight: '900', letterSpacing: '5px', animation: 'ticker 25s linear infinite' }}>
            OTDAISURFER.SURF // SYSTEM ONLINE // NO DATA LEAKS // SURVIVOR #1313 // SECTOR 7 // &nbsp;&nbsp;&nbsp;
            OTDAISURFER.SURF // SYSTEM ONLINE // NO DATA LEAKS // SURVIVOR #1313 // SECTOR 7 // &nbsp;&nbsp;&nbsp;
          </div>
        </footer>

        <style>{`
          @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
          body { margin: 0; padding: 0; }
          * { box-sizing: border-box; transition: all 0.4s ease; }
        `}</style>
      </div>
    </Router>
  );
}
