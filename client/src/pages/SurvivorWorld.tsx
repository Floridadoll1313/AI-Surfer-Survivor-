import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { playSound } from '../utils/audio';
import { HINT_DATABASE } from '../data/aiHints';

const SurvivorWorld = () => {
  const THEME_COLOR = '#64ffda';
  
  // --- REALM STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 5, y: 5 });
  const [enemyPosition, setEnemyPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [tickRate, setTickRate] = useState(400); 
  const [autoPilot, setAutoPilot] = useState(false);
  
  // --- NEURAL LOGS ---
  const [logs, setLogs] = useState<string[]>([]);
  const addLog = (msg: string) => setLogs(prev => [msg, ...prev].slice(0, 5));

  // --- PERSISTENCE: Load High Score ---
  useEffect(() => {
    const savedScore = localStorage.getItem('survivor_peak_sync');
    if (savedScore) setHighScore(parseInt(savedScore));
  }, []);

  // --- ETERNAL SHARD GENERATION ---
  useEffect(() => {
    if (fragments.length < 3) {
      const newFragment = { 
        x: Math.floor(Math.random() * 10), 
        y: Math.floor(Math.random() * 10) 
      };
      setFragments(prev => [...prev, newFragment]);
    }
  }, [fragments]);

  const [aiCode, setAiCode] = useState(`// Eternal Realm Logic\nif (fragments.length > 0) {\n  const target = fragments[0];\n  log("Targeting: " + target.x + "," + target.y);\n  return { \n    dx: target.x > player.x ? 1 : target.x < player.x ? -1 : 0, \n    dy: target.y > player.y ? 1 : target.y < player.y ? -1 : 0 \n  };\n}\nreturn { dx: 0, dy: 0 };`);

  // --- AI EXECUTION LOOP ---
  const executeUserAI = useCallback(() => {
    try {
      const brain = new Function('player', 'enemy', 'fragments', 'log', aiCode);
      const move = brain(playerPosition, enemyPosition, fragments, addLog);
      
      if (move) handleMove(move.dx || 0, move.dy || 0);

      // ENEMY LOGIC: The Stalker
      setEnemyPosition(prev => ({
        x: prev.x < playerPosition.x ? prev.x + 1 : prev.x > playerPosition.x ? prev.x - 1 : prev.x,
        y: prev.y < playerPosition.y ? prev.y + 1 : prev.y > playerPosition.y ? prev.y - 1 : prev.y,
      }));
    } catch (err: any) {
      setAutoPilot(false);
      addLog(`ERR: ${err.message}`);
    }
  }, [aiCode, playerPosition, enemyPosition, fragments]);

  useEffect(() => {
    if (autoPilot) {
      const tick = setInterval(executeUserAI, tickRate);
      return () => clearInterval(tick);
    }
  }, [autoPilot, executeUserAI, tickRate]);

  const handleMove = (dx: number, dy: number) => {
    setPlayerPosition(prev => {
      const nX = Math.max(0, Math.min(9, prev.x + dx));
      const nY = Math.max(0, Math.min(9, prev.y + dy));
      
      // Collection & Scoring
      setFragments(f => f.filter(frag => {
        if (frag.x === nX && frag.y === nY) {
          setScore(s => {
            const newScore = s + 10;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem('survivor_peak_sync', newScore.toString());
            }
            if (newScore % 50 === 0) setTickRate(r => Math.max(100, r - 20));
            return newScore;
          });
          playSound('collect');
          return false;
        }
        return true;
      }));

      // Collision Logic
      if (nX === enemyPosition.x && nY === enemyPosition.y) {
        addLog("SYSTEM_RESET: Neural Collision");
        setScore(0);
        setTickRate(400);
        playSound('gameOver');
        return { x: 5, y: 5 };
      }
      return { x: nX, y: nY };
    });
  };

  const injectHint = (key: keyof typeof HINT_DATABASE) => {
    setAiCode(prev => HINT_DATABASE[key] + "\n\n" + prev);
    playSound('upgrade');
  };

  return (
    <div style={{ background: '#000', color: THEME_COLOR, padding: '20px', display: 'flex', gap: '20px', fontFamily: 'monospace', minHeight: '100vh' }}>
      
      {/* Simulation Side */}
      <div className="simulation" style={{ minWidth: '420px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 40px)', gap: '4px', border: '2px solid #222', padding: '5px', background: '#050505' }}>
          {[...Array(100)].map((_, i) => (
            <div key={i} style={{ width: '40px', height: '40px', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {playerPosition.x === (i%10) && playerPosition.y === Math.floor(i/10) && <span>❖</span>}
              {enemyPosition.x === (i%10) && enemyPosition.y === Math.floor(i/10) && <span style={{color: '#ff0055'}}>⚡</span>}
              {fragments.some(f => f.x === (i%10) && f.y === Math.floor(i/10)) && <span>✦</span>}
            </div>
          ))}
        </div>
        
        <div style={{ marginTop: '15px', borderLeft: `3px solid ${THEME_COLOR}`, paddingLeft: '10px' }}>
          <div style={{ fontSize: '1.2rem' }}>SCORE: {score}</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>PEAK_SYNC: {highScore}</div>
        </div>

        {/* 🏆 LOCAL RANKINGS PANEL */}
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #333', background: 'rgba(100, 255, 218, 0.05)', fontSize: '0.7rem' }}>
          <div style={{ color: THEME_COLOR, marginBottom: '5px', fontWeight: 'bold' }}>🏆 LOCAL_RANKINGS</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.6 }}><span>RANK_S (AI_MASTER)</span><span>500+</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: THEME_COLOR }}><span>YOU (CURRENT_PEAK)</span><span>{highScore}</span></div>
        </div>
      </div>

      {/* Control Side */}
      <div className="ide" style={{ flexGrow: 1, maxWidth: '550px' }}>
        <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
          <button className="ui-btn" onClick={() => injectHint('avoidance')}>+ AVOIDANCE</button>
          <button className="ui-btn" onClick={() => injectHint('sorting')}>+ SORTING</button>
        </div>
        
        <textarea 
          value={aiCode} 
          onChange={(e) => setAiCode(e.target.value)}
          style={{ width: '100%', height: '240px', background: '#0a0a0a', color: '#fff', border: '1px solid #333', padding: '10px', fontSize: '0.85rem' }}
        />

        <button 
          onClick={() => {
            if (!autoPilot) playSound('powerUp');
            setAutoPilot(!autoPilot);
          }}
          style={{ width: '100%', marginTop: '10px', background: autoPilot ? '#ff0055' : THEME_COLOR, border: 'none', padding: '15px', fontWeight: 'bold', cursor: 'pointer', color: '#000' }}
        >
          {autoPilot ? 'HALT_SIMULATION' : 'INITIATE_NEURAL_LINK'}
        </button>

        <div style={{ marginTop: '15px', padding: '10px', background: '#050505', border: '1px solid #222', fontSize: '0.75rem' }}>
          <div style={{ color: THEME_COLOR, borderBottom: '1px solid #222', paddingBottom: '3px', marginBottom: '5px' }}>🛰️ REALM_LOGS</div>
          {logs.map((log, i) => <div key={i} style={{ color: log.startsWith('ERR') ? '#ff0055' : '#888' }}>> {log}</div>)}
        </div>

        <div style={{ marginTop: '20px', padding: '10px', borderTop: '1px solid #222', fontSize: '0.7rem', opacity: 0.6 }}>
          <div style={{ color: THEME_COLOR, marginBottom: '5px' }}>📖 API_REF</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
            <span>• <b>player / enemy</b>: {`{x, y}`}</span>
            <span>• <b>fragments</b>: {`[{x, y}]`}</span>
            <span>• <b>log(msg)</b>: Debug to panel</span>
            <span>• <b>return</b>: {`{dx, dy}`}</span>
          </div>
        </div>
      </div>

      <style>{`.ui-btn { background: none; border: 1px solid ${THEME_COLOR}; color: ${THEME_COLOR}; cursor: pointer; font-size: 0.7rem; padding: 8px; font-family: monospace; } .ui-btn:hover { background: ${THEME_COLOR}22; }`}</style>
    </div>
  );
};

export default SurvivorWorld;
