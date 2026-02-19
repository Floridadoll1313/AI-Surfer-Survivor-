import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { playSound } from '../utils/audio';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const THEME_COLOR = '#64ffda';

  // --- PERSISTENCE, MODIFIERS & PERKS ---
  const [highScore, setHighScore] = useState(Number(localStorage.getItem('survivor_high_score') || 0));
  const [dataShards, setDataShards] = useState(Number(localStorage.getItem('survivor_shards') || 0));
  const [perks, setPerks] = useState({
    magnetRange: Number(localStorage.getItem('perk_magnet') || 0),
    neuralShield: Number(localStorage.getItem('perk_shield') || 0),
    dataEfficiency: Number(localStorage.getItem('perk_efficiency') || 0),
  });
  const [modifiers, setModifiers] = useState({ hardcore: false, turbo: false });
  const [showArchive, setShowArchive] = useState(false);

  // --- ENGINE STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [bossActive, setBossActive] = useState(false);
  const [timer, setTimer] = useState(60);

  // --- REWARD LOGIC ---
  useEffect(() => {
    if (isGameOver) {
      const earned = Math.floor(score / 10);
      setDataShards(prev => {
        const total = prev + earned;
        localStorage.setItem('survivor_shards', total.toString());
        return total;
      });
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('survivor_high_score', score.toString());
      }
    }
  }, [isGameOver, score, highScore]);

  // --- BOSS TRIGGER ---
  useEffect(() => {
    if (score >= 1500 && !bossActive) setBossActive(true);
  }, [score, bossActive]);

  // --- MOVEMENT & PERKS ---
  const handleMove = useCallback((dx: number, dy: number) => {
    if (isGameOver || showArchive) return;
    setPlayerPosition(prev => {
      const nX = Math.max(0, Math.min(9, prev.x + dx));
      const nY = Math.max(0, Math.min(9, prev.y + dy));
      
      const reach = perks.magnetRange;
      const multiplier = (modifiers.hardcore ? 2 : 1) * (modifiers.turbo ? 1.5 : 1);

      setFragments(f => f.filter(frag => {
        if (Math.abs(frag.x - nX) <= reach && Math.abs(frag.y - nY) <= reach) {
          setScore(s => s + (10 + perks.dataEfficiency * 2) * multiplier);
          playSound('collect');
          return false;
        }
        return true;
      }));

      if (nX === enemyPosition.x && nY === enemyPosition.y) {
        if (Math.random() < (perks.neuralShield * 0.15)) {
            setEnemyPosition({x: 9, y: 9});
            playSound('shieldHit');
        } else {
            setIsGameOver(true);
            playSound('gameOver');
        }
      }
      return { x: nX, y: nY };
    });
  }, [enemyPosition, isGameOver, showArchive, perks, modifiers]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const keys: Record<string, [number, number]> = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
      if (keys[e.key]) handleMove(...keys[e.key]);
      if (e.key.toLowerCase() === 'a') setShowArchive(p => !p);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleMove]);

  return (
    <div className={`survivor-world ${modifiers.hardcore ? 'hardcore-mode' : ''}`}>
      <style>{`
        .survivor-world { background: #000; color: ${THEME_COLOR}; padding: 20px; position: relative; border: 2px solid #1a1a1a; }
        .grid-container { display: grid; grid-template-columns: repeat(10, 40px); gap: 4px; }
        .cell { width: 40px; height: 40px; border: 1px solid #111; display: flex; align-items: center; justify-content: center; }
        .hardcore-mode { border-color: #ff0055; box-shadow: 0 0 15px #ff0055; }
        .overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.9); z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; }
      `}</style>

      <div className="game-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <button onClick={() => setShowArchive(true)}>UPGRADES [A]</button>
        <div>SCORE: {Math.floor(score)} | SHARDS: {dataShards}</div>
      </div>

      <div className="grid-container">
        {[...Array(100)].map((_, i) => {
          const x = i % 10, y = Math.floor(i / 10);
          return (
            <div key={i} className="cell">
              {playerPosition.x === x && playerPosition.y === y && <span>❖</span>}
              {enemyPosition.x === x && enemyPosition.y === y && <span>⚡</span>}
              {fragments.some(f => f.x === x && f.y === y) && <span>✦</span>}
            </div>
          );
        })}
      </div>

      {showArchive && (
        <div className="overlay">
          <h2>NEURAL_ARCHIVE</h2>
          <div onClick={() => setModifiers(m => ({...m, hardcore: !m.hardcore}))}>HARDCORE: {modifiers.hardcore ? 'ON' : 'OFF'}</div>
          <button onClick={() => setShowArchive(false)}>CLOSE</button>
        </div>
      )}

      {isGameOver && (
        <div className="overlay">
          <h2 style={{color: '#ff0055'}}>CONNECTION_LOST</h2>
          <button onClick={() => window.location.reload()}>RETRY</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
