import React, { useState } from 'react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

export const SmsZaloSubscribe: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Quận 7');
  const [channel, setChannel] = useState<'zalo' | 'sms'>('zalo');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
  };

  return (
    <div className="glass" style={{ borderRadius: '16px', padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
        📲 Đăng Ký Nhận Tin Cảnh Báo Ngập Qua Zalo / SMS
      </h3>
      <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
        Hệ thống tự động gửi tin nhắn trước 2 giờ khi mực nước triều cường hoặc mưa đạt ngưỡng nguy cơ tại địa bàn bạn sinh sống.
      </p>

      {successMsg ? (
        <div style={{ padding: '14px', backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: '8px', color: '#34d399', fontSize: '0.9rem', textAlign: 'center' }}>
          ✅ Đăng ký thành công! Bạn sẽ nhận được bản tin cảnh báo ngập {district} qua {channel.toUpperCase()}.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input
            label="Số Điện Thoại Nhận Tin"
            placeholder="0912345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
              Chọn Địa Bàn Cần Theo Dõi
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '8px',
                color: '#f8fafc',
                fontSize: '0.95rem'
              }}
            >
              <option value="Quận 7">Quận 7 (Khu vực Huỳnh Tấn Phát, Trần Xuân Soạn)</option>
              <option value="Bình Thạnh">Bình Thạnh (Bán đảo Thanh Đa, Nguyễn Hữu Cảnh)</option>
              <option value="TP. Thủ Đức">TP. Thủ Đức (Chợ Thủ Đức, Hiệp Bình Chánh)</option>
              <option value="Nhà Bè">Huyện Nhà Bè (Lê Văn Lương, Phước Kiển)</option>
              <option value="Quận 4">Quận 4 (Đoàn Văn Bơ, Bến Vân Đồn)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
              Kênh Tiếp Nhận Ưu Tiên
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#ffffff', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="channel"
                  checked={channel === 'zalo'}
                  onChange={() => setChannel('zalo')}
                />
                <span>Zalo Official Account (Miễn phí)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#ffffff', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="channel"
                  checked={channel === 'sms'}
                  onChange={() => setChannel('sms')}
                />
                <span>Tin nhắn SMS Khẩn cấp</span>
              </label>
            </div>
          </div>

          <Button type="submit" variant="primary" style={{ marginTop: '8px' }}>
            Đăng Ký Nhận Thông Báo
          </Button>
        </form>
      )}
    </div>
  );
};
