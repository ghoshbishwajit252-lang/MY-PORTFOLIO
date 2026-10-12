import React, { useState } from 'react';
import { codeSnippets } from '../data/portfolioContent';
import { Code2, Copy, Check, Terminal } from 'lucide-react';

export const CodePlayground = () => {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const current = codeSnippets[activeTabIdx];

  const handleCopy = () => {
    navigator.clipboard?.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section" id="lab">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <div className="section-badge">
            <Code2 size={14} />
            <span>Interactive Code Lab</span>
          </div>
          <h2 className="section-title">
            Under the Hood: <span className="gradient-neon">Code Implementations</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Live code examples showcasing Python AI deep learning architectures, multithreaded Java concurrency, complex analytical SQL queries, and C++ memory management.
          </p>
        </div>

        <div className="code-editor-window">
          {/* Header */}
          <div className="editor-header">
            <div className="window-dots">
              <span className="mac-dot red"></span>
              <span className="mac-dot yellow"></span>
              <span className="mac-dot green"></span>
            </div>

            <div className="editor-tabs">
              {codeSnippets.map((snippet, idx) => (
                <button
                  key={snippet.id}
                  className={`tab-btn ${activeTabIdx === idx ? 'active' : ''}`}
                  onClick={() => setActiveTabIdx(idx)}
                >
                  {snippet.title}
                </button>
              ))}
            </div>

            <button className="copy-code-btn" onClick={handleCopy}>
              {copied ? <Check size={14} style={{ color: '#10B981' }} /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Body */}
          <div className="editor-body">
            <pre>
              <code>{current.code}</code>
            </pre>
          </div>

          {/* Footer Status */}
          <div className="editor-footer-status">
            <Terminal size={14} />
            <span>{current.preview}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
