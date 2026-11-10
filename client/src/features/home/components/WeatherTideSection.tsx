import React from 'react';
import { CloudRain, CloudLightning, Droplets, ArrowUpRight } from 'lucide-react';

export const WeatherTideSection: React.FC = () => {
  const forecastDays = [
    { day: 'Thứ hai', temp: '26°C - 31°C', desc: 'Mưa dông lớn', icon: CloudLightning },
    { day: 'Thứ ba', temp: '26°C - 30°C', desc: 'Mưa dông lớn', icon: CloudRain },
    { day: 'Thứ tư', temp: '25°C - 31°C', desc: 'Mưa rào rải rác', icon: CloudRain },
    { day: 'Thứ năm', temp: '26°C - 31°C', desc: 'Mưa dông lớn', icon: CloudLightning }
  ];

  return (
    <section
      id="forecast-section"
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '60px 24px 20px 24px',
        boxSizing: 'border-box'
      }}
    >
      {/* Header Eyebrow & Title */}
      <div style={{ marginBottom: '28px' }}>
        <span
          style={{
            color: '#38bdf8',
            fontSize: '0.82rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '6px'
          }}
        >
          WEATHER &amp; TIDE FORECAST
        </span>
        <h2
          style={{
            fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
            fontWeight: 800,
            color: '#ffffff',
            margin: '0 0 6px 0',
            letterSpacing: '-0.01em'
          }}
        >
          DỰ BÁO THỜI TIẾT &amp; TRIỀU CƯỜNG
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
          Cập nhật liên tục từ các trạm quan trắc thủy văn và radar thời tiết TP.HCM
        </p>
      </div>

      {/* Grid: Left Weather Card + Right Tide Chart */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 380px) 1fr',
          gap: '24px'
        }}
        className="weather-tide-grid"
      >
        {/* CARD TRÁI: DỰ BÁO THỜI TIẾT */}
        <div
          style={{
            backgroundColor: '#0c1633',
            border: '1px solid #1c2b54',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 30px rgba(0,0,0,0.45)'
          }}
        >
          {/* Hôm nay */}
          <div style={{ borderBottom: '1px solid #1a274c', paddingBottom: '20px', marginBottom: '18px' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
              Hôm nay
            </span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
              <div>
                <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
                  26°C - 31°C
                </div>
                <div style={{ fontSize: '0.9rem', color: '#38bdf8', fontWeight: 600, marginTop: '4px' }}>
                  Mưa dông lớn
                </div>
              </div>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(56, 189, 248, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38bdf8'
                }}
              >
                <CloudRain size={36} />
              </div>
            </div>
          </div>

          {/* Các ngày tiếp theo */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, justifyContent: 'space-around' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
              Dự báo những ngày tới
            </span>
            {forecastDays.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: '#101d40',
                    borderRadius: '10px',
                    border: '1px solid #182850'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <IconComp size={18} style={{ color: '#38bdf8' }} />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f1f5f9' }}>{item.day}</div>
                      <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>{item.desc}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>{item.temp}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CARD PHẢI: BIỂU ĐỒ SÓNG TRIỀU CƯỜNG & LƯỢNG MƯA */}
        <div
          style={{
            backgroundColor: '#0c1633',
            border: '1px solid #1c2b54',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 30px rgba(0,0,0,0.45)',
            position: 'relative'
          }}
        >
          {/* Header biểu đồ */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Triều cường &amp; Lượng mưa
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.82rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#f97316', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f97316' }} />
                Đỉnh triều (m)
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#38bdf8' }} />
                Lượng mưa (mm)
              </span>
            </div>
          </div>

          {/* Canvas Wave Chart SVG */}
          <div style={{ position: 'relative', width: '100%', height: '240px', marginTop: '10px' }}>
            {/* Callout Đỉnh triều 1 (Sáng) */}
            <div
              style={{
                position: 'absolute',
                left: '26%',
                top: '68px',
                transform: 'translate(-50%, -100%)',
                backgroundColor: '#101d40',
                border: '1px solid #38bdf8',
                borderRadius: '9999px',
                padding: '4px 10px',
                fontSize: '0.74rem',
                color: '#ffffff',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
                zIndex: 10
              }}
            >
              Đỉnh triều: <b>1.48m</b> lúc 05:30 (Ngập nhẹ)
            </div>

            {/* Callout Đỉnh triều 2 (Chiều tối - NGUY CƠ CAO) */}
            <div
              style={{
                position: 'absolute',
                left: '74%',
                top: '22px',
                transform: 'translate(-50%, -100%)',
                backgroundColor: '#ea580c',
                border: '1px solid #f97316',
                borderRadius: '9999px',
                padding: '5px 12px',
                fontSize: '0.76rem',
                color: '#ffffff',
                fontWeight: 800,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 16px rgba(234, 88, 12, 0.6)',
                zIndex: 10
              }}
            >
              ⚠️ Đỉnh triều: <b>1.68m</b> lúc 17:30 - Nguy cơ ngập sâu
            </div>

            <svg viewBox="0 0 700 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                {/* Wave Gradient 1 (Blue) */}
                <linearGradient id="waveBlueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.05" />
                </linearGradient>

                {/* Wave Gradient 2 (Orange - Nguy cơ) */}
                <linearGradient id="waveOrangeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#ea580c" stopOpacity="0.08" />
                </linearGradient>

                {/* Rain Bar Gradient */}
                <linearGradient id="rainBarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="40" y1="40" x2="660" y2="40" stroke="#1c2b54" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="40" y1="90" x2="660" y2="90" stroke="#1c2b54" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="40" y1="140" x2="660" y2="140" stroke="#1c2b54" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="40" y1="190" x2="660" y2="190" stroke="#1c2b54" strokeWidth="1" />

              {/* Y-axis Labels Left (Tide) */}
              <text x="32" y="44" fill="#64748b" fontSize="10" textAnchor="end">1.8m</text>
              <text x="32" y="94" fill="#64748b" fontSize="10" textAnchor="end">1.2m</text>
              <text x="32" y="144" fill="#64748b" fontSize="10" textAnchor="end">0.6m</text>
              <text x="32" y="194" fill="#64748b" fontSize="10" textAnchor="end">0.0m</text>

              {/* Y-axis Labels Right (Rainfall mm) */}
              <text x="670" y="44" fill="#64748b" fontSize="10" textAnchor="start">120mm</text>
              <text x="670" y="94" fill="#64748b" fontSize="10" textAnchor="start">80mm</text>
              <text x="670" y="144" fill="#64748b" fontSize="10" textAnchor="start">40mm</text>
              <text x="670" y="194" fill="#64748b" fontSize="10" textAnchor="start">0mm</text>

              {/* Rainfall Bars (Blue columns along bottom) */}
              <rect x="100" y="170" width="10" height="20" rx="3" fill="url(#rainBarGrad)" />
              <rect x="130" y="160" width="10" height="30" rx="3" fill="url(#rainBarGrad)" />
              <rect x="180" y="175" width="10" height="15" rx="3" fill="url(#rainBarGrad)" />
              <rect x="230" y="180" width="10" height="10" rx="3" fill="url(#rainBarGrad)" />
              <rect x="290" y="165" width="10" height="25" rx="3" fill="url(#rainBarGrad)" />
              <rect x="350" y="155" width="10" height="35" rx="3" fill="url(#rainBarGrad)" />
              <rect x="410" y="140" width="10" height="50" rx="3" fill="url(#rainBarGrad)" />
              <rect x="470" y="115" width="10" height="75" rx="3" fill="url(#rainBarGrad)" />
              <rect x="500" y="85" width="12" height="105" rx="3" fill="url(#rainBarGrad)" />
              <rect x="530" y="105" width="10" height="85" rx="3" fill="url(#rainBarGrad)" />
              <rect x="560" y="130" width="10" height="60" rx="3" fill="url(#rainBarGrad)" />
              <rect x="600" y="160" width="10" height="30" rx="3" fill="url(#rainBarGrad)" />

              {/* Tide Wave 1 (Morning Blue Wave: Peak 1.48m at x=200, y=80) */}
              <path
                d="M 50,165 Q 120,160 200,80 Q 280,160 370,160 L 370,190 L 50,190 Z"
                fill="url(#waveBlueGrad)"
              />
              <path
                d="M 50,165 Q 120,160 200,80 Q 280,160 370,160"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3"
              />
              <circle cx="200" cy="80" r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />

              {/* Tide Wave 2 (Evening Orange Wave: Peak 1.68m at x=520, y=34) */}
              <path
                d="M 370,160 Q 440,160 520,34 Q 600,140 650,155 L 650,190 L 370,190 Z"
                fill="url(#waveOrangeGrad)"
              />
              <path
                d="M 370,160 Q 440,160 520,34 Q 600,140 650,155"
                fill="none"
                stroke="#f97316"
                strokeWidth="3.5"
              />
              <circle cx="520" cy="34" r="6" fill="#ea580c" stroke="#ffffff" strokeWidth="2.5" />
            </svg>
          </div>

          {/* Time axis below chart */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0 40px',
              fontSize: '0.8rem',
              color: '#94a3b8',
              fontWeight: 600,
              marginTop: '4px'
            }}
          >
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span style={{ color: '#f97316', fontWeight: 800 }}>18:00 (Đỉnh triều)</span>
            <span>00:00</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .weather-tide-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

