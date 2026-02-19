import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const GRID_SIZE = 10;
  const avatarIcons: Record<string, string> = { ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀' };

  // --- POSITIONS & SCORING ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{x: number, y: number}[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [bossPosition, setBossPosition] = useState<{x: number, y: number} | null>(null);
  const [score, setScore] = useState(0);
  const [wallet, setWallet] = useState(Number(localStorage.getItem('survivor_wallet')) || 0);
  
  // --- STATS & COMBOS ---
  const [energyMax, setEnergyMax] = useState(Number(localStorage.getItem('upgrade_energy')) || 100);
  const [energy, setEnergy] = useState(energyMax);
  const [hasShield, setHasShield] = useState(false);
  const [combo, setCombo] = useState(1);
  const [comboTimer, setComboTimer] = useState(0);

  // --- EVENTS & UI ---
  const [level, setLevel] = useState(1);
  const [anomaly, setAnomaly] = useState<{ name: string; type: string } | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [isInvisible, setIsInvisible] = useState(false);

  // --- AUDIO ENGINE ---
  const playSound = (type: string) => {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    if (type === 'collect') { osc.type = 'square'; osc.frequency.setValueAtTime(440 + (combo * 40), ctx.currentTime); }
    if (type === 'shield_break') { osc.type = 'sine'; osc.frequency.setValueAtTime(800, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3); }
    osc.start(); osc.stop(ctx.currentTime + 0.2);
  };

  // --- GAME INITIALIZATION ---
  useEffect(() => {
    setFragments(Array.from({ length: 5 }, () => ({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) })));
  }, []);

  // --- INPUT HANDLING ---
  const triggerAbility = useCallback(() => {
    if (energy < 40 || isGameOver) return;
    setEnergy(e => e - 40);
    if (selectedAvatar === 'runner') setPlayerPosition(p => ({ ...p, x: Math.min(p.x + 2, GRID_SIZE - 1) }));
    else if (selectedAvatar === 'ghost') { setIsInvisible(true); setTimeout(() => setIsInvisible(false), 3000); }
    else if (selectedAvatar === 'void') setPlayerPosition({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
    else setEnemyPosition({ x: 9, y: 9 });
  }, [energy, isGameOver, selectedAvatar]);

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (isGameOver || showShop) return;
      if (e.code === 'Space') triggerAbility();
      setPlayerPosition(p => {
        const n = { ...p };
        if (e.key === 'ArrowUp' && p.y > 0) n.y -= 1;
        if (e.key === 'ArrowDown' && p.y < GRID_SIZE - 1) n.y += 1;
        if (e.key === 'ArrowLeft' && p.x > 0) n.x -= 1;
        if (e.key === 'ArrowRight' && p.x < GRID_SIZE - 1) n.x += 1;
        return n;
      });
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [isGameOver, showShop, triggerAbility]);

  // --- COLLISION & GAME OVER ---
  useEffect(() => {
    const hitEnemy = playerPosition.x === enemyPosition.x && playerPosition.y === enemyPosition.y;
    const hitBoss = bossPosition && playerPosition.x === bossPosition.x && playerPosition.y === bossPosition.y;

    if ((hitEnemy || hitBoss) && !isInvisible) {
      if (hasShield) { setHasShield(false); playSound('shield_break'); setEnemyPosition({ x: 9, y: 9 }); }
      else { 
        setIsGameOver(true); 
        localStorage.setItem('survivor_wallet', (wallet + score).toString()); 
      }
