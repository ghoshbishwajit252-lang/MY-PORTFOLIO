import React, { useState } from 'react';
import { Terminal, Moon, Sun, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar = ({ theme, onToggleTheme, onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Code Lab', href: '#lab' },
    { label: 'Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="navbar">
      <div className="container nav-inner">
        {/* Brand */}
        <a href="#" className="brand-link" id="nav-brand">
          <div className="brand-logo-icon">
            <Terminal size={22} />
          </div>
          <div className="brand-text">
            <h3>Bishwajit Ghosh</h3>
            <div className="status-badge">
              <span className="status-dot"></span>
              <span>Software Engineer • Java | Python | C/C++ | SQL | AI</span>
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav>
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Controls */}
        <div className="nav-actions">
          <button
            className="theme-toggle-btn"
            id="theme-toggle"
            onClick={onToggleTheme}
            aria-label="Toggle visual theme"
            title="Toggle theme"
          >
            {theme === 'cyber' ? (
              <Sparkles size={18} />
            ) : theme === 'midnight' ? (
              <Moon size={18} />
            ) : (
              <Sun size={18} />
            )}
          </button>

          <button
            className="btn-primary"
            id="nav-cta"
            onClick={onOpenContact}
            style={{ padding: '9px 18px', fontSize: '0.88rem' }}
          >
            <span>Contact Me</span>
            <ArrowUpRight size={16} />
          </button>

          <button
            className="mobile-menu-toggle"
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
