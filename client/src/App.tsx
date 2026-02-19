import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

// Import All Components
import Lessons from './pages/Lessons'; 
import MemberSection from './pages/MemberSection';
import Login from './pages/Login';
import Leaderboard from './pages/Leaderboard';
import TheVault from './pages/TheVault';
import LoreArchive from './pages/LoreArchive';

// --- BACKGROUND: NEURAL RAIN ---
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
  // Direct Check for Production Stability
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isMember') === 'true');
  const [mastery, setMastery] = useState(Number(localStorage.getItem('survivorMastery')) || 0);
  const [godMode, setGodMode] = useState(false);

  useEffect(() => {
    const sync = () => {
      setIsAuth(localStorage.getItem('isMember') === 'true');
      setMastery(Number(localStorage.getItem('survivorMastery')) || 0);
    };
    const interval = setInterval(sync, 1000); // Constant sync for Render
    return () => clearInterval(interval);
  }, []);

  const themeColor = godMode ? '#facc15' : '#22d3ee';
  const tailwindColor = godMode ? 'text-yellow-400' : 'text-cyan-400';
  const themeBorder = godMode ? 'border-yellow-500/50' : 'border-cyan-500/20';

  return (
    <Router>
      <div className="min-h-screen bg-[#0a192f] text-white flex flex-col relative overflow-x-hidden">
        {godMode && <NeuralRain color={themeColor} />}
        
        {/* --- HEADER --- */}
        <header className={`sticky top-0 z-50 border-b ${themeBorder} bg-[#0a192f]/90 backdrop-blur-md`}>
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 z-10">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${godMode ? 'bg-yellow-500 shadow-[0_0_15px_#facc15]' : 'bg-cyan-500 shadow-[0_0_15px_#22d3ee]'}`}>🌊</div>
              <h1 className="text-xl font-black italic">AI SURFER <span className={tailwindColor}>{godMode ? 'LEGEND' : 'SURVIVOR'}</span></h1>
            </Link>
            <nav className="hidden md:flex gap-6 text-[10px] font-black uppercase tracking-widest z-10">
              <Link to="/leaderboard" className="hover:text-white transition-colors">Rankings</Link>
              <Link to="/lore" className="hover:text-white transition-colors">Lore</Link>
              {isAuth && (
                <>
                  <Link to="/members" className={tailwindColor}>Lounge</Link>
                  {mastery >= 100 && (
                    <button onClick={() => setGodMode(!godMode)} className="animate-pulse px-2 border border-current rounded-full">
                      {godMode ? 'GOD MODE: ON' : 'ACTIVATE GOD'}
                    </button>
                  )}
                  <button onClick={() => {localStorage.clear(); window.location.href='/';}} className="text-red-500">EXIT</button>
                </>
              )}
              {!isAuth && <Link to="/login" className="bg-white text-black px-3 py-1 rounded font-bold">LOGIN</Link>}
            </nav>
          </div>
        </header>

        {/* --- PAGE ENGINE --- */}
        <main className="flex-grow container mx-auto px-6 py-12 z-10">
          <Routes>
            <Route path="/" element={<Lessons />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/lore" element={<LoreArchive />} />
            <Route path="/the-vault" element={<TheVault />} />
            <Route path="/login" element={<Login />} />
            
            {/* PROTECTED ROUTE: Direct Storage Check */}
            <Route 
              path="/members" 
              element={
                localStorage.getItem('isMember') === 'true' 
                ? <MemberSection /> 
                : <Navigate to="/login" replace />
              } 
            />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* --- FOOTER TICKER --- */}
        <footer className={`border-t ${themeBorder} py-2 bg-[#0a192f] z-50`}>
          <div className="ticker-wrapper overflow-hidden">
            <div className={`ticker-content font-mono text-[10px] tracking-[0.4em] ${tailwindColor}`}>
              SYSTEM STATUS: {isAuth ? 'VERIFIED' : 'SCANNING'} // SECTOR 7 // OTDAISURFER.SURF // NO DATA LEAKS DETECTED // 
              SYSTEM STATUS: {isAuth ? 'VERIFIED' : 'SCANNING'} // SECTOR 7 // OTDAISURFER.SURF // NO DATA LEAKS DETECTED // 
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
