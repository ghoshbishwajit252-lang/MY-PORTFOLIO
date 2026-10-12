// Master Factory Data & Initial State for FOQCS (Zapuza Technologies LLP)
// Version 5.0 Standard Operating Requirement Document

export const PLANT_INFO = {
  name: 'Zapuza Advanced Manufacturing Plant #01',
  location: 'Aerospace & Precision Machining Hub, Industrial Zone IV',
  currentShift: 'Morning Shift (06:00 - 14:00)',
  isoStandard: 'ISO 9001:2015 & AS9100D Certified'
};

export const ROLES = [
  {
    id: 'inspector',
    name: 'Dev Sharma',
    empId: 'QA-8821',
    title: 'QA Floor Inspector',
    badgeColor: '#06b6d4',
    permissions: 'Dual QR station scan, input measurements, mandatory photo capture',
    safeguard: 'Locked to active station QR; cannot edit submitted data'
  },
  {
    id: 'supervisor',
    name: 'Vikram Malhotra',
    empId: 'SUP-304',
    title: 'Shift Supervisor',
    badgeColor: '#f59e0b',
    permissions: 'Sign off PDI forms, review approval queue, manage Rejection Holding Area',
    safeguard: 'Concession blocked on CTQ items; all decisions permanently audited'
  },
  {
    id: 'quality_manager',
    name: 'Anita Roy',
    empId: 'QM-102',
    title: 'Quality Manager',
    badgeColor: '#a855f7',
    permissions: 'Approve inspection templates, authorize concessions, chair MRB disposition',
    safeguard: 'Cannot edit floor measurements; enforces strict engineering standards'
  },
  {
    id: 'plant_manager',
    name: 'Rajesh Verma',
    empId: 'GM-001',
    title: 'Plant / General Manager',
    badgeColor: '#3b82f6',
    permissions: 'Full view of all plant reports, bottleneck heatmaps, audit logs',
    safeguard: 'Cannot alter past logged inspection values; all actions tracked'
  },
  {
    id: 'warehouse_clerk',
    name: 'Suresh Pillai',
    empId: 'WH-419',
    title: 'Warehouse & Dispatch Clerk',
    badgeColor: '#10b981',
    permissions: 'Scan job travelers, verify dispatch gates, print shipping crate QR passes',
    safeguard: 'Strictly locked if any manufacturing operation or quality gate is unfulfilled'
  }
];

export const WORKSTATIONS = [
  {
    id: 'STATION-VMC-02',
    code: 'STATION-VMC-02',
    name: 'VMC Machining Station #02',
    department: 'Main Machining Shop',
    type: 'Vertical Machining Center (Mazak VCN-530C)',
    dailyPmStatus: 'COMPLETED',
    pmCompletedAt: '2026-10-17 05:45 AM',
    safetyZeroPointOk: true,
    lastCalibratedBy: 'TECH-712 (R. Kulkarni)'
  },
  {
    id: 'STATION-CNC-04',
    code: 'STATION-CNC-04',
    name: 'CNC Turning Lathe #04',
    department: 'Main Machining Shop',
    type: 'CNC High-Torque Lathe (Doosan Lynx 2100)',
    dailyPmStatus: 'COMPLETED',
    pmCompletedAt: '2026-10-17 06:10 AM',
    safetyZeroPointOk: true,
    lastCalibratedBy: 'TECH-712 (R. Kulkarni)'
  },
  {
    id: 'STATION-HEAT-TREAT-01',
    code: 'STATION-HEAT-TREAT-01',
    name: 'Induction Heat Treat Bay #01',
    department: 'Thermal Bay',
    type: 'Induction Case Hardening Furnace (Inductoheat 50kW)',
    dailyPmStatus: 'COMPLETED',
    pmCompletedAt: '2026-10-17 05:30 AM',
    safetyZeroPointOk: true,
    lastCalibratedBy: 'TECH-803 (A. Bose)'
  },
  {
    id: 'STATION-GRIND-05',
    code: 'STATION-GRIND-05',
    name: 'Precision Cylindrical Grinder #05',
    department: 'Grinding Bay',
    type: 'CNC Cylindrical Grinder (Studer S33)',
    dailyPmStatus: 'COMPLETED',
    pmCompletedAt: '2026-10-17 06:00 AM',
    safetyZeroPointOk: true,
    lastCalibratedBy: 'TECH-803 (A. Bose)'
  },
  {
    id: 'STATION-DRILL-09',
    code: 'STATION-DRILL-09',
    name: 'Multi-Spindle Drill & Tap #09',
    department: 'Secondary Machining',
    type: 'Auto-Tapping Machine (Brother Speedio)',
    dailyPmStatus: 'OVERDUE', // For testing Station PM Lockout!
    pmCompletedAt: '2026-10-15 06:00 AM (48+ hrs overdue)',
    safetyZeroPointOk: false,
    lastCalibratedBy: 'UNASSIGNED',
    warning: 'Mandatory daily PM checklist & safety zero-point checks are overdue. Workstation is digitally disabled.'
  }
];

