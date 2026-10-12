import React, { useState, useEffect, useRef } from 'react';
import { bishwajitPhoto, developerData } from '../data/portfolioContent';
import { Play, Pause, RotateCcw, Volume2, VolumeX, X, Sparkles, ArrowRight, Video } from 'lucide-react';

export const WelcomeVideoModal = ({ isOpen, onClose, onOpenProjects, onOpenContact, onOpenResume }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [currentTime, setCurrentTime] = useState(0); // in seconds
  const [hasStartedOnce, setHasStartedOnce] = useState(false);
  const [customVideoSrc, setCustomVideoSrc] = useState(null);

  const duration = 18; // 18 seconds simulated video length
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const speechRef = useRef(null);

  const welcomeTranscript = [
    { start: 0, end: 4, text: "👋 Hello and welcome! I'm Bishwajit Ghosh." },
    { start: 4, end: 9, text: "Welcome to my personal software engineering portfolio." },
    { start: 9, end: 14, text: "I specialize in Java, Python, C, C++, SQL Databases, and Artificial Intelligence." },
    { start: 14, end: 18, text: "Feel free to explore my projects and get in touch. Thank you for visiting!" },
  ];

  const fullSpeechText =
    "Hello and welcome! I'm Bishwajit Ghosh. Welcome to my personal software engineering portfolio. I specialize in Java, Python, C, C++, SQL Databases, and Artificial Intelligence. Feel free to explore my projects and get in touch. Thank you for visiting!";

  // Current caption based on currentTime
  const currentCaption =
    welcomeTranscript.find((t) => currentTime >= t.start && currentTime < t.end)?.text ||
    (currentTime >= duration ? "Thanks for watching! Feel free to explore below." : welcomeTranscript[0].text);

  // Play narration speech
  const speakNarration = () => {
    if (!('speechSynthesis' in window) || isMuted) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(fullSpeechText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.includes('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David'))
    );
    if (preferredVoice) utterance.voice = preferredVoice;

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopNarration = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Play / Pause Toggle
  const handlePlayToggle = () => {
    if (isPlaying) {
      // Pause
      setIsPlaying(false);
      stopNarration();
      if (videoRef.current) videoRef.current.pause();
    } else {
      // Play
      setIsPlaying(true);
      setHasStartedOnce(true);
      if (!isMuted) speakNarration();
      if (videoRef.current) videoRef.current.play();
    }
  };

  // Restart
  const handleRestart = () => {
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(true);
    setHasStartedOnce(true);
    if (!isMuted) speakNarration();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (nextMuted) {
      stopNarration();
    } else if (isPlaying) {
      speakNarration();
    }
  };

  // Progress timer for photo presentation mode
  useEffect(() => {
    if (isPlaying && !customVideoSrc) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            clearInterval(timerRef.current);
            setIsPlaying(false);
            return duration;
          }
          const next = prev + 0.2;
          setProgress((next / duration) * 100);
          return next;
        });
      }, 200);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying, customVideoSrc]);

  // Clean up speech on unmount or close
  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      stopNarration();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop welcome-video-backdrop" onClick={onClose}>
      <div
        className="welcome-video-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-video-title"
      >
        {/* Top Header */}
        <div className="welcome-video-header">
          <div className="welcome-video-title-wrap">
            <div className="live-status-pill">
              <span className="live-status-dot"></span>
              <span>VIDEO GREETING</span>
            </div>
            <h3 id="welcome-video-title" className="welcome-video-title">
              Welcome from <span className="gradient-text">{developerData.name}</span>
            </h3>
          </div>

          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close welcome video"
            title="Close video"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Player Display Container */}
        <div className="video-player-container">
          {customVideoSrc ? (
            <video
              ref={videoRef}
              src={customVideoSrc}
              className="native-video-elem"
              playsInline
              onEnded={() => setIsPlaying(false)}
            />
          ) : (
            <div className={`video-presenter-stage ${isPlaying ? 'playing' : ''}`}>
              {/* Background Ambient Backdrop */}
              <div
                className="video-stage-bg"
                style={{ backgroundImage: `url(${bishwajitPhoto})` }}
              ></div>

              {/* Main Presenter Photo Frame */}
              <div className="presenter-portrait-frame">
                <img
                  src={bishwajitPhoto}
                  alt={developerData.name}
                  className="presenter-img"
                />

                {/* Video Watermark Badge */}
                <div className="video-author-badge">
                  <div className="author-dot-active"></div>
                  <div className="author-name-tag">
                    <strong>{developerData.name}</strong>
                    <span>Software Engineer</span>
                  </div>
                </div>

                {/* Audio Equalizer Visualizer Bars (animated during playback) */}
                {isPlaying && (
                  <div className="equalizer-bars-row">
                    <span className="eq-bar bar-1"></span>
                    <span className="eq-bar bar-2"></span>
                    <span className="eq-bar bar-3"></span>
                    <span className="eq-bar bar-4"></span>
                    <span className="eq-bar bar-5"></span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Central Play/Pause Splash Overlay */}
          {!isPlaying && (
            <div className="video-center-overlay" onClick={handlePlayToggle}>
              <button
                className="big-play-btn"
                aria-label={hasStartedOnce ? "Resume video" : "Play welcome video"}
              >
                <div className="play-ripple-ring"></div>
                <Play size={32} fill="currentColor" style={{ marginLeft: '4px' }} />
              </button>
              <div className="play-prompt-text">
                {hasStartedOnce ? "Click to Resume Greeting" : "Click to Play Welcome Message"}
              </div>
            </div>
          )}

          {/* Live Subtitle / Closed Caption Bar */}
          <div className="video-captions-bar">
            <span className="cc-label">CC</span>
            <span className="caption-text">{currentCaption}</span>
          </div>

          {/* Video Control Bar */}
          <div className="video-controls-overlay">
            {/* Progress Track */}
            <div
              className="video-progress-track"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const pct = Math.max(0, Math.min(1, clickX / rect.width));
                setProgress(pct * 100);
                setCurrentTime(pct * duration);
              }}
            >
              <div className="video-progress-fill" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="video-controls-row">
              <div className="controls-left">
                <button
                  className="control-icon-btn"
                  onClick={handlePlayToggle}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>

                <button
                  className="control-icon-btn"
                  onClick={handleRestart}
                  aria-label="Restart Video"
                  title="Restart"
                >
                  <RotateCcw size={16} />
                </button>

                <button
                  className="control-icon-btn"
                  onClick={handleToggleMute}
                  aria-label={isMuted ? "Unmute Voice" : "Mute Voice"}
                  title={isMuted ? "Unmute Voice" : "Mute Voice"}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                <span className="video-time-display">
                  {Math.floor(currentTime)}s / {duration}s
                </span>
              </div>

              <div className="controls-right">
                <span className="video-badge-pill">
                  <Sparkles size={13} />
                  <span>Personal Introduction</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Modal Footer & Action Row */}
        <div className="welcome-video-footer">
          <div className="footer-message-meta">
            <h4>Ready to explore my work?</h4>
            <p>Check out my projects in Java, Python, C++, SQL, and AI, or get in touch directly.</p>
          </div>

          <div className="welcome-action-buttons">
            <button
              className="btn-primary"
              onClick={() => {
                onClose();
                onOpenProjects?.();
              }}
            >
              <span>Explore Projects</span>
              <ArrowRight size={16} />
            </button>

            <button
              className="btn-secondary"
              onClick={() => {
                onClose();
                onOpenContact?.();
              }}
            >
              <span>Contact Bishwajit</span>
            </button>

            <button
              className="btn-ghost"
              onClick={onClose}
              style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}
            >
              <span>Continue to Portfolio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
