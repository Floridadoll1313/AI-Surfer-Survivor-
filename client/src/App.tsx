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
