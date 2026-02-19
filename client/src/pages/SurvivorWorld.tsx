import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const GRID_SIZE = 10;
  const avatarIcons: Record<string, string> = { ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀' };

  // --- PERSISTENT DATA & HARD MODE ---
  const isHardMode = localStorage.getItem('hard_mode_enabled') === 'true';
  const BASE_SPEED = isHardMode ? 400 : 1000;
  const XP_MULTIPLIER = isHardMode ? 3 : 1;

  const [wallet, setWallet] = useState(Number(localStorage.getItem('survivor_wallet')) || 0);
  const [energyMax, setEnergyMax] = useState(Number(localStorage.getItem('upgrade_energy')) || 100);
  const [hasShield, setHasShield] = useState(localStorage.getItem('survivor_shield_active') === 'true');

  // --- SESSION STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{x: number, y: number}[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [bossActive, setBossActive] = useState(false);
  const [echoes, setEchoes] = useState<{x: number, y: number}[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isInvisible, setIsInvisible] = useState(false);

  // --- COMBO BREAKER / FLOW STATE ---
  const [stepCount, setStepCount] = useState(0);
  const [lastDirection, setLastDirection] = useState<string | null>(null);
  const [isOverclocked, setIsOverclocked] = useState(false);

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    const newWallet = wallet + (score * XP_MULTIPLIER);
    localStorage.setItem('survivor_wallet', newWallet.toString());
  }, [score, wallet, XP_MULTIPLIER]);

  // --- GAME LOOP ---
  useEffect(() => {
    setFragments(Array.from({ length: 5 }, () => ({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) })));
  }, []);

  useEffect(() => {
    // Enemy speed is halved if player is Overclocked
    const currentSpeed = isOverclocked ? BASE_SPEED * 1.5 : BASE_SPEED;
    const move = setInterval(() => {
      if (isGameOver) return;
      const step = (pos: {x: number, y: number}) => ({
        x: pos.x < playerPosition.x ? pos.x + 1 : pos.x > playerPosition.x ? pos.x - 1 : pos.x,
        y: pos.y < playerPosition.y ? pos.y + 1 : pos.y > playerPosition.y ? pos.y - 1 : pos.y
      });
      setEnemyPosition(prev => step(prev));
      if (bossActive) setEchoes(prev => prev.map(e => step(e)));
