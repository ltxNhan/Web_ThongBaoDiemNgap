import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneCall, PlusCircle } from 'lucide-react';
import { LeftSidebar } from '../../components/common/LeftSidebar';
import './EmergencyPage.css';

interface EmergencyPageProps {
  onNavigateTab?: (tab: string) => void;
}

export const EmergencyPage: React.FC<EmergencyPageProps> = ({ onNavigateTab }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletInstance = useRef<any>(null);

  const [activeDistrict, setActiveDistrict] = useState<'Quận 7' | 'Nhà Bè' | 'Bình Thạnh'>('Quận 7');
  const [guideTab, setGuideTab] = useState<'before' | 'during' | 'after'>('before');
  const [volunteerPhone, setVolunteerPhone] = useState('0908.114.xxx');

  // Shelters data matching Screenshot 5
  const sheltersData = [
    {
      id: 'sh-1',
      name: 'Nhà thiếu nhi Quận 7 (193 Đường Lâm Văn Bền, Tân Quy, Quận 7)',
      status: 'Đang mở cửa',
      capacity: 'Sức chứa: 500 người',
      image: '/assets/shelter-1.jpg',
      lat: 10.741,
      lng: 106.72
    },
    {
      id: 'sh-2',
      name: 'Trường THPT Hồng Bàng (Đầm Sen, Quận 11)',
      status: 'Đang mở cửa',
      capacity: 'Sức chứa: 300 người',
      image: '/assets/shelter-1.jpg',
      lat: 10.765,
      lng: 106.645
    },
    {
      id: 'sh-3',
      name: 'UBND Phường Hiệp Bình Chánh (TP. Thủ Đức)',
      status: 'Đang mở cửa',
      capacity: 'Sức chứa: 400 người',
      image: '/assets/shelter-1.jpg',
      lat: 10.825,
      lng: 106.715
    }
  ];

  // Leaflet map setup with hospitals and evacuation shelters
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    if (leafletInstance.current) {
      leafletInstance.current.remove();
    }

    const map = L.map(mapContainerRef.current, {
      center: [10.775, 106.7],
      zoom: 12,
      zoomControl: true
    });

    leafletInstance.current = map;

    L.tileLayer('https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      subdomains: ['0', '1', '2', '3'],
      maxZoom: 20,
      attribution: '&copy; Google Maps'
    }).addTo(map);

    // 1. Hospital pins (Red cross icon)
    const hospitals = [
      { name: 'Bệnh viện FV Quận 7', lat: 10.73, lng: 106.72 },
      { name: 'Bệnh viện Quận 7', lat: 10.738, lng: 106.735 },
      { name: 'Bệnh viện Nhân dân Gia Định', lat: 10.803, lng: 106.695 },
      { name: 'Bệnh viện Chợ Rẫy', lat: 10.758, lng: 106.66 }
    ];

    hospitals.forEach((hosp) => {
      const pinHtml = `
        <div style="width: 26px; height: 26px; border-radius: 50%; background-color: #ef4444;
                    display: flex; align-items: center; justify-content: center; color: white;
                    font-size: 14px; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.5);">
          ✚
        </div>`;
      const icon = L.divIcon({
        html: pinHtml,
        className: 'hosp-pin',
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });

      L.marker([hosp.lat, hosp.lng], { icon })
        .addTo(map)
        .bindPopup(`<b>Trạm Y tế / Bệnh viện</b><br>${hosp.name}`);
    });

    // 2. Shelter pins (Green house/shield icon)
    sheltersData.forEach((sh) => {
      const pinHtml = `
        <div style="width: 26px; height: 26px; border-radius: 50%; background-color: #10b981;
                    display: flex; align-items: center; justify-content: center; color: white;
                    font-size: 13px; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.5);">
          🏛
        </div>`;
      const icon = L.divIcon({
        html: pinHtml,
        className: 'shelter-pin',
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });

      L.marker([sh.lat, sh.lng], { icon })
        .addTo(map)
        .bindPopup(`<b>Điểm sơ tán an toàn</b><br>${sh.name}<br>${sh.capacity}`);
    });

    // 3. User location pin
    const userIcon = L.divIcon({
      html: `
        <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #0284c7;
                    display: flex; align-items: center; justify-content: center; color: white;
                    border: 2px solid white; box-shadow: 0 0 10px #38bdf8;">
          📍
        </div>`,
      className: 'user-pin',
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    L.marker([10.772, 106.698], { icon: userIcon })
      .addTo(map)
      .bindPopup('<b>Vị trí hiện tại</b>');

    return () => {
      if (leafletInstance.current) {
        leafletInstance.current.remove();
        leafletInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="emergency-page-layout">
      {/* 1. Left Thin Sidebar */}
      <LeftSidebar
        currentTab="emergency"
        onSelectTab={(tab) => onNavigateTab && onNavigateTab(tab)}
      />

      {/* 2. Main 3-Column Grid */}
      <div className="emergency-main-grid">
        {/* Column 1: Hotline & Điểm sơ tán */}
        <div className="emergency-col">
          {/* Card 1: Số điện thoại cứu hộ */}
          <section className="emergency-card">
            <h2 className="emergency-title">SỐ ĐIỆN THOẠI CỨU HỘ KHẨN CẤP</h2>

            <a href="tel:114" className="hotline-btn red-114">
              <PhoneCall size={20} />
              114 - Cứu nạn, cứu hộ
            </a>

            <a href="tel:115" className="hotline-btn coral-115">
              <PlusCircle size={20} />
              115 - Cấp cứu y tế
            </a>

            <a href="tel:02838291234" className="hotline-btn orange-city">
              <Phone size={18} />
              Hotline Ban Chỉ huy Phòng chống thiên tai TP.HCM: 028.3829.xxxx
            </a>

            <div className="volunteer-rescue-box">
              <div className="volunteer-title">Đội cứu hộ tình nguyện địa phương</div>
              <div className="volunteer-input-row">
                <input
                  type="text"
                  className="volunteer-input"
                  value={volunteerPhone}
                  onChange={(e) => setVolunteerPhone(e.target.value)}
                />
                <button
                  className="call-now-btn"
                  onClick={() => alert(`Đang kết nối cuộc gọi tới ${volunteerPhone}...`)}
                >
                  Nút gọi
                </button>
              </div>
            </div>
          </section>

          {/* Card 2: Điểm trú ẩn & sơ tán */}
          <section className="emergency-card">
            <h2 className="emergency-title">ĐIỂM TRÚ ẨN &amp; SƠ TÁN KHẨN CẤP</h2>

            <div className="district-pill-filter">
              <button
                className={`district-pill ${activeDistrict === 'Quận 7' ? 'active' : ''}`}
                onClick={() => setActiveDistrict('Quận 7')}
              >
                Quận 7
              </button>
              <button
                className={`district-pill ${activeDistrict === 'Nhà Bè' ? 'active' : ''}`}
                onClick={() => setActiveDistrict('Nhà Bè')}
              >
                Nhà Bè
              </button>
              <button
                className={`district-pill ${activeDistrict === 'Bình Thạnh' ? 'active' : ''}`}
                onClick={() => setActiveDistrict('Bình Thạnh')}
              >
                Bình Thạnh
              </button>
            </div>

            <div className="shelters-status-note">
              Danh sách 2-3 điểm sơ tán an toàn gần nhất 🟢 Đang mở cửa
            </div>

            <div className="shelter-items-list">
              {sheltersData.map((item) => (
                <div
                  key={item.id}
                  className="shelter-item-card"
                  onClick={() => {
                    if (leafletInstance.current) {
                      leafletInstance.current.setView([item.lat, item.lng], 15);
                    }
                  }}
                >
                  <img src={item.image} alt={item.name} className="shelter-thumb-img" />
                  <div className="shelter-info-wrap">
                    <div className="shelter-name">{item.name}</div>
                    <div className="shelter-badge-open">🟢 {item.status}</div>
                    <div className="shelter-capacity">{item.capacity}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Column 2: Bản đồ cứu hộ & Y tế */}
        <div className="emergency-col">
          <section className="emergency-map-card">
            <div className="emergency-map-legend-bar">
              <span className="map-legend-badge">
                <span style={{ color: '#ef4444', fontSize: '16px' }}>✚</span>
                Trạm Y tế / Bệnh viện
              </span>
              <span className="map-legend-badge">
                <span style={{ color: '#10b981', fontSize: '16px' }}>🏛</span>
                Điểm sơ tán
              </span>
            </div>

            <div className="emergency-map-container">
              <div id="emergency-leaflet-map" ref={mapContainerRef} />
            </div>

            <div className="emergency-map-footer-note">
              <span className="footer-route-txt">Tìm đường đến điểm cứu hộ gần nhất</span>
              <span className="footer-gps-txt">Chỉ đường dựa trên GPS</span>
            </div>
          </section>
        </div>

        {/* Column 3: Cẩm nang an toàn & Dụng cụ khẩn cấp */}
        <div className="emergency-col">
          {/* Card 1: Cẩm nang an toàn */}
          <section className="emergency-card">
            <h2 className="emergency-title">CẨM NANG AN TOÀN TRƯỚC, TRONG &amp; SAU NGẬP</h2>

            <div className="guide-tabs-row">
              <button
                className={`guide-tab-btn ${guideTab === 'before' ? 'active' : ''}`}
                onClick={() => setGuideTab('before')}
              >
                Trước khi ngập
              </button>
              <button
                className={`guide-tab-btn ${guideTab === 'during' ? 'active' : ''}`}
                onClick={() => setGuideTab('during')}
              >
                Trong khi ngập
              </button>
              <button
                className={`guide-tab-btn ${guideTab === 'after' ? 'active' : ''}`}
                onClick={() => setGuideTab('after')}
              >
                Sau khi ngập
              </button>
            </div>

            <div className="guide-content-table">
              <div className="guide-table-row">
                <div className="guide-period-col">Trước khi ngập</div>
                <div className="guide-details-col">
                  Che chắn nhà cửa, di dời đồ đạc, xe cộ lên cao, sạc đầy pin điện thoại, chuẩn bị nước uống.
                </div>
              </div>

              <div className="guide-table-row">
                <div className="guide-period-col">Trong khi ngập</div>
                <div className="guide-details-col">
                  Ngắt nguồn điện, không đi vào vùng nước sâu/ngập, không lội nước gần cột điện, liên hệ 114 nếu cần cứu hộ.
                </div>
              </div>

              <div className="guide-table-row">
                <div className="guide-period-col">Sau khi ngập</div>
                <div className="guide-details-col">
                  Kiểm tra điện trước khi bật lại, dọn dẹp vệ sinh phòng dịch bệnh, khử trùng nguồn nước sinh hoạt.
                </div>
              </div>
            </div>
          </section>

          {/* Card 2: Dụng cụ khẩn cấp cần chuẩn bị */}
          <section className="emergency-card">
            <h2 className="emergency-title">DỤNG CỤ KHẨN CẤP CẦN CHUẨN BỊ</h2>

            <div className="kit-items-grid">
              <div className="kit-item-box">
                <span className="kit-icon-display">🦺</span>
                <span className="kit-label">Áo phao / Phao cứu sinh</span>
              </div>

              <div className="kit-item-box">
                <span className="kit-icon-display">🔦</span>
                <span className="kit-label">Đèn pin &amp; Pin dự phòng</span>
              </div>

              <div className="kit-item-box">
                <span className="kit-icon-display">🥫</span>
                <span className="kit-label">Thực phẩm khô &amp; Nước uống</span>
              </div>

              <div className="kit-item-box">
                <span className="kit-icon-display">💊</span>
                <span className="kit-label">Túi sơ cứu y tế &amp; Thuốc men</span>
              </div>

              <div className="kit-item-box">
                <span className="kit-icon-display">📱</span>
                <span className="kit-label">Túi chống nước đựng giấy tờ</span>
              </div>

              <div className="kit-item-box">
                <span className="kit-icon-display">📢</span>
                <span className="kit-label">Còi báo động khẩn cấp</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
