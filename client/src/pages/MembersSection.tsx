import React, { useState } from 'react';
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
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2521/2521-preview.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => console.log("Audio play blocked by browser"));
  };

  const handleLevelUp = () => {
    if (mastery < 100) {
      const newMastery = Math.min(mastery + 5, 100);
      setMastery(newMastery);
      setSurvival(prev => Math.min(prev + 2, 100));
      localStorage.setItem('survivorMastery', newMastery.toString());
      setSentryTip(tips[Math.floor(Math.random() * tips.length)]);
      if (newMastery === 100) playUnlockSound();
    }
  };

  const shareStats = () => {
    const status = mastery >= 100 ? "GOD TIER 🏆" : "ELITE TIER 🏄‍♂️";
    const asciiArt = `
<<< AI SURFER ID >>>
----------------------------
SURVIVOR: #1313
STATUS: ${status}
MASTERY: ${mastery}%
REALM: Sector 7
----------------------------
[otdaisurfer.surf]
    `;
    navigator.clipboard.writeText(asciiArt);
    alert("Stats copied to clipboard! Ready to share in the realm.");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      
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
                  <div className={`h-full transition-all duration-1000 ${mastery >= 100 ? 'bg-yellow-400' : 'bg-cyan-500'}`} style={{ width: `${mastery}%` }}></div>
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
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 border border-cyan-500/20 p-8 rounded-3xl">
            <h3 className="text-2xl font-bold text-white mb-4">Training Terminal</h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              Every sync increases your standing. Reach 100% to decrypt the Final Archive in the Vault.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleLevelUp}
                className={`flex-1 py-4 font-black rounded-xl transition-all ${mastery >= 100 ? 'bg-yellow-500 text-black' : 'bg-cyan-500 text-black hover:bg-white'}`}
              >
                {mastery >= 100 ? 'MASTERY MAXED' : 'COMPLETE DAILY TRAINING'}
              </button>
              <button 
                onClick={shareStats}
                className="flex-1 py-4 bg-transparent border border-white/20 hover:border-white text-white font-bold rounded-xl transition-all"
              >
                📊 SHARE STATS
              </button>
            </div>
          </div>

          {/* Lore Section */}
          <div className="bg-black/20 p-8 rounded-3xl border border-white/5">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Founder's Log // Entry 001</h4>
            <p className="text-sm text-gray-500 italic leading-relaxed">
              "We didn't build the Never Ending Realm to escape reality. We built it to survive the coming AI waves. 
              The surfer isn't just a metaphor—it's the only way to move through infinite data without drowning."
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-cyan-950/20 border border-cyan-400/30 p-6 rounded-3xl">
            <h4 className="font-bold text-cyan-400 text-sm uppercase mb-4 tracking-tighter">Sentry-Bot v.1</h4>
            <p className="text-sm text-cyan-100 italic">"{sentryTip}"</p>
          </div>

          <div className="bg-slate-900/50 border border-white/5 p-6 rounded-3xl">
            <h4 className="font-bold text-white mb-3 text-xs uppercase">Challenges</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2 text-gray-400"><span>✅</span> Neural Mapping</li>
              <li className={`flex gap-2 ${mastery >= 100 ? 'text-yellow-400 font-bold' : 'opacity-30'}`}>
                <span>{mastery >= 100 ? '🔓' : '🔒'}</span>
                <Link to="/the-vault" className="hover:underline">The Vault</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberSection;
