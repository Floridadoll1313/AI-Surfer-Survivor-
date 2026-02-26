import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [accessKey, setAccessKey] = useState('');
  const [status, setStatus] = useState('AWAITING_INPUT'); // AWAITING_INPUT, SYNCING, DENIED
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SYNCING');

    // Simulated "Neural Handshake" delay
    setTimeout(() => {
      if (accessKey === 'surfer1313') {
        localStorage.setItem('isMember', 'true');
        // Initialize mastery if it's a new survivor
        if (!localStorage.getItem('survivorMastery')) {
          localStorage.setItem('survivorMastery', '0');
        }
        navigate('/members');
        window.location.reload(); // Refresh to update App.tsx state
      } else {
        setStatus('DENIED');
        setAccessKey('');
        setTimeout(() => setStatus('AWAITING_INPUT'), 2000);
      }
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className={`p-10 rounded-[2.5rem] border-2 transition-all duration-500 bg-slate-900/80 backdrop-blur-xl shadow-2xl ${
        status === 'DENIED' ? 'border-red-500 shadow-red-500/20 animate-shake' : 'border-cyan-500/30'
      }`}>
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
            <span className="text-3xl">🌊</span>
          </div>
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">Sector 7 Gate</h2>
          <p className="text-[10px] font-mono text-cyan-400 mt-2 tracking-[0.3em] uppercase">Identity Verification Required</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Survivor Access Key</label>
            <input
              type="password"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-center font-mono text-cyan-400 focus:outline-none focus:border-cyan-500/50 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={status === 'SYNCING'}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all ${
              status === 'SYNCING' 
              ? 'bg-gray-800 text-gray-500 cursor-wait' 
              : 'bg-white text-black hover:bg-cyan-400 active:scale-95'
            }`}
          >
            {status === 'SYNCING' ? 'Syncing...' : status === 'DENIED' ? 'Access Denied' : 'Enter Realm'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[9px] font-mono text-gray-600 uppercase leading-relaxed">
            Warning: Unauthorized access attempts are logged by the Sentry. 
            Connection: Encrypted. Status: {status}
          </p>
        </div>
      </div>
      
      {/* Hidden hint for the dev */}
      <p className="text-center text-[8px] text-white/5 mt-4 italic">Ref: #1313</p>
    </div>
  );
};

export default Login;
