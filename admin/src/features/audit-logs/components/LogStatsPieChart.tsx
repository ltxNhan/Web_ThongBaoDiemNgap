import React from 'react';

export const LogStatsPieChart: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
        📊 Tỷ Lệ Sự Kiện Vận Hành (Hôm Nay)
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '10px 0' }}>
        {/* SVG Donut Chart */}
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', transform: 'rotate(-90deg)' }}>
          <circle cx="50" cy="50" r="38" fill="transparent" stroke="#10b981" strokeWidth="16" strokeDasharray="160 80" />
          <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f59e0b" strokeWidth="16" strokeDasharray="50 190" strokeDashoffset="-160" />
          <circle cx="50" cy="50" r="38" fill="transparent" stroke="#ef4444" strokeWidth="16" strokeDasharray="29 211" strokeDashoffset="-210" />
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
          <span style={{ color: '#10b981' }}>● Thông tin bình thường: 68%</span>
          <span style={{ color: '#f59e0b' }}>● Cảnh báo / Thay đổi cấu hình: 20%</span>
          <span style={{ color: '#ef4444' }}>● Lỗi trạm / Mất kết nối: 12%</span>
        </div>
      </div>
    </div>
  );
};
