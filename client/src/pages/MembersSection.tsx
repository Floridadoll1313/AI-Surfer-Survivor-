import React from 'react';

const MemberSection = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-slate-900/50 rounded-2xl border border-cyan-500/30 shadow-2xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
          <span className="text-xl">🏆</span>
        </div>
        <h2 className="text-3xl font-bold text-white">Survivor Members Lounge</h2>
      </div>
      <p className="text-cyan-100 text-lg leading-relaxed">
        Welcome to the inner circle. Here you'll find advanced AI strategies and exclusive surfer content.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="p-4 bg-cyan-950/40 rounded-xl border border-cyan-800">
          <h3 className="text-cyan-400 font-bold">Exclusive Resource 01</h3>
          <p className="text-sm text-gray-400">Advanced Prompt Engineering for Waves</p>
        </div>
      </div>
    </div>
  );
};

export default MemberSection;
