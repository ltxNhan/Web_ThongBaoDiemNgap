import React from 'react';

interface AdminSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentTab, onSelectTab }) => {
  const menuItems = [
    { key: 'dashboard', label: 'Tổng Quan Bản Đồ & Thống Kê', icon: '📊' },
    { key: 'moderation', label: 'Duyệt Báo Cáo Ngập Dân Gửi', icon: '🛡️' },
    { key: 'dispatch', label: 'Điều Phối Cứu Hộ 114', icon: '🚨' },
    { key: 'configuration', label: 'Cấu Hình Hệ Thống', icon: '⚙️' },
    { key: 'audit-logs', label: 'Nhật Ký Vận Hành & An Ninh', icon: '📜' }
  ];

  return (
    <aside
      style={{
        width: '280px',
        backgroundColor: '#070f24',
        borderRight: '1px solid #16244d',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      {/* Brand Header */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #142142', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#ffffff', fontWeight: 800 }}>
          ⚡
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#f8fafc', letterSpacing: '-0.02em' }}>
            FLOOD COMMAND
          </div>
          <div style={{ fontSize: '0.7rem', color: '#38bdf8', textTransform: 'uppercase', fontWeight: 600 }}>
            Trung Tâm Tác Chiến PCTT
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, overflowY: 'auto' }}>
        {menuItems.map((item) => {
          const isActive = currentTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onSelectTab(item.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: isActive ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
                backgroundColor: isActive ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                color: isActive ? '#38bdf8' : '#94a3b8',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Staff footer profile */}
      <div style={{ padding: '1rem', borderTop: '1px solid #142142', backgroundColor: '#050a18', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#38bdf8', fontSize: '0.85rem' }}>
          CB
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Cán bộ Trực ban</div>
          <div style={{ fontSize: '0.7rem', color: '#10b981' }}>● Ca trực A - Trực tuyến</div>
        </div>
      </div>
    </aside>
  );
};
