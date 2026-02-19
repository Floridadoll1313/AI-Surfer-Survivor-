import React, { useState } from 'react';

const MemberSection = () => {
  // Logic to track your Level and Progress
  const [mastery, setMastery] = useState(85);
  const [survival, setSurvival] = useState(92);

  const handleLevelUp = () => {
    if (mastery < 100) {
      setMastery(prev => Math.min(prev + 5, 100));
      setSurvival(prev => Math.min(prev + 2, 100));
      alert("LEVEL UP! Your AI Mastery has increased.");
    } else {
      alert("MAX LEVEL REACHED! You are a True Survivor.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* --- SURVIVOR PROFILE CARD --- */}
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
              <h2 className="text-3xl font-black tracking-tighter uppercase italic">Survivor #1313</h2>
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
                  <div 
                    className="bg-cyan-500 h-full transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                    style={{ width: `${mastery}%` }}
                  ></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-orange-500 uppercase">
                  <span>Survival Rate</span>
                  <span>{survival}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-orange-500 h-full transition-all duration-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                    style={{ width: `${survival}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] -z-0"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-900/50 border border-cyan-500/20 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Exclusive Member Intel</h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            Complete your daily training to increase your status. Current clearance allows viewing the 2026 AI Mastery Blueprint.
          </p>
          <button 
            onClick={handleLevelUp}
            className="px-6 py-3 bg-cyan-500 text-black font-black rounded-lg hover:bg-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            COMPLETE DAILY TRAINING (LEVEL UP)
          </button>
        </div>
        
        <div className="bg-cyan-950/20 border border-cyan-500/10 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-cyan-400 mb-2">Active Challenges</h3>
          <ul className="text-sm space-y-3 text-gray-300">
            <li className="flex gap-2"><span>✅</span> Map the Inner Reef</li>
            <li className="flex gap-2 text-cyan-400 font-bold underline"><span>⚡</span> Deploy AI Sentry</li>
            <li className="flex gap-2 text-gray-600"><span>🔒</span> Unlock the Vault</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MemberSection;
