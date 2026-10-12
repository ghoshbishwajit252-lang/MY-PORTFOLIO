import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  FileCheck, 
  QrCode, 
  Truck, 
  Printer, 
  Lock, 
  CheckCircle2, 
  AlertTriangle,
  Building,
  Calendar,
  ExternalLink,
  Award
} from 'lucide-react';
import { soundEngine } from '../data/soundEffects';
import { auditTrail } from '../data/auditLogStore';

export function PreDispatchGate({ 
  traveler, 
  inspections = [], 
  onGenerateGatePass,
  currentUser 
}) {
  const [vehicleNumber, setVehicleNumber] = useState('KA-04-TR-9942');
  const [destinationCrate, setDestinationCrate] = useState('CRATE-AERO-081');
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [gatePassGenerated, setGatePassGenerated] = useState(false);

  // 1. Evaluate Rule A: 100% of operations completed
  const allOpsComplete = traveler.operations.every(op => op.status === 'COMPLETED');
  const incompleteOps = traveler.operations.filter(op => op.status !== 'COMPLETED');

  // 2. Evaluate Rule B: Process aging hold times fulfilled (zero active holds)
  const isHoldActive = traveler?.coolingHold?.remainingSeconds > 0;

  // 3. Evaluate Rule C: Final PDI checklist signed and approved by Quality
  const approvedInspection = inspections.find(
    i => i.travelerId === traveler.id && (i.status === 'APPROVED' || i.status === 'APPROVED_WITH_CONCESSION')
  );
  const isPdiApproved = Boolean(approvedInspection);

  // 3-Gate Shipping Interlock Status
  const canDispatch = allOpsComplete && !isHoldActive && isPdiApproved;

  const handleGenerateGatePass = () => {
    if (!canDispatch) {
      soundEngine.playAlertBuzzer();
      return;
    }
    setGatePassGenerated(true);
    soundEngine.playPassChime();

    auditTrail.logEvent({
      userId: currentUser?.empId || 'WH-419',
      role: currentUser?.title || 'Warehouse & Dispatch Clerk',
      action: 'SHIPPING_GATE_PASS_ISSUED',
      entityId: `PASS-${traveler.id}`,
      previousValue: 'LOCKED',
      newValue: 'DISPATCH_CLEARED',
      details: `Gate pass issued for crate ${destinationCrate}, vehicle ${vehicleNumber}. All 3 quality gates satisfied.`
    });
  };

  return (
    <div className="pre-dispatch-gate-root">
      {/* Top Banner */}
      <div className="dispatch-header-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="qr-icon-pill">
              <Truck size={24} className="text-cyan" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Pre-Dispatch Clearance & Shipping Interlock (PRD Section 10)</h3>
              <p className="text-xs text-secondary">
                Gatekeeper lock prevents generating shipping gate passes, packing manifests, or crate QR labels unless all 3 quality criteria are verified green.
              </p>
            </div>
          </div>

          <div className="font-mono text-xs">
            {canDispatch ? (
              <span className="badge badge-green flex items-center gap-1">
                <ShieldCheck size={16} /> SHIPPING GATES CLEARED
              </span>
            ) : (
              <span className="badge badge-red flex items-center gap-1">
                <Lock size={16} /> SHIPPING INTERLOCK ENGAGED
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3 Mandatory Quality Gate Cards */}
      <div className="shipping-gates-grid my-4">
        {/* Gate 1 */}
        <div className={`gate-card ${allOpsComplete ? 'gate-passed' : 'gate-failed'}`}>
          <div className="gate-header">
            <span className="gate-number font-mono">RULE 10.1 (a)</span>
            {allOpsComplete ? (
              <CheckCircle2 size={18} className="text-green" />
            ) : (
              <Lock size={18} className="text-red" />
            )}
          </div>
          <h4 className="gate-title font-bold text-sm">100% Operations Sign-Off</h4>
          <p className="text-xs text-secondary mt-1">
            Every sequential manufacturing operation from Op 10 to Op 60 must be signed off.
          </p>
          <div className="gate-status-pill font-mono text-xs mt-3">
            {allOpsComplete ? (
              <span className="text-green">✓ All 6 Operations Signed</span>
            ) : (
              <span className="text-red">✗ Incomplete: {incompleteOps.map(o => o.opNumber).join(', ')}</span>
            )}
          </div>
        </div>

        {/* Gate 2 */}
        <div className={`gate-card ${!isHoldActive ? 'gate-passed' : 'gate-failed'}`}>
          <div className="gate-header">
            <span className="gate-number font-mono">RULE 10.1 (b)</span>
            {!isHoldActive ? (
              <CheckCircle2 size={18} className="text-green" />
            ) : (
              <Lock size={18} className="text-red" />
            )}
          </div>
          <h4 className="gate-title font-bold text-sm">Process Aging & Cooling Holds</h4>
          <p className="text-xs text-secondary mt-1">
            Mandatory thermal cooling and chemical curing hold times must reach zero without active holds.
          </p>
          <div className="gate-status-pill font-mono text-xs mt-3">
            {!isHoldActive ? (
              <span className="text-green">✓ Thermal Cooling Fulfilled</span>
            ) : (
              <span className="text-red">✗ Cooling Hold Active (1h 22m)</span>
            )}
          </div>
        </div>

        {/* Gate 3 */}
        <div className={`gate-card ${isPdiApproved ? 'gate-passed' : 'gate-failed'}`}>
          <div className="gate-header">
            <span className="gate-number font-mono">RULE 10.1 (c)</span>
            {isPdiApproved ? (
              <CheckCircle2 size={18} className="text-green" />
            ) : (
              <Lock size={18} className="text-red" />
            )}
          </div>
          <h4 className="gate-title font-bold text-sm">Final PDI Quality Approval</h4>
          <p className="text-xs text-secondary mt-1">
            Pre-Dispatch Inspection signed and approved by Shift Supervisor / Quality Manager.
          </p>
          <div className="gate-status-pill font-mono text-xs mt-3">
            {isPdiApproved ? (
              <span className="text-green">✓ Approved by Quality</span>
            ) : (
              <span className="text-red">✗ PDI Checklist Pending Approval</span>
            )}
          </div>
        </div>
      </div>

      {/* Gate Pass Generation Action & High-Visibility Lockout Warning */}
      {!canDispatch ? (
        <div className="interlock-banner-danger my-4">
          <div className="flex items-start gap-3">
            <ShieldAlert size={32} className="text-red flex-shrink-0" />
            <div>
              <h4 className="font-bold text-red font-mono text-base">
                ELECTRONIC SHIPPING INTERLOCK LOCKOUT (PRD Section 10.2)
              </h4>
              <p className="text-sm font-semibold text-white mt-1">
                Dispatch gate pass, commercial invoice, and customer crate QR printing are strictly locked.
              </p>
              <ul className="text-xs text-secondary list-disc pl-5 mt-2 space-y-1">
                {!allOpsComplete && (
                  <li><strong>Rule 1 Failed:</strong> Incomplete manufacturing operations ({incompleteOps.map(o => o.name).join(', ')}). Complete routing in Tab 3.</li>
                )}
                {isHoldActive && (
                  <li><strong>Rule 2 Failed:</strong> Mandatory cooling hold is still active. Accelerate or expire timer in Tab 3.</li>
                )}
                {!isPdiApproved && (
                  <li><strong>Rule 3 Failed:</strong> Final PDI quality checklist has not been approved by the Shift Supervisor. Submit & approve in Tabs 1 & 2.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="dispatch-action-box my-4 p-4 rounded-lg bg-surface border border-green">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck size={22} className="text-green" />
              <strong className="text-green font-mono">ALL 3 GATES VERIFIED GREEN: READY FOR GATE PASS GENERATION</strong>
            </div>
            <span className="badge badge-green font-mono text-xs">INTERLOCK CLEARED</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-mono text-secondary mb-1 block">TRANSPORT DISPATCH VEHICLE #:</label>
              <input
                type="text"
                className="industrial-input font-mono text-sm"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-mono text-secondary mb-1 block">ASSIGNED SHIPPING CRATE BARCODE:</label>
              <input
                type="text"
                className="industrial-input font-mono text-sm"
                value={destinationCrate}
                onChange={(e) => setDestinationCrate(e.target.value)}
              />
            </div>
          </div>

          <button
            type="button"
            className="btn-industrial btn-success w-full font-mono text-base"
            onClick={handleGenerateGatePass}
          >
            <Printer size={20} />
            <span>Generate Official Gate Pass & Printable Crate QR Label</span>
          </button>
        </div>
      )}

      {/* Generated Gate Pass & Customer Crate QR (PRD Section 11) */}
      {gatePassGenerated && (
        <div className="gate-pass-print-card my-5">
          <div className="flex items-center justify-between mb-3 border-b border-light pb-3">
            <div className="flex items-center gap-2">
              <Award size={22} className="text-cyan" />
              <div>
                <h4 className="text-base font-bold font-mono">OFFICIAL DISPATCH CLEARANCE GATE PASS</h4>
                <div className="text-xs text-secondary font-mono">Pass # GP-2026-9041 • Released for Transport</div>
              </div>
            </div>
            <button
              type="button"
              className="btn-industrial btn-primary text-xs"
              onClick={() => setShowCertificateModal(true)}
            >
              <ExternalLink size={14} />
              <span>View End-Customer Digital Certificate (CoA)</span>
            </button>
          </div>

          <div className="gate-pass-details-grid">
            <div className="gate-pass-meta text-xs font-mono space-y-1">
              <div>Customer: <strong>{traveler.customer}</strong></div>
              <div>Purchase Order: <strong>{traveler.poNumber}</strong></div>
              <div>Component: <strong>{traveler.partNumber} ({traveler.partName})</strong></div>
              <div>Batch Quantity: <strong>{traveler.batchQty} Units</strong></div>
              <div>Raw Material Heat Lot: <strong>{traveler.heatNumber}</strong></div>
              <div>Vehicle Manifest: <strong>{vehicleNumber}</strong></div>
            </div>

            {/* Crate QR Code Display */}
            <div className="crate-qr-box">
              <div className="qr-simulated-label">
                <div className="qr-label-header font-mono">ZAPUZA CERTIFIED QUALITY</div>
                <div className="qr-box-center">
                  <QrCode size={100} className="text-black" />
                </div>
                <div className="qr-label-footer font-mono">SCAN FOR DIGITAL CoA</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: End-Customer Digital Inspection Certificate (PRD Section 11.3) */}
      {showCertificateModal && (
        <div className="modal-overlay">
          <div className="modal-content-industrial digital-certificate-modal">
            <div className="modal-header-alert border-b border-light pb-3">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Award size={24} className="text-cyan" />
                  <div>
                    <h3 className="text-base font-bold font-mono">Digital Certificate of Analysis (CoA)</h3>
                    <p className="text-xs text-secondary">PRD Section 11.3: End-Customer Certified Quality Report</p>
                  </div>
                </div>
                <span className="badge badge-green font-mono text-xs">AS9100 CERTIFIED</span>
              </div>
            </div>

            <div className="certificate-body my-4 text-xs font-mono space-y-3">
              <div className="p-3 bg-surface rounded border border-light">
                <div className="font-bold text-sm text-cyan mb-1">{traveler.partName}</div>
                <div>Part Number: <strong>{traveler.partNumber} (Rev B)</strong></div>
                <div>Customer PO: <strong>{traveler.poNumber}</strong></div>
                <div>Manufacturer: <strong>Zapuza Technologies LLP - Plant #01</strong></div>
                <div>Raw Material Heat Number: <strong>{traveler.heatNumber} (AISI 4140)</strong></div>
              </div>

              <div className="p-3 bg-surface rounded border border-light">
                <div className="font-bold mb-2">VERIFIED PHYSICAL & DIMENSIONAL INSPECTION:</div>
                <div className="space-y-1">
                  <div>• Journal OD (Nominal 25.000 mm): <strong>25.020 mm (PASS)</strong></div>
                  <div>• Thread Pitch (M16 x 1.5): <strong>15.030 mm (PASS)</strong></div>
                  <div>• Surface Roughness: <strong>0.45 µm (PASS - Limit 0.80 µm)</strong></div>
                  <div>• Total Radial Runout: <strong>0.012 mm (PASS - Limit 0.020 mm)</strong></div>
                  <div>• Visual Burr & Chamfer: <strong>CONFORMING (PASS)</strong></div>
                </div>
              </div>

              <div className="p-3 bg-surface rounded border border-light">
                <div className="font-bold mb-1">METALLURGY & CHEMICAL PURITY:</div>
                <div>C: 0.41% | Mn: 0.88% | Si: 0.24% | Cr: 0.96% | Mo: 0.21% (All In-Spec)</div>
                <div>Hardness: <strong>30.5 HRC Core / 58 HRC Case Induction Hardened</strong></div>
              </div>

              <div className="flex justify-between items-center pt-2 text-muted">
                <div>Digital Signature Hash: <strong>SHA256: 7f8a9e...2026</strong></div>
                <div>Quality Lead: <strong>Anita Roy (QM-102)</strong></div>
              </div>
            </div>

            <div className="modal-actions-footer">
              <button
                type="button"
                className="btn-industrial btn-primary w-full"
                onClick={() => setShowCertificateModal(false)}
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
