import React, { useState } from 'react';
import { 
  RotateCcw, 
  Trash2, 
  Truck, 
  FileCheck, 
  AlertOctagon, 
  CheckCircle,
  Building,
  DollarSign
} from 'lucide-react';
import { soundEngine } from '../data/soundEffects';

export function MRBDispositions({ 
  quarantinedItem, 
  onExecuteDisposition, 
  onClose,
  currentUser 
}) {
  const [selectedDisposition, setSelectedDisposition] = useState('REWORK');
  const [instructions, setInstructions] = useState('');
  const [scrapCost, setScrapCost] = useState('2450.00');
  const [debitNoteNumber, setDebitNoteNumber] = useState('DN-VEND-2026-904');

  if (!quarantinedItem) return null;

  const dispositions = [
    {
      id: 'REWORK',
      title: '1. Rework Order Generation',
      desc: 'Generates dedicated rework routing traveler with corrective machining instructions.',
      icon: RotateCcw,
      color: '#38bdf8'
    },
    {
      id: 'SCRAP',
      title: '2. Permanent Scrap Write-Off',
      desc: 'Writes off inventory, books scrap loss cost codes, and requires scrap bin disposal.',
      icon: Trash2,
      color: '#ef4444'
    },
    {
      id: 'RTV',
      title: '3. Return to Vendor (RTV)',
      desc: 'Routes raw stock back to receiving dock for vendor debit note return.',
      icon: Truck,
      color: '#f59e0b'
    },
    {
      id: 'CUSTOMER_CONCESSION',
      title: '4. Customer Special Concession',
      desc: 'Holds batch in quarantine until formal written customer deviation approval is uploaded.',
      icon: FileCheck,
      color: '#a855f7'
    }
  ];

  const handleConfirm = () => {
    onExecuteDisposition({
      dispositionType: selectedDisposition,
      notes: instructions || 'MRB disposition executed according to standard factory SOP.',
      costAllocated: selectedDisposition === 'SCRAP' ? scrapCost : null,
      debitNote: selectedDisposition === 'RTV' ? debitNoteNumber : null,
      decidedBy: currentUser?.name || 'Anita Roy (Quality Head)',
      decidedAt: new Date().toISOString()
    });
    soundEngine.playPassChime();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-industrial mrb-disposition-modal">
        {/* Header */}
        <div className="modal-header-alert">
          <div className="flex items-center gap-3">
            <AlertOctagon size={26} className="text-red" />
            <div>
              <h3 className="text-lg font-bold text-red">Material Review Board (MRB) Console (PRD Section 6.3)</h3>
              <p className="text-xs text-secondary">
                Lot Traveler: <strong>{quarantinedItem.travelerId}</strong> • Current Status: <strong>Digital Rejection Holding Area</strong>
              </p>
            </div>
          </div>
        </div>

        {/* 4 Disposition Cards Selection */}
        <div className="dispositions-options-grid my-4">
          {dispositions.map((disp) => {
            const Icon = disp.icon;
            const isChosen = selectedDisposition === disp.id;
            return (
              <div
                key={disp.id}
                className={`disposition-card ${isChosen ? 'disposition-chosen' : ''}`}
                onClick={() => setSelectedDisposition(disp.id)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={18} style={{ color: disp.color }} />
                  <strong className="text-sm font-semibold">{disp.title}</strong>
                </div>
                <p className="text-xs text-secondary">{disp.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Conditional Fields based on Chosen Disposition */}
        {selectedDisposition === 'REWORK' && (
          <div className="disposition-fields-box">
            <label className="text-xs font-mono text-secondary mb-1 block">
              CORRECTIVE REWORK ROUTING INSTRUCTIONS:
            </label>
            <textarea
              rows={3}
              className="industrial-input text-sm"
              placeholder="e.g. Route lot to CNC Lathe #04 for secondary skim cut on journal diameter to remove 0.035mm oversize stock..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
        )}

        {selectedDisposition === 'SCRAP' && (
          <div className="disposition-fields-box">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs font-mono text-secondary mb-1 block">SCRAP REASON CODE:</label>
                <input type="text" readOnly value="SCRAP-DIM-01 (Bearing Fit Unrecoverable)" className="industrial-input font-mono text-sm" />
              </div>
              <div className="flex-1">
                <label className="text-xs font-mono text-secondary mb-1 block">ESTIMATED MATERIAL LOSS ($):</label>
                <input
                  type="number"
                  className="industrial-input font-mono text-sm"
                  value={scrapCost}
                  onChange={(e) => setScrapCost(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {selectedDisposition === 'RTV' && (
          <div className="disposition-fields-box">
            <label className="text-xs font-mono text-secondary mb-1 block">DEBIT NOTE & RTV TRACKING NUMBER:</label>
            <input
              type="text"
              className="industrial-input font-mono text-sm"
              value={debitNoteNumber}
              onChange={(e) => setDebitNoteNumber(e.target.value)}
            />
          </div>
        )}

        {selectedDisposition === 'CUSTOMER_CONCESSION' && (
          <div className="disposition-fields-box">
            <label className="text-xs font-mono text-secondary mb-1 block">CUSTOMER DEVIATION PERMIT REFERENCE:</label>
            <input
              type="text"
              className="industrial-input font-mono text-sm"
              defaultValue="DEV-AEROTORQUE-2026-081"
            />
          </div>
        )}

        {/* Modal Actions */}
        <div className="modal-actions-footer mt-5">
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
            onClick={handleConfirm}
          >
            <CheckCircle size={18} />
            <span>Execute MRB Disposition</span>
          </button>
        </div>
      </div>
    </div>
  );
}
