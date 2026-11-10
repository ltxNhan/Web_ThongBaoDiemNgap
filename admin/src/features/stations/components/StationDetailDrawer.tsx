import React from 'react';
import { Station } from '../../../types';

interface StationDetailDrawerProps {
  station: Station | null;
  onClose: () => void;
}

export const StationDetailDrawer: React.FC<StationDetailDrawerProps> = ({ station, onClose }) => {
  if (!station) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '400px',
        height: '100vh',
        backgroundColor: '#0c1630',
        borderLeft: '1px solid #1c2b54',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.6)',
        padding: '1.5rem',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        overflowY: 'auto'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1c2b54', paddingBottom: '12px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc' }}>Chi Tiết Trạm Quan Trắc</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
      </div>

      <div>
        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#38bdf8' }}>{station.name}</div>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Mã định danh: {station.code}</span>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#070f24', borderRadius: '10px' }}>
        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Tọa độ GIS:</span>
        <div style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 600 }}>
          Vĩ độ: {station.lat.toFixed(5)} • Kinh độ: {station.lng.toFixed(5)}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div style={{ padding: '12px', backgroundColor: '#070f24', borderRadius: '10px' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Mực nước triều</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8' }}>{station.currentTideM} m</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: '#070f24', borderRadius: '10px' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Lượng mưa</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b' }}>{station.currentRainMm} mm</div>
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#070f24', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#94a3b8' }}>Tình trạng nguồn:</span>
          <b style={{ color: station.batteryPercent > 30 ? '#34d399' : '#ef4444' }}>{station.batteryPercent}% (Pin Solar)</b>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#94a3b8' }}>Cường độ sóng 4G/NB-IoT:</span>
          <b style={{ color: '#38bdf8' }}>{station.signalDbm} dBm (Tốt)</b>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#94a3b8' }}>Chu kỳ gửi tin:</span>
          <b>5 phút / lần</b>
        </div>
      </div>
    </div>
  );
};
