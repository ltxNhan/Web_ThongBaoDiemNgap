import React from 'react';
import { FloodPoint } from '../../../types';
import { Badge } from '../../../components/ui/Badge';
import { formatTimeAgo } from '../../../utils/formatDate';

interface ActiveFloodListProps {
  points: FloodPoint[];
  onSelectPoint?: (point: FloodPoint) => void;
}

export const ActiveFloodList: React.FC<ActiveFloodListProps> = ({ points, onSelectPoint }) => {
  return (
    <div className="glass" style={{ borderRadius: '16px', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
          🚨 Tuyến Đường Đang Ngập Sâu
        </h3>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
          Cập nhật tự động từ trạm & người dân
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {points.map((pt) => {
          return (
            <div
              key={pt.id}
              onClick={() => onSelectPoint && onSelectPoint(pt)}
              style={{
                backgroundColor: '#0e1834',
                border: '1px solid #1c2c58',
                borderRadius: '12px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#38bdf8')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1c2c58')}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem', color: '#f1f5f9' }}>
                    {pt.street}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>({pt.district})</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
                  {pt.description || 'Nước dâng do mưa kết hợp triều cường'}
                </p>
                <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                  🕒 Cập nhật: {formatTimeAgo(pt.updatedAt)}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                <span style={{ fontSize: '1.35rem', fontWeight: 800, color: pt.depthCm >= 40 ? '#ef4444' : '#f97316' }}>
                  {pt.depthCm} <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>cm</span>
                </span>
                <Badge level={pt.level}>
                  {pt.level === 'critical' ? 'Rất nguy hiểm' : pt.level === 'danger' ? 'Ngập sâu' : 'Cảnh báo'}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
