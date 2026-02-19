import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  
  // Game State
  const GRID_SIZE = 10;
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{x: number, y: number}[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [score, setScore] = useState(0); // Current Run Score
  const [wallet, setWallet] = useState(Number(localStorage.getItem('survivor_wallet')) || 0); // Spendable XP
  const [highScore, setHighScore] = useState(Number(localStorage.getItem('survivor_high_score')) || 0);
  
  // Upgradable Stats
  const [energyMax, setEnergyMax] = useState(Number(localStorage.getItem('upgrade_energy')) || 100);
  const [energy, setEnergy] = useState(energyMax);
  const [speedMod, setSpeedMod] = useState(Number(localStorage.getItem('upgrade_speed')) || 0);

  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isInvisible, setIsInvisible] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [showShop, setShowShop] = useState(false);

  const avatarIcons: Record<string, string> = {
    ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀'
  };

  // --- SOUND ENGINE ---
  const playSound = (type: 'collect' | 'error' | 'ability' | 'glitch' | 'buy') => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);

    if (type === 'collect') {
      osc.type = 'square'; osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime); osc.start(); osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'buy') {
      osc.type = 'triangle'; osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.setValueAtTime(800, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime); osc.start(); osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'error') {
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(100, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime); osc.start(); osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'ability') {
      osc.type = 'sine'; osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime); osc.start(); osc.stop(ctx.currentTime + 0.2);
    }
  };

  // Upgrades Logic
  const buyUpgrade = (type: 'energy' | 'speed') => {
    const cost = 1000;
    if (wallet < cost) return;

    playSound('buy');
    const newWallet = wallet - cost;
    setWallet(newWallet);
    localStorage.setItem('survivor_wallet', newWallet.toString());

    if (type === 'energy') {
      const newVal = energyMax + 20;
      setEnergyMax(newVal);
      localStorage.setItem('upgrade_energy', newVal.toString());
    } else {
      const newVal = speedMod + 1;
      setSpeedMod(newVal);
      localStorage.setItem('upgrade_speed', newVal.toString());
    }
  };

  // Initial Fragments
  useEffect(() => {
    setFragments(Array.from({ length: 5 }, () => ({
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    })));
  }, []);

  // Energy Recharge
  useEffect(() => {
    const timer = setInterval(() => setEnergy(prev => Math.min(prev + (5 + speedMod), energyMax)), 1000);
    return () => clearInterval(timer);
  }, [energyMax, speedMod]);

  const triggerAbility = useCallback(() => {
    if (energy < 40 || isGameOver || showShop) return;
    playSound('ability');
    setEnergy(prev => prev - 40);
    if (selectedAvatar === 'runner') setPlayerPosition(prev => ({ ...prev, x: Math.min(prev.x +
