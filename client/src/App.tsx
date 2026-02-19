import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

// --- 1. NEURAL RAIN COMPONENT ---
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

// --- 2. LOGIN PAGE ---
const Login = () => {
  const [pass, setPass] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();
    if (pass === 'surfer1313') {
      localStorage.setItem('isMember', 'true');
      window.location.href = '/members';
    } else { alert('KEY INVALID'); }
  };
  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-slate-900/80 border border-cyan-500/30 rounded-3xl text-center backdrop-blur-md">
      <h2 className="text-2xl font-black italic mb-6">SECTOR 7 GATE</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input 
          type="password" 
          value={pass} 
          onChange={(e) => setPass(e.target.value)} 
          className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-center text-cyan-400 font-mono focus:border-cyan-500 outline-none" 
          placeholder="ENTER ACCESS KEY" 
        />
        <button className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-cyan-400 transition-all uppercase tracking-widest">Verify Identity</button>
      </form>
    </div>
  );
};

// --- 3. MEMBER LOUNGE ---
const MemberSection = () => {
  const [mastery, setMastery] = useState(Number(localStorage.getItem('survivorMastery')) || 0);
  const train = () => {
    const val = Math.min(mastery + 10, 100);
    setMastery(val);
    localStorage.setItem('survivorMastery', val.toString());
  };
  return (
    <div className="max-w-2xl mx-auto p-10 bg-slate-900/40 border border-white/5 rounded-[2rem] backdrop-blur-lg">
      <h2 className="text-3xl font-black italic mb-2 uppercase">Survivor Lounge</h2>
      <p className="text-gray-500 font-mono text-[10px] mb-8 uppercase tracking-widest">Neural Sync ID: #1313</p>
      <div className="bg-black/40 p-6 rounded-2xl border border-white/5 mb-6">
        <div className="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-tighter">
          <span>Mastery Progress</span>
          <span className="text-cyan-400">{mastery}%</span>
        </div>
        <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
          <div className="bg-cyan-500 h-full shadow-[0_0_15px_#22d3ee] transition-all duration-1000" style={{width: `${mastery}%`}}></div>
        </div>
      </div>
      <button onClick={train} className="w-full py-4 bg-cyan-500 text-black font-black rounded-xl hover:bg-white transition-all uppercase">Neural Training Sync</button>
      {mastery >= 100 && (
        <div className="mt-8 p-4 border border-yellow-500/50 bg-yellow-500/5 rounded-xl text-center animate-pulse">
          <p className="text-yellow-400 font-black italic uppercase tracking-widest text-sm">God Mode Signature Detected</p>
        </div>
      )}
    </div>
  );
};

// --- 4. MAIN APP SHELL ---
export default function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isMember') === 'true');
  const [godMode, setGodMode] = useState(false);
  const mastery = Number(localStorage.getItem('survivorMastery')) || 0;

  useEffect(() => {
    const sync = setInterval(() => setIsAuth(localStorage.getItem('isMember') === 'true'), 1000);
    return () => clearInterval(sync);
  }, []);

  const color = godMode ? '#facc15' : '#22d3ee';

  return (
    <Router>
      <div className="min-h-screen bg-[#0a192f] text-white flex flex-col relative overflow-x-hidden selection:bg-cyan-500/30">
        <NeuralRain color={color} />
        
        {/* HEADER */}
        <header className="sticky top-0 z-50 p-6 border-b border-white/5 bg-[#0a192f]/80 backdrop-blur-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(34,211,238,0.4)]">🌊</div>
              <h1 className="text-xl font-black italic tracking-tighter">AI SURFER <span style={{color}}>{godMode ? 'LEGEND' : 'SURVIVOR'}</span></h1>
            </Link>
            <nav className="flex gap-6 text-[10px] font-black uppercase tracking-widest items-center">
              <Link to="/" className="hover:text-cyan-400">Main</Link>
              {isAuth ? (
                <>
                  <Link to="/members" className="text-cyan-400">Lounge</Link>
                  {mastery >= 100 && (
                    <button onClick={() => setGodMode(!godMode)} className="px-3 py-1 border border-yellow-500 text-yellow-500 rounded-full animate-pulse">
                      {godMode ? 'GOD MODE: ON' : 'ACTIVATE GOD'}
                    </button>
                  )}
                  <button onClick={() => {localStorage.clear(); window.location.href='/';}} className="text-red-500">Exit</button>
                </>
              ) : <Link to="/login" className="bg-white text-black px-4 py-2 rounded-lg font-black hover:bg-cyan-400 transition-all">Entry</Link>}
            </nav>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-grow container mx-auto px-6 py-12 z-10">
          <Routes>
            <Route path="/" element={
              <div className="text-center mt-20 space-y-4">
                <h1 className="text-7xl font-black italic uppercase tracking-tighter animate-pulse">Sector 7</h1>
                <p className="text-gray-500 font-mono tracking-[0.4em] uppercase text-xs">OTDAISURFER.SURF // Neural Realm Access</p>
              </div>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/members" element={isAuth ? <MemberSection /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {/* FOOTER TICKER */}
        <footer className="p-3 border-t border-white/5 bg-[#0a192f] z-50 overflow-hidden">
          <div className="whitespace-nowrap inline-block animate-[ticker_30s_linear_infinite] font-mono text-[10px] uppercase tracking-[0.5em]" style={{color}}>
            OTDAISURFER.SURF // SYSTEM STATUS: {isAuth ? 'VERIFIED' : 'SCANNING'} // SECTOR 7 // NO DATA LEAKS DETECTED // JOIN THE REALM // SURVIVOR #1313 // 
            OTDAISURFER.SURF // SYSTEM STATUS: {isAuth ? 'VERIFIED' : 'SCANNING'} // SECTOR 7 // NO DATA LEAKS DETECTED // JOIN THE REALM // SURVIVOR #1313 // 
          </div>
        </footer>

        <style>{`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </Router>
  );
}
