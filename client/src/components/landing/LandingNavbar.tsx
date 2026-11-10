import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { BRAND_COLORS } from '../../styles/tokens';

interface LandingNavbarProps {
  onOpenMap: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onOpenAuth?: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  onOpenMap,
  onNavigateSection,
  onOpenAuth
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Bản đồ', id: 'map', isAction: true },
    { label: 'Tính năng', id: 'features' },
    { label: 'Cách hoạt động', id: 'how-it-works' },
    { label: 'Cơ quan', id: 'enterprise' }
  ];

  const handleLinkClick = (link: typeof navLinks[0]) => {
    if (link.isAction) {
      onOpenMap();
    } else if (onNavigateSection) {
      onNavigateSection(link.id);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        height: '64px',
        backgroundColor: '#F7F6F2',
        borderBottom: `1px solid ${BRAND_COLORS.border}`,
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          whiteSpace: 'nowrap'
        }}
      >
        {/* TRÁI: LOGO + TÊN FLOODSAFE */}
        <div
          onClick={onOpenMap}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          {/* Logo hình học tối giản: Vòng tròn tọa độ xanh nước đậm */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="#0B1F3A" strokeWidth="2" />
            <path d="M12 7V17M7 12H17" stroke="#0B5FA5" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="12" r="2.5" fill="#0B5FA5" />
          </svg>
          <span
            style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: BRAND_COLORS.ink
            }}
          >
            FloodSafe
          </span>
        </div>

        {/* GIỮA: MENU ĐIỀU HƯỚNG TỐI ĐA 4 MỤC */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '32px'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '4px 0',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: BRAND_COLORS.muted,
                cursor: 'pointer',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = BRAND_COLORS.ink)}
              onMouseLeave={(e) => (e.currentTarget.style.color = BRAND_COLORS.muted)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* PHẢI: NÚT CHỮ ĐĂNG NHẬP + NÚT ĐẶC MỞ BẢN ĐỒ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={onOpenAuth}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '8px 12px',
              color: BRAND_COLORS.muted,
              fontSize: '0.88rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = BRAND_COLORS.ink)}
            onMouseLeave={(e) => (e.currentTarget.style.color = BRAND_COLORS.muted)}
          >
            Đăng nhập
          </button>

          <button
            onClick={onOpenMap}
            style={{
              height: '40px',
              padding: '0 16px',
              borderRadius: '8px',
              backgroundColor: BRAND_COLORS.navy,
              color: '#FFFFFF',
              border: 'none',
              fontSize: '0.88rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: 'var(--shadow-subtle)',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#162C4E')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND_COLORS.navy)}
          >
            <span>Mở bản đồ</span>
            <ArrowUpRight size={15} />
          </button>

          {/* Nút menu trên màn hình di động */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              padding: '6px',
              color: BRAND_COLORS.ink,
              cursor: 'pointer'
            }}
            className="mobile-nav-toggle"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Nếu xem trên điện thoại) */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#F7F6F2',
            padding: '24px',
            borderTop: `1px solid ${BRAND_COLORS.border}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            zIndex: 999
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link)}
              style={{
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                fontSize: '1rem',
                fontWeight: 500,
                color: BRAND_COLORS.ink,
                padding: '8px 0',
                cursor: 'pointer',
                borderBottom: `1px solid ${BRAND_COLORS.border}`
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onOpenMap();
              setIsMobileMenuOpen(false);
            }}
            style={{
              marginTop: '12px',
              height: '44px',
              borderRadius: '8px',
              backgroundColor: BRAND_COLORS.navy,
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 500,
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            Mở bản đồ ngập
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
        }
        @media (max-width: 767px) {
          .mobile-nav-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};
