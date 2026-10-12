import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, FileText, AlertTriangle, Key } from 'lucide-react';
import { soundEngine } from '../data/soundEffects';

export function ConcessionModal({ 
  isOpen, 
  onClose, 
  onGrantConcession, 
  inspectionRecord,
  currentUser 
}) {
  const [reasonCode, setReasonCode] = useState('CR-01');
  const [justification, setJustification] = useState('');
  const [digitalSignature, setDigitalSignature] = useState(currentUser?.name || 'Vikram Malhotra');

  if (!isOpen || !inspectionRecord) return null;

  const concessionReasonCodes = [
    { code: 'CR-01', desc: 'Non-Critical Mating Clearance: Fits mating hub with zero interference.' },
    { code: 'CR-02', desc: 'Minor Surface Blemish: Ra slightly elevated, structural metallurgy intact.' },
    { code: 'CR-03', desc: 'Sub-Assembly Reworkable: Excess stock easily faced off at downstream cell.' },
    { code: 'CR-04', desc: 'Customer Deviation Pre-Approved: Low-stress application allowance.' }
  ];

  const isValid = justification.trim().length >= 15 && digitalSignature.trim().length > 0;

  const handleConfirm = () => {
    if (!isValid) return;
    onGrantConcession({
      reasonCode,
      justification,
      authorizedBy: digitalSignature,
      role: currentUser?.title || 'Shift Supervisor',
      grantedAt: new Date().toISOString()
    });
    soundEngine.playPassChime();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-industrial">
        <div className="modal-header-alert">
          <div className="flex items-center gap-3">
            <ShieldAlert size={26} className="text-amber" />
            <div>
              <h3 className="text-lg font-bold text-amber">Conditional Concession Release (PRD Section 6.2)</h3>
              <p className="text-xs text-secondary">
                Authorizing conditional departure from nominal drawing specifications.
              </p>
            </div>
          </div>
        </div>

        <div className="interlock-banner-danger my-4" style={{ borderColor: 'var(--color-amber)', background: 'var(--color-amber-bg)' }}>
          <div className="flex items-start gap-2 text-sm">
            <AlertTriangle size={18} className="text-amber flex-shrink-0 mt-0.5" />
            <div>
              <strong>Engineering Concession Governance:</strong>
              <p className="text-xs text-secondary mt-1">
                Concession lots are permanently flagged in the digital lineage. This batch will carry an explicit warning flag on customer dispatch manifests and traceability audits.
              </p>
            </div>
          </div>
        </div>

        {/* Reason Code Dropdown */}
        <div className="form-group mb-4">
          <label className="text-xs font-mono text-secondary mb-1 block">
            CONCESSION REASON CODE:
          </label>
          <select
            className="industrial-input font-mono text-sm"
            value={reasonCode}
            onChange={(e) => setReasonCode(e.target.value)}
          >
            {concessionReasonCodes.map((r) => (
              <option key={r.code} value={r.code}>
                {r.code} — {r.desc}
              </option>
            ))}
          </select>
        </div>

        {/* Mandatory Engineering Justification */}
        <div className="form-group mb-4">
          <label className="text-xs font-mono text-secondary mb-1 block">
            DETAILED ENGINEERING JUSTIFICATION (MIN 15 CHARACTERS MANDATORY):
          </label>
          <textarea
            rows={4}
            className="industrial-input text-sm"
            placeholder="Explain why this dimensional variance does not compromise mechanical integrity or customer fit..."
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
          />
          <div className="text-right text-xs text-muted font-mono mt-1">
            {justification.length} / 15 chars minimum
          </div>
        </div>

        {/* Digital Signature & Authorization */}
        <div className="form-group mb-5">
          <label className="text-xs font-mono text-secondary mb-1 block">
            SUPERVISOR DIGITAL SIGNATURE / EMPLOYEE ID:
          </label>
          <input
            type="text"
            className="industrial-input font-mono text-sm"
            value={digitalSignature}
            onChange={(e) => setDigitalSignature(e.target.value)}
          />
        </div>

        {/* Modal Actions */}
        <div className="modal-actions-footer">
          <button
            type="button"
            className="btn-industrial btn-outline"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-industrial btn-primary"
            disabled={!isValid}
            onClick={handleConfirm}
          >
            <CheckCircle size={18} />
            <span>Authorize Concession Release</span>
          </button>
        </div>
      </div>
    </div>
  );
}
