import React, { useState } from 'react';
import { RescueRequestTable } from './components/RescueRequestTable';
import { DispatchToUnitModal } from './components/DispatchToUnitModal';
import { RescueDispatchItem } from '../../types';

export const RescueDispatchPage: React.FC = () => {
  const [items, setItems] = useState<RescueDispatchItem[]>([
    {
      id: 'SOS-001',
      citizenName: 'Lê Hoàng Minh',
      phone: '0909112233',
      address: 'Hẻm 48 Bình Quới, Phường 28 (Bán đảo Thanh Đa)',
      district: 'Bình Thạnh',
      needType: 'Xuồng cứu sinh (Có 2 cụ già)',
      peopleCount: 4,
      status: 'pending',
      createdAt: '15 phút trước'
    },
    {
      id: 'SOS-002',
      citizenName: 'Võ Thị Mỹ Duyên',
      phone: '0988223344',
      address: 'Đường Huỳnh Tấn Phát, đoạn gần phà Bình Khánh',
      district: 'Nhà Bè',
      needType: 'Cấp cứu y tế & xe cứu hộ ngập',
      peopleCount: 2,
      status: 'dispatched',
      assignedUnit: 'Đội PCCC & CNCH Nhà Bè',
      createdAt: '30 phút trước'
    }
  ]);

  const [activeItem, setActiveItem] = useState<RescueDispatchItem | null>(null);

  const handleDispatchConfirm = (id: string, unitName: string) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, status: 'dispatched', assignedUnit: unitName } : it
      )
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
          Điều Phối & Tiếp Nhận Yêu Cầu Cứu Hộ Khẩn Cấp (114)
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          Bảng điều hành phân bổ xe cứu nạn, xuồng phao cho các trường hợp người dân bị cô lập trong vùng ngập sâu.
        </p>
      </div>

      <RescueRequestTable items={items} onDispatch={setActiveItem} />

      <DispatchToUnitModal
        item={activeItem}
        isOpen={!!activeItem}
        onClose={() => setActiveItem(null)}
        onConfirmDispatch={handleDispatchConfirm}
      />
    </div>
  );
};
