import React from 'react';
import { FloodAlert } from '../../../types';
import { formatDateTime } from '../../../utils/formatDate';

interface ActiveAlertListProps {
  alerts: FloodAlert[];
}

export const ActiveAlertList: React.FC<ActiveAlertListProps> = ({ alerts }) => {
  return (
    <div className="glass" style={{ borderRadius: '16px', padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1rem' }}>
        📢 Các Bản Tin Cảnh Báo Đang Có Hiệu Lực
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {alerts.map((al) => (
          <div
            key={al.id}
            style={{
              padding: '14px 16px',
              backgroundColor: '#0c1630',
              borderLeft: '4px solid #ef4444',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f87171' }}>
                {al.title}
              </span>
              <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '2px 8px', borderRadius: '4px' }}>
                Cấp BĐ {al.level}
              </span>
            </div>

            <p style={{ fontSize: '0.875rem', color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>
              {al.content}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
              <span>Khu vực: {al.affectedDistricts.join(', ')}</span>
              <span>Hiệu lực đến: {formatDateTime(al.validUntil)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
