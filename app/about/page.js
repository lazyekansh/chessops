"use client";
import React from 'react';
import { Zap, ChevronRight, History, User, Github, ExternalLink } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="card" style={{ textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <svg width="28" height="28" viewBox="0 0 28 28">
          <rect x="2" y="2" width="10" height="10" rx="2" fill="var(--text-main)" opacity="0.9" />
          <rect x="16" y="2" width="10" height="10" rx="2" fill="var(--text-muted)" opacity="0.4" />
          <rect x="2" y="16" width="10" height="10" rx="2" fill="var(--text-muted)" opacity="0.4" />
          <rect x="16" y="16" width="10" height="10" rx="2" fill="var(--text-main)" opacity="0.9" />
        </svg>
        <div>
          <h2 style={{ color: 'var(--text-main)', margin: 0, fontSize: '1.2rem' }}>About Lazy Chess</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>v3.0.0</span>
        </div>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '16px' }}>A serverless P2P chess platform designed for instant play on any device. No accounts, no servers — just chess.</p>

      <div className="divider" />

      <h4 style={{ marginBottom: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Zap size={14} /> What&#39;s New in v3.0.0
      </h4>
      <div style={{ marginBottom: '16px' }}>
        <div className="changelog-item"><ChevronRight size={12} /> Progressive Web App (installable)</div>
        <div className="changelog-item"><ChevronRight size={12} /> Multi-page navigation</div>
        <div className="changelog-item"><ChevronRight size={12} /> Enhanced responsive design</div>
        <div className="changelog-item"><ChevronRight size={12} /> Separate pages for Play, Profile, Settings</div>
        <div className="changelog-item"><ChevronRight size={12} /> Improved tablet & desktop layout</div>
      </div>

      <h4 style={{ marginBottom: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <History size={14} /> v2.1 Changelog
      </h4>
      <div style={{ marginBottom: '16px' }}>
        <div className="changelog-item"><ChevronRight size={12} /> Dark & Light theme toggle</div>
        <div className="changelog-item"><ChevronRight size={12} /> 3 Bot difficulty levels</div>
        <div className="changelog-item"><ChevronRight size={12} /> Profile dashboard with stats</div>
        <div className="changelog-item"><ChevronRight size={12} /> Board theme selection</div>
        <div className="changelog-item"><ChevronRight size={12} /> Sandbox free-play mode</div>
      </div>

      <h4 style={{ marginBottom: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <History size={14} /> v1.1 Changelog
      </h4>
      <div style={{ marginBottom: '16px' }}>
        <div className="changelog-item"><ChevronRight size={12} /> Bot Mode</div>
        <div className="changelog-item"><ChevronRight size={12} /> Choice Menu</div>
        <div className="changelog-item"><ChevronRight size={12} /> Instant Sync</div>
        <div className="changelog-item"><ChevronRight size={12} /> Sound Effects</div>
      </div>

      <div className="divider" />

      <h4 style={{ marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <User size={14} /> Developer
      </h4>
      <div className="dev-card">
        <div className="dev-avatar">
          <svg width="22" height="22" viewBox="0 0 22 22"><text x="11" y="16" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">E</text></svg>
        </div>
        <div>
          <div style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>Ekansh</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Frontend UI Developer</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <button className="link-btn" onClick={() => window.open('https://github.com/lazyekansh', '_blank')}><Github size={15} /> GitHub</button>
        <button className="link-btn" onClick={() => window.open('https://lazyekansh.vercel.app', '_blank')}><ExternalLink size={15} /> Portfolio</button>
      </div>
    </div>
  );
}
