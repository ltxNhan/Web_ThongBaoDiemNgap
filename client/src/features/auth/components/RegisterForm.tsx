import React, { useState } from 'react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

interface RegisterFormProps {
  onRegisterSuccess: (user: any) => void;
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Quận 7');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegisterSuccess({
      fullName,
      phone,
      district,
      subscribedAlerts: true
    });
  };

  return (
    <div className="glass" style={{ borderRadius: '16px', padding: '2rem', maxWidth: '440px', width: '100%', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>Đăng Ký Tài Khoản Công Dân</h2>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
          Đăng ký để cá nhân hóa thông báo cảnh báo triều & ngập nước
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <Input
          label="Họ và Tên"
          placeholder="Nguyễn Văn A"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <Input
          label="Số Điện Thoại"
          placeholder="0912345678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
            Quận / Huyện Thường Trú (Để ưu tiên tin cảnh báo)
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
            <option value="Quận 7">Quận 7</option>
            <option value="Bình Thạnh">Bình Thạnh</option>
            <option value="TP. Thủ Đức">TP. Thủ Đức</option>
            <option value="Nhà Bè">Nhà Bè</option>
            <option value="Quận 1">Quận 1</option>
            <option value="Quận 4">Quận 4</option>
          </select>
        </div>

        <Button type="submit" variant="primary" size="lg" fullWidth style={{ marginTop: '6px' }}>
          Tạo Tài Khoản
        </Button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #1c2c58', fontSize: '0.85rem', color: '#94a3b8' }}>
        Đã có tài khoản?{' '}
        <span onClick={onSwitchToLogin} style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: 700 }}>
          Đăng nhập ngay
        </span>
      </div>
    </div>
  );
};
