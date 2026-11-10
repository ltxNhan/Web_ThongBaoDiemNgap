import React from 'react';
import { AuditLog } from '../../../types';

interface LiveEventLogsTableProps {
  logs: AuditLog[];
}

export const LiveEventLogsTable: React.FC<LiveEventLogsTableProps> = ({ logs }) => {
  return (
    <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', overflow: 'hidden' }}>
      <div style={{ padding: '1.25rem', borderBottom: '1px solid #1c2b54', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
          📜 Nhật Ký Sự Kiện Hệ Thống Thời Gian Thực
        </h3>
        <span style={{ fontSize: '0.75rem', color: '#10b981' }}>● Ghi nhận trực tiếp (Live Stream)</span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#070f24', color: '#94a3b8', borderBottom: '1px solid #1c2b54' }}>
              <th style={{ padding: '10px 14px' }}>Mã & Thời Gian</th>
              <th style={{ padding: '10px 14px' }}>Phân Loại</th>
              <th style={{ padding: '10px 14px' }}>Hành Động / Sự Kiện</th>
              <th style={{ padding: '10px 14px' }}>Cán Bộ / Hệ Thống</th>
              <th style={{ padding: '10px 14px' }}>Địa Chỉ IP</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((lg) => (
              <tr key={lg.id} style={{ borderBottom: '1px solid #142142' }}>
                <td style={{ padding: '10px 14px' }}>
                  <b style={{ color: '#38bdf8' }}>{lg.id}</b>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{lg.timestamp}</div>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', backgroundColor: '#1e293b', color: '#cbd5e1' }}>
                    {lg.category}
                  </span>
                </td>
                <td style={{ padding: '10px 14px', color: lg.severity === 'error' ? '#f87171' : lg.severity === 'warn' ? '#fbbf24' : '#ffffff', fontWeight: 600 }}>
                  {lg.action}
                </td>
                <td style={{ padding: '10px 14px', color: '#cbd5e1' }}>{lg.staffName}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#94a3b8' }}>{lg.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
