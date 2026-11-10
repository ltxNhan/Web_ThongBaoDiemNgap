import React, { useState } from 'react';
import { AdminLayout } from './components/layout/AdminLayout';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { StationManagementPage } from './features/stations/StationManagementPage';
import { ReportsModerationPage } from './features/reports-moderation/ReportsModerationPage';
import { ModelsManagementPage } from './features/forecasting-models/ModelsManagementPage';
import { ConfigurationPage } from './features/configuration/ConfigurationPage';
import { AuditLogsPage } from './features/audit-logs/AuditLogsPage';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('dashboard');

  return (
    <AdminLayout
      currentTab={currentTab}
      onSelectTab={setCurrentTab}
    >
      {currentTab === 'dashboard' && <DashboardPage onNavigateTab={setCurrentTab} />}
      {currentTab === 'stations' && <StationManagementPage />}
      {currentTab === 'reports' && <ReportsModerationPage />}
      {currentTab === 'models' && <ModelsManagementPage />}
      {currentTab === 'config' && <ConfigurationPage />}
      {currentTab === 'history' && <AuditLogsPage />}
    </AdminLayout>
  );
};

export default App;
