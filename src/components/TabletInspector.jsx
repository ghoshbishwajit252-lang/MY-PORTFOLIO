import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Camera, 
  Send, 
  FileCheck, 
  ShieldAlert, 
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { BLUEPRINT_TEMPLATE, GAUGES_REGISTER } from '../data/initialData';
import { DualQRScanner } from './DualQRScanner';
import { StationCalibrationGuard } from './StationCalibrationGuard';
import { InteractiveBlueprint } from './InteractiveBlueprint';
import { DefectPhotoModal } from './DefectPhotoModal';
import { soundEngine } from '../data/soundEffects';
import { auditTrail } from '../data/auditLogStore';

export function TabletInspector({
  scannedStation,
  scannedTraveler,
  onScanStation,
  onScanTraveler,
  onResetScan,
  currentUser,
  onSubmitForApproval,
  onResolvePM
}) {
  const [selectedToolId, setSelectedToolId] = useState('MIC-08');
  const [activePinId, setActivePinId] = useState(1);
  const [inputs, setInputs] = useState({});
  const [defectPhotos, setDefectPhotos] = useState([]);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);

  const selectedTool = GAUGES_REGISTER.find(g => g.id === selectedToolId) || GAUGES_REGISTER[0];
  const isToolExpired = selectedTool?.status === 'EXPIRED';
  const isPmOverdue = scannedStation?.dailyPmStatus === 'OVERDUE';

  // Evaluate tolerance for a given pin and input value
  const evaluateMeasurement = (pin, rawValue) => {
    if (rawValue === undefined || rawValue === '') return null;

    if (pin.type === 'PASS_FAIL') {
      const isPass = rawValue === 'PASS';
      return {
        val: rawValue,
        status: isPass ? 'PASS' : 'FAIL',
        delta: isPass ? 'Conforming' : 'Visual Defect',
        isCTQ: pin.isCTQ
      };
    }

    const num = parseFloat(rawValue);
    if (isNaN(num)) return null;

    if (pin.type === 'TOLERANCE') {
      const inSpec = num >= pin.lowerLimit && num <= pin.upperLimit;
      const delta = num - pin.nominal;
      return {
        val: num,
        status: inSpec ? 'PASS' : 'FAIL',
        delta: delta >= 0 ? `+${delta.toFixed(3)} mm` : `${delta.toFixed(3)} mm`,
        isCTQ: pin.isCTQ
      };
    }

    if (pin.type === 'MAX_LIMIT') {
      const inSpec = num <= pin.upperLimit && (pin.lowerLimit === undefined || num >= pin.lowerLimit);
      return {
        val: num,
        status: inSpec ? 'PASS' : 'FAIL',
        delta: `${num.toFixed(2)} / ${pin.upperLimit} max`,
        isCTQ: pin.isCTQ
      };
    }

    return null;
  };

  const handleInputChange = (pin, value) => {
    if (isToolExpired || isPmOverdue) {
      soundEngine.playAlertBuzzer();
      return;
    }

    const result = evaluateMeasurement(pin, value);
    const updated = {
      ...inputs,
      [pin.id]: {
        value,
        eval: result,
        toolUsed: selectedToolId,
        timestamp: new Date().toISOString()
      }
    };
    setInputs(updated);

    // Audio cue
    if (result) {
      if (result.status === 'PASS') {
        soundEngine.playPassChime();
      } else {
        soundEngine.playAlertBuzzer();
      }
    }
  };

  // Quick preset loader to help evaluators test in 1 click
  const loadPreset = (presetType) => {
    if (presetType === 'ALL_PASS') {
      const passData = {
        1: { value: '25.020', toolUsed: 'MIC-08' },
        2: { value: '15.030', toolUsed: 'PG-04' },
        3: { value: '0.45', toolUsed: 'SR-01' },
        4: { value: '0.012', toolUsed: 'VC-104' },
        5: { value: 'PASS', toolUsed: 'VISUAL_INSPECTION' }
      };
      Object.keys(passData).forEach(k => {
        const pin = BLUEPRINT_TEMPLATE.pins.find(p => p.id === Number(k));
        passData[k].eval = evaluateMeasurement(pin, passData[k].value);
        passData[k].timestamp = new Date().toISOString();
      });
      setInputs(passData);
      setDefectPhotos([]);
      soundEngine.playPassChime();
    } else if (presetType === 'CTQ_FAIL') {
      // Pin 1 (CTQ) is 25.082 mm (above upper limit 25.050)
      const failData = {
        1: { value: '25.082', toolUsed: 'MIC-08' }, // OUT OF TOLERANCE CTQ!
        2: { value: '15.030', toolUsed: 'PG-04' },
        3: { value: '0.50', toolUsed: 'SR-01' },
        4: { value: '0.015', toolUsed: 'VC-104' },
        5: { value: 'PASS', toolUsed: 'VISUAL_INSPECTION' }
      };
      Object.keys(failData).forEach(k => {
        const pin = BLUEPRINT_TEMPLATE.pins.find(p => p.id === Number(k));
        failData[k].eval = evaluateMeasurement(pin, failData[k].value);
        failData[k].timestamp = new Date().toISOString();
      });
      setInputs(failData);
      soundEngine.playAlertBuzzer();
    } else if (presetType === 'NON_CTQ_FAIL') {
      // Pin 3 (Surface Roughness) is 0.92 (above 0.80 max) - Non CTQ so concession allowed!
      const nonCtqData = {
        1: { value: '25.025', toolUsed: 'MIC-08' }, // Pass CTQ
        2: { value: '15.030', toolUsed: 'PG-04' },
        3: { value: '0.92', toolUsed: 'SR-01' }, // FAIL Non-CTQ!
        4: { value: '0.012', toolUsed: 'VC-104' },
        5: { value: 'PASS', toolUsed: 'VISUAL_INSPECTION' }
      };
      Object.keys(nonCtqData).forEach(k => {
        const pin = BLUEPRINT_TEMPLATE.pins.find(p => p.id === Number(k));
        nonCtqData[k].eval = evaluateMeasurement(pin, nonCtqData[k].value);
        nonCtqData[k].timestamp = new Date().toISOString();
      });
      setInputs(nonCtqData);
      soundEngine.playAlertBuzzer();
    }
  };

  // Check overall inspection state
  const totalPins = BLUEPRINT_TEMPLATE.pins.length;
  const filledCount = Object.keys(inputs).filter(k => inputs[k]?.value !== '' && inputs[k]?.eval !== null).length;
  const isFullyFilled = filledCount === totalPins;

  const failedItems = Object.keys(inputs)
    .filter(k => inputs[k]?.eval?.status === 'FAIL')
    .map(k => {
      const pin = BLUEPRINT_TEMPLATE.pins.find(p => p.id === Number(k));
      return { ...pin, input: inputs[k] };
    });

  const hasFails = failedItems.length > 0;
  const hasCtqFail = failedItems.some(f => f.isCTQ);
  const photosOk = !hasFails || defectPhotos.length >= 2;

  // Can submit only if: station & traveler scanned, no tool/PM lock, all pins filled, defect photos present if failed
  const canSubmit = Boolean(
    scannedStation &&
    scannedTraveler &&
    !isToolExpired &&
    !isPmOverdue &&
    isFullyFilled &&
    photosOk
  );

  const handleSubmit = () => {
    if (!canSubmit) return;

    const inspectionRecord = {
      id: `PDI-${Date.now().toString().slice(-5)}`,
      travelerId: scannedTraveler.id,
      partNumber: scannedTraveler.partNumber,
      stationCode: scannedStation.code,
      inspectorEmpId: currentUser?.empId || 'QA-8821',
      inspectorName: currentUser?.name || 'Dev Sharma',
      timestamp: new Date().toISOString(),
      measurements: inputs,
      hasOutlier: hasFails,
      hasCtqFail,
      defectPhotos,
      status: 'AWAITING_SUPERVISOR_APPROVAL',
      supervisorDecision: null
    };

    onSubmitForApproval(inspectionRecord);
    setSubmissionComplete(true);
    soundEngine.playPassChime();

    auditTrail.logEvent({
      userId: currentUser?.empId || 'QA-8821',
      role: currentUser?.title || 'QA Floor Inspector',
      action: 'INSPECTION_SUBMIT',
      entityId: inspectionRecord.id,
      previousValue: 'IN_PROGRESS',
      newValue: 'AWAITING_SUPERVISOR_APPROVAL',
      details: `PDI checklist submitted for ${scannedTraveler.id}. Out-of-tolerance items: ${failedItems.length}. CTQ violated: ${hasCtqFail ? 'YES' : 'NO'}`
    });
  };

  const activeFailedParam = failedItems[0] || null;

  return (
    <div className="tablet-inspector-root">
      {/* 1. Dual QR Scanning Section (PRD Section 5.1) */}
      <DualQRScanner
        scannedStation={scannedStation}
        scannedTraveler={scannedTraveler}
        onScanStation={onScanStation}
        onScanTraveler={onScanTraveler}
        onResetScan={onResetScan}
        currentUser={currentUser}
      />

      {/* When Station & Traveler are verified, render the full quality inspection studio */}
      {scannedStation && scannedTraveler && (
        <>
          {/* 2. Machine PM and Tool Calibration Guards (PRD Sections 2.2 & 2.3) */}
          <StationCalibrationGuard
            selectedStation={scannedStation}
            selectedToolId={selectedToolId}
            onSelectTool={setSelectedToolId}
            onResolvePM={onResolvePM}
          />

          {/* Quick Preset Buttons for Evaluators */}
          <div className="evaluator-preset-bar">
            <span className="preset-label font-mono">
              <Sparkles size={16} className="text-cyan" />
              DEMO TESTING PRESETS:
            </span>
            <button
              type="button"
              className="btn-preset btn-preset-pass"
              onClick={() => loadPreset('ALL_PASS')}
            >
              1. Load 100% In-Spec (All Green)
            </button>
            <button
              type="button"
              className="btn-preset btn-preset-ctq-fail"
              onClick={() => loadPreset('CTQ_FAIL')}
            >
              2. Load Critical CTQ Fail (Red + Concession Blocked)
            </button>
            <button
              type="button"
              className="btn-preset btn-preset-nonctq"
              onClick={() => loadPreset('NON_CTQ_FAIL')}
            >
              3. Load Non-CTQ Fail (Concession Allowed)
            </button>
          </div>

          {/* 3. Interactive Technical Blueprint (PRD Section 4.1) */}
          <InteractiveBlueprint
            activePinId={activePinId}
            onSelectPin={setActivePinId}
            dimensionValues={inputs}
          />

          {/* 4. Locked Step-by-Step Measurement Table (PRD Section 5.2, 5.4) */}
          <div className="inspection-table-card">
            <div className="inspection-table-header">
              <div>
                <h4 className="text-base font-bold">Linear Step-by-Step Quality Inspection Form</h4>
                <p className="text-xs text-secondary">
                  PRD Section 5.2: Values turn GREEN for in-tolerance or RED for out-of-tolerance. Out-of-tolerance freezes submission pending defect photos.
                </p>
              </div>
              <div className="inspection-progress font-mono">
                Progress: <strong className={isFullyFilled ? 'text-green' : 'text-amber'}>{filledCount} / {totalPins} Checked</strong>
              </div>
            </div>

            <div className="dimensions-table-wrapper">
              <table className="industrial-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>Pin #</th>
                    <th>Inspection Parameter / Feature</th>
                    <th>Nominal & Limits</th>
                    <th>Allowed Gauge</th>
                    <th style={{ width: '220px' }}>Measured Entry</th>
                    <th style={{ width: '160px' }}>Tolerance Evaluation</th>
                  </tr>
                </thead>
                <tbody>
                  {BLUEPRINT_TEMPLATE.pins.map((pin) => {
                    const isSelected = activePinId === pin.id;
                    const entry = inputs[pin.id];
                    const evaluation = entry?.eval;
                    const isPass = evaluation?.status === 'PASS';
                    const isFail = evaluation?.status === 'FAIL';

                    return (
                      <tr 
                        key={pin.id} 
                        className={`dimension-row ${isSelected ? 'row-active' : ''} ${isFail ? 'row-fail' : ''}`}
                        onClick={() => setActivePinId(pin.id)}
                      >
                        {/* Pin Number */}
                        <td className="text-center">
                          <span className={`pin-pill font-mono ${pin.isCTQ ? 'pin-pill-ctq' : ''}`}>
                            {pin.pinNumber}
                          </span>
                        </td>

                        {/* Parameter Name & CTQ Badge */}
                        <td>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{pin.parameterName}</span>
                            {pin.isCTQ && (
                              <span className="badge badge-ctq font-mono">CTQ PRIORITY</span>
                            )}
                          </div>
                          <div className="text-xs text-muted">{pin.description}</div>
                        </td>

                        {/* Nominal & Limits */}
                        <td className="font-mono text-xs">
                          {pin.type === 'TOLERANCE' && (
                            <div>
                              <div>Target: <strong>{pin.nominal.toFixed(3)} {pin.unit}</strong></div>
                              <div className="text-secondary">[{pin.lowerLimit.toFixed(3)} to {pin.upperLimit.toFixed(3)}]</div>
                            </div>
                          )}
                          {pin.type === 'MAX_LIMIT' && (
                            <div>
                              <div>Upper Max: <strong>{pin.upperLimit} {pin.unit}</strong></div>
                              <div className="text-secondary">Nominal: {pin.nominal} {pin.unit}</div>
                            </div>
                          )}
                          {pin.type === 'PASS_FAIL' && (
                            <div>Visual Standard: <strong>PASS (Deburred)</strong></div>
                          )}
                        </td>

                        {/* Tool Assigned */}
                        <td className="font-mono text-xs text-secondary">
                          {pin.allowedTool}
                        </td>

                        {/* Input Cell */}
                        <td>
                          {pin.type === 'PASS_FAIL' ? (
                            <div className="flex gap-2">
                              <button
                                type="button"
                                className={`btn-industrial text-xs flex-1 ${entry?.value === 'PASS' ? 'btn-success' : 'btn-outline'}`}
                                onClick={() => handleInputChange(pin, 'PASS')}
                                disabled={isToolExpired || isPmOverdue}
                              >
                                ✓ Pass
                              </button>
                              <button
                                type="button"
                                className={`btn-industrial text-xs flex-1 ${entry?.value === 'FAIL' ? 'btn-danger' : 'btn-outline'}`}
                                onClick={() => handleInputChange(pin, 'FAIL')}
                                disabled={isToolExpired || isPmOverdue}
                              >
                                ✗ Fail (Burrs)
                              </button>
                            </div>
                          ) : (
                            <input
                              type="number"
                              step="0.001"
                              placeholder={`e.g. ${pin.nominal}`}
                              value={entry?.value || ''}
                              onChange={(e) => handleInputChange(pin, e.target.value)}
                              disabled={isToolExpired || isPmOverdue}
                              className={`industrial-input font-mono ${
                                isPass ? 'input-in-spec' : isFail ? 'input-out-spec' : ''
                              }`}
                            />
                          )}
                        </td>

                        {/* Tolerance Evaluation Feedback */}
                        <td>
                          {evaluation ? (
                            isPass ? (
                              <div className="badge badge-green font-mono text-xs flex items-center gap-1">
                                <CheckCircle2 size={14} />
                                <span>IN-SPEC ({evaluation.delta})</span>
                              </div>
                            ) : (
                              <div className="badge badge-red font-mono text-xs flex items-center gap-1">
                                <XCircle size={14} />
                                <span>OUT-OF-SPEC ({evaluation.delta})</span>
                              </div>
                            )
                          ) : (
                            <span className="text-muted text-xs font-mono">Awaiting entry</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Out of tolerance Alert & Mandatory Defect Photos Section */}
            {hasFails && (
              <div className="interlock-banner-danger my-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldAlert size={28} className="text-red flex-shrink-0" />
                    <div>
                      <h4 className="text-red font-bold font-mono">
                        {hasCtqFail ? '⛔ CRITICAL-TO-QUALITY (CTQ) FAILURE DETECTED' : '⚠️ NON-CONFORMANCE DETECTED'}
                      </h4>
                      <p className="text-xs text-secondary">
                        PRD Section 5.4 mandates taking at least <strong>two (2) defect photos</strong> before submission.
                        {hasCtqFail && ' CTQ items will strictly forbid supervisor concessions.'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-industrial btn-danger"
                    onClick={() => setIsPhotoModalOpen(true)}
                  >
                    <Camera size={18} />
                    <span>
                      {defectPhotos.length >= 2 
                        ? `✓ ${defectPhotos.length} Photos Attached (View)` 
                        : `Mandatory Photo Proof (${defectPhotos.length}/2 Captured)`}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Submission Footer */}
            <div className="inspection-submit-row">
              <div className="submission-status-hint text-xs font-mono">
                {!isFullyFilled && (
                  <span className="text-amber">⚠️ Complete all {totalPins} dimensional checks to enable submission.</span>
                )}
                {isFullyFilled && hasFails && defectPhotos.length < 2 && (
                  <span className="text-red">⛔ Locked: Mandatory 2 defect photos must be captured per PRD Section 5.4.</span>
                )}
                {canSubmit && (
                  <span className="text-green">✓ All criteria satisfied. Ready for Shift Supervisor escalation.</span>
                )}
              </div>

              <button
                type="button"
                className="btn-industrial btn-primary"
                disabled={!canSubmit}
                onClick={handleSubmit}
              >
                <Send size={18} />
                <span>Submit to Shift Supervisor Queue</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Mandatory Defect Photo Modal */}
      <DefectPhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onSavePhotos={(photos) => setDefectPhotos(photos)}
        currentPhotos={defectPhotos}
        failedParameter={activeFailedParam}
      />
    </div>
  );
}
