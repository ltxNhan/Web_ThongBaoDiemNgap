import React, { useState } from 'react';
import { Modal } from '../../../components/common/Modal';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { RescueRequest } from '../../../types';

interface RequestRescueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRescue: (data: Partial<RescueRequest>) => void;
}

export const RequestRescueModal: React.FC<RequestRescueModalProps> = ({ isOpen, onClose, onSubmitRescue }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('Bình Thạnh');
  const [needType, setNeedType] = useState<'boat' | 'medical' | 'elderly' | 'evacuation'>('boat');
  const [peopleCount, setPeopleCount] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitRescue({
      citizenName: name,
      phone,
      address,
      district,
      needType,
      peopleCount,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🚨 GỬI YÊU CẦU CỨU HỘ KHẨN CẤP (114)">
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '1.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🚑</div>
          <h4 style={{ color: '#f87171', fontSize: '1.2rem', fontWeight: 800 }}>
            TÍN HIỆU ĐÃ ĐƯỢC CHUYỂN TỚI ĐỘI CỨU HỘ 114
          </h4>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '8px' }}>
            Vui lòng giữ máy điện thoại thông suốt. Cán bộ trực ban sẽ liên hệ lại ngay lập tức. Hãy di chuyển lên vị trí cao nhất có thể.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ padding: '10px 14px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '8px', color: '#fca5a5', fontSize: '0.8rem' }}>
            ⚠️ Chỉ gửi yêu cầu khi tính mạng bị đe dọa hoặc đang bị cô lập hoàn toàn trong vùng ngập sâu.
          </div>

          <Input
            label="Họ và Tên Người Cần Cứu / Người Liên Lạc"
            placeholder="Nguyễn Văn A"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Số Điện Thoại Nhận Cuộc Gọi Khẩn"
            placeholder="0901234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <Input
            label="Địa Chỉ Chi Tiết (Kèm số nhà, ngõ ngách, tầng đang ở)"
            placeholder="Số 45/12 đường Bình Quới, đang ở trên sân thượng"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
                Quận / Huyện
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  backgroundColor: '#0f172a',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontSize: '0.9rem'
                }}
              >
                <option value="Bình Thạnh">Bình Thạnh</option>
                <option value="Quận 7">Quận 7</option>
                <option value="TP. Thủ Đức">TP. Thủ Đức</option>
                <option value="Nhà Bè">Nhà Bè</option>
                <option value="Quận 4">Quận 4</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
                Số Người Cần Cứu
              </label>
              <input
                type="number"
                min={1}
                max={50}
                value={peopleCount}
                onChange={(e) => setPeopleCount(parseInt(e.target.value) || 1)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  backgroundColor: '#0f172a',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
              Nhu Cầu Cứu Trợ Chính
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { key: 'boat', label: 'Cần xuồng cứu sinh' },
                { key: 'medical', label: 'Cần cấp cứu y tế' },
                { key: 'elderly', label: 'Có người già / trẻ nhỏ' },
                { key: 'evacuation', label: 'Sơ tán khẩn cấp' }
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.key}
                  onClick={() => setNeedType(opt.key as any)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: needType === opt.key ? '1px solid #ef4444' : '1px solid #1e293b',
                    backgroundColor: needType === opt.key ? 'rgba(239, 68, 68, 0.2)' : '#0f172a',
                    color: needType === opt.key ? '#f87171' : '#cbd5e1',
                    cursor: 'pointer'
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" variant="danger" size="lg" fullWidth style={{ marginTop: '8px' }}>
            🚨 Gửi Tín Hiệu SOS Đến Đội Cứu Hộ 114
          </Button>
        </form>
      )}
    </Modal>
  );
};
