import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const GRID_SIZE = 10;
  const avatarIcons: Record<string, string> = { ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀' };

  // PERSISTENT DATA
  const [wallet, setWallet] = useState(Number(localStorage.getItem('survivor_wallet')) || 0);
  const [energyMax, setEnergyMax] = useState(Number(localStorage.getItem('upgrade_energy')) || 100);
  const [speedMod, setSpeedMod] = useState(Number(localStorage.getItem('upgrade_speed')) || 0);
  const [hasShield, setHasShield] = useState(localStorage.getItem('survivor_shield_active') === 'true');

  // SESSION STATE
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{x: number, y: number}[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [bossActive, setBossActive] = useState(false);
  const [echoes, setEchoes] = useState<{x: number, y: number}[]>([]);
  const [score, setScore] = useState(0);
  const [energy, setEnergy] = useState(energyMax);
  const [combo, setCombo] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [isInvisible, setIsInvisible] = useState(false);

  // LEADERBOARD LOGIC
  const updateHallOfFame = (finalScore: number) => {
    const raw = localStorage.getItem('survivor_leaderboard');
    let scores: number[] = raw ? JSON.parse(raw) : [];
    scores.push(finalScore);
    scores.sort((a, b) => b - a); // Highest first
    const topFive = scores.slice(0, 5); // Keep top 5
    localStorage.setItem('survivor_leaderboard', JSON.stringify(topFive));
  };

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    const newWallet = wallet + score;
    setWallet(newWallet);
    localStorage.setItem('survivor_wallet', newWallet.toString());
    
    // Update High Score
    const currentBest = Number(localStorage.getItem('survivor_high_score')) || 0;
    if (score > currentBest) localStorage.setItem('survivor_high_score', score.toString());
    
    // Update Hall of Fame
    updateHallOfFame(score);
  }, [score, wallet]);

  // CORE LOOP
  useEffect(() => {
    setFragments(Array.from({ length: 5 }, () => ({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) })));
  }, []);

  useEffect(() => {
    const move = setInterval(() => {
      if (isGameOver || showShop) return;
      const step = (pos: {x: number, y: number}) => ({
        x: pos.x < playerPosition.x ? pos.x + 1 : pos.x > playerPosition.x ? pos.x - 1 : pos.x,
        y: pos.y < playerPosition.y ? pos.y + 1 : pos.y > playerPosition.y ? pos.y - 1 : pos.y
      });
      setEnemyPosition(prev => step(prev));
      if (bossActive) setEchoes(prev => prev.map(e => step(e)));
    }, 1000);
    return () => clearInterval(move);
  }, [playerPosition, isGameOver, showShop, bossActive]);

  useEffect(() => {
    const check = (ex: number, ey: number) => playerPosition.x === ex && playerPosition.y === ey;
    if ((check(enemyPosition.x, enemyPosition.y) || echoes.some(e => check(e.x, e.y))) && !isInvisible) {
      if (hasShield) {
        setHasShield(false);
        localStorage.setItem('survivor_shield_active', 'false');
        setEnemyPosition({ x: 9, y: 9 });
        setBossActive(false);
        setEchoes([]);
      } else {
        handleGameOver();
      }
    }
    const fIdx = fragments.findIndex(f => check(f.x, f.y));
    if (fIdx !== -1) {
      const s = score + (100 * combo);
      setScore(s);
      setCombo(c => Math.min(c + 1, 5));
      localStorage.setItem('daily_fragments', (Number(localStorage.getItem('daily_fragments')) + 1).toString());
      if ((s / 100) % 10 === 0) {
          setBossActive(true);
          setEchoes([{x: 0, y: 9}, {x: 9, y: 0}]);
          setTimeout(() => { setBossActive(false); setEchoes([]); }, 10000);
      }
      const n = [...fragments]; n.splice(fIdx, 1);
      n.push({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
      setFragments(n);
    }
  }, [playerPosition, enemyPosition, echoes, fragments, hasShield, isInvisible, combo, score, handleGameOver]);

  useEffect(() => {
    const moveKeys = (e: KeyboardEvent) => {
        if (isGameOver || showShop) return;
        setPlayerPosition(p => {
            const n = {...p};
            if (e.key === 'ArrowUp' && p.y > 0) n.y -= 1;
            if (e.key === 'ArrowDown' && p.y < GRID_SIZE - 1) n.y += 1;
            if (e.key === 'ArrowLeft' && p.x > 0) n.x -= 1;
            if (e.key === 'ArrowRight' && p.x < GRID_SIZE - 1) n.x += 1;
            return n;
        });
    };
    window.addEventListener('keydown', moveKeys);
    return () => window.removeEventListener('keydown', moveKeys);
  }, [isGameOver, showShop]);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', fontFamily: 'monospace', color: '#64ffda' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid #35c9ff', padding: '10px', background: '#0a192f' }}>
        <span>XP: {wallet}</span>
        <span style={{ color: bossActive ? '#ff5f5f' : '#64ffda' }}>{bossActive ? 'BOSS_INCURSION' : `X${combo}_COMBO`}</span>
        <span>SCORE: {score}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', border: `2px solid ${bossActive ? '#ff5f5f' : '#35c9ff'}`, background: '#0a192f', marginTop: '20px' }}>
        {Array.from({ length: 100 }).map((_, i) => {
          const x = i % 10, y = Math.floor(i / 10);
          const isP = playerPosition.x === x && playerPosition.y === y;
          const isE = enemyPosition.x === x && enemyPosition.y === y;
          const isEcho = echoes.some(e => e.x === x && e.y === y);
          const isF = fragments.some(f => f.x === x && f.y === y);
          return (
            <div key={i} style={{ width: '100%', paddingTop: '100%', position: 'relative', border: '1px solid rgba(53,201,255,0.05)' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                {isP ? avatarIcons[selectedAvatar] : isE ? '☠' : isEcho ? '👻' : isF ? '✧' : ''}
              </div>
            </div>
          );
        })}
      </div>
      {isGameOver && (
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, background: 'rgba(10,25,47,0.95)', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 100 }}>
              <h1 style={{ color: '#ff5f5f' }}>CONNECTION_LOST</h1>
              <p>FINAL_SCORE: {score}</p>
              <button onClick={() => window.location.reload()} style={{ padding: '15px', background: '#35c9ff', color: '#0a192f', border: 'none', cursor: 'pointer', width: '200px', margin: '20px auto' }}>REBOOT</button>
          </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
