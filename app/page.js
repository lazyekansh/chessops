"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WifiOff, Globe, Cpu, Target, Share2, Zap, Shield, Smartphone, Trophy } from 'lucide-react';
import { useGameContext } from './components/GameContext';

export default function HomePage() {
  const router = useRouter();
  const { botLevel, setBotLevel } = useGameContext();
  const [showBotSelect, setShowBotSelect] = useState(false);

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Lazy Chess', text: 'Play chess with me!', url: window.location.href });
      } catch (e) {
        if (e.name !== 'AbortError') console.warn('Share failed:', e);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const bots = [
    { level: 1, label: 'Easy', desc: 'Random moves — great for beginners', color: '#4ade80', emoji: '🐣' },
    { level: 2, label: 'Medium', desc: 'Captures pieces when possible', color: '#fbbf24', emoji: '🎯' },
    { level: 3, label: 'Hard', desc: 'Strategic play with lookahead', color: '#f87171', emoji: '🔥' },
  ];

  if (showBotSelect) {
    return (
      <div className="card">
        <h2 style={{ color: 'var(--text)', margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: 700 }}>Choose Difficulty</h2>
        <p style={{ color: 'var(--text3)', fontSize: '0.82rem', marginBottom: '16px' }}>Select your opponent's strength</p>
        {bots.map(({ level, label, desc, color, emoji }) => (
          <button key={level} className={`bot-select-btn ${botLevel === level ? 'selected' : ''}`} onClick={() => setBotLevel(level)}>
            <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span style={{ fontSize: '1rem' }}>{emoji}</span>
              <span style={{ color }}>{label}</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text3)', paddingLeft: '28px' }}>{desc}</div>
          </button>
        ))}
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button className="btn btn-secondary" style={{ flex: 1, marginBottom: 0 }} onClick={() => setShowBotSelect(false)}>Back</button>
          <button className="btn" style={{ flex: 2, marginBottom: 0 }} onClick={() => router.push('/play?mode=ai')}>
            <Cpu size={16} /> Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ width: '52px', height: '52px', background: 'var(--accent-dim)', border: '2px solid rgba(124,106,247,0.3)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
          <svg width="26" height="26" viewBox="0 0 26 26">
            <rect x="2" y="2" width="10" height="10" rx="2.5" fill="var(--accent)" opacity="0.95" />
            <rect x="14" y="2" width="10" height="10" rx="2.5" fill="var(--accent)" opacity="0.25" />
            <rect x="2" y="14" width="10" height="10" rx="2.5" fill="var(--accent)" opacity="0.25" />
            <rect x="14" y="14" width="10" height="10" rx="2.5" fill="var(--accent)" opacity="0.95" />
          </svg>
        </div>
        <h2 style={{ color: 'var(--text)', margin: '0 0 6px 0', fontSize: '1.2rem', fontWeight: 700 }}>Play Chess</h2>
        <p className="hero-tagline">Serverless P2P chess — no sign-up, no backend.</p>
      </div>

      {/* Features */}
      <div className="feature-grid">
        <div className="feature-item"><Zap size={13} /> Instant Play</div>
        <div className="feature-item"><Shield size={13} /> No Backend</div>
        <div className="feature-item"><Globe size={13} /> P2P Online</div>
        <div className="feature-item"><Smartphone size={13} /> Mobile-First</div>
      </div>

      {/* Play buttons */}
      <button className="btn" onClick={() => router.push('/play?mode=offline')}>
        <WifiOff size={17} /> Pass &amp; Play (2 Players)
      </button>
      <button className="btn" onClick={() => setShowBotSelect(true)}>
        <Cpu size={17} /> Play vs Bot
      </button>
      <button className="btn" onClick={() => router.push('/play?mode=online')}>
        <Globe size={17} /> Play Online (P2P)
      </button>
      <button className="btn btn-secondary" onClick={() => router.push('/play?mode=sandbox')}>
        <Target size={16} /> Sandbox / Free Play
      </button>

      <div className="divider" />
      <button className="btn btn-ghost" onClick={shareLink} style={{ marginBottom: 0 }}>
        <Share2 size={15} /> Share Lazy Chess
      </button>
    </div>
  );
}
