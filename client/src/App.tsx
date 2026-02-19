import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Lessons from './pages/Lessons'; 
import MemberSection from './pages/MemberSection';
import Login from './pages/Login';
import Leaderboard from './pages/Leaderboard';
import TheVault from './pages/TheVault';
import LoreArchive from './pages/LoreArchive';

// --- NEURAL RAIN EFFECT ---
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

  useEffect(() => {
    const handleStorage = () => {
      setIsAuth(localStorage.getItem('isMember') === 'true');
      setMastery(Number(localStorage.getItem('survivorMastery')) || 0);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    window.location.href = '/';
  };

  const themeColor = godMode ? '#facc15' : '#22d3ee';
  const tailwindColor = godMode ? 'text-yellow-400' : 'text-cyan-400';
  const themeBg = godMode ? 'bg-yellow-500' : 'bg-cyan-500';
  const themeBorder = godMode ? 'border-yellow-500/50' : 'border-cyan-500/20';

  const tickerMessages = godMode 
    ? "SYSTEM STATUS: ASCENDED // ALL NODES SYNCHRONIZED // WELCOME HOME, LEGEND // OMEGA PROTOCOL ACTIVE // NO DATA LEAKS DETECTED..."
    : "SCANNING SECTOR 7... NEW SURVIVOR DETECTED IN INNER REEF... WARNING: NEURAL STORMS APPROACHING... UPDATE 1.3.13 LIVE... STAY SYNCHED...";

  return (
    <Router>
      <div className="min-h-screen bg-[#0a192f] text-white relative flex flex-col overflow-x-hidden">
        {godMode && <NeuralRain color={themeColor} />}

        {/* --- HEADER --- */}
        <header className={`sticky top-0 z-50 w-full border-b ${themeBorder} bg-[#0a192f]/90 backdrop-blur-md transition-all`}>
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 relative z-10">
              <div className={`w-10 h-10 ${themeBg} rounded-lg flex items-center justify-center shadow-lg`}>
                <span className="text-2xl">🌊</span>
              </div>
              <h1 className="text-xl font-bold tracking-tighter">
                AI SURFER <span className={`${tailwindColor}`}>{godMode ? 'Legend' : 'Survivor'}</span>
              </h1>
            </Link>
            
            <nav className="hidden md:flex gap-6 text-sm font-medium items-center relative z-10">
              <Link to="/leaderboard" className="text-gray-400 hover:text-white uppercase text-[10px] tracking-widest">Rankings</Link>
              <Link to="/lore" className="text-gray-400 hover:text-white uppercase text-[10px] tracking-widest">Lore</Link>
              {isAuth && (
                <>
                  <Link to="/members" className={`${tailwindColor} font-bold`}>LOUNGE</Link>
                  {mastery >= 100 && (
                    <button onClick={() => setGodMode(!godMode)} className={`px-4 py-1 border ${themeBorder} ${tailwindColor} rounded-full text-[10px] font-black animate-pulse bg-black/40`}>
                      {godMode ? 'GOD MODE: ACTIVE' : 'ACTIVATE GOD MODE'}
                    </button>
                  )}
                  <button onClick={handleLogout} className="text-red-500 text-[10px] border border-red-500/20 px-2 py-1 rounded">EXIT</button>
                </>
              )}
            </nav>

            <button className="md:hidden text-cyan-400" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </header>

        {/* --- MAIN CONTENT --- */}
        <main className="container mx-auto px-6 py-8 relative z-10 flex-grow">
          <Routes>
            <Route path="/" element={<Lessons />} />
            <Route path="/login" element={<Login />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/the-vault" element={<TheVault />} />
            <Route path="/lore" element={<LoreArchive />} />
            <Route path="/members" element={isAuth ? <MemberSection /> : <Navigate to="/login" />} />
          </Routes>
        </main>

        {/* --- NEURAL FEEDBACK TICKER --- */}
        <footer className={`w-full border-t ${themeBorder} bg-[#0a192f] py-2 overflow-hidden relative z-50`}>
          <div className="whitespace-nowrap flex">
            <div className={`inline-block animate-marquee font-mono text-[10px] uppercase tracking-[0.2em] ${tailwindColor}`}>
              {tickerMessages} &nbsp;&nbsp;&nbsp;&nbsp; {tickerMessages}
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
