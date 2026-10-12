import React, { useState } from 'react';
import { 
  QrCode, 
  Barcode, 
  CheckCircle2, 
  AlertCircle, 
  Scan, 
  RefreshCw, 
  CheckCheck,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { WORKSTATIONS, INITIAL_JOB_TRAVELERS } from '../data/initialData';
import { soundEngine } from '../data/soundEffects';
import { auditTrail } from '../data/auditLogStore';

export function DualQRScanner({
  scannedStation,
  scannedTraveler,
  onScanStation,
  onScanTraveler,
  onResetScan,
  currentUser
}) {
  const [activeCameraTarget, setActiveCameraTarget] = useState(null); // 'station' | 'traveler' | null
  const [simulatedScanning, setSimulatedScanning] = useState(false);

  const isFullyUnlocked = Boolean(scannedStation && scannedTraveler);

  const handleSimulateScan = (type, value) => {
    setSimulatedScanning(true);
    soundEngine.playQrBeep();

    setTimeout(() => {
      setSimulatedScanning(false);
      setActiveCameraTarget(null);

      if (type === 'station') {
        onScanStation(value);
        auditTrail.logEvent({
          userId: currentUser?.empId || 'QA-8821',
          role: currentUser?.title || 'QA Floor Inspector',
          action: 'QR_SCAN_STATION',
          entityId: value.code,
          previousValue: 'STATION_UNSCANNED',
          newValue: value.code,
          details: `Physical station presence verified at ${value.name}`
        });
      } else {
        onScanTraveler(value);
        auditTrail.logEvent({
          userId: currentUser?.empId || 'QA-8821',
          role: currentUser?.title || 'QA Floor Inspector',
          action: 'QR_SCAN_TRAVELER',
          entityId: value.id,
          previousValue: 'TRAVELER_UNSCANNED',
          newValue: value.id,
          details: `Job Traveler barcode validated for part ${value.partNumber} lot size ${value.batchQty}`
        });
      }
    }, 600);
  };

  return (
    <div className="dual-qr-card">
      {/* Header Info */}
      <div className="qr-header-banner">
        <div className="qr-title-group">
          <div className="qr-icon-pill">
            <Scan size={22} className="text-cyan" />
          </div>
          <div>
            <h3 className="qr-section-title">Mandatory Dual QR Code Physical Presence Rule</h3>
            <p className="qr-section-subtitle">
              PRD Section 5.1: Manual keyboard search disabled. Operator must scan both the physical Station Frame QR and the Job Traveler Barcode.
            </p>
          </div>
        </div>

        {isFullyUnlocked ? (
          <div className="qr-status-badge badge-unlocked">
            <CheckCheck size={18} />
            <span>Presence Verified: Station Active</span>
          </div>
        ) : (
          <div className="qr-status-badge badge-locked">
            <Lock size={18} />
            <span>Digital Boundary: Scan Required</span>
          </div>
        )}
      </div>

      {/* Two Scan Targets Grid */}
      <div className="dual-scan-grid">
        {/* Target 1: Machine / Workstation QR */}
        <div className={`scan-target-box ${scannedStation ? 'scan-success' : 'scan-pending'}`}>
          <div className="target-top-row">
            <div className="target-label">
              <QrCode size={18} />
              <span>Step 1: Workstation Frame QR</span>
            </div>
            {scannedStation ? (
              <span className="badge badge-green font-mono">
                <CheckCircle2 size={14} /> SCANNED
              </span>
            ) : (
              <span className="badge badge-amber font-mono">PENDING SCAN</span>
            )}
          </div>

          {scannedStation ? (
            <div className="scanned-result-view">
              <div className="scanned-name">{scannedStation.name}</div>
              <div className="scanned-meta font-mono">
                Code: <strong>{scannedStation.code}</strong> • Dept: {scannedStation.department}
              </div>
              <div className="scanned-meta">
                Machine: {scannedStation.type}
              </div>
            </div>
          ) : (
            <div className="scan-prompt-view">
              <p className="scan-instruction">
                Aim tablet camera at the QR code plate mounted on the workstation machine frame.
              </p>
              <div className="quick-scan-pills">
                <span className="quick-label">Simulate Physical Scan:</span>
                {WORKSTATIONS.map((stn) => (
                  <button
                    key={stn.id}
                    type="button"
                    className="btn-quick-scan font-mono"
                    onClick={() => handleSimulateScan('station', stn)}
                  >
                    Scan {stn.code}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Target 2: Job Traveler Barcode */}
        <div className={`scan-target-box ${scannedTraveler ? 'scan-success' : 'scan-pending'}`}>
          <div className="target-top-row">
            <div className="target-label">
              <Barcode size={18} />
              <span>Step 2: Job Traveler Sheet Barcode</span>
            </div>
            {scannedTraveler ? (
              <span className="badge badge-green font-mono">
                <CheckCircle2 size={14} /> SCANNED
              </span>
            ) : (
              <span className="badge badge-amber font-mono">PENDING SCAN</span>
            )}
          </div>

          {scannedTraveler ? (
            <div className="scanned-result-view">
              <div className="scanned-name">
                {scannedTraveler.partNumber} — {scannedTraveler.partName}
              </div>
              <div className="scanned-meta font-mono">
                Traveler: <strong>{scannedTraveler.barcode}</strong> • Heat Batch: <strong>{scannedTraveler.heatNumber}</strong>
              </div>
              <div className="scanned-meta">
                Customer: {scannedTraveler.customer} • Batch Size: {scannedTraveler.batchQty} pcs
              </div>
            </div>
          ) : (
            <div className="scan-prompt-view">
              <p className="scan-instruction">
                Aim tablet camera at the barcode on the physical Job Traveler accompanying this batch.
              </p>
              <div className="quick-scan-pills">
                <span className="quick-label">Simulate Traveler Barcode Scan:</span>
                {INITIAL_JOB_TRAVELERS.map((trv) => (
                  <button
                    key={trv.id}
                    type="button"
                    className="btn-quick-scan font-mono"
                    onClick={() => handleSimulateScan('traveler', trv)}
                  >
                    Scan {trv.id}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      {isFullyUnlocked && (
        <div className="qr-footer-actions">
          <div className="presence-confirmed-msg">
            <ShieldCheck size={20} className="text-green" />
            <span>Dual verification complete. Shopfloor tablet is now locked to this lot.</span>
          </div>
          <button
            type="button"
            className="btn-industrial btn-outline"
            onClick={onResetScan}
          >
            <RefreshCw size={16} />
            <span>Switch Station / Job</span>
          </button>
        </div>
      )}
    </div>
  );
}
