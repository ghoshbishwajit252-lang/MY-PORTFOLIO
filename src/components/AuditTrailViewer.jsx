import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Search, 
  Download, 
  Lock, 
  RefreshCw,
  Terminal,
  Filter
} from 'lucide-react';
import { auditTrail } from '../data/auditLogStore';

export function AuditTrailViewer() {
  const [logs, setLogs] = useState(auditTrail.getLogs());
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  useEffect(() => {
    const unsubscribe = auditTrail.subscribe((updated) => {
      setLogs([...updated]);
    });
    return () => unsubscribe();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'ALL' || log.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const exportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ZAPUZA_AUDIT_LOG_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="audit-trail-root">
      {/* Top Banner */}
      <div className="dispatch-header-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="qr-icon-pill">
              <ShieldCheck size={24} className="text-cyan" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Immutable Security Audit Trail (PRD Section 13.3)</h3>
              <p className="text-xs text-secondary">
                Tamper-proof append-only ledger for ISO 9001 and AS9100D compliance. Data cannot be deleted or altered by any user.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="btn-industrial btn-outline font-mono text-xs"
            onClick={exportJSON}
          >
            <Download size={14} /> Export Audit JSON
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="audit-filter-bar my-4 flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            className="industrial-input font-mono text-xs pl-8"
            placeholder="Search audit trail by Action, Entity ID, or User..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="industrial-input font-mono text-xs w-48"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="ALL">All Roles</option>
          <option value="QA Floor Inspector">QA Floor Inspector</option>
          <option value="Shift Supervisor">Shift Supervisor</option>
          <option value="Quality Manager">Quality Manager</option>
          <option value="Warehouse & Dispatch Clerk">Warehouse Clerk</option>
          <option value="Process Timer Engine">Process Timer Engine</option>
        </select>
      </div>

      {/* Audit Log Table */}
      <div className="audit-table-card">
        <div className="table-responsive">
          <table className="industrial-table text-xs font-mono">
            <thead>
              <tr>
                <th style={{ width: '100px' }}>Log ID</th>
                <th style={{ width: '160px' }}>Timestamp</th>
                <th>Operator / User ID</th>
                <th>Action Event</th>
                <th>Entity Reference</th>
                <th>Previous Value</th>
                <th>New Value</th>
                <th>Device & Network</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td className="text-cyan font-bold">{log.id}</td>
                  <td className="text-secondary">{new Date(log.timestamp).toLocaleTimeString()}</td>
                  <td>
                    <div><strong>{log.userId}</strong></div>
                    <div className="text-muted text-[10px]">{log.role}</div>
                  </td>
                  <td>
                    <span className="badge badge-cyan text-[10px]">{log.action}</span>
                  </td>
                  <td><strong>{log.entityId}</strong></td>
                  <td className="text-muted">{log.previousValue}</td>
                  <td className="text-green font-bold">{log.newValue}</td>
                  <td className="text-muted text-[10px]">
                    {log.deviceSerial} ({log.ipAddress})
                  </td>
                  <td className="text-secondary max-w-xs truncate" title={log.details}>
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
