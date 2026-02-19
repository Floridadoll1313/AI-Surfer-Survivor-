import React from 'react';

const Leaderboard = () => {
  const survivors = [
    { rank: 1, name: "Survivor #1313", score: 9800, tier: "GOD" },
    { rank: 2, name: "WaveRunner_AI", score: 8500, tier: "ELITE" },
    { rank: 3, name: "Neon_Surfer", score: 7200, tier: "ELITE" },
    { rank: 4, name: "Void_Walker", score: 6100, tier: "SURVIVOR" },
    { rank: 5, name: "DeepBlue_Zero", score: 4500, tier: "SURVIVOR" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase">Global Standings</h2>
        <p className="text-cyan-400 font-mono text-sm mt-2">SECTOR 7 // REAL-TIME RANKINGS</p>
      </div>

      <div className="bg-slate-900/80 border border-cyan-500/20 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-cyan-500/10 bg-cyan-950/20">
              <th className="p-6 text-cyan-500 font-bold uppercase text-xs">Rank</th>
              <th className="p-6 text-cyan-500 font-bold uppercase text-xs">Survivor Name</th>
              <th className="p-6 text-cyan-500 font-bold uppercase text-xs text-right">Mastery Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-500/5">
            {survivors.map((s) => (
              <tr key={s.rank} className={`hover:bg-cyan-500/5 transition-colors ${s.rank === 1 ? 'bg-cyan-500/10' : ''}`}>
                <td className="p-6 font-black text-2xl italic text-gray-500 italic">
                  {s.rank === 1 ? <span className="text-yellow-400">#1</span> : `#${s.rank}`}
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold">{s.name}</span>
                    <span className="text-[10px] px-2 py-0.5 border border-cyan-500/30 text-cyan-400 rounded-full">{s.tier}</span>
                  </div>
                </td>
                <td className="p-6 text-right font-mono text-cyan-400 font-bold">{s.score.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
