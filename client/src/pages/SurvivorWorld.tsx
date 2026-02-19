import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const GRID_SIZE = 10;
  const avatarIcons: Record<string, string> = { ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀' };

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
  const [echoes, setEchoes] = useState<{x: number, y: number}[]>([]); // Boss minions
  
  const [score, setScore] = useState(0);
  const [energy, setEnergy] = useState(energyMax);
  const [combo, setCombo] = useState(1);
  const [comboTimer, setComboTimer] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [isInvisible, setIsInvisible] = useState(false);

  // --- PERSISTENCE WRAPPERS ---
  const saveWallet = (val: number) => {
    setWallet(val);
    localStorage.setItem('survivor_wallet', val.toString());
  };

  const updateShieldStatus = (status: boolean) => {
    setHasShield(status);
    localStorage.setItem('survivor_shield_active', status.toString());
  };

  const updateDailyProgress = () => {
    const current = Number(localStorage.getItem('daily_fragments')) || 0;
    localStorage.setItem('daily_fragments', (current + 1).toString());
  };

  // --- AUDIO ---
  const playSound = (type: string) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      osc.frequency.setValueAtTime(type === 'collect' ? 440 + (combo * 50) : type === 'boss' ? 100 : 150, ctx.currentTime);
      if (type === 'boss') osc.type = 'sawtooth';
      osc.start(); osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  };

  // --- CORE GAME LOOP ---
  useEffect(() => {
    setFragments(Array.from({ length:
