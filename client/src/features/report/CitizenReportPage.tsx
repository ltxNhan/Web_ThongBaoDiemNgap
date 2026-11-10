import React, { useState, useEffect } from 'react';
import { ReportForm } from './components/ReportForm';
import { RecentReportsFeed } from './components/RecentReportsFeed';
import { reportApi } from '../../services/reportApi';
import { CitizenReport } from '../../types';

export const CitizenReportPage: React.FC = () => {
  const [reports, setReports] = useState<CitizenReport[]>([]);

  useEffect(() => {
    reportApi.getRecentReports().then(setReports);
  }, []);

  const handleNewReport = (data: Partial<CitizenReport>) => {
    reportApi.submitReport(data).then(() => {
      reportApi.getRecentReports().then(setReports);
    });
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.5rem' }}>
          Báo Cáo Điểm Ngập Cộng Đồng (Crowdsourcing)
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
          Đóng góp thông tin hiện trường theo thời gian thực giúp cộng đồng phòng tránh các vùng nước ngập nguy hiểm.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
        <ReportForm onSubmit={handleNewReport} />
        <RecentReportsFeed reports={reports} />
      </div>
    </div>
  );
};
