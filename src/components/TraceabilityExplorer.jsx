import React, { useState } from 'react';
import { 
  Search, 
  RotateCw, 
  Layers, 
  FileText, 
  ShieldAlert, 
  CheckCircle, 
  ArrowRight,
  Database,
  Truck,
  Building,
  Factory
} from 'lucide-react';
import { RAW_MATERIAL_INVENTORY, INITIAL_JOB_TRAVELERS } from '../data/initialData';

export function TraceabilityExplorer() {
  const [searchMode, setSearchMode] = useState('FORWARD'); // 'FORWARD' (Heat #) | 'BACKWARD' (Serial #)
  const [searchQuery, setSearchQuery] = useState('H-8042');
  const [searchResult, setSearchResult] = useState(null);

  const rawItem = RAW_MATERIAL_INVENTORY[0];

  const handleSearch = () => {
    if (searchMode === 'FORWARD') {
      // Forward Recall Traceability
      setSearchResult({
        mode: 'FORWARD',
        query: searchQuery,
        rawStock: rawItem,
        impactedTravelers: INITIAL_JOB_TRAVELERS,
        impactedCrates: ['CRATE-AERO-081', 'CRATE-AERO-082'],
        customer: 'AeroTorque Power Systems'
      });
    } else {
      // Backward Field Traceability
      setSearchResult({
        mode: 'BACKWARD',
        query: searchQuery || 'DS-4092-SN-1092',
        serialNumber: searchQuery || 'DS-4092-SN-1092',
        heatNumber: rawItem.heatNumber,
        millCert: 'MTC-JINDAL-2026-881',
        machiningLine: 'CNC Turning Lathe #04 (Mazak VCN-530C)',
        machinist: 'P. Nair (OP-224)',
        shift: 'Morning Shift 2026-10-17',
        gaugesUsed: ['MIC-08 (Digital Micrometer)', 'SR-01 (Roughness Tester)'],
        measuredOD: '25.020 mm (In-Spec: 24.980 - 25.050)',
        finalPDIInspector: 'Dev Sharma (QA-8821)',
        gatePassNumber: 'GP-2026-9041'
      });
    }
  };

  return (
    <div className="traceability-root">
      {/* Header */}
      <div className="dispatch-header-card">
        <div className="flex items-center gap-3">
          <div className="qr-icon-pill">
            <Search size={24} className="text-cyan" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Comprehensive Part Lineage & Traceability (PRD Section 7.2)</h3>
            <p className="text-xs text-secondary">
              Instant Forward Supplier Recall & Backward Field Failure Root-Cause Analysis.
            </p>
          </div>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="trace-search-bar my-4">
        <div className="flex gap-3 mb-3">
          <button
            type="button"
            className={`btn-industrial flex-1 text-xs font-mono ${searchMode === 'FORWARD' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => {
              setSearchMode('FORWARD');
              setSearchQuery('H-8042');
              setSearchResult(null);
            }}
          >
            <RotateCw size={14} />
            <span>1. Forward Supplier Recall (Query Heat Batch #)</span>
          </button>
          <button
            type="button"
            className={`btn-industrial flex-1 text-xs font-mono ${searchMode === 'BACKWARD' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => {
              setSearchMode('BACKWARD');
              setSearchQuery('DS-4092-SN-1092');
              setSearchResult(null);
            }}
          >
            <Database size={14} />
            <span>2. Backward Field Traceability (Query Component Serial #)</span>
          </button>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            className="industrial-input font-mono text-sm flex-1"
            placeholder={searchMode === 'FORWARD' ? 'Enter Raw Material Heat Number (e.g. H-8042)...' : 'Enter Component Serial Number (e.g. DS-4092-SN-1092)...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="button"
            className="btn-industrial btn-primary font-mono text-xs px-6"
            onClick={handleSearch}
          >
            <Search size={16} /> Execute Trace Query
          </button>
        </div>
      </div>

      {/* Query Results */}
      {searchResult && (
        <div className="trace-result-card my-4">
          {searchResult.mode === 'FORWARD' ? (
            <div className="forward-trace-view">
              <div className="flex items-center justify-between border-b border-light pb-3 mb-3">
                <span className="badge badge-amber font-mono text-xs">FORWARD SUPPLIER RECALL QUERY RESULTS</span>
                <span className="font-mono text-xs text-secondary">Heat Batch: <strong>{searchResult.query}</strong></span>
              </div>

              {/* Raw Stock Details */}
              <div className="grid grid-cols-3 gap-4 mb-4 text-xs font-mono">
                <div className="p-3 bg-surface rounded border border-light">
                  <div className="text-secondary">Supplier Name:</div>
                  <strong className="text-white text-sm">{searchResult.rawStock.supplier}</strong>
                  <div className="text-secondary mt-1">PO: {searchResult.rawStock.purchaseOrder}</div>
                </div>
                <div className="p-3 bg-surface rounded border border-light">
                  <div className="text-secondary">Material Specification:</div>
                  <strong className="text-cyan text-sm">{searchResult.rawStock.materialGrade}</strong>
                  <div className="text-secondary mt-1">MTC Verified: ✓ Chemistry OK</div>
                </div>
                <div className="p-3 bg-surface rounded border border-light">
                  <div className="text-secondary">Dock Receiving Date:</div>
                  <strong className="text-white text-sm">{searchResult.rawStock.labClearanceDate}</strong>
                  <div className="text-secondary mt-1">Remaining Bars in Stores: 70</div>
                </div>
              </div>

              {/* Impacted Work Orders & Customer Crates */}
              <div className="p-4 bg-surface rounded border border-light">
                <h4 className="font-bold text-sm mb-2 text-cyan font-mono">
                  IMPACTED PRODUCTION WORK ORDERS & FINISHED CRATES:
                </h4>
                <div className="space-y-2 text-xs font-mono">
                  {searchResult.impactedTravelers.map((trv) => (
                    <div key={trv.id} className="flex items-center justify-between p-2 bg-card rounded">
                      <div>
                        <strong>{trv.id}</strong> — {trv.partNumber} ({trv.partName}) • Qty: {trv.batchQty} pcs
                      </div>
                      <span className="text-secondary">Customer: <strong>{trv.customer}</strong></span>
                    </div>
                  ))}
                  <div className="text-amber mt-2">
                    ⚠️ Recall Action: In seconds, system identified 2 active work orders and 75 finished components across 2 customer crates.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="backward-trace-view">
              <div className="flex items-center justify-between border-b border-light pb-3 mb-3">
                <span className="badge badge-green font-mono text-xs">BACKWARD FIELD FAILURE "BIRTH CERTIFICATE"</span>
                <span className="font-mono text-xs text-secondary">Component Serial: <strong>{searchResult.serialNumber}</strong></span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 bg-surface rounded border border-light space-y-2">
                  <div className="font-bold text-cyan text-sm">ORIGIN & RAW METALLURGY:</div>
                  <div>• Raw Material Heat #: <strong>{searchResult.heatNumber}</strong></div>
                  <div>• Mill Test Certificate: <strong>{searchResult.millCert}</strong></div>
                  <div>• Chemistry: <strong>0.41% C, 0.88% Mn, 0.96% Cr</strong></div>
                  <div>• Initial Dock Intake: <strong>Cleared & Passed Spectro</strong></div>
                </div>

                <div className="p-3 bg-surface rounded border border-light space-y-2">
                  <div className="font-bold text-cyan text-sm">MACHINING & OPERATOR LINEAGE:</div>
                  <div>• CNC Lathe: <strong>{searchResult.machiningLine}</strong></div>
                  <div>• Machinist: <strong>{searchResult.machinist}</strong></div>
                  <div>• Shift Timestamp: <strong>{searchResult.shift}</strong></div>
                  <div>• Measuring Tool Used: <strong>{searchResult.gaugesUsed.join(', ')}</strong></div>
                </div>
              </div>

              <div className="mt-3 p-3 bg-surface rounded border border-light text-xs font-mono space-y-1">
                <div className="font-bold text-cyan text-sm mb-1">INSPECTION & DISPATCH AUDIT:</div>
                <div>• Pre-Dispatch Measurement OD: <strong>{searchResult.measuredOD}</strong></div>
                <div>• QA Final Sign-off Inspector: <strong>{searchResult.finalPDIInspector}</strong></div>
                <div>• Dispatch Clearance Gate Pass: <strong>{searchResult.gatePassNumber}</strong></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Raw Material Dock Metallurgy Overview (PRD Section 3) */}
      <div className="dock-mtc-overview-card mt-5">
        <div className="flex items-center gap-2 mb-3">
          <Factory size={18} className="text-cyan" />
          <h4 className="font-bold text-sm font-mono">Raw Material Receiving & Lab Spectro Chemistry (PRD Section 3.2)</h4>
        </div>

        <div className="grid grid-cols-5 gap-3 text-xs font-mono">
          {Object.entries(rawItem.chemicalAnalysis).map(([element, data]) => (
            <div key={element} className="p-2 bg-surface rounded border border-light text-center">
              <div className="text-secondary uppercase">{element}</div>
              <div className="font-bold text-white text-sm my-1">{data.actual}</div>
              <div className="text-muted text-[10px]">Spec: {data.spec}</div>
              <span className="badge badge-green text-[10px] mt-1">PASS</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
