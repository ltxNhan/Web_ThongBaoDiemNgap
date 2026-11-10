import React from 'react';

export const FloodLevelGuidance: React.FC = () => {
  const levels = [
    {
      level: 'Báo Động 1 (Mức Cảnh Báo Ban Đầu)',
      tide: '1.40m - 1.50m tại Phú An',
      impact: 'Nước mấp mé bờ bao, ngập các vùng trũng tự nhiên sát mép sông rạch vào giờ đỉnh triều.',
      color: '#10b981'
    },
    {
      level: 'Báo Động 2 (Mức Nguy Hiểm Vừa)',
      tide: '1.50m - 1.60m tại Phú An',
      impact: 'Tràn bờ bao thấp, ngập lề đường từ 10-25cm trên các tuyến đường ven sông (Trần Xuân Soạn, Mễ Cốc). Phương tiện di chuyển chậm.',
      color: '#f59e0b'
    },
    {
      level: 'Báo Động 3 (Mức Rất Nguy Hiểm)',
      tide: 'Trên 1.60m (Đặc biệt trên 1.70m)',
      impact: 'Ngập sâu diện rộng trên 30-50cm, nước tràn vào nhà dân, giao thông tê liệt hoàn toàn, nguy cơ sạt lở đê bao và tai nạn rò rỉ điện.',
      color: '#ef4444'
    }
  ];

  return (
    <div className="glass" style={{ borderRadius: '16px', padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '12px' }}>
        ⚠️ Hướng Dẫn Chi Tiết Phân Cấp Báo Động Lũ & Triều Cường
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {levels.map((lvl) => (
          <div
            key={lvl.level}
            style={{
              padding: '12px 14px',
              backgroundColor: '#0c1630',
              borderRadius: '10px',
              borderLeft: `4px solid ${lvl.color}`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: lvl.color, fontSize: '0.95rem' }}>{lvl.level}</span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Ngưỡng: {lvl.tide}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>
              {lvl.impact}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
