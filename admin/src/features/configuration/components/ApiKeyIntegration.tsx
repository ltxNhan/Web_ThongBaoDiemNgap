import React, { useState } from 'react';

export const ApiKeyIntegration: React.FC = () => {
  const [openWeatherKey, setOpenWeatherKey] = useState('owm_live_9a8b7c6d5e4f3a2b1c');
  const [gisTileKey, setGisTileKey] = useState('mapbox_pk_live_8834927164917234');
  const [zaloSecret, setZaloSecret] = useState('zns_secret_x84j92k3l01');

  return (
    <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
        🔑 Khóa Kết Nối API Dịch Vụ Bên Ngoài
      </h3>
      <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
        Quản lý khóa kết nối các cổng thời tiết, bản đồ số và nhà mạng gửi tin:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>
            API Khí Tượng Vệ Tinh (OpenWeather / Windy Radar)
          </label>
          <input
            type="password"
            value={openWeatherKey}
            onChange={(e) => setOpenWeatherKey(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', backgroundColor: '#070f24', border: '1px solid #1e3a8a', borderRadius: '8px', color: '#38bdf8', fontFamily: 'monospace' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>
            Khóa Bản Đồ Nền GIS (Mapbox / Vietbando / OpenStreetMap)
          </label>
          <input
            type="password"
            value={gisTileKey}
            onChange={(e) => setGisTileKey(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', backgroundColor: '#070f24', border: '1px solid #1e3a8a', borderRadius: '8px', color: '#38bdf8', fontFamily: 'monospace' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>
            Zalo ZNS App Secret & Access Token
          </label>
          <input
            type="password"
            value={zaloSecret}
            onChange={(e) => setZaloSecret(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', backgroundColor: '#070f24', border: '1px solid #1e3a8a', borderRadius: '8px', color: '#38bdf8', fontFamily: 'monospace' }}
          />
        </div>

        <button
          onClick={() => alert('Đã cập nhật mã bí mật API thành công!')}
          style={{ alignSelf: 'flex-start', padding: '8px 18px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', marginTop: '4px' }}
        >
          Cập Nhật Khóa API
        </button>
      </div>
    </div>
  );
};
