import React from 'react';
import { useProgression } from '../hooks/ProgressionContext';
import { useSurfingEngine } from '../hooks/useSurfingEngine';

const ProgressionDashboard = () => {
  const { progression } = useProgression();
  // Low-intensity wave physics for the background dashboard
  const { y } = useSurfingEngine(0.3);

  const stats = [
    { label: 'RANK', value: progression.rank, color: 'text-neon-blue' },
    { label: 'TOTAL DISTANCE', value: `${progression.stats.totalDistance}m`, color: 'text-neon-green' },
    { label: 'MAX VELOCITY', value: `${progression.stats.maxVelocity}kn`, color: 'text-neon-pink' },
    { label: 'RECOVERIES', value: progression.stats.glitchRecoveries, color: 'text-white' }
  ];

  return (
    <div className="relative min-h-screen w-full bg-black pt-24 px-8 overflow-hidden">
      {/* Background Physics Layer */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ transform: `translateY(${y}px)` }}>
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_50px,#00eaff_51px)] opacity-10" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-5xl font-black italic text-neon-blue mb-12 drop-shadow-[0_0_15px_#00eaff]">
          PROG_LOGS_V2.0
        </h1>

        {/* Level & XP Bar - Full Animation 2 Style */}
        <div className="bg-black/60 border-2 border-neon-green p-8 rounded-lg mb-12 backdrop-blur-xl">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-neon-green font-mono text-sm tracking-widest">CURRENT LEVEL</p>
              <h2 className="text-6xl font-black text-white">{progression.level}</h2>
            </div>
            <div className="text-right">
              <p className="text-white/60 font-mono text-xs">{progression.xp} / {progression.nextLevelXP} XP</p>
            </div>
          </div>
          <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden border border-neon-green/30">
            <div 
              className="h-full bg-neon-green shadow-[0_0_20px_#39ff14] transition-all duration-1000 ease-out"
              style={{ width: `${(progression.xp / progression.nextLevelXP) * 100}%` }}
            />
          </div>
        </div>

        {/* Stats Grid - Built Out UI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 p-6 rounded-md hover:border-neon-blue transition-colors group">
              <p className="text-xs font-mono text-white/40 mb-2 group-hover:text-neon-blue">{stat.label}</p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressionDashboard;
