import React, { useState } from 'react';

export const CronFrequencyConfig: React.FC = () => {
  const [stationCron, setStationCron] = useState(5);
  const [aiCron, setAiCron] = useState(15);
  const [healthCron, setHealthCron] = useState(30);

  return (
    <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
        ⏱️ Tần Suất Tiến Trình Chạy Ngầm (Cron Frequency)
      </h3>
      <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
        Cấu hình khoảng thời gian tự động đồng bộ dữ liệu cảm biến và chạy mô hình tính toán.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>
            Tần suất quét dữ liệu trạm IoT:
          </label>
          <select
            value={stationCron}
            onChange={(e) => setStationCron(parseInt(e.target.value))}
            style={{ width: '100%', padding: '8px 12px', backgroundColor: '#070f24', border: '1px solid #1e3a8a', borderRadius: '8px', color: '#ffffff' }}
          >
            <option value={1}>1 phút / lần (Khẩn cấp)</option>
            <option value={5}>5 phút / lần (Tiêu chuẩn)</option>
            <option value={10}>10 phút / lần</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>
            Tần suất chạy mô hình AI/Thủy lực:
          </label>
          <select
            value={aiCron}
            onChange={(e) => setAiCron(parseInt(e.target.value))}
            style={{ width: '100%', padding: '8px 12px', backgroundColor: '#070f24', border: '1px solid #1e3a8a', borderRadius: '8px', color: '#ffffff' }}
          >
            <option value={10}>10 phút / lần</option>
            <option value={15}>15 phút / lần (Khuyên dùng)</option>
            <option value={30}>30 phút / lần</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>
            Quét kiểm tra trạm mất tín hiệu:
          </label>
          <select
            value={healthCron}
            onChange={(e) => setHealthCron(parseInt(e.target.value))}
            style={{ width: '100%', padding: '8px 12px', backgroundColor: '#070f24', border: '1px solid #1e3a8a', borderRadius: '8px', color: '#ffffff' }}
          >
            <option value={15}>Sau 15 phút không nhận tin</option>
            <option value={30}>Sau 30 phút không nhận tin</option>
            <option value={60}>Sau 60 phút không nhận tin</option>
          </select>
        </div>
      </div>
    </div>
  );
};
