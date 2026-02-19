import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { getLevelInfo } from '../data/leveling';
import { playSound } from '../utils/audio';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const { speedBonus } = getLevelInfo(selectedAvatar);
  
  const GRID_SIZE = 10;
  const avatarIcons: Record<string, string> = { ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀' };

  // --- EVENT & DIFFICULTY LOGIC ---
  const isWeekend = [0, 6].includes(new Date().getDay());
  const THEME_COLOR = isWeekend ? '#ffcc00' : '#64ffda'; 

  const isHardMode = localStorage.getItem('hard_mode_enabled') === 'true';
  const BASE_SPEED = isHardMode ? 400 : 1000;
  const XP_MULTIPLIER = (isHardMode ? 3 : 1) * (isWeekend ? 2 : 1);

  // --- PERSISTENT STATE ---
  const [wallet] = useState(Number(localStorage.getItem('survivor_wallet')) || 0);
  const [hasShield, setHasShield] = useState(localStorage.getItem('survivor_shield_active') === 'true');

  // --- SESSION STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{x: number, y: number}[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  
  // BOSS & STUN MECHANICS
  const [bossActive, setBossActive] = useState(false);
  const [bossPos, setBossPos] = useState({ x: 5, y: 5 });
  const [bossStunned, setBossStunned] = useState(false);
  const [fragmentStreak, setFragmentStreak] = useState(0);

  // DIFFICULTY SCALING STATE
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [dynamicSpeedScale, setDynamicSpeedScale] = useState(0);
  
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> SYSTEM_READY']);

  const addLog = (msg: string) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 8));

  // --- SURVIVAL TIMER & AUTO-SCALING ---
  useEffect(() => {
    if (isGameOver) return;
    const timer = setInterval(() => {
      setTimeElapsed(prev => {
        const newTime = prev + 1;
        // Increase difficulty every 60 seconds
        if (newTime % 60 === 0) {
          setDynamicSpeedScale(d => d + 50); 
          addLog('SYSTEM_ALERT: DIFFICULTY_LEVEL_INCREASED');
          playSound('boss'); 
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameOver]);

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    playSound('hit');
    addLog('CRITICAL: CONNECTION_LOST');
    
    const finalReward = score * XP_MULTIPLIER;
    localStorage.setItem('survivor_wallet', (wallet + finalReward).toString());
    
    const currentAvatarXp = Number(localStorage.getItem(`xp_${selectedAvatar}`)) || 0;
    localStorage.setItem(`xp_${selectedAvatar}`, (currentAvatarXp + score).toString());
  }, [score, wallet, XP_MULTIPLIER, selectedAvatar]);

  // Initial Fragment Spawn
  useEffect(() => {
    setFragments(Array.from({ length: 5 }, () => ({ 
      x: Math.floor(Math.random() * 10), 
      y: Math.floor(Math.random() * 10) 
    })));
  }, []);

  // AI Movement Loop (Stalker & Boss)
  useEffect(() => {
    const move = setInterval(() => {
      if (isGameOver || bossStunned) return;
      
      // Standard Enemy AI
      setEnemyPosition(prev => ({
        x: prev.x < playerPosition.x ? prev.x + 1 : prev.x > playerPosition.x ? prev.x - 1 : prev.x,
        y: prev.y < playerPosition.y ? prev.y + 1 : prev.y > playerPosition.y ? prev.y - 1 : prev.y
      }));

      // Boss Pulsing Movement
      if (bossActive) {
        setBossPos(prev => ({
          x: Math.abs(prev.x - playerPosition.x) > 2 ? (prev.x < playerPosition.x ? prev.x + 2 : prev.x - 2) : playerPosition.x,
          y: Math.abs(prev.y - playerPosition.y) > 2 ? (prev.y < playerPosition.y ? prev.y + 2 : prev.y - 2) : playerPosition.y,
        }));
      }
    }, Math.max(200, BASE_SPEED + speedBonus - dynamicSpeedScale)); // Apply dynamic scaling here

    return () => clearInterval(move);
  }, [playerPosition, isGameOver, bossActive, bossStunned, BASE_SPEED, speedBonus, dynamicSpeedScale]);

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
        return n;
      });
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [isGameOver]);

  // Logic: Collisions, Boss Triggers, and Stuns
  useEffect(() => {
    const check = (ax: number, ay: number) => playerPosition.x === ax && playerPosition.y === ay;

    if (score >= 10000 && !bossActive) {
      setBossActive(true);
      playSound('boss');
      addLog('WARNING: BOSS_ENTITY_DETECTED');
    }

    if (check(enemyPosition.x, enemyPosition.y) || (bossActive && check(bossPos.x, bossPos.y))) {
      if (hasShield) {
        setHasShield(false);
        playSound('stun');
        addLog('SHIELD_BURST: SYSTEM_PROTECTED');
        setEnemyPosition({ x: 9, y: 9 });
      } else {
        handleGameOver();
      }
    }

    const fIdx = fragments.findIndex(f => check(f.x, f.y));
    if (fIdx !== -1) {
      setScore(s => s + 100);
      playSound('collect');

      if (bossActive) {
        const next = fragmentStreak + 1;
        setFragmentStreak(next);
        if (next >= 5) {
          setBossStunned(true);
          setFragmentStreak(0);
          playSound('stun');
          addLog('SYSTEM_EXPLOIT: BOSS_FROZEN');
          setTimeout(() => setBossStunned(false), 3000);
        }
      }

      const n = [...fragments];
      n.splice(fIdx, 1);
      n.push({ x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) });
      setFragments(n);
    }
  }, [playerPosition, enemyPosition, bossPos, fragments, hasShield, score, bossActive, bossStunned, fragmentStreak, handleGameOver]);

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'monospace', color: THEME_COLOR, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
      <div>
        <header style={{ display: 'flex', justifyContent: 'space-between', border: `1px solid ${bossActive ? '#ff5f5f' : THEME_COLOR}`, padding: '10px', background: '#0a192f', marginBottom: '10px' }}>
          <span>{bossStunned ? '⚡ VULNERABLE' : (bossActive ? '!! BOSS_ACTIVE !!' : 'STATUS: STABLE')}</span>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.6rem', color: '#8892b0' }}>TIME_SURVIVED</div>
            <div>{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</div>
          </div>
          <span>SCORE: {score}</span>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', border: `2px solid ${bossActive ? '#ff5f5f' : THEME_COLOR}`, background: '#0a192f' }}>
          {Array.from({ length: 100 }).map((_, i) => {
            const x = i % 10, y = Math.floor(i / 10);
            const isP = playerPosition.x === x && playerPosition.y === y;
            const isE = enemyPosition.x === x && enemyPosition.y === y;
            const isB = bossActive && bossPos.x === x && bossPos.y === y;
            const isF = fragments.some(f => f.x === x && f.y === y);

            return (
              <div key={i} style={{ width: '100%', paddingTop: '100%', position: 'relative', border: `1px solid ${isWeekend ? 'rgba(255,204,0,0.05)' : 'rgba(100,255,218,0.05)'}` }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.5rem' }}>
                  {isP ? avatarIcons[selectedAvatar] : 
                   isB ? <span style={{ color: bossStunned ? '#35c9ff' : '#ff5f5f' }}>{bossStunned ? '🔌' : '👾'}</span> : 
                   isE ? '☠' : 
                   isF ? '✧' : ''}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <aside style={{ borderLeft: `1px solid ${isWeekend ? '#ffcc00' : '#112240'}`, paddingLeft: '20px' }}>
        <h3 style={{ color: '#8892b0', fontSize: '0.8rem' }}>SYSLOG</h3>
        {logs.map((log, i) => (
          <p key={i} style={{ fontSize: '0.75rem', color: log.includes('WARNING') || log.includes('CRITICAL') ? '#ff5f5f' : '#4e566d' }}>{log}</p>
        ))}
      </aside>

      {isGameOver && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,25,47,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <h1 style={{ color: '#ff5f5f' }}>CONNECTION_LOST</h1>
          <p style={{ color: '#8892b0' }}>TIME: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')} | SCORE: {score}</p>
          <button onClick={() => window.location.reload()} style={{ padding: '15px 40px', background: THEME_COLOR, color: '#0a192f', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginTop: '20px' }}>REBOOT</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
