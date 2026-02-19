import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { playSound } from '../utils/audio';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const THEME_COLOR = '#64ffda';

  // --- PERSISTENCE & MODIFIERS ---
  const [highScore, setHighScore] = useState(Number(localStorage.getItem('survivor_high_score') || 0));
  const [unlockedForms, setUnlockedForms] = useState<string[]>(
    JSON.parse(localStorage.getItem('survivor_forms') || '["INITIATE"]')
  );
  
  // New: Neural Modifiers
  const [modifiers, setModifiers] = useState({
    hardcore: false, // No Time Loop, 1-hit death
    turbo: false     // Double speed
  });
  const [showArchive, setShowArchive] = useState(false);

  // --- ENGINE STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [evoLevel, setEvoLevel] = useState(1);
  const [bossActive, setBossActive] = useState(false);
  const [victory, setVictory] = useState(false);

  // --- GAMEPLAY LOOP (Speed affected by Turbo) ---
  useEffect(() => {
    if (isGameOver || victory || showArchive) return;
    
    const moveSpeed = modifiers.turbo ? 300 : 600;
    const enemyMove = setInterval(() => {
      setEnemyPosition(prev => ({
        x: prev.x + (playerPosition.x > prev.x ? 1 : playerPosition.x < prev.x ? -1 : 0),
        y: prev.y + (playerPosition.y > prev.y ? 1 : playerPosition.y < prev.y ? -1 : 0)
      }));
    }, moveSpeed);

    return () => clearInterval(enemyMove);
  }, [playerPosition, isGameOver, victory, showArchive, modifiers.turbo]);

  // --- MOVEMENT ---
  const handleMove = useCallback((dx: number, dy: number) => {
    if (isGameOver || victory || showArchive) return;
    setPlayerPosition(prev => {
      const nX = Math.max(0, Math.min(9, prev.x + dx));
      const nY = Math.max(0, Math.min(9, prev.y + dy));
      
      // Collision Logic
      if (nX === enemyPosition.x && nY === enemyPosition.y) {
        setIsGameOver(true);
        playSound('gameOver');
      }

      // Fragment Collection (Score multiplier for modifiers)
      const multiplier = (modifiers.hardcore ? 2 : 1) * (modifiers.turbo ? 1.5 : 1);
      setFragments(f => f.filter(frag => {
        if (frag.x === nX && frag.y === nY) {
          setScore(s => s + (10 * multiplier));
          playSound('collect');
          return false;
        }
        return true;
      }));

      return { x: nX, y: nY };
    });
  }, [enemyPosition, isGameOver, victory, showArchive, modifiers]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') handleMove(0, -1);
      if (e.key === 'ArrowDown') handleMove(0, 1);
      if (e.key === 'ArrowLeft') handleMove(-1, 0);
      if (e.key === 'ArrowRight') handleMove(1, 0);
      if (e.key.toLowerCase() === 'a') setShowArchive(prev => !prev);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleMove]);

  return (
    <div className={`survivor-world ${modifiers.hardcore ? 'hardcore-mode' : ''}`}>
      <style>{`
        .hardcore-mode { border-color: #ff0055 !important; box-shadow: 0 0 20px #ff0055; }
        .modifier-toggle { 
          margin: 10px 0; padding: 5px; border: 1px solid ${THEME_COLOR}; 
          cursor: pointer; background: rgba(0,0,0,0.5); font-size: 0.7rem;
        }
        .active-mod { background: ${THEME_COLOR}; color: #000; }
        .hard-mod.active-mod { background: #ff0055; color: #fff; border-color: #ff0055; }
      `}</style>

      <div className="game-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="archive-btn" onClick={() => setShowArchive(true)}>NEURAL_ARCHIVE [A]</button>
        <div className="stat">SCORE: {Math.floor(score)}</div>
      </div>

      {showArchive && (
        <div className="archive-overlay" style={{ position: 'absolute', inset: 0, background: '#000', zIndex: 200, padding: '20px' }}>
          <h2 style={{ color: THEME_COLOR }}>NEURAL_MODIFIERS</h2>
          
          <div className={`modifier-toggle hard-mod ${modifiers.hardcore ? 'active-mod' : ''}`}
               onClick={() => setModifiers(m => ({ ...m, hardcore: !m.hardcore }))}>
            HARDCORE_PROTOCOL: {modifiers.hardcore ? 'ON (2x SCORE)' : 'OFF'}
          </div>

          <div className={`modifier-toggle ${modifiers.turbo ? 'active-mod' : ''}`}
               onClick={() => setModifiers(m => ({ ...m, turbo: !m.turbo }))}>
            TURBO_OVERCLOCK: {modifiers.turbo ? 'ON (1.5x SCORE)' : 'OFF'}
          </div>

          <p style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '20px' }}>
            BEST_RUN: {highScore} | FORMS: {unlockedForms.join(', ')}
          </p>
          
          <button className="archive-btn" style={{ marginTop: '20px' }} onClick={() => setShowArchive(false)}>APPLY_&_SYNC</button>
        </div>
      )}

      <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 40px)', gap: '4px' }}>
        {[...Array(100)].map((_, i) => {
          const x = i % 10, y = Math.floor(i / 10);
          const isPlayer = playerPosition.x === x && playerPosition.y === y;
          return (
            <div key={i} className="cell" style={{ width: '40px', height: '40px', border: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justify-content: 'center' }}>
              {isPlayer && <span style={{ color: modifiers.hardcore ? '#ff0055' : THEME_COLOR }}>❖</span>}
              {enemyPosition.x === x && enemyPosition.y === y && <span>⚡</span>}
              {fragments.some(f => f.x === x && f.y === y) && <span>✦</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SurvivorWorld;
