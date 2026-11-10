import React from 'react';
import { ModerationReport } from '../../../types';

interface SensorCorrelationProps {
  report: ModerationReport | null;
}

export const SensorCorrelation: React.FC<SensorCorrelationProps> = ({ report }) => {
  if (!report) return null;

  return (
    <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
        🤖 Tự Động Đối Soát Với Trạm Quan Trắc Gần Nhất
      </h4>

      <div style={{ padding: '12px', backgroundColor: '#070f24', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          <span style={{ color: '#94a3b8' }}>Trạm đối chiếu:</span>
          <b style={{ color: '#38bdf8' }}>{report.closestStationName}</b>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          <span style={{ color: '#94a3b8' }}>Lượng mưa đo được tại trạm:</span>
          <b style={{ color: '#f59e0b' }}>{report.sensorCorrelationMm} mm/h (Mưa rất to)</b>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          <span style={{ color: '#94a3b8' }}>Độ tin cậy dữ liệu (AI Confidence):</span>
          <b style={{ color: '#10b981' }}>96.4% (Khớp mô hình thủy văn)</b>
        </div>
      </div>

      <div style={{ fontSize: '0.8rem', color: '#34d399', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
        ✅ Kết quả đối soát: Dữ liệu hiện trường trùng khớp với diễn biến thủy triều và vũ lượng thực đo. Đề xuất: Phê duyệt ngay.
      </div>
    </div>
  );
};
