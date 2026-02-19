import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Your secret "Gatekeeper" code
    if (code === 'SURFER2026') {
      localStorage.setItem('isMember', 'true');
      navigate('/members');
    } else {
      alert('Access Denied: Incorrect Survivor Code');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl text-center">
      <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">Enter Survivor Code</h2>
      <form onSubmit={handleLogin} className="space-y-6">
        <input
          type="password"
          placeholder="ENTER CODE..."
          className="w-full p-4 bg-black/50 border border-cyan-900 rounded-lg text-cyan-400 text-center tracking-widest focus:outline-none focus:border-cyan-400"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit" className="w-full py-4 bg-cyan-500 text-black font-black rounded-lg hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          ACCESS MEMBERS LOUNGE
        </button>
      </form>
    </div>
  );
};

export default Login;
