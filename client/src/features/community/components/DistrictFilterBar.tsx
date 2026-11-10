import React from 'react';

interface DistrictFilterBarProps {
  selectedDistrict: string;
  onSelectDistrict: (district: string) => void;
  selectedTag: string;
  onSelectTag: (tag: string) => void;
}

export const DistrictFilterBar: React.FC<DistrictFilterBarProps> = ({
  selectedDistrict,
  onSelectDistrict,
  selectedTag,
  onSelectTag
}) => {
  const districts = ['Tất cả', 'Bình Thạnh', 'Quận 7', 'TP. Thủ Đức', 'Nhà Bè', 'Quận 4', 'Gò Vấp'];
  const tags = ['Tất cả', 'Cứu hộ', 'Hỏi đường', 'Xe chết máy', 'Cảnh báo'];

  return (
    <div className="glass" style={{ borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Districts */}
      <div>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
          Lọc theo Quận / Huyện:
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {districts.map((d) => (
            <button
              key={d}
              onClick={() => onSelectDistrict(d)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: selectedDistrict === d ? 700 : 500,
                border: selectedDistrict === d ? '1px solid #38bdf8' : '1px solid #1e2c58',
                backgroundColor: selectedDistrict === d ? 'rgba(56, 189, 248, 0.2)' : '#0c1630',
                color: selectedDistrict === d ? '#38bdf8' : '#cbd5e1',
                cursor: 'pointer'
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div style={{ borderTop: '1px solid #1c2c58', paddingTop: '10px' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
          Phân loại chủ đề:
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => onSelectTag(t)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: selectedTag === t ? 700 : 500,
                border: selectedTag === t ? '1px solid #a855f7' : '1px solid #233566',
                backgroundColor: selectedTag === t ? 'rgba(168, 85, 247, 0.2)' : '#0f172a',
                color: selectedTag === t ? '#c084fc' : '#94a3b8',
                cursor: 'pointer'
              }}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
