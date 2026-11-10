import React, { useState } from 'react';
import {
  LayoutGrid,
  Radio,
  FileText,
  TrendingUp,
  Settings,
  History,
  LogOut,
  Search,
  Bell,
  ChevronDown
} from 'lucide-react';
import './AdminLayout.css';

interface AdminLayoutProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  children
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { key: 'dashboard', label: 'Tổng quan', icon: LayoutGrid },
    { key: 'reports', label: 'Duyệt báo cáo dân', icon: FileText },
    { key: 'config', label: 'Quản lý cấu hình', icon: Settings },
    { key: 'history', label: 'Lịch sử & Nhật ký', icon: History }
  ];

  return (
    <div className="admin-app-wrapper">
      {/* 1. Top Header */}
      <header className="admin-top-header">
        <div className="header-brand-left">
          <div className="brand-icon-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2.5C12 2.5 6 10 6 14.5C6 17.8 8.7 20.5 12 20.5C15.3 20.5 18 17.8 18 14.5C18 10 12 2.5 12 2.5Z"
                fill="#ffffff"
              />
              <path
                d="M8 15C10 16.5 11.5 14.5 13.5 16"
                stroke="#0284c7"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="brand-text-block">
            <span className="brand-text-line1">HỆ THỐNG GIÁM SÁT &amp;</span>
            <span className="brand-text-line2">CẢNH BÁO NGẬP LỤT ĐÔ THỊ</span>
          </div>

          {/* Vietnamese Flag */}
          <div className="vn-flag-badge" title="Việt Nam">
            <span className="vn-flag-star">★</span>
          </div>
        </div>

        {/* Header Right */}
        <div className="header-actions-right">
          <div className="header-search-box">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            className="header-icon-action-btn"
            title="Thông báo mới"
            onClick={() => alert('Thông báo: Mực nước trạm Phú An đạt 1.65m (Vượt BĐ3)!')}
          >
            <Bell size={18} />
            <span className="notif-counter-bubble">1</span>
          </button>

          <button
            className="header-icon-action-btn"
            title="Cài đặt hệ thống"
            onClick={() => onSelectTab('config')}
          >
            <Settings size={18} />
          </button>

          <div
            className="user-profile-chip"
            onClick={() => alert('Thông tin: Tài khoản Quản trị viên cấp cao (Admin)')}
          >
            <span className="user-name-label">Quản trị viên</span>
            <div className="user-avatar-circle">AD</div>
            <ChevronDown size={14} color="#94a3b8" />
          </div>
        </div>
      </header>

      {/* 2. Body: Left Sidebar + Main Viewport */}
      <div className="admin-body-flex">
        {/* Left Sidebar */}
        <aside className="admin-left-sidebar">
          <nav className="sidebar-nav-list">
            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = currentTab === item.key;
              return (
                <button
                  key={item.key}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectTab(item.key)}
                >
                  <IconComp className="sidebar-nav-icon" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="sidebar-footer-wrap">
            <button
              className="sidebar-logout-btn"
              onClick={() => alert('Đã đăng xuất khỏi tài khoản Quản trị viên.')}
            >
              <LogOut size={16} />
              <span>Đăng xuất</span>
            </button>
          </div>
        </aside>

        {/* Main Viewport */}
        <main className="admin-main-viewport">{children}</main>
      </div>
    </div>
  );
};