export const GAUGES_REGISTER = [
  {
    id: 'MIC-08',
    serialNo: 'MIC-08',
    name: 'Digital Outside Micrometer (25-50mm)',
    make: 'Mitutoyo Digimatic',
    accuracy: '±0.001 mm',
    calibratedDate: '2026-05-10',
    expiryDate: '2026-11-20',
    status: 'VALID',
    toolCribBin: 'BIN-Q-04'
  },
  {
    id: 'VC-104',
    serialNo: 'VC-104',
    name: 'Vernier Digital Caliper (0-150mm)',
    make: 'Mitutoyo Absolute',
    accuracy: '±0.01 mm',
    calibratedDate: '2026-06-15',
    expiryDate: '2026-12-15',
    status: 'VALID',
    toolCribBin: 'BIN-Q-01'
  },
  {
    id: 'PG-04',
    serialNo: 'PG-04',
    name: 'Thread Pitch Plug Gauge M16 x 1.5 6g',
    make: 'Baker Gauges',
    accuracy: 'Class 6g Go / No-Go',
    calibratedDate: '2026-07-01',
    expiryDate: '2027-01-10',
    status: 'VALID',
    toolCribBin: 'BIN-Q-12'
  },
  {
    id: 'SR-01',
    serialNo: 'SR-01',
    name: 'Portable Surface Roughness Tester',
    make: 'Mitutoyo Surftest SJ-210',
    accuracy: 'Ra 0.01 µm',
    calibratedDate: '2026-06-01',
    expiryDate: '2026-12-01',
    status: 'VALID',
    toolCribBin: 'BIN-Q-08'
  },
  {
    id: 'DG-22',
    serialNo: 'DG-22',
    name: 'Dial Depth Gauge (0-200mm)',
    make: 'Insize Industrial',
    accuracy: '±0.02 mm',
    calibratedDate: '2026-04-10',
    expiryDate: '2026-10-15', // EXPIRED! Used to test Tool Calibration Lockout
    status: 'EXPIRED',
    toolCribBin: 'QUARANTINE_BIN-99',
    warning: 'Calibration interval expired on Oct 15, 2026. Blocked per PRD Section 2.3.'
  }
];

export const BLUEPRINT_TEMPLATE = {
  partNumber: 'DS-4092-B',
  partName: 'High-Pressure Transmission Drive Shaft',
  drawingNumber: 'DWG-AERO-2026-4092',
  revision: 'Rev B',
  materialGrade: 'AISI 4140 Cr-Mo Alloy Steel',
  approvedBy: 'Anita Roy (Quality Manager)',
  customer: 'AeroTorque Power Systems Corp',
  drawingUrl: '/assets/blueprint-shaft.svg',
  pins: [
    {
      id: 1,
      pinNumber: '1',
      parameterName: 'Shaft Bearing Journal Outer Diameter (OD)',
      type: 'TOLERANCE',
      nominal: 25.000,
      upperLimit: 25.050,
      lowerLimit: 24.980,
      unit: 'mm',
      isCTQ: true, // Critical-to-Quality! Stricter rules, no concessions allowed!
      allowedTool: 'MIC-08',
      blueprintCoords: { x: 38, y: 35 },
      description: 'Precision bearing fit journal. Tight GD&T tolerance.'
    },
    {
      id: 2,
      pinNumber: '2',
      parameterName: 'Drive Thread Pitch Diameter (M16 x 1.5)',
      type: 'TOLERANCE',
      nominal: 15.026,
      upperLimit: 15.056,
      lowerLimit: 15.016,
      unit: 'mm',
      isCTQ: false,
      allowedTool: 'PG-04',
      blueprintCoords: { x: 14, y: 50 },
      description: 'M16 x 1.5 drive thread with 6g fit class.'
    },
    {
      id: 3,
      pinNumber: '3',
      parameterName: 'Ground Journal Surface Roughness (Ra)',
      type: 'MAX_LIMIT',
      nominal: 0.60,
      upperLimit: 0.80,
      lowerLimit: 0.00,
      unit: 'µm',
      isCTQ: false,
      allowedTool: 'SR-01',
      blueprintCoords: { x: 62, y: 35 },
      description: 'Super-finish Ra 0.8 µm MAX to prevent seal wear.'
    },
    {
      id: 4,
      pinNumber: '4',
      parameterName: 'Total Radial Runout / Concentricity',
      type: 'MAX_LIMIT',
      nominal: 0.010,
      upperLimit: 0.020,
      lowerLimit: 0.000,
      unit: 'mm',
      isCTQ: false,
      allowedTool: 'VC-104',
      blueprintCoords: { x: 78, y: 50 },
      description: 'Total radial indicator reading when rotated on V-blocks.'
    },
    {
      id: 5,
      pinNumber: '5',
      parameterName: 'Visual Chamfer 45° & Edge Deburr Check',
      type: 'PASS_FAIL',
      nominal: 'PASS',
      isCTQ: false,
      allowedTool: 'VISUAL_INSPECTION',
      blueprintCoords: { x: 88, y: 65 },
      description: 'Free of burrs, deburred edges, uniform 1.0mm x 45° chamfer.'
    }
  ]
};

