import React, { useState } from 'react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

interface LoginFormProps {
  onLoginSuccess: (phone: string, token: string) => void;
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setOtpSent(true);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(phone, 'jwt-token-demo');
  };

  return (
    <div className="glass" style={{ borderRadius: '16px', padding: '2rem', maxWidth: '440px', width: '100%', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <img src="/assets/logo.svg" alt="Logo" style={{ width: '48px', height: '48px', marginBottom: '8px' }} />
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>Đăng Nhập Cổng Cảnh Báo</h2>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
          Nhận tin báo ngập cá nhân hóa theo địa bàn của bạn
        </p>
      </div>

      {!otpSent ? (
        <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Input
            label="Số Điện Thoại / Email"
            placeholder="0912345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" size="lg" fullWidth>
            Tiếp Tục Với Số Điện Thoại
          </Button>

          <div style={{ position: 'relative', textAlign: 'center', margin: '8px 0' }}>
            <span style={{ backgroundColor: '#111d40', padding: '0 10px', fontSize: '0.75rem', color: '#64748b' }}>
              HOẶC ĐĂNG NHẬP NHANH BẰNG
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              type="button"
              onClick={() => onLoginSuccess('0987654321', 'zalo-token')}
              style={{
                padding: '10px',
                backgroundColor: '#0068ff',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              💬 Zalo Login
            </button>
            <button
              type="button"
              onClick={() => onLoginSuccess('0911223344', 'google-token')}
              style={{
                padding: '10px',
                backgroundColor: '#ffffff',
                color: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              🌐 Google
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', textAlign: 'center' }}>
            Mã OTP 6 số đã được gửi tới số <b>{phone}</b>
          </div>

          <Input
            label="Nhập Mã Xác Thực OTP (Mặc định: 123456)"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" size="lg" fullWidth>
            Xác Nhận Đăng Nhập
          </Button>

          <button
            type="button"
            onClick={() => setOtpSent(false)}
            style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.8rem', cursor: 'pointer' }}
          >
            ← Đổi số điện thoại khác
          </button>
        </form>
      )}

      <div style={{ textAlign: 'center', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #1c2c58', fontSize: '0.85rem', color: '#94a3b8' }}>
        Chưa có tài khoản?{' '}
        <span onClick={onSwitchToRegister} style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: 700 }}>
          Đăng ký ngay
        </span>
      </div>
    </div>
  );
};
