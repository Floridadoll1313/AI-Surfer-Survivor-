import React from 'react';

const Leaderboard = () => {
  // Mock data for top survivors
  const survivors = [
    { rank: 1, id: "SURFER_X", mastery: 100, status: "LEGEND", bio: "First to breach the Inner Reef." },
    { rank: 2, id: "NEO_WAVE", mastery: 98, status: "ELITE", bio: "Sector 7 specialized scout." },
    { rank: 3, id: "CYBER_NOMAD", mastery: 92, status: "ELITE", bio: "Data-stream specialist." },
    { rank: 4, id: "GHOST_SHELL", mastery: 85, status: "SURVIVOR", bio: "Neural sync stable." },
    { rank: 5, id: "VOID_RIDER", mastery: 77, status: "SURVIVOR", bio: "Monitoring sector currents." },
    { rank: 6, id: "SIGNAL_LOST", mastery: 72, status: "SURVIVOR", bio: "Recovered from neural storm." },
  ];

  const userMastery = Number(localStorage.getItem('survivorMastery')) || 0;

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 animate-in fade-in duration-1000">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h2 className="text-6xl font-black italic tracking-tighter uppercase text-white">
          Rankings
        </h2>
        <div className="flex justify-center items-center gap-4">
          <div className="h-[1px] w-12 bg-cyan-500/30"></div>
          <p className="font-mono text-[10px] text-cyan-400 tracking-[0.5em] uppercase">
            Global Neural Standings
          </p>
          <div className="h-[1px] w-12 bg-cyan-500/30"></div>
        </div>
      </div>

      {/* Podium Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-10">
        {/* Rank 2 */}
        <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl text-center order-2 md:order-1 h-64 flex flex-col justify-center">
          <span className="text-4xl mb-2">🥈</span>
          <h3 className="text-xl font-bold text-white">{survivors[1].id}</h3>
          <p className="text-cyan-500 font-mono text-xs">{survivors[1].mastery}%</p>
        </div>

        {/* Rank 1 - The Legend */}
        <div className="bg-slate-900/60 border-2 border-yellow-500/50 p-10 rounded-[3rem] text-center order-1 md:order-2 h-80 flex flex-col justify-center relative shadow-[0_0_50px_rgba(250,204,21,0.1)]">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-6 py-1 rounded-full font-black text-xs tracking-widest uppercase">
            Legend
          </div>
          <span className="text-6xl mb-4">👑</span>
          <h3 className="text-3xl font-black italic text-white uppercase">{survivors[0].id}</h3>
          <p className="text-yellow-400 font-mono text-sm tracking-widest mt-2">{survivors[0].mastery}% MASTERY</p>
        </div>

        {/* Rank 3 */}
        <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl text-center order-3 md:order-3 h-56 flex flex-col justify-center">
          <span className="text-4xl mb-2">🥉</span>
          <h3 className="text-xl font-bold text-white">{survivors[2].id}</h3>
          <p className="text-cyan-500 font-mono text-xs">{survivors[2].mastery}%</p>
        </div>
      </div>

      {/* List Section */}
      <div className="bg-slate-900/20 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
              <th className="px-8 py-6">Rank</th>
              <th className="px-8 py-6">Survivor ID</th>
              <th className="px-8 py-6">Neural Status</th>
              <th className="px-8 py-6 text-right">Sync Mastery</th>
            </tr>
          </thead>
          <tbody className="font-mono text-sm">
            {survivors.map((s) => (
              <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="px-8 py-6 text-gray-500">#{s.rank.toString().padStart(2, '0')}</td>
                <td className="px-8 py-6">
                  <span className="text-white font-bold group-hover:text-cyan-400 transition-colors">
                    {s.id}
                  </span>
                  <span className="block text-[10px] text-gray-600 italic mt-1">{s.bio}</span>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${
                    s.status === 'LEGEND' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  }`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <div className="w-24 bg-white/5 h-1.5 rounded-full overflow-hidden hidden sm:block">
                      <div className="bg-cyan-500 h-full" style={{ width: `${s.mastery}%` }}></div>
                    </div>
                    <span className="text-white">{s.mastery}%</span>
                  </div>
                </td>
              </tr>
            ))}
            
            {/* User Personal Entry */}
            <tr className="bg-cyan-500/5 border-t-2 border-cyan-500/30">
              <td className="px-8 py-8 text-cyan-400 font-black">??</td>
              <td className="px-8 py-8">
                <span className="text-cyan-400 font-black italic uppercase">YOU (Survivor #1313)</span>
                <span className="block text-[10px] text-cyan-400/60 italic mt-1 uppercase">Accessing via otdaisurfer.surf</span>
              </td>
              <td className="px-8 py-8">
                <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest bg-cyan-500 text-black">
                  ACTIVE_USER
                </span>
              </td>
              <td className="px-8 py-8 text-right font-black text-cyan-400 text-lg">
                {userMastery}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
