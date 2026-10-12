import React, { useState } from 'react';
import { Mail, MessageCircle, Phone, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';

export const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Please enter your message.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1000);
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText('ghoshbishwajit252@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const copyPhone = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText('+91 9883494534');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2400);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <div className="section-badge">
            <Sparkles size={14} />
            <span>Contact</span>
          </div>
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Have a question, software engineering opportunity, or want to collaborate? Feel free to reach out directly.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Channels */}
          <div className="glass-card contact-info-card">
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '6px' }}>
                Contact Information
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                You can reach me via phone, WhatsApp, email, or social profiles below.
              </p>
            </div>

            {/* Phone Call Box */}
            <div className="channel-btn">
              <a
                href="tel:+919883494534"
                style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, textDecoration: 'none', color: 'inherit' }}
              >
                <div className="channel-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8' }}>
                  <Phone size={20} />
                </div>
                <div className="channel-meta" style={{ flex: 1 }}>
                  <h4>Phone</h4>
                  <p>+91 98834 94534</p>
                </div>
              </a>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                onClick={copyPhone}
              >
                {copiedPhone ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* WhatsApp Box */}
            <a
              href="https://wa.me/919883494534?text=Hi%20Bishwajit,%20I%20saw%20your%20portfolio."
              target="_blank"
              rel="noreferrer"
              className="channel-btn"
            >
              <div className="channel-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
                <MessageCircle size={20} />
              </div>
              <div className="channel-meta" style={{ flex: 1 }}>
                <h4>WhatsApp</h4>
                <p>+91 98834 94534</p>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Chat ›</span>
            </a>

            {/* Email Box */}
            <div className="channel-btn" onClick={copyEmail}>
              <div className="channel-icon">
                <Mail size={20} />
              </div>
              <div className="channel-meta" style={{ flex: 1 }}>
                <h4>Email</h4>
                <p>ghoshbishwajit252@gmail.com</p>
              </div>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.78rem' }}
              >
                {copiedEmail ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* LinkedIn Box */}
            <a
              href="https://www.linkedin.com/in/bishwajit-ghosh-4bbab53b2"
              target="_blank"
              rel="noreferrer"
              className="channel-btn"
            >
              <div className="channel-icon" style={{ background: 'rgba(10, 102, 194, 0.15)', color: '#38BDF8' }}>
                <LinkedinIcon size={20} />
              </div>
              <div className="channel-meta" style={{ flex: 1 }}>
                <h4>LinkedIn</h4>
                <p>bishwajit-ghosh-4bbab53b2</p>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Connect ›</span>
            </a>

            {/* GitHub Box */}
            <a
              href="https://github.com/ghoshbishwajit252-lang"
              target="_blank"
              rel="noreferrer"
              className="channel-btn"
            >
              <div className="channel-icon" style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }}>
                <GithubIcon size={20} />
              </div>
              <div className="channel-meta" style={{ flex: 1 }}>
                <h4>GitHub</h4>
                <p>ghoshbishwajit252-lang</p>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Profile ›</span>
            </a>

            {/* Availability Alert */}
            <div className="availability-alert">
              <h4>
                <span className="status-dot"></span>
                <span>Current Status</span>
              </h4>
              <p>
                Open to software engineering roles, technical opportunities, and project collaborations.
              </p>
            </div>
          </div>

          {/* Right Column: Personal Contact Form */}
          <div className="glass-card contact-form-card">
            {isSubmitted ? (
              <div className="form-success-banner">
                <div className="success-icon-large">
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>
                  Message Sent Successfully!
                </h3>
                <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 24px' }}>
                  Thank you for reaching out! I'll get back to you as soon as possible.
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="contact-form">
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px' }}>
                  Send a Message
                </h3>

                {errorMsg && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      color: '#EF4444',
                      fontSize: '0.88rem',
                      marginBottom: '18px',
                    }}
                  >
                    <AlertCircle size={16} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    className="form-input"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Job Opportunity / Project Discussion / Hello"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    className="form-textarea"
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  id="submit-contact-btn"
                  disabled={isSubmitting}
                  style={{ width: '100%', marginTop: '10px' }}
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
