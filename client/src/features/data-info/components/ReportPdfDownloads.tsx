import React from 'react';

export const ReportPdfDownloads: React.FC = () => {
  const reports = [
    { title: 'Báo cáo tổng kết diễn biến triều cường và ngập úng mùa mưa 2025', size: '4.8 MB', date: 'Tháng 12/2025' },
    { title: 'Cẩm nang hướng dẫn phòng tránh đuối nước và tai nạn điện mùa lũ', size: '2.1 MB', date: 'Tái bản 2026' },
    { title: 'Bản đồ quy hoạch các công trình chống ngập và cống ngăn triều lớn', size: '12.5 MB', date: 'Quý I/2026' }
  ];

  return (
    <div className="glass" style={{ borderRadius: '16px', padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>
        📥 Tài Liệu & Báo Cáo PDF Tải Về
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {reports.map((r) => (
          <div
            key={r.title}
            style={{
              padding: '12px 14px',
              backgroundColor: '#0c1630',
              borderRadius: '10px',
              border: '1px solid #1a2952',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.5rem' }}>📄</span>
              <div>
                <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#f8fafc', display: 'block' }}>
                  {r.title}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Kích thước: {r.size} • Phát hành: {r.date}
                </span>
              </div>
            </div>

            <button
              onClick={() => alert(`Đang tải tài liệu: ${r.title}`)}
              style={{
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid #38bdf8',
                color: '#38bdf8',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Tải Xuống PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
