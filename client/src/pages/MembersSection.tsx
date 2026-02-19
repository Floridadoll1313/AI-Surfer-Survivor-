import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MemberSection = () => {
  const [mastery, setMastery] = useState(Number(localStorage.getItem('survivorMastery')) || 0);
  const [showToast, setShowToast] = useState(false);

  const handleLevelUp = () => {
    if (mastery < 100) {
      const next = Math.min(mastery + 5, 100);
      setMastery(next);
      localStorage.setItem('survivorMastery', next.toString());
    }
  };

  const shareStats = () => {
    const art = `<<< AI SURFER ID >>>\nURL: otdaisurfer.surf\nMASTERY: ${mastery}%\nSTATUS: ${mastery >= 100 ? 'GOD' : 'SURVIVOR'}`;
    navigator.clipboard.writeText(art);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {showToast && <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-cyan-500 text-black px-8 py-3 rounded-full font-bold z-[100] animate-bounce">SYNCED TO CLIPBOARD</div>}
      
      <div className="bg-slate-900/50 border border-white/10 p-10 rounded-[2rem] backdrop-blur-xl">
        <h2 className="text-4xl font-black italic mb-6">SURVIVOR #1313</h2>
        <div className="w-full bg-white/5 h-6 rounded-full overflow-hidden mb-10 border border-white/10">
          <div className={`h-full transition-all duration-1000 ${mastery >= 100 ? 'bg-yellow-400 shadow-[0_0_20px_#facc15]' : 'bg-cyan-500 shadow-[0_0_20px_#22d3ee]'}`} style={{ width: `${mastery}%` }}></div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <button onClick={handleLevelUp} className="flex-1 py-5 bg-white text-black font-black rounded-2xl hover:bg-cyan-400 transition-colors uppercase tracking-widest">Training Sync</button>
          <button onClick={shareStats} className="flex-1 py-5 border border-white/20 rounded-2xl font-bold hover:bg-white/5 uppercase tracking-widest">Share Rank</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/the-vault" className={`p-8 rounded-3xl border transition-all ${mastery >= 100 ? 'border-yellow-500 bg-yellow-500/5 text-yellow-400' : 'border-white/5 bg-white/5 opacity-20 pointer-events-none'}`}>
          <h3 className="text-xl font-bold mb-2 uppercase">The Vault</h3>
          <p className="text-sm">Final decryption archive. Restricted to God Tier.</p>
        </Link>
        <Link to="/lore" className="p-8 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 text-cyan-400">
          <h3 className="text-xl font-bold mb-2 uppercase">Lore Archive</h3>
          <p className="text-sm">Founder logs and Sector 7 history.</p>
        </Link>
      </div>
    </div>
  );
};
export default MemberSection;
