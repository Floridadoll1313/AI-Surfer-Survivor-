import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { playSound } from '../utils/audio';
import { HINT_DATABASE } from '../data/aiHints';

const SurvivorWorld = () => {
  const THEME_COLOR = '#64ffda';
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [autoPilot, setAutoPilot] = useState(false);
  const [aiCode, setAiCode] = useState(`// Use log("message") to debug!\nlog("System Initialized");\nif (fragments.length > 0) {\n  const target = fragments[0];\n  return { \n    dx: target.x > player.x ? 1 : target.x < player.x ? -1 : 0, \n    dy: target.y > player.y ? 1 : target.y < player.y ? -1 : 0 \n  };\n}\nreturn { dx: 0, dy: 0 };`);
  
  // --- NEW: LOGGING STATE ---
  const [logs, setLogs] = useState<string[]>([]);
  const addLog = (msg: string) => setLogs(prev => [msg, ...prev].slice(0, 5));

  const injectHint = (hintKey: keyof typeof HINT_DATABASE) => {
    setAiCode(prev => HINT_DATABASE[hintKey] + "\n\n" + prev);
  };

  const executeUserAI = useCallback(() => {
    try {
      // Pass 'log' as a function into the student's sandbox
      const brain = new Function('player', 'enemy', 'fragments', 'log', aiCode);
      const move = brain(playerPosition, enemyPosition, fragments, addLog);
      if (move) handleMove(move.dx || 0, move.dy || 0);
    } catch (err: any) {
      setAutoPilot(false);
      addLog(`ERR: ${err.message}`);
    }
  }, [aiCode, playerPosition, enemyPosition, fragments]);

  useEffect(() => {
    if (autoPilot && !isGameOver) {
      const tick = setInterval(executeUserAI, 400);
      return () => clearInterval(tick);
    }
  }, [autoPilot, isGameOver, executeUserAI]);

  const handleMove = (dx: number, dy: number) => {
    setPlayerPosition(prev => {
      const nX = Math.max(0, Math.min(9, prev.x + dx));
      const nY = Math.max(0, Math.min(9, prev.y + dy));
      setFragments(f => f.filter(frag => frag.x !== nX || frag.y !== nY));
      if (nX === enemyPosition.x && nY === enemyPosition.y) setIsGameOver(true);
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
      </div>

      <div className="ide" style={{ flexGrow: 1 }}>
        <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
          <button className="ui-btn" onClick={() => injectHint('avoidance')}>+ HINT: AVOIDANCE</button>
          <button className="ui-btn" onClick={() => injectHint('sorting')}>+ HINT: SORTING</button>
        </div>
        
        <textarea 
          value={aiCode} 
          onChange={(e) => setAiCode(e.target.value)}
          style={{ width: '100%', height: '200px', background: '#050505', color: '#fff', border: '1px solid #333', padding: '10px', fontSize: '0.8rem' }}
        />

        <button 
          onClick={() => {
            if (!autoPilot) playSound('powerUp');
            setAutoPilot(!autoPilot);
          }}
          style={{ width: '100%', marginTop: '10px', background: autoPilot ? '#ff0055' : THEME_COLOR, border: 'none', padding: '12px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {autoPilot ? 'TERMINATE_AUTO_PILOT' : 'EXECUTE_NEURAL_LINK'}
        </button>

        {/* 🛰️ MISSION CONTROL & LOGS */}
        <div style={{ marginTop: '15px', padding: '10px', background: '#0a0a0a', border: '1px solid #222', fontSize: '0.75rem' }}>
          <div style={{ color: THEME_COLOR, borderBottom: '1px solid #222', marginBottom: '5px' }}>🛰️ NEURAL_LOG_OUTPUT</div>
          {logs.map((log, i) => (
            <div key={i} style={{ color: log.startsWith('ERR') ? '#ff0055' : '#888' }}>> {log}</div>
          ))}
          {logs.length === 0 && <div style={{ color: '#444' }}>> NO_DATA_STREAM</div>}
        </div>
      </div>

      <style>{`.ui-btn { background: none; border: 1px solid ${THEME_COLOR}; color: ${THEME_COLOR}; cursor: pointer; font-size: 0.7rem; padding: 8px; font-family: monospace; } .ui-btn:hover { background: ${THEME_COLOR}33; }`}</style>
    </div>
  );
};

export default SurvivorWorld;
