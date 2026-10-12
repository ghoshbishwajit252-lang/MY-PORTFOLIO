import React from 'react';
import { X, CheckCircle2, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';

export const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--accent-sky)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '2px',
              }}
            >
              {project.category} Architecture
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{project.title}</h3>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <img
            src={project.image}
            alt={project.title}
            className="modal-img-banner"
          />

          <div
            style={{
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid var(--border-glow)',
              color: 'var(--accent-sky)',
              fontWeight: 700,
              fontSize: '0.88rem',
              marginBottom: '20px',
            }}
          >
            {project.metrics}
          </div>

          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>
            System Overview
          </h4>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '22px' }}>
            {project.description}
          </p>

          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px' }}>
            Engineering Highlights
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {project.highlights.map((h, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  {h}
                </span>
              </div>
            ))}
          </div>

          {/* Architecture Blueprint Table */}
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px' }}>
            Architectural Blueprint
          </h4>
          <div
            style={{
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '26px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem', fontWeight: 600 }}>State Machine:</span>
              <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)' }}>{project.architecture.state}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem', fontWeight: 600 }}>Networking Protocol:</span>
              <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)' }}>{project.architecture.network}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem', fontWeight: 600 }}>Security Layer:</span>
              <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)' }}>{project.architecture.security}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem', fontWeight: 600 }}>Performance Engine:</span>
              <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)' }}>{project.architecture.performance}</span>
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ flex: 1, minWidth: '200px' }}
            >
              <span>Live Project Demo</span>
              <ExternalLink size={16} />
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ flex: 1, minWidth: '200px' }}
            >
              <GithubIcon size={18} />
              <span>View GitHub Code</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
