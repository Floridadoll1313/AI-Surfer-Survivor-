import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { playSound } from '../utils/audio';
import { HINT_DATABASE } from '../data/aiHints';

const SurvivorWorld = () => {
  const THEME_COLOR = '#64ffda';
  const [playerPosition, setPlayerPosition] = useState({ x: 5, y: 5 });
  const [enemyPosition, setEnemyPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [tickRate, setTickRate] = useState(400); // Speed of the realm
  const [autoPilot, setAutoPilot] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs(prev => [msg, ...prev].slice(0, 5));

  // --- INFINITE SHARD GENERATOR ---
  useEffect(() => {
    if (fragments.length < 3) {
      const newFragment = { 
        x: Math.floor(Math.random() * 10), 
        y: Math.floor(Math.random() * 10) 
      };
      setFragments(prev => [...prev, newFragment]);
    }
  }, [fragments]);

  const [aiCode, setAiCode] = useState(`// Never-Ending Realm Logic\nif (fragments.length > 0) {\n  const target = fragments[0];\n  return { \n    dx: target.x > player.x ? 1 : target.x < player.x ? -1 : 0, \n    dy: target.y > player.y ? 1 : target.y < player.y ? -1 : 0 \n  };\n}\nreturn { dx: 0, dy: 0 };`);

  const executeUserAI = useCallback(() => {
    try {
      const brain = new Function('player', 'enemy', 'fragments', 'log', aiCode);
      const move = brain(playerPosition, enemyPosition, fragments, addLog);
      if (move) handleMove(move.dx || 0, move.dy || 0);
      
      // MOVE ENEMY (AI Stalker logic)
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
      
      setFragments(f => f.filter(frag => {
        if (frag.x === nX && frag.y === nY) {
          setScore(s => {
            const newScore = s + 10;
            // SCALE DIFFICULTY: Speed up every 50 points
            if (newScore % 50 === 0) setTickRate(prev => Math.max(100, prev - 20));
            return newScore;
          });
          playSound('collect');
          return false;
        }
        return true;
      }));

      if (nX === enemyPosition.x && nY === enemyPosition.y) {
        addLog("SYSTEM_RESET: Collision Detected");
        setScore(0);
        setTickRate(400);
        setPlayerPosition({ x: 5, y: 5 });
      }
      return { x: nX, y: nY };
    });
  };

  return (
    <div style={{ background: '#000', color: THEME_COLOR, padding: '20px', display: 'flex', gap: '20px', fontFamily: 'monospace', minHeight: '100vh' }}>
      <div className="simulation">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 40px)', gap: '4px', border: '1px solid #222', padding: '5px' }}>
          {[...Array(100)].map((_, i) => (
            <div key={i} style={{ width: '40px', height: '40px', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {playerPosition.x === (i%10) && playerPosition.y === Math.floor(i/10) && <span>❖</span>}
              {enemyPosition.x === (i%10) && enemyPosition.y === Math.floor(i/10) && <span style={{color: '#ff0055'}}>⚡</span>}
              {fragments.some(f => f.x === (i%10) && f.y === Math.floor(i/10)) && <span>✦</span>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: '10px' }}>
          <div>SCORE: {score}</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>REALM_SPEED: {1000 - tickRate}ms</div>
        </div>
      </div>

      <div className="ide" style={{ flexGrow: 1, maxWidth: '500px' }}>
        <textarea 
          value={aiCode} 
          onChange={(e) => setAiCode(e.target.value)}
          style={{ width: '100%', height: '250px', background: '#050505', color: '#fff', border: '1px solid #333', padding: '10px', fontSize: '0.8rem' }}
        />
        <button onClick={() => setAutoPilot(!autoPilot)} style={{ width: '100%', marginTop: '10px', background: THEME_COLOR, padding: '12px', fontWeight: 'bold', cursor: 'pointer', color: '#000', border: 'none' }}>
          {autoPilot ? 'HALT_SIMULATION' : 'INITIATE_INFINITE_LOOP'}
        </button>

        <div style={{ marginTop: '15px', padding: '10px', background: '#0a0a0a', border: '1px solid #222', fontSize: '0.75rem' }}>
          <div style={{ color: THEME_COLOR, borderBottom: '1px solid #222', marginBottom: '5px' }}>🛰️ REALM_STATUS</div>
          {logs.map((log, i) => <div key={i}>> {log}</div>)}
        </div>
      </div>
    </div>
  );
};

export default SurvivorWorld;
