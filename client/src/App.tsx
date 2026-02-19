import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Lessons from './pages/Lessons'; 
import MemberSection from './pages/MemberSection';
import Login from './pages/Login';
import Leaderboard from './pages/Leaderboard';
import TheVault from './pages/TheVault';
import LoreArchive from './pages/LoreArchive';

// --- NEURAL RAIN BACKGROUND EFFECT ---
const NeuralRain = ({ color }: { color: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
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

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isMember') === 'true');
  const [mastery, setMastery] = useState(Number(localStorage.getItem('survivorMastery')) || 0);
  const [godMode, setGodMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Sync state with LocalStorage across tabs/pages
  useEffect(() => {
    const syncData = () => {
      setIsAuth(localStorage.getItem('isMember') === 'true');
      setMastery(Number(localStorage.getItem('survivorMastery')) || 0);
    };
    window.addEventListener('storage', syncData);
    const interval = setInterval(syncData, 1000); // Polling for fast updates
    return () => {
      window.removeEventListener('storage', syncData);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    window.location.href = '/';
  };

  // Theme Logic
  const themeColor = godMode ? '#facc15' : '#22d3ee';
  const tailwindColor = godMode ? 'text-yellow-400' : 'text-cyan-400';
  const themeBg = godMode ? 'bg-yellow-500' : 'bg-cyan-500';
  const themeBorder = godMode ? 'border-yellow-500/50' : 'border-cyan-500/20';

  const tickerMsg = godMode 
    ? "SYSTEM: ASCENDED // PROTOCOL: OMEGA // STATUS: GOD MODE ACTIVE // NO LIMITS DETECTED // WELCOME LEGEND #1313..."
    : "SCANNING SECTOR 7... NEURAL STORM INCOMING... SYNC YOUR DATA... SURVIVOR #1313 DETECTED... ACCESSING LOUNGE...";

  return (
    <Router>
      <div className="min-h-screen bg-[#0a192f] text-white relative flex flex-col overflow-x-hidden font-sans">
        {godMode && <NeuralRain color={themeColor} />}

        {/* --- GLOBAL HEADER --- */}
        <header className={`sticky top-0 z-50 w-full border-b ${themeBorder} bg-[#0a192f]/90 backdrop-blur-md transition-all`}>
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 relative z-10" onClick={() => setMenuOpen(false)}>
              <div className={`w-10 h-10 ${themeBg} rounded-lg flex items-center justify-center shadow-lg transition-transform hover:rotate-12`}>
                <span className="text-2xl">🌊</span>
              </div>
              <h1 className="text-xl font-black tracking-tighter italic">
                AI SURFER <span className={tailwindColor}>{godMode ? 'LEGEND' : 'SURVIVOR'}</span>
              </h1>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest items-center relative z-10">
              <Link to="/leaderboard" className="hover:text-white transition-colors">Rankings</Link>
              <Link to="/lore" className="hover:text-white transition-colors">Archive</Link>
              {isAuth ? (
                <>
                  <Link to="/members" className={`${tailwindColor} border-b border-transparent hover:border-current`}>Lounge</Link>
                  {mastery >= 100 && (
                    <button 
                      onClick={() => setGodMode(!godMode)} 
                      className={`px-4 py-1.5 border ${themeBorder} ${tailwindColor} rounded-full animate-pulse bg-black/40 hover:bg-black/60 transition-all`}
                    >
                      {godMode ? 'GOD MODE: ON' : 'ACTIVATE GOD MODE'}
                    </button>
                  )}
                  <button onClick={handleLogout} className="text-red-500 hover:bg-red-500/10 px-2 py-1 rounded transition-all">Exit</button>
                </>
              ) : (
                <Link to="/login" className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-black">Join Realm</Link>
              )}
            </nav>

            {/* Mobile Button */}
            <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {menuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-[#0a192f] border-b border-cyan-500/20 p-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300 z-50">
              <Link to="/leaderboard" onClick={() => setMenuOpen(false)} className="text-lg font-bold">Rankings</Link>
              <Link to="/lore" onClick={() => setMenuOpen(false)} className="text-lg font-bold">Lore Archive</Link>
              {isAuth && (
                <>
                  <Link to="/members" onClick={() => setMenuOpen(false)} className={`${tailwindColor} text-lg font-bold`}>Member Lounge</Link>
                  {mastery >= 100 && (
                    <button onClick={() => {setGodMode(!godMode); setMenuOpen(false);}} className={`py-4 border ${themeBorder} ${tailwindColor} rounded-xl font-black bg-black/40`}>
                      {godMode ? 'DEACTIVATE GOD MODE' : 'ACTIVATE GOD MODE'}
                    </button>
                  )}
                  <button onClick={handleLogout} className="text-red-500 text-left font-bold pt-4 border-t border-white/5">Exit Simulation</button>
                </>
              )}
            </div>
          )}
        </header>

        {/* --- DYNAMIC PAGE CONTENT --- */}
        <main className="container mx-auto px-6 py-12 relative z-10 flex-grow">
          <Routes>
            <Route path="/" element={<Lessons />} />
            <Route path="/login" element={<Login />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/the-vault" element={<TheVault />} />
            <Route path="/lore" element={<LoreArchive />} />
            <Route path="/members" element={isAuth ? <MemberSection /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* --- NEURAL FEEDBACK FOOTER --- */}
        <footer className={`w-full border-t ${themeBorder} bg-[#0a192f]/95 py-3 overflow-hidden relative z-50`}>
          <div className="ticker-wrapper flex">
            <div className={`ticker-content font-mono text-[10px] uppercase tracking-[0.4em] ${tailwindColor}`}>
              {tickerMsg} &nbsp;&nbsp; {tickerMsg} &nbsp;&nbsp; {tickerMsg} &nbsp;&nbsp; {tickerMsg}
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
