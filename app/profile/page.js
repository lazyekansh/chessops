"use client";
import React from 'react';
import { Moon, Sun, BarChart3, RefreshCw, User } from 'lucide-react';
import { useGameContext } from '../components/GameContext';

export default function ProfilePage() {
  const { darkMode, setDarkMode, stats, setStats } = useGameContext();
  const total = (stats.wins || 0) + (stats.losses || 0) + (stats.draws || 0);
  const winPct = total > 0 ? Math.round((stats.wins / total) * 100) : 0;

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
        <div className="profile-avatar">
          <User size={24} />
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)' }}>Player</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text3)', marginTop: '2px' }}>Lazy Chess Member</div>
          <span className="badge" style={{ marginTop: '6px' }}>Local Player</span>
        </div>
      </div>

      {total > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Win Rate</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent2)', fontWeight: 700 }}>{winPct}%</span>
          </div>
          <div style={{ height: '6px', background: 'var(--surface2)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <div style={{ height: '100%', width: `${winPct}%`, background: 'var(--accent)', borderRadius: '8px', transition: 'width 0.5s ease' }} />
          </div>
        </div>
      )}

      <h3 style={{ color: 'var(--text3)', margin: '0 0 10px 0', fontSize: '0.75rem', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        <BarChart3 size={13} /> Game Stats
      </h3>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--green)' }}>{stats.wins}</div>
          <div className="stat-label">Wins</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--red)' }}>{stats.losses}</div>
          <div className="stat-label">Losses</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--yellow)' }}>{stats.draws}</div>
          <div className="stat-label">Draws</div>
        </div>
      </div>

      <div className="setting-row">
        <span className="setting-label">
          {darkMode ? <Moon size={15} /> : <Sun size={15} />} Theme
        </span>
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Moon size={14} /> : <Sun size={14} />}
          <span style={{ fontWeight: 700, fontSize: '0.82rem' }}>{darkMode ? 'Dark' : 'Light'}</span>
        </button>
      </div>

      <button className="btn btn-secondary" style={{ marginTop: '10px', marginBottom: 0 }}
        onClick={() => setStats({ wins: 0, losses: 0, draws: 0 })}>
        <RefreshCw size={14} /> Reset Stats
      </button>
    </div>
  );
}
