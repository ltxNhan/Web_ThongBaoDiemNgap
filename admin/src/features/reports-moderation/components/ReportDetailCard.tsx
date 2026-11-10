import React from 'react';
import { ModerationReport } from '../../../types';

interface ReportDetailCardProps {
  report: ModerationReport | null;
}

export const ReportDetailCard: React.FC<ReportDetailCardProps> = ({ report }) => {
  if (!report) return <div>Vui lòng chọn báo cáo để đối soát</div>;

  return (
    <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>{report.street}</h3>
          <span style={{ fontSize: '0.85rem', color: '#38bdf8' }}>{report.district}</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ef4444' }}>{report.depthEstimate} cm</div>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Ước lượng độ sâu</span>
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#070f24', borderRadius: '10px' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Thông tin người báo cáo:</span>
        <div style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 600 }}>
          {report.userName} — 📞 {report.userPhone}
        </div>
        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Tọa độ: {report.lat.toFixed(5)}, {report.lng.toFixed(5)}</span>
      </div>

      <div>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Mô tả chi tiết từ hiện trường:</span>
        <p style={{ margin: 0, padding: '12px', backgroundColor: '#070f24', borderRadius: '10px', color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5 }}>
          "{report.description}"
        </p>
      </div>

      {/* Simulated or Actual Image */}
      <div>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Hình ảnh hiện trường do người dân gửi:</span>
        <div style={{ height: '200px', backgroundColor: '#070f24', borderRadius: '10px', border: '1px solid #1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '0.85rem' }}>
          📸 [Ảnh chụp hiện trường mực nước mấp mé yên xe máy tại {report.street}]
        </div>
      </div>
    </div>
  );
};
