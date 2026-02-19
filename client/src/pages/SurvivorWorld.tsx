import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { getLevelInfo } from '../data/leveling';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const { speedBonus } = getLevelInfo(selectedAvatar);
  
  const GRID_SIZE = 10;
  const avatarIcons: Record<string, string> = { ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀' };

  // --- PERSISTENT DATA ---
  const isHardMode = localStorage.getItem('hard_mode_enabled') === 'true';
  const BASE_SPEED = isHardMode ? 400 : 1000;
  const XP_MULTIPLIER = isHardMode ? 3 : 1;

  const [wallet, setWallet] = useState(Number(localStorage.getItem('survivor_wallet')) || 0);
  const [hasShield, setHasShield] = useState(localStorage.getItem('survivor_shield_active') === 'true');

  // --- SESSION STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{x: number, y: number}[]>([]);
  const [fragments, setFragments] = useState<{x: number, y: number}[]>([]);
  
  // ENEMIES & BOSS MECHANICS
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [bossActive, setBossActive] = useState(false);
  const [bossPos, setBossPos] = useState({ x: 5, y: 5 });
  const [bossStunned, setBossStunned] = useState(false);
  const [fragmentStreak, setFragmentStreak] = useState(0);
  
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> SYSTEM_READY', '> MONITORING_SECTORS']);

  const addLog = (msg: string) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 8));

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    addLog('CRITICAL: CONNECTION_LOST');
    localStorage.setItem('survivor_wallet', (wallet + (score * XP_MULTIPLIER)).toString());
    
    // Save Avatar XP for Leveling
    const currentXp = Number(localStorage.getItem(`xp_${selectedAvatar}`)) || 0;
    localStorage.setItem(`xp_${selectedAvatar}`, (currentXp + score).toString());
  }, [score, wallet, XP_MULTIPLIER, selectedAvatar]);

  // Initial Spawn
  useEffect(() => {
    setFragments(Array.from({ length: 5 }, () => ({ x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) })));
  }, []);

  // AI Movement Loop (Boss & Stalker)
  useEffect(() => {
    const move = setInterval(() => {
      if (isGameOver || bossStunned) return; // Freeze Boss/Enemies if stunned
      
      setEnemyPosition(prev => ({
        x: prev.x < playerPosition.x ? prev.x + 1 : prev.x > playerPosition.x ? prev.x - 1 : prev.x,
        y: prev.y < playerPosition.y ? prev.y + 1 : prev.y > playerPosition.y ? prev.y - 1 : prev.y
      }));

      if (bossActive) {
        setBossPos(prev => ({
          x: Math.abs(prev.x - playerPosition.x) > 2 ? (prev.x < playerPosition.x ? prev.x + 2 : prev.x - 2) : playerPosition.x,
          y: Math.abs(prev.y - playerPosition.y) > 2 ? (prev.y < playerPosition.y ? prev.y + 2 : prev.y - 2) : playerPosition.y,
        }));
      }
    }, BASE_SPEED + speedBonus);
    return () => clearInterval(move);
  }, [playerPosition, isGameOver, bossActive, bossStunned, BASE_SPEED, speedBonus]);

  // Player Input
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (isGameOver) return;
      setPlayerPosition(p => {
        const n = { ...p };
        if (e.key === 'ArrowUp' && p.y > 0) n.y -= 1;
        if (e.key === 'ArrowDown' && p.y < 9) n.y += 1;
        if (e.key === 'ArrowLeft' && p.x > 0) n.x -= 1;
        if (e.key === 'ArrowRight' && p.x < 9) n.x += 1;
        if (n.x !== p.x || n.y !== p.y) setTrail(prev => [p, ...prev].slice(0, 3));
        return n;
      });
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [isGameOver]);

  // Collisions & Collection (Vulnerability Logic Lives Here)
  useEffect(() => {
    const check = (ax: number, ay: number) => playerPosition.x === ax && playerPosition.y === ay;

    // Trigger Boss at 10k
    if (score >= 10000 && !bossActive) {
      setBossActive(true);
      addLog('WARNING: HIGH_LEVEL_ENTITY_DETECTED');
    }

    // Death Checks
    if (check(enemyPosition.x, enemyPosition.y) || (bossActive && check(bossPos.x, bossPos.y))) {
      if (hasShield) {
        setHasShield(false);
        addLog('SHIELD_BURST: ENTITY_REPELLED');
        setEnemyPosition({ x: 9, y: 9 });
      } else {
        handleGameOver();
      }
    }

    // Collection Logic + Stun Streak
    const fIdx = fragments.findIndex(f => check(f.x, f.y));
    if (fIdx !== -1) {
      setScore(s => s + 100);
      
      if (bossActive) {
        const nextStreak = fragmentStreak + 1;
        setFragmentStreak(nextStreak);
        
        if (nextStreak >= 5) {
          setBossStunned(true);
          setFragmentStreak(0);
          addLog('SYSTEM_EXPLOIT: BOSS_STUNNED');
          setTimeout(() => {
            setBossStunned(false);
            addLog('WARNING: BOSS_REBOOTING...');
          }, 3000);
        }
      }

      const n = [...fragments];
      n.splice(fIdx, 1);
      n.push({ x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) });
      setFragments(n);
    }
  }, [playerPosition, enemyPosition, bossPos, fragments, hasShield, score, bossActive, bossStunned, fragmentStreak, handleGameOver]);

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'monospace', color: '#64ffda', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
      <div>
        <header style={{ display: 'flex', justifyContent: 'space-between', border: `1px solid ${bossActive ? '#ff5f5f' : '#35c9ff'}`, padding: '10px', background: '#0a192f', marginBottom: '10px' }}>
          <span style={{ color: bossStunned ? '#35c9ff' : (bossActive ? '#ff5f5f' : '#64ffda') }}>
            {bossStunned ? '⚡ BOSS_VULNERABLE' : (bossActive ? '!! BOSS_ACTIVE !!' : 'SYSTEM_STABLE')}
          </span>
          <span>SCORE: {score}</span>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', border: `2px solid ${bossActive ? '#ff5f5f' : '#35c9ff'}`, background: '#0a192f' }}>
          {Array.from({ length: 100 }).map((_, i) => {
            const x = i % 10, y = Math.floor(i / 10);
            const isP = playerPosition.x === x && playerPosition.y === y;
            const isE = enemyPosition.x === x && enemyPosition.y === y;
            const isB = bossActive && bossPos.x === x && bossPos.y === y;
            const isF = fragments.some(f => f.x === x && f.y === y);
            const tIdx = trail.findIndex(t => t.x === x && t.y === y);

            return (
              <div key={i} style={{ width: '100%', paddingTop: '100%', position: 'relative', border: '1px solid rgba(100,255,218,0.05)' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.5rem' }}>
                  {isP ? avatarIcons[selectedAvatar] : 
                   isB ? <span style={{ color: bossStunned ? '#35c9ff' : '#ff5f5f', opacity: bossStunned ? 0.5 : 1 }}>{bossStunned ? '🔌' : '👾'}</span> :
                   isE ? '☠' : 
                   isF ? '✧' : 
                   tIdx !== -1 ? <span style={{ opacity: 0.3 }}>{avatarIcons[selectedAvatar]}</span> : ''}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <aside style={{ borderLeft: '1px solid #112240', paddingLeft: '20px' }}>
        <h3 style={{ color: '#8892b0', fontSize: '0.8rem' }}>SYSLOG</h3>
        {logs.map((log, i) => (
          <p key={i} style={{ fontSize: '0.75rem', color: log.includes('WARNING') ? '#ff5f5f' : '#4e566d' }}>{log}</p>
        ))}
      </aside>

      {isGameOver && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,25,47,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <h1 style={{ color: '#ff5f5f' }}>CONNECTION_LOST</h1>
          <button onClick={() => window.location.reload()} style={{ padding: '15px 40px', background: '#64ffda', color: '#0a192f', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>REBOOT</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
