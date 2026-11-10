import React from 'react';
import { PhoneCall, ShieldAlert, Cross, Compass, ChevronRight, BookOpen, AlertCircle, MapPin } from 'lucide-react';

interface EmergencyDirectorySectionProps {
  onOpenMapPreset?: (preset: string) => void;
  onRequestRescue?: () => void;
}

export const EmergencyDirectorySection: React.FC<EmergencyDirectorySectionProps> = ({
  onOpenMapPreset,
  onRequestRescue
}) => {
  return (
    <section
      id="emergency-section"
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '50px 24px 70px 24px',
        boxSizing: 'border-box'
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '26px' }}>
        <h2
          style={{
            fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
            fontWeight: 800,
            color: '#ffffff',
            margin: '0 0 6px 0',
            letterSpacing: '-0.01em'
          }}
        >
          DANH BẠ ỨNG PHÓ KHẨN CẤP
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
          Liên hệ ngay khi gặp sự cố ngập lụt, chết máy hoặc cần cứu hộ khẩn cấp
        </p>
      </div>

      {/* ROW 1: 2 TOP BIG EMERGENCY HOTLINES (RED 114 & BLUE 115) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          marginBottom: '20px'
        }}
        className="emergency-top-row"
      >
        {/* BIG CARD 1: CỨU HỘ 114 */}
        <a
          href="tel:114"
          onClick={(e) => {
            if (onRequestRescue) {
              e.preventDefault();
              onRequestRescue();
            }
          }}
          style={{
            background: 'linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #ef4444 100%)',
            borderRadius: '16px',
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#ffffff',
            textDecoration: 'none',
            boxShadow: '0 8px 30px rgba(220, 38, 38, 0.4)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: 'pointer'
          }}
          className="emergency-hero-btn"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <PhoneCall size={30} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.9 }}>
                CỨU HỘ KHẨN CẤP:
              </div>
              <div style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1 }}>
                114
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right', display: 'none' }} className="emergency-hint">
            <span style={{ fontSize: '0.85rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '9999px', fontWeight: 700 }}>
              Gọi ngay ➔
            </span>
          </div>
        </a>

        {/* BIG CARD 2: CẤP CỨU 115 */}
        <a
          href="tel:115"
          style={{
            background: 'linear-gradient(135deg, #075985 0%, #0284c7 50%, #38bdf8 100%)',
            borderRadius: '16px',
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#ffffff',
            textDecoration: 'none',
            boxShadow: '0 8px 30px rgba(2, 132, 199, 0.4)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: 'pointer'
          }}
          className="emergency-hero-btn"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <PhoneCall size={30} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.9 }}>
                Y TẾ &amp; CẤP CỨU:
              </div>
              <div style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1 }}>
                115
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* ROW 2: 4 QUICK CONTACT SQUARES */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '24px'
        }}
        className="emergency-four-cards"
      >
        <a
          href="tel:114"
          style={{
            backgroundColor: '#0c1633',
            border: '1px solid #1c2b54',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#ffffff',
            textDecoration: 'none'
          }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
            <ShieldAlert size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 700 }}>CỨU HỘ KHẨN CẤP:</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ef4444' }}>114</div>
          </div>
        </a>

        <a
          href="tel:115"
          style={{
            backgroundColor: '#0c1633',
            border: '1px solid #1c2b54',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#ffffff',
            textDecoration: 'none'
          }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
            <Cross size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 700 }}>Y TẾ &amp; CẤP CỨU:</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8' }}>115</div>
          </div>
        </a>

        <a
          href="tel:02837851658"
          style={{
            backgroundColor: '#0c1633',
            border: '1px solid #1c2b54',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#ffffff',
            textDecoration: 'none'
          }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(249, 115, 22, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316' }}>
            <Compass size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 700 }}>ĐỘI PHẢN ỨNG NHANH</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f97316' }}>QUẬN 7</div>
          </div>
        </a>

        <a
          href="tel:02838966774"
          style={{
            backgroundColor: '#0c1633',
            border: '1px solid #1c2b54',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#ffffff',
            textDecoration: 'none'
          }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
            <Compass size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 700 }}>ĐỘI PHẢN ỨNG NHANH</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#10b981' }}>THỦ ĐỨC</div>
          </div>
        </a>
      </div>

      {/* ROW 3: 2 WIDE EVACUATION & SAFE ROUTE LISTS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px'
        }}
        className="emergency-two-lists"
      >
        {/* BOX TRÁI: ĐIỂM TRÁNH NGẬP AN TOÀN GẦN BẠN */}
        <div
          style={{
            backgroundColor: '#0c1633',
            border: '1px solid #1c2b54',
            borderRadius: '14px',
            padding: '20px'
          }}
        >
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Điểm tránh ngập an toàn gần bạn
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { name: 'Đường Nguyễn Hữu Cảnh (Đoạn trên cao)', dist: '500m - Khô ráo' },
              { name: 'Đường Ung Văn Khiêm (Khu D2)', dist: '900m - Khô ráo' },
              { name: 'Đội Phản ứng Nhanh Quận 7', dist: '500m - Trực 24/7' },
              { name: 'Hồ Chí Minh City (Trung tâm Q.1)', dist: '500m - An toàn' }
            ].map((loc, idx) => (
              <div
                key={idx}
                onClick={() => onOpenMapPreset && onOpenMapPreset(loc.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  backgroundColor: '#101d40',
                  borderRadius: '8px',
                  border: '1px solid #192a54',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={15} style={{ color: '#38bdf8' }} />
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f1f5f9' }}>{loc.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 600 }}>{loc.dist}</span>
                  <ChevronRight size={14} style={{ color: '#64748b' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOX PHẢI: ĐIỂM TRÁNH NGẬP NGOẠI THÀNH & TÀI LIỆU HƯỚNG DẪN */}
        <div
          style={{
            backgroundColor: '#0c1633',
            border: '1px solid #1c2b54',
            borderRadius: '14px',
            padding: '20px'
          }}
        >
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Điểm tránh ngập ngoại thành &amp; Sơ tán
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { name: 'Đội Phản ứng Nhanh Thủ Đức (Trạm sơ tán số 1)', icon: ShieldAlert },
              { name: 'Cẩm nang hướng dẫn an toàn mùa ngập lụt TP.HCM', icon: BookOpen },
              { name: 'Cẩm nang sơ cứu phương tiện chết máy & thủy kích', icon: BookOpen },
              { name: 'Sổ tay liên hệ Đội Cứu trợ Bão Lũ Thành Phố', icon: BookOpen }
            ].map((doc, idx) => {
              const DocIcon = doc.icon;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    backgroundColor: '#101d40',
                    borderRadius: '8px',
                    border: '1px solid #192a54',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <DocIcon size={15} style={{ color: '#f59e0b' }} />
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f1f5f9' }}>{doc.name}</span>
                  </div>
                  <ChevronRight size={14} style={{ color: '#64748b' }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .emergency-top-row {
            grid-template-columns: 1fr !important;
          }
          .emergency-four-cards {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .emergency-two-lists {
            grid-template-columns: 1fr !important;
          }
        }
        .emergency-hero-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.05);
        }
      `}</style>
    </section>
  );
};

