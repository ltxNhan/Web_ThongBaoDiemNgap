import React from 'react';

interface LayerControlProps {
  showFloodPoints: boolean;
  setShowFloodPoints: (val: boolean) => void;
  showPolygons: boolean;
  setShowPolygons: (val: boolean) => void;
  showStations: boolean;
  setShowStations: (val: boolean) => void;
  mapType: 'osm' | 'satellite' | 'dark';
  setMapType: (type: 'osm' | 'satellite' | 'dark') => void;
}

export const LayerControl: React.FC<LayerControlProps> = ({
  showFloodPoints,
  setShowFloodPoints,
  showPolygons,
  setShowPolygons,
  showStations,
  setShowStations,
  mapType,
  setMapType
}) => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(11, 19, 41, 0.92)',
        backdropFilter: 'blur(10px)',
        border: '1px solid #1e3160',
        borderRadius: '12px',
        padding: '12px 16px',
        color: '#f8fafc',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        fontSize: '0.825rem'
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: '8px', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}>
        🗺️ LỚP BẢN ĐỒ & GIS
      </div>

      {/* Layer Toggles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={showFloodPoints}
            onChange={(e) => setShowFloodPoints(e.target.checked)}
          />
          <span>Điểm ngập thời gian thực</span>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={showPolygons}
            onChange={(e) => setShowPolygons(e.target.checked)}
          />
          <span>Vùng trũng rủi ro (Polygon)</span>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={showStations}
            onChange={(e) => setShowStations(e.target.checked)}
          />
          <span>Mốc thủy văn & Điểm triều</span>
        </label>
      </div>

      {/* Map Tile Select */}
      <div style={{ borderTop: '1px solid #1e293b', paddingTop: '8px' }}>
        <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
          Loại bản đồ nền:
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['dark', 'osm', 'satellite'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setMapType(t)}
              style={{
                flex: 1,
                padding: '4px 6px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                border: mapType === t ? '1px solid #38bdf8' : '1px solid #334155',
                backgroundColor: mapType === t ? 'rgba(56, 189, 248, 0.2)' : '#1e293b',
                color: mapType === t ? '#38bdf8' : '#94a3b8',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {t === 'dark' ? 'Đêm' : t === 'osm' ? 'Đường' : 'Vệ tinh'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
