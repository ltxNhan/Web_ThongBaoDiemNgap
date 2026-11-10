import React from 'react';
import { FloodHistoryLookup } from './components/FloodHistoryLookup';
import { ReportPdfDownloads } from './components/ReportPdfDownloads';
import { FloodLevelGuidance } from './components/FloodLevelGuidance';

export const DataInfoPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.5rem' }}>
          Dữ Liệu Thống Kê & Cẩm Nang Nghiệp Vụ
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
          Tra cứu dữ liệu lịch sử ngập theo năm, hướng dẫn quy chuẩn phân cấp cảnh báo và tải về các tài liệu nghiên cứu.
        </p>
      </div>

      <FloodHistoryLookup />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '1.5rem' }}>
        <FloodLevelGuidance />
        <ReportPdfDownloads />
      </div>
    </div>
  );
};
