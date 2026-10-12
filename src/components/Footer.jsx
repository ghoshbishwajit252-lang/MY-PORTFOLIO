import React from 'react';
import { developerData } from '../data/portfolioContent';
import { Terminal, ArrowUp, Mail, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <Terminal size={18} />
              </div>
              <h4 style={{ margin: 0 }}>{developerData.name}</h4>
            </div>

            <p>
              Personal software engineering portfolio of Bishwajit Ghosh. Specialized in Java, Python, C, C++, SQL databases, and Artificial Intelligence (AI).
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '16px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(99, 102, 241, 0.12)',
                border: '1px solid var(--border-glow)',
                color: 'var(--accent-sky)',
                fontSize: '0.8rem',
                fontWeight: 700,
              }}
            >
              <span>⚡ React 19 • Vite • Vanilla CSS Architecture</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href="https://github.com/ghoshbishwajit252-lang"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="GitHub Profile"
                title="GitHub Profile"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/bishwajit-ghosh-4bbab53b2"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="LinkedIn"
                title="LinkedIn Profile"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="Twitter"
              >
                <TwitterIcon size={18} />
              </a>
              <a
                href="mailto:ghoshbishwajit252@gmail.com"
                className="social-icon-btn"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href="tel:+919883494534"
                className="social-icon-btn"
                aria-label="Phone: +91 98834 94534"
                title="+91 98834 94534"
              >
                <Phone size={18} />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="btn-secondary"
              id="footer-back-to-top"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <span>Back to Top</span>
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Bishwajit Ghosh. All rights reserved.</span>
          <span>Engineered with passion & precision.</span>
        </div>
      </div>
    </footer>
  );
};
