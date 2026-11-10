import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  Bell, 
  Edit3, 
  MessageSquare, 
  MapPin, 
  Sparkles 
} from 'lucide-react';
import { authStore } from '../../stores/authStore';
import { User as UserType } from '../../types';
import './AuthModal.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
  onSuccess?: (user: UserType) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'login',
  onSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);

  // Login form states
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Register form states
  const [regFullName, setRegFullName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regDistrict, setRegDistrict] = useState('Quận 7');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync initial tab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier || !loginPassword) {
      alert('Vui lòng nhập số điện thoại hoặc email và mật khẩu.');
      return;
    }

    const loggedUser: UserType = {
      id: 'USR-888',
      phone: loginIdentifier,
      fullName: loginIdentifier.includes('@') ? loginIdentifier.split('@')[0] : 'Nguyễn Văn Minh',
      district: 'Quận 7',
      subscribedAlerts: true,
      token: 'jwt-auth-session-token'
    };

    authStore.setUser(loggedUser);
    if (onSuccess) {
      onSuccess(loggedUser);
    }
    showToast(`Chào mừng ${loggedUser.fullName} đã đăng nhập thành công!`);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regFullName || !regPhone || !regPassword) {
      alert('Vui lòng điền đầy đủ các trường thông tin.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      alert('Mật khẩu xác nhận không khớp.');
      return;
    }

    const newUser: UserType = {
      id: `USR-${Date.now()}`,
      phone: regPhone,
      fullName: regFullName,
      district: regDistrict,
      subscribedAlerts: true,
      token: 'jwt-auth-new-token'
    };

    authStore.setUser(newUser);
    if (onSuccess) {
      onSuccess(newUser);
    }
    showToast(`Đăng ký tài khoản thành công! Chào mừng ${newUser.fullName}.`);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleSocialLogin = (platform: 'Zalo' | 'Google') => {
    const socialUser: UserType = {
      id: `USR-${platform.toUpperCase()}`,
      phone: '0901234567',
      fullName: `Cư dân ${platform}`,
      district: 'Quận 1',
      subscribedAlerts: true,
      token: `jwt-social-${platform.toLowerCase()}`
    };
    authStore.setUser(socialUser);
    if (onSuccess) {
      onSuccess(socialUser);
    }
    showToast(`Đăng nhập nhanh qua ${platform} thành công!`);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '24px',
          zIndex: 3000,
          backgroundColor: '#0284c7',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 700
        }}>
          <Sparkles size={18} />
          {toastMessage}
        </div>
      )}

      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className="auth-modal-close-btn" 
          onClick={onClose}
          title="Đóng cửa sổ"
        >
          <X size={18} />
        </button>

        {/* Left Benefit Column */}
        <div className="auth-modal-left-benefit">
          <div>
            <h2>ĐỒNG HÀNH CÙNG CỘNG ĐỒNG VƯỢT QUA MÙA MƯA BÃO</h2>
            <p className="subtitle" style={{ marginTop: '6px' }}>Các lợi ích khi có tài khoản:</p>
          </div>

          <div className="benefit-list">
            <div className="benefit-item">
              <div className="benefit-icon-box">
                <Bell size={18} />
              </div>
              <div className="benefit-text">
                Nhận cảnh báo ngập tức thời theo vị trí của bạn.
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon-box">
                <Edit3 size={18} />
              </div>
              <div className="benefit-text">
                Gửi báo cáo ngập nhanh chóng &amp; chính xác, tích điểm đổi thưởng.
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon-box">
                <MessageSquare size={18} />
              </div>
              <div className="benefit-text">
                Tham gia trò chuyện, hỗ trợ và kết nối cứu hộ khẩn cấp 114.
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon-box">
                <MapPin size={18} />
              </div>
              <div className="benefit-text">
                Theo dõi và lưu các tuyến đường, khu vực thường xuyên ngập.
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="auth-modal-right-form">
          {/* Tabs Header */}
          <div className="auth-tabs-header">
            <button
              type="button"
              className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              ĐĂNG NHẬP
            </button>
            <button
              type="button"
              className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              ĐĂNG KÝ
            </button>
          </div>

          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="auth-form-group">
                <label className="auth-form-label">Số điện thoại hoặc Email</label>
                <div className="auth-input-wrapper">
                  <User size={16} className="auth-input-icon" />
                  <input
                    type="text"
                    className="auth-input-field"
                    placeholder="Nhập SĐT hoặc email"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label className="auth-form-label">Mật khẩu</label>
                <div className="auth-input-wrapper">
                  <Lock size={16} className="auth-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="auth-input-field"
                    placeholder="Nhập mật khẩu"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="auth-options-row">
                <label className="auth-remember-checkbox">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Ghi nhớ đăng nhập</span>
                </label>
                <span 
                  className="auth-forgot-link"
                  onClick={() => alert('Vui lòng liên hệ quản trị viên hoặc sử dụng số điện thoại đã đăng ký để đặt lại mật khẩu.')}
                >
                  Quên mật khẩu?
                </span>
              </div>

              <button type="submit" className="auth-submit-btn">
                ĐĂNG NHẬP NGAY
              </button>

              <div className="auth-divider-wrap">
                <div className="auth-divider-line" />
                <span>Hoặc đăng nhập nhanh bằng</span>
                <div className="auth-divider-line" />
              </div>

              <div className="auth-social-row">
                <button
                  type="button"
                  className="auth-social-btn auth-social-zalo"
                  onClick={() => handleSocialLogin('Zalo')}
                >
                  <span style={{ fontWeight: 800 }}>Zalo</span> Đăng nhập
                </button>
                <button
                  type="button"
                  className="auth-social-btn auth-social-google"
                  onClick={() => handleSocialLogin('Google')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  Google
                </button>
              </div>

              <div className="auth-switch-prompt">
                Bạn chưa có tài khoản?{' '}
                <button
                  type="button"
                  className="auth-switch-btn"
                  onClick={() => setActiveTab('register')}
                >
                  Đăng ký ngay
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="auth-form-group">
                <label className="auth-form-label">Họ và tên</label>
                <div className="auth-input-wrapper">
                  <User size={16} className="auth-input-icon" />
                  <input
                    type="text"
                    className="auth-input-field"
                    placeholder="Nguyễn Văn A"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label className="auth-form-label">Số điện thoại</label>
                <div className="auth-input-wrapper">
                  <input
                    type="tel"
                    className="auth-input-field"
                    placeholder="0912345678"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="auth-form-group">
                  <label className="auth-form-label">Mật khẩu</label>
                  <input
                    type="password"
                    className="auth-input-field"
                    placeholder="Mật khẩu"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="auth-form-group">
                  <label className="auth-form-label">Xác nhận</label>
                  <input
                    type="password"
                    className="auth-input-field"
                    placeholder="Nhập lại"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label className="auth-form-label">Khu vực sinh sống ưu tiên</label>
                <select
                  value={regDistrict}
                  onChange={(e) => setRegDistrict(e.target.value)}
                  className="auth-input-field"
                >
                  <option value="Quận 1">Quận 1</option>
                  <option value="Quận 7">Quận 7</option>
                  <option value="Bình Thạnh">Bình Thạnh</option>
                  <option value="Gò Vấp">Gò Vấp</option>
                  <option value="Thủ Đức">TP. Thủ Đức</option>
                  <option value="Nhà Bè">Huyện Nhà Bè</option>
                  <option value="Bình Chánh">Huyện Bình Chánh</option>
                </select>
              </div>

              <button type="submit" className="auth-submit-btn">
                TẠO TÀI KHOẢN
              </button>

              <div className="auth-switch-prompt">
                Đã có tài khoản?{' '}
                <button
                  type="button"
                  className="auth-switch-btn"
                  onClick={() => setActiveTab('login')}
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
