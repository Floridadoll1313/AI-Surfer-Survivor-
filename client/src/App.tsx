import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Lessons from './pages/Lessons'; 
import MemberSection from './pages/MemberSection';
import Login from './pages/Login';

function App() {
  // Use state so the UI updates immediately when logging in/out
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isMember') === 'true');

  // Sync state if localStorage changes
  useEffect(() => {
    const handleStorage = () => setIsAuth(localStorage.getItem('isMember') === 'true');
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isMember');
    setIsAuth(false);
    window.location.href = '/'; // Redirect to home
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#0a192f] text-white">
        {/* --- GLOBAL LOGO HEADER --- */}
        <header className="sticky top-0 z-50 w-full border-b border-cyan-500/20 bg-[#0a192f]/80 backdrop-blur-md">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform">
                <span className="text-2xl">🌊</span>
              </div>
              <h1 className="text-xl font-bold tracking-tighter">AI SURFER <span className="text-cyan-400">Survivor</span></h1>
            </Link>
            
            <nav className="flex gap-8 text-sm font-medium items-center">
              <Link to="/lessons" className="text-gray-400 hover:text-cyan-400 transition-colors">TRAINING</Link>
              
              {isAuth ? (
                <>
                  <Link to="/members" className="text-cyan-400 hover:text-white flex items-center gap-1">
                    <span>⭐</span> LOUNGE
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="px-3 py-1 border border-red-500/50 text-red-400 rounded hover:bg-red-500/10 transition-all text-xs uppercase"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-cyan-400 hover:text-white flex items-center gap-1">
                  <span>🔒</span> MEMBERS
                </Link>
              )}
            </nav>
          </div>
        </header>

        {/* --- PAGE CONTENT --- */}
        <main className="container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Lessons />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/login" element={<Login />} />
            <Route path="/members" element={isAuth ? <MemberSection /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
