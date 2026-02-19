import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MemberSection = () => {
  const [mastery, setMastery] = useState(Number(localStorage.getItem('survivorMastery')) || 85);
  const [survival, setSurvival] = useState(92);
  const [sentryTip, setSentryTip] = useState("Scan the horizon for neural peaks.");

  const tips = [
    "Neural currents are strongest at dawn.",
    "Always encrypt your wave-data signatures.",
    "The AI Sentries are watching Sector 7.",
    "God Tier survivors never skip daily syncs.",
    "Stay hydrated. The realm is vast."
  ];

  const playUnlockSound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2521/2521-preview.mp3'); // Sci-fi chime
    audio.volume = 0.5;
    audio.play();
  };

  const handleLevelUp = () => {
    if (mastery < 100) {
      const newMastery = Math.min(mastery + 5, 100);
      setMastery(newMastery);
      setSurvival(prev => Math.min(prev + 2, 100));
      localStorage.setItem('survivorMastery', newMastery.toString());
      
      // Rotate Tip
      setSentryTip(tips[Math.floor(Math.random() * tips.length)]);

      // Check for God Tier Sound Effect
      if (newMastery === 100) {
        playUnlockSound();
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* --- SURVIVOR ID CARD --- */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-cyan-950 p-1 rounded-2xl shadow-2xl">
        <div className="bg-[#0a192f] p-8 rounded-xl flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative">
            <div className="w-24 h-24 bg-cyan-500/20 rounded-full border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <span className="text-4xl">🏄‍♂️</span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-[#0a192f] animate-pulse"></div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <h2 className="text-3xl font-black tracking-tighter uppercase italic text-white">Survivor #1313</h2>
              <span className={`px-3 py-1 border text-[10px] font-bold rounded-full w-fit mx-auto md:mx-0 ${mastery >= 100 ? 'bg-yellow-500/10 border-yellow-500 text-yellow-400' : 'bg-cyan-500/10 border-cyan-500 text-cyan-400'}`}>
                {mastery >= 100 ? 'GOD TIER UNLOCKED' : 'ELITE TIER'}
              </span>
            </div>
            <p className="text-gray-400 text-sm font-mono mb-4">Location: The Never Ending Realm // Sector 7</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-cyan-500 uppercase">
                  <span>AI Mastery</span>
                  <span>{mastery}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-1000 ${mastery >= 100 ? 'bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,1)]' : 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]'}`} style={{ width: `${mastery}%` }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-orange-500 uppercase">
                  <span>Survival Rate</span>
                  <span>{survival}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-full transition-all duration-1000" style={{ width: `${survival}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Intel Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 border border-cyan-500/20 p-8 rounded-3xl">
            <h3 className="text-2xl font-bold text-white mb-4">Exclusive Member Intel</h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              Current clearance allows full access to the AI Mastery Blueprint. Hit 100% to decrypt the final archive.
            </p>
            <button 
              onClick={handleLevelUp}
              className={`group relative px-8 py-4 font-black rounded-xl transition-all overflow-hidden ${mastery >= 100 ? 'bg-yellow-500 text-black' : 'bg-cyan-500 text-black'}`}
            >
              <span className="relative z-10 uppercase">{mastery >= 100 ? 'Mastery Maxed' : 'Complete Training'}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-cyan-950/20 border border-cyan-400/30 p-6 rounded-3xl relative">
            <h4 className="font-bold text-cyan-400 text-sm uppercase tracking-widest mb-4">Sentry-Bot v.1</h4>
            <p className="text-sm text-cyan-100 italic">"{sentryTip}"</p>
          </div>

          <div className="bg-slate-900/50 border border-white/5 p-6 rounded-3xl text-sm text-gray-400">
            <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-widest">Active Challenges</h4>
            <ul className="space-y-3">
              <li className="flex gap-2 text-gray-400"><span>✅</span> Neural Mapping</li>
              <li className="flex gap-2 text-gray-400"><span>✅</span> Deploy AI Sentry</li>
              <li className={`flex gap-2 transition-all p-2 rounded ${mastery >= 100 ? 'text-yellow-400 font-bold bg-yellow-400/10 border border-yellow-500/50' : 'opacity-30'}`}>
                <span>{mastery >= 100 ? '🔓' : '🔒'}</span>
                <Link to="/the-vault" className="hover:underline italic">The Vault Intel</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberSection;
