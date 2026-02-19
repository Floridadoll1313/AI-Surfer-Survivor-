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
  const [echoes, setEchoes] = useState<{x: number, y: number}[]>([]);
  const [score, setScore] = useState(0);
  const [energy, setEnergy] = useState(energyMax);
  const [combo, setCombo] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [isInvisible, setIsInvisible] = useState(false);
  const [shareStatus, setShareStatus] = useState('SHARE_RANK');

  // --- LEADERBOARD & SHARING LOGIC ---
  const updateHallOfFame = (finalScore: number) => {
    const raw = localStorage.getItem('survivor_leaderboard');
    let scores: number[] = raw ? JSON.parse(raw) : [];
    scores.push(finalScore);
    scores.sort((a, b) => b - a);
    const topFive = scores.slice(0, 5);
    localStorage.setItem('survivor_leaderboard', JSON.stringify(topFive));
    return topFive.indexOf(finalScore) + 1; // Return rank (1-5) or 0
  };

  const handleShare = () => {
    const rank = JSON.parse(localStorage.getItem('survivor_leaderboard') || '[]').indexOf(score) + 1;
    const rankText = rank > 0 ? `RANK: #${rank}` : 'UNRANKED';
    const text = `> AI_SURFER_LOG\n> SCORE: ${score}\n> ${rankText}\n> AVATAR: ${selectedAvatar.toUpperCase()}\n> [ RUN_COMPLETE ]`;
    
    navigator.clipboard.writeText(text);
    setShareStatus('COPIED_TO_CLIPBOARD');
    setTimeout(() => setShareStatus('SHARE_RANK'), 2000);
  };

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    const newWallet = wallet + score;
    setWallet(newWallet);
    localStorage.setItem('survivor_wallet', newWallet.toString());
    
    const currentBest = Number(localStorage.getItem('survivor_high_score')) || 0;
    if (score > currentBest) localStorage.setItem('survivor_high_score', score.toString());
    
    updateHallOfFame(score);
  }, [score, wallet]);

  // --- CORE GAME LOGIC ---
  useEffect(() => {
    setFragments(Array.from({ length: 5 }, () => ({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) })));
  }, []);

  useEffect(() => {
    const move = setInterval(() => {
      if (isGameOver || showShop) return;
      const step = (pos: {x: number, y: number}) => ({
        x: pos.x < playerPosition.x ? pos.x + 1 : pos.x > playerPosition.x ? pos.x - 1 : pos.x,
