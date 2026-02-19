import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  
  const GRID_SIZE = 10;
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{x: number, y: number}[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [bossPosition, setBossPosition] = useState<{x: number, y: number} | null>(null);
  const [score, setScore] = useState(0);
  const [wallet, setWallet] = useState(Number(localStorage.getItem('survivor_wallet')) || 0);
  const [highScore, setHighScore] = useState(Number(localStorage.getItem('survivor_high_score')) || 0);
  
  // Upgrades
  const [energyMax, setEnergyMax] = useState(Number(localStorage.getItem('upgrade_energy')) || 100);
  const [energy, setEnergy] = useState(energyMax);
  const [speedMod, setSpeedMod] = useState(Number(localStorage.getItem('upgrade_speed')) || 0);
  const [hasShield, setHasShield] = useState(false);

  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isInvisible, setIsInvisible] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [showShop, setShowShop] = useState(false);

  const avatarIcons: Record<string, string> = {
    ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀'
  };

  const playSound = (type: 'collect' | 'error' | 'ability' | 'boss' | 'shield_break') => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);

    if (type === 'shield_break') {
      osc.type = 'sine'; osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.2, ctx.currentTime); osc.start(); osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'collect') {
      osc.type = 'square'; osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.start(); osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'error') {
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(100, ctx.currentTime);
      osc.start(); osc.stop(ctx.currentTime + 0.5);
    }
  };

  const buyUpgrade = (type: 'energy' | 'speed' | 'shield') => {
    const costs = { energy: 1000, speed: 1000, shield: 1500 };
    if (wallet < costs[type]) return;

    const newWallet = wallet - costs[type];
    setWallet(newWallet);
    localStorage.setItem('survivor_wallet', newWallet.
