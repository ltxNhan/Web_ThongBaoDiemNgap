import React, { useState } from 'react';

export const FloodHistoryLookup: React.FC = () => {
  const [year, setYear] = useState('2025');
  const [streetQuery, setStreetQuery] = useState('');

  const historyData = [
    { street: 'Nguyễn Hữu Cảnh', district: 'Bình Thạnh', count: 38, maxDepth: '55 cm', mainCause: 'Triều cường & mưa lớn' },
    { street: 'Huỳnh Tấn Phát', district: 'Quận 7', count: 42, maxDepth: '48 cm', mainCause: 'Đỉnh triều sông Sài Gòn' },
    { street: 'Võ Văn Ngân', district: 'TP. Thủ Đức', count: 26, maxDepth: '40 cm', mainCause: 'Độ dốc cao, nước chảy xiết' },
    { street: 'Quốc Lộ 13 (Cân Nhơn Hòa)', district: 'TP. Thủ Đức', count: 31, maxDepth: '45 cm', mainCause: 'Hệ thống thoát nước quá tải' },
    { street: 'Lê Văn Lương', district: 'Nhà Bè', count: 52, maxDepth: '60 cm', mainCause: 'Địa hình trũng thấp, không có đê' }
  ];

  const filtered = historyData.filter((item) =>
    item.street.toLowerCase().includes(streetQuery.toLowerCase())
  );

  return (
    <div className="glass" style={{ borderRadius: '16px', padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>
        📊 Tra Cứu Lịch Sử Điểm Ngập Đô Thị
      </h3>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
        <input
          type="text"
          value={streetQuery}
          onChange={(e) => setStreetQuery(e.target.value)}
          placeholder="Nhập tên tuyến đường cần tra cứu..."
          style={{
            flex: 1,
            padding: '10px 14px',
            backgroundColor: '#0c1630',
            border: '1px solid #1e2c58',
            borderRadius: '8px',
            color: '#f8fafc',
            fontSize: '0.85rem'
          }}
        />

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{
            padding: '10px 14px',
            backgroundColor: '#0c1630',
            border: '1px solid #1e2c58',
            borderRadius: '8px',
            color: '#f8fafc',
            fontSize: '0.85rem'
          }}
        >
          <option value="2026">Năm 2026</option>
          <option value="2025">Năm 2025</option>
          <option value="2024">Năm 2024</option>
        </select>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#0c1630', color: '#94a3b8', borderBottom: '1px solid #1e2c58' }}>
              <th style={{ padding: '10px 12px' }}>Tuyến đường</th>
              <th style={{ padding: '10px 12px' }}>Quận / Huyện</th>
              <th style={{ padding: '10px 12px' }}>Số lần ngập</th>
              <th style={{ padding: '10px 12px' }}>Độ sâu tối đa</th>
              <th style={{ padding: '10px 12px' }}>Nguyên nhân chủ yếu</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.street} style={{ borderBottom: '1px solid #142142', color: '#cbd5e1' }}>
                <td style={{ padding: '10px 12px', fontWeight: 600, color: '#f8fafc' }}>{row.street}</td>
                <td style={{ padding: '10px 12px' }}>{row.district}</td>
                <td style={{ padding: '10px 12px', color: '#f59e0b', fontWeight: 700 }}>{row.count} trận</td>
                <td style={{ padding: '10px 12px', color: '#ef4444', fontWeight: 700 }}>{row.maxDepth}</td>
                <td style={{ padding: '10px 12px', fontSize: '0.8rem', color: '#94a3b8' }}>{row.mainCause}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
