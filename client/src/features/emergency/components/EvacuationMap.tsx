import React from 'react';

export const EvacuationMap: React.FC = () => {
  const shelters = [
    { name: 'Trường THCS Đống Đa', district: 'Bình Thạnh', capacity: '500 người', distance: '1.2 km', address: '20 Võ Oanh, P.25' },
    { name: 'Trung Tâm Thể Thao Quận 7', district: 'Quận 7', capacity: '1.200 người', distance: '2.5 km', address: '504 Huỳnh Tấn Phát' },
    { name: 'Nhà Thi Đấu Rạch Miễu', district: 'Phú Nhuận', capacity: '800 người', distance: '3.1 km', address: 'Số 1 Hoa Phượng' },
    { name: 'Trường THPT Thủ Đức', district: 'TP. Thủ Đức', capacity: '650 người', distance: '1.8 km', address: '166 Đặng Văn Bi' }
  ];

  return (
    <div className="glass" style={{ borderRadius: '16px', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
            🦺 Bản Đồ Điểm Sơ Tán An Toàn & Trạm Y Tế
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Các vị trí cao ráo, kiên cố có dự trữ nhu yếu phẩm và y tế
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
        {shelters.map((s) => (
          <div
            key={s.name}
            style={{
              padding: '14px',
              backgroundColor: '#0c1630',
              borderRadius: '12px',
              border: '1px solid #1e3a8a',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, color: '#38bdf8', fontSize: '0.95rem' }}>{s.name}</span>
              <span style={{ fontSize: '0.75rem', backgroundColor: '#1e293b', padding: '2px 8px', borderRadius: '4px', color: '#34d399' }}>
                Sức chứa {s.capacity}
              </span>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>📍 {s.address} ({s.district})</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
              <span>Cách bạn: {s.distance}</span>
              <span style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: 600 }}>Chỉ đường đến điểm sơ tán →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
