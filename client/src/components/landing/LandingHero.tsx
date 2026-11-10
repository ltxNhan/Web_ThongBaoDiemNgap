import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Compass, Megaphone, Navigation, Search, CheckCircle } from 'lucide-react';
import { FloodPoint, Station } from '../../types';
import '../../features/map/FloodMapPage.css';

interface LandingHeroProps {
  floodPoints?: FloodPoint[];
  stations?: Station[];
  onOpenMap: (presetSearch?: string) => void;
  onExploreHowItWorks?: () => void;
  onRequestRescue?: () => void;
}

// Tuyến đường an toàn né ngập chuẩn của app (Bến Thành -> Hầm Thủ Thiêm -> Mai Chí Thọ -> An Phú -> Thủ Đức)
const SAFE_ROUTE_COORDS = [
  [10.772, 106.698], // Bến Thành
  [10.768, 106.703], // Hàm Nghi
  [10.765, 106.708], // Hầm Thủ Thiêm
  [10.773, 106.725], // Đại lộ Mai Chí Thọ (Cốt nền cao)
  [10.789, 106.745], // Lương Định Của
  [10.802, 106.755], // Nút giao An Phú
  [10.825, 106.768], // Xa Lộ Hà Nội
  [10.850, 106.772]  // Ngã tư Thủ Đức
];

