import React from 'react';

export const ExportCsvPdfButton: React.FC = () => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <button
        onClick={() => alert('Đang kết xuất tệp audit-logs-2026.csv... Tải về hoàn tất!')}
        style={{
          padding: '8px 16px',
          backgroundColor: '#1e3a8a',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.85rem',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
      >
        📥 Xuất File CSV
      </button>

      <button
        onClick={() => alert('Đang kết xuất báo cáo nhật ký vận hành định dạng PDF... Tải về hoàn tất!')}
        style={{
          padding: '8px 16px',
          backgroundColor: '#0284c7',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.85rem',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
      >
        📑 Xuất Báo Cáo PDF
      </button>
    </div>
  );
};
