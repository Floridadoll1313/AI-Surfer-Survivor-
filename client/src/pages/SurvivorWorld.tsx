import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { playSound } from '../utils/audio';

const SurvivorWorld = () => {
  const THEME_COLOR = '#64ffda';
  
  // --- STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [autoPilot, setAutoPilot] = useState(false);
  const [aiCode, setAiCode] = useState(`// Move toward the first fragment\nif (fragments.length > 0) {\n  const target = fragments[0];\n  if (target.x > player.x) return { dx: 1, dy: 0 };\n  if (target.x < player.x) return { dx: -1, dy: 0 };\n  if (target.y > player.y) return { dx: 0, dy: 1 };\n  if (target.y < player.y) return { dx: 0, dy: -1 };\n}\nreturn { dx: 0, dy: 0 };`);

  // --- AI EXECUTION ---
  const executeUserAI = useCallback(() => {
    try {
      // The sandbox: provides 'player', 'enemy', and 'fragments' as local variables to the student script
      const brain = new Function('player', 'enemy', 'fragments', aiCode);
      const move = brain(playerPosition, enemyPosition, fragments);
      if (move && typeof move.dx === 'number') {
        handleMove(move.dx, move.dy);
      }
    } catch (err) {
      console.error("NEURAL_LINK_BROKEN:", err);
      setAutoPilot(false);
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
          playSound('collect');
          return false;
        }
        return true;
      }));

      if (nX === enemyPosition.x && nY === enemyPosition.y) {
        setIsGameOver(true);
        playSound('gameOver');
      }
      return { x: nX, y: nY };
    });
  };

  return (
    <div style={{ background: '#000', color: THEME_COLOR, padding: '20px', display: 'flex', gap: '20px', fontFamily: 'monospace' }}>
      {/* Grid rendering and Editor rendering goes here (see previous sections) */}
    </div>
  );
};
