import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

// --- SUB-COMPONENTS (Defined here to prevent "File Not Found" Build Errors) ---

// 1. NEURAL RAIN BACKGROUND
const NeuralRain = ({ color }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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
    return () => clearInterval(interval);
  }, [color]);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-20" />;
};

// 2. LOGIN PAGE (Password: surfer1313)
const Login = () => {
  const [key, setKey] = useState('');
  const handleEntry = (e) => {
    e.preventDefault();
    if (key === 'surfer1313') {
      localStorage.setItem('isMember', 'true');
      window.location.href = '/members';
    } else { alert('ACCESS DENIED'); }
  };
  return (
    <div className="max-w-md mx-auto mt-20 p-10 bg-slate-900 border border-cyan-500/30 rounded-3xl text-center">
      <h2 className="text-2xl font-black mb-6 uppercase italic">Sector 7 Entry</h2>
      <form onSubmit={handleEntry} className="space-y-4">
        <input type="password" value={key} onChange={(e)=>setKey(e.target.value)} className="w-full bg-black border border-white/10 p-4 rounded-xl text-center text-cyan-400 font-mono" placeholder="ACCESS KEY" />
        <button className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-cyan-400 transition-all">DECRYPT</button>
      </form>
    </div>
  );
};

// 3. MEMBER LOUNGE
const MemberSection = () => {
  const [mastery, setMastery] = useState(Number(localStorage.getItem('survivorMastery')) || 0);
  const up = () => {
    const n = Math.min(mastery + 10, 100);
    setMastery(n);
    localStorage.setItem('survivorMastery', n.toString());
  };
  return (
    <div className="max-w-2xl mx-auto p-10 bg-slate-900/50 border border-white/10 rounded-3xl">
      <h2 className="text-3xl font-black mb-6 italic uppercase">Survivor Dashboard</h2>
      <div className="w-full bg-white/5 h-4 rounded-full mb-6">
        <div className="bg-cyan-500 h-full shadow-[0_0_15px_#22d3ee] transition-all" style={{width: `${mastery}%`}}></div>
      </div>
      <button onClick={up} className="w-full py-4 bg-cyan-500 text-black font-black rounded-xl">NEURAL SYNC (+10%)</button>
      {mastery >= 100 && <p className="mt-6 text-yellow-400 font-black animate-pulse text-center">GOD MODE UNLOCKED</p>}
    </div>
  );
};

// --- MAIN APPLICATION ---
export default function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isMember') === 'true');
  const [godMode, setGodMode] = useState(false);
  const mastery = Number(localStorage.getItem('survivorMastery')) || 0;

  useEffect(() => {
    const i = setInterval(() => setIsAuth(localStorage.getItem('isMember') === 'true'), 1000);
    return () => clearInterval(i);
  }, []);

  const color = godMode ? '#facc15' : '#22d3ee';

  return (
    <Router>
      <div className="min-h-screen bg-[#0a192f] text-white flex flex-col relative overflow-hidden">
        <NeuralRain color={color} />
        
        <header className="p-6 border-b border-white/5 bg-[#0a192f]/80 backdrop-blur-md z-50">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-black italic">AI SURFER <span style={{color}}>{godMode ? 'LEGEND' : 'SURVIVOR'}</span></Link>
            <nav className="flex gap-6 text-[10px] font-black uppercase tracking-widest">
              <Link to="/">Home</Link>
              {isAuth ? (
                <>
                  <Link to="/members">Lounge</Link>
                  {mastery >= 100 && <button onClick={() => setGodMode(!godMode)} className="text-yellow-400 underline">GOD MODE</button>}
                  <button onClick={() => {localStorage.clear(); window.location.href='/';}} className="text-red-500">EXIT</button>
                </>
              ) : <Link to="/login">Entry</Link>}
            </nav>
          </div>
        </header>

        <main className="flex-grow container mx-auto p-6 z-10">
          <Routes>
            <Route path="/" element={<div className="text-center mt-20"><h1 className="text-6xl font-black italic mb-4 uppercase">Sector 7</h1><p className="text-gray-400 font-mono tracking-widest">OTDAISURFER.SURF // NEURAL REALM</p></div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/members" element={isAuth ? <MemberSection /> : <Navigate to="/login" />} />
          </Routes>
        </main>

        <footer className="p-2 border-t border-white/5 bg-black text-[10px] font-mono overflow-hidden whitespace-nowrap z-50">
          <div className="animate-ticker inline-block uppercase tracking-[0.5em]" style={{color}}>
            OTDAISURFER.SURF // SYSTEM ONLINE // NO DATA LEAKS // SURVIVOR #1313 // SECTOR 7 // 
            OTDAISURFER.SURF // SYSTEM ONLINE // NO DATA LEAKS // SURVIVOR #1313 // SECTOR 7 // 
          </div>
        </footer>
      </div>
    </Router>
  );
}
