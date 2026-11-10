import React from 'react';
import { Station } from '../../../types';

interface StationTableProps {
  stations: Station[];
  onSelectStation: (st: Station) => void;
  onRemoteAction: (st: Station) => void;
}

export const StationTable: React.FC<StationTableProps> = ({ stations, onSelectStation, onRemoteAction }) => {
  return (
    <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#070f24', color: '#94a3b8', borderBottom: '1px solid #1c2b54' }}>
              <th style={{ padding: '12px 16px' }}>Mã & Tên Trạm</th>
              <th style={{ padding: '12px 16px' }}>Phân Loại</th>
              <th style={{ padding: '12px 16px' }}>Trạng Thái</th>
              <th style={{ padding: '12px 16px' }}>Lượng Mưa</th>
              <th style={{ padding: '12px 16px' }}>Mực Nước Triều</th>
              <th style={{ padding: '12px 16px' }}>Pin / Tín Hiệu</th>
              <th style={{ padding: '12px 16px' }}>Cập Nhật Lần Cuối</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((st) => (
              <tr
                key={st.id}
                style={{ borderBottom: '1px solid #142142', cursor: 'pointer' }}
                onClick={() => onSelectStation(st)}
              >
                <td style={{ padding: '12px 16px' }}>
                  <b style={{ color: '#f8fafc', display: 'block' }}>{st.name}</b>
                  <span style={{ fontSize: '0.75rem', color: '#38bdf8' }}>{st.code}</span>
                </td>

                <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>
                  {st.type === 'combined' ? 'Mưa & Triều' : st.type === 'tide' ? 'Triều Ký' : 'Đo Mưa'}
                </td>

                <td style={{ padding: '12px 16px' }}>
                  <span
                    style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: st.status === 'online' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: st.status === 'online' ? '#34d399' : '#f87171',
                      border: `1px solid ${st.status === 'online' ? '#10b981' : '#ef4444'}`
                    }}
                  >
                    ● {st.status.toUpperCase()}
                  </span>
                </td>

                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#f59e0b' }}>
                  {st.currentRainMm} mm
                </td>

                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#38bdf8' }}>
                  {st.currentTideM} m
                </td>

                <td style={{ padding: '12px 16px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                  🔋 {st.batteryPercent}% • 📶 {st.signalDbm} dBm
                </td>

                <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: '0.8rem' }}>
                  {st.lastPing}
                </td>

                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoteAction(st);
                    }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      backgroundColor: '#1e3a8a',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    ⚡ Điều Khiển
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
