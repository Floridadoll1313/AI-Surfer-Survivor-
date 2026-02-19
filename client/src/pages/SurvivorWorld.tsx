import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  
  const GRID_SIZE = 10;
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{x: number, y: number}[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [score, setScore] = useState(0);
  const [wallet, setWallet] = useState(Number(localStorage.getItem('survivor_wallet')) || 0);
  
  // Anomaly State
  const [anomaly, setAnomaly] = useState<{ name: string; type: string } | null>(null);
  const [anomalyTimer, setAnomalyTimer] = useState(0);

  // Combo & Stats
  const [combo, setCombo] = useState(1);
  const [comboTimer, setComboTimer] = useState(0);
  const [energyMax, setEnergyMax] = useState(Number(localStorage.getItem('upgrade_energy')) || 100);
  const [energy, setEnergy] = useState(energyMax);
  const [hasShield, setHasShield] = useState(false);
  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  const avatarIcons: Record<string, string> = {
    ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀'
  };

  // --- ANOMALY PROTOCOL ---
  useEffect(() => {
    const eventInterval = setInterval(() => {
      const events = [
        { name: 'DOUBLE_SYNC', type: 'buff' },
        { name: 'VIRUS_TURBO', type: 'danger' },
        { name: 'ENERGY_SURGE', type: 'buff' },
        { name: 'GRID_FOG', type: 'danger' }
      ];
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      setAnomaly(randomEvent);
      setAnomalyTimer(15); // Events last 15 seconds

      // Visual/Audio Cue
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.5);
      osc.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.5);

    }, 45000); // Triggers every 45 seconds

    return () => clearInterval(eventInterval);
  }, []);

  useEffect(() => {
    if (anomalyTimer > 0) {
      const timer = setInterval(() => setAnomalyTimer(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setAnomaly(null);
    }
  }, [anomalyTimer]);

  // --- MODIFIED ENEMY MOVEMENT ---
  useEffect(() => {
