import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const GRID_SIZE = 10;

  // --- DYNAMIC SKIN LOGIC ---
  // Returns a different icon based on how much XP the player has in their wallet
  const getAvatarIcon = (type: string, xp: number) => {
    if (xp >= 25000) return '💠'; // Elite Tier
    if (xp >= 10000) return '⌬'; // Advanced Tier
    if (xp >= 5000)  return '◬'; // Veteran Tier
    
    const defaults: Record<string, string> = { 
      ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀' 
    };
    return defaults[type] || '□';
  };

  // --- PERSISTENT DATA ---
  const [wallet, setWallet] = useState(Number(localStorage.getItem('survivor_wallet')) || 0);
  const [energyMax, setEnergyMax] = useState(Number(localStorage.getItem('upgrade_energy')) || 100);
  const [speedMod, setSpeedMod] = useState(Number(localStorage.getItem('upgrade_speed')) || 0);
  const [hasShield, setHasShield] = useState(localStorage.getItem('survivor_shield_active') === 'true');

  // --- SESSION STATE ---
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
  const [shareStatus, setShareStatus] = useState('SHARE_RANK');

  // --- LEADERBOARD & SHARING ---
  const updateHallOfFame = (finalScore: number) => {
    const raw = localStorage.getItem('survivor_leaderboard');
    let scores: number[] = raw ? JSON.parse(raw) : [];
    scores.push(finalScore);
    scores.sort((a, b) => b - a);
    const topFive = scores.slice(0, 5);
    localStorage.setItem('survivor_leaderboard', JSON.stringify(topFive));
  };

  const handleShare = () => {
    const text = `> AI_SURFER_LOG\n> SCORE: ${score}\n> ICON: ${getAvatarIcon(selectedAvatar, wallet)}\n> [ RUN_COMPLETE ]`;
    navigator.clipboard.writeText(text);
    setShareStatus('COPIED!');
    setTimeout(() => setShareStatus('SHARE_RANK'), 2000);
  };

  // --- GAME ENGINE ---
  useEffect(() => {
    setFragments(Array.from({ length: 5 }, () => ({ 
      x: Math.floor(Math.random() * GRID_SIZE), 
      y: Math.floor(Math.random() * GRID_SIZE) 
    })));
  }, []);

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    const newWallet = wallet + score;
    setWallet(newWallet);
    localStorage.setItem('survivor_wallet', newWallet.toString());
    updateHallOfFame(score);
  }, [score, wallet]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (isGameOver || showShop) return;
      const step = (pos: {x: number, y: number}) => ({
        x: pos.x < playerPosition.x ? pos.x + 1 : pos.x > playerPosition.x ? pos.x - 1 : pos.x,
        y: pos.y < playerPosition.y ? pos.y + 1 : pos.y > playerPosition.y ? pos.y - 1 : pos.y
      });
      setEnemyPosition(prev => step(prev));
      if (bossActive) setEchoes(prev => prev.map(e => step(e)));
    }, 1000);
    return () => clearInterval(moveInterval);
  }, [playerPosition, isGameOver, showShop, bossActive]);

  useEffect(() => {
    const checkHit = (ex: number, ey: number) => playerPosition.x === ex && playerPosition.y === ey;
    
    if ((checkHit(enemyPosition.x, enemyPosition.y) || echoes.some(e => checkHit(e.x, e.y))) && !isInvisible) {
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

    const fIdx = fragments.findIndex(f => checkHit(f.x, f.y));
    if (fIdx !== -1) {
      const s = score + (100 * combo);
      setScore(s);
      setCombo(c => Math.min(c + 1, 5));
      
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
    const handleKeys = (e: KeyboardEvent) => {
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
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [isGameOver, showShop]);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', fontFamily: 'monospace', color: '#64ffda' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid #35c9ff', padding: '10px', background: '#0a192f' }}>
        <span>XP: {wallet}</span>
        <span style={{ color: bossActive ? '#ff5f5f' : '#64ffda' }}>{bossActive ? 'BOSS_WAVE' : `COMBO_X${combo}`}</span>
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
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.2rem' }}>
                {isP ? (
                  <span style={{ color: hasShield ? '#35c9ff' : '#64ffda', textShadow: wallet > 10000 ? '0 0 10px #64ffda' : 'none' }}>
                    {getAvatarIcon(selectedAvatar, wallet)}
                  </span>
                ) : isE ? '☠' : isEcho ? '👻' : isF ? '✧' : ''}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#4e566d' }}>
        CURRENT_SKIN: {wallet >= 25000 ? 'LEGENDARY' : wallet >= 10000 ? 'ADVANCED' : wallet >= 5000 ? 'VETERAN' : 'BASIC'}
      </div>

      {isGameOver && (
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, background: 'rgba(10, 25, 47, 0.98)', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 100 }}>
              <h1 style={{ color: '#ff5f5f' }}>CONNECTION_LOST</h1>
              <p>SCORE: {score}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '250px', margin: '20px auto' }}>
                <button onClick={() => window.location.reload()} style={{ padding: '15px', background: '#64ffda', color: '#0a192f', border: 'none', fontWeight: 'bold' }}>TRY_AGAIN</button>
                <button onClick={handleShare} style={{ padding: '12px', background: 'none', border: '1px solid #35c9ff', color: '#35c9ff' }}>{shareStatus}</button>
                <button onClick={() => window.location.href = '/'} style={{ color: '#8892b0', background: 'none', border: 'none' }}>EXIT</button>
              </div>
          </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
