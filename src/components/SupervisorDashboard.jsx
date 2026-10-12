import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ShieldAlert, 
  Camera, 
  Eye, 
  Ban, 
  Layers, 
  Archive,
  Filter,
  ArrowRight
} from 'lucide-react';
import { ConcessionModal } from './ConcessionModal';
import { MRBDispositions } from './MRBDispositions';
import { BLUEPRINT_TEMPLATE } from '../data/initialData';
import { soundEngine } from '../data/soundEffects';
import { auditTrail } from '../data/auditLogStore';

export function SupervisorDashboard({ 
  inspections = [], 
  onApproveInspection, 
  onConcessionInspection, 
  onQuarantineInspection,
  onMRBDisposition,
  currentUser 
}) {
  const [selectedInspectionId, setSelectedInspectionId] = useState(inspections[0]?.id || null);
  const [isConcessionOpen, setIsConcessionOpen] = useState(false);
  const [isMRBOpen, setIsMRBOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL' | 'PENDING' | 'CONCESSION' | 'QUARANTINE'

  const activeInspection = inspections.find(i => i.id === selectedInspectionId) || inspections[0];

  const filteredInspections = inspections.filter(item => {
    if (activeFilter === 'PENDING') return item.status === 'AWAITING_SUPERVISOR_APPROVAL';
    if (activeFilter === 'CONCESSION') return item.status === 'APPROVED_WITH_CONCESSION';
    if (activeFilter === 'QUARANTINE') return item.status === 'QUARANTINED';
    return true;
  });

  const handleApprove = (insp) => {
    onApproveInspection(insp.id);
    soundEngine.playPassChime();
    auditTrail.logEvent({
      userId: currentUser?.empId || 'SUP-304',
      role: currentUser?.title || 'Shift Supervisor',
      action: 'SUPERVISOR_APPROVE',
      entityId: insp.travelerId,
      previousValue: 'AWAITING_APPROVAL',
      newValue: 'APPROVED_FOR_DISPATCH',
      details: `Full dimensional approval granted by ${currentUser?.name || 'Shift Supervisor'}`
    });
  };

  const handleQuarantine = (insp) => {
    onQuarantineInspection(insp.id);
    soundEngine.playAlertBuzzer();
    auditTrail.logEvent({
      userId: currentUser?.empId || 'SUP-304',
      role: currentUser?.title || 'Shift Supervisor',
      action: 'QUARANTINE_LOT',
      entityId: insp.travelerId,
      previousValue: 'AWAITING_APPROVAL',
      newValue: 'DIGITAL_REJECTION_HOLDING_AREA',
      details: `Job lot moved to Rejection Holding Area. Downstream machines locked pending MRB disposition.`
    });
  };

  return (
    <div className="supervisor-dashboard-root">
      {/* Top Banner */}
      <div className="supervisor-header-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="qr-icon-pill">
              <ClipboardCheck size={24} className="text-amber" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Shift Supervisor Live Approval Queue (PRD Section 6.1)</h3>
              <p className="text-xs text-secondary">
                Review submitted dimensions, tool logs, defect photos, and issue final disposition decisions.
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="queue-filter-pills font-mono text-xs">
            <button
              type="button"
              className={`pill-filter-btn ${activeFilter === 'ALL' ? 'active-filter' : ''}`}
              onClick={() => setActiveFilter('ALL')}
            >
              All Lots ({inspections.length})
            </button>
            <button
              type="button"
              className={`pill-filter-btn ${activeFilter === 'PENDING' ? 'active-filter' : ''}`}
              onClick={() => setActiveFilter('PENDING')}
            >
              Pending Approval ({inspections.filter(i => i.status === 'AWAITING_SUPERVISOR_APPROVAL').length})
            </button>
            <button
              type="button"
              className={`pill-filter-btn ${activeFilter === 'QUARANTINE' ? 'active-filter' : ''}`}
              onClick={() => setActiveFilter('QUARANTINE')}
            >
              Quarantined ({inspections.filter(i => i.status === 'QUARANTINED').length})
            </button>
          </div>
        </div>
      </div>

      {inspections.length === 0 ? (
        <div className="empty-queue-card">
          <ClipboardCheck size={48} className="text-muted mb-2" />
          <h4 className="font-bold">No Inspections in Queue</h4>
          <p className="text-xs text-secondary mt-1">
            Complete a dimensional inspection on the <strong>Tablet Inspector</strong> tab to populate this queue.
          </p>
        </div>
      ) : (
        <div className="supervisor-split-view">
          {/* Left Column: Queue List */}
          <div className="supervisor-queue-list">
            <div className="queue-list-heading font-mono text-xs text-secondary">
              PENDING SUBMISSIONS ({filteredInspections.length}):
            </div>
            <div className="queue-items-stack">
              {filteredInspections.map((insp) => {
                const isSelected = activeInspection?.id === insp.id;
                const isPending = insp.status === 'AWAITING_SUPERVISOR_APPROVAL';
                const isApproved = insp.status === 'APPROVED' || insp.status === 'APPROVED_WITH_CONCESSION';
                const isQuarantined = insp.status === 'QUARANTINED';

                return (
                  <div
                    key={insp.id}
                    className={`queue-item-card ${isSelected ? 'queue-item-active' : ''}`}
                    onClick={() => setSelectedInspectionId(insp.id)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-bold text-sm">{insp.travelerId}</span>
                      {isPending && (
                        <span className="badge badge-amber font-mono text-xs">AWAITING REVIEW</span>
                      )}
                      {isApproved && (
                        <span className="badge badge-green font-mono text-xs">
                          {insp.status === 'APPROVED_WITH_CONCESSION' ? 'CONCESSION PASS' : 'APPROVED'}
                        </span>
                      )}
                      {isQuarantined && (
                        <span className="badge badge-red font-mono text-xs">QUARANTINED</span>
                      )}
                    </div>
                    <div className="text-xs text-secondary">
                      Part: <strong>{insp.partNumber}</strong> • Station: {insp.stationCode}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted font-mono mt-2">
                      <span>By: {insp.inspectorName}</span>
                      {insp.hasCtqFail && (
                        <span className="text-red font-bold">⛔ CTQ FAIL</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Review & 3-Way Decision Gate */}
          {activeInspection && (
            <div className="supervisor-review-panel">
              {/* Inspection Overview Header */}
              <div className="review-panel-top">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold font-mono">{activeInspection.travelerId}</h4>
                    <span className="badge badge-cyan font-mono text-xs">Record #{activeInspection.id}</span>
                  </div>
                  <div className="text-xs text-secondary mt-1">
                    Inspector: <strong>{activeInspection.inspectorName} ({activeInspection.inspectorEmpId})</strong> • 
                    Station: <strong>{activeInspection.stationCode}</strong>
                  </div>
                </div>

                <div>
                  {activeInspection.hasCtqFail ? (
                    <div className="badge badge-red font-mono text-xs">
                      CRITICAL CTQ NON-CONFORMANCE
                    </div>
                  ) : activeInspection.hasOutlier ? (
                    <div className="badge badge-amber font-mono text-xs">
                      NON-CTQ VARIANCE
                    </div>
                  ) : (
                    <div className="badge badge-green font-mono text-xs">
                      100% IN SPECIFICATION
                    </div>
                  )}
                </div>
              </div>

              {/* Dimensional Measurements Breakdown Table */}
              <div className="review-table-wrapper my-3">
                <table className="industrial-table">
                  <thead>
                    <tr>
                      <th>Pin</th>
                      <th>Feature Name</th>
                      <th>Nominal & Limits</th>
                      <th>Measured</th>
                      <th>Tolerance Delta</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BLUEPRINT_TEMPLATE.pins.map((pin) => {
                      const m = activeInspection.measurements[pin.id];
                      const isPass = m?.eval?.status === 'PASS';
                      return (
                        <tr key={pin.id} className={!isPass ? 'row-fail' : ''}>
                          <td className="font-mono text-center">{pin.pinNumber}</td>
                          <td>
                            <div className="font-semibold text-xs">{pin.parameterName}</div>
                            {pin.isCTQ && <span className="badge badge-ctq text-xs">CTQ</span>}
                          </td>
                          <td className="font-mono text-xs">
                            {pin.type === 'TOLERANCE' && `${pin.nominal} [${pin.lowerLimit} to ${pin.upperLimit}]`}
                            {pin.type === 'MAX_LIMIT' && `≤ ${pin.upperLimit} ${pin.unit}`}
                            {pin.type === 'PASS_FAIL' && 'Deburred Pass'}
                          </td>
                          <td className="font-mono text-xs font-bold">
                            {m?.value || 'N/A'}
                          </td>
                          <td className="font-mono text-xs">
                            {m?.eval?.delta || 'N/A'}
                          </td>
                          <td>
                            {isPass ? (
                              <span className="text-green text-xs font-mono font-bold flex items-center gap-1">
                                <CheckCircle2 size={13} /> PASS
                              </span>
                            ) : (
                              <span className="text-red text-xs font-mono font-bold flex items-center gap-1">
                                <XCircle size={13} /> FAIL
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Attached Defect Photos (PRD Section 5.4 Proof) */}
              {activeInspection.defectPhotos && activeInspection.defectPhotos.length > 0 && (
                <div className="review-photos-card my-3">
                  <div className="text-xs font-mono text-secondary mb-2 flex items-center gap-1">
                    <Camera size={14} />
                    <span>DEFECT EVIDENCE PHOTOGRAPHS (MANDATORY PROOF AUDIT):</span>
                  </div>
                  <div className="flex gap-3">
                    {activeInspection.defectPhotos.map((photo, i) => (
                      <div key={photo.id || i} className="review-photo-thumb">
                        <img src={photo.url} alt={photo.title} className="thumb-img" />
                        <div className="thumb-title font-mono">{photo.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Concession Notice if already granted */}
              {activeInspection.concessionDetails && (
                <div className="concession-record-box my-3">
                  <div className="font-mono font-bold text-xs text-amber mb-1">
                    CONDITIONAL CONCESSION CERTIFIED (CODE: {activeInspection.concessionDetails.reasonCode})
                  </div>
                  <div className="text-xs text-secondary">
                    Justification: "{activeInspection.concessionDetails.justification}"
                  </div>
                  <div className="text-xs text-muted font-mono mt-1">
                    Authorized By: {activeInspection.concessionDetails.authorizedBy} ({activeInspection.concessionDetails.role})
                  </div>
                </div>
              )}

              {/* Quarantined Notice if already quarantined */}
              {activeInspection.status === 'QUARANTINED' && (
                <div className="interlock-banner-danger my-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-red font-mono">LOT IN DIGITAL REJECTION HOLDING AREA</div>
                      <div className="text-xs text-secondary mt-1">
                        Physical movements blocked. Awaiting Material Review Board (MRB) disposition.
                      </div>
                      {activeInspection.mrbDisposition && (
                        <div className="text-xs text-cyan font-mono mt-1">
                          MRB Action Executed: <strong>{activeInspection.mrbDisposition.dispositionType}</strong>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      className="btn-industrial btn-primary text-xs"
                      onClick={() => setIsMRBOpen(true)}
                    >
                      Open MRB Console
                    </button>
                  </div>
                </div>
              )}

              {/* 3-State Supervisor Decision Actions (PRD Section 6.1) */}
              {activeInspection.status === 'AWAITING_SUPERVISOR_APPROVAL' && (
                <div className="decision-actions-footer mt-4">
                  <div className="decision-actions-grid">
                    {/* Action 1: Full Approval */}
                    <button
                      type="button"
                      className="btn-industrial btn-success flex-1"
                      onClick={() => handleApprove(activeInspection)}
                    >
                      <CheckCircle2 size={18} />
                      <span>1. Approve (Clear Lot)</span>
                    </button>

                    {/* Action 2: Conditional Concession (PRD Section 6.2 - STRICTLY FORBIDDEN FOR CTQ!) */}
                    {activeInspection.hasCtqFail ? (
                      <div className="concession-blocked-box flex-1">
                        <button
                          type="button"
                          className="btn-industrial btn-outline w-full"
                          disabled
                          title="PRD Section 4.3 strictly forbids supervisor concessions on CTQ items"
                        >
                          <Ban size={18} className="text-red" />
                          <span>2. Concession Forbidden (CTQ Defect)</span>
                        </button>
                        <span className="text-xs text-red font-mono mt-1 block text-center">
                          PRD 4.3 Lock: CTQ defects cannot receive concessions.
                        </span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="btn-industrial btn-outline flex-1"
                        style={{ borderColor: 'var(--color-amber)', color: 'var(--color-amber)' }}
                        onClick={() => setIsConcessionOpen(true)}
                      >
                        <AlertTriangle size={18} />
                        <span>2. Issue Concession Release</span>
                      </button>
                    )}

                    {/* Action 3: Rejection & Quarantine */}
                    <button
                      type="button"
                      className="btn-industrial btn-danger flex-1"
                      onClick={() => handleQuarantine(activeInspection)}
                    >
                      <Archive size={18} />
                      <span>3. Quarantine to Rejection Area</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Concession Justification Modal */}
      <ConcessionModal
        isOpen={isConcessionOpen}
        onClose={() => setIsConcessionOpen(false)}
        inspectionRecord={activeInspection}
        currentUser={currentUser}
        onGrantConcession={(concessionData) => {
          onConcessionInspection(activeInspection.id, concessionData);
          auditTrail.logEvent({
            userId: currentUser?.empId || 'SUP-304',
            role: currentUser?.title || 'Shift Supervisor',
            action: 'CONCESSION_GRANTED',
            entityId: activeInspection.travelerId,
            previousValue: 'AWAITING_APPROVAL',
            newValue: 'APPROVED_WITH_CONCESSION',
            details: `Concession Code: ${concessionData.reasonCode}. Justification: ${concessionData.justification}`
          });
        }}
      />

      {/* Material Review Board Console */}
      <MRBDispositions
        quarantinedItem={activeInspection?.status === 'QUARANTINED' ? activeInspection : null}
        onClose={() => setIsMRBOpen(false)}
        currentUser={currentUser}
        onExecuteDisposition={(dispData) => {
          onMRBDisposition(activeInspection.id, dispData);
          auditTrail.logEvent({
            userId: currentUser?.empId || 'QM-102',
            role: currentUser?.title || 'Quality Manager',
            action: 'MRB_DISPOSITION',
            entityId: activeInspection.travelerId,
            previousValue: 'QUARANTINED',
            newValue: `MRB_${dispData.dispositionType}`,
            details: `Disposition: ${dispData.dispositionType}. Notes: ${dispData.notes}`
          });
        }}
      />
    </div>
  );
}
