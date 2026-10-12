import React from 'react';
import { testimonials } from '../data/portfolioContent';
import { MessageSquareQuote, Star } from 'lucide-react';

export const Testimonials = () => {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <div className="section-badge">
            <MessageSquareQuote size={14} />
            <span>Endorsements & Trust</span>
          </div>
          <h2 className="section-title">
            What Engineering Leaders <span className="gradient-neon">Say</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Trusted by founders, VPs of Engineering, and design directors to build high-stakes software that scales.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <div key={item.id} className="glass-card testimonial-card">
              <div>
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-quote">"{item.quote}"</p>
              </div>

              <div className="author-meta">
                <div className="author-initials">{item.avatar}</div>
                <div>
                  <div className="author-name">{item.name}</div>
                  <div className="author-role">
                    {item.title} • {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
