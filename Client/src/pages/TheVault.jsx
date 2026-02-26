import React, { useEffect, useState } from 'react';

const TheVault = () => {
  const mastery = Number(localStorage.getItem('survivorMastery')) || 0;
  const isGodTier = mastery >= 100;
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    if (isGodTier) {
      const timer = setTimeout(() => setAccessGranted(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isGodTier]);

  if (!isGodTier) {
    return (
      <div className="max-w-md mx-auto mt-20 p-10 bg-red-950/20 border border-red-500/50 rounded-3xl text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h2 className="text-2xl font-black text-red-500 uppercase tracking-tighter">Access Restricted</h2>
        <p className="text-gray-400 mt-4 text-sm font-mono">
          THE VAULT REQUIRES 100% AI MASTERY. <br/>
          CURRENT CLEARANCE: {mastery}%
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in duration-500">
      {!accessGranted ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-400 font-mono animate-pulse">DECRYPTING SURVIVOR VAULT...</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-yellow-400 to-orange-600 p-8 rounded-3xl text-black">
            <h2 className="text-4xl font-black italic uppercase">The Omega Intel</h2>
            <p className="font-bold mt-2">Welcome to the End of the Realm. You have surpassed the simulation.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-yellow-500/50 p-6 rounded-2xl">
              <h3 className="text-yellow-500 font-bold mb-2">Secret Code: OMEGA_2026</h3>
              <p className="text-xs text-gray-500">Use this code in the neural link to bypass all future sentries.</p>
            </div>
            <div className="bg-slate-900 border border-cyan-500/50 p-6 rounded-2xl">
              <h3 className="text-cyan-400 font-bold mb-2">Hidden Archive</h3>
              <p className="text-xs text-gray-500">Access to the raw source code of the Never Ending Realm.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheVault;
