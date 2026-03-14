"use client";
import React from 'react';
import { Moon, Sun, Volume2, VolumeX, Clock, Layout } from 'lucide-react';
import { useGameContext } from '../components/GameContext';

export default function SettingsPage() {
  const { darkMode, setDarkMode, theme, setTheme, soundEnabled, setSoundEnabled, timerEnabled, setTimerEnabled } = useGameContext();

  return (
    <div className="card">
      <h2 style={{ color: 'var(--text)', margin: '0 0 4px 0', fontSize: '1.15rem', fontWeight: 700 }}>Settings</h2>
      <p style={{ color: 'var(--text3)', fontSize: '0.8rem', marginBottom: '16px' }}>Customize your experience</p>

      <div className="setting-row">
        <span className="setting-label">
          {darkMode ? <Moon size={15} /> : <Sun size={15} />} Appearance
        </span>
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Moon size={14} /> : <Sun size={14} />}
          <span style={{ fontWeight: 700, fontSize: '0.82rem' }}>{darkMode ? 'Dark' : 'Light'}</span>
        </button>
      </div>

      <div className="setting-row">
        <span className="setting-label">
          <Layout size={15} /> Board Theme
        </span>
        <button className="setting-value" onClick={() => setTheme(theme === 'modern' ? 'classic' : 'modern')}>
          {theme === 'modern' ? 'Modern' : 'Classic'}
        </button>
      </div>

      <div className="setting-row">
        <span className="setting-label">
          <Clock size={15} /> Timer
        </span>
        <button className="setting-value" onClick={() => setTimerEnabled(!timerEnabled)}
          style={{ color: timerEnabled ? 'var(--accent2)' : 'var(--text3)' }}>
          {timerEnabled ? 'On · 10m' : 'Off'}
        </button>
      </div>

      <div className="setting-row" style={{ borderBottom: 'none' }}>
        <span className="setting-label">
          {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />} Sound FX
        </span>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: soundEnabled ? 'var(--accent2)' : 'var(--text3)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'inherit' }}
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          {soundEnabled ? 'On' : 'Off'}
        </button>
      </div>
    </div>
  );
}
