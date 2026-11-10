import React from 'react';
import { LandingHero } from '../../components/landing/LandingHero';
import { WeatherTideSection } from './components/WeatherTideSection';
import { CommunityReportsFeedSection } from './components/CommunityReportsFeedSection';
import { EmergencyDirectorySection } from './components/EmergencyDirectorySection';
import { FloodPoint, FloodAlert, Station } from '../../types';

interface HomePageProps {
  onNavigateTab: (tab: string) => void;
  floodPoints?: FloodPoint[];
  stations?: Station[];
  alerts?: FloodAlert[];
  onOpenAuthModal?: () => void;
  onRequestRescue?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateTab,
  floodPoints,
  stations,
  onRequestRescue
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        backgroundColor: '#070e22',
        color: '#f1f5f9',
        overflowX: 'hidden'
      }}
    >
      {/* 1. HERO SECTION WITH MAP PREVIEW & 3 CORE STATS */}
      <LandingHero
        floodPoints={floodPoints}
        stations={stations}
        onOpenMap={(presetQuery) => {
          onNavigateTab('map');
        }}
        onExploreHowItWorks={() => {
          const el = document.getElementById('forecast-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onRequestRescue={onRequestRescue}
      />

      {/* 2. DỰ BÁO THỜI TIẾT & TRIỀU CƯỜNG (WEATHER & TIDE FORECAST) */}
      <div style={{ backgroundColor: '#060c1e', borderBottom: '1px solid #14203d' }}>
        <WeatherTideSection />
      </div>

      {/* 3. BÁO CÁO NGẬP LỤT TỪ CỘNG ĐỒNG (COMMUNITY REPORTS FEED) */}
      <div style={{ backgroundColor: '#070e22', borderBottom: '1px solid #14203d' }}>
        <CommunityReportsFeedSection
          onOpenReport={() => onNavigateTab('report')}
        />
      </div>

      {/* 4. DANH BẠ ỨNG PHÓ KHẨN CẤP (EMERGENCY DIRECTORY & EVACUATION) */}
      <div style={{ backgroundColor: '#060c1e' }}>
        <EmergencyDirectorySection
          onOpenMapPreset={(preset) => onNavigateTab('map')}
          onRequestRescue={onRequestRescue}
        />
      </div>
    </div>
  );
};
