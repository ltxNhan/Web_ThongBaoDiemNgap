import React from 'react';

export const KpiCards: React.FC = () => {
  const cards = [
    { title: 'Cấp Báo Động Thành Phố', value: 'BÁO ĐỘNG 3', sub: 'Đỉnh triều 1.74m tại Phú An', color: '#ef4444', icon: '🚨' },
    { title: 'Điểm Ngập Sâu Đang Hoạt Động', value: '18 Điểm', sub: '5 điểm ngập rất nguy hiểm (>40cm)', color: '#f97316', icon: '🌊' },
    { title: 'Mạng Lưới Trạm Quan Trắc IoT', value: '148 / 150', sub: '2 trạm mất kết nối cần kiểm tra', color: '#10b981', icon: '📡' },
    { title: 'Yêu Cầu Cứu Hộ Tiếp Nhận (114)', value: '12 Ca', sub: '8 đã điều phối, 4 đang ứng cứu', color: '#38bdf8', icon: '🚑' }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
      {cards.map((c) => (
        <div
          key={c.title}
          style={{
            backgroundColor: '#0c1630',
            border: '1px solid #1c2b54',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>{c.title}</span>
            <span style={{ fontSize: '1.4rem' }}>{c.icon}</span>
          </div>

          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: c.color, letterSpacing: '-0.02em' }}>
            {c.value}
          </div>

          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            {c.sub}
          </span>
        </div>
      ))}
    </div>
  );
};
