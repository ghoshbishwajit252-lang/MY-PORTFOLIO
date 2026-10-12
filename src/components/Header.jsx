import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Wifi, 
  WifiOff, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  UserCheck, 
  AlertTriangle,
  Factory
} from 'lucide-react';
import { PLANT_INFO, ROLES } from '../data/initialData';
import { soundEngine } from '../data/soundEffects';

export function Header({ 
  currentRole, 
  onSelectRole, 
  isOffline, 
  onToggleOffline,
  highContrast, 
  onToggleContrast 
}) {
  const [timeStr, setTimeStr] = useState('');
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    soundEngine.enabled = !soundOn;
    setSoundOn(!soundOn);
  };

  const selectedRoleObj = ROLES.find(r => r.id === currentRole) || ROLES[0];

  return (
    <header className="foqcs-header">
      {/* Top Industrial Bar */}
      <div className="header-top-bar">
        <div className="brand-section">
          <div className="brand-icon-box">
            <Factory className="text-cyan" size={24} />
          </div>
          <div>
            <div className="brand-title">
              <span className="brand-company">ZAPUZA TECHNOLOGIES</span>
              <span className="brand-system">FOQCS v5.0</span>
            </div>
            <div className="brand-sub">Factory Operations & Quality Control System • ISO 9001 / AS9100D</div>
          </div>
        </div>

        {/* Live Shopfloor Metrics */}
        <div className="header-metrics">
          <div className="metric-pill">
            <Clock size={16} className="text-amber" />
            <span className="font-mono time-display">{timeStr}</span>
            <span className="shift-label">{PLANT_INFO.currentShift}</span>
          </div>

          {/* Network Cache Toggle */}
          <button 
            type="button"
            className={`btn-network-toggle ${isOffline ? 'network-offline' : 'network-online'}`}
            onClick={onToggleOffline}
            title={isOffline ? "Click to simulate network reconnect & cache sync" : "Click to simulate shopfloor Wi-Fi drop"}
          >
            {isOffline ? <WifiOff size={16} /> : <Wifi size={16} />}
            <span>{isOffline ? 'Offline Storage Active' : 'Plant Wi-Fi Online'}</span>
          </button>

          {/* Sound Toggle */}
          <button 
            type="button"
            className="icon-tool-btn" 
            onClick={toggleSound} 
            title={soundOn ? 'Mute Industrial Audio Alerts' : 'Unmute Audio'}
          >
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* High-Contrast Glove-Friendly Toggle */}
          <button 
            type="button"
            className={`icon-tool-btn ${highContrast ? 'active-contrast' : ''}`} 
            onClick={onToggleContrast}
            title="Toggle Glove-Friendly High-Contrast Mode"
          >
            {highContrast ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* Role Switcher & Safeguard Banner (PRD Section 12) */}
      <div className="header-role-bar">
        <div className="role-selector-container">
          <label htmlFor="role-select" className="role-label">
            <UserCheck size={16} />
            <span>ACTIVE OPERATOR:</span>
          </label>
          <select 
            id="role-select"
            className="role-dropdown font-mono"
            value={currentRole}
            onChange={(e) => onSelectRole(e.target.value)}
          >
            {ROLES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title} — {r.name} ({r.empId})
              </option>
            ))}
          </select>
        </div>

        {/* Active Role Safeguard Banner */}
        <div className="role-safeguard-badge">
          <span className="safeguard-tag">Role Safeguard:</span>
          <span className="safeguard-desc">{selectedRoleObj.safeguard}</span>
        </div>
      </div>
    </header>
  );
}