export const INITIAL_JOB_TRAVELERS = [
  {
    id: 'TRV-2026-9041',
    barcode: 'TRV-2026-9041',
    partNumber: 'DS-4092-B',
    partName: 'High-Pressure Transmission Drive Shaft',
    customer: 'AeroTorque Power Systems',
    poNumber: 'PO-AERO-88490',
    batchQty: 50,
    acceptedQty: 50,
    rejectedQty: 0,
    heatNumber: 'H-8042',
    rawMaterialGrade: 'AISI 4140 Alloy Steel',
    currentLocation: 'Thermal Bay -> Grinding Bay Queue',
    activeOpId: 'OP40',
    overallStatus: 'COOLING_HOLD', // Active thermal hold interlock!
    // Mandatory Process Aging / Cooling Hold Timer:
    coolingHold: {
      requiredSeconds: 14400, // 4 hours
      startedAt: Date.now() - (9480 * 1000), // Started 2h 38m ago
      remainingSeconds: 4920, // 1h 22m remaining
      holdOpId: 'OP30',
      dependentOpId: 'OP40',
      reason: 'Mandatory 4-hour thermal air-cooling to 35°C after Induction Hardening to prevent grinding micro-cracking.'
    },
    operations: [
      {
        id: 'OP10',
        opNumber: 'Op 10',
        name: 'Raw Material Sawing & Ingot Facing',
        workstation: 'Cold Cut Saw Station #01',
        operator: 'M. Kashyap (ID #OP-118)',
        status: 'COMPLETED',
        startedAt: '2026-10-17 06:15 AM',
        completedAt: '2026-10-17 07:00 AM',
        cycleTimeMinutes: 45,
        signedOffBy: 'SUP-304 (V. Malhotra)'
      },
      {
        id: 'OP20',
        opNumber: 'Op 20',
        name: 'CNC Rough & Finish Turning',
        workstation: 'CNC Turning Lathe #04',
        operator: 'P. Nair (ID #OP-224)',
        status: 'COMPLETED',
        startedAt: '2026-10-17 07:15 AM',
        completedAt: '2026-10-17 08:45 AM',
        cycleTimeMinutes: 90,
        signedOffBy: 'SUP-304 (V. Malhotra)'
      },
      {
        id: 'OP30',
        opNumber: 'Op 30',
        name: 'Induction Case Hardening (Heat Treatment)',
        workstation: 'Induction Heat Treat Bay #01',
        operator: 'K. Sunder (ID #OP-301)',
        status: 'COMPLETED',
        startedAt: '2026-10-17 09:00 AM',
        completedAt: '2026-10-17 10:15 AM',
        cycleTimeMinutes: 75,
        signedOffBy: 'SUP-304 (V. Malhotra)'
      },
      {
        id: 'OP40',
        opNumber: 'Op 40',
        name: 'Precision Cylindrical Grinding',
        workstation: 'Precision Cylindrical Grinder #05',
        operator: 'S. Jadhav (ID #OP-410)',
        status: 'LOCKED', // Locked by Cooling Hold Countdown Timer!
        startedAt: null,
        completedAt: null,
        cycleTimeMinutes: 60,
        signedOffBy: null
      },
      {
        id: 'OP50',
        opNumber: 'Op 50',
        name: 'Pre-Dispatch Quality Inspection (PDI) & Wash',
        workstation: 'Inspection QC Station #01',
        operator: 'QA Floor Inspector',
        status: 'PENDING',
        startedAt: null,
        completedAt: null,
        cycleTimeMinutes: 30,
        signedOffBy: null
      },
      {
        id: 'OP60',
        opNumber: 'Op 60',
        name: 'Anti-Rust Coating & Crate Packing',
        workstation: 'Packing Line #02',
        operator: 'Packing Team',
        status: 'PENDING',
        startedAt: null,
        completedAt: null,
        cycleTimeMinutes: 20,
        signedOffBy: null
      }
    ],
    pdiInspection: null,
    dispatchGatePass: null
  },
  {
    id: 'TRV-2026-7734',
    barcode: 'TRV-2026-7734',
    partNumber: 'DS-4092-B',
    partName: 'High-Pressure Transmission Drive Shaft',
    customer: 'AeroTorque Power Systems',
    poNumber: 'PO-AERO-88490',
    batchQty: 25,
    acceptedQty: 25,
    rejectedQty: 0,
    heatNumber: 'H-8042',
    rawMaterialGrade: 'AISI 4140 Alloy Steel',
    currentLocation: 'Inspection QC Station #01',
    activeOpId: 'OP50',
    overallStatus: 'READY_FOR_PDI',
    coolingHold: {
      requiredSeconds: 14400,
      startedAt: Date.now() - (15000 * 1000),
      remainingSeconds: 0, // Cooling complete!
      holdOpId: 'OP30',
      dependentOpId: 'OP40',
      reason: 'Cooling hold fulfilled (4 hrs elapsed).'
    },
    operations: [
      { id: 'OP10', opNumber: 'Op 10', name: 'Raw Material Sawing', workstation: 'Cold Cut Saw Station #01', status: 'COMPLETED', signedOffBy: 'SUP-304' },
      { id: 'OP20', opNumber: 'Op 20', name: 'CNC Rough & Finish Turning', workstation: 'CNC Turning Lathe #04', status: 'COMPLETED', signedOffBy: 'SUP-304' },
      { id: 'OP30', opNumber: 'Op 30', name: 'Induction Case Hardening', workstation: 'Induction Heat Treat Bay #01', status: 'COMPLETED', signedOffBy: 'SUP-304' },
      { id: 'OP40', opNumber: 'Op 40', name: 'Precision Cylindrical Grinding', workstation: 'Precision Cylindrical Grinder #05', status: 'COMPLETED', signedOffBy: 'SUP-304' },
      { id: 'OP50', opNumber: 'Op 50', name: 'Pre-Dispatch Quality Inspection (PDI) & Wash', workstation: 'Inspection QC Station #01', status: 'IN_INSPECTION', signedOffBy: null },
      { id: 'OP60', opNumber: 'Op 60', name: 'Anti-Rust Coating & Crate Packing', workstation: 'Packing Line #02', status: 'PENDING', signedOffBy: null }
    ],
    pdiInspection: null,
    dispatchGatePass: null
  }
];

