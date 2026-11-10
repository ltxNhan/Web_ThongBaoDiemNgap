import React from 'react';

export const RainChart: React.FC = () => {
  const rainData = [
    { hour: '06:00', mm: 12 },
    { hour: '09:00', mm: 25 },
    { hour: '12:00', mm: 48 },
    { hour: '15:00', mm: 95 },
    { hour: '18:00', mm: 82 },
    { hour: '21:00', mm: 35 },
    { hour: '00:00', mm: 10 }
  ];

  const maxVal = 100;

  return (
    <div className="glass" style={{ borderRadius: '16px', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
            🌧️ Dự Báo Lượng Mưa Theo Khung Giờ (mm)
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Dự báo 24 giờ tới tại trạm trung tâm</span>
        </div>
        <span style={{ fontSize: '0.75rem', backgroundColor: '#1e3a8a', padding: '4px 10px', borderRadius: '6px', color: '#38bdf8' }}>
          Đỉnh mưa: 15h00 - 18h00
        </span>
      </div>

      {/* Bar Chart Visualization */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '180px', paddingTop: '20px', gap: '8px' }}>
        {rainData.map((item) => {
          const heightPercent = (item.mm / maxVal) * 100;
          const isPeak = item.mm > 70;
          return (
            <div key={item.hour} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isPeak ? '#f87171' : '#94a3b8', marginBottom: '4px' }}>
                {item.mm}
              </span>
              <div
                style={{
                  width: '80%',
                  maxWidth: '36px',
                  height: `${heightPercent}%`,
                  borderRadius: '6px 6px 0 0',
                  background: isPeak
                    ? 'linear-gradient(180deg, #f87171 0%, #dc2626 100%)'
                    : 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)',
                  boxShadow: isPeak ? '0 0 12px rgba(248, 113, 113, 0.4)' : 'none',
                  transition: 'height 0.4s ease'
                }}
              />
              <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '8px' }}>
                {item.hour}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
