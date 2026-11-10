import React from 'react';
import { FloodPoint } from '../../../types';

interface MiniFloodMapProps {
  points: FloodPoint[];
  onOpenFullMap: () => void;
}

export const MiniFloodMap: React.FC<MiniFloodMapProps> = ({ points, onOpenFullMap }) => {
  return (
    <div
      className="glass"
      style={{
        borderRadius: '16px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
            🗺️ Bản Đồ Điểm Nóng Ngập Lụt
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Hiển thị {points.length} điểm ngập đang theo dõi trực tiếp
          </span>
        </div>
        <button
          onClick={onOpenFullMap}
          style={{
            background: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            color: '#38bdf8',
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Xem Toàn Màn Hình →
        </button>
      </div>

      {/* Stylized Interactive Mini Map Canvas */}
      <div
        style={{
          height: '280px',
          backgroundColor: '#0a142e',
          borderRadius: '12px',
          border: '1px solid #1e3160',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      >
        {/* River simulation curve */}
        <svg
          viewBox="0 0 500 280"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <path
            d="M 50,0 Q 180,120 220,160 T 480,260"
            fill="none"
            stroke="rgba(56, 189, 248, 0.25)"
            strokeWidth="28"
          />
        </svg>

        {/* Hotspots */}
        {points.slice(0, 5).map((pt, i) => {
          const positions = [
            { top: '35%', left: '42%' },
            { top: '65%', left: '60%' },
            { top: '25%', left: '75%' },
            { top: '50%', left: '25%' },
            { top: '75%', left: '45%' }
          ];
          const pos = positions[i] || { top: '50%', left: '50%' };
          const color = pt.level === 'critical' ? '#ef4444' : pt.level === 'danger' ? '#f97316' : '#f59e0b';

          return (
            <div
              key={pt.id}
              style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              onClick={onOpenFullMap}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  boxShadow: `0 0 16px ${color}`,
                  border: '2px solid #ffffff'
                }}
              />
              <span
                style={{
                  marginTop: '4px',
                  padding: '2px 6px',
                  backgroundColor: 'rgba(0,0,0,0.85)',
                  color: '#ffffff',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  borderRadius: '4px',
                  whiteSpace: 'nowrap'
                }}
              >
                {pt.street} ({pt.depthCm}cm)
              </span>
            </div>
          );
        })}

        {/* Compass & Quick Legend Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            backgroundColor: 'rgba(11, 19, 41, 0.85)',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            color: '#cbd5e1',
            border: '1px solid #1e3160'
          }}
        >
          🔴 Nguy hiểm (&gt;40cm) • 🟠 Sâu (20-40cm)
        </div>
      </div>
    </div>
  );
};
