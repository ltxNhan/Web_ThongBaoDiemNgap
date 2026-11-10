import React from 'react';

interface AdminHeaderProps {
  title: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title }) => {
  return (
    <header
      style={{
        height: '70px',
        backgroundColor: '#0a142e',
        borderBottom: '1px solid #16244d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 90
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>{title}</h2>
        <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#f87171', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
          🚨 BÁO ĐỘNG 3 TOÀN TP
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', backgroundColor: '#070f24', border: '1px solid #1e3160', borderRadius: '8px', fontSize: '0.8rem', color: '#94a3b8' }}>
          <span>🕒 Giờ hệ thống:</span>
          <b style={{ color: '#38bdf8' }}>{new Date().toLocaleTimeString('vi-VN')}</b>
        </div>

        <button
          onClick={() => alert('Thông báo hệ thống: 1 trạm quan trắc mất tín hiệu!')}
          style={{
            position: 'relative',
            backgroundColor: '#16244d',
            border: '1px solid #233766',
            color: '#f8fafc',
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem'
          }}
        >
          🔔
          <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '10px', height: '10px', backgroundColor: '#ef4444', borderRadius: '50%' }} />
        </button>

        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noreferrer"
          style={{
            padding: '8px 14px',
            backgroundColor: '#0284c7',
            color: '#ffffff',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 700,
            textDecoration: 'none'
          }}
        >
          🌐 Mở Cổng Dân Cư →
        </a>
      </div>
    </header>
  );
};
