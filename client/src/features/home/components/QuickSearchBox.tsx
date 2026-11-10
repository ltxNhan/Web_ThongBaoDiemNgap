import React, { useState } from 'react';

interface QuickSearchBoxProps {
  onSearch: (query: string, district: string) => void;
}

export const QuickSearchBox: React.FC<QuickSearchBoxProps> = ({ onSearch }) => {
  const [street, setStreet] = useState('');
  const [district, setDistrict] = useState('Tất cả');

  const districts = [
    'Tất cả',
    'Quận 1',
    'Quận 4',
    'Quận 7',
    'Quận 8',
    'Bình Thạnh',
    'Gò Vấp',
    'TP. Thủ Đức',
    'Nhà Bè',
    'Bình Chánh'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(street, district);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass"
      style={{
        padding: '1.5rem',
        borderRadius: '16px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        boxShadow: '0 12px 30px rgba(0,0,0,0.3)'
      }}
    >
      <div style={{ flex: '1 1 300px' }}>
        <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>
          Tra Cứu Tuyến Đường
        </label>
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="Ví dụ: Nguyễn Hữu Cảnh, Huỳnh Tấn Phát, Võ Văn Ngân..."
          style={{
            width: '100%',
            padding: '12px 16px',
            backgroundColor: '#0c1630',
            border: '1px solid #24386b',
            borderRadius: '10px',
            color: '#ffffff',
            fontSize: '0.95rem',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ flex: '0 1 200px' }}>
        <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>
          Quận / Huyện
        </label>
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 14px',
            backgroundColor: '#0c1630',
            border: '1px solid #24386b',
            borderRadius: '10px',
            color: '#ffffff',
            fontSize: '0.95rem',
            outline: 'none'
          }}
        >
          {districts.map((d) => (
            <option key={d} value={d} style={{ backgroundColor: '#0b1329', color: '#ffffff' }}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div style={{ flex: '0 0 auto', alignSelf: 'flex-end' }}>
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          🔍 Kiểm Tra Điểm Ngập
        </button>
      </div>
    </form>
  );
};
