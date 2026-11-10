import React, { useState } from 'react';

export const ModelControlPanel: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);

  const handleRunModel = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      alert('Đã chạy lại mô hình thủy văn thành công! Dữ liệu dự báo mới đã cập nhật xuống bản đồ.');
    }, 2500);
  };

  return (
    <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
          ⚡ Điều Khiển Tính Toán Mô Hình Thủ Công
        </h4>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
          Lần chạy tự động gần nhất: 8 phút trước • Tần suất quét: 15 phút/lần
        </span>
      </div>

      <button
        onClick={handleRunModel}
        disabled={isRunning}
        style={{
          padding: '10px 20px',
          backgroundColor: isRunning ? '#64748b' : '#0284c7',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 700,
          fontSize: '0.875rem',
          cursor: isRunning ? 'not-allowed' : 'pointer'
        }}
      >
        {isRunning ? '⏳ Đang Tính Toán Mô Phỏng...' : '▶️ Kích Hoạt Chạy Ngay'}
      </button>
    </div>
  );
};
