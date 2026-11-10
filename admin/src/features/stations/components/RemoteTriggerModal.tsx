import React, { useState } from 'react';
import { Station } from '../../../types';

interface RemoteTriggerModalProps {
  station: Station | null;
  isOpen: boolean;
  onClose: () => void;
  onRestart: (code: string) => void;
}

export const RemoteTriggerModal: React.FC<RemoteTriggerModalProps> = ({ station, isOpen, onClose, onRestart }) => {
  const [dispatched, setDispatched] = useState(false);

  if (!isOpen || !station) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
      <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', padding: '1.75rem', maxWidth: '480px', width: '100%' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
          ⚡ Điều Khiển Từ Xa: {station.name}
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
          Gửi lệnh MQTT điều khiển vi điều khiển cảm biến hoặc phân công kỹ thuật viên đến hiện trường.
        </p>

        {dispatched ? (
          <div style={{ padding: '14px', backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: '8px', color: '#34d399', fontSize: '0.9rem', textAlign: 'center' }}>
            ✅ Lệnh đã được phát thành công qua mạng vệ tinh / 4G!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => {
                onRestart(station.code);
                setDispatched(true);
                setTimeout(() => { setDispatched(false); onClose(); }, 2000);
              }}
              style={{
                padding: '12px',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              🔄 Khởi Động Lại Trạm Từ Xa (Reboot Modem & Sensor)
            </button>

            <button
              onClick={() => {
                alert(`Đã tạo phiếu công tác điều kỹ thuật viên trực trạm đến kiểm tra ${station.name}!`);
                onClose();
              }}
              style={{
                padding: '12px',
                backgroundColor: '#d97706',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              🛠️ Điều Kỹ Thuật Viên Hiện Trường Kiểm Tra Trực Tiếp
            </button>

            <button
              onClick={onClose}
              style={{
                padding: '10px',
                backgroundColor: '#1e293b',
                color: '#cbd5e1',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Đóng Cửa Sổ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
