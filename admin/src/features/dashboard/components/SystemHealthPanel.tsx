import React from 'react';

export const SystemHealthPanel: React.FC = () => {
  const issues = [
    { title: 'Trạm Kênh Tân Hóa Lò Gốm', desc: 'Mất tín hiệu 45 phút, mức pin thấp (24%)', severity: 'error', action: 'Điều kỹ thuật viên' },
    { title: 'Mô hình thủy văn AI (Hydro-Sim)', desc: 'Thời gian trễ 4 phút do tải GPU tính toán mô phỏng', severity: 'warning', action: 'Kiểm tra tài nguyên' },
    { title: 'Cổng gửi SMS khẩn cấp (Viettel SMS Gateway)', desc: 'Độ trễ gửi bản tin < 1.2s, quota còn 85.000 tin', severity: 'ok', action: 'Bình thường' }
  ];

  return (
    <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', padding: '1.25rem' }}>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', marginBottom: '12px' }}>
        🩺 Sức Khỏe Hạ Tầng & Cảnh Báo Thiết Bị
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {issues.map((item) => (
          <div
            key={item.title}
            style={{
              padding: '10px 14px',
              backgroundColor: '#070f24',
              borderRadius: '10px',
              borderLeft: `4px solid ${item.severity === 'error' ? '#ef4444' : item.severity === 'warning' ? '#f59e0b' : '#10b981'}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#ffffff' }}>{item.title}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{item.desc}</div>
            </div>

            <button
              onClick={() => alert(`Thực hiện: ${item.action}`)}
              style={{
                backgroundColor: item.severity === 'error' ? '#ef4444' : '#1e3a8a',
                color: '#ffffff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
