import React, { useState } from 'react';
import { Camera, MapPin, ThumbsUp, MessageSquare, CheckCircle2, AlertTriangle } from 'lucide-react';

interface CommunityReportsFeedSectionProps {
  onOpenReport?: () => void;
}

export const CommunityReportsFeedSection: React.FC<CommunityReportsFeedSectionProps> = ({
  onOpenReport
}) => {
  const [reports, setReports] = useState([
    {
      id: 1,
      street: 'Đường Nguyễn Hữu Cảnh',
      time: 'vừa xong',
      depth: '38cm - Ngập nửa bánh xe',
      severity: 'orange',
      image: '/assets/flood-report-1.jpg',
      author: 'Anonymous',
      likes: 28,
      isLiked: false,
      comments: 6
    },
    {
      id: 2,
      street: 'Kha Vạn Cân',
      time: 'vừa xong',
      depth: '50cm - Rất sâu',
      severity: 'red',
      image: '/assets/flood-report-1.jpg',
      author: 'Anonymous',
      likes: 16,
      isLiked: false,
      comments: 4
    },
    {
      id: 3,
      street: 'Kha Vạn Cân',
      time: '10 phút trước',
      depth: '50cm - Rất sâu',
      severity: 'red',
      image: '/assets/flood-report-1.jpg',
      author: 'Anonymous',
      likes: 24,
      isLiked: false,
      comments: 9
    },
    {
      id: 4,
      street: 'Kha Vạn Cân',
      time: '10 phút trước',
      depth: '50cm - Rất sâu',
      severity: 'red',
      image: '/assets/flood-report-1.jpg',
      author: 'Anonymous',
      likes: 31,
      isLiked: false,
      comments: 11
    },
    {
      id: 5,
      street: 'Đường Nguyễn Hữu Cảnh',
      time: '15 phút trước',
      depth: '45cm - Rất sâu',
      severity: 'red',
      image: '/assets/flood-report-1.jpg',
      author: 'Anonymous',
      likes: 42,
      isLiked: false,
      comments: 15
    }
  ]);

  const handleLike = (id: number) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, likes: r.isLiked ? r.likes - 1 : r.likes + 1, isLiked: !r.isLiked } : r
      )
    );
  };

  return (
    <section
      id="community-section"
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '50px 24px 20px 24px',
        boxSizing: 'border-box'
      }}
    >
      {/* Header Eyebrow & Title */}
      <div style={{ marginBottom: '28px' }}>
        <span
          style={{
            color: '#38bdf8',
            fontSize: '0.82rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '6px'
          }}
        >
          COMMUNITY FLOOD REPORTS FEED
        </span>
        <h2
          style={{
            fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
            fontWeight: 800,
            color: '#ffffff',
            margin: '0 0 6px 0',
            letterSpacing: '-0.01em'
          }}
        >
          BÁO CÁO NGẬP LỤT TỪ CỘNG ĐỒNG
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
          Ảnh và thông tin trực tiếp từ người dân đang di chuyển trên đường
        </p>
      </div>

      {/* Grid 3 Columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px'
        }}
        className="community-feed-grid"
      >
        {reports.map((item) => {
          const isRed = item.severity === 'red';
          const badgeColor = isRed ? '#ef4444' : '#f97316';
          const badgeBg = isRed ? 'rgba(239, 68, 68, 0.15)' : 'rgba(249, 115, 22, 0.15)';
          const badgeBorder = isRed ? 'rgba(239, 68, 68, 0.4)' : 'rgba(249, 115, 22, 0.4)';

          return (
            <div
              key={item.id}
              style={{
                backgroundColor: '#0c1633',
                border: '1px solid #1c2b54',
                borderRadius: '14px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
            >
              {/* Card Header */}
              <div style={{ padding: '12px 14px 10px 14px', borderBottom: '1px solid #142244' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden' }}>
                    <MapPin size={14} style={{ color: '#38bdf8', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f1f5f9', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {item.street}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                    {item.time}
                  </span>
                </div>

                {/* Flood Depth Pill + Verified Chip */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: badgeColor,
                      backgroundColor: badgeBg,
                      border: `1px solid ${badgeBorder}`,
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}
                  >
                    <AlertTriangle size={12} />
                    {item.depth}
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      fontSize: '0.72rem',
                      color: '#10b981',
                      backgroundColor: 'rgba(16, 185, 129, 0.12)',
                      padding: '2px 6px',
                      borderRadius: '6px'
                    }}
                  >
                    <CheckCircle2 size={11} />
                    vừa xong
                  </span>
                </div>
              </div>

              {/* Card Image */}
              <div style={{ width: '100%', height: '160px', position: 'relative', overflow: 'hidden', backgroundColor: '#070e22' }}>
                <img
                  src={item.image}
                  alt={item.street}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  onError={(e) => {
                    // Fallback gradient if file path fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Card Footer Actions */}
              <div
                style={{
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem',
                  color: '#94a3b8'
                }}
              >
                <span style={{ color: '#64748b' }}>👤 {item.author}</span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <button
                    onClick={() => handleLike(item.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: item.isLiked ? '#38bdf8' : '#94a3b8',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      padding: 0
                    }}
                  >
                    <ThumbsUp size={13} />
                    <span>{item.likes} Xác nhận</span>
                  </button>

                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#94a3b8' }}>
                    <MessageSquare size={13} />
                    <span>Bình luận</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* CARD 6: CTA GỬI BÁO CÁO CỦA BẠN (Dashed Card) */}
        <div
          onClick={onOpenReport}
          style={{
            backgroundColor: '#0a142e',
            border: '2px dashed #223c72',
            borderRadius: '14px',
            minHeight: '260px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'all 0.2s ease',
            boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
          }}
          className="report-cta-card"
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(2, 132, 199, 0.15)',
              border: '1.5px solid rgba(56, 189, 248, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8',
              marginBottom: '16px'
            }}
          >
            <Camera size={30} />
          </div>

          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
            Gửi báo cáo của bạn
          </div>

          <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0, maxWidth: '240px', lineHeight: 1.5 }}>
            Chụp ảnh hiện trường &amp; chia sẻ vị trí để cộng đồng cùng né điểm ngập
          </p>

          <button
            type="button"
            className="round-action-btn blue"
            style={{ marginTop: '16px', padding: '8px 20px', fontSize: '0.85rem' }}
          >
            Báo ngập ngay
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .community-feed-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .community-feed-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .report-cta-card:hover {
          border-color: #38bdf8 !important;
          background-color: #0d1a3b !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};

