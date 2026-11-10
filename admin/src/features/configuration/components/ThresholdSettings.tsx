import React, { useState } from 'react';

export const ThresholdSettings: React.FC = () => {
  const [bd1, setBd1] = useState(1.40);
  const [bd2, setBd2] = useState(1.50);
  const [bd3, setBd3] = useState(1.60);
  const [rainThreshold, setRainThreshold] = useState(50);
  const [criticalDepth, setCriticalDepth] = useState(40);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Đã lưu cấu hình ngưỡng cảnh báo thành công!');
  };

  return (
    <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
        ⚙️ Cấu Hình Ngưỡng Báo Động (Triều Cường, Lượng Mưa, Độ Sâu)
      </h3>
      <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
        Khi số liệu trạm quan trắc vượt qua các ngưỡng này, hệ thống sẽ tự động kích hoạt mức cảnh báo tương ứng.
      </p>

      <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.8rem', color: '#34d399', display: 'block', marginBottom: '4px', fontWeight: 700 }}>Ngưỡng Báo Động 1 (m)</label>
          <input
            type="number"
            step="0.01"
            value={bd1}
            onChange={(e) => setBd1(parseFloat(e.target.value))}
            style={{ width: '100%', padding: '8px 12px', backgroundColor: '#070f24', border: '1px solid #1e3a8a', borderRadius: '8px', color: '#ffffff' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', color: '#f59e0b', display: 'block', marginBottom: '4px', fontWeight: 700 }}>Ngưỡng Báo Động 2 (m)</label>
          <input
            type="number"
            step="0.01"
            value={bd2}
            onChange={(e) => setBd2(parseFloat(e.target.value))}
            style={{ width: '100%', padding: '8px 12px', backgroundColor: '#070f24', border: '1px solid #1e3a8a', borderRadius: '8px', color: '#ffffff' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', color: '#ef4444', display: 'block', marginBottom: '4px', fontWeight: 700 }}>Ngưỡng Báo Động 3 (m)</label>
          <input
            type="number"
            step="0.01"
            value={bd3}
            onChange={(e) => setBd3(parseFloat(e.target.value))}
            style={{ width: '100%', padding: '8px 12px', backgroundColor: '#070f24', border: '1px solid #1e3a8a', borderRadius: '8px', color: '#ffffff' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', color: '#38bdf8', display: 'block', marginBottom: '4px', fontWeight: 700 }}>Ngưỡng Mưa Lớn (mm/h)</label>
          <input
            type="number"
            value={rainThreshold}
            onChange={(e) => setRainThreshold(parseInt(e.target.value))}
            style={{ width: '100%', padding: '8px 12px', backgroundColor: '#070f24', border: '1px solid #1e3a8a', borderRadius: '8px', color: '#ffffff' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', color: '#f87171', display: 'block', marginBottom: '4px', fontWeight: 700 }}>Ngưỡng Ngập Rất Sâu (cm)</label>
          <input
            type="number"
            value={criticalDepth}
            onChange={(e) => setCriticalDepth(parseInt(e.target.value))}
            style={{ width: '100%', padding: '8px 12px', backgroundColor: '#070f24', border: '1px solid #1e3a8a', borderRadius: '8px', color: '#ffffff' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button
            type="submit"
            style={{ width: '100%', padding: '9px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
          >
            Lưu Ngưỡng Cảnh Báo
          </button>
        </div>
      </form>
    </div>
  );
};
