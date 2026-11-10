import React, { useState } from 'react';

export const SurvivalGuideAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const guides = [
    {
      title: '1. TRƯỚC KHI NGẬP & TRIỀU CƯỜNG DÂNG CAO',
      tips: [
        'Kê cao đồ đạc, tài sản có giá trị và các thiết bị điện lên tầng cao.',
        'Ngắt toàn bộ cầu dao điện các tầng trệt và khu vực trũng thấp.',
        'Dự trữ sẵn nước sạch, thực phẩm khô đóng hộp, thuốc men và pin dự phòng.',
        'Đưa phương tiện (xe máy, ô tô) đến các bãi gửi xe cao tầng hoặc điểm đỗ an toàn.'
      ]
    },
    {
      title: '2. TRONG KHI NƯỚC ĐANG DÂNG NGẬP',
      tips: [
        'Tuyệt đối không đi bộ hoặc lội qua các dòng nước chảy xiết và nắp cống mất nắp.',
        'Không đến gần các cột điện, trạm biến áp, dây điện bị đứt chìm trong nước.',
        'Không cố khởi động xe khi xe đã bị chết máy trong vùng ngập.',
        'Nếu bị cô lập và nước dâng nguy hiểm, gọi ngay 114 hoặc bấm nút "Cứu hộ khẩn cấp".'
      ]
    },
    {
      title: '3. SAU KHI NƯỚC ĐÃ RÚT',
      tips: [
        'Kiểm tra kỹ lưỡng hệ thống điện trước khi đóng cầu dao trở lại.',
        'Khử trùng nguồn nước sinh hoạt, dọn dẹp vệ sinh phòng ngừa dịch tả, sốt xuất huyết.',
        'Không sử dụng các loại thực phẩm đã bị ngâm trong nước lũ/nước ngập.',
        'Báo cáo cho chính quyền địa phương nếu phát hiện sạt lở hoặc hỏng hóc công trình.'
      ]
    }
  ];

  return (
    <div className="glass" style={{ borderRadius: '16px', padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1rem' }}>
        📖 Cẩm Nang Sống Còn: Trước, Trong & Sau Ngập Lụt
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {guides.map((g, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={g.title}
              style={{
                backgroundColor: '#0c1630',
                border: '1px solid #1e2c58',
                borderRadius: '10px',
                overflow: 'hidden'
              }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: isOpen ? '#14234b' : 'transparent',
                  color: isOpen ? '#38bdf8' : '#f1f5f9',
                  border: 'none',
                  textAlign: 'left',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{g.title}</span>
                <span>{isOpen ? '▲' : '▼'}</span>
              </button>

              {isOpen && (
                <div style={{ padding: '12px 16px', backgroundColor: '#091024' }}>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: '#cbd5e1', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {g.tips.map((tip, tIdx) => (
                      <li key={tIdx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
