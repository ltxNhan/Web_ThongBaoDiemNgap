import React, { useState } from 'react';

export const EmergencyKitChecklist: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, label: 'Đèn pin siêu sáng & Pin dự phòng điện thoại (đã sạc đầy)', checked: true },
    { id: 2, label: 'Nước uống đóng chai (tối thiểu 3-5 lít/người)', checked: true },
    { id: 3, label: 'Lương khô, bánh quy, thực phẩm đóng hộp ăn liền', checked: true },
    { id: 4, label: 'Túi thuốc gia đình (hạ sốt, bông gạc, thuốc tiêu chảy, sát trùng)', checked: false },
    { id: 5, label: 'Còi cứu hộ khẩn cấp & áo phao hoặc can nhựa làm phao', checked: false },
    { id: 6, label: 'Giấy tờ tùy thân bọc trong túi nilon chống nước', checked: true }
  ]);

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it))
    );
  };

  const progress = Math.round((items.filter((i) => i.checked).length / items.length) * 100);

  return (
    <div className="glass" style={{ borderRadius: '16px', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
          🎒 Checklist Túi Đồ Cứu Hộ Khẩn Cấp (Go-Bag)
        </h3>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>{progress}% Hoàn tất</span>
      </div>

      <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1rem' }}>
        Chuẩn bị sẵn sàng 1 túi đồ nhỏ gọn để có thể mang theo ngay khi có lệnh sơ tán khẩn cấp.
      </p>

      {/* Progress Bar */}
      <div style={{ width: '100%', height: '8px', backgroundColor: '#0f172a', borderRadius: '4px', overflow: 'hidden', marginBottom: '14px' }}>
        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: progress === 100 ? '#10b981' : '#0284c7', transition: 'width 0.3s ease' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((it) => (
          <label
            key={it.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              backgroundColor: '#0c1630',
              borderRadius: '8px',
              cursor: 'pointer',
              border: it.checked ? '1px solid #1e3a8a' : '1px solid #1a2542'
            }}
          >
            <input
              type="checkbox"
              checked={it.checked}
              onChange={() => toggleItem(it.id)}
              style={{ width: '16px', height: '16px', accentColor: '#0284c7' }}
            />
            <span style={{ fontSize: '0.85rem', color: it.checked ? '#cbd5e1' : '#94a3b8', textDecoration: it.checked ? 'none' : 'none' }}>
              {it.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
