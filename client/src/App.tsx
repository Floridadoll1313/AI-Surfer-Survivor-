import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Lessons from './pages/Lessons'; 
import MemberSection from './pages/MemberSection';
import Login from './pages/Login';
import Leaderboard from './pages/Leaderboard';
import TheVault from './pages/TheVault';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isMember') === 'true');
  const [mastery, setMastery] = useState(Number(localStorage.getItem('survivorMastery')) || 0);
  const [godMode, setGodMode] = useState(false);

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

  // Define dynamic colors based on God Mode
  const themeColor = godMode ? 'text-yellow-400' : 'text-cyan-400';
  const themeBg = godMode ? 'bg-yellow-500' : 'bg-cyan-500';
  const themeBorder = godMode ? 'border-yellow-500/50' : 'border-cyan-500/20';
  const themeGlow = godMode ? 'shadow-[0_0_20px_rgba(250,204,21,0.5)]' : 'shadow-[0_0_15px_rgba(6,182,212,0.5)]';

  return (
    <Router>
      <div className={`min-h-screen bg-[#0a192f] text-white transition-colors duration-1000`}>
        {/* --- GLOBAL HEADER --- */}
        <header className={`sticky top-0 z-50 w-full border-b ${themeBorder} bg-[#0a192f]/80 backdrop-blur-md transition-all`}>
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className={`w-10 h-10 ${themeBg} rounded-lg flex items-center justify-center ${themeGlow} transition-all`}>
                <span className="text-2xl">🌊</span>
              </div>
              <h1 className="text-xl font-bold tracking-tighter">
                AI SURFER <span className={`${themeColor} uppercase`}>{godMode ? 'Legend' : 'Survivor'}</span>
              </h1>
            </Link>
            
            <nav className="flex gap-6 text-sm font-medium items-center">
              <Link to="/leaderboard" className="text-gray-400 hover:text-white uppercase tracking-widest text-[10px]">Rankings</Link>
              
              {isAuth && (
                <>
                  <Link to="/members" className={`${themeColor} font-bold`}>LOUNGE</Link>
                  {mastery >= 100 && (
                    <button 
                      onClick={() => setGodMode(!godMode)}
                      className={`px-3 py-1 border ${themeBorder} ${themeColor} rounded-full text-[10px] font-black animate-pulse`}
                    >
                      {godMode ? 'GOD MODE: ON' : 'ACTIVATE GOD MODE'}
                    </button>
                  )}
                  <button onClick={handleLogout} className="text-red-500 text-[10px] border border-red-500/20 px-2 py-1 rounded">EXIT</button>
                </>
              )}
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Lessons />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/login" element={<Login />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/the-vault" element={<TheVault />} />
            <Route path="/members" element={isAuth ? <MemberSection /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
