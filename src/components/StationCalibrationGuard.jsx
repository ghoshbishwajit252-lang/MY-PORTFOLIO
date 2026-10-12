import React from 'react';
import { 
  Wrench, 
  AlertTriangle, 
  CheckCircle, 
  ShieldAlert, 
  Scale, 
  Calendar,
  AlertOctagon
} from 'lucide-react';
import { GAUGES_REGISTER } from '../data/initialData';
import { soundEngine } from '../data/soundEffects';

export function StationCalibrationGuard({ 
  selectedStation, 
  selectedToolId, 
  onSelectTool,
  onResolvePM 
}) {
  const isPmOverdue = selectedStation?.dailyPmStatus === 'OVERDUE';
  const selectedTool = GAUGES_REGISTER.find(g => g.id === selectedToolId) || GAUGES_REGISTER[0];
  const isToolExpired = selectedTool?.status === 'EXPIRED';

  const handleToolChange = (e) => {
    const toolId = e.target.value;
    onSelectTool(toolId);
    const chosen = GAUGES_REGISTER.find(g => g.id === toolId);
    if (chosen?.status === 'EXPIRED') {
      soundEngine.playAlertBuzzer();
    }
  };

  return (
    <div className="calibration-guard-wrapper">
      {/* 1. Station Daily PM & Maintenance Check Lock (PRD Section 2.2) */}
      {isPmOverdue ? (
        <div className="interlock-banner-danger pm-lockout-box">
          <div className="pm-lockout-header">
            <AlertOctagon size={28} className="text-red animate-pulse" />
            <div>
              <h4 className="pm-lockout-title">HARD INTERLOCK: Workstation Disabled (Daily PM Overdue)</h4>
              <p className="pm-lockout-sub">
                PRD Section 2.2: Machine setup calibration and preventive maintenance checks are overdue. 
                Job processing and quality entries are strictly blocked.
              </p>
            </div>
          </div>
          <div className="pm-lockout-meta font-mono">
            <span>Machine: <strong>{selectedStation.name}</strong></span>
            <span>Overdue By: <strong>48+ Hours</strong></span>
            <span>Alert Dispatched: <strong>Maintenance Supervisor Lead</strong></span>
          </div>
          {onResolvePM && (
            <div className="pm-override-row">
              <button 
                type="button" 
                className="btn-industrial btn-danger font-mono"
                onClick={onResolvePM}
              >
                <Wrench size={16} />
                <span>Simulate Maintenance Supervisor PM Sign-off</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="pm-status-verified">
          <div className="pm-verified-left">
            <CheckCircle size={18} className="text-green" />
            <span>Machine PM Verified: <strong>{selectedStation?.name || 'Active Station'}</strong></span>
          </div>
          <span className="font-mono text-muted text-sm">
            Zero-point & PM Check OK ({selectedStation?.pmCompletedAt || 'Shift Verified'})
          </span>
        </div>
      )}

      {/* 2. Inspection Tool Calibration Enforcement (PRD Section 2.3) */}
      <div className="tool-calibration-selector-card">
        <div className="tool-selector-header">
          <div className="tool-icon-label">
            <Scale size={18} className="text-cyan" />
            <span>Inspection Tool Calibration Enforcement (PRD Section 2.3)</span>
          </div>
          <span className="text-xs text-secondary font-mono">
            Mandatory Gauge Serial Number Scan
          </span>
        </div>

        <div className="tool-selection-row">
          <div className="tool-dropdown-group">
            <label htmlFor="tool-select" className="text-xs text-secondary">
              Active Measuring Tool / Gauge ID:
            </label>
            <select
              id="tool-select"
              className={`industrial-input font-mono ${isToolExpired ? 'input-out-spec' : ''}`}
              value={selectedToolId}
              onChange={handleToolChange}
            >
              {GAUGES_REGISTER.map((gauge) => (
                <option key={gauge.id} value={gauge.id}>
                  {gauge.id}: {gauge.name} [{gauge.status === 'EXPIRED' ? '⚠️ EXPIRED' : `Valid until ${gauge.expiryDate}`}]
                </option>
              ))}
            </select>
          </div>

          <div className="tool-status-pill-group">
            {isToolExpired ? (
              <div className="gauge-status-box gauge-expired">
                <ShieldAlert size={20} className="text-red" />
                <div>
                  <div className="gauge-status-title text-red font-mono font-bold">CALIBRATION EXPIRED</div>
                  <div className="gauge-status-desc text-xs">Expired: {selectedTool.expiryDate}</div>
                </div>
              </div>
            ) : (
              <div className="gauge-status-box gauge-valid">
                <CheckCircle size={20} className="text-green" />
                <div>
                  <div className="gauge-status-title text-green font-mono font-bold">CALIBRATION CERTIFIED</div>
                  <div className="gauge-status-desc text-xs">Valid until: {selectedTool.expiryDate}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Expired Tool Warning Banner */}
        {isToolExpired && (
          <div className="interlock-banner-danger expired-tool-banner mt-3">
            <div className="flex items-center gap-3">
              <AlertTriangle size={24} className="text-red" />
              <div>
                <strong className="text-red">EXPIRED TOOL CALIBRATION ERROR: </strong>
                <span>
                  Tablet blocks measurement entry for <strong>{selectedTool.name} (#{selectedTool.id})</strong>. 
                  Measurements with uncalibrated tools violate ISO 9001 & AS9100. Worker must obtain a calibrated tool from the tool crib ({selectedTool.toolCribBin}).
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
