import React, { useState, useEffect } from 'react';
import { LiveEventLogsTable } from './components/LiveEventLogsTable';
import { SecurityAlerts } from './components/SecurityAlerts';
import { LogStatsPieChart } from './components/LogStatsPieChart';
import { ExportCsvPdfButton } from './components/ExportCsvPdfButton';
import { logsApi } from '../../services/logsApi';
import { AuditLog } from '../../types';

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    logsApi.getLogs().then(setLogs);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
            Lịch Sử Hoạt Động & Nhật Ký Vận Hành
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Theo dõi tất cả thao tác của cán bộ trực ban, thay đổi cấu hình ngưỡng và sự kiện an ninh.
          </p>
        </div>

        <ExportCsvPdfButton />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <SecurityAlerts />
        <LogStatsPieChart />
      </div>

      <LiveEventLogsTable logs={logs} />
    </div>
  );
};
