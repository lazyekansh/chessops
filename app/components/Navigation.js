"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Settings, Info, Swords } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/play?mode=offline', label: 'Play', icon: Swords },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/about', label: 'About', icon: Info },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isPlay = href.startsWith('/play');
        const isActive = isPlay ? pathname === '/play' : pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`bottom-nav-item ${isActive ? 'active' : ''} ${isPlay ? 'play-item' : ''}`}
            aria-label={label}
          >
            <span className="bottom-nav-icon">
              <Icon size={isPlay ? 22 : 20} strokeWidth={isActive ? 2.3 : 1.6} />
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
