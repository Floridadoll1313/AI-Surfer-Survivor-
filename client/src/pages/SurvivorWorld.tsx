import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { playSound } from '../utils/audio';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const THEME_COLOR = '#64ffda';

  // --- PERSISTENCE & ARCHIVE ---
  const [highScore, setHighScore] = useState(Number(localStorage.getItem('survivor_high_score') || 0));
  const [unlockedForms, setUnlockedForms] = useState<string[]>(
    JSON.parse(localStorage.getItem('survivor_forms') || '["INITIATE"]')
  );
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
  const [timer, setTimer] = useState(60);

  // --- ARCHIVE LOGIC ---
  const saveToArchive = useCallback((finalScore: number, level: number) => {
    // Save High Score
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('survivor_high_score', finalScore.toString());
    }

    // Save Unlocked Forms
    const formNames = ["INITIATE", "SENTINEL", "ARCHON", "OVERLORD"];
    const currentForm = formNames[level - 1];
    if (!unlockedForms.includes(currentForm)) {
      const newForms = [...unlockedForms, currentForm];
      setUnlockedForms(newForms);
      localStorage.setItem('survivor_forms', JSON.stringify(newForms));
    }
  }, [highScore, unlockedForms]);

  // Update Archive on End Game
  useEffect(() => {
    if (isGameOver || victory) {
      saveToArchive(score, evoLevel);
    }
  }, [isGameOver, victory, score, evoLevel, saveToArchive]);

  // --- FRAGMENT SPAWNER ---
  useEffect(() => {
    if (isGameOver || victory || showArchive) return;
    const interval = setInterval(() => {
      if (fragments.length < 10) {
        setFragments(prev => [...prev, { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) }]);
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [fragments, isGameOver, victory, showArchive]);

  // --- MOVEMENT ---
  const handleMove = useCallback((dx: number, dy: number) => {
    if (isGameOver || victory || showArchive) return;
    setPlayerPosition(prev => {
      const nX = Math.max(0, Math.min(9, prev.x + dx));
      const nY = Math.max(0, Math.min(9, prev.y + dy));
      const reach = evoLevel >= 3 ? 1 : 0;

      setFragments(f => f.filter(frag => {
        if (Math.abs(frag.x - nX) <= reach && Math.abs(frag.y - nY) <= reach) {
          setScore(s => s + 10);
          playSound('collect');
          return false;
        }
        return true;
      }));

      if (nX === enemyPosition.x && nY === enemyPosition.y) setIsGameOver(true);
      return { x: nX, y: nY };
    });
  }, [enemyPosition, isGameOver, victory, evoLevel, showArchive]);

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
    <div className={`survivor-world ${victory ? 'victory-glow' : ''}`}>
      <style>{`
        .archive-overlay { position: absolute; inset: 0; background: #000; z-index: 200; padding: 20px; border: 2px solid ${THEME_COLOR}; }
        .form-badge { display: inline-block; padding: 4px 8px; border: 1px solid ${THEME_COLOR}; font-size: 0.7rem; margin: 4px; border-radius: 4px; }
        .archive-btn { background: none; border: 1px solid ${THEME_COLOR}; color: ${THEME_COLOR}; cursor: pointer; font-size: 0.7rem; padding: 5px; }
      `}</style>

      <div className="game-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="archive-btn" onClick={() => setShowArchive(true)}>VIEW_ARCHIVE [A]</button>
        <div className="stat">SCORE: {score} | BEST: {highScore}</div>
      </div>

      {showArchive && (
        <div className="archive-overlay">
          <h2 style={{ color: THEME_COLOR }}>DATA_ARCHIVE</h2>
          <p>GLOBAL_HIGH_SCORE: {highScore}</p>
          <div style={{ margin: '20px 0' }}>
            <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>UNLOCKED_EVOLUTIONS:</p>
            {unlockedForms.map(form => (
              <span key={form} className="form-badge">{form}</span>
            ))}
          </div>
          <button className="archive-btn" onClick={() => setShowArchive(false)}>RESUME_SIMULATION</button>
        </div>
      )}

      <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 40px)', gap: '4px', marginTop: '10px' }}>
        {[...Array(100)].map((_, i) => {
          const x = i % 10, y = Math.floor(i / 10);
          const isPlayer = playerPosition.x === x && playerPosition.y === y;
          return (
            <div key={i} className="cell" style={{ width: '40px', height: '40px', border: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justify-content: 'center' }}>
              {isPlayer && <span style={{ color: THEME_COLOR, fontSize: '1.2rem' }}>❖</span>}
              {enemyPosition.x === x && enemyPosition.y === y && <span>⚡</span>}
              {fragments.some(f => f.x === x && f.y === y) && <span style={{ color: '#fff' }}>✦</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SurvivorWorld;
