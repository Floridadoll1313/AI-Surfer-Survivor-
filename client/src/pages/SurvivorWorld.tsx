import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { playSound } from '../utils/audio';

// --- HINT DATABASE ---
const HINT_DATABASE = {
  avoidance: `// Enemy Avoidance\nconst dist = Math.abs(player.x - enemy.x) + Math.abs(player.y - enemy.y);\nif (dist < 3) {\n  return { dx: player.x > enemy.x ? 1 : -1, dy: player.y > enemy.y ? 1 : -1 };\n}`,
  sorting: `// Closest Target Sorting\nconst sorted = fragments.sort((a, b) => {\n  const distA = Math.abs(player.x - a.x) + Math.abs(player.y - a.y);\n  const distB = Math.abs(player.x - b.x) + Math.abs(player.y - b.y);\n  return distA - distB;\n});\nconst target = sorted[0];`
};

const SurvivorWorld = () => {
  const THEME_COLOR = '#64ffda';
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [autoPilot, setAutoPilot] = useState(false);
  const [aiCode, setAiCode] = useState(`// Move toward the first fragment\nif (fragments.length > 0) {\n  const target = fragments[0];\n  if (target.x > player.x) return { dx: 1, dy: 0 };\n  if (target.x < player.x) return { dx: -1, dy: 0 };\n  if (target.y > player.y) return { dx: 0, dy: 1 };\n  if (target.y < player.y) return { dx: 0, dy: -1 };\n}\nreturn { dx: 0, dy: 0 };`);

  const executeUserAI = useCallback(() => {
    try {
      const brain = new Function('player', 'enemy', 'fragments', aiCode);
      const move = brain(playerPosition, enemyPosition, fragments);
      if (move) handleMove(move.dx || 0, move.dy || 0);
    } catch (err) {
      setAutoPilot(false);
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
    <div style={{ background: '#000', color: THEME_COLOR, padding: '20px', display: 'flex', gap: '20px', fontFamily: 'monospace' }}>
      <div className="simulation">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 40px)', gap: '4px' }}>
          {[...Array(100)].map((_, i) => (
            <div key={i} style={{ width: '40px', height: '40px', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
              {playerPosition.x === (i%10) && playerPosition.y === Math.floor(i/10) && <span>❖</span>}
              {enemyPosition.x === (i%10) && enemyPosition.y === Math.floor(i/10) && <span style={{color: '#ff0055'}}>⚡</span>}
              {fragments.some(f => f.x === (i%10) && f.y === Math.floor(i/10)) && <span>✦</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="ide" style={{ flexGrow: 1 }}>
        <textarea 
          value={aiCode} 
          onChange={(e) => setAiCode(e.target.value)}
          style={{ width: '100%', height: '300px', background: '#050505', color: '#fff', border: '1px solid #333', padding: '10px' }}
        />
        <button onClick={() => setAutoPilot(!autoPilot)} style={{ width: '100%', marginTop: '10px', background: THEME_COLOR, padding: '10px' }}>
          {autoPilot ? 'STOP' : 'RUN AI'}
        </button>
      </div>
    </div>
  );
};

export default SurvivorWorld;
