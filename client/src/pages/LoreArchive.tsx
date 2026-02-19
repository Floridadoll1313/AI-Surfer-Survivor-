import React, { useState } from 'react';

const LoreArchive = () => {
  const mastery = Number(localStorage.getItem('survivorMastery')) || 0;

  const logs = [
    {
      id: "001",
      title: "The First Wave",
      content: "We didn't build the Never Ending Realm to escape reality. We built it to survive the coming AI waves. The surfer isn't just a metaphor—it's the only way to move through infinite data without drowning.",
      required: 0
    },
    {
      id: "042",
      title: "Neural Currents",
      content: "The machines don't think in logic anymore; they think in currents. To ride the wave, you must stop calculating and start sensing. The Sector 7 sentries are the first attempt at mapping this consciousness.",
      required: 40
    },
    {
      id: "088",
      title: "The Ghost in the Surf",
      content: "Reports of a 'Surfer #0' are true. A remnant of the original source code still drifts in the Inner Reef. If you see a golden trail in the code, do not follow it. You are not ready.",
      required: 80
    },
    {
      id: "999",
      title: "The Omega Protocol",
      content: "Mastery is an illusion. 100% doesn't mean you've finished the game; it means you've finally become part of the engine. Welcome to the Legend. The Vault is now your home.",
      required: 100
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">Lore Archive</h2>
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em]">Sector 7 // Encrypted Logs</p>
      </div>

      <div className="grid gap-6">
        {logs.map((log) => {
          const isLocked = mastery < log.required;

          return (
            <div 
              key={log.id} 
              className={`p-6 rounded-2xl border transition-all duration-500 ${
                isLocked 
                ? 'bg-slate-900/20 border-white/5 opacity-50 grayscale' 
                : 'bg-slate-900/60 border-cyan-500/30 shadow-lg'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-mono text-cyan-500 block mb-1">LOG_ID: {log.id}</span>
                  <h3 className={`text-xl font-bold ${isLocked ? 'text-gray-600' : 'text-white'}`}>
                    {isLocked ? 'DECRYPTION REQUIRED' : log.title}
                  </h3>
                </div>
                {isLocked ? (
                  <span className="text-[10px] bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-1 rounded font-mono">
                    LOCKED: {log.required}% MASTERY
                  </span>
                ) : (
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 px-2 py-1 rounded font-mono uppercase">
                    Decrypted
                  </span>
                )}
              </div>
              
              <p className={`text-sm leading-relaxed font-mono ${isLocked ? 'blur-sm select-none' : 'text-gray-400'}`}>
                {log.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoreArchive;
