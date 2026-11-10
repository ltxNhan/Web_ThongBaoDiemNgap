import React from 'react';
import { Home, LayoutGrid, Users, Settings, LogOut, LifeBuoy, Gift, MessageSquare } from 'lucide-react';
import './LeftSidebar.css';

interface LeftSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ currentTab, onSelectTab }) => {
  return (
    <aside className="left-sidebar" aria-label="Quick Navigation">
      <div className="left-sidebar-top">
        <button
          className={`sidebar-icon-btn ${currentTab === 'home' ? 'active' : ''}`}
          onClick={() => onSelectTab('home')}
          title="Trang chủ"
        >
          <Home size={20} />
        </button>

        <button
          className={`sidebar-icon-btn ${currentTab === 'map' ? 'active' : ''}`}
          onClick={() => onSelectTab('map')}
          title="Bản đồ ngập"
        >
          <LayoutGrid size={20} />
        </button>

        <button
          className={`sidebar-icon-btn ${currentTab === 'community' ? 'active' : ''}`}
          onClick={() => onSelectTab('community')}
          title="Báo cáo cộng đồng"
        >
          <Users size={20} />
        </button>

        <button
          className={`sidebar-icon-btn ${currentTab === 'social' ? 'active' : ''}`}
          onClick={() => onSelectTab('social')}
          title="Bạn bè & Trò chuyện"
          style={{ color: currentTab === 'social' ? '#38bdf8' : '#34d399' }}
        >
          <MessageSquare size={20} />
        </button>

        <button
          className={`sidebar-icon-btn ${currentTab === 'rewards' ? 'active' : ''}`}
          onClick={() => onSelectTab('rewards')}
          title="Tích điểm & Đổi thưởng"
          style={{ color: currentTab === 'rewards' ? '#38bdf8' : '#fbbf24' }}
        >
          <Gift size={20} />
        </button>

        <button
          className={`sidebar-icon-btn ${currentTab === 'emergency' ? 'active' : ''}`}
          onClick={() => onSelectTab('emergency')}
          title="Ứng phó khẩn cấp"
        >
          <LifeBuoy size={20} />
        </button>

        <button
          className="sidebar-icon-btn"
          onClick={() => alert('Cài đặt hệ thống')}
          title="Cài đặt"
        >
          <Settings size={20} />
        </button>
      </div>

      <div className="left-sidebar-bottom">
        <button
          className="sidebar-icon-btn"
          onClick={() => onSelectTab('auth')}
          title="Đăng xuất / Tài khoản"
        >
          <LogOut size={20} />
        </button>
      </div>
    </aside>
  );
};
