import React from 'react';
import { Station } from '../../../types';

interface StationMarkersProps {
  stations: Station[];
  onSelectStation: (st: Station) => void;
}

export const StationMarkers: React.FC<StationMarkersProps> = ({ stations, onSelectStation }) => {
  return (
    <>
      {stations.map((st, i) => {
        const positions = [
          { top: '30%', left: '48%' },
          { top: '78%', left: '55%' },
          { top: '22%', left: '72%' },
          { top: '44%', left: '42%' }
        ];
        const pos = positions[i] || { top: '50%', left: '50%' };

        return (
          <div
            key={st.id}
            onClick={() => onSelectStation(st)}
            style={{
              position: 'absolute',
              top: pos.top,
              left: pos.left,
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              zIndex: 30,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#0284c7',
                border: '2px solid #ffffff',
                boxShadow: '0 0 14px rgba(2, 132, 199, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem'
              }}
            >
              📡
            </div>
            <div
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                color: '#38bdf8',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '0.7rem',
                fontWeight: 700,
                marginTop: '4px',
                border: '1px solid #1e3a8a',
                whiteSpace: 'nowrap'
              }}
            >
              {st.name} ({st.currentTideM}m / {st.currentRainMm}mm)
            </div>
          </div>
        );
      })}
    </>
  );
};
