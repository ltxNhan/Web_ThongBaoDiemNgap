import React, { useState, useEffect, useRef } from 'react';
import { MapPin, UploadCloud, CheckCircle2 } from 'lucide-react';
import { LeftSidebar } from '../../components/common/LeftSidebar';
import { rewardsStore } from '../../stores/rewardsStore';
import './CommunityPage.css';

interface CommunityPageProps {
  onNavigateTab?: (tab: string) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigateTab }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletInstance = useRef<any>(null);

  // Form states
  const [address, setAddress] = useState('');
  const [floodLevel, setFloodLevel] = useState<'light' | 'moderate' | 'deep'>('light');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [previewImage, setPreviewImage] = useState('/assets/flood-report-1.jpg');

  // Sample community reports matching Screenshot 4
  const [reportsList, setReportsList] = useState([
    {
      id: 'rep-1',
      street: 'Đường Nguyễn Văn Cừ, Quận 5',
      author: 'Nguyễn Văn A',
      time: '15 phút trước',
      desc: 'Ngập sâu (~45cm), nhiều xe chết máy',
      image: '/assets/flood-report-1.jpg',
      verified: true,
      lat: 10.758,
      lng: 106.682
    },
    {
      id: 'rep-2',
      street: 'Đường Huỳnh Tấn Phát, Quận 7',
      author: 'Trần Thị B',
      time: '30 phút trước',
      desc: 'Trạng thái: Ngập trung bình (triều cường dâng)',
      image: '/assets/flood-report-1.jpg',
      verified: true,
      lat: 10.735,
      lng: 106.738
    },
    {
      id: 'rep-3',
      street: 'Đường Lê Đức Thọ, Gò Vấp',
      author: 'Ẩn danh',
      time: '45 phút trước',
      desc: 'Trạng thái: Ngập nhẹ, nước đang rút dần...',
      image: '/assets/flood-report-1.jpg',
      verified: true,
      lat: 10.842,
      lng: 106.665
    }
  ]);

  // Leaflet initialization for quick report map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    if (leafletInstance.current) {
      leafletInstance.current.remove();
    }

    const map = L.map(mapContainerRef.current, {
      center: [10.768, 106.695],
      zoom: 13,
      zoomControl: true
    });

    leafletInstance.current = map;

    L.tileLayer('https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      subdomains: ['0', '1', '2', '3'],
      maxZoom: 20,
      attribution: '&copy; Google Maps'
    }).addTo(map);

    // Add report pins with custom time tags
    const reportPoints = [
      { lat: 10.785, lng: 106.702, tag: 'vừa xong', color: '#ef4444' },
      { lat: 10.768, lng: 106.691, tag: 'vừa xong', color: '#f97316' },
      { lat: 10.745, lng: 106.722, tag: 'vừa xong', color: '#ea580c' },
      { lat: 10.732, lng: 106.678, tag: '10 phút trước', color: '#eab308' }
    ];

    reportPoints.forEach((pt) => {
      const pinHtml = `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="background-color: #0b1532; color: #cbd5e1; font-size: 10px; font-weight: bold;
                      padding: 2px 6px; border-radius: 4px; border: 1px solid #1e3264; white-space: nowrap; margin-bottom: 2px;">
            ${pt.tag}
          </div>
          <div style="width: 22px; height: 22px; border-radius: 50%; background-color: ${pt.color};
                      border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4);"></div>
        </div>`;

      const icon = L.divIcon({
        html: pinHtml,
        className: 'report-map-tag-pin',
        iconSize: [60, 42],
        iconAnchor: [30, 40]
      });

      L.marker([pt.lat, pt.lng], { icon }).addTo(map);
    });

    return () => {
      if (leafletInstance.current) {
        leafletInstance.current.remove();
        leafletInstance.current = null;
      }
    };
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      alert('Vui lòng nhập địa chỉ điểm ngập.');
      return;
    }

    const newReport = {
      id: `rep-${Date.now()}`,
      street: address,
      author: 'Bạn (Người dân)',
      time: 'vừa xong',
      desc: description || `Mức độ ngập: ${floodLevel === 'light' ? 'Dưới 20cm' : floodLevel === 'moderate' ? '20-40cm' : 'Trên 40cm'}`,
      image: previewImage,
      verified: true,
      lat: 10.772,
      lng: 106.698
    };

    setReportsList([newReport, ...reportsList]);
    setAddress('');
    setDescription('');
    alert('Báo cáo của bạn đã được gửi thành công lên hệ thống bản đồ cộng đồng!');
  };

  return (
    <div className="community-page-layout">
      {/* 1. Left Thin Sidebar */}
      <LeftSidebar
        currentTab="community"
        onSelectTab={(tab) => onNavigateTab && onNavigateTab(tab)}
      />

      {/* 2. 3-Column Container */}
      <div className="community-main-container">
        {/* Column 1: GỬI BÁO CÁO NGẬP LỤT TỪ CỘNG ĐỒNG */}
        <section className="community-col-card">
          <h2 className="community-section-heading">GỬI BÁO CÁO NGẬP LỤT TỪ CỘNG ĐỒNG</h2>

          <form onSubmit={handleSubmit}>
            {/* Vị trí ngập */}
            <div className="community-form-field">
              <label className="field-label">Vị trí ngập</label>
              <div className="input-with-button-row">
                <input
                  type="text"
                  className="community-input-text"
                  placeholder="Nhập địa chỉ/tuyến đường"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <button
                  type="button"
                  className="choose-map-btn"
                  onClick={() => alert('Chọn một điểm trên bản đồ nhanh bên cạnh.')}
                >
                  <MapPin size={14} />
                  Chọn vị trí trên bản đồ
                </button>
              </div>
            </div>

            {/* Mức độ ngập */}
            <div className="community-form-field">
              <label className="field-label">Mức độ ngập</label>
              <div className="flood-radio-group">
                <label className="flood-radio-label">
                  <input
                    type="radio"
                    name="floodLevel"
                    value="light"
                    checked={floodLevel === 'light'}
                    onChange={() => setFloodLevel('light')}
                  />
                  Ngập nhẹ (dưới 20cm)
                </label>

                <label className="flood-radio-label">
                  <input
                    type="radio"
                    name="floodLevel"
                    value="moderate"
                    checked={floodLevel === 'moderate'}
                    onChange={() => setFloodLevel('moderate')}
                  />
                  Ngập trung bình (20-40cm - nửa bánh xe)
                </label>

                <label className="flood-radio-label">
                  <input
                    type="radio"
                    name="floodLevel"
                    value="deep"
                    checked={floodLevel === 'deep'}
                    onChange={() => setFloodLevel('deep')}
                  />
                  Ngập sâu (trên 40cm - ngập cả bánh xe)
                </label>
              </div>
            </div>

            {/* Hình ảnh/Video thực tế */}
            <div className="community-form-field">
              <label className="field-label">Hình ảnh/Video thực tế</label>
              <label className="media-upload-dropzone">
                <input
                  type="file"
                  accept="image/*,video/*"
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
                <div className="upload-icon-text-wrap">
                  <UploadCloud size={24} className="upload-icon-svg" />
                  <span>Chọn ảnh/video từ thiết bị của bạn hoặc chụp trực tiếp</span>
                </div>
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Ảnh hiện trường"
                    className="uploaded-preview-thumb"
                  />
                )}
              </label>
            </div>

            {/* Mô tả chi tiết */}
            <div className="community-form-field">
              <label className="field-label">Mô tả chi tiết (Tùy chọn)</label>
              <textarea
                className="community-textarea"
                placeholder="Ví dụ: Nhiều xe chết máy, nước đang dâng nhanh..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Thông tin liên hệ */}
            <div className="community-form-field">
              <label className="field-label">Thông tin liên hệ</label>
              <input
                type="tel"
                className="community-input-text"
                placeholder="Số điện thoại (để xác thực tin báo)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-report-btn">
              GỬI BÁO CÁO NGAY
            </button>
          </form>
        </section>

        {/* Column 2: BẢN ĐỒ BÁO CÁO NHANH */}
        <section className="community-col-card">
          <h2 className="community-section-heading">BẢN ĐỒ BÁO CÁO NHANH</h2>
          <div className="community-map-wrapper">
            <div id="community-leaflet-map" ref={mapContainerRef} />
          </div>
        </section>

        {/* Column 3: CÁC BÁO CÁO MỚI NHẤT (ĐÃ XÁC THỰC) */}
        <section className="community-col-card">
          <h2 className="community-section-heading">CÁC BÁO CÁO MỚI NHẤT (ĐÃ XÁC THỰC)</h2>
          <div className="community-reports-feed">
            {reportsList.map((item) => (
              <div key={item.id} className="report-feed-card">
                <div className="report-card-top">
                  <div className="report-meta-info">
                    <span className="report-street-name">{item.street}</span>
                    <span className="report-author-time" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      Báo cáo bởi <b>{item.author}</b>
                      <span style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        backgroundColor: item.author.includes('A') ? 'rgba(251, 191, 36, 0.18)' : 'rgba(52, 211, 153, 0.18)',
                        color: item.author.includes('A') ? '#fbbf24' : '#34d399',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        border: `1px solid ${item.author.includes('A') ? '#fbbf24' : '#34d399'}`
                      }}>
                        {item.author.includes('A') ? '⚔️ Hiệp sĩ Mùa lũ' : '🛡️ Dẫn đường Trách nhiệm'}
                      </span>
                      • {item.time}
                    </span>
                  </div>
                  {item.image && (
                    <img src={item.image} alt={item.street} className="report-image-thumb" />
                  )}
                </div>

                <div className="report-body-text">{item.desc}</div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  {item.verified && (
                    <div className="report-verified-badge">
                      <CheckCircle2 size={15} />
                      Đã xác thực bởi hệ thống
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      rewardsStore.confirmReport(item.id, item.street);
                      alert(`🎉 +5 Điểm thưởng đã được cộng vào tài khoản của bạn vì đã xác nhận điểm ngập tại ${item.street}!`);
                    }}
                    style={{
                      background: 'rgba(56, 189, 248, 0.15)',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      color: '#38bdf8',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    👍 Xác nhận (+5đ)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
