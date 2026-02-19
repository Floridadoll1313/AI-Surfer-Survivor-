import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { getLevelInfo } from '../data/leveling';
import { playSound } from '../utils/audio';
import { SKILLS } from '../data/skills';
import { generateCyberCard } from '../utils/sharing';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const { speedBonus } = getLevelInfo(selectedAvatar);
  const currentSkill = SKILLS[selectedAvatar] || SKILLS.runner;

  // --- THEME & PERSISTENCE ---
  const isWeekend = [0, 6].includes(new Date().getDay());
  const THEME_COLOR = isWeekend ? '#ffcc00' : '#64ffda';
  const avatarIcons: Record<string, string> = { 
    ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀' 
  };

  // --- SESSION STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [lastDir, setLastDir] = useState({ dx: 0, dy: 1 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [enemyStunned, setEnemyStunned] = useState(false);
  const [bossPosition, setBossPosition] = useState<{ x: number, y: number } | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(Number(localStorage.getItem('survivor_highscore')) || 0);
  const [energy, setEnergy] = useState(100);
  const [isGameOver, setIsGameOver] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> SIMULATION_LOADED']);

  // --- DIFFICULTY & COMBAT ---
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const enemySpeed = Math.max(250, 1000 - (difficultyLevel * 100));
  const [pulsePos, setPulsePos] = useState<{x: number, y: number} | null>(null);
  
  const isSafeRect = playerPosition.x >= 4 && playerPosition.x <= 5 && 
                     playerPosition.y >= 4 && playerPosition.y <= 5;
  const isPlayerInSafeZone = isSafeRect && energy > 0;

  // --- ABILITY & COOLDOWN ---
  const [abilityActive, setAbilityActive] = useState(false);
  const [onCooldown, setOnCooldown] = useState(false);
  const [cooldownPercent, setCooldownPercent] = useState(0);

  const addLog = (msg: string) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 6));

  // --- WEAPON SYSTEM (PULSE) ---
  const firePulse = useCallback(() => {
    if (pulsePos || isGameOver) return;
    setPulsePos({ x: playerPosition.x + lastDir.dx, y: playerPosition.y + lastDir.dy });
    playSound('shoot');

    setTimeout(() => {
      setPulsePos(prev => {
        if (!prev) return null;
        const hitX = prev.x;
        const hitY = prev.y;
        if (hitX === enemyPosition.x && hitY === enemyPosition.y) {
          setEnemyStunned(true);
          addLog('ENEMY_STUNNED');
          setTimeout(() => setEnemyStunned(false), 2000);
        }
        return null;
      });
    }, 200);
  }, [playerPosition, lastDir, enemyPosition, pulsePos, isGameOver]);

  // --- BOSS & ENEMY LOGIC ---
  useEffect(() => {
    if (score > 0 && score % 500 === 0 && !bossPosition) {
      setBossPosition({ x: 0, y: 9 });
      addLog('!!! BOSS_SENTINEL_DETECTED !!!');
    } else if (bossPosition && score % 500 >= 150) {
      setBossPosition(null);
      addLog('BOSS_SENTINEL_DEFEATED');
    }
  }, [score, bossPosition]);

  useEffect(() => {
    if (isGameOver || isPlayerInSafeZone || enemyStunned) return;
    const moveEnemy = setInterval(() => {
      setEnemyPosition(ep => {
        const edx = playerPosition.x > ep.x ? 1 : playerPosition.x < ep.x ? -1 : 0;
        const edy = playerPosition.y > ep.y ? 1 : playerPosition.y < ep.y ? -1 : 0;
        if (ep.x + edx === playerPosition.x && ep.y + edy === playerPosition.y && !abilityActive) {
          setIsGameOver(true);
        }
        return { x: ep.x + edx, y: ep.y + edy };
      });
    }, enemySpeed);
    return () => clearInterval(moveEnemy);
  }, [playerPosition, enemySpeed, isGameOver, abilityActive, isPlayerInSafeZone, enemyStunned]);

  // --- MOVEMENT ---
  const handleMove = useCallback((dx: number, dy: number) => {
    if (isGameOver) return;
    setLastDir({ dx, dy });
    setPlayerPosition(prev => {
      const newX = Math.max(0, Math.min(9, prev.x + dx));
      const newY = Math.max(0, Math.min(9, prev.y + dy));
      const hitIndex = fragments.findIndex(f => f.x === newX && f.y === newY);
      if (hitIndex !== -1) {
        setScore(s => s + 10);
        setEnergy(e => Math.min(100, e + 20));
        setFragments(f => f.filter((_, i) => i !== hitIndex));
        playSound('collect');
      }
      return { x: newX, y: newY };
    });
  }, [fragments, isGameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'f', 'Enter'].includes(e.key)) e.preventDefault();
      if (e.key === 'ArrowUp') handleMove(0, -1);
      if (e.key === 'ArrowDown') handleMove(0, 1);
      if (e.key === 'ArrowLeft') handleMove(-1, 0);
      if (e.key === 'ArrowRight') handleMove(1, 0);
      if (e.key === ' ') triggerAbility();
      if (e.key.toLowerCase() === 'f' || e.key === 'Enter') firePulse();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove, firePulse]);

  // --- REUSED FRAGMENT SPAWNER & ABILITY LOGIC (Simplified for length) ---
  const triggerAbility = useCallback(() => { /* ... existing ability logic ... */ }, []);
  const spawnFragment = useCallback(() => { /* ... existing spawn logic ... */ }, []);

  return (
    <div className="survivor-world" style={{ borderColor: THEME_COLOR }}>
      <style>{`
        .minimap { position: absolute; right: 10px; bottom: 10px; width: 60px; height: 60px; background: rgba(0,0,0,0.5); border: 1px solid ${THEME_COLOR}; display: grid; grid-template: repeat(10, 1fr) / repeat(10, 1fr); }
        .mini-dot { width: 4px; height: 4px; border-radius: 50%; }
        .pulse-cell { background: ${THEME_COLOR}aa; box-shadow: 0 0 10px ${THEME_COLOR}; }
      `}</style>

      <div className="game-header">
        <div className="stat">SCORE: {score}</div>
        <div className="difficulty-tag">{bossPosition ? 'BOSS ACTIVE' : `LEVEL ${difficultyLevel}`}</div>
      </div>

      <div className="grid-container">
        {[...Array(100)].map((_, i) => {
          const x = i % 10; const y = Math.floor(i / 10);
          const isPlayer = playerPosition.x === x && playerPosition.y === y;
          const isPulse = pulsePos?.x === x && pulsePos?.y === y;
          const isEnemy = enemyPosition.x === x && enemyPosition.y === y;
          const isBoss = bossPosition?.x === x && bossPosition?.y === y;
          
          return (
            <div key={i} className={`cell ${isPulse ? 'pulse-cell' : ''} ${enemyStunned && isEnemy ? 'stunned' : ''}`}>
              {isPlayer && <span style={{ color: THEME_COLOR }}>{avatarIcons[selectedAvatar]}</span>}
              {isEnemy && <span>{enemyStunned ? '💤' : '⚡'}</span>}
              {isBoss && <span>👹</span>}
              {fragments.some(f => f.x === x && f.y === y) && <span>✦</span>}
            </div>
          );
        })}
      </div>

      <div className="minimap">
        <div className="mini-dot" style={{ gridColumn: playerPosition.x + 1, gridRow: playerPosition.y + 1, background: THEME_COLOR }} />
        <div className="mini-dot" style={{ gridColumn: enemyPosition.x + 1, gridRow: enemyPosition.y + 1, background: '#f00' }} />
        {bossPosition && <div className="mini-dot" style={{ gridColumn: bossPosition.x + 1, gridRow: bossPosition.y + 1, background: '#ff0055' }} />}
      </div>

      <div className="console-logs">{logs.map((l, i) => <div key={i}>{l}</div>)}</div>

      {isGameOver && <div className="overlay"><h2>SYSTEM_HALTED</h2><button onClick={() => window.location.reload()}>REBOOT</button></div>}
    </div>
  );
};

export default SurvivorWorld;
