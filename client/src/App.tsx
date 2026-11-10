import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FloatingSOS } from './components/common/FloatingSOS';
import { RequestRescueModal } from './features/emergency/components/RequestRescueModal';

import { HomePage } from './features/home/HomePage';
import { FloodMapPage } from './features/map/FloodMapPage';
import { ForecastPage } from './features/forecast/ForecastPage';
import { EmergencyPage } from './features/emergency/EmergencyPage';
import { CommunityPage } from './features/community/CommunityPage';
import { DataInfoPage } from './features/data-info/DataInfoPage';
import { AuthPage } from './features/auth/AuthPage';

import { useFloodMap } from './hooks/useFloodMap';
import { floodApi } from './services/floodApi';
import { reportApi } from './services/reportApi';
import { FloodAlert } from './types';

import { CitizenReportPage } from './features/report/CitizenReportPage';
import { RewardsPage } from './features/rewards/RewardsPage';
import { SocialPage } from './features/social/SocialPage';
import { AuthModal } from './features/auth/AuthModal';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('home');
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [isRescueModalOpen, setIsRescueModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { floodPoints, stations } = useFloodMap();
  const [alerts, setAlerts] = useState<FloodAlert[]>([]);

  React.useEffect(() => {
    floodApi.getAlerts().then(setAlerts).catch(() => {});
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#070e22' }}>
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        lang={lang}
        onToggleLang={() => setLang(lang === 'vi' ? 'en' : 'vi')}
        onSearch={() => setCurrentTab('map')}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {currentTab === 'home' && (
          <HomePage
            onNavigateTab={setCurrentTab}
            floodPoints={floodPoints}
            stations={stations}
            alerts={alerts}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onRequestRescue={() => setIsRescueModalOpen(true)}
          />
        )}
        {currentTab === 'map' && (
          <FloodMapPage
            floodPoints={floodPoints}
            stations={stations}
            onNavigateTab={setCurrentTab}
            onRequestRescue={() => setIsRescueModalOpen(true)}
          />
        )}
        {currentTab === 'forecast' && (
          <ForecastPage alerts={alerts} />
        )}
        {currentTab === 'report' && <CitizenReportPage />}
        {currentTab === 'community' && (
          <CommunityPage onNavigateTab={setCurrentTab} />
        )}
        {currentTab === 'social' && (
          <SocialPage onNavigateTab={setCurrentTab} />
        )}
        {currentTab === 'rewards' && (
          <RewardsPage onNavigateTab={setCurrentTab} />
        )}
        {currentTab === 'emergency' && (
          <EmergencyPage onNavigateTab={setCurrentTab} />
        )}
        {currentTab === 'data-info' && <DataInfoPage />}
        {currentTab === 'auth' && <AuthPage />}
      </main>

      {/* Footer on non-map screens */}
      {currentTab === 'home' && <Footer />}

      {/* Floating SOS and Quick Report */}
      <FloatingSOS
        showQuickReport={currentTab === 'forecast'}
        onQuickReport={() => setCurrentTab('community')}
        onRequestRescue={() => setIsRescueModalOpen(true)}
      />

      <RequestRescueModal
        isOpen={isRescueModalOpen}
        onClose={() => setIsRescueModalOpen(false)}
        onSubmitRescue={(data) => reportApi.requestRescue(data)}
      />

      {/* Floating Animated Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default App;
