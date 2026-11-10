import React from 'react';

export const TideWaveChart: React.FC = () => {
  return (
    <div className="glass" style={{ borderRadius: '16px', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
            🌊 Biểu Đồ Sóng Triều Cường (Trạm Phú An)
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Mực nước đỉnh triều so với ngưỡng báo động</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
            Báo Động 3: 1.60m
          </span>
        </div>
      </div>

      {/* SVG Wave Curve */}
      <div style={{ height: '180px', position: 'relative', width: '100%', overflow: 'hidden' }}>
        <svg viewBox="0 0 600 180" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <defs>
            <linearGradient id="tideGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="rgba(14, 165, 233, 0.5)" />
              <stop offset="100%" stop-color="rgba(14, 165, 233, 0.0)" />
            </linearGradient>
          </defs>

          {/* Alarm 3 threshold line (1.60m) */}
          <line x1="0" y1="50" x2="600" y2="50" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 4" />
          <text x="590" y="44" fill="#ef4444" fontSize="11" textAnchor="end" fontWeight="bold">Ngưỡng BĐ3 (1.60m)</text>

          {/* Tide curve */}
          <path
            d="M 0,140 Q 75,170 150,110 T 300,35 T 450,150 T 600,100 L 600,180 L 0,180 Z"
            fill="url(#tideGrad)"
          />
          <path
            d="M 0,140 Q 75,170 150,110 T 300,35 T 450,150 T 600,100"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
          />

          {/* Peak point indicator */}
          <circle cx="300" cy="35" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
          <text x="300" y="24" fill="#f87171" fontSize="12" textAnchor="middle" fontWeight="bold">
            Đỉnh 1.74m (17:30)
          </text>
        </svg>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '10px' }}>
        <span>00:00 (0.85m)</span>
        <span>06:00 (1.10m)</span>
        <span>12:00 (0.95m)</span>
        <span style={{ color: '#f87171', fontWeight: 'bold' }}>18:00 (1.74m Đỉnh)</span>
        <span>23:59 (1.20m)</span>
      </div>
    </div>
  );
};
