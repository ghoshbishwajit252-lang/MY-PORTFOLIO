import React, { useState } from 'react';
import { skillsCategories, skillsList } from '../data/portfolioContent';
import { Cpu, CheckCircle } from 'lucide-react';

export const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered =
    selectedCategory === 'all'
      ? skillsList
      : skillsList.filter((s) => s.category === selectedCategory);

  return (
    <section className="section" id="skills">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <div className="section-badge">
            <Cpu size={14} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="section-title">
            Skills Matrix & <span className="gradient-neon">Specialization</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Proficient in core programming languages (Java, Python, C, C++), relational database engineering with SQL, and Artificial Intelligence (AI & Machine Learning).
          </p>

          {/* Filter Pills */}
          <div className="skills-filter-row">
            {skillsCategories.map((c) => (
              <button
                key={c.id}
                className={`filter-btn ${selectedCategory === c.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {filtered.map((skill, idx) => (
            <div key={idx} className="glass-card skill-card">
              <div className="skill-top">
                <span className="skill-title">{skill.name}</span>
                <span className="skill-percent-badge">{skill.level}%</span>
              </div>

              <div className="skill-badge-tag">{skill.badge}</div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>

              <p className="skill-desc">{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
