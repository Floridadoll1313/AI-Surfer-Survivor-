import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const GRID_SIZE = 10;
  const avatarIcons: Record<string, string> = { ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀' };

  // --- PERSISTENT DATA (Loaded from Disk) ---
  const [wallet, setWallet] = useState(Number(localStorage.getItem('survivor_wallet')) || 0);
  const [energyMax, setEnergyMax] = useState(Number(localStorage.getItem('upgrade_energy')) || 100);
  const [speedMod, setSpeedMod] = useState(Number(localStorage.getItem('upgrade_speed')) || 0);
  const [hasShield, setHasShield] = useState(localStorage.getItem('survivor_shield_active') === 'true');

  // --- SESSION DATA (Game State) ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{x: number, y: number}[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [score, setScore] = useState(0);
  const [energy, setEnergy] = useState(energyMax);
  const [combo, setCombo] = useState(1);
  const [comboTimer, setComboTimer] = useState(0);
  
  // --- UI & ENGINE STATE ---
  const [isGameOver, setIsGameOver] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [isInvisible, setIsInvisible] = useState(false);

  // --- PERSISTENCE HELPERS ---
  const saveToWallet = (amount: number) => {
    const newTotal = wallet + amount;
    setWallet(newTotal);
    localStorage.setItem('survivor_wallet', newTotal.toString());
  };

  const updateShield = (status: boolean) => {
    setHasShield(status);
    localStorage.setItem('survivor_shield_active', status.toString());
  };

  const trackDailyProgress = () => {
    const current = Number(localStorage.getItem('daily_fragments')) || 0;
    localStorage.setItem('daily_fragments', (current + 1).toString());
  };

  // --- AUDIO ENGINE ---
  const playSound = (type: string) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      
      if (type === 'collect') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(440 + (combo * 50), ctx.currentTime);
      } else if (type === 'shield_break') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
      }
      
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) { console.log("Audio blocked by browser."); }
  };

  // --- CORE GAME LOOP ---
  useEffect(() => {
    setFragments(Array.from({ length: 5 }, () => ({ 
      x: Math.floor(Math.random() * GRID_SIZE), 
      y: Math.floor(Math.random() * GRID_SIZE) 
    })));
  }, []);

  useEffect(() => {
    const gameTick = setInterval(() => {
      if (isGameOver || showShop) return;
      // Energy Regen based on Speed Upgrades
      setEnergy(prev => Math.min(prev + (5 + (speedMod * 2)), energyMax));
      // Combo Decay
      setComboTimer(prev => (prev > 0 ? prev - 1 : 0));
      if (comboTimer === 0) setCombo(1);
    }, 1000);
    return () => clearInterval(gameTick);
  }, [isGameOver, showShop, energyMax, speedMod, comboTimer]);

  // --- INPUT & ABILITIES ---
  const triggerAbility = useCallback(() => {
    if (energy < 40 || isGameOver || showShop) return;
    setEnergy(e => e - 40);
    if (selectedAvatar === 'runner') setPlayerPosition(p => ({ ...p, x: Math.min(p.x + 2, GRID_SIZE - 1) }));
    else if (selectedAvatar === 'ghost') { setIsInvisible(true); setTimeout(() => setIsInvisible(false), 3000); }
    else
