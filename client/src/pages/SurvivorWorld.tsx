import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { playSound } from '../utils/audio';

// --- LEADERBOARD COMPONENT ---
const Leaderboard = ({ userScore }) => (
  <div style={{ marginTop: '15px', border: '1px solid #333', padding: '10px', fontSize: '0.75rem' }}>
    <div style={{ color: '#64ffda', marginBottom: '5px' }}>GLOBAL_RANKINGS</div>
    <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.8 }}>
      <span>1. Bot_Delta_v2</span><span>4500</span>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64ffda' }}>
      <span>2. YOU (SCRIPT)</span><span>{userScore}</span>
    </div>
  </div>
);

const SurvivorWorld = () => {
  const THEME_COLOR = '#64ffda';
  
  // --- ENGINE STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  
  // --- AI SUBMISSION STATE ---
  const [autoPilot, setAutoPilot] = useState(false);
  const [aiCode, setAiCode] = useState(`// Move toward the first fragment
if (fragments.length > 0) {
  const target = fragments[0];
  if (target.x > player.x) return { dx: 1, dy: 0 };
  if (target.x < player.x) return { dx: -1, dy: 0 };
  if (target.y > player.y) return { dx: 0, dy: 1 };
  if (target.y < player.y) return { dx: 0, dy: -1 };
}
return { dx: 0, dy: 0 };`);

  // --- SAFE SCRIPT EXECUTION ---
  const executeUserAI = useCallback(() => {
    try {
      // Create a sandbox function from user string
      const brain = new Function('player', 'enemy', 'fragments', aiCode);
      const move = brain(playerPosition, enemyPosition, fragments);
      
      if (move && typeof move.dx === 'number') {
        handleMove(move.dx, move.dy);
      }
    } catch (err) {
      console.error("AI_BRAIN_ERROR:", err);
      setAutoPilot(false); // Kill switch on error
    }
  }, [aiCode, playerPosition, enemyPosition, fragments]);

  useEffect(() => {
    if (autoPilot && !isGameOver) {
      const tick = setInterval(executeUserAI, 400);
      return () => clearInterval(tick);
    }
  }, [autoPilot, isGameOver, executeUserAI]);

  // --- CORE MOVEMENT ---
  const handleMove = (dx: number, dy: number) => {
    setPlayerPosition(prev => {
      const nX = Math.max(0, Math.min(9, prev.x + dx));
      const nY = Math.max(0, Math.min(9, prev.y + dy));
      
      setFragments(f => f.filter(frag => {
        if (frag.x === nX && frag.y === nY) {
          setScore(s => s + 10);
          return false;
        }
        return true;
      }));

      if (nX === enemyPosition.x && nY === enemyPosition.y) setIsGameOver(true);
      return { x: nX, y: nY };
    });
  };

  return (
    <div style={{ background: '#000', color: THEME_COLOR, padding: '20px', display: 'flex', gap: '20px', fontFamily: 'monospace' }}>
      
      {/* 1. THE GRID */}
      <div className="grid-section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 40px)', gap: '4px', border: '1px solid #222', padding: '5px' }}>
          {[...Array(100)].map((_, i) => (
            <div key={i} style={{ width: '40px', height: '40px', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {playerPosition.x === (i%10) && playerPosition.y === Math.floor(i/10) && <span>❖</span>}
              {enemyPosition.x === (i%10) && enemyPosition.y === Math.floor(i/10) && <span style={{color: '#ff0055'}}>⚡</span>}
              {fragments.some(f => f.x === (i%10) && f.y === Math.floor(i/10)) && <span>✦</span>}
            </div>
          ))}
        </div>
        <Leaderboard userScore={score} />
      </div>

      {/* 2. THE SCRIPT EDITOR */}
      <div className="editor-section" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '0.9rem', marginBottom: '5px' }}>NEURAL_SCRIPT_EDITOR</h3>
        <textarea 
          value={aiCode}
          onChange={(e) => setAiCode(e.target.value)}
          style={{ 
            width: '100%', height: '250px', background: '#050505', color: '#fff', 
            border: '1px solid #333', padding: '10px', fontSize: '0.8rem', fontFamily: 'monospace' 
          }}
        />
        <button 
          onClick={() => setAutoPilot(!autoPilot)}
          style={{ 
            marginTop: '10px', padding: '10px', cursor: 'pointer',
            background: autoPilot ? '#ff0055' : THEME_COLOR, border: 'none', fontWeight: 'bold'
          }}
        >
          {autoPilot ? 'STOP_AUTOPILOT' : 'INJECT_SCRIPT_&_START'}
        </button>

        <div style={{ marginTop: '20px', fontSize: '0.7rem', opacity: 0.6 }}>
          <p>> TELEMETRY: [{playerPosition.x}, {playerPosition.y}]</p>
          <p>> TARGETS_IN_VIEW: {fragments.length}</p>
        </div>
      </div>

      {isGameOver && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ color: '#ff0055' }}>SYSTEM_CRASH</h2>
          <button onClick={() => window.location.reload()} style={{ background: THEME_COLOR, padding: '10px 20px', border: 'none' }}>REBOOT</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
