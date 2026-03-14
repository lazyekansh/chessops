"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);
  const [theme, setTheme] = useState('modern');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [stats, setStats] = useState({ wins: 0, losses: 0, draws: 0 });
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timeSettings, setTimeSettings] = useState(600);
  const [botLevel, setBotLevel] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('chess-darkMode');
    const savedTheme = localStorage.getItem('chess-theme');
    const savedStats = localStorage.getItem('chess-stats');
    const savedSound = localStorage.getItem('chess-sound');
    const savedTimer = localStorage.getItem('chess-timer');
    const savedBot = localStorage.getItem('chess-botLevel');
    if (savedDarkMode !== null) setDarkMode(savedDarkMode === 'true');
    if (savedTheme) setTheme(savedTheme === 'teal' ? 'modern' : savedTheme);
    if (savedStats) setStats(JSON.parse(savedStats));
    if (savedSound !== null) setSoundEnabled(savedSound === 'true');
    if (savedTimer !== null) setTimerEnabled(savedTimer === 'true');
    if (savedBot !== null) setBotLevel(parseInt(savedBot, 10));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('chess-darkMode', darkMode);
  }, [darkMode, mounted]);

  useEffect(() => { if (mounted) localStorage.setItem('chess-theme', theme); }, [theme, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem('chess-stats', JSON.stringify(stats)); }, [stats, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem('chess-sound', soundEnabled); }, [soundEnabled, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem('chess-timer', timerEnabled); }, [timerEnabled, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem('chess-botLevel', botLevel); }, [botLevel, mounted]);

  const playSound = (type) => {
    if (!soundEnabled) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    if (type === 'move') {
      osc.frequency.setValueAtTime(300, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now); osc.stop(now + 0.1);
    } else if (type === 'capture') {
      osc.frequency.setValueAtTime(150, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start(now); osc.stop(now + 0.15);
    } else if (type === 'check') {
      osc.frequency.setValueAtTime(600, now);
      osc.type = 'triangle';
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now); osc.stop(now + 0.3);
    }
  };

  return (
    <GameContext.Provider value={{
      darkMode, setDarkMode,
      theme, setTheme,
      soundEnabled, setSoundEnabled,
      stats, setStats,
      timerEnabled, setTimerEnabled,
      timeSettings, setTimeSettings,
      botLevel, setBotLevel,
      playSound,
      mounted,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGameContext must be used within a GameProvider');
  return ctx;
}