export const LandingHero: React.FC<LandingHeroProps> = ({
  onOpenMap,
  onExploreHowItWorks
}) => {
  const [startPoint, setStartPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [liveSecondsAgo, setLiveSecondsAgo] = useState(21);
  const [isLegendExpanded, setIsLegendExpanded] = useState(true);

  // Map References
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // 4 mức ngập chuẩn của app
  const FLOOD_APP_LEVELS = {
    yellow: { color: '#facc15', label: '<20cm (Ngập nhẹ)' },
    orange: { color: '#f97316', label: '20-40cm (Nguy hiểm)' },
    red: { color: '#ef4444', label: '>40cm (Báo động 3)' },
    forecast: { color: '#7c2d12', label: 'Dự báo ngập' }
  };

  // 4 Chip điểm nóng đồng bộ đúng màu app
  const quickHotspots = [
    { name: 'Nguyễn Hữu Cảnh', depth: 38, color: FLOOD_APP_LEVELS.orange.color },
    { name: 'Huỳnh Tấn Phát', depth: 29, color: FLOOD_APP_LEVELS.orange.color },
    { name: 'Võ Văn Ngân', depth: 18, color: FLOOD_APP_LEVELS.yellow.color },
    { name: 'Thanh Đa', depth: 44, color: FLOOD_APP_LEVELS.red.color }
  ];

  // Live timer
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveSecondsAgo((prev) => (prev > 30 ? 6 : prev + 4));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Khởi tạo bản đồ preview: Leaflet + Google Vệ tinh (chuẩn của app)
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    // Căn giữa khu vực Thủ Thiêm - Bình Thạnh - Quận 1 (Chuẩn bản đồ app)
    const map = L.map(mapContainerRef.current, {
      center: [10.782, 106.726],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true
    });

    mapInstanceRef.current = map;

    // Lớp Google Vệ tinh (Hybrid: ảnh vệ tinh + nhãn đường phố sắc nét, 0 API key)
    L.tileLayer('https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      subdomains: ['0', '1', '2', '3'],
      maxZoom: 20
    }).addTo(map);

    // Zoom control ở góc dưới trái (chuẩn app)
    L.control.zoom({ position: 'bottomleft' }).addTo(map);

    // A. Đa giác ngập lụt đồng bộ với FloodMapPage
    // 1. Đa giác Đỏ (>40cm, Bình Thạnh - Nguyễn Hữu Cảnh)
    L.polygon(
      [
        [10.796, 106.712],
        [10.801, 106.719],
        [10.798, 106.726],
        [10.791, 106.722],
        [10.789, 106.715]
      ],
      { color: '#dc2626', fillColor: '#ef4444', fillOpacity: 0.65, weight: 2 }
    )
      .addTo(map)
      .bindPopup(`
        <div style="min-width: 200px; color: #0f172a; line-height: 1.5; font-family: inherit;">
          <h4 style="margin: 0 0 4px; color: #dc2626; font-size: 0.95rem;">🚨 Vùng Ngập Sâu &gt;45cm</h4>
          <div><b>Khu vực:</b> Nguyễn Hữu Cảnh - Kênh Thị Nghè</div>
          <div style="margin-top: 4px; font-size: 0.8rem; color: #64748b;">Khuyến cáo hạn chế di chuyển qua khu vực chân cầu.</div>
        </div>
      `);

    // 2. Đa giác Cam (20-40cm, Quận 7 - Huỳnh Tấn Phát)
    L.polygon(
      [
        [10.738, 106.725],
        [10.745, 106.738],
        [10.732, 106.745],
        [10.725, 106.730]
      ],
      { color: '#ea580c', fillColor: '#f97316', fillOpacity: 0.6, weight: 2 }
    )
      .addTo(map)
      .bindPopup(`
        <div style="min-width: 200px; color: #0f172a; line-height: 1.5; font-family: inherit;">
          <h4 style="margin: 0 0 4px; color: #ea580c; font-size: 0.95rem;">⚠️ Vùng Ngập Triều Cường 20-40cm</h4>
          <div><b>Tuyến đường:</b> Huỳnh Tấn Phát (Quận 7)</div>
          <div style="margin-top: 4px; font-size: 0.8rem; color: #64748b;">Đỉnh triều kết hợp gió chướng gây ngập nửa bánh xe.</div>
        </div>
      `);

    // 3. Đa giác Vàng (<20cm, Bình Thạnh / Phú Nhuận)
    L.polygon(
      [
        [10.803, 106.692],
        [10.809, 106.703],
        [10.802, 106.710],
        [10.798, 106.699]
      ],
      { color: '#ca8a04', fillColor: '#facc15', fillOpacity: 0.55, weight: 1.5 }
    )
      .addTo(map)
      .bindPopup(`
        <div style="min-width: 200px; color: #0f172a; line-height: 1.5; font-family: inherit;">
          <h4 style="margin: 0 0 4px; color: #ca8a04; font-size: 0.95rem;">ℹ️ Vùng Ngập Nhẹ &lt;20cm</h4>
          <div><b>Khu vực:</b> Lưu vực Kênh Nhiêu Lộc</div>
        </div>
      `);

    // B. Marker điểm ngập hiện tại ⚠ (Đúng component của app)
    const activePoints = [
      { lat: 10.793, lng: 106.718, color: '#ef4444', title: 'Nguyễn Hữu Cảnh', depth: '45 cm' },
      { lat: 10.738, lng: 106.732, color: '#f97316', title: 'Huỳnh Tấn Phát', depth: '29 cm' },
      { lat: 10.851, lng: 106.772, color: '#facc15', title: 'Võ Văn Ngân', depth: '18 cm' }
    ];

    activePoints.forEach((pt) => {
      const pinHtml = `
        <div style="background-color: ${pt.color}; width: 28px; height: 28px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center; color: white;
                    font-weight: bold; font-size: 13px; border: 2px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.5); cursor: pointer;">
          ⚠
        </div>`;
      const icon = L.divIcon({
        html: pinHtml,
        className: 'flood-pin-icon',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      L.marker([pt.lat, pt.lng], { icon })
        .addTo(map)
        .bindPopup(`
          <div style="min-width: 210px; color: #0f172a; line-height: 1.5; font-family: inherit;">
            <div style="font-weight: 800; font-size: 0.95rem; color: ${pt.color}; margin-bottom: 4px;">
              ⚠️ ${pt.title}
            </div>
            <div>Mực nước ngập: <b>${pt.depth}</b></div>
          </div>
        `);
    });

    // C. Vòng định vị GPS (Người dùng đang ở gần Bến Thành)
    const userLocation: [number, number] = [10.772, 106.698];
    L.circle(userLocation, {
      radius: 400,
      color: '#0284c7',
      fillColor: '#38bdf8',
      fillOpacity: 0.2,
      weight: 1.5
    }).addTo(map);

    const gpsHtml = `
      <div style="background-color: #0284c7; width: 14px; height: 14px; border-radius: 50%;
                  border: 2.5px solid white; box-shadow: 0 0 10px rgba(2, 132, 199, 0.8);">
      </div>`;
    L.marker(userLocation, {
      icon: L.divIcon({ html: gpsHtml, className: 'user-gps-dot', iconSize: [14, 14], iconAnchor: [7, 7] })
    }).addTo(map);

    // D. Tuyến đường an toàn né ngập (Nổi bật trên bản đồ vệ tinh)
    L.polyline(SAFE_ROUTE_COORDS, {
      color: '#ffffff',
      weight: 6,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    L.polyline(SAFE_ROUTE_COORDS, {
      color: '#0284c7',
      weight: 4,
      opacity: 1,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenMap(destination || startPoint || 'Nguyễn Hữu Cảnh');
  };

  return (
    <div style={{ backgroundColor: '#070e22', width: '100%', color: '#f1f5f9' }}>
      {/* THANH CẢNH BÁO MỎNG PHÍA TRÊN (ĐỒNG BỘ NỀN & VIỀN APP) */}
      <div
        style={{
          borderBottom: '1px solid #1a2950',
          backgroundColor: '#0b142d',
          padding: '8px 24px',
          fontSize: '0.85rem'
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: FLOOD_APP_LEVELS.orange.color,
                display: 'inline-block',
                flexShrink: 0
              }}
            />
            <span style={{ color: '#ffffff', fontWeight: 600 }}>
              Triều cường đạt 1.62m lúc 18:40, nguy cơ ngập khu vực Q.7, Nhà Bè
            </span>
            <span style={{ color: '#233876' }}>|</span>
            <button
              onClick={() => onOpenMap('Huỳnh Tấn Phát')}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                color: '#38bdf8',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <span>Xem chi tiết</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              color: '#94a3b8',
              flexShrink: 0
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            <span>Cập nhật {liveSecondsAgo} giây trước</span>
          </div>
        </div>
      </div>

      {/* HERO SECTION 2 CỘT */}
      <section
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '36px 24px 0 24px',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '36px',
            alignItems: 'start'
          }}
          className="hero-grid-layout"
        >
          {/* CỘT TRÁI: TIÊU ĐỀ, MÔ TẢ, TÌM ĐƯỜNG, NÚT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="panel-header-title" style={{ padding: 0, color: '#38bdf8', fontSize: '0.85rem' }}>
                HỆ THỐNG CẢNH BÁO NGẬP &amp; ĐIỀU HƯỚNG ĐÔ THỊ
              </span>
            </div>

            {/* Tiêu đề H1 lớn */}
            <h1
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                color: '#ffffff',
                margin: 0,
                letterSpacing: '-0.02em'
              }}
            >
              Đừng để ngập nước <br />
              <span style={{ color: '#38bdf8' }}>
                chặn đường bạn.
              </span>
            </h1>

            {/* Tiêu đề phụ */}
            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.6,
                color: '#94a3b8',
                margin: 0,
                maxWidth: '540px'
              }}
            >
              Bản đồ ngập thời gian thực cho TP.HCM. Biết đường nào ngập sâu bao nhiêu, 
              chọn lộ trình né ngập, và gọi cứu hộ khi cần.
            </p>

            {/* Ô TÌM KIẾM ĐƯỜNG NÉ NGẬP LIỀN MẠCH (TÁI SỬ DỤNG CLASS CỦA APP) */}
            <form
              onSubmit={handleSearch}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#111e42',
                border: '1px solid #203468',
                borderRadius: '9999px',
                padding: '4px 6px 4px 16px',
                maxWidth: '540px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
              }}
              className="search-bar-inline"
            >
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Navigation size={15} style={{ color: '#38bdf8', flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Điểm đi (Mặc định: Vị trí GPS)"
                  value={startPoint}
                  onChange={(e) => setStartPoint(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#f1f5f9',
                    fontSize: '0.88rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ width: '1px', height: '22px', backgroundColor: '#203468', margin: '0 10px' }} />

              <div style={{ flex: 1.1, display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Điểm đến (đường, quận...)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#f1f5f9',
                    fontSize: '0.88rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Nút kiểu viên thuốc của app: round-action-btn blue */}
              <button
                type="submit"
                className="round-action-btn blue"
                style={{ padding: '8px 18px', fontSize: '0.88rem' }}
              >
                <Compass size={15} />
                <span>Tìm đường né ngập</span>
              </button>
            </form>

            {/* CHIP GỢI Ý NHANH (ĐỒNG BỘ 4 MÀU APP: VÀNG, CAM, ĐỎ) */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
                Điểm ngập hiện tại:
              </span>
              {quickHotspots.map((h) => (
                <button
                  key={h.name}
                  type="button"
                  onClick={() => onOpenMap(h.name)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 12px',
                    borderRadius: '9999px',
                    backgroundColor: '#111e42',
                    border: '1px solid #203468',
                    color: '#f1f5f9',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{h.name}</span>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: h.color,
                      display: 'inline-block'
                    }}
                  />
                  <span style={{ color: h.color, fontWeight: 700 }}>
                    {h.depth}cm
                  </span>
                </button>
              ))}
            </div>

            {/* HAI NÚT HÀNH ĐỘNG: NÚT VIÊN THUỐC XANH CỦA APP + LINK CHỮ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingTop: '6px' }}>
              <button
                type="button"
                className="round-action-btn blue"
                onClick={() => onOpenMap()}
                style={{
                  padding: '12px 24px',
                  fontSize: '0.95rem',
                  fontWeight: 700
                }}
              >
                <span>Mở bản đồ ngập TP.HCM</span>
                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                onClick={onExploreHowItWorks}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '8px 0',
                  color: '#94a3b8',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px'
                }}
              >
                <span>Xem cách hoạt động</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* 3 STATS IN HERO (MATCHING MOCKUP: 28 phút | 45 | 2.7km) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                paddingTop: '16px',
                borderTop: '1px solid #1a2950',
                marginTop: '4px'
              }}
            >
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', fontVariantNumeric: 'tabular-nums' }}>
                  28 phút
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
                  Thời gian an toàn
                </div>
              </div>

              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', fontVariantNumeric: 'tabular-nums' }}>
                  45
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
                  Điểm ngập đã né
                </div>
              </div>

              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', fontVariantNumeric: 'tabular-nums' }}>
                  2.7km
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
                  Đoạn đường tránh
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: BẢN ĐỒ HERO (GOOGLE VỆ TINH + CHÚ GIẢI CHUẨN CỦA APP) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '490px',
              borderRadius: '12px',
              border: '1px solid #1a2950',
              overflow: 'hidden',
              backgroundColor: '#070e22',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.65)'
            }}
          >
            {/* The Leaflet DOM node */}
            <div
              ref={mapContainerRef}
              style={{ width: '100%', height: '100%', zIndex: 1 }}
            />

            {/* THẺ NỔI 1: LỘ TRÌNH AN TOÀN (DÙNG ĐÚNG STYLE MAP-FLOOD-CARD CỦA APP) */}
            <div
              className="map-flood-card"
              style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                zIndex: 400,
                borderLeft: '4px solid #10b981',
                boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                minWidth: '240px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                <CheckCircle size={14} style={{ color: '#10b981' }} />
                <span className="card-title-street" style={{ color: '#ffffff' }}>Lộ trình an toàn nhất</span>
              </div>
              <div className="card-desc-status" style={{ color: '#cbd5e1' }}>
                <b style={{ color: '#ffffff' }}>28 phút</b> (8.4 km) • Đã né 3 điểm ngập
              </div>
            </div>

            {/* THẺ NỔI 2: ĐIỂM BÁO NGẬP CỘNG ĐỒNG */}
            <div
              className="map-flood-card orange"
              style={{
                position: 'absolute',
                top: '80px',
                left: '14px',
                zIndex: 400,
                borderLeft: '4px solid #f97316',
                boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                minWidth: '220px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700 }}>
                  BÁO CÁO CỘNG ĐỒNG
                </span>
                <span style={{ fontSize: '0.75rem', color: '#f97316', fontWeight: 800 }}>
                  Nguy hiểm
                </span>
              </div>
              <div className="card-title-street">
                Nguyễn Hữu Cảnh: <span style={{ color: '#f97316' }}>38 cm</span>
              </div>
              <div className="card-desc-status" style={{ fontSize: '0.74rem' }}>
                Chân cầu vượt: Xe máy ngập nửa bánh xe (12 người xác nhận)
              </div>
            </div>

            {/* CHÚ GIẢI GÓC DƯỚI PHẢI (DÙNG ĐÚNG COMPONENT MAP-LEGEND-OVERLAY CỦA APP) */}
            <div className={`map-legend-overlay ${!isLegendExpanded ? 'collapsed' : ''}`} style={{ bottom: '14px', right: '14px' }}>
              <div
                className="legend-title"
                onClick={() => setIsLegendExpanded(!isLegendExpanded)}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}
                title="Bấm để thu gọn/mở rộng chú giải"
              >
                <span>CHÚ GIẢI</span>
              </div>
              {isLegendExpanded && (
                <>
                  <div className="legend-item">
                    <span className="legend-color-box lt20" />
                    &lt;20cm (Ngập nhẹ)
                  </div>
                  <div className="legend-item">
                    <span className="legend-color-box from20to40" />
                    20-40cm (Nguy hiểm)
                  </div>
                  <div className="legend-item">
                    <span className="legend-color-box gt40" />
                    &gt;40cm (Báo động 3)
                  </div>
                  <div className="legend-item">
                    <span className="legend-color-box forecast" />
                    Dự báo ngập
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WAVY DIVIDER LEADING TO NEXT SECTION (MATCHING MOCKUP) */}
      <div style={{ width: '100%', overflow: 'hidden', lineHeight: 0, marginTop: '28px' }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '36px', display: 'block' }}>
          <path
            d="M0 20C320 50 640 0 960 30C1160 50 1340 35 1440 20V60H0V20Z"
            fill="#060c1e"
          />
        </svg>
      </div>

      {/* Responsive styling */}
      <style>{`
        @media (min-width: 1024px) {
          .hero-grid-layout {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .metrics-strip-layout {
            grid-template-columns: 1fr 1fr !important;
            gap: 20px !important;
          }
          .metrics-strip-layout > div {
            border-left: none !important;
            padding: 0 !important;
          }
          .search-bar-inline {
            flex-direction: column !important;
            padding: 10px !important;
            border-radius: 16px !important;
            gap: 8px !important;
          }
          .search-bar-inline > div:nth-child(2) {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
