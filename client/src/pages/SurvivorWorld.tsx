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
  const [superFragment, setSuperFragment] = useState<{x: number, y: number} | null>(null);
  const [magnetActive, setMagnetActive] = useState(false);
  
  // ENEMIES
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [corruptorPos, setCorruptorPos] = useState({ x: 0, y: 9 });
  const [isCorrupted, setIsCorrupted] = useState(false);
  const [bossActive, setBossActive] = useState(false);
  const [echoes, setEchoes] = useState<{x: number, y: number}[]>([]);

  // STATS
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [runSpeedBonus, setRunSpeedBonus] = useState(0);
  const [logs, setLogs] = useState<string[]>(['> SYSTEM_INITIALIZED', '> NEURAL_LINK_ESTABLISHED']);

  const addLog = (msg: string) => {
    setLogs(prev => [ `> ${msg}`, ...prev].slice(0, 10));
  };

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    addLog('CRITICAL: CONNECTION_TERMINATED');
    const reward = score * XP_MULTIPLIER;
    localStorage.setItem('survivor_wallet', (wallet + reward).toString());
  }, [score, wallet, XP_MULTIPLIER]);

  // --- GAME ENGINE ---
  useEffect(() => {
    setFragments(Array.from({ length: 5 }, () => ({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) })));
  }, []);

  // Movement Logic (Supports Input Inversion)
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (isGameOver) return;
      setPlayerPosition(p => {
        const n = { ...p };
        let key = e.key;
        if (isCorrupted) {
          const opposites: any = { ArrowUp: 'ArrowDown', ArrowDown: 'ArrowUp', ArrowLeft: 'ArrowRight', ArrowRight: 'ArrowLeft' };
          key = opposites[key] || key;
        }

        if (key === 'ArrowUp' && p.y > 0) n.y -= 1;
        if (key === 'ArrowDown' && p.y < GRID_SIZE - 1) n.y += 1;
        if (key === 'ArrowLeft' && p.x > 0) n.x -= 1;
        if (key === 'ArrowRight' && p.x < GRID_SIZE - 1) n.x += 1;
        
        if (n.x !== p.x || n.y !== p.y) setTrail(prev => [p, ...prev].slice(0, 3));
        return n;
      });
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [isGameOver, isCorrupted]);

  // AI & Magnet Logic Loop
  useEffect(() => {
    const move = setInterval(() => {
      if (isGameOver) return;
      const step = (pos: {x: number, y: number}) => ({
        x: pos.x < playerPosition.x ? pos.x + 1 : pos.x > playerPosition.x ? pos.x - 1 : pos.x,
        y: pos.y < playerPosition.y ? pos.y + 1 : pos.y > playerPosition.y ? pos.y - 1 : pos.y
      });
      
      setEnemyPosition(prev => step(prev));
      setCorruptorPos(prev => step(prev));
      if (bossActive) setEchoes(prev => prev.map(e => step(e)));

      // Magnet Effect: Pull fragments one step closer
      if (magnetActive) {
        setFragments(prev => prev.map(f => ({
          x: f.x < playerPosition.x ? f.x + 1 : f.x > playerPosition.x ? f.x - 1 : f.x,
          y: f.y < playerPosition.y ? f.y + 1 : f.y > playerPosition.y ? f.y - 1 : f.y
        })));
      }
    }, BASE_SPEED - runSpeedBonus);
    return () => clearInterval(move);
  }, [playerPosition, isGameOver, bossActive, BASE_SPEED, runSpeedBonus, magnetActive]);

  // Collisions & Triggers
  useEffect(() => {
    const check = (ax: number, ay: number) => playerPosition.x === ax && playerPosition.y === ay;

    // Malware Hit
    if (check(corruptorPos.x, corruptorPos.y) && !isCorrupted) {
      setIsCorrupted(true);
      addLog('WARNING: LOGIC_CORRUPTION_DETECTED');
      setTimeout(() => setIsCorrupted(false), 5000);
    }

    // Death Hit
    if (check(enemyPosition.x, enemyPosition.y) || echoes.some(e => check(e.x, e.y))) {
      if (hasShield) {
        setHasShield(false);
        addLog('SHIELD_OFFLINE: ENEMY_REPELLED');
        setEnemyPosition({ x: 9, y: 9 });
      } else {
        handleGameOver();
      }
    }

    // Collection
    const fIdx = fragments.findIndex(f => check(f.x, f.y));
    if (fIdx !== -1) {
      const gain = 100 * combo;
      setScore(s => s + gain);
      addLog(`DATA_RECOVERED: +${gain}XP`);
      
      if (score > 0 && score % 2000 === 0) {
        setMagnetActive(true);
        addLog('POWERUP: MAGNET_PROTOCOL_ACTIVE');
        setTimeout(() => setMagnetActive(false), 8000);
      }

      const n = [...fragments];
      n.splice(fIdx, 1);
      n.push({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
      setFragments(n);
    }
  }, [playerPosition, enemyPosition, corruptorPos, echoes, fragments, hasShield, isCorrupted, combo, score, handleGameOver]);

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'monospace', color: '#64ffda', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
      
      {/* LEFT: GAME VIEW */}
      <section>
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', border: '1px solid #35c9ff', background: '#0a192f', marginBottom: '10px' }}>
          <span style={{ color: isCorrupted ? '#ffcc00' : '#64ffda' }}>{isCorrupted ? '[!] INVERTED' : 'SYSTEM_OK'}</span>
          <span>SCORE: {score}</span>
          <span style={{ color: '#35c9ff' }}>X{combo}</span>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', border: '2px solid #35c9ff', background: '#0a192f', boxShadow: magnetActive ? '0 0 20px #35c9ff' : 'none' }}>
          {Array.from({ length: 100 }).map((_, i) => {
            const x = i % 10, y = Math.floor(i / 10);
            const isP = playerPosition.x === x && playerPosition.y === y;
            const isE = enemyPosition.x === x && enemyPosition.y === y;
            const isC = corruptorPos.x === x && corruptorPos.y === y;
            const isF = fragments.some(f => f.x === x && f.y === y);
            const tIdx = trail.findIndex(t => t.x === x && t.y === y);

            return (
              <div key={i} style={{ width: '100%', paddingTop: '100%', position: 'relative', border: '1px solid rgba(53,201,255,0.1)' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.2rem' }}>
                  {isP ? avatarIcons[selectedAvatar] : 
                   isE ? '☠' : 
                   isC ? <span style={{ color: '#ffcc00' }}>👾</span> :
                   isF ? <span style={{ color: magnetActive ? '#35c9ff' : '#64ffda' }}>✧</span> :
                   tIdx !== -1 ? <span style={{ opacity: 0.4 - tIdx * 0.1 }}>{avatarIcons[selectedAvatar]}</span> : ''}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* RIGHT: TERMINAL */}
      <aside style={{ borderLeft: '1px solid #112240', paddingLeft: '20px', textAlign: 'left' }}>
        <h2 style={{ fontSize: '0.9rem', color: '#8892b0', borderBottom: '1px solid #112240', paddingBottom: '10px' }}>&gt; RUN_LOG</h2>
        <div style={{ height: '400px', overflow: 'hidden' }}>
          {logs.map((log, i) => (
            <p key={i} style={{ margin: '4px 0', fontSize: '0.75rem', color: log.includes('WARNING') ? '#ffcc00' : (i === 0 ? '#64ffda' : '#4e566d') }}>
              {log}
            </p>
          ))}
        </div>
      </aside>

      {isGameOver && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,25,47,0.98)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <h1 style={{ color: '#ff5f5f' }}>CONNECTION_LOST</h1>
          <p style={{ fontSize: '1.5rem' }}>TOTAL_XP: {score * XP_MULTIPLIER}</p>
          <button onClick={() => window.location.reload()} style={{ padding: '15px 40px', background: '#64ffda', color: '#0a192f', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}>REBOOT</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
