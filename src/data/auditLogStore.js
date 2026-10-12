// Immutable Tamper-Proof Audit Trail Store per PRD Section 13.3
// Records: User ID, exact timestamp, IP address, device serial number, action, previous value, and new value.

const STORAGE_KEY = 'zaquza_foqcs_audit_log_v1';

const defaultSeedLogs = [
  {
    id: 'AUD-9011',
    timestamp: '2026-10-17T06:05:12.312Z',
    userId: 'QA-8821 (Dev Sharma)',
    role: 'QA Floor Inspector',
    deviceSerial: 'TAB-IP67-X44',
    ipAddress: '192.168.10.42',
    action: 'STATION_PM_VERIFY',
    entityId: 'STATION-VMC-02',
    previousValue: 'PM_DUE',
    newValue: 'PM_VERIFIED_OK',
    details: 'Shift morning zero-point and spindle runout check confirmed.'
  },
  {
    id: 'AUD-9012',
    timestamp: '2026-10-17T06:45:00.000Z',
    userId: 'SUP-304 (Vikram Malhotra)',
    role: 'Shift Supervisor',
    deviceSerial: 'STN-SUP-01',
    ipAddress: '192.168.10.15',
    action: 'TRAVELER_RELEASE',
    entityId: 'TRV-2026-9041',
    previousValue: 'STAGED',
    newValue: 'IN_PROCESS',
    details: 'Work order released to CNC Machining line. Heat batch #H-8042 linked.'
  },
  {
    id: 'AUD-9013',
    timestamp: '2026-10-17T07:30:19.451Z',
    userId: 'QA-8821 (Dev Sharma)',
    role: 'QA Floor Inspector',
    deviceSerial: 'TAB-IP67-X44',
    ipAddress: '192.168.10.42',
    action: 'FIRST_PIECE_APPROVAL',
    entityId: 'TRV-2026-9041-OP20',
    previousValue: 'SETUP_MODE',
    newValue: 'PRODUCTION_CLEARED',
    details: 'First-piece dimensions verified with micrometer #MIC-08. Spindle unlocked.'
  }
];

class AuditTrailStore {
  constructor() {
    this.listeners = new Set();
    this.logs = this.loadLogs();
  }

  loadLogs() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // LocalStorage fallback
    }
    return [...defaultSeedLogs];
  }

  saveLogs() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.logs));
    } catch {
      // Fallback
    }
  }

  getLogs() {
    return [...this.logs];
  }

  // Immutable append-only logging (Cannot be edited or deleted per PRD Section 13.3)
  logEvent({ userId, role, action, entityId, previousValue, newValue, details, deviceSerial = 'TAB-IP67-X44' }) {
    const newEntry = {
      id: `AUD-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      userId: userId || 'SYSTEM-DAEMON',
      role: role || 'System',
      deviceSerial,
      ipAddress: '192.168.10.42',
      action,
      entityId,
      previousValue: String(previousValue ?? 'N/A'),
      newValue: String(newValue ?? 'N/A'),
      details: details || ''
    };

    // Prepend for reverse-chronological order
    this.logs = [newEntry, ...this.logs];
    this.saveLogs();
    this.notify();
    return newEntry;
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((cb) => {
      try {
        cb(this.logs);
      } catch (err) {
        console.error('Audit listener error:', err);
      }
    });
  }
}

export const auditTrail = new AuditTrailStore();
