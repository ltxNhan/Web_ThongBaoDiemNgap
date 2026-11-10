import React from 'react';

interface ModerationActionsProps {
  onApprove: () => void;
  onReject: () => void;
}

export const ModerationActions: React.FC<ModerationActionsProps> = ({ onApprove, onReject }) => {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <button
        onClick={onApprove}
        style={{
          flex: 1,
          padding: '12px 18px',
          backgroundColor: '#10b981',
          color: '#ffffff',
          border: 'none',
          borderRadius: '10px',
          fontWeight: 700,
          fontSize: '0.95rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
        }}
      >
        ✅ Phê Duyệt & Đẩy Lên Bản Đồ Công Khai
      </button>

      <button
        onClick={onReject}
        style={{
          padding: '12px 20px',
          backgroundColor: '#ef4444',
          color: '#ffffff',
          border: 'none',
          borderRadius: '10px',
          fontWeight: 700,
          fontSize: '0.95rem',
          cursor: 'pointer'
        }}
      >
        ❌ Từ Chối Báo Cáo
      </button>
    </div>
  );
};
