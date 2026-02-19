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
  const avatarIcons: Record<string, string> = { ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀' };

  // --- SESSION STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{x: number, y: number}[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [lastCollectTime, setLastCollectTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> SIMULATION_LOADED']);
  const [copyFeedback, setCopyFeedback] = useState('SHARE_SCORE');

  // --- TUTORIAL & ABILITY STATE ---
  const [showTutorial, setShowTutorial] = useState(!localStorage.getItem('survivor_tutorial_seen'));
  const [abilityActive, setAbilityActive] = useState(false);
  const [onCooldown, setOnCooldown] = useState(false);
  const [cooldownPercent, setCooldownPercent] = useState(0);

  const addLog = (msg: string) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 6));

  const closeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('survivor_tutorial_seen', 'true');
    addLog('SYSTEM_ONLINE: GOOD_LUCK');
  };

  // --- ABILITY ENGINE ---
  const triggerAbility = useCallback(() => {
    if (onCooldown || isGameOver || showTutorial) return;
    
    setOnCooldown(true);
    setCooldownPercent(100);
    playSound('stun');
    addLog(`SKILL_UP: ${currentSkill.name}`);

    if (currentSkill.id === 'dash') {
      setAbilityActive(true);
      setTimeout(() => setAbilityActive(false), 200);
    } else if (currentSkill.duration) {
      setAbilityActive(true);
      setTimeout(() => setAbilityActive(false), currentSkill.duration);
    }

    if (currentSkill.id === 'singularity') {
        setFragments(prev => prev.map(f => (Math.abs(f.x - playerPosition.x) <= 3 && Math.abs(f.y - playerPosition.y) <= 3) ? { x: playerPosition.x, y: playerPosition.y } : f));
    }

    const start = Date.now();
    const cdInt = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / currentSkill.cooldown) * 100);
      setCooldownPercent(remaining);
      if (elapsed >= currentSkill.cooldown) {
        clearInterval(cdInt);
        setOnCooldown(false);
        addLog(`READY: ${currentSkill.name}`);
      }
    }, 50);
  }, [onCooldown, isGameOver, showTutorial, currentSkill, playerPosition]);

  // --- AI MOVEMENT ---
  useEffect(() => {
    if (isGameOver || showTutorial) return;
    const move = setInterval(() => {
      const isSlowed = currentSkill.id === 'flow' && abilityActive;
      setEnemyPosition(prev => ({
        x: prev.x < playerPosition.x ? prev.x + 1 : prev.x > playerPosition.x ? prev.x - 1 : prev.x,
        y: prev.y < playerPosition.y ? prev.y + 1 : prev.y > playerPosition.y ? prev.y - 1 : prev.y
      }));
    }, Math.max(300, 1000 + speedBonus - (isSlowed ? -500 : 0)));
    return () => clearInterval(move);
  }, [playerPosition, isGameOver, showTutorial, speedBonus, abilityActive, currentSkill.id]);

  // --- INPUT LISTENER ---
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (isGameOver || showTutorial) return;
      if (e.code === 'Space') triggerAbility();
      setPlayerPosition(p => {
        const n = { ...p };
        const d = (currentSkill.id === 'dash' && abilityActive) ? 2 : 1;
        if (e.key === 'ArrowUp' && p.y >= d) n.y -= d;
        if (e.key === 'ArrowDown' && p.y <= 9 - d) n.y += d;
        if (e.key === 'ArrowLeft' && p.x >= d) n.x -= d;
        if (e.key === 'ArrowRight' && p.x <= 9 - d) n.x += d;
        return n;
      });
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [isGameOver, showTutorial, triggerAbility, abilityActive, currentSkill.id]);

  // --- GAME LOGIC (Collisions & Combos) ---
  useEffect(() => {
    if (showTutorial || isGameOver) return;
    const check = (ax: number, ay: number) => playerPosition.x === ax && playerPosition.y === ay;
    
    // Death Check
    const isInvulnerable = currentSkill.id === 'phase' && abilityActive;
    if (check(enemyPosition.x, enemyPosition.y) && !isInvulnerable) {
      setIsGameOver(true);
      playSound('hit');
      // Save Score to Leaderboard & Wallet
      const reward = score * (isWeekend ? 2 : 1);
      const wallet = Number(localStorage.getItem('survivor_wallet')) || 0;
      localStorage.setItem('survivor_wallet', (wallet + reward).toString());
    }

    // Collection Check
    const fIdx = fragments.findIndex(f => check(f.x, f.y));
    if (fIdx !== -1) {
      const now = Date.now();
      const newCombo = now - lastCollectTime < 2000 ? Math.min(combo + 1, 5) : 1;
      setCombo(newCombo);
      setLastCollectTime(now);
      setScore(s => s + (100 * newCombo));
      playSound('collect');
      
      const n = [...fragments];
      n.splice(fIdx, 1);
      n.push({ x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) });
      setFragments(n);
    }
  }, [playerPosition, enemyPosition, fragments, showTutorial, isGameOver, abilityActive, currentSkill.id, combo, lastCollectTime, score, isWeekend]);

  useEffect(() => {
    setFragments(Array.from({ length: 5 }, () => ({ x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) })));
  }, []);

  const handleShare = () => {
    const card = generateCyberCard(score, combo, selectedAvatar);
    navigator.clipboard.writeText(card);
    setCopyFeedback('COPIED_TO_CLIPBOARD!');
    setTimeout(() => setCopyFeedback('SHARE_SCORE'), 2000);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'monospace', color: THEME_COLOR, backgroundColor: '#0a192f', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', borderBottom: `1px solid ${THEME_COLOR}`, paddingBottom: '10px' }}>
        <div>
            <h2 style={{ margin: 0 }}>SCORE: {score}</h2>
            <div style={{ color: combo > 1 ? '#ffcc00' : '#8892b0', fontSize: '0.8rem' }}>COMBO: {combo}x</div>
        </div>
        <div style={{ width: '200px', height: '10px', background: '#112240', borderRadius: '5px', alignSelf: 'center' }}>
            <div style={{ width: `${cooldownPercent}%`, height: '100%', background: onCooldown ? '#ff5f5f' : THEME_COLOR, transition: 'width 0.1s linear' }} />
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', border: `2px solid ${abilityActive ? '#fff' : THEME_COLOR}`, background: '#0a192f' }}>
        {Array.from({ length: 100 }).map((_, i) => {
          const x = i % 10, y = Math.floor(i / 10);
          const isP = playerPosition.x === x && playerPosition.y === y;
          const isE = enemyPosition.x === x && enemyPosition.y === y;
          const isF = fragments.some(f => f.x === x && f.y === y);
          return (
            <div key={i} style={{ width: '100%', paddingTop: '100%', position: 'relative', border: '1px solid rgba(100,255,218,0.05)' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.2rem' }}>
                {isP ? <span style={{ opacity: (currentSkill.id === 'phase' && abilityActive) ? 0.4 : 1 }}>{avatarIcons[selectedAvatar]}</span> : isE ? <span style={{ color: '#ff5f5f' }}>☠</span> : isF ? '✧' : ''}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ padding: '15px', border: '1px solid #112240', background: 'rgba(17, 34, 64, 0.5)' }}>
              <div style={{ fontWeight: 'bold' }}>{currentSkill.name}</div>
              <p style={{ fontSize: '0.7rem', margin: '5px 0 0', color: '#8892b0' }}>{currentSkill.description}</p>
          </div>
          <div style={{ padding: '15px', border: '1px solid #112240', textAlign: 'left' }}>
              {logs.map((log, i) => <div key={i} style={{ fontSize: '0.65rem', color: i === 0 ? THEME_COLOR : '#4e566d' }}>{log}</div>)}
          </div>
      </div>

      {showTutorial && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,25,47,0.95)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ border: `1px solid ${THEME_COLOR}`, padding: '30px', background: '#0a192f', maxWidth: '400px', textAlign: 'center' }}>
            <h2 style={{ marginTop: 0 }}>&gt; MANUAL_OVERRIDE</h2>
            <ul style={{ textAlign: 'left', fontSize: '0.9rem', color: '#fff' }}>
              <li>ARROWS: Navigate the Grid</li>
              <li>SPACE: Activate {currentSkill.name}</li>
              <li>✧: Collect Data Fragments</li>
              <li>☠: Avoid Neural Corruption</li>
            </ul>
            <button onClick={closeTutorial} style={{ width: '100%', padding: '12px', background: THEME_COLOR, color: '#0a192f', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>INITIALIZE</button>
          </div>
        </div>
      )}

      {isGameOver && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,25,47,0.95)', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ color: '#ff5f5f' }}>CONNECTION_LOST</h1>
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <h2>FINAL_SCORE: {score.toLocaleString()}</h2>
            <p style={{ color: '#8892b0' }}>MAX_COMBO: {combo}x</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={() => window.location.reload()} style={{ padding: '15px 30px', background: THEME_COLOR, border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>REBOOT</button>
            <button onClick={handleShare} style={{ padding: '15px 30px', background: 'none', border: `1px solid ${THEME_COLOR}`, color: THEME_COLOR, cursor: 'pointer' }}>{copyFeedback}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
