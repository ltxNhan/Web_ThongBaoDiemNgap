import React from 'react';

export const EmergencyCallPanel: React.FC = () => {
  const hotlines = [
    { title: 'Cứu Nạn Cứu Hộ & PCCC', number: '114', desc: 'Ứng cứu người mắc kẹt trong nước, xuồng cứu sinh', color: '#ef4444', icon: '🚒' },
    { title: 'Cấp Cứu Y Tế', number: '115', desc: 'Xe cấp cứu, hỗ trợ y tế khẩn cấp tại vùng ngập', color: '#0284c7', icon: '🚑' },
    { title: 'CSGT - Điều Tiết & Cứu Hộ Giao Thông', number: '028.38387240', desc: 'Phản ánh đường tê liệt, xe chết máy, phân luồng', color: '#f59e0b', icon: '🚓' },
    { title: 'Ban Chỉ Huy Phòng Chống Thiên Tai', number: '028.38297598', desc: 'Tiếp nhận thông tin vỡ bờ bao, sự cố đê kè', color: '#10b981', icon: '🌊' }
  ];

  return (
    <div className="glass" style={{ borderRadius: '16px', padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1rem' }}>
        📞 Danh Bạ Đường Dây Nóng Khẩn Cấp (Gọi Nhanh 24/7)
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
        {hotlines.map((h) => (
          <div
            key={h.number}
            style={{
              padding: '14px',
              backgroundColor: '#0c1630',
              borderRadius: '12px',
              border: `1px solid ${h.color}33`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.25rem' }}>{h.icon}</span>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>{h.title}</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '4px 0 0' }}>{h.desc}</p>
            </div>

            <a
              href={`tel:${h.number.replace(/\./g, '')}`}
              style={{
                backgroundColor: h.color,
                color: '#ffffff',
                padding: '8px 14px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '1rem',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                boxShadow: `0 4px 12px ${h.color}55`
              }}
            >
              Gọi {h.number}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
