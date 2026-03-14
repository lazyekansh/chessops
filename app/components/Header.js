"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGameContext } from './GameContext';
import { Moon, Sun, Home, User, Settings, Info, Swords } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/play?mode=offline', label: 'Play', icon: Swords },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/about', label: 'About', icon: Info },
];

export default function Header() {
  const { darkMode, setDarkMode } = useGameContext();
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div className="logo-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" className="logo-icon">
              <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" opacity="0.95" />
              <rect x="13" y="2" width="9" height="9" rx="2" fill="currentColor" opacity="0.25" />
              <rect x="2" y="13" width="9" height="9" rx="2" fill="currentColor" opacity="0.25" />
              <rect x="13" y="13" width="9" height="9" rx="2" fill="currentColor" opacity="0.95" />
            </svg>
            <span className="logo">LAZY CHESS</span>
          </div>
        </Link>

        <nav className="header-nav">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isPlay = href.startsWith('/play');
            const isActive = isPlay ? pathname === '/play' : pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`header-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={15} strokeWidth={isActive ? 2.3 : 1.7} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          <span className="theme-label">{darkMode ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </header>
  );
}
