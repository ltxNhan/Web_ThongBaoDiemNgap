import React, { useState } from 'react';
import { Bell, Edit3, MessageSquare, MapPin, User, Lock, Eye, EyeOff } from 'lucide-react';
import { authStore } from '../../stores/authStore';
import { User as UserType } from '../../types';
import './AuthPage.css';

interface AuthPageProps {
  onLoginSuccess?: (user: UserType) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [currentUser, setCurrentUser] = useState<UserType | null>(authStore.getUser());

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

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier || !loginPassword) {
      alert('Vui lòng nhập số điện thoại hoặc email và mật khẩu.');
      return;
    }

    const loggedUser: UserType = {
      id: 'USR-888',
      phone: loginIdentifier,
      fullName: loginIdentifier.includes('@') ? loginIdentifier.split('@')[0] : 'Người Dùng TP.HCM',
      district: 'Quận 7',
      subscribedAlerts: true,
      token: 'jwt-auth-session-token'
    };

    authStore.setUser(loggedUser);
    setCurrentUser(loggedUser);
    if (onLoginSuccess) {
      onLoginSuccess(loggedUser);
    }
    alert('Đăng nhập thành công! Chào mừng bạn quay trở lại.');
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
    setCurrentUser(newUser);
    if (onLoginSuccess) {
      onLoginSuccess(newUser);
    }
    alert('Đăng ký tài khoản thành công!');
  };

  const handleSocialLogin = (platform: 'Zalo' | 'Google') => {
    const socialUser: UserType = {
      id: `USR-${platform.toUpperCase()}`,
      phone: '0901234567',
      fullName: `Người dùng ${platform}`,
      district: 'Quận 1',
      subscribedAlerts: true,
      token: `jwt-social-${platform.toLowerCase()}`
    };
    authStore.setUser(socialUser);
    setCurrentUser(socialUser);
    if (onLoginSuccess) {
      onLoginSuccess(socialUser);
    }
    alert(`Đăng nhập nhanh qua ${platform} thành công!`);
  };

  const handleLogout = () => {
    authStore.setUser(null);
    setCurrentUser(null);
  };

  return (
    <div className="auth-page-container">
      {/* Title */}
      <div className="auth-page-title-wrap">
        <h1 className="auth-page-heading">ĐĂNG NHẬP &amp; ĐĂNG KÝ</h1>
      </div>

      {currentUser ? (
        <div className="logged-in-profile-card">
          <h2 style={{ color: '#38bdf8', fontSize: '1.25rem', fontWeight: 800 }}>
            TÀI KHOẢN CỦA BẠN
          </h2>
          <div style={{ color: '#f1f5f9', fontSize: '0.95rem' }}>
            <strong>Họ tên:</strong> {currentUser.fullName}
          </div>
          <div style={{ color: '#f1f5f9', fontSize: '0.95rem' }}>
            <strong>Số điện thoại:</strong> {currentUser.phone}
          </div>
          <div style={{ color: '#f1f5f9', fontSize: '0.95rem' }}>
            <strong>Khu vực ưu tiên:</strong> {currentUser.district}
          </div>
          <div style={{ color: '#4ade80', fontSize: '0.85rem' }}>
            🟢 Đang kích hoạt nhận cảnh báo ngập qua Zalo/SMS
          </div>

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '6px',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: '12px',
              alignSelf: 'flex-start'
            }}
          >
            Đăng xuất tài khoản
          </button>
        </div>
      ) : (
        /* Main Dual-Column Card */
        <div className="auth-main-card">
          {/* Left Column: Benefits */}
          <div className="auth-left-benefit-col">
            <h2 className="benefit-main-heading">
              ĐỒNG HÀNH CÙNG CỘNG ĐỒNG<br />
              VƯỢT QUA MÙA MƯA BÃO
            </h2>

            <div className="benefit-sub-title">Các lợi ích khi có tài khoản</div>

            <div className="benefit-list-items">
              <div className="benefit-item-row">
                <div className="benefit-icon-badge">
                  <Bell size={18} />
                </div>
                <div className="benefit-item-text">
                  Nhận cảnh báo ngập tức thời theo vị trí của bạn.
                </div>
              </div>

              <div className="benefit-item-row">
                <div className="benefit-icon-badge">
                  <Edit3 size={18} />
                </div>
                <div className="benefit-item-text">
                  Gửi báo cáo ngập nhanh chóng &amp; chính xác.
                </div>
              </div>

              <div className="benefit-item-row">
                <div className="benefit-icon-badge">
                  <MessageSquare size={18} />
                </div>
                <div className="benefit-item-text">
                  Tham gia trò chuyện, hỗ trợ và kết nối cứu hộ.
                </div>
              </div>

              <div className="benefit-item-row">
                <div className="benefit-icon-badge">
                  <MapPin size={18} />
                </div>
                <div className="benefit-item-text">
                  Theo dõi và lưu các tuyến đường, khu vực quan tâm.
                </div>
              </div>
            </div>

            {/* Decorative waves SVG */}
            <svg
              className="benefit-bottom-waves"
              viewBox="0 0 400 80"
              preserveAspectRatio="none"
            >
              <path
                d="M0,40 C100,70 200,10 300,50 C350,70 380,30 400,45 L400,80 L0,80 Z"
                fill="#2dd4bf"
                fillOpacity="0.25"
              />
              <path
                d="M0,55 C120,25 220,75 320,35 C360,20 380,60 400,50 L400,80 L0,80 Z"
                fill="#0d9488"
                fillOpacity="0.35"
              />
            </svg>
          </div>

          {/* Right Column: Auth Form */}
          <div className="auth-right-form-col">
            {/* Tabs */}
            <div className="auth-form-tabs">
              <button
                className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                ĐĂNG NHẬP
              </button>
              <button
                className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => setActiveTab('register')}
              >
                ĐĂNG KÝ
              </button>
            </div>

            {activeTab === 'login' ? (
              /* Tab 1: Đăng nhập */
              <form className="auth-form-body" onSubmit={handleLoginSubmit}>
                {/* Số điện thoại hoặc Email */}
                <div className="auth-input-group">
                  <label className="auth-input-label">Số điện thoại hoặc Email</label>
                  <div className="auth-input-wrapper">
                    <User size={16} className="auth-field-icon" />
                    <input
                      type="text"
                      className="auth-input-control"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                    />
                  </div>
                </div>

                {/* Mật khẩu */}
                <div className="auth-input-group">
                  <label className="auth-input-label">Mật khẩu</label>
                  <div className="auth-input-wrapper">
                    <Lock size={16} className="auth-field-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="auth-input-control"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="auth-eye-icon-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Ghi nhớ & Quên mật khẩu */}
                <div className="auth-remember-row">
                  <label className="auth-remember-checkbox">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Ghi nhớ đăng nhập
                  </label>

                  <button
                    type="button"
                    className="auth-forgot-link"
                    onClick={() => alert('Vui lòng liên hệ quản trị viên hoặc kiểm tra email để đặt lại mật khẩu.')}
                  >
                    Quên mật khẩu?
                  </button>
                </div>

                {/* Nút Đăng nhập */}
                <button type="submit" className="auth-submit-btn">
                  ĐĂNG NHẬP NGAY
                </button>

                {/* Hoặc đăng nhập nhanh bằng */}
                <div className="auth-divider-line">
                  <span>Hoặc đăng nhập nhanh bằng</span>
                </div>

                {/* Social Login Buttons */}
                <div className="auth-social-buttons-grid">
                  <button
                    type="button"
                    className="social-btn-zalo"
                    onClick={() => handleSocialLogin('Zalo')}
                  >
                    <span style={{ fontWeight: 800, fontSize: '11px', background: '#ffffff', color: '#0068ff', padding: '1px 4px', borderRadius: '3px' }}>
                      Zalo
                    </span>
                    Đăng nhập bằng Zalo
                  </button>

                  <button
                    type="button"
                    className="social-btn-google"
                    onClick={() => handleSocialLogin('Google')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    Đăng nhập bằng Google
                  </button>
                </div>

                {/* Chuyển qua đăng ký */}
                <div className="auth-switch-prompt">
                  Bạn chưa có tài khoản?
                  <button
                    type="button"
                    className="auth-switch-action-btn"
                    onClick={() => setActiveTab('register')}
                  >
                    Đăng ký ngay
                  </button>
                </div>
              </form>
            ) : (
              /* Tab 2: Đăng ký */
              <form className="auth-form-body" onSubmit={handleRegisterSubmit}>
                <div className="auth-input-group">
                  <label className="auth-input-label">Họ và tên</label>
                  <div className="auth-input-wrapper">
                    <User size={16} className="auth-field-icon" />
                    <input
                      type="text"
                      className="auth-input-control"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label className="auth-input-label">Số điện thoại hoặc Email</label>
                  <div className="auth-input-wrapper">
                    <User size={16} className="auth-field-icon" />
                    <input
                      type="text"
                      className="auth-input-control"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label className="auth-input-label">Mật khẩu</label>
                  <div className="auth-input-wrapper">
                    <Lock size={16} className="auth-field-icon" />
                    <input
                      type="password"
                      className="auth-input-control"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label className="auth-input-label">Xác nhận mật khẩu</label>
                  <div className="auth-input-wrapper">
                    <Lock size={16} className="auth-field-icon" />
                    <input
                      type="password"
                      className="auth-input-control"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label className="auth-input-label">Khu vực sinh sống (để nhận cảnh báo chuẩn)</label>
                  <select
                    className="auth-input-control"
                    style={{ paddingLeft: '14px' }}
                    value={regDistrict}
                    onChange={(e) => setRegDistrict(e.target.value)}
                  >
                    <option value="Quận 7">Quận 7 (Đường Huỳnh Tấn Phát, Trần Xuân Soạn)</option>
                    <option value="Quận Bình Thạnh">Quận Bình Thạnh (Nguyễn Hữu Cảnh)</option>
                    <option value="TP. Thủ Đức">TP. Thủ Đức (Quốc Lộ 13, Thảo Điền)</option>
                    <option value="Huyện Nhà Bè">Huyện Nhà Bè (Lê Văn Lương)</option>
                    <option value="Quận 8">Quận 8</option>
                  </select>
                </div>

                <button type="submit" className="auth-submit-btn">
                  ĐĂNG KÝ NGAY
                </button>

                <div className="auth-switch-prompt">
                  Đã có tài khoản?
                  <button
                    type="button"
                    className="auth-switch-action-btn"
                    onClick={() => setActiveTab('login')}
                  >
                    Đăng nhập ngay
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
