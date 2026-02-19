import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { getLevelInfo } from '../data/leveling';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const { speedBonus } = getLevelInfo(selectedAvatar);
  
  const GRID_SIZE = 10;
  const avatarIcons: Record<string, string> = { ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀' };

  // --- PERSISTENT DATA & HARD MODE ---
  const isHardMode = localStorage.getItem('hard_mode_enabled') === 'true';
  const BASE_SPEED = isHardMode ? 400 : 1000;
  const XP_MULTIPLIER = isHardMode ? 3 : 1;

  const [wallet, setWallet] = useState(Number(localStorage.getItem('survivor_wallet')) || 0);
  const [hasShield, setHasShield] = useState(localStorage.getItem('survivor_shield_active') === 'true');

  // --- SESSION STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{x: number, y: number}[]>([]);
  const [fragments, setFragments] = useState<{x: number, y: number}[]>([]);
  
  // ENEMIES & BOSS
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [bossActive, setBossActive] = useState(false);
  const [bossPos, setBossPos] = useState({ x: 5, y: 5 });
  
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> SYSTEM_READY', '> BOSS_SIGNATURES_MONITORED']);

  const addLog = (msg: string) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 8));

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    addLog('CRITICAL: CONNECTION_LOST');
    localStorage.setItem('survivor_wallet', (wallet + (score * XP_MULTIPLIER)).toString());
    
    // Save Avatar XP
    const currentXp = Number(localStorage.getItem(`xp_${selectedAvatar}`)) || 0;
    localStorage.setItem(`xp_${selectedAvatar}`, (currentXp + score).toString());
  }, [score, wallet, XP_MULTIPLIER, selectedAvatar]);

  // Initial Spawn
  useEffect(() => {
    setFragments(Array.from({ length: 5 }, () => ({ x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) })));
  }, []);

  // Boss & Enemy AI Loop
  useEffect(() => {
    const move = setInterval(() => {
      if (isGameOver) return;
      
      // Standard Stalker AI
      set
