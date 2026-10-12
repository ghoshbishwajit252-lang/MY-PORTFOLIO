import React from 'react';
import { projectsList } from '../data/portfolioContent';
import { Layers, ExternalLink, ArrowRight, Zap } from 'lucide-react';
import { GithubIcon } from './Icons';

export const Projects = ({ onSelectProject }) => {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <div className="section-badge">
            <Layers size={14} />
            <span>Featured Work</span>
          </div>
          <h2 className="section-title">
            Featured Projects & <span className="gradient-text">Software Work</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Showcasing systems engineering, Artificial Intelligence (AI) models, and high-performance SQL analytics.
          </p>
        </div>

        <div className="projects-grid">
          {projectsList.map((project) => (
            <div key={project.id} className="glass-card project-card">
              {/* Media Column */}
              <div
                className="project-media-col"
                onClick={() => onSelectProject(project)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-cover-img"
                />
                <span className="project-category-tag">{project.category}</span>
              </div>

              {/* Info Column */}
              <div className="project-info-col">
                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>

                  <div className="project-metric-pill">
                    <Zap size={14} style={{ color: '#F59E0B' }} />
                    <span>{project.metrics}</span>
                  </div>

                  <div className="project-tags-list">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-actions">
                  <button
                    className="btn-primary"
                    onClick={() => onSelectProject(project)}
                    style={{ padding: '10px 20px', fontSize: '0.88rem' }}
                  >
                    <span>View Project Details</span>
                    <ArrowRight size={16} />
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="icon-link-btn"
                    aria-label="Inspect GitHub repository"
                    title="GitHub Repository"
                  >
                    <GithubIcon size={18} />
                  </a>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="icon-link-btn"
                    aria-label="View live production deployment"
                    title="Live Deployment"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
