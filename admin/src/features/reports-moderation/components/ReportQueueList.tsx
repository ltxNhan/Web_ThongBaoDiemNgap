import React from 'react';
import { ModerationReport } from '../../../types';

interface ReportQueueListProps {
  reports: ModerationReport[];
  selectedId: string;
  onSelect: (report: ModerationReport) => void;
}

export const ReportQueueList: React.FC<ReportQueueListProps> = ({ reports, selectedId, onSelect }) => {
  return (
    <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '720px', overflowY: 'auto' }}>
      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f8fafc', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
        <span>Hàng Đợi Chờ Duyệt</span>
        <span style={{ fontSize: '0.75rem', backgroundColor: '#ef4444', color: '#ffffff', padding: '2px 8px', borderRadius: '999px' }}>
          {reports.length} Tin mới
        </span>
      </div>

      {reports.map((rep) => {
        const isSelected = rep.id === selectedId;
        return (
          <div
            key={rep.id}
            onClick={() => onSelect(rep)}
            style={{
              padding: '12px',
              borderRadius: '10px',
              backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.15)' : '#070f24',
              border: isSelected ? '1px solid #38bdf8' : '1px solid #182850',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f8fafc' }}>{rep.street}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f87171' }}>{rep.depthEstimate}cm</span>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{rep.district} • Bởi: {rep.userName}</span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{rep.closestStationName}</span>
          </div>
        );
      })}
    </div>
  );
};
