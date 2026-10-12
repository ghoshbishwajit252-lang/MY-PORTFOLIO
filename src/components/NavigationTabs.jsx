import React from 'react';
import { 
  Tablet, 
  ClipboardCheck, 
  Timer, 
  ShieldAlert, 
  Search, 
  FileText 
} from 'lucide-react';

export function NavigationTabs({ activeTab, onSelectTab, pendingApprovalsCount = 0 }) {
  const tabs = [
    {
      id: 'inspector',
      label: '1. Inspector Tablet',
      sub: 'Dual-QR & PDI Checklist',
      icon: Tablet
    },
    {
      id: 'supervisor',
      label: '2. Supervisor Review & MRB',
      sub: 'Approvals & Concessions',
      icon: ClipboardCheck,
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : null
    },
    {
      id: 'routing',
      label: '3. Traveler & Hold Timers',
      sub: 'Op 10-60 & Aging Interlocks',
      icon: Timer
    },
    {
      id: 'dispatch',
      label: '4. Dispatch & Gate Interlock',
      sub: '3-Gate Pre-Shipping Lockout',
      icon: ShieldAlert
    },
    {
      id: 'traceability',
      label: '5. Traceability & MTC',
      sub: 'Forward & Backward Lineage',
      icon: Search
    },
    {
      id: 'audit',
      label: '6. Immutable Audit Trail',
      sub: 'ISO Compliance Log',
      icon: FileText
    }
  ];

  return (
    <nav className="industrial-nav-tabs">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`nav-tab-btn ${isActive ? 'active-tab' : ''}`}
            onClick={() => onSelectTab(tab.id)}
          >
            <div className="tab-icon-wrapper">
              <Icon size={20} />
              {tab.badge && (
                <span className="tab-badge-count">{tab.badge}</span>
              )}
            </div>
            <div className="tab-text-group">
              <span className="tab-main-label">{tab.label}</span>
              <span className="tab-sub-label">{tab.sub}</span>
            </div>
          </button>
        );
      })}
    </nav>
  );
}