export const RAW_MATERIAL_INVENTORY = [
  {
    heatNumber: 'H-8042',
    supplier: 'Jindal Special Steels Ltd',
    purchaseOrder: 'PO-RAW-2026-1184',
    materialGrade: 'AISI 4140 Alloy Steel',
    chemicalAnalysis: {
      carbon: { spec: '0.38 - 0.43%', actual: '0.41%', status: 'PASS' },
      manganese: { spec: '0.75 - 1.00%', actual: '0.88%', status: 'PASS' },
      silicon: { spec: '0.15 - 0.35%', actual: '0.24%', status: 'PASS' },
      chromium: { spec: '0.80 - 1.10%', actual: '0.96%', status: 'PASS' },
      molybdenum: { spec: '0.15 - 0.25%', actual: '0.21%', status: 'PASS' }
    },
    mechanicalProperties: {
      yieldStrength: { spec: '≥ 655 MPa', actual: '710 MPa', status: 'PASS' },
      tensileStrength: { spec: '850 - 1000 MPa', actual: '920 MPa', status: 'PASS' },
      hardness: { spec: '28 - 32 HRC', actual: '30.5 HRC', status: 'PASS' }
    },
    mtcStatus: 'VERIFIED_MTC_ATTACHED',
    labClearanceDate: '2026-10-12',
    barcodesPrinted: true,
    totalBarsReceived: 120,
    remainingBars: 70
  }
];
