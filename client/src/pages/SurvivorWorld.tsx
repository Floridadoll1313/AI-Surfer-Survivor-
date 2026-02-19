import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { getLevelInfo } from '../data/leveling';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const { speedBonus } = getLevelInfo(selectedAvatar);
  
  // --- EVENT LOGIC ---
  const isWeekend = [0, 6].includes(new Date().getDay());
  const EVENT_MULTIPLIER = isWeekend ? 2 : 1;
  const THEME_COLOR = isWeekend ? '#ffcc00' : '#64ffda'; 

  // --- PERSISTENT DATA ---
  const isHardMode = localStorage.getItem('hard_mode_enabled') === 'true';
  const BASE_SPEED = isHardMode ? 400 : 1000;
  const XP_MULTIPLIER = (isHardMode ? 3 : 1) * EVENT_MULTIPLIER;

  const [wallet, setWallet] = useState(Number(localStorage.getItem('survivor_wallet')) || 0);
  const [hasShield, setHasShield] = useState(localStorage.getItem('survivor_shield_active') === 'true');

  // --- SESSION STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{x: number, y: number}[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [bossActive, setBossActive] = useState(false);
  const [bossPos, setBossPos] = useState({ x: 5, y: 5 });
  const [bossStunned, setBossStunned] = useState(false);
  const [fragmentStreak, setFragmentStreak] = useState(0);
  
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [logs, setLogs] = useState<string[]>(isWeekend ? ['> WEEKEND_EVENT_ACTIVE', '> XP_BOOST_ONLINE'] : ['> SYSTEM_READY']);

  const addLog = (msg: string) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 8));

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    addLog('CRITICAL: CONNECTION_LOST');
    const finalReward = score * XP_MULTIPLIER;
    localStorage.setItem('survivor_wallet', (wallet + finalReward).toString());
    
    const currentAvatarXp = Number(localStorage.getItem(`xp_${selectedAvatar}`)) || 0;
    localStorage.setItem(`xp_${selectedAvatar}`, (currentAvatarXp + score).toString());
  }, [score, wallet, XP_MULTIPLIER, selectedAvatar]);

  // Game Loops
  useEffect(() => {
    setFragments(Array.from({ length: 5 }, () => ({ x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) })));
  }, []);

  useEffect(() => {
    const move = setInterval(() => {
      if (isGameOver || bossStunned) return;
      
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

  useEffect(() => {
    const check = (ax: number, ay: number) => playerPosition.x === ax && playerPosition.y === ay;

    if (score >= 10000 && !bossActive) {
      setBossActive(true);
      addLog('WARNING: BOSS_ENTITY_DETECTED');
    }

    if (check(enemyPosition.x, enemyPosition.y) || (bossActive && check(bossPos.x, bossPos.y))) {
      if (hasShield) {
        setHasShield(false);
        addLog('SHIELD_BURST: SYSTEM_PROTECTED');
        setEnemyPosition({ x: 9, y: 9 });
      } else {
        handleGameOver();
      }
    }

    const fIdx = fragments.findIndex(f => check(f.x, f.y));
    if (fIdx !== -1) {
      setScore(s => s + 100);
      if (bossActive) {
        const next = fragmentStreak + 1;
        setFragmentStreak(next);
        if (next >= 5) {
          setBossStunned(true);
          setFragmentStreak(0);
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
          <span>{bossStunned ? '⚡ VULNERABLE' : (bossActive ? '!! BOSS_ENCOUNTER !!' : 'STATUS: STABLE')}</span>
          <span style={{ color: isWeekend ? '#ffcc00' : THEME_COLOR }}>SCORE: {score} {isWeekend &&
