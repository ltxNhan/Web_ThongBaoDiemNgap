import React, { useState } from 'react';
import { Station } from '../../../types';

interface AddStationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStation: (st: Partial<Station>) => void;
}

export const AddStationModal: React.FC<AddStationModalProps> = ({ isOpen, onClose, onAddStation }) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState<'rain' | 'tide' | 'combined'>('combined');
  const [lat, setLat] = useState('10.7890');
  const [lng, setLng] = useState('106.7020');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStation({
      code,
      name,
      type,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      status: 'online',
      currentRainMm: 0,
      currentTideM: 1.2,
      batteryPercent: 100,
      signalDbm: -65,
      lastPing: 'Vừa kích hoạt'
    });
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
      <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', padding: '1.75rem', maxWidth: '480px', width: '100%' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1rem' }}>
          ➕ Khai Báo Trạm Quan Trắc IoT Mới
        </h3>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Mã Trạm (Identifier)</label>
            <input
              type="text"
              required
              placeholder="VD: ST-TRAM-Q7"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', backgroundColor: '#070f24', border: '1px solid #1e3a8a', borderRadius: '8px', color: '#ffffff' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Tên Trạm Đặt Tại Hiện Trường</label>
            <input
              type="text"
              required
              placeholder="VD: Trạm Đo Triều Kênh Tẻ"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', backgroundColor: '#070f24', border: '1px solid #1e3a8a', borderRadius: '8px', color: '#ffffff' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Loại Cảm Biến</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              style={{ width: '100%', padding: '8px 12px', backgroundColor: '#070f24', border: '1px solid #1e3a8a', borderRadius: '8px', color: '#ffffff' }}
            >
              <option value="combined">Kết hợp Đo Mưa & Mực Nước Triều</option>
              <option value="tide">Chỉ Đo Triều (Radar / Cảm biến áp suất)</option>
              <option value="rain">Chỉ Đo Lượng Mưa (Thùng lật tự động)</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Vĩ độ (Lat)</label>
              <input
                type="text"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', backgroundColor: '#070f24', border: '1px solid #1e3a8a', borderRadius: '8px', color: '#ffffff' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Kinh độ (Lng)</label>
              <input
                type="text"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', backgroundColor: '#070f24', border: '1px solid #1e3a8a', borderRadius: '8px', color: '#ffffff' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: '8px 16px', backgroundColor: '#1e293b', color: '#cbd5e1', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              Hủy
            </button>
            <button
              type="submit"
              style={{ padding: '8px 18px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
            >
              Lưu & Kích Hoạt Trạm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
