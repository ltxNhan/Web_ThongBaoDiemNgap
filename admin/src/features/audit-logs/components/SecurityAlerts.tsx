import React from 'react';

export const SecurityAlerts: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
        🛡️ Cảnh Báo An Ninh & Chống Spam
      </h3>

      <div style={{ padding: '10px 12px', backgroundColor: '#3b0d0d', border: '1px solid #ef4444', borderRadius: '8px', color: '#fca5a5', fontSize: '0.8rem' }}>
        ⚠️ Phát hiện 15 requests gửi báo ngập liên tiếp từ IP 14.161.42.18 trong 30 giây. Hệ thống đã tự động kích hoạt Rate Limiter chặn 15 phút.
      </div>

      <div style={{ padding: '10px 12px', backgroundColor: '#070f24', border: '1px solid #1e3a8a', borderRadius: '8px', color: '#cbd5e1', fontSize: '0.8rem' }}>
        🔒 Chứng chỉ bảo mật SSL TLS 1.3 và chữ ký số GIS Hub hợp lệ.
      </div>
    </div>
  );
};
