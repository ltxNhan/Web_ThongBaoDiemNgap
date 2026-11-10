import React, { useState } from 'react';

export const NotificationTriggers: React.FC = () => {
  const [telegram, setTelegram] = useState(true);
  const [zns, setZns] = useState(true);
  const [sms, setSms] = useState(false);

  return (
    <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
        📢 Kích Hoạt Tự Động Gửi Tin Khẩn Cấp (Triggers)
      </h3>
      <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
        Tự động phát tin nhắn đa kênh tới cán bộ chỉ huy và người dân khu vực ảnh hưởng khi mực nước chạm Báo Động 3:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f8fafc', fontSize: '0.85rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={telegram} onChange={(e) => setTelegram(e.target.checked)} />
          <span>Bắn tin cảnh báo ngay vào nhóm Telegram Ban Chỉ Huy PCTT TP</span>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f8fafc', fontSize: '0.85rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={zns} onChange={(e) => setZns(e.target.checked)} />
          <span>Gửi Zalo ZNS tới người dân đăng ký theo địa bàn phường/quận có nguy cơ</span>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f8fafc', fontSize: '0.85rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={sms} onChange={(e) => setSms(e.target.checked)} />
          <span>Kích hoạt tin nhắn SMS Brandname khẩn cấp diện rộng (Emergency Broadcast)</span>
        </label>
      </div>
    </div>
  );
};
