import React, { useState } from 'react';
import { Camera, Image as ImageIcon, AlertTriangle, CheckCircle, Trash2, Upload, Eye } from 'lucide-react';
import { soundEngine } from '../data/soundEffects';

export function DefectPhotoModal({ 
  isOpen, 
  onClose, 
  onSavePhotos, 
  currentPhotos = [], 
  failedParameter 
}) {
  const [photos, setPhotos] = useState(currentPhotos);

  if (!isOpen) return null;

  const samplePhotoPresets = [
    {
      id: 'photo-gauge',
      title: 'Gauge Digital Readout Proof',
      desc: 'High-contrast photo showing Vernier/Micrometer reading +0.082mm out of drawing limits',
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'photo-surface',
      title: 'Physical Defect Surface Macro',
      desc: 'Close-up macro photo of the bearing journal score mark and oversize chatter ring',
      url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const handleAddPreset = (preset) => {
    if (photos.some(p => p.id === preset.id)) return;
    const updated = [...photos, preset];
    setPhotos(updated);
    soundEngine.playPassChime();
  };

  const handleRemovePhoto = (id) => {
    setPhotos(photos.filter(p => p.id !== id));
  };

  const handleSaveAndProceed = () => {
    if (photos.length < 2) return;
    onSavePhotos(photos);
    onClose();
  };

  const meetsRequirement = photos.length >= 2;

  return (
    <div className="modal-overlay">
      <div className="modal-content-industrial defect-photo-modal">
        {/* Header */}
        <div className="modal-header-alert">
          <div className="flex items-center gap-3">
            <Camera size={26} className="text-red" />
            <div>
              <h3 className="text-lg font-bold text-red">Mandatory Defect Photo Protocol (PRD Section 5.4)</h3>
              <p className="text-xs text-secondary">
                Non-conformance detected on <strong>{failedParameter?.parameterName || 'Inspection Parameter'}</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Instruction Banner */}
        <div className="interlock-banner-danger my-4">
          <div className="flex items-start gap-2">
            <AlertTriangle size={20} className="text-red flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <strong>Zero Defect Safeguard Active:</strong>
              <p>
                PRD Section 5.4 mandates taking <strong>at least two (2) clear photos</strong> of the gauge measurement and the physical component defect before this inspection can be saved or escalated to the Shift Supervisor.
              </p>
            </div>
          </div>
        </div>

        {/* Current Photo Count Progress */}
        <div className="photo-progress-bar-row">
          <div className="flex justify-between items-center text-sm font-mono mb-1">
            <span>DEFECT EVIDENCE STATUS:</span>
            <span className={meetsRequirement ? 'text-green font-bold' : 'text-amber font-bold'}>
              {photos.length} of 2 Mandatory Photos Captured
            </span>
          </div>
          <div className="progress-track">
            <div 
              className={`progress-fill ${meetsRequirement ? 'bg-green' : 'bg-amber'}`} 
              style={{ width: `${Math.min(100, (photos.length / 2) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Attached Photos Grid */}
        <div className="attached-photos-list my-4">
          <div className="text-xs font-mono text-secondary mb-2">ATTACHED PROOF PHOTOGRAPHS:</div>
          {photos.length === 0 ? (
            <div className="empty-photo-placeholder">
              <Camera size={36} className="text-muted mb-2" />
              <span>No defect photos captured yet. Use the presets below or trigger tablet camera.</span>
            </div>
          ) : (
            <div className="photos-grid">
              {photos.map((p, idx) => (
                <div key={p.id} className="photo-card">
                  <div className="photo-badge font-mono">Proof #{idx + 1}</div>
                  <img src={p.url} alt={p.title} className="photo-img" />
                  <div className="photo-info">
                    <strong className="photo-title">{p.title}</strong>
                    <p className="photo-desc text-xs text-secondary">{p.desc}</p>
                    <button
                      type="button"
                      className="btn-remove-photo"
                      onClick={() => handleRemovePhoto(p.id)}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Simulated Camera Capture Actions */}
        <div className="simulate-capture-section">
          <div className="text-xs font-mono text-secondary mb-2">TABLET CAMERA TRIGGER SIMULATION:</div>
          <div className="grid grid-cols-2 gap-3">
            {samplePhotoPresets.map((preset) => {
              const alreadyAdded = photos.some(p => p.id === preset.id);
              return (
                <button
                  key={preset.id}
                  type="button"
                  className={`btn-industrial btn-outline font-mono text-xs ${alreadyAdded ? 'opacity-50' : ''}`}
                  onClick={() => handleAddPreset(preset)}
                  disabled={alreadyAdded}
                >
                  <Camera size={16} />
                  <span>{alreadyAdded ? '✓ Attached' : `Capture: ${preset.title}`}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
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
            className="btn-industrial btn-danger"
            disabled={!meetsRequirement}
            onClick={handleSaveAndProceed}
          >
            <CheckCircle size={18} />
            <span>Confirm & Attach 2 Proof Photos</span>
          </button>
        </div>
      </div>
    </div>
  );
}
