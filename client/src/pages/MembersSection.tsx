import React, { useState, useEffect } from 'react';

const MemberSection = () => {
  // Pull progress from storage or defaults
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

  const handleLevelUp = () => {
    if (mastery < 100) {
      const newMastery = Math.min(mastery + 5, 100);
      setMastery(newMastery);
      setSurvival(prev => Math.min(prev + 2, 100));
      localStorage.setItem('survivorMastery', newMastery.toString());
      
      // Rotate Sentry Tip
      setSentryTip(tips[Math.floor(Math.random() * tips.length)]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      
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
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 text-[10px] font-bold rounded-full w-fit mx-auto md:mx-0">
                {mastery >= 100 ? 'GOD TIER' : 'ELITE TIER'}
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
                  <div className="bg-cyan-500 h-full transition-all duration-1000" style={{ width: `${mastery}%` }}></div>
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
              Complete your daily training to increase your global rank. Current clearance allows full access to the AI Mastery Blueprint.
            </p>
            <button 
              onClick={handleLevelUp}
              className="group relative px-8 py-4 bg-cyan-500 text-black font-black rounded-xl hover:bg-white transition-all overflow-hidden"
            >
              <span className="relative z-10">COMPLETE DAILY TRAINING</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            </button>
          </div>
        </div>

        {/* --- AI SENTRY SIDEBAR --- */}
        <div className="space-y-6">
          <div className="bg-cyan-950/20 border border-cyan-400/30 p-6 rounded-3xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center animate-spin-slow">
                <span className="text-xs">🤖</span>
              </div>
              <h4 className="font-bold text-cyan-400 text-sm uppercase tracking-widest">Sentry-Bot v.1</h4>
            </div>
            <p className="text-sm text-cyan-100 italic">"{sentryTip}"</p>
            <div className="mt-4 pt-4 border-t border-cyan-500/10 text-[10px] text-gray-500 font-mono">
              STATUS: SCANNING...
            </div>
          </div>

          <div className="bg-slate-900/50 border border-white/5 p-6 rounded-3xl text-sm text-gray-400">
            <h4 className="font-bold text-white mb-3">Active Challenges</h4>
            <ul className="space-y-3">
              <li className="flex gap-2"><span>✅</span> Neural Mapping</li>
              <li className="flex gap-2 text-cyan-400"><span>⚡</span> Deploy AI Sentry</li>
              <li className="flex gap-2 opacity-30"><span>🔒</span> Unlock The Vault</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberSection;
