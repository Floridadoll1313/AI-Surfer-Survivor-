import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Lessons from './pages/Lessons'; 
import MemberSection from './pages/MemberSection';
import Login from './pages/Login';
import Leaderboard from './pages/Leaderboard';
import TheVault from './pages/TheVault';

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

  return (
    <Router>
      <div className="min-h-screen bg-[#0a192f] text-white relative overflow-x-hidden">
        {godMode && <NeuralRain color={themeColor} />}

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
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-6 text-sm font-medium items-center relative z-10">
              <Link to="/leaderboard" className="text-gray-400 hover:text-white uppercase text-[10px] tracking-widest">Rankings</Link>
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

            {/* Mobile Toggle */}
            <button className="md:hidden text-cyan-400" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <div className="md:hidden bg-[#0a192f] border-b border-cyan-500/20 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
              <Link to="/leaderboard" onClick={() => setMenuOpen(false)} className="text-gray-400">Rankings</Link>
              {isAuth && (
                <>
                  <Link
