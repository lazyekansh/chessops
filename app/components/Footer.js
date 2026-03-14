"use client";
import React from 'react';
import Link from 'next/link';
import { Github, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <Link href="/" className="footer-link">Home</Link>
          <Link href="/play?mode=offline" className="footer-link">Play</Link>
          <Link href="/profile" className="footer-link">Profile</Link>
          <Link href="/settings" className="footer-link">Settings</Link>
          <Link href="/about" className="footer-link">About</Link>
        </div>
        <div className="footer-top">
          <a href="https://github.com/lazyekansh" target="_blank" rel="noopener noreferrer" className="footer-link">
            <Github size={14} /> GitHub
          </a>
          <a href="https://lazyekansh.vercel.app" target="_blank" rel="noopener noreferrer" className="footer-link">
            <ExternalLink size={14} /> Portfolio
          </a>
        </div>
        <div className="footer-divider" />
        <div className="footer-copy">
          Made with <Heart size={11} aria-label="love" style={{ display: 'inline', verticalAlign: 'middle', color: 'var(--accent-light)' }} /> by Ekansh
          <br />
          Lazy Chess &mdash; Serverless P2P Chess
        </div>
      </div>
    </footer>
  );
}
