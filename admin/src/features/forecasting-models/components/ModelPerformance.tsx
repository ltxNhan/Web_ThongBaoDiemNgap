import React from 'react';

export const ModelPerformance: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
        📊 Đánh Giá Hiệu Năng Mô Hình Thủy Lực (AI & Mike Urban)
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        <div style={{ padding: '10px', backgroundColor: '#070f24', borderRadius: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Độ chính xác (Accuracy):</span>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10b981' }}>94.8%</div>
        </div>
        <div style={{ padding: '10px', backgroundColor: '#070f24', borderRadius: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Sai số tuyệt đối (MAE):</span>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#38bdf8' }}>± 3.2 cm</div>
        </div>
        <div style={{ padding: '10px', backgroundColor: '#070f24', borderRadius: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Tốc độ hội tụ (Loss):</span>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f59e0b' }}>0.0124</div>
        </div>
      </div>

      <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
        Mô hình tự động học tăng cường dựa trên sai số thực tế giữa cảm biến trạm và dự báo thủy văn.
      </div>
    </div>
  );
};
