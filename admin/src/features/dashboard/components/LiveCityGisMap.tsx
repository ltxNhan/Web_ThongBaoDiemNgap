import React from 'react';

export const LiveCityGisMap: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: '#0c1630',
        border: '1px solid #1c2b54',
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
            🛰️ Bản Đồ GIS Giám Sát Toàn Bộ Mạng Lưới
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Đồng bộ dữ liệu thời gian thực từ trạm IoT và các điểm ngập
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#34d399', fontSize: '0.75rem', fontWeight: 600 }}>
            ● 148 Trạm Online
          </span>
          <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', fontSize: '0.75rem', fontWeight: 600 }}>
            ● 2 Trạm Offline
          </span>
        </div>
      </div>

      <div
        style={{
          height: '320px',
          backgroundColor: '#060d21',
          borderRadius: '12px',
          border: '1px solid #182850',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'radial-gradient(#12244a 2px, transparent 2px)',
          backgroundSize: '28px 28px'
        }}
      >
        {/* River vector simulation */}
        <svg viewBox="0 0 600 320" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <path
            d="M 100,0 C 220,100 160,200 320,240 T 580,320"
            fill="none"
            stroke="rgba(56, 189, 248, 0.3)"
            strokeWidth="36"
          />
        </svg>

        {/* Dynamic Stations */}
        <div style={{ position: 'absolute', top: '30%', left: '35%', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          <span style={{ fontSize: '0.7rem', color: '#cbd5e1', backgroundColor: '#091228', padding: '2px 6px', borderRadius: '4px' }}>Trạm Phú An (1.72m)</span>
        </div>

        <div style={{ position: 'absolute', top: '65%', left: '55%', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          <span style={{ fontSize: '0.7rem', color: '#cbd5e1', backgroundColor: '#091228', padding: '2px 6px', borderRadius: '4px' }}>Trạm Nhà Bè (1.68m)</span>
        </div>

        <div style={{ position: 'absolute', top: '25%', left: '70%', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          <span style={{ fontSize: '0.7rem', color: '#cbd5e1', backgroundColor: '#091228', padding: '2px 6px', borderRadius: '4px' }}>Trạm Thủ Đức (92mm)</span>
        </div>

        <div style={{ position: 'absolute', top: '50%', left: '20%', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444', boxShadow: '0 0 10px #ef4444' }} />
          <span style={{ fontSize: '0.7rem', color: '#fca5a5', backgroundColor: '#3b0d0d', padding: '2px 6px', borderRadius: '4px' }}>Trạm Tân Hóa (Mất tín hiệu)</span>
        </div>

        {/* Flood Alert polygon */}
        <div style={{ position: 'absolute', top: '22%', left: '30%', width: '100px', height: '60px', border: '2px dashed #ef4444', backgroundColor: 'rgba(239,68,68,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: '#fca5a5', fontWeight: 700 }}>Vùng trũng Q.Bình Thạnh</span>
        </div>
      </div>
    </div>
  );
};
