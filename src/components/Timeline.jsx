import React from 'react';
import { experienceTimeline } from '../data/portfolioContent';
import { Briefcase, ChevronRight, Building, MapPin } from 'lucide-react';

export const Timeline = () => {
  return (
    <section className="section" id="journey">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <div className="section-badge">
            <Briefcase size={14} />
            <span>Developer Journey</span>
          </div>
          <h2 className="section-title">
            Technical Milestones & <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A track record of continuous learning, algorithm mastery, relational database optimization, and artificial intelligence model engineering.
          </p>
        </div>

        <div className="timeline-list">
          {experienceTimeline.map((item) => (
            <div key={item.id} className="glass-card timeline-card">
              <div className="timeline-header">
                <div>
                  <h3 className="role-title">{item.role}</h3>
                  <div className="company-meta">
                    <Building size={16} />
                    <span>{item.company}</span>
                    <span>•</span>
                    <MapPin size={14} />
                    <span style={{ color: 'var(--text-muted)' }}>{item.location}</span>
                  </div>
                </div>

                <div className="timeline-period-pill">{item.period}</div>
              </div>

              <ul className="accomplishments-list">
                {item.accomplishments.map((acc, idx) => (
                  <li key={idx} className="accomplishment-item">
                    <ChevronRight size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '3px' }} />
                    <span>{acc}</span>
                  </li>
                ))}
              </ul>

              <div className="timeline-tech-row">
                {item.tech.map((t, idx) => (
                  <span key={idx} className="timeline-tech-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
