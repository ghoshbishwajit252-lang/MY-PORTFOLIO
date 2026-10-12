import React, { useState } from 'react';
import { Smartphone, CheckCircle, Heart, Plus, ShieldCheck, Activity, Terminal } from 'lucide-react';

export const InteractiveDeviceDemo = () => {
  const [activeTab, setActiveTab] = useState('wallet');
  const [balance, setBalance] = useState(73140.25);
  const [reps, setReps] = useState(15);
  const [verified, setVerified] = useState(false);
  const [logs, setLogs] = useState([
    'V8/Hermes: Bytecode cache verified',
    'Concurrent: 120 FPS batch commit',
    'Socket: TLS 1.3 multiplexed stream active',
  ]);

  const handleAuth = () => {
    setVerified(true);
    setBalance((b) => b + 500);
    setLogs((prev) => [
      `SecureEnclave: Biometric FaceID approved at ${new Date().toLocaleTimeString()}`,
      ...prev.slice(0, 4),
    ]);
    setTimeout(() => {
      setVerified(false);
    }, 2400);
  };

  const handleRep = () => {
    setReps((r) => r + 1);
    setLogs((prev) => [
      `VisionEngine: Pose match # ${reps + 1} (Score: 0.98)`,
      ...prev.slice(0, 4),
    ]);
  };

  return (
    <section className="section device-demo-section" id="demo">
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="section-badge">
          <Smartphone size={14} />
          <span>Interactive Runtime Simulator</span>
        </div>
        <h2 className="section-title">
          Test Live Systems <span className="gradient-neon">Directly in Browser</span>
        </h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Interact with this simulated mobile application environment below. Experience reactive state updates, biometric FaceID simulation, and real-time execution logs.
        </p>

        {/* Simulated Phone Frame */}
        <div className="phone-mockup-frame">
          <div className="dynamic-island">
            <div className="island-camera"></div>
            <div className="island-sensor"></div>
          </div>

          <div className="phone-screen">
            <div className="phone-status-bar">
              <span>9:41</span>
              <span>5G • 100%</span>
            </div>

            <div className="phone-app-header">
              <span className="phone-app-title">
                {activeTab === 'wallet' ? 'NovaPay Mobile' : activeTab === 'fitness' ? 'AuraFit AI' : 'Runtime Diagnostics'}
              </span>
              <div className="fps-pill">
                <span className="status-dot"></span>
                <span>120 FPS</span>
              </div>
            </div>

            <div className="phone-body">
              {activeTab === 'wallet' && (
                <div className="wallet-view">
                  <span className="wallet-balance-label">Total Vault Liquidity</span>
                  <div className="wallet-balance-val">
                    ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <span className="wallet-change-pill">+5.2% Today • Multi-Chain Active</span>

                  <div className="chart-bar-container">
                    {[35, 48, 62, 54, 78, 92, 85, 105, 118, 125].map((h, i) => (
                      <div
                        key={i}
                        className={`chart-bar-col ${i === 9 ? 'active' : ''}`}
                        style={{ height: `${h * 0.6}px` }}
                      />
                    ))}
                  </div>

                  <button
                    className={`auth-button ${verified ? 'verified' : ''}`}
                    id="simulate-auth-btn"
                    onClick={handleAuth}
                  >
                    {verified ? (
                      <>
                        <CheckCircle size={18} />
                        <span>FaceID Approved (+$500)</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={18} />
                        <span>Simulate Biometric FaceID</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {activeTab === 'fitness' && (
                <div className="fitness-view">
                  <div className="fit-metric-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#EF4444' }}>
                      <Heart size={20} />
                      <strong style={{ fontSize: '1.2rem', color: '#FFFFFF' }}>138 BPM</strong>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#F87171' }}>Target Cardio Zone 3</span>
                  </div>

                  <div className="fit-rep-card">
                    <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Barbell Deadlift</span>
                    <div className="fit-rep-num">{reps} Reps</div>
                    <button
                      className="rep-increment-btn"
                      id="simulate-rep-btn"
                      onClick={handleRep}
                    >
                      <Plus size={16} />
                      <span>Detect +1 Rep Motion</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'logs' && (
                <div className="runtime-view">
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38BDF8' }}>
                    Live Microtask Stream
                  </div>
                  <div className="terminal-box">
                    {logs.map((log, index) => (
                      <div key={index}>› {log}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Nav Inside Simulator */}
            <div className="phone-bottom-nav">
              <button
                className={`phone-tab-item ${activeTab === 'wallet' ? 'active' : ''}`}
                id="phone-tab-wallet"
                onClick={() => setActiveTab('wallet')}
              >
                <Activity size={18} />
                <span>Vault</span>
              </button>
              <button
                className={`phone-tab-item ${activeTab === 'fitness' ? 'active' : ''}`}
                id="phone-tab-fitness"
                onClick={() => setActiveTab('fitness')}
              >
                <Heart size={18} />
                <span>AI Fit</span>
              </button>
              <button
                className={`phone-tab-item ${activeTab === 'logs' ? 'active' : ''}`}
                id="phone-tab-logs"
                onClick={() => setActiveTab('logs')}
              >
                <Terminal size={18} />
                <span>Logs</span>
              </button>
            </div>

            <div className="home-bar"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
