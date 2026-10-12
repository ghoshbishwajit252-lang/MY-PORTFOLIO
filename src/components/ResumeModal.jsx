import React, { useState } from 'react';
import { X, Download, CheckCircle2, Award, GraduationCap, FileCheck } from 'lucide-react';

export const ResumeModal = ({ onClose }) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2600);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Resume & Technical Profile</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Bishwajit Ghosh • Software Engineer (Java, Python, C/C++, SQL, AI)
            </span>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Action Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid var(--border-glow)',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <div style={{ fontWeight: 700, color: 'var(--accent-sky)' }}>
                Professional Technical Profile
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Java • Python • C • C++ • SQL • Artificial Intelligence
              </div>
            </div>

            <button
              className="btn-primary"
              onClick={handleDownload}
              style={{ padding: '9px 18px', fontSize: '0.85rem' }}
            >
              {downloaded ? (
                <>
                  <CheckCircle2 size={16} />
                  <span>Downloaded to Device</span>
                </>
              ) : (
                <>
                  <Download size={16} />
                  <span>Download CV (PDF)</span>
                </>
              )}
            </button>
          </div>

          {/* Competency Matrix */}
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px' }}>
            Core Architectural Competencies
          </h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '10px',
              marginBottom: '26px',
            }}
          >
            {[
              'Java Core, Object-Oriented Programming (OOP) & Concurrency',
              'Python Data Science, Automation & Machine Learning',
              'C & C++ High-Performance Systems & Memory Optimization',
              'SQL Database Normalization, Joins & Query Indexing',
              'Artificial Intelligence (AI), Deep Learning & Neural Models',
              'Data Structures & Algorithms (Trees, Graphs, DP, Sorting)',
            ].map((comp, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.88rem',
                  color: 'var(--text-main)',
                }}
              >
                <CheckCircle2 size={16} style={{ color: '#10B981', flexShrink: 0 }} />
                <span>{comp}</span>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px' }}>
            Technical Certifications & Training
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '26px' }}>
            {[
              { title: 'Java Software Development & Object-Oriented Architecture', issuer: 'Oracle / Java Core Specialization', year: '2024' },
              { title: 'Artificial Intelligence & Deep Learning in Python', issuer: 'DeepLearning.AI / PyTorch', year: '2024' },
              { title: 'Relational Database Design & Advanced SQL Query Optimization', issuer: 'PostgreSQL & MySQL Specialist', year: '2023' },
            ].map((cert, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <Award size={20} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{cert.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {cert.issuer} • Issued {cert.year}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px' }}>
            Academic Background
          </h4>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 18px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <GraduationCap size={22} style={{ color: 'var(--accent-sky)', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                Bachelor of Technology in Computer Science & Engineering
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Graduated with First Class Honors • Distributed Systems & Network Architecture
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
