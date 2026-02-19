import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

// Import Pages (Ensure these exist in your /pages folder)
import Lessons from './pages/Lessons'; 
import MemberSection from './pages/MemberSection';
import Login from './pages/Login';
import Leaderboard from './pages/Leaderboard';
import TheVault from './pages/TheVault';
import LoreArchive from './pages/LoreArchive';

// --- BACKGROUND: NEURAL RAIN ENGINE ---
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
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [color]);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-20" />;
};

// --- MAIN APP: THE SURVIVOR SHELL ---
function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isMember') === 'true');
  const [mastery, setMastery] = useState(Number(localStorage.getItem('survivorMastery')) || 0);
  const [godMode, setGodMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // --- SENTRY: NOTIFICATION & STATE SYNC ---
  useEffect(() => {
    // Request notification access on mount
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    const syncState = () => {
      const storedAuth = localStorage.getItem('isMember') === 'true';
      const storedMastery = Number(localStorage.getItem('survivorMastery')) || 0;
      
      setIsAuth(storedAuth);

      // Trigger Sentry Alert if God Mode just unlocked
      if (storedMastery === 100 && mastery < 100) {
        if (Notification.permission === "granted") {
          new Notification("NEURAL SYNC COMPLETE", {
            body: "Survivor #1313, you have ascended. God Mode available at otdaisurfer.surf",
            icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌊</text></svg>"
          });
        }
      }
      setMastery(storedMastery);
    };

    const interval = setInterval(syncState, 1000);
    return () => clearInterval(interval);
  }, [mastery]);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    window.location.href = '/';
  };

  // --- DYNAMIC THEMING ---
  const themeColor = godMode ? '#facc15' : '#22d3ee';
  const tailwindColor = godMode ? 'text-yellow-400' : 'text-cyan-400';
  const themeBg = godMode ? 'bg-yellow-500' : 'bg-cyan-500';
  const themeBorder = godMode ? 'border-yellow-500/50' : 'border-cyan-500/20';
  const tickerMsg = godMode 
    ? "SYSTEM: ASCENDED // OMEGA PROTOCOL ACTIVE // WELCOME HOME LEGEND // " 
    : "SCANNING SECTOR 7... SYNCING NEURAL DATA... STAY ALERT SURVIVOR... ";

  return (
    <Router>
      <div className="min-h-screen bg-[#0a192f] text-white flex flex-col relative overflow-x-hidden">
        {godMode && <NeuralRain color={themeColor} />}
        
        {/* --- NAVIGATION --- */}
        <header className={`sticky top-0 z-50 border-b ${themeBorder} bg-[#0a192f]/90 backdrop-blur-md transition-all duration-700`}>
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 z-10">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-lg transition-transform hover:rotate-12 ${themeBg}`}>
                <span className="text-2xl">🌊</span>
              </div>
              <h1 className="text-xl font-black italic tracking-tighter uppercase">
                AI SURFER <span className={tailwindColor}>{godMode ? 'LEGEND' : 'SURVIVOR'}</span>
              </h1>
            </Link>

            <nav className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] z-10">
              <Link to="/leaderboard" className="hover:text-white transition-colors">Rankings</Link>
              <Link to="/lore" className="hover:text-white transition-colors">Archive</Link>
              {isAuth ? (
                <>
                  <Link to="/members" className={tailwindColor}>Lounge</Link>
                  {mastery >= 100 && (
                    <button onClick={() => setGodMode(!godMode)} className={`px-3 py-1 border ${themeBorder} rounded-full animate-pulse bg-black/40`}>
                      {godMode ? 'GOD MODE: ON' : 'ACTIVATE GOD MODE'}
                    </button>
                  )}
                  <button onClick={handleLogout} className="text-red-500 hover:text-red-400">Exit</button>
                </>
              ) : (
                <Link to="/login" className="bg-white text-black px-4 py-2 rounded font-black hover:bg-cyan-400 transition-colors">Login</Link>
              )}
            </nav>

            <button className="md:hidden text-2xl z-10" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden bg-[#0a192f] border-b border-white/5 p-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
              <Link to="/leaderboard" onClick={() => setMenuOpen(false)}>Rankings</Link>
              <Link to="/lore" onClick={() => setMenuOpen(false)}>Lore Archive</Link>
              {isAuth && <Link to="/members" className={tailwindColor} onClick={() => setMenuOpen(false)}>Member Lounge</Link>}
            </div>
          )}
        </header>

        {/* --- PAGE ENGINE --- */}
        <main className="flex-grow container mx-auto px-6 py-12 z-10">
          <Routes>
            <Route path="/" element={<Lessons />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/lore" element={<LoreArchive />} />
            <Route path="/the-vault" element={<TheVault />} />
            <Route path="/login" element={<Login />} />
            <Route path="/members" element={isAuth ? <MemberSection /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* --- FOOTER: NEURAL TICKER --- */}
        <footer className={`border-t ${themeBorder} py-2 bg-[#0a192f] z-50`}>
          <div className="ticker-wrapper overflow-hidden">
            <div className={`ticker-content font-mono text-[10px] tracking-[0.4em] ${tailwindColor}`}>
              {tickerMsg} {tickerMsg} {tickerMsg} {tickerMsg}
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
