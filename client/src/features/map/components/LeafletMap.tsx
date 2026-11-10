import React from 'react';
import { FloodPoint, Station } from '../../../types';
import { FloodPolygonLayer } from './FloodPolygonLayer';
import { StationMarkers } from './StationMarkers';

interface LeafletMapProps {
  floodPoints: FloodPoint[];
  stations: Station[];
  showFloodPoints: boolean;
  showPolygons: boolean;
  showStations: boolean;
  mapType: 'osm' | 'satellite' | 'dark';
  onSelectPoint: (pt: FloodPoint) => void;
  onSelectStation: (st: Station) => void;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  floodPoints,
  stations,
  showFloodPoints,
  showPolygons,
  showStations,
  mapType,
  onSelectPoint,
  onSelectStation
}) => {
  const getBgStyle = () => {
    if (mapType === 'satellite') {
      return {
        backgroundColor: '#0c1a2e',
        backgroundImage: 'radial-gradient(#152e4d 2px, transparent 2px)',
        backgroundSize: '32px 32px'
      };
    }
    if (mapType === 'osm') {
      return {
        backgroundColor: '#0d1d3a',
        backgroundImage: 'linear-gradient(#15264c 1px, transparent 1px), linear-gradient(90deg, #15264c 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      };
    }
    return {
      backgroundColor: '#060c1d',
      backgroundImage: 'radial-gradient(#102142 1.5px, transparent 1.5px)',
      backgroundSize: '24px 24px'
    };
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        ...getBgStyle()
      }}
    >
      {/* Rivers and water system vector */}
      <svg
        viewBox="0 0 1000 700"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        {/* Saigon River simulation */}
        <path
          d="M 120,0 C 260,180 180,320 380,420 C 520,490 620,530 800,700"
          fill="none"
          stroke="rgba(56, 189, 248, 0.2)"
          strokeWidth="60"
          strokeLinecap="round"
        />
        <path
          d="M 380,420 C 320,520 280,600 240,700"
          fill="none"
          stroke="rgba(56, 189, 248, 0.15)"
          strokeWidth="35"
        />
        {/* Canals */}
        <path
          d="M 220,160 L 520,240"
          fill="none"
          stroke="rgba(56, 189, 248, 0.12)"
          strokeWidth="18"
        />
      </svg>

      {/* Polygon layer */}
      {showPolygons && <FloodPolygonLayer />}

      {/* Station markers */}
      {showStations && (
        <StationMarkers stations={stations} onSelectStation={onSelectStation} />
      )}

      {/* Flood Points */}
      {showFloodPoints &&
        floodPoints.map((pt, i) => {
          const positions = [
            { top: '35%', left: '42%' },
            { top: '65%', left: '58%' },
            { top: '25%', left: '75%' },
            { top: '48%', left: '32%' },
            { top: '78%', left: '46%' }
          ];
          const pos = positions[i] || { top: '50%', left: '50%' };
          const iconSrc =
            pt.level === 'critical'
              ? '/icons/marker-red.svg'
              : pt.level === 'danger'
              ? '/icons/marker-orange.svg'
              : '/icons/marker-yellow.svg';

          return (
            <div
              key={pt.id}
              onClick={() => onSelectPoint(pt)}
              style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                transform: 'translate(-50%, -100%)',
                cursor: 'pointer',
                zIndex: 40,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translate(-50%, -110%) scale(1.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translate(-50%, -100%) scale(1)')}
            >
              <img src={iconSrc} alt="Marker" style={{ width: '36px', height: '36px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))' }} />
              <div
                style={{
                  backgroundColor: 'rgba(11, 19, 41, 0.95)',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: '1px solid #233876',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                }}
              >
                {pt.street} • <span style={{ color: '#f87171' }}>{pt.depthCm}cm</span>
              </div>
            </div>
          );
        })}
    </div>
  );
};
