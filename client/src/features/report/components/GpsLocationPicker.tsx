import React, { useState } from 'react';
import { useGeolocation } from '../../../hooks/useGeolocation';

interface GpsLocationPickerProps {
  onLocationSelected: (lat: number, lng: number, address: string) => void;
}

export const GpsLocationPicker: React.FC<GpsLocationPickerProps> = ({ onLocationSelected }) => {
  const { coords, loading, refreshLocation } = useGeolocation();
  const [manualAddress, setManualAddress] = useState('');

  const handleUseCurrentGps = () => {
    refreshLocation();
    if (coords) {
      onLocationSelected(coords.lat, coords.lng, 'Vị trí GPS hiện tại của tôi');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>
        Tọa Độ Hiện Trường Ngập
      </label>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          type="button"
          onClick={handleUseCurrentGps}
          disabled={loading}
          style={{
            padding: '10px 14px',
            backgroundColor: '#0369a1',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          📍 {loading ? 'Đang định vị...' : 'Lấy GPS Tự Động'}
        </button>

        <div style={{ flex: 1, padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '0.85rem', color: coords ? '#38bdf8' : '#94a3b8' }}>
          {coords ? `GPS: ${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}` : 'Chưa lấy được tọa độ'}
        </div>
      </div>

      <input
        type="text"
        placeholder="Hoặc nhập tên đường / số nhà cụ thể..."
        value={manualAddress}
        onChange={(e) => {
          setManualAddress(e.target.value);
          onLocationSelected(coords?.lat || 10.7769, coords?.lng || 106.7009, e.target.value);
        }}
        style={{
          width: '100%',
          padding: '10px 14px',
          backgroundColor: '#0f172a',
          border: '1px solid #1e293b',
          borderRadius: '8px',
          color: '#f8fafc',
          fontSize: '0.85rem',
          outline: 'none'
        }}
      />
    </div>
  );
};
