import React from 'react';
import { FloodAlert } from '../../../types';

interface AlertTickerProps {
  alerts: FloodAlert[];
}

export const AlertTicker: React.FC<AlertTickerProps> = ({ alerts }) => {
  const currentAlert = alerts[0] || {
    level: 3,
    title: 'CẢNH BÁO: Triều cường rằm tháng 9 âm lịch kết hợp mưa lớn, đỉnh triều 1.75m tại Phú An lúc 17h30',
    affectedDistricts: ['Bình Thạnh', 'Quận 7', 'Thủ Đức', 'Nhà Bè']
  };

  return (
    <div
      style={{
        backgroundColor: '#7f1d1d',
        borderBottom: '1px solid #ef4444',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        overflow: 'hidden',
        color: '#fef2f2'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: '#ef4444',
          color: '#ffffff',
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          flexShrink: 0
        }}
      >
        <span>⚡ KHẨN CẤP</span>
      </div>

      <div className="ticker-wrap" style={{ flex: 1 }}>
        <div className="ticker-move" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
          {currentAlert.title} — Khu vực ảnh hưởng: {currentAlert.affectedDistricts.join(', ')} — Liên hệ cứu hộ khẩn cấp: 114
        </div>
      </div>
    </div>
  );
};
