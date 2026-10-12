import React, { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { NavigationTabs } from './components/NavigationTabs';
import { TabletInspector } from './components/TabletInspector';
import { SupervisorDashboard } from './components/SupervisorDashboard';
import { TravelerRouting } from './components/TravelerRouting';
import { PreDispatchGate } from './components/PreDispatchGate';
import { TraceabilityExplorer } from './components/TraceabilityExplorer';
import { AuditTrailViewer } from './components/AuditTrailViewer';

import { 
  ROLES, 
  WORKSTATIONS, 
  INITIAL_JOB_TRAVELERS, 
  GAUGES_REGISTER,
  BLUEPRINT_TEMPLATE 
} from './data/initialData';

export default function App() {
  const [currentRoleId, setCurrentRoleId] = useState('inspector');
  const [activeTab, setActiveTab] = useState('inspector');
  const [isOffline, setIsOffline] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // Active Station & Traveler state
  const [scannedStation, setScannedStation] = useState(WORKSTATIONS[0]); // Mazak VMC-02
  const [travelers, setTravelers] = useState(INITIAL_JOB_TRAVELERS);
  const [activeTravelerId, setActiveTravelerId] = useState(INITIAL_JOB_TRAVELERS[0].id);

  // Inspections list for Supervisor Queue
  const [inspections, setInspections] = useState([
    {
      id: 'PDI-99120',
      travelerId: 'TRV-2026-7734',
      partNumber: 'DS-4092-B',
      stationCode: 'STATION-VMC-02',
      inspectorEmpId: 'QA-8821',
      inspectorName: 'Dev Sharma',
      timestamp: '2026-10-17T06:30:00.000Z',
      measurements: {
        1: { value: '25.020', toolUsed: 'MIC-08', eval: { status: 'PASS', delta: '+0.020 mm' } },
        2: { value: '15.030', toolUsed: 'PG-04', eval: { status: 'PASS', delta: '+0.004 mm' } },
        3: { value: '0.45', toolUsed: 'SR-01', eval: { status: 'PASS', delta: '0.45 / 0.80 max' } },
        4: { value: '0.012', toolUsed: 'VC-104', eval: { status: 'PASS', delta: '0.012 / 0.020 max' } },
        5: { value: 'PASS', toolUsed: 'VISUAL_INSPECTION', eval: { status: 'PASS', delta: 'Conforming' } }
      },
      hasOutlier: false,
      hasCtqFail: false,
      defectPhotos: [],
      status: 'AWAITING_SUPERVISOR_APPROVAL',
      supervisorDecision: null
    }
  ]);

  const currentUser = ROLES.find(r => r.id === currentRoleId) || ROLES[0];
  const activeTraveler = travelers.find(t => t.id === activeTravelerId) || travelers[0];

  // Submission from Tablet Inspector
  const handleSubmitInspection = (newRecord) => {
    setInspections([newRecord, ...inspections]);
    setActiveTab('supervisor'); // Auto-navigate to supervisor queue to review!
  };

  // Supervisor Actions
  const handleApproveInspection = (inspectionId) => {
    setInspections(inspections.map(i => {
      if (i.id === inspectionId) {
        return { ...i, status: 'APPROVED', supervisorDecision: 'APPROVED' };
      }
      return i;
    }));
  };

  const handleConcessionInspection = (inspectionId, concessionData) => {
    setInspections(inspections.map(i => {
      if (i.id === inspectionId) {
        return { 
          ...i, 
          status: 'APPROVED_WITH_CONCESSION', 
          supervisorDecision: 'CONCESSION',
          concessionDetails: concessionData 
        };
      }
      return i;
    }));
  };

  const handleQuarantineInspection = (inspectionId) => {
    setInspections(inspections.map(i => {
      if (i.id === inspectionId) {
        return { ...i, status: 'QUARANTINED', supervisorDecision: 'QUARANTINE' };
      }
      return i;
    }));
  };

  const handleMRBDisposition = (inspectionId, dispositionData) => {
    setInspections(inspections.map(i => {
      if (i.id === inspectionId) {
        return { 
          ...i, 
          status: `MRB_${dispositionData.dispositionType}`, 
          mrbDisposition: dispositionData 
        };
      }
      return i;
    }));
  };

  // Resolve Station PM if locked
  const handleResolveStationPM = () => {
    if (scannedStation) {
      setScannedStation({
        ...scannedStation,
        dailyPmStatus: 'COMPLETED',
        pmCompletedAt: '2026-10-17 06:45 AM (Verified)',
        safetyZeroPointOk: true
      });
    }
  };

  const pendingApprovalsCount = inspections.filter(
    i => i.status === 'AWAITING_SUPERVISOR_APPROVAL'
  ).length;

  return (
    <div className="foqcs-app-container" data-high-contrast={highContrast ? 'true' : 'false'}>
      {/* Industrial Status Header */}
      <Header
        currentRole={currentRoleId}
        onSelectRole={setCurrentRoleId}
        isOffline={isOffline}
        onToggleOffline={() => setIsOffline(!isOffline)}
        highContrast={highContrast}
        onToggleContrast={() => setHighContrast(!highContrast)}
      />

      {/* Navigation Tabs (Glove-Friendly Touch Targets) */}
      <NavigationTabs
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        pendingApprovalsCount={pendingApprovalsCount}
      />

      {/* Main Workspace Display */}
      <main className="foqcs-main-content">
        {activeTab === 'inspector' && (
          <TabletInspector
            scannedStation={scannedStation}
            scannedTraveler={activeTraveler}
            onScanStation={(stn) => setScannedStation(stn)}
            onScanTraveler={(trv) => {
              setActiveTravelerId(trv.id);
            }}
            onResetScan={() => {
              setScannedStation(null);
            }}
            currentUser={currentUser}
            onSubmitForApproval={handleSubmitInspection}
            onResolvePM={handleResolveStationPM}
          />
        )}

        {activeTab === 'supervisor' && (
          <SupervisorDashboard
            inspections={inspections}
            onApproveInspection={handleApproveInspection}
            onConcessionInspection={handleConcessionInspection}
            onQuarantineInspection={handleQuarantineInspection}
            onMRBDisposition={handleMRBDisposition}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'routing' && (
          <TravelerRouting
            traveler={activeTraveler}
            currentUser={currentUser}
            onUpdateTraveler={(updated) => {
              setTravelers(travelers.map(t => t.id === updated.id ? updated : t));
            }}
          />
        )}

        {activeTab === 'dispatch' && (
          <PreDispatchGate
            traveler={activeTraveler}
            inspections={inspections}
            currentUser={currentUser}
            onGenerateGatePass={() => {}}
          />
        )}

        {activeTab === 'traceability' && (
          <TraceabilityExplorer />
        )}

        {activeTab === 'audit' && (
          <AuditTrailViewer />
        )}
      </main>
    </div>
  );
}
