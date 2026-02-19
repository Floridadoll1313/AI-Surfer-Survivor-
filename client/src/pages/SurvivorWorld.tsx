import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const GRID_SIZE = 10;
  const avatarIcons: Record<string, string> = { ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀' };

  // --- PERSISTENT DATA & HARD MODE ---
  const isHardMode = localStorage.getItem('hard_mode_enabled') === 'true';
  const BASE_SPEED = isHardMode ? 400 : 1000;
  const XP_MULTIPLIER = isHardMode ? 3 : 1;

  const [wallet, setWallet] = useState(Number(localStorage.getItem('survivor_wallet')) || 0);
  const [hasShield, setHasShield] = useState(localStorage.getItem('survivor_shield_active') === 'true');

  // --- SESSION STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{x: number, y: number}[]>([]);
  const [fragments, setFragments] = useState<{x: number, y: number}[]>([]);
  const [superFragment, setSuperFragment] = useState<{x: number, y: number} | null>(null); // SUPER FRAGMENT
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [bossActive, setBossActive] = useState(false);
  const [echoes, setEchoes] = useState<{x: number, y: number}[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isOverclocked, setIsOverclocked] = useState(false);
  const [runSpeedBonus, setRunSpeedBonus] = useState(0); // Permanent speed buff for this run

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    const newWallet = wallet + (score * XP_MULTIPLIER);
    localStorage.setItem('survivor_wallet', newWallet.toString());
  }, [score, wallet, XP_MULTIPLIER]);

  useEffect(() => {
    setFragments(Array.from({ length: 5 }, () => ({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) })));
  }, []);

  // Enemy movement logic (Slowed by runSpeedBonus and Overclock)
  useEffect(() => {
    const speedCalculation = isOverclocked ? (BASE_SPEED + runSpeedBonus) * 1.5 : (BASE_SPEED + runSpeedBonus);
    const move = setInterval(() => {
      if (isGameOver) return;
      const step = (pos: {x: number, y: number}) => ({
        x: pos.x < playerPosition.x ? pos.x + 1 : pos.x > playerPosition.x ? pos.x - 1 : pos.x,
        y: pos.y < playerPosition.y ? pos.y + 1 : pos.y > playerPosition.y ? pos.y - 1 : pos.y
      });
      setEnemyPosition(prev => step(prev));
      if (bossActive) setEchoes(prev => prev.map(e => step(e)));
    }, speedCalculation);
    return () => clearInterval(move);
  }, [playerPosition, isGameOver, bossActive, BASE_SPEED, isOverclocked, runSpeedBonus]);

  // Movement & Trail logic
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (isGameOver) return;
      setPlayerPosition(p => {
        const n = { ...p };
        if (e.key === 'ArrowUp' && p.y > 0) n.y -= 1;
        if (e.key === 'ArrowDown' && p.y < GRID_SIZE - 1) n.y += 1;
        if (e.key === 'ArrowLeft' && p.x > 0) n.x -= 1;
        if (e.key === 'ArrowRight' && p.x < GRID_SIZE - 1) n.x += 1;
        if (n.x !== p.x || n.y !== p.y) setTrail(prev => [p, ...prev].slice(0, 3));
        return n;
      });
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [isGameOver]);

  // Collisions and Collections
  useEffect(() => {
    const check = (ex: number, ey: number) => playerPosition.x === ex && playerPosition.y === ey;

    // Hit Enemy
    if (check(enemyPosition.x, enemyPosition.y) || echoes.some(e => check(e.x, e.y))) {
      if (hasShield) {
        setHasShield(false);
        setEnemyPosition({ x: 9, y: 9 });
        setBossActive(false);
        setEchoes([]);
      } else {
        handleGameOver();
      }
    }

    // Collect Super Fragment
    if (superFragment && check(superFragment.x, superFragment.y)) {
      setRunSpeedBonus(prev => prev + 100); // Slows enemies by 100ms permanently for this run
      setSuperFragment(null);
      setScore(s => s + 500); // Massive point boost
    }

    // Collect Standard Fragment
    const fIdx = fragments.findIndex(f => check(f.x, f.y));
    if (fIdx !== -1) {
      const newScore = score + (100 * combo);
      setScore(newScore);
      setCombo(c => Math.min(c + 1, 5));

      // Spawn Super Fragment every 2500 points
      if (newScore > 0 && newScore % 2500 === 0) {
        setSuperFragment({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
      }

      const n = [...fragments]; n.splice(fIdx, 1);
      n.push({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
      setFragments(n);
    }
  }, [playerPosition, enemyPosition, echoes, fragments, superFragment, hasShield, combo, score, handleGameOver]);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', fontFamily: 'monospace', color: '#64ffda' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid #35c9ff', padding: '10px', background: '#0a192f', marginBottom: '10px' }}>
        <span>XP: {wallet}</span>
        <span style={{ color: superFragment ? '#ffcc00' : '#64ffda' }}>
          {superFragment ? '>> SUPER_NODE_DETECTED <<' : `BUFF: +${runSpeedBonus}ms`}
        </span>
        <span>SCORE: {score}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', border: '2px solid #35c9ff', background: '#0a192f' }}>
        {Array.from({ length: 100 }).map((_, i) => {
          const x = i % 10, y = Math.floor(i / 10);
          const isP = playerPosition.x === x && playerPosition.y === y;
          const isE = enemyPosition.x === x && enemyPosition.y === y;
          const isF = fragments.some(f => f.x === x && f.y === y);
          const isSF = superFragment?.x === x && superFragment?.y === y;
          const trailIdx = trail.findIndex(t => t.x === x && t.y === y);

          return (
            <div key={i} style={{ width: '100%', paddingTop: '100%', position: 'relative', border: '1px solid rgba(100,255,218,0.05)' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                {isP ? avatarIcons[selectedAvatar] : 
                 isE ? '☠' : 
                 isSF ? <span style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 0 5px #ffcc00)' }}>💎</span> :
                 isF ? '✧' : 
                 trailIdx !== -1 ? <span style={{ opacity: 0.4 - trailIdx * 0.1, filter: 'blur(1px)' }}>{avatarIcons[selectedAvatar]}</span> : ''}
              </div>
            </div>
          );
        })}
      </div>

      {isGameOver && (
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, background: 'rgba(10, 25, 47, 0.98)', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 100 }}>
          <h1 style={{ color: '#ff5f5f' }}>CONNECTION_LOST</h1>
          <p>FINAL_SCORE: {score}</p>
          <p style={{ color: '#ffcc00' }}>SPEED_MODS_FOUND: {runSpeedBonus/100}</p>
          <button onClick={() => window.location.reload()} style={{ padding: '15px', background: '#64ffda', color: '#0a192f', border: 'none', width: '200px', margin: '20px auto', cursor: 'pointer' }}>REBOOT</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
