import React, { useState, useEffect } from 'react';
import { GpsLocationPicker } from './GpsLocationPicker';
import { ImageUploader } from './ImageUploader';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { CitizenReport } from '../../../types';
import { rewardsStore } from '../../../stores/rewardsStore';
import { Sparkles, ShieldAlert, Award, Camera, Flame } from 'lucide-react';

interface ReportFormProps {
  onSubmit: (report: Partial<CitizenReport>) => void;
}

export const ReportForm: React.FC<ReportFormProps> = ({ onSubmit }) => {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [street, setStreet] = useState('');
  const [district, setDistrict] = useState('Bình Thạnh');
  const [depthEstimate, setDepthEstimate] = useState(25);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: 10.793, lng: 106.715 });
  const [submitted, setSubmitted] = useState(false);
  const [earnedResult, setEarnedResult] = useState<{ points: number; breakdown: string[] } | null>(null);

  const [profile, setProfile] = useState(rewardsStore.getProfile());

  useEffect(() => {
    const unsub = rewardsStore.subscribe(() => {
      setProfile({ ...rewardsStore.getProfile() });
    });
    return unsub;
  }, []);

  const rateLimit = rewardsStore.checkDistrictRateLimit(district);
  const accountStatus = rewardsStore.getAccountStatus();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!accountStatus.canSubmit) {
      alert(accountStatus.reason);
      return;
    }

    // Submit report through parent
    onSubmit({
      userName: userName || profile.fullName || 'Người dân ẩn danh',
      userPhone: userPhone || profile.phone || '0900000000',
      street,
      district,
      depthEstimate,
      description,
      image,
      lat: coords.lat,
      lng: coords.lng,
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    // Record reward submission according to business rules
    // (Simulate first reporter if street length is odd or random demo)
    const isFirst = Math.random() > 0.5;
    const rewardRes = rewardsStore.recordReportSubmission({
      district,
      street: street || 'Tuyến đường chưa đặt tên',
      hasImage: !!image,
      isFirstReporter: isFirst
    });

    if (rewardRes.success) {
      setEarnedResult({
        points: rewardRes.pointsEarned,
        breakdown: rewardRes.breakdown
      });
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEarnedResult(null);
    }, 8000);
  };

  const depthPresets = [
    { label: 'Mắt cá chân (~10cm)', value: 10 },
    { label: 'Nửa bánh xe (~25cm)', value: 25 },
    { label: 'Ngập bô xe (~40cm)', value: 40 },
    { label: 'Ngang đùi (>50cm)', value: 55 }
  ];

  return (
    <div className="glass" style={{ borderRadius: '16px', padding: '1.75rem', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
          📢 Gửi Tin Báo Ngập Điểm Nóng
        </h2>
        <span style={{
          backgroundColor: 'rgba(245, 158, 11, 0.15)',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          color: '#fbbf24',
          padding: '2px 8px',
          borderRadius: '999px',
          fontSize: '0.75rem',
          fontWeight: 700
        }}>
          Nhận tới +100 điểm
        </span>
      </div>
      <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
        Thông tin của bạn sẽ được gửi tới Ban chỉ huy phòng chống thiên tai và hiển thị trên bản đồ sau khi kiểm duyệt.
      </p>

      {/* Rewards Incentive & Anti-Spam Banner */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.7)',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        borderRadius: '12px',
        padding: '0.85rem 1rem',
        marginBottom: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#cbd5e1' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 700, color: '#38bdf8' }}>
            <Award size={15} /> Cơ Chế Thưởng Điểm:
          </span>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            Hôm nay: <b style={{ color: rateLimit.countToday >= 3 ? '#f59e0b' : '#34d399' }}>{rateLimit.countToday}/3</b> báo cáo tại {district}
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', fontSize: '0.75rem' }}>
          <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
            +50đ được duyệt
          </span>
          <span style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
            +20đ kèm ảnh/video
          </span>
          <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
            +30đ báo đầu tiên
          </span>
        </div>
      </div>

      {/* Account Restricted Alert (if trust score < 50) */}
      {!accountStatus.canSubmit && (
        <div style={{
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.25rem',
          display: 'flex',
          gap: '12px',
          color: '#f87171'
        }}>
          <ShieldAlert size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fca5a5' }}>
              Tài Khoản Tạm Thời Bị Hạn Chế
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#fecaca', marginTop: '4px' }}>
              {accountStatus.reason}
            </p>
          </div>
        </div>
      )}

      {submitted ? (
        <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '12px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎉</div>
          <h3 style={{ color: '#34d399', fontSize: '1.2rem', fontWeight: 700 }}>Báo Cáo Đã Được Gửi Thành Công!</h3>
          
          {earnedResult && earnedResult.points > 0 ? (
            <div style={{
              margin: '12px auto',
              padding: '10px 16px',
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              borderRadius: '8px',
              maxWidth: '380px'
            }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fbbf24' }}>
                🪙 +{earnedResult.points} Điểm Tích Lũy!
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '6px 0 0', fontSize: '0.8rem', color: '#cbd5e1' }}>
                {earnedResult.breakdown.map((item, idx) => (
                  <li key={idx}>✓ {item}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem', marginTop: '6px' }}>
              {earnedResult?.breakdown[0] || 'Cảm ơn sự đóng góp quý báu của bạn vì cộng đồng an toàn!'}
            </p>
          )}

          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '6px' }}>
            Hệ thống đang đối soát dữ liệu với các trạm quan trắc lân cận để cập nhật lên bản đồ cảnh báo.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', opacity: accountStatus.canSubmit ? 1 : 0.6 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input
              label="Họ Và Tên Người Báo"
              placeholder="Nguyễn Văn A"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              label="Số Điện Thoại (Để xác thực)"
              placeholder="0912345678"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
            <Input
              label="Tuyến Đường / Địa Điểm Ngập"
              placeholder="Đường Ung Văn Khiêm, P.25"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
                Quận / Huyện
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#0f172a',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontSize: '0.95rem'
                }}
              >
                <option value="Bình Thạnh">Bình Thạnh</option>
                <option value="Quận 7">Quận 7</option>
                <option value="TP. Thủ Đức">TP. Thủ Đức</option>
                <option value="Nhà Bè">Nhà Bè</option>
                <option value="Quận 1">Quận 1</option>
                <option value="Quận 4">Quận 4</option>
              </select>
            </div>
          </div>

          {/* Depth selection */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
              Ước Lượng Độ Sâu Mực Nước ({depthEstimate} cm)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '8px' }}>
              {depthPresets.map((p) => (
                <button
                  type="button"
                  key={p.value}
                  onClick={() => setDepthEstimate(p.value)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: depthEstimate === p.value ? '1px solid #38bdf8' : '1px solid #1e293b',
                    backgroundColor: depthEstimate === p.value ? 'rgba(56, 189, 248, 0.2)' : '#0f172a',
                    color: depthEstimate === p.value ? '#38bdf8' : '#cbd5e1'
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <GpsLocationPicker
            onLocationSelected={(lat, lng, addr) => {
              setCoords({ lat, lng });
              if (addr && !street) setStreet(addr);
            }}
          />

          <ImageUploader onImageSelected={setImage} />

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
              Mô Tả Thêm Hiện Trường
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Xe cộ có qua được không? Nước có chảy xiết không? Có nắp cống bị trôi không?"
              style={{
                width: '100%',
                padding: '10px 14px',
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '8px',
                color: '#f8fafc',
                fontSize: '0.95rem',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth>
            🚀 Gửi Tin Báo Ngập Ngay
          </Button>
        </form>
      )}
    </div>
  );
};
