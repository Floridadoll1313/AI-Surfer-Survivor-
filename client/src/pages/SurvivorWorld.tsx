import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { playSound } from '../utils/audio';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const THEME_COLOR = '#64ffda';

  // --- ENGINE STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [autoPilot, setAutoPilot] = useState(false);

  // --- THE AI CHALLENGE TEMPLATE ---
  // Students would edit this logic to "solve" the game.
  const runAIBrain = useCallback(() => {
    const data = {
      player: playerPosition,
      enemy: enemyPosition,
      nearestFragment: fragments[0] || null
    };

    let move = { dx: 0, dy: 0 };

    // Simple Example Logic: Move toward the first fragment
    if (data.nearestFragment) {
      if (data.nearestFragment.x > data.player.x) move.dx = 1;
      else if (data.nearestFragment.x < data.player.x) move.dx = -1;
      else if (data.nearestFragment.y > data.player.y) move.dy = 1;
      else if (data.nearestFragment.y < data.player.y) move.dy = -1;
    }

    // Basic Avoidance: If enemy is too close, override movement
    const dist = Math.abs(data.player.x - data.enemy.x) + Math.abs(data.player.y - data.enemy.y);
    if (dist < 3) {
       // Run away logic...
    }

    handleMove(move.dx, move.dy);
  }, [playerPosition, enemyPosition, fragments]);

  // --- AUTO-PILOT LOOP ---
  useEffect(() => {
    if (autoPilot && !isGameOver) {
      const brainTick = setInterval(runAIBrain, 400); // AI "thinks" every 400ms
      return () => clearInterval(brainTick);
    }
  }, [autoPilot, isGameOver, runAIBrain]);

  // --- MOVEMENT ENGINE ---
  const handleMove = (dx: number, dy: number) => {
    setPlayerPosition(prev => {
      const nX = Math.max(0, Math.min(9, prev.x + dx));
      const nY = Math.max(0, Math.min(9, prev.y + dy));
      if (nX === enemyPosition.x && nY === enemyPosition.y) setIsGameOver(true);
      return { x: nX, y: nY };
    });
  };

  return (
    <div className="survivor-world">
      <style>{`
        .ai-status { 
          padding: 10px; 
          border: 1px solid ${autoPilot ? THEME_COLOR : '#555'}; 
          color: ${autoPilot ? THEME_COLOR : '#555'};
          margin-bottom: 10px;
          font-family: monospace;
          text-align: center;
        }
      `}</style>

      <div className="ai-status">
        SYSTEM_MODE: {autoPilot ? 'AUTONOMOUS_AGENT' : 'MANUAL_INPUT'}
        <button 
          onClick={() => setAutoPilot(!autoPilot)}
          style={{ marginLeft: '15px', cursor: 'pointer', background: 'none', border: `1px solid ${THEME_COLOR}`, color: THEME_COLOR }}
        >
          TOGGLE_AI
        </button>
      </div>

      <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 40px)', gap: '4px' }}>
        {[...Array(100)].map((_, i) => (
          <div key={i} className="cell" style={{ width: '40px', height: '40px', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {playerPosition.x === (i % 10) && playerPosition.y === Math.floor(i / 10) && <span>❖</span>}
            {enemyPosition.x === (i % 10) && enemyPosition.y === Math.floor(i / 10) && <span style={{color: '#ff0055'}}>⚡</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurvivorWorld;
