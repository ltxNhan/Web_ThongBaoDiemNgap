import React, { useState } from 'react';
import { User } from '../../../types';
import { Button } from '../../../components/ui/Button';

interface UserSubscriptionsProps {
  user: User;
  onLogout: () => void;
}

export const UserSubscriptions: React.FC<UserSubscriptionsProps> = ({ user, onLogout }) => {
  const [channels, setChannels] = useState({
    zalo: true,
    sms: false,
    browserPush: true
  });

  const [districts, setDistricts] = useState<string[]>([user.district, 'Bình Thạnh']);

  const toggleDistrict = (d: string) => {
    if (districts.includes(d)) {
      setDistricts(districts.filter((x) => x !== d));
    } else {
      setDistricts([...districts, d]);
    }
  };

  return (
    <div className="glass" style={{ borderRadius: '16px', padding: '2rem', maxWidth: '580px', width: '100%', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #1e2c58', paddingBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>{user.fullName}</h2>
          <span style={{ fontSize: '0.85rem', color: '#38bdf8' }}>📞 {user.phone}</span>
        </div>
        <Button variant="outline" size="sm" onClick={onLogout}>
          Đăng Xuất
        </Button>
      </div>

      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
        Khu Vực Nhận Thông Báo Cảnh Báo
      </h3>
      <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '12px' }}>
        Bạn sẽ nhận được cảnh báo sớm trước 2 giờ khi các khu vực đã chọn có nguy cơ ngập do triều hoặc mưa:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '1.5rem' }}>
        {['Quận 1', 'Quận 4', 'Quận 7', 'Bình Thạnh', 'TP. Thủ Đức', 'Nhà Bè'].map((d) => (
          <label
            key={d}
            style={{
              padding: '8px 12px',
              backgroundColor: districts.includes(d) ? 'rgba(56, 189, 248, 0.2)' : '#0c1630',
              border: districts.includes(d) ? '1px solid #38bdf8' : '1px solid #1e2c58',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
              color: districts.includes(d) ? '#38bdf8' : '#94a3b8',
              cursor: 'pointer'
            }}
          >
            <input
              type="checkbox"
              checked={districts.includes(d)}
              onChange={() => toggleDistrict(d)}
            />
            <span>{d}</span>
          </label>
        ))}
      </div>

      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
        Kênh Tiếp Nhận
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.5rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#cbd5e1' }}>
          <input
            type="checkbox"
            checked={channels.zalo}
            onChange={(e) => setChannels({ ...channels, zalo: e.target.checked })}
          />
          <span>Thông báo qua Zalo ZNS</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#cbd5e1' }}>
          <input
            type="checkbox"
            checked={channels.browserPush}
            onChange={(e) => setChannels({ ...channels, browserPush: e.target.checked })}
          />
          <span>Thông báo đẩy trên trình duyệt web (Push Notification)</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#cbd5e1' }}>
          <input
            type="checkbox"
            checked={channels.sms}
            onChange={(e) => setChannels({ ...channels, sms: e.target.checked })}
          />
          <span>Tin nhắn SMS khẩn cấp (khi có báo động cấp 3)</span>
        </label>
      </div>

      <Button variant="primary" fullWidth onClick={() => alert('Cập nhật cài đặt nhận tin thành công!')}>
        Lưu Tùy Chọn Cảnh Báo
      </Button>
    </div>
  );
};
