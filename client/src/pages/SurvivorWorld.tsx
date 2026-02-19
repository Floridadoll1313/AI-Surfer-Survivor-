import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const GRID_SIZE = 10;
  const avatarIcons: Record<string, string> = { ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀' };

  // --- DYNAMIC SKIN LOGIC ---
  const getAvatarIcon = (type: string, xp: number) => {
    if (xp >= 25000) return '💠';
    if (xp >= 10000) return '⌬';
    if (xp >= 5000)  return '◬';
    return avatarIcons[type] || '□';
  };

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
  
  // --- ACHIEVEMENT STATE ---
  const [achievement, setAchievement] = useState<{title: string, desc: string} | null>(null);
  const [unlockedList, setUnlockedList] = useState<string[]>(JSON.parse(localStorage.getItem('achievements_unlocked') || '[]'));

  // --- ACHIEVEMENT LOGIC ---
  const triggerAchievement = (id: string, title: string, desc: string) => {
    if (unlockedList.includes(id)) return;
    
    const newList = [...unlockedList, id];
    setUnlockedList(newList);
    localStorage.setItem('achievements_unlocked', JSON.stringify(newList));
    
    setAchievement({ title, desc });
    setTimeout(() => setAchievement(null), 4000); // Popup lasts 4 seconds
  };

  const checkAchievements = useCallback((currentScore: number, totalXp: number) => {
    if (currentScore >= 100
