import React, { useState } from 'react';
import { 
  GitFork, 
  CheckCircle2, 
  Lock, 
  Play, 
  ArrowRight, 
  Clock, 
  UserCheck, 
  Flame, 
  Wrench,
  ShieldCheck
} from 'lucide-react';
import { ProcessAgingTimer } from './ProcessAgingTimer';
import { soundEngine } from '../data/soundEffects';
import { auditTrail } from '../data/auditLogStore';

export function TravelerRouting({ traveler, onUpdateTraveler, currentUser }) {
  const [activeTraveler, setActiveTraveler] = useState(traveler);

  const operations = activeTraveler.operations;

  // Sign off an active operation
  const handleSignOffOp = (opIndex) => {
    const updatedOps = [...operations];
    const targetOp = updatedOps[opIndex];

    targetOp.status = 'COMPLETED';
    targetOp.completedAt = new Date().toLocaleTimeString();
    targetOp.signedOffBy = `${currentUser?.empId || 'SUP-304'} (${currentUser?.name || 'V. Malhotra'})`;

    // Unlock subsequent op if exists and not locked by hold timer
    if (opIndex + 1 < updatedOps.length) {
      if (updatedOps[opIndex + 1].status === 'LOCKED' || updatedOps[opIndex + 1].status === 'PENDING') {
        updatedOps[opIndex + 1].status = 'IN_PROCESS';
        updatedOps[opIndex + 1].startedAt = new Date().toLocaleTimeString();
      }
    }

    const updated = {
      ...activeTraveler,
      operations: updatedOps
    };

    setActiveTraveler(updated);
    if (onUpdateTraveler) onUpdateTraveler(updated);
    soundEngine.playPassChime();

    auditTrail.logEvent({
      userId: currentUser?.empId || 'SUP-304',
      role: currentUser?.title || 'Shift Supervisor',
      action: 'OPERATION_SIGNOFF',
      entityId: `${activeTraveler.id}-${targetOp.id}`,
      previousValue: 'IN_PROCESS',
      newValue: 'COMPLETED',
      details: `${targetOp.name} marked completed and electronically signed off.`
    });
  };

  return (
    <div className="traveler-routing-root">
      {/* Traveler Header Card */}
      <div className="traveler-master-card">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-cyan font-mono text-xs">DIGITAL JOB TRAVELER</span>
              <h3 className="text-xl font-bold font-mono">{activeTraveler.id}</h3>
            </div>
            <div className="text-xs text-secondary mt-1">
              Part: <strong>{activeTraveler.partNumber}</strong> — {activeTraveler.partName} | 
              Heat Lot: <strong className="text-cyan font-mono">{activeTraveler.heatNumber}</strong> | 
              Lot Size: <strong>{activeTraveler.batchQty} Units</strong>
            </div>
          </div>

          <div className="text-right font-mono text-xs">
            <div className="text-secondary">Current Location:</div>
            <strong className="text-white">{activeTraveler.currentLocation}</strong>
          </div>
        </div>
      </div>

      {/* Embedded Process Aging Hold Timer for Op 30 -> Op 40 */}
      <ProcessAgingTimer
        traveler={activeTraveler}
        onUpdateTraveler={onUpdateTraveler}
        currentUser={currentUser}
      />

      {/* Sequential Process Routing Stages (PRD Section 7.1) */}
      <div className="routing-sequence-card mt-4">
        <div className="routing-card-header">
          <div className="flex items-center gap-2">
            <GitFork size={18} className="text-cyan" />
            <h4 className="text-base font-bold">Sequential Process Routing Progression (Op 10 to Op 60)</h4>
          </div>
          <p className="text-xs text-secondary">
            PRD Section 7.1: Strict chronological execution lock. Operators cannot log time or start Op 30 if Op 20 is incomplete.
          </p>
        </div>

        <div className="operations-timeline">
          {operations.map((op, idx) => {
            const isCompleted = op.status === 'COMPLETED';
            const isInProcess = op.status === 'IN_PROCESS' || op.status === 'IN_INSPECTION';
            const isLocked = op.status === 'LOCKED';
            const isPending = op.status === 'PENDING';

            // Sequential lock rule: Cannot work on this op if prior op is not completed
            const priorOp = idx > 0 ? operations[idx - 1] : null;
            const priorOpIncomplete = priorOp && priorOp.status !== 'COMPLETED';

            return (
              <div 
                key={op.id} 
                className={`operation-node ${
                  isCompleted ? 'op-completed' : isInProcess ? 'op-active' : isLocked ? 'op-locked' : 'op-pending'
                }`}
              >
                {/* Node Status Indicator */}
                <div className="node-indicator">
                  {isCompleted ? (
                    <CheckCircle2 size={20} className="text-green" />
                  ) : isLocked ? (
                    <Lock size={18} className="text-red" />
                  ) : isInProcess ? (
                    <div className="spinner-active" />
                  ) : (
                    <div className="dot-pending" />
                  )}
                </div>

                {/* Node Content */}
                <div className="node-content">
                  <div className="node-top-row">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-cyan">{op.opNumber}:</span>
                      <strong className="text-sm font-semibold">{op.name}</strong>
                    </div>

                    <div className="node-status-pill font-mono text-xs">
                      {isCompleted && <span className="text-green">✓ COMPLETED</span>}
                      {isInProcess && <span className="text-amber animate-pulse">● IN PROGRESS</span>}
                      {isLocked && <span className="text-red">🔒 INTERLOCK LOCKED</span>}
                      {isPending && <span className="text-muted">PENDING SEQUENCE</span>}
                    </div>
                  </div>

                  <div className="node-meta-grid text-xs text-secondary font-mono mt-2">
                    <div>Station: <strong>{op.workstation}</strong></div>
                    <div>Cycle Time: <strong>{op.cycleTimeMinutes || 30} mins</strong></div>
                    {op.signedOffBy && (
                      <div className="text-green">Signed By: <strong>{op.signedOffBy}</strong></div>
                    )}
                  </div>

                  {/* Sequential Dependency Lockout Notice */}
                  {priorOpIncomplete && (
                    <div className="prior-lock-warning text-xs text-amber font-mono mt-2 flex items-center gap-1">
                      <Lock size={12} />
                      <span>Sequential Lock: Cannot proceed until {priorOp.opNumber} ({priorOp.name}) is signed off.</span>
                    </div>
                  )}

                  {/* Sign-off button for active operation */}
                  {isInProcess && !priorOpIncomplete && (
                    <div className="node-actions mt-3">
                      <button
                        type="button"
                        className="btn-industrial btn-success text-xs font-mono"
                        onClick={() => handleSignOffOp(idx)}
                      >
                        <ShieldCheck size={14} />
                        <span>Sign-off & Complete {op.opNumber}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
