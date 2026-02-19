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

  const playSound = (type: 'collect' | 'error' | 'ability' | 'boss') => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);

    if (type === 'boss') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 1);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      osc.start(); osc.stop(ctx.currentTime + 1);
    } else if (type === 'collect') {
      osc.type = 'square'; osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.start(); osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'error') {
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(100, ctx.currentTime);
      osc.start(); osc.stop(ctx.currentTime + 0.5);
    }
  };

  const buyUpgrade = (type: 'energy' | 'speed') => {
    const cost = 1000;
    if (wallet < cost) return;
    const newWallet = wallet - cost;
    setWallet(newWallet);
    localStorage.setItem('survivor_wallet', newWallet.toString());
    if (type === 'energy') {
      setEnergyMax(prev => prev + 20);
      localStorage.setItem('upgrade_energy', (energyMax + 20).toString());
    } else {
      setSpeedMod(prev => prev + 1);
      localStorage.setItem('upgrade_speed', (speedMod + 1).toString());
    }
  };

  useEffect(() => {
    setFragments(Array.from({ length: 5 }, () => ({
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    })));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setEnergy(prev => Math.min(prev + (5 + speedMod), energyMax)), 1000);
    return () => clearInterval(timer);
  }, [energyMax, speedMod]);

  // Boss Spawn Logic
  useEffect(() => {
    if (level >= 5 && !bossPosition) {
      setBossPosition({ x: 0, y: 9 });
      playSound('boss');
    }
  }, [level, bossPosition]);

  // Boss Movement (Jump logic)
  useEffect(() => {
    if (isGameOver || !bossPosition) return;
    const bossMove = setInterval(() => {
      setBossPosition(prev => {
        if (!prev) return null;
        let nx = prev.x, ny = prev.y;
        // Boss moves 2 spaces toward player
        if (nx < playerPosition.x) nx = Math.min(nx + 2, GRID_SIZE - 1);
        else if (nx > playerPosition.x) nx = Math.max(nx - 2, 0);
        if (ny < playerPosition.y) ny = Math.min(ny + 2, GRID_SIZE - 1);
        else if (ny > playerPosition.y) ny = Math.max(ny - 2, 0);
        return { x: nx, y: ny };
      });
    }, 2500);
    return () => clearInterval(bossMove);
  }, [bossPosition, playerPosition, isGameOver]);

  const triggerAbility = useCallback(() => {
    if (energy < 40 || isGameOver || showShop) return;
    setEnergy(prev => prev - 40);
    if (selectedAvatar === 'runner') setPlayerPosition(prev => ({ ...prev, x: Math.min(prev.x + 2, GRID_SIZE - 1) }));
    else if (selectedAvatar === 'ghost') { setIsInvisible(true); setTimeout(() => setIsInvisible(false), 3000); }
    else if (selectedAvatar === 'void') setPlayerPosition({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
    else if (selectedAvatar === 'surfer') setEnemyPosition({ x: 9, y: 9 });
  }, [energy, isGameOver, selectedAvatar, showShop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver || showShop) return;
      if (e.code === 'Space') triggerAbility();
      setPlayerPosition(prev => {
        const newPos =
