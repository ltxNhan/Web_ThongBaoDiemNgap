import React from 'react';
import { RescueDispatchItem } from '../../../types';

interface RescueRequestTableProps {
  items: RescueDispatchItem[];
  onDispatch: (item: RescueDispatchItem) => void;
}

export const RescueRequestTable: React.FC<RescueRequestTableProps> = ({ items, onDispatch }) => {
  return (
    <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#070f24', color: '#94a3b8', borderBottom: '1px solid #1c2b54' }}>
              <th style={{ padding: '12px 14px' }}>Mã & Người Báo</th>
              <th style={{ padding: '12px 14px' }}>Địa Chỉ & Quận</th>
              <th style={{ padding: '12px 14px' }}>Nhu Cầu Cứu Hộ</th>
              <th style={{ padding: '12px 14px' }}>Số Người</th>
              <th style={{ padding: '12px 14px' }}>Trạng Thái</th>
              <th style={{ padding: '12px 14px' }}>Đơn Vị Phụ Trách</th>
              <th style={{ padding: '12px 14px', textAlign: 'center' }}>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id} style={{ borderBottom: '1px solid #142142' }}>
                <td style={{ padding: '12px 14px' }}>
                  <b style={{ color: '#f8fafc', display: 'block' }}>{it.citizenName}</b>
                  <span style={{ fontSize: '0.75rem', color: '#38bdf8' }}>📞 {it.phone}</span>
                </td>

                <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>
                  {it.address} ({it.district})
                </td>

                <td style={{ padding: '12px 14px' }}>
                  <span style={{ padding: '3px 8px', borderRadius: '4px', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', fontWeight: 600 }}>
                    {it.needType}
                  </span>
                </td>

                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#f59e0b' }}>
                  {it.peopleCount} người
                </td>

                <td style={{ padding: '12px 14px' }}>
                  <span style={{ color: it.status === 'dispatched' ? '#38bdf8' : '#ef4444', fontWeight: 700 }}>
                    ● {it.status === 'dispatched' ? 'Đã điều xe' : 'Chờ phân công'}
                  </span>
                </td>

                <td style={{ padding: '12px 14px', color: '#94a3b8' }}>
                  {it.assignedUnit || 'Chưa gán đơn vị'}
                </td>

                <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                  <button
                    onClick={() => onDispatch(it)}
                    style={{
                      padding: '6px 14px',
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    🚒 Điều Phối 114
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
