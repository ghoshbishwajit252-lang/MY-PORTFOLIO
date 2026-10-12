import React from 'react';
import { Layers, ZoomIn, Info } from 'lucide-react';
import { BLUEPRINT_TEMPLATE } from '../data/initialData';

export function InteractiveBlueprint({ activePinId, onSelectPin, dimensionValues = {} }) {
  const { pins, drawingNumber, revision, partNumber, partName } = BLUEPRINT_TEMPLATE;

  return (
    <div className="blueprint-container-card">
      <div className="blueprint-top-bar">
        <div className="blueprint-title-group">
          <Layers size={18} className="text-cyan" />
          <span className="blueprint-heading">Interactive Blueprint Canvas (PRD Section 4.1)</span>
          <span className="badge badge-cyan font-mono">{drawingNumber} {revision}</span>
        </div>
        <div className="blueprint-hint">
          <Info size={14} className="text-muted" />
          <span>Tap numbered pins to jump directly to measurement row</span>
        </div>
      </div>

      {/* SVG Technical Blueprint Canvas */}
      <div className="blueprint-canvas-wrapper">
        <svg
          viewBox="0 0 1000 480"
          className="blueprint-svg-drawing"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Blueprint Grid Lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="1" />
            </pattern>
            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="ctqGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>

          {/* Background Grid */}
          <rect width="1000" height="480" fill="url(#grid)" />

          {/* Border Frame with Engineering Title Box */}
          <rect x="15" y="15" width="970" height="450" fill="none" stroke="#253349" strokeWidth="2" />
          
          {/* Shaft Centerline */}
          <line x1="60" y1="240" x2="940" y2="240" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="18 6 4 6" opacity="0.6" />

          {/* 1. Threaded End Section (Left: X 80 to 200, Y 190 to 290) */}
          <g className="shaft-part-thread">
            <rect x="80" y="195" width="120" height="90" fill="url(#metalGrad)" stroke="#64748b" strokeWidth="2" rx="2" />
            {/* Thread serrations representation */}
            {[95, 110, 125, 140, 155, 170, 185].map((x) => (
              <line key={x} x1={x} y1="195" x2={x} y2="285" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            ))}
            <text x="140" y="245" fill="#cbd5e1" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle">M16 x 1.5</text>
          </g>

          {/* 2. Bearing Journal Step (X 200 to 520, Y 150 to 330) */}
          <g className="shaft-part-bearing-journal">
            <rect x="200" y="150" width="320" height="180" fill="url(#metalGrad)" stroke="#38bdf8" strokeWidth="2.5" />
            {/* Chamfer corners */}
            <line x1="200" y1="150" x2="200" y2="330" stroke="#0284c7" strokeWidth="2" />
            <text x="360" y="235" fill="#f8fafc" fontSize="15" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">
              Ø 25.000 mm [CTQ JOURNAL]
            </text>
            <text x="360" y="255" fill="#f59e0b" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">
              TOL: +0.050 / -0.020 mm
            </text>
          </g>

          {/* 3. Splined / Ground Middle Section (X 520 to 760, Y 170 to 310) */}
          <g className="shaft-part-ground">
            <rect x="520" y="170" width="240" height="140" fill="url(#metalGrad)" stroke="#64748b" strokeWidth="2" />
            {/* Ra finish symbols */}
            <text x="640" y="235" fill="#cbd5e1" fontSize="13" fontFamily="JetBrains Mono" textAnchor="middle">
              Ra 0.8 µm MAX
            </text>
            <text x="640" y="255" fill="#94a3b8" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">
              Induction Hardened (58 HRC)
            </text>
          </g>

          {/* 4. Flange End Section (X 760 to 900, Y 130 to 350) */}
          <g className="shaft-part-flange">
            <rect x="760" y="130" width="140" height="220" fill="url(#metalGrad)" stroke="#64748b" strokeWidth="2" />
            {/* Chamfer at far end */}
            <polygon points="900,140 890,130 890,350 900,340" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
            <text x="830" y="245" fill="#cbd5e1" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle">
              45° Chamfer
            </text>
          </g>

          {/* Dimension Extension Lines */}
          {/* Dimension 1: OD on Bearing Journal */}
          <g className="dimension-lines" stroke="#38bdf8" strokeWidth="1.5" opacity="0.8">
            <line x1="360" y1="120" x2="360" y2="150" strokeDasharray="3 3" />
            <line x1="360" y1="330" x2="360" y2="360" strokeDasharray="3 3" />
            <line x1="280" y1="120" x2="440" y2="120" />
            <polygon points="280,120 290,116 290,124" fill="#38bdf8" />
            <polygon points="440,120 430,116 430,124" fill="#38bdf8" />
          </g>

          {/* Engineering Title Block (Bottom Right) */}
          <g className="title-block" transform="translate(680, 390)">
            <rect x="0" y="0" width="280" height="60" fill="#0f172a" stroke="#334763" strokeWidth="1.5" />
            <text x="12" y="20" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">PART: {partNumber} - {revision}</text>
            <text x="12" y="36" fill="#f8fafc" fontSize="11" fontWeight="bold">{partName}</text>
            <text x="12" y="52" fill="#38bdf8" fontSize="9" fontFamily="JetBrains Mono">SCALE: 1:1 • CAD MODEL RELEASED</text>
          </g>

          {/* Interactive Inspection Pins (PRD Section 4.1) */}
          {pins.map((pin) => {
            const isSelected = activePinId === pin.id;
            const isCTQ = pin.isCTQ;
            // Coordinate mapping (percentages to 1000x480 svg coordinates)
            const cx = (pin.blueprintCoords.x / 100) * 1000;
            const cy = (pin.blueprintCoords.y / 100) * 480;

            const val = dimensionValues[pin.id];
            let statusFill = isCTQ ? '#f59e0b' : '#0284c7';
            if (val && val.status === 'PASS') statusFill = '#10b981';
            if (val && val.status === 'FAIL') statusFill = '#ef4444';

            return (
              <g
                key={pin.id}
                className={`blueprint-interactive-pin ${isSelected ? 'pin-active' : ''} ${isCTQ ? 'pin-ctq' : ''}`}
                onClick={() => onSelectPin(pin.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Outer Pulsing Glow Circle */}
                {isSelected && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="28"
                    fill="none"
                    stroke={isCTQ ? '#f59e0b' : '#38bdf8'}
                    strokeWidth="3"
                    className="pin-pulse-ring"
                  />
                )}

                {/* Pin Pointer Leader Line */}
                <line
                  x1={cx}
                  y1={cy}
                  x2={cx}
                  y2={cy + 30}
                  stroke={statusFill}
                  strokeWidth="2.5"
                />

                {/* Pin Circular Head */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="18"
                  fill={isSelected ? '#ffffff' : statusFill}
                  stroke={isCTQ ? '#ea580c' : '#0f172a'}
                  strokeWidth="3"
                  filter="drop-shadow(0px 3px 6px rgba(0,0,0,0.6))"
                />

                {/* Pin Number Label */}
                <text
                  x={cx}
                  y={cy + 6}
                  fill={isSelected ? '#0f172a' : '#ffffff'}
                  fontSize="14"
                  fontWeight="bold"
                  fontFamily="JetBrains Mono"
                  textAnchor="middle"
                >
                  {pin.pinNumber}
                </text>

                {/* CTQ Tag on Pin 1 */}
                {isCTQ && (
                  <g transform={`translate(${cx + 12}, ${cy - 22})`}>
                    <rect x="0" y="0" width="36" height="16" rx="4" fill="#ea580c" />
                    <text x="18" y="12" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">
                      CTQ
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Blueprint Legend Footer */}
      <div className="blueprint-legend-row">
        <div className="legend-item">
          <span className="legend-dot dot-ctq"></span>
          <span>Orange Tag: <strong>Critical-to-Quality (CTQ)</strong> (PRD 4.3 Stricter Rules, Concession Blocked)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot dot-green"></span>
          <span>Green Pin: In Spec (± Tol OK)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot dot-red"></span>
          <span>Red Pin: Out of Tolerance (Requires Defect Photos)</span>
        </div>
      </div>
    </div>
  );
}
