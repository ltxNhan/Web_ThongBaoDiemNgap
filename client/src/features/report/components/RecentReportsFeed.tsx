import React, { useState } from 'react';
import { CitizenReport } from '../../../types';
import { formatTimeAgo } from '../../../utils/formatDate';
import { rewardsStore } from '../../../stores/rewardsStore';
import { ThumbsUp, Check, Sparkles } from 'lucide-react';

interface RecentReportsFeedProps {
  reports: CitizenReport[];
}

export const RecentReportsFeed: React.FC<RecentReportsFeedProps> = ({ reports }) => {
  const [confirmedReports, setConfirmedReports] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleConfirm = (rep: CitizenReport) => {
    if (confirmedReports[rep.id]) return;

    const res = rewardsStore.confirmReport(rep.id, rep.street, rep.district);
    setConfirmedReports((prev) => ({ ...prev, [rep.id]: true }));
    setToastMessage(res.message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="glass" style={{ borderRadius: '16px', padding: '1.5rem', position: 'relative' }}>
      {toastMessage && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: '#0284c7',
          color: '#ffffff',
          padding: '6px 14px',
          borderRadius: '8px',
          fontSize: '0.8rem',
          fontWeight: 700,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          zIndex: 10
        }}>
          <Sparkles size={14} />
          {toastMessage}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
          🕒 Báo Cáo Mới Nhất Từ Người Dân
        </h3>
        <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 600 }}>
          🤝 Xác nhận tin nhận +5đ
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {reports.map((rep) => {
          const isConfirmed = !!confirmedReports[rep.id];

          return (
            <div
              key={rep.id}
              style={{
                padding: '14px',
                backgroundColor: '#0c1630',
                borderRadius: '12px',
                border: '1px solid #1e2c58',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'border-color 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f8fafc' }}>
                  {rep.street} ({rep.district})
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: rep.depthEstimate > 30 ? '#ef4444' : '#f59e0b',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}
                >
                  ~{rep.depthEstimate} cm
                </span>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
                "{rep.description}"
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px', marginTop: '4px' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
                  <span>Bởi: <b style={{ color: '#f8fafc' }}>{rep.userName}</b></span>
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    backgroundColor: rep.userName.includes('Nam') ? 'rgba(251, 191, 36, 0.18)' : rep.userName.includes('Mai') ? 'rgba(52, 211, 153, 0.18)' : 'rgba(56, 189, 248, 0.18)',
                    color: rep.userName.includes('Nam') ? '#fbbf24' : rep.userName.includes('Mai') ? '#34d399' : '#38bdf8',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    border: `1px solid ${rep.userName.includes('Nam') ? '#fbbf24' : rep.userName.includes('Mai') ? '#34d399' : '#38bdf8'}`
                  }}>
                    {rep.userName.includes('Nam') ? '⚔️ Hiệp sĩ Mùa lũ' : rep.userName.includes('Mai') ? '🛡️ Dẫn đường Trách nhiệm' : '🥉 Cư dân Tích cực'}
                  </span>
                  <span>• {formatTimeAgo(rep.createdAt)}</span>
                </div>

                <button
                  onClick={() => handleConfirm(rep)}
                  disabled={isConfirmed}
                  style={{
                    backgroundColor: isConfirmed ? 'rgba(16, 185, 129, 0.15)' : 'rgba(56, 189, 248, 0.12)',
                    border: isConfirmed ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(56, 189, 248, 0.3)',
                    color: isConfirmed ? '#34d399' : '#38bdf8',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: isConfirmed ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    transition: 'all 0.2s ease'
                  }}
                  title="Hỗ trợ kiểm chứng đám đông điểm ngập này"
                >
                  {isConfirmed ? (
                    <>
                      <Check size={13} /> Đã xác nhận (+5đ)
                    </>
                  ) : (
                    <>
                      <ThumbsUp size={13} /> Xác nhận ngập (+5đ)
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

