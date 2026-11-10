import React from 'react';

export const VolunteerContacts: React.FC = () => {
  const teams = [
    { name: 'Đội SOS Bình Thạnh - Cứu Hộ Miễn Phí', phone: '0938 111 222', area: 'Bình Thạnh, Phú Nhuận', support: 'Kích bình, lau bugi, kéo xe qua vùng ngập' },
    { name: 'CLB Xuồng Hơi Cứu Nạn Sài Gòn', phone: '0909 333 444', area: 'Toàn TP & Vùng ven', support: 'Vận chuyển người già, người bệnh khi nước cô lập' },
    { name: 'Biệt Đội Hỗ Trợ Giao Thông Thủ Đức', phone: '0977 555 666', area: 'TP. Thủ Đức, Q.9', support: 'Cứu hộ xe máy ngập nước, chỉ đường tránh kẹt' }
  ];

  return (
    <div className="glass" style={{ borderRadius: '16px', padding: '1.25rem' }}>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
        🤝 Đội Cứu Hộ Tình Nguyện Địa Phương
      </h3>
      <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '12px' }}>
        Các nhóm thiện nguyện hỗ trợ miễn phí người dân bị chết máy hoặc mắc kẹt trong mưa bão.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {teams.map((t) => (
          <div
            key={t.name}
            style={{
              padding: '10px 12px',
              backgroundColor: '#0c1630',
              borderRadius: '8px',
              border: '1px solid #1f3366',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#38bdf8' }}>{t.name}</span>
              <a
                href={`tel:${t.phone.replace(/\s/g, '')}`}
                style={{
                  fontSize: '0.75rem',
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                📞 {t.phone}
              </a>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Địa bàn: {t.area}</span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Hỗ trợ: {t.support}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
