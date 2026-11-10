import React from 'react';

export const HardwareUsageGauge: React.FC = () => {
  const gauges = [
    { name: 'NVIDIA RTX A6000 (GPU AI)', usage: 78, color: '#10b981' },
    { name: 'CPU Server (32 Cores)', usage: 62, color: '#38bdf8' },
    { name: 'Bộ Nhớ RAM (128 GB)', usage: 54, color: '#f59e0b' },
    { name: 'Dung Lượng Ổ NVMe SSD', usage: 35, color: '#a855f7' }
  ];

  return (
    <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
        🖥️ Tài Nguyên Máy Chủ Tính Toán Mô Phỏng
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {gauges.map((g) => (
          <div key={g.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
              <span style={{ color: '#cbd5e1' }}>{g.name}</span>
              <b style={{ color: g.color }}>{g.usage}%</b>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#070f24', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${g.usage}%`, height: '100%', backgroundColor: g.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
