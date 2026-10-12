import React, { useState } from 'react';
import { developerData } from '../data/portfolioContent';
import { Mail, Phone, ArrowRight, FileText, Sparkles, Play } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';

export const Hero = ({ onOpenResume, onOpenContact, onOpenWelcomeVideo }) => {
  const [activeTab, setActiveTab] = useState('mission');

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Avatar & Quick Info */}
          <div className="hero-avatar-card">
            <div
              className="avatar-wrapper"
              onClick={onOpenWelcomeVideo}
              style={{ cursor: 'pointer' }}
              title="Click to watch welcome video"
            >
              <img
                src={developerData.avatar}
                alt={developerData.name}
                className="avatar-img"
              />
              <div className="avatar-video-hint">
                <Play size={14} fill="currentColor" />
                <span>Watch Video</span>
              </div>
              <div className="avatar-badge-pill">
                <span className="status-dot"></span>
                <span>Open for Opportunities</span>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="social-links-row">
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

            {/* Tech Chips */}
            <div className="tech-spec-chips">
              <span className="tech-spec-chip">Java</span>
              <span className="tech-spec-chip">Python</span>
              <span className="tech-spec-chip">C</span>
              <span className="tech-spec-chip">C++</span>
              <span className="tech-spec-chip">SQL</span>
              <span className="tech-spec-chip">Artificial Intelligence (AI)</span>
            </div>
          </div>

          {/* Right Column: Copy & Interactive Bio Tabs */}
          <div className="hero-content">
            <div className="hero-pill">
              <Sparkles size={14} />
              <span>Software Engineering • AI • SQL Databases</span>
            </div>

            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">{developerData.name}</span>
            </h1>

            <p className="hero-tagline">{developerData.tagline}</p>

            {/* Interactive Bio Tabs */}
            <div className="hero-bio-tabs">
              <div className="bio-tabs-header">
                <button
                  className={`bio-tab-btn ${activeTab === 'mission' ? 'active' : ''}`}
                  onClick={() => setActiveTab('mission')}
                >
                  About Me
                </button>
                <button
                  className={`bio-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
                  onClick={() => setActiveTab('architecture')}
                >
                  Technical Skills
                </button>
                <button
                  className={`bio-tab-btn ${activeTab === 'philosophy' ? 'active' : ''}`}
                  onClick={() => setActiveTab('philosophy')}
                >
                  My Approach
                </button>
              </div>

              <div className="bio-tabs-body">
                <p>{developerData.bioTabs[activeTab]}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="hero-actions">
              <button
                className="btn-accent-video"
                id="hero-video-cta"
                onClick={onOpenWelcomeVideo}
              >
                <Play size={16} fill="currentColor" />
                <span>Watch Welcome Video</span>
              </button>

              <a href="#projects" className="btn-primary" id="hero-projects-cta">
                <span>View Projects</span>
                <ArrowRight size={18} />
              </a>

              <button
                className="btn-secondary"
                id="hero-resume-cta"
                onClick={onOpenResume}
              >
                <FileText size={18} />
                <span>View Resume</span>
              </button>

              <button
                className="btn-secondary"
                id="hero-contact-cta"
                onClick={onOpenContact}
              >
                <Mail size={18} />
                <span>Contact Me</span>
              </button>
            </div>
          </div>
        </div>

        {/* Impact Metrics Bar */}
        <div className="hero-metrics-bar">
          {developerData.metrics.map((metric, idx) => (
            <div key={idx} className="metric-box">
              <div className="metric-value">{metric.value}</div>
              <div className="metric-label">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
