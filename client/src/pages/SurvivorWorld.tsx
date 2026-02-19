import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { getLevelInfo } from '../data/leveling';
import { playSound } from '../utils/audio';
import { SKILLS } from '../data/skills';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const { speedBonus } = getLevelInfo(selectedAvatar);
  const currentSkill = SKILLS[selectedAvatar] || SKILLS.runner;
  
  const GRID_SIZE = 10;
  const avatarIcons: Record<string, string> = { ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀' };

  // --- THEME & DIFFICULTY ---
  const isWeekend = [0, 6].includes(new Date().getDay());
  const THEME_COLOR = isWeekend ? '#ffcc00' : '#64ffda'; 
  const isHardMode = localStorage.getItem('hard_mode_enabled') === 'true';
  const BASE_SPEED = isHardMode ? 400 : 1000;
  const XP_MULTIPLIER = (isHardMode ? 3 : 1) * (isWeekend ? 2 : 1);

  // --- SESSION STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{x: number, y: number}[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> NEURAL_LINK_ESTABLISHED']);

  // --- ABILITY & COOLDOWN STATE ---
  const [abilityActive, setAbilityActive] = useState(false);
  const [onCooldown, setOnCooldown] = useState(false);
  const [cooldownPercent, setCooldownPercent] = useState(0);

  const addLog = (msg: string) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 8));

  // --- ABILITY TRIGGER ---
  const triggerAbility = useCallback(() => {
    if (onCooldown || isGameOver) return;

    setOnCooldown(true);
    setCooldownPercent(100);
    playSound('stun');
    addLog(`ACTIVATING: ${currentSkill.name}`);

    // Skill Logic
    if (currentSkill.id === 'dash') {
      // Dash logic is integrated into movement; we just set a short burst state
      setAbilityActive(true);
      setTimeout(() => setAbilityActive(false), 200);
    } else if (currentSkill.duration) {
      setAbilityActive(true);
      setTimeout(() => setAbilityActive(false), currentSkill.duration);
    }

    if (currentSkill.id === 'singularity') {
      setFragments(prev => prev.map(f => {
        if (Math.abs(f.x - playerPosition.x) <= 3 && Math.abs(f.y - playerPosition.y) <= 3) {
          return { x: playerPosition.x, y: playerPosition.y };
        }
        return f;
      }));
    }

    // Cooldown Timer
    const start = Date.now();
    const cdInterval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / currentSkill.cooldown) * 100);
      setCooldownPercent(remaining);

      if (elapsed >= currentSkill.cooldown) {
        clearInterval(cdInterval);
        setOnCooldown(false);
        addLog(`READY: ${currentSkill.name}`);
      }
    }, 50);
  }, [onCooldown, isGameOver, currentSkill, playerPosition]);

  // AI Movement
  useEffect(() => {
    const move = setInterval(() => {
      if (isGameOver) return;
      
      const isSlowed = currentSkill.id === 'flow' && abilityActive;
      const speed = (BASE_SPEED + speedBonus) * (isSlowed ? 2 : 1);

      setEnemyPosition(prev => ({
        x: prev.x < playerPosition.x ? prev.x + 1 : prev.x > playerPosition.x ? prev.x - 1 : prev.x,
        y: prev.y < playerPosition.y ? prev.y + 1 : prev.y > playerPosition.y ? prev.y - 1 : prev.y
      }));
    }, Math.max(200, BASE_SPEED + speedBonus));
    return () => clearInterval(move);
  }, [playerPosition, isGameOver, abilityActive, currentSkill.id]);

  // Movement & Ability Listener
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (isGameOver) return;
      if (e.code === 'Space') triggerAbility();

      setPlayerPosition(p => {
        const n = { ...p };
        const moveDist = (currentSkill.id === 'dash' && abilityActive) ? 2 : 1;

        if (e.key === 'ArrowUp' && p.y >= moveDist) n.y -= moveDist;
        if (e.key === 'ArrowDown' && p.y <= 9 - moveDist) n.y += moveDist;
        if (e.key === 'ArrowLeft' && p.x >= moveDist) n.x -= moveDist;
        if (e.key === 'ArrowRight' && p.x <= 9 - moveDist) n.x += moveDist;
        return n;
      });
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [isGameOver, triggerAbility, abilityActive, currentSkill.id]);

  // Collisions & Fragments
  useEffect(() => {
    const check = (ax: number, ay: number) => playerPosition.x === ax && playerPosition.y === ay;
    const isInvulnerable = currentSkill.id === 'phase' && abilityActive;

    if (check(enemyPosition.x, enemyPosition.y) && !isInvulnerable) {
      playSound('hit');
      setIsGameOver(true);
      const reward = score * XP_MULTIPLIER;
      const wallet = Number(localStorage.getItem('survivor_wallet')) || 0;
      localStorage.setItem('survivor_wallet', (wallet + reward).toString());
    }

    const fIdx = fragments.findIndex(f => check(f.x, f.y));
    if (fIdx !== -1) {
      setScore(s => s + 100);
      playSound('collect');
      const n = [...fragments];
      n.splice(fIdx, 1);
      n.push({ x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) });
      setFragments(n);
    }
  }, [playerPosition, enemyPosition, fragments, abilityActive, currentSkill.id, score, XP_MULTIPLIER]);

  useEffect(() => {
    setFragments(Array.from({ length: 5 }, () => ({ x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) })));
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'monospace', color: THEME_COLOR, backgroundColor: '#0a192f', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: `1px solid ${THEME_COLOR}`, paddingBottom: '10px' }}>
        <div>
            <h2 style={{ margin: 0 }}>SCORE: {score}</h2>
            <small style={{ color: '#8892b0' }}>{onCooldown ? 'RECHARGING...' : 'SPACE_READY'}</small>
        </div>
        <div style={{ width: '200px', height: '10px', background: '#112240', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ width: `${cooldownPercent}%`, height: '100%', background: onCooldown ? '#ff5f5f' : THEME_COLOR, transition: 'width 0.1s linear' }} />
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', border: `2px solid ${abilityActive ? '#fff' : THEME_COLOR}`, background: '#0a192f', position: 'relative' }}>
          {Array.from({ length: 100 }).map((_, i) => {
            const x = i % 10, y = Math.floor(i / 10);
            const isP = playerPosition.x === x && playerPosition.y === y;
            const isE = enemyPosition.x === x && enemyPosition.y === y;
            const isF = fragments.some(f => f.x === x && f.y === y);
            return (
              <div key={i} style={{ width: '100%', paddingTop: '100%', position: 'relative', border: '1px solid rgba(100,255,218,0.05)' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.5rem' }}>
                  {isP ? (
                      <span style={{ 
                        filter: abilityActive ? 'drop-shadow(0 0 10px #fff)' : 'none',
                        opacity: (currentSkill.id === 'phase' && abilityActive) ? 0.4 : 1 
                      }}>
                        {avatarIcons[selectedAvatar]}
                      </span>
                  ) : isE ? <span style={{ color: '#ff5f5f' }}>☠</span> : isF ? '✧' : ''}
                </div>
              </div>
            );
          })}
      </div>

      <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ padding: '15px', border: '1px solid #112240', background: 'rgba(17, 34, 64, 0.5)' }}>
              <h4 style={{ margin: '0 0 5px', color: '#8892b0', fontSize: '0.7rem' }}>ACTIVE_SKILL</h4>
              <div style={{ fontWeight: 'bold' }}>{currentSkill.name}</div>
              <p style={{ fontSize: '0.7rem', margin: '5px 0 0' }}>{currentSkill.description}</p>
          </div>
          <div style={{ padding: '15px', border: '1px solid #112240', textAlign: 'left' }}>
              {logs.map((log, i) => (
                  <div key={i} style={{ fontSize: '0.65rem', color: i === 0 ? THEME_COLOR : '#4e566d' }}>{log}</div>
              ))}
          </div>
      </div>

      {isGameOver && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10, 25, 47, 0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <h1 style={{ color: '#ff5f5f' }}>CONNECTION_LOST</h1>
          <button onClick={() => window.location.reload()} style={{ padding: '15px 40px', background: THEME_COLOR, color: '#0a192f', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>REBOOT</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
