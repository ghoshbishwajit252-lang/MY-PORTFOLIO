import React from 'react';
import { bishwajitPhoto } from '../data/portfolioContent';
import { Play } from 'lucide-react';

export const FloatingWelcomeBadge = ({ onOpenWelcomeVideo }) => {
  return (
    <button
      className="floating-welcome-widget"
      onClick={onOpenWelcomeVideo}
      aria-label="Watch Welcome Video"
      title="Watch Welcome Video by Bishwajit Ghosh"
      id="floating-welcome-btn"
    >
      <div className="widget-avatar-container">
        <img
          src={bishwajitPhoto}
          alt="Bishwajit Ghosh"
          className="widget-avatar-img"
        />
        <div className="widget-play-badge">
          <Play size={10} fill="currentColor" />
        </div>
        <div className="widget-radar-ring"></div>
      </div>
      <div className="widget-text-label">
        <span className="widget-title">Watch Welcome Video</span>
        <span className="widget-sub">Hi, I'm Bishwajit 👋</span>
      </div>
    </button>
  );
};
