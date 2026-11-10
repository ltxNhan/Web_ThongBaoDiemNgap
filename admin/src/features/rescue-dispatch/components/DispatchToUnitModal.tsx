import React, { useState } from 'react';
import { RescueDispatchItem } from '../../../types';

interface DispatchToUnitModalProps {
  item: RescueDispatchItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmDispatch: (id: string, unitName: string) => void;
}

export const DispatchToUnitModal: React.FC<DispatchToUnitModalProps> = ({ item, isOpen, onClose, onConfirmDispatch }) => {
  const [selectedUnit, setSelectedUnit] = useState('Đội Cảnh Sát PCCC & CNCH Khu Vực 1 (Quận 1, 4)');

  if (!isOpen || !item) return null;

  const units = [
    'Đội Cảnh Sát PCCC & CNCH Khu Vực 1 (Quận 1, 4)',
    'Đội Cứu Nạn Cứu Hộ Bình Thạnh (Trực chiến Thanh Đa)',
    'Đội Cứu Nạn Cứu Hộ Quận 7 (Trực chiến Huỳnh Tấn Phát)',
    'Đội Tuần Tra & Ứng Cứu Đường Thủy TP. Thủ Đức'
  ];

  const handleConfirm = () => {
    onConfirmDispatch(item.id, selectedUnit);
    alert(`Đã phát lệnh điều phối kíp xe & xuồng cứu nạn từ [${selectedUnit}] tới địa chỉ: ${item.address}!`);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
      <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', padding: '1.75rem', maxWidth: '480px', width: '100%' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
          🚒 Điều Động Đơn Vị Cứu Hộ 114
        </h3>

        <div style={{ padding: '12px', backgroundColor: '#070f24', borderRadius: '10px', marginBottom: '1rem', fontSize: '0.85rem' }}>
          <div style={{ color: '#ffffff', fontWeight: 700 }}>Người gặp nạn: {item.citizenName} ({item.phone})</div>
          <div style={{ color: '#94a3b8', marginTop: '4px' }}>Địa chỉ: {item.address} ({item.district})</div>
          <div style={{ color: '#f87171', marginTop: '4px', fontWeight: 600 }}>Cần hỗ trợ: {item.needType} ({item.peopleCount} người)</div>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
            Chỉ Định Đơn Vị Tiếp Nhận & Xuất Quân:
          </label>
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', backgroundColor: '#070f24', border: '1px solid #1e3a8a', borderRadius: '8px', color: '#ffffff', fontSize: '0.85rem' }}
          >
            {units.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            onClick={onClose}
            style={{ padding: '8px 16px', backgroundColor: '#1e293b', color: '#cbd5e1', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Hủy Bỏ
          </button>
          <button
            onClick={handleConfirm}
            style={{ padding: '8px 18px', backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
          >
            Xuất Lệnh Điều Xe Cứu Hộ
          </button>
        </div>
      </div>
    </div>
  );
};
