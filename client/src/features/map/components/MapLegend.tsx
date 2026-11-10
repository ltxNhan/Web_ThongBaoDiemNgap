import React from 'react';

export const MapLegend: React.FC = () => {
  const levels = [
    { color: '#10b981', label: 'Bình thường (<10 cm)', desc: 'Xe cộ lưu thông an toàn' },
    { color: '#f59e0b', label: 'Ngập nhẹ (10 - 20 cm)', desc: 'Mấp mé lề, xe máy đi chậm' },
    { color: '#f97316', label: 'Ngập sâu (20 - 40 cm)', desc: 'Ngập nửa bánh xe, nguy cơ chết máy' },
    { color: '#ef4444', label: 'Rất nguy hiểm (>40 cm)', desc: 'Cấm xe máy & ô tô gầm thấp' }
  ];

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
        fontSize: '0.8rem'
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: '8px', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}>
        📊 CHÚ GIẢI CẤP ĐỘ NGẬP
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {levels.map((lvl) => (
          <div key={lvl.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '3px',
                backgroundColor: lvl.color,
                flexShrink: 0
              }}
            />
            <div>
              <span style={{ fontWeight: 600 }}>{lvl.label}</span>
              <span style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8' }}>{lvl.desc}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px solid #1e293b', display: 'flex', gap: '12px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
          📍 Điểm ngập
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
          🌊 Mốc thủy văn
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
          🦺 Điểm sơ tán
        </span>
      </div>
    </div>
  );
};
