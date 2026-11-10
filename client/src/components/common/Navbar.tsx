import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Gift, Award, Sparkles, User, LogOut, MessageSquare } from 'lucide-react';
import { rewardsStore, RANKS_CONFIG } from '../../stores/rewardsStore';
import { authStore } from '../../stores/authStore';
import { User as UserType } from '../../types';
import './Navbar.css';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  lang: 'vi' | 'en';
  onToggleLang: () => void;
  onSearch?: (query: string) => void;
  onOpenAuthModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  lang,
  onToggleLang,
  onSearch,
  onOpenAuthModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [profile, setProfile] = useState(rewardsStore.getProfile());
  const [currentUser, setCurrentUser] = useState<UserType | null>(authStore.getUser());

  useEffect(() => {
    const unsubRewards = rewardsStore.subscribe(() => {
      setProfile({ ...rewardsStore.getProfile() });
    });
    const unsubAuth = authStore.subscribe(() => {
      setCurrentUser(authStore.getUser());
    });
    return () => {
      unsubRewards();
      unsubAuth();
    };
  }, []);

  const rankInfo = RANKS_CONFIG[profile.rank];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="app-header">
      {/* Top Bar */}
      <div className="navbar-top">
        {/* Brand */}
        <div className="brand-container" onClick={() => onSelectTab('home')}>
          <div className="brand-logo-icon">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 4C18 4 9 15.2 9 21.6C9 26.57 13.03 30.6 18 30.6C22.97 30.6 27 26.57 27 21.6C27 15.2 18 4 18 4Z"
                fill="#38bdf8"
              />
              <path
                d="M11 23C13.5 25 15.5 22 18 24C20.5 26 22.5 23 25 24.5"
                stroke="#0284c7"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M12.5 26.5C14.5 28 16.5 26 18 27.5C19.5 29 21.5 27 23.5 28"
                stroke="#0284c7"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="brand-title-wrap">
            <span className="brand-title-top">HỆ THỐNG CẢNH BÁO &amp; DỰ BÁO</span>
            <span className="brand-title-sub">NGẬP LỤT THÀNH PHỐ</span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="navbar-top-right">
          <form className="header-search-bar" onSubmit={handleSearchSubmit}>
            <Search size={16} className="header-search-icon" />
            <input
              type="text"
              className="header-search-input"
              placeholder="Nhập địa chỉ, quận huyện..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <button className="lang-switch-btn" onClick={onToggleLang} title="Chuyển ngôn ngữ">
            {lang === 'vi' ? 'VI/EN' : 'EN/VI'}
          </button>

          <button
            className="notif-bell-btn"
            title="Thông báo cảnh báo mới"
            onClick={() => alert('Thông báo mới: Triều cường đang dâng cao tại Quận 7 và Nhà Bè.')}
          >
            <Bell size={20} />
            <span className="notif-badge-dot" />
          </button>

          {/* Rewards Points & Rank Pill */}
          <button
            className={`rewards-nav-pill ${currentTab === 'rewards' ? 'active' : ''}`}
            onClick={() => onSelectTab('rewards')}
            title="Ví điểm & Đổi thưởng"
            style={{
              background: currentTab === 'rewards' 
                ? 'linear-gradient(135deg, #0284c7, #0369a1)' 
                : 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(2, 132, 199, 0.15))',
              border: currentTab === 'rewards' ? '1px solid #38bdf8' : '1px solid rgba(245, 158, 11, 0.4)',
              borderRadius: '999px',
              padding: '6px 14px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            <span style={{ fontSize: '1rem' }}>🪙</span>
            <span style={{ color: '#fbbf24', fontWeight: 800 }}>{profile.points}</span>
            <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>|</span>
            <span style={{ fontSize: '0.8rem', color: rankInfo.color }}>{rankInfo.badge} {rankInfo.name}</span>
          </button>

          {currentUser ? (
            <div style={{ position: 'relative' }}>
              <button
                className="auth-nav-btn active"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  padding: '7px 14px'
                }}
              >
                <User size={15} />
                <span>{currentUser.fullName}</span>
                <ChevronDown size={14} />
              </button>

              {userDropdownOpen && (
                <div 
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '200px',
                    backgroundColor: '#0c1630',
                    border: '1px solid #1e2c58',
                    borderRadius: '12px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
                    padding: '8px',
                    zIndex: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: '0.8rem', color: '#94a3b8' }}>
                    <div style={{ color: '#ffffff', fontWeight: 700 }}>{currentUser.fullName}</div>
                    <div>{currentUser.phone}</div>
                    <div style={{ color: '#38bdf8', fontSize: '0.75rem', marginTop: '2px' }}>{currentUser.district}</div>
                  </div>
                  <button
                    onClick={() => {
                      onSelectTab('auth');
                      setUserDropdownOpen(false);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#cbd5e1',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <User size={14} /> Xem thông tin cá nhân
                  </button>
                  <button
                    onClick={() => {
                      authStore.setUser(null);
                      setUserDropdownOpen(false);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#f87171',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <LogOut size={14} /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="auth-nav-btn"
              onClick={() => {
                if (onOpenAuthModal) {
                  onOpenAuthModal();
                } else {
                  onSelectTab('auth');
                }
              }}
              title="Đăng nhập tài khoản"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>

      {/* Nav Menu Tabs Row */}
      <nav className="navbar-menu-row">
        <div className="navbar-tabs-list">
          <button
            className={`nav-tab-item ${currentTab === 'home' ? 'active' : ''}`}
            onClick={() => onSelectTab('home')}
          >
            Trang chủ
          </button>

          <button
            className={`nav-tab-item ${currentTab === 'map' ? 'active' : ''}`}
            onClick={() => onSelectTab('map')}
          >
            Bản đồ ngập
          </button>

          <div
            className="nav-dropdown-wrapper"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className={`nav-tab-item ${currentTab === 'forecast' ? 'active' : ''}`}
              onClick={() => onSelectTab('forecast')}
            >
              Dự báo &amp; Cảnh báo
              <ChevronDown size={14} className="dropdown-arrow" />
            </button>

            {dropdownOpen && (
              <div className="nav-dropdown-menu">
                <div
                  className="nav-dropdown-menu-item"
                  onClick={() => {
                    onSelectTab('forecast');
                    setDropdownOpen(false);
                  }}
                >
                  Dự báo triều cường &amp; Lượng mưa
                </div>
                <div
                  className="nav-dropdown-menu-item"
                  onClick={() => {
                    onSelectTab('forecast');
                    setDropdownOpen(false);
                  }}
                >
                  Cảnh báo diện rộng thời gian thực
                </div>
                <div
                  className="nav-dropdown-menu-item"
                  onClick={() => {
                    onSelectTab('forecast');
                    setDropdownOpen(false);
                  }}
                >
                  Đăng ký nhận tin nhắn SMS/Zalo
                </div>
              </div>
            )}
          </div>

          <button
            className={`nav-tab-item ${currentTab === 'community' ? 'active' : ''}`}
            onClick={() => onSelectTab('community')}
          >
            Báo cáo cộng đồng
          </button>

          <button
            className={`nav-tab-item ${currentTab === 'social' ? 'active' : ''}`}
            onClick={() => onSelectTab('social')}
            style={{ position: 'relative' }}
          >
            <MessageSquare size={15} style={{ display: 'inline', marginRight: '5px', verticalAlign: '-2px' }} />
            Bạn bè &amp; Chat
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '-4px',
              backgroundColor: '#38bdf8',
              color: '#000',
              fontSize: '0.62rem',
              fontWeight: 800,
              padding: '1px 5px',
              borderRadius: '999px',
              lineHeight: 1
            }}>3</span>
          </button>

          <button
            className={`nav-tab-item ${currentTab === 'rewards' ? 'active' : ''}`}
            onClick={() => onSelectTab('rewards')}
            style={{ position: 'relative' }}
          >
            <Gift size={15} style={{ display: 'inline', marginRight: '5px', verticalAlign: '-2px' }} />
            Tích điểm &amp; Đổi thưởng
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '-4px',
              backgroundColor: '#f59e0b',
              color: '#000',
              fontSize: '0.62rem',
              fontWeight: 800,
              padding: '1px 5px',
              borderRadius: '999px',
              lineHeight: 1
            }}>Hot</span>
          </button>

          <button
            className={`nav-tab-item ${currentTab === 'emergency' ? 'active' : ''}`}
            onClick={() => onSelectTab('emergency')}
          >
            Ứng phó khẩn cấp
          </button>

          <button
            className={`nav-tab-item ${currentTab === 'data-info' ? 'active' : ''}`}
            onClick={() => onSelectTab('data-info')}
          >
            Dữ liệu &amp; Thông tin
          </button>
        </div>
      </nav>
    </header>
  );
};
