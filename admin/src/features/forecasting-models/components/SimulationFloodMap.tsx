import React, { useState } from 'react';

export const SimulationFloodMap: React.FC = () => {
  const [timeStep, setTimeStep] = useState<'3h' | '6h' | '12h'>('3h');

  return (
    <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
            🌊 Bản Đồ Mô Phỏng Ngập Dự Báo Theo Kịch Bản ({timeStep})
          </h3>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Dự đoán vùng ngập lan tỏa theo thời gian</span>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {(['3h', '6h', '12h'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeStep(t)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: timeStep === t ? '1px solid #38bdf8' : '1px solid #1e3a8a',
                backgroundColor: timeStep === t ? '#0284c7' : '#070f24',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              + {t} tới
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: '260px', backgroundColor: '#060d21', borderRadius: '12px', border: '1px solid #1e3a8a', position: 'relative', overflow: 'hidden' }}>
        <svg viewBox="0 0 500 260" style={{ width: '100%', height: '100%' }}>
          {/* Simulated Flood spread overlay */}
          <path
            d="M 50,0 Q 180,120 220,160 T 480,260"
            fill="none"
            stroke="rgba(56, 189, 248, 0.3)"
            strokeWidth="32"
          />
          {timeStep === '3h' && (
            <circle cx="220" cy="140" r="45" fill="rgba(249, 115, 22, 0.4)" stroke="#f97316" strokeDasharray="4 2" />
          )}
          {timeStep === '6h' && (
            <>
              <circle cx="220" cy="140" r="75" fill="rgba(239, 68, 68, 0.4)" stroke="#ef4444" strokeDasharray="4 2" />
              <circle cx="340" cy="190" r="50" fill="rgba(249, 115, 22, 0.4)" stroke="#f97316" strokeDasharray="4 2" />
            </>
          )}
          {timeStep === '12h' && (
            <>
              <circle cx="220" cy="140" r="30" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" />
              <text x="250" y="130" fill="#34d399" fontSize="12" fontWeight="bold">Triều đã rút hoàn toàn</text>
            </>
          )}
        </svg>

        <div style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'rgba(0,0,0,0.8)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', color: '#cbd5e1' }}>
          Mô hình: DeepHydro-2026 • Chu kỳ tính: 15 phút
        </div>
      </div>
    </div>
  );
};
