import React from 'react';

export const RealtimeRainTideChart: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
            📈 Xu Hướng Lượng Mưa & Mực Nước Triều (12 Giờ Qua)
          </h3>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Dữ liệu tổng hợp từ trạm Phú An và trạm Thủ Đức</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem' }}>
          <span style={{ color: '#38bdf8' }}>— Triều cường (m)</span>
          <span style={{ color: '#f59e0b' }}>— Lượng mưa (mm/h)</span>
        </div>
      </div>

      <div style={{ height: '160px', position: 'relative' }}>
        <svg viewBox="0 0 500 160" style={{ width: '100%', height: '100%' }}>
          {/* Grid lines */}
          <line x1="0" y1="40" x2="500" y2="40" stroke="#16254a" strokeDasharray="4 4" />
          <line x1="0" y1="80" x2="500" y2="80" stroke="#16254a" strokeDasharray="4 4" />
          <line x1="0" y1="120" x2="500" y2="120" stroke="#16254a" strokeDasharray="4 4" />

          {/* Tide Line */}
          <path
            d="M 0,110 Q 120,130 250,50 T 500,75"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
          />

          {/* Rain Line */}
          <path
            d="M 0,140 Q 100,120 220,95 T 380,30 T 500,85"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2.5"
          />
        </svg>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '6px' }}>
        <span>04:00</span>
        <span>07:00</span>
        <span>10:00</span>
        <span>13:00</span>
        <span style={{ color: '#f87171', fontWeight: 'bold' }}>16:00 (Hiện tại)</span>
      </div>
    </div>
  );
};
