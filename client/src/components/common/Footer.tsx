import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#070d1e', borderTop: '1px solid #1a274c', padding: '3rem 1.5rem 1.5rem', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <img src="/assets/logo.svg" alt="Logo" style={{ width: '32px', height: '32px' }} />
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#f8fafc' }}>FLOODGUARD</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>
            Hệ thống giám sát trạm quan trắc IoT, dự báo thủy văn và cảnh báo ngập đô thị thông minh phục vụ người dân và các đơn vị phòng chống thiên tai.
          </p>
        </div>

        <div>
          <h4 style={{ color: '#f8fafc', fontSize: '0.95rem', marginBottom: '0.75rem', fontWeight: 700 }}>Đường Dây Nóng Khẩn Cấp</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.875rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>🚒 Cứu hỏa & Cứu nạn: <b style={{ color: '#ef4444' }}>114</b></li>
            <li>🚑 Cấp cứu y tế: <b style={{ color: '#38bdf8' }}>115</b></li>
            <li>🚓 CSGT hỗ trợ điều tiết ngập: <b style={{ color: '#facc15' }}>113 / 028.38387240</b></li>
            <li>🌊 Ban Chỉ huy PCTT & TKCN TP: <b>028.38297598</b></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#f8fafc', fontSize: '0.95rem', marginBottom: '0.75rem', fontWeight: 700 }}>Phân Hệ & Dịch Vụ</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.875rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>• Bản đồ GIS điểm ngập & Trạm quan trắc</li>
            <li>• Dự báo triều cường và lượng mưa 24h</li>
            <li>• Tiếp nhận phản ánh ngập từ cộng đồng</li>
            <li>• Cổng quản trị điều hành cán bộ (/admin)</li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#f8fafc', fontSize: '0.95rem', marginBottom: '0.75rem', fontWeight: 700 }}>Nguồn Dữ Liệu</h4>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
            Dữ liệu tích hợp từ Mạng lưới trạm quan trắc IoT tự động, Đài Khí tượng Thủy văn khu vực Nam Bộ và Trung tâm Quản lý Hạ tầng Kỹ thuật.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1440px', margin: '2rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid #14203d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#64748b' }}>
        <span>© 2026 Flood Warning System. Bản quyền thuộc Ban Chỉ Đạo Phòng Chống Thiên Tai.</span>
        <span>Phiên bản v2.5.0 • GIS Enabled</span>
      </div>
    </footer>
  );
};
