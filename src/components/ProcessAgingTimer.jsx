import React, { useState, useEffect } from 'react';
import { 
  Timer, 
  Flame, 
  ThermometerSnowflake, 
  AlertOctagon, 
  CheckCircle2, 
  FastForward, 
  Lock, 
  Unlock,
  Play
} from 'lucide-react';
import { soundEngine } from '../data/soundEffects';
import { auditTrail } from '../data/auditLogStore';

export function ProcessAgingTimer({ traveler, onUpdateTraveler, currentUser }) {
  const [remainingSeconds, setRemainingSeconds] = useState(
    traveler?.coolingHold?.remainingSeconds ?? 4920 // default ~1h 22m
  );
  const [showInterlockFlash, setShowInterlockFlash] = useState(false);

  // Active countdown timer effect
  useEffect(() => {
    if (remainingSeconds <= 0) return;
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [remainingSeconds]);

  // Format seconds to HH:MM:SS
  const formatTime = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  const isHoldActive = remainingSeconds > 0;

  // Evaluator fast-forward helpers
  const handleFastForward = (sec) => {
    const newSec = Math.max(0, remainingSeconds - sec);
    setRemainingSeconds(newSec);
    if (newSec === 0) {
      soundEngine.playPassChime();
      auditTrail.logEvent({
        userId: currentUser?.empId || 'SYSTEM',
        role: 'Process Timer Engine',
        action: 'COOLING_HOLD_EXPIRED',
        entityId: traveler.id,
        previousValue: 'COOLING_HOLD_ACTIVE',
        newValue: 'COOLING_HOLD_SATISFIED',
        details: 'Thermal cooling hold satisfied. Workstation Op 40 Precision Grinding unlocked.'
      });
    }
  };

  // Attempt to start Op 40 while hold is active (Deliberate Interlock Test per PRD 8.2)
  const handleAttemptStartGrinding = () => {
    if (isHoldActive) {
      setShowInterlockFlash(true);
      soundEngine.playAlertBuzzer();
      soundEngine.playLockSound();
      auditTrail.logEvent({
        userId: currentUser?.empId || 'OP-410',
        role: 'Machine Operator',
        action: 'INTERLOCK_VIOLATION_BLOCKED',
        entityId: `${traveler.id}-OP40`,
        previousValue: 'LOCKED',
        newValue: 'BLOCKED_BY_COOLING_HOLD',
        details: `Operator attempted to start Op 40 with ${formatTime(remainingSeconds)} remaining on thermal cooling hold.`
      });
      setTimeout(() => setShowInterlockFlash(false), 3500);
    } else {
      soundEngine.playPassChime();
      alert('✓ Verification Passed: Cooling hold satisfied! Op 40 Precision Grinding cleared to start.');
    }
  };

  // Temperature simulation: from 850°C down to 32°C
  const totalHoldSec = traveler?.coolingHold?.requiredSeconds || 14400;
  const elapsedPercent = Math.min(100, Math.max(0, ((totalHoldSec - remainingSeconds) / totalHoldSec) * 100));
  const currentTemp = Math.round(850 - (elapsedPercent / 100) * (850 - 32));

  return (
    <div className={`process-aging-card ${showInterlockFlash ? 'interlock-flashing-root' : ''}`}>
      {/* Top Banner */}
      <div className="aging-header-bar">
        <div className="flex items-center gap-3">
          <div className="qr-icon-pill">
            <Timer size={24} className={isHoldActive ? 'text-amber' : 'text-green'} />
          </div>
          <div>
            <h3 className="text-base font-bold">Automated Process Aging & Thermal Hold Interlock (PRD Section 8.2)</h3>
            <p className="text-xs text-secondary">
              Induction Hardening discharge requires mandatory cooling hold to prevent micro-cracking during grinding.
            </p>
          </div>
        </div>

        <div className="font-mono text-xs">
          {isHoldActive ? (
            <span className="badge badge-amber flex items-center gap-1">
              <Lock size={14} /> ACTIVE HOLD INTERLOCK
            </span>
          ) : (
            <span className="badge badge-green flex items-center gap-1">
              <Unlock size={14} /> COOLING COMPLETE
            </span>
          )}
        </div>
      </div>

      {/* Main Hold Timer Visual Display */}
      <div className="aging-timer-grid my-4">
        {/* Left: Clock Countdown Box */}
        <div className={`clock-display-box ${isHoldActive ? 'clock-active-hold' : 'clock-satisfied'}`}>
          <div className="clock-sub-title font-mono text-xs">
            {isHoldActive ? 'MANDATORY COOLING TIME REMAINING:' : 'THERMAL EQUILIBRIUM ACHIEVED:'}
          </div>
          <div className="clock-digits-large font-mono">
            {formatTime(remainingSeconds)}
          </div>
          <div className="clock-reason text-xs text-secondary mt-1">
            Op 30 Heat Treatment Discharge $\rightarrow$ Op 40 Precision Grinding Interlock
          </div>
        </div>

        {/* Right: Thermal Quench Simulation Bar */}
        <div className="temp-simulation-box">
          <div className="flex justify-between items-center text-xs font-mono mb-2">
            <span className="flex items-center gap-1 text-secondary">
              <ThermometerSnowflake size={14} className="text-cyan" />
              ESTIMATED CORE TEMPERATURE:
            </span>
            <strong className={currentTemp > 60 ? 'text-red' : 'text-green'}>
              {currentTemp}°C {currentTemp > 60 ? '(Hot / Thermal Strain)' : '(Ambient Safe)'}
            </strong>
          </div>

          <div className="progress-track" style={{ height: '14px' }}>
            <div
              className={`progress-fill ${isHoldActive ? 'bg-amber' : 'bg-green'}`}
              style={{ width: `${elapsedPercent}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs font-mono text-muted mt-2">
            <span>Discharge: 850°C</span>
            <span>Threshold: &lt; 35°C</span>
          </div>
        </div>
      </div>

      {/* Evaluator Controls to Test Interlock vs Release */}
      <div className="aging-tester-bar my-3">
        <div className="text-xs font-mono text-secondary mb-1">
          DEMO TEST CONTROLS (Simulate Elapsed Time):
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn-industrial btn-outline text-xs flex-1 font-mono"
            onClick={() => handleFastForward(1800)}
            disabled={!isHoldActive}
          >
            <FastForward size={14} /> +30 Mins Elapsed
          </button>
          <button
            type="button"
            className="btn-industrial btn-outline text-xs flex-1 font-mono"
            onClick={() => handleFastForward(remainingSeconds)}
            disabled={!isHoldActive}
          >
            <CheckCircle2 size={14} /> Expire Hold Timer (00:00:00)
          </button>
          <button
            type="button"
            className="btn-industrial btn-outline text-xs flex-1 font-mono"
            onClick={() => setRemainingSeconds(4920)}
          >
            Reset to 1h 22m Hold
          </button>
        </div>
      </div>

      {/* Interlock Trigger Test Button */}
      <div className="interlock-test-action mt-4">
        <button
          type="button"
          className={`btn-industrial w-full font-mono ${isHoldActive ? 'btn-danger' : 'btn-success'}`}
          onClick={handleAttemptStartGrinding}
        >
          {isHoldActive ? (
            <>
              <Lock size={18} />
              <span>Attempt to Scan Job into Op 40 Precision Grinding (Test Hard Interlock)</span>
            </>
          ) : (
            <>
              <Play size={18} />
              <span>Start Op 40 Precision Grinding (Hold Satisfied ✓)</span>
            </>
          )}
        </button>
      </div>

      {/* High-Visibility Interlock Screen Flash (PRD Section 8.2) */}
      {showInterlockFlash && (
        <div className="interlock-banner-danger mt-4 animate-shake">
          <div className="flex items-center gap-3">
            <AlertOctagon size={36} className="text-red flex-shrink-0 animate-bounce" />
            <div>
              <h3 className="text-lg font-bold text-red font-mono">
                ⛔ HARD INTERLOCK ACTIVE: Op 40 Precision Grinding Blocked!
              </h3>
              <p className="text-sm font-semibold text-white">
                "Mandatory Cooling Hold Active ({formatTime(remainingSeconds)} remaining)"
              </p>
              <p className="text-xs text-secondary mt-1">
                PRD Section 8.2: Part stress relief is incomplete. Machining before thermal normalization will induce severe structural warpage and metallurgical cracking. Spindle startup disabled.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
