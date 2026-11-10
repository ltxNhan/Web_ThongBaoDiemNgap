import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Radio, MoreHorizontal, ArrowRight, ExternalLink } from 'lucide-react';
import { adminRequest } from '../../services/adminApiClient';
import './DashboardPage.css';

interface DashboardPageProps {
  onNavigateTab?: (tab: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigateTab }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapInstance = useRef<any>(null);
  const activeTileLayerRef = useRef<any>(null);
  const markersLayerGroupRef = useRef<any>(null);

  const [mapStyle, setMapStyle] = useState<'hybrid' | 'streets' | 'terrain' | 'dark'>('hybrid');
  const [activeFloodCount, setActiveFloodCount] = useState<number>(7);
  const [pendingReportsCount, setPendingReportsCount] = useState<number>(2);
  const [floodPointsList, setFloodPointsList] = useState<any[]>([]);
  const [hoveredRainValue, setHoveredRainValue] = useState<string | null>(null);
  const [hoveredTideValue, setHoveredTideValue] = useState<string | null>(null);

  // Hàm vẽ toàn bộ các điểm ngập (gồm cả tin báo người dân đã duyệt) lên bản đồ Leaflet
  // Hàm vẽ toàn bộ các điểm ngập VÀ VÙNG NGẬP (Flood Zones) lên bản đồ Leaflet
  const renderMarkersOnMap = (points: any[], mapInstance?: any) => {
    const map = mapInstance || leafletMapInstance.current;
    const L = (window as any).L;
    if (!map || !L || !markersLayerGroupRef.current) return;

    markersLayerGroupRef.current.clearLayers();

    points.forEach((pt: any) => {
      const lat = Number(pt.lat || pt.latitude);
      const lng = Number(pt.lng || pt.longitude);
      if (!lat || !lng || isNaN(lat) || isNaN(lng)) return;

      const depth = Number(pt.depthCm || pt.depth || pt.water_level || 25);
      const isCritical = depth >= 40 || pt.level === 'critical';
      const isDanger = depth >= 25 || pt.level === 'danger';
      const pinColor = isCritical ? '#ef4444' : isDanger ? '#f97316' : '#facc15';
      const levelText = isCritical
        ? `Ngập sâu (~${depth}cm - BĐ3)`
        : isDanger
        ? `Nguy hiểm (~${depth}cm - BĐ2)`
        : `Cảnh báo (~${depth}cm - BĐ1)`;

      // Bán kính vùng ngập thực tế mở rộng xung quanh điểm báo cáo
      const zoneRadius = isCritical ? 350 : isDanger ? 220 : 130;
      const zoneArea = Math.round((Math.PI * zoneRadius * zoneRadius) / 1000); // nghìn m2

      const imageUrl = pt.imageUrl || pt.image_url || pt.image;
      const reporter = pt.reporterName || (pt.source === 'citizen_report' ? 'Người dân báo cáo (Đã duyệt)' : 'Cộng đồng xác nhận');

      const popupHtml = `
        <div class="map-popup-card">
          <div class="popup-card-header">
            <span class="popup-card-title">${pt.street || pt.name || 'Điểm ngập'}</span>
            <span class="popup-badge" style="background:${pinColor}22; color:${pinColor}; border:1px solid ${pinColor};">${levelText}</span>
          </div>
          <div class="popup-row">
            <span class="popup-label">Mực nước ngập:</span>
            <span class="popup-val" style="color:${pinColor}; font-size:1.1rem; font-weight:800;">~${depth} cm</span>
          </div>
          <div class="popup-row">
            <span class="popup-label">Phạm vi vùng ngập:</span>
            <span class="popup-val" style="color:#38bdf8;">Bán kính ~${zoneRadius}m (~${zoneArea}k m²)</span>
          </div>
          <div class="popup-row">
            <span class="popup-label">Khu vực:</span>
            <span class="popup-val">${pt.district || 'TP.HCM'}</span>
          </div>
          <div class="popup-row">
            <span class="popup-label">Nguồn tin:</span>
            <span class="popup-val">${reporter}</span>
          </div>
          <div class="popup-desc">
            ⚠️ <b>Hiện trường:</b> ${pt.description || pt.desc || 'Nước ngập gây cản trở giao thông.'}
          </div>
          ${imageUrl ? `<img src="${imageUrl}" style="width:100%; height:110px; object-fit:cover; border-radius:6px; margin-top:8px; border:1px solid #1e2c48;" alt="Hiện trường" />` : ''}
        </div>
      `;

      // 1. Vẽ VÙNG NGẬP DIỆN RỘNG (Vòng tròn / Polygon loang nước trên ảnh vệ tinh)
      const floodCircle = L.circle([lat, lng], {
        radius: zoneRadius,
        color: pinColor,
        weight: 2,
        opacity: 0.85,
        fillColor: pinColor,
        fillOpacity: isCritical ? 0.38 : isDanger ? 0.30 : 0.22,
        dashArray: isCritical ? '6, 6' : undefined
      }).addTo(markersLayerGroupRef.current);
      floodCircle.bindPopup(popupHtml);

      // 2. Vẽ GHIM TÂM CẢNH BÁO với hiệu ứng sóng Radar Pulse
      const pulseClass = isCritical ? 'pulse-critical' : isDanger ? 'pulse-danger' : '';
      const pinHtml = `
        <div class="map-marker-pin ${pulseClass}" style="background-color: ${pinColor}; width: 32px; height: 32px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center; color: white;
                    font-size: 14px; font-weight: bold; border: 2.5px solid white; box-shadow: 0 0 12px ${pinColor}; cursor: pointer;">
          ⚠
        </div>`;
      const icon = L.divIcon({ html: pinHtml, className: 'map-marker-pin-wrap', iconSize: [32, 32], iconAnchor: [16, 16] });
      const marker = L.marker([lat, lng], { icon }).addTo(markersLayerGroupRef.current);
      marker.bindPopup(popupHtml);
    });
  };

  // 1. Tải danh sách điểm ngập và số lượng báo cáo từ Backend API
  const fetchDashboardData = () => {
    // Lấy toàn bộ điểm ngập (gồm cả tin báo người dân đã duyệt)
    fetch('/api/flood-points')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setActiveFloodCount(data.length);
          setFloodPointsList(data);
          renderMarkersOnMap(data);
        }
      })
      .catch(() => {});

    // Lấy số lượng báo cáo chờ duyệt
    adminRequest<any[]>('/reports/queue')
      .then((data) => {
        if (Array.isArray(data)) {
          const pending = data.filter((r) => r.status === 'pending');
          setPendingReportsCount(pending.length);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // 2. Khởi tạo bản đồ Leaflet GIS
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    if (leafletMapInstance.current) {
      leafletMapInstance.current.remove();
    }

    const map = L.map(mapContainerRef.current, {
      center: [10.7769, 106.7009],
      zoom: 12,
      zoomControl: true
    });

    leafletMapInstance.current = map;

    // Bộ tile layers bản đồ tương ứng 4 nút bấm
    const layers: Record<string, any> = {
      hybrid: L.tileLayer('https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        subdomains: ['0', '1', '2', '3'],
        maxZoom: 20,
        attribution: '&copy; Google Maps'
      }),
      streets: L.tileLayer('https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        subdomains: ['0', '1', '2', '3'],
        maxZoom: 20,
        attribution: '&copy; Google Maps'
      }),
      terrain: L.tileLayer('https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        subdomains: ['0', '1', '2', '3'],
        maxZoom: 20,
        attribution: '&copy; Google Maps'
      }),
      dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; CartoDB & OpenStreetMap'
      })
    };

    const initialLayer = layers[mapStyle];
    initialLayer.addTo(map);
    activeTileLayerRef.current = initialLayer;

    // LayerGroup chứa các Marker để quản lý tập trung và cập nhật linh hoạt
    const markersGroup = L.layerGroup().addTo(map);
    markersLayerGroupRef.current = markersGroup;

    // A. Vùng nguy cơ ngập ĐỎ (Bán đảo Thanh Đa - Ung Văn Khiêm)
    const redZone = L.polygon(
      [
        [10.796, 106.712],
        [10.805, 106.722],
        [10.795, 106.732],
        [10.785, 106.72]
      ],
      { color: '#dc2626', fillColor: '#ef4444', fillOpacity: 0.65, weight: 2 }
    ).addTo(map);

    redZone.bindPopup(`
      <div class="map-popup-card">
        <div class="popup-card-header">
          <span class="popup-card-title">Vùng trũng: Bán đảo Thanh Đa</span>
          <span class="popup-badge" style="background:rgba(239,68,68,0.2); color:#ef4444; border:1px solid #ef4444;">Báo động 3</span>
        </div>
        <div class="popup-row"><span class="popup-label">Mực nước ngập:</span><span class="popup-val" style="color:#ef4444; font-size:1.05rem;">&gt; 45 cm</span></div>
        <div class="popup-row"><span class="popup-label">Quận:</span><span class="popup-val">Bình Thạnh</span></div>
        <div class="popup-row"><span class="popup-label">Nguyên nhân:</span><span class="popup-val">Triều cường sông Sài Gòn</span></div>
        <div class="popup-desc">⚠️ <b>Khuyến cáo:</b> Xe máy chết máy hàng loạt, cấm ô tô gầm thấp lưu thông qua khu vực.</div>
      </div>
    `);

    // B. Vùng nguy cơ ngập CAM (Huỳnh Tấn Phát - Trần Xuân Soạn)
    const orangeZone = L.polygon(
      [
        [10.74, 106.72],
        [10.75, 106.735],
        [10.732, 106.745],
        [10.722, 106.73]
      ],
      { color: '#ea580c', fillColor: '#f97316', fillOpacity: 0.6, weight: 2 }
    ).addTo(map);

    orangeZone.bindPopup(`
      <div class="map-popup-card">
        <div class="popup-card-header">
          <span class="popup-card-title">Vùng ngập: Tuyến Huỳnh Tấn Phát</span>
          <span class="popup-badge" style="background:rgba(249,115,22,0.2); color:#f97316; border:1px solid #f97316;">Báo động 2</span>
        </div>
        <div class="popup-row"><span class="popup-label">Mực nước ngập:</span><span class="popup-val" style="color:#f97316;">25 - 40 cm</span></div>
        <div class="popup-row"><span class="popup-label">Quận:</span><span class="popup-val">Quận 7</span></div>
        <div class="popup-desc">⚠️ <b>Cảnh báo:</b> Đỉnh triều lúc 17:30 - 19:30, khuyến cáo chuyển sang lộ trình Nguyễn Văn Linh.</div>
      </div>
    `);

    // C. Vùng nguy cơ ngập VÀNG (Lưu vực Kênh Nhiêu Lộc)
    const yellowZone = L.polygon(
      [
        [10.805, 106.69],
        [10.812, 106.705],
        [10.801, 106.71]
      ],
      { color: '#ca8a04', fillColor: '#facc15', fillOpacity: 0.55, weight: 1.5 }
    ).addTo(map);

    yellowZone.bindPopup(`
      <div class="map-popup-card">
        <div class="popup-card-header">
          <span class="popup-card-title">Vùng trũng: Lưu vực Kênh Nhiêu Lộc</span>
          <span class="popup-badge" style="background:rgba(250,204,21,0.2); color:#facc15; border:1px solid #facc15;">Báo động 1</span>
        </div>
        <div class="popup-row"><span class="popup-label">Mực nước ngập:</span><span class="popup-val">10 - 20 cm</span></div>
        <div class="popup-desc">ℹ️ <b>Tình hình:</b> Ngập mép lề đường do mưa to, xe cộ di chuyển chậm.</div>
      </div>
    `);

    // Tải và vẽ ngay các điểm ngập hiện tại
    fetch('/api/flood-points')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setActiveFloodCount(data.length);
          setFloodPointsList(data);
          renderMarkersOnMap(data, map);
        }
      })
      .catch(() => {});

    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      if (leafletMapInstance.current) {
        leafletMapInstance.current.remove();
        leafletMapInstance.current = null;
      }
    };
  }, []);

  // 3. Xử lý chuyển đổi kiểu bản đồ
  const handleSwitchMapStyle = (newStyle: 'hybrid' | 'streets' | 'terrain' | 'dark') => {
    setMapStyle(newStyle);
    const map = leafletMapInstance.current;
    const L = (window as any).L;
    if (!map || !L) return;

    if (activeTileLayerRef.current) {
      map.removeLayer(activeTileLayerRef.current);
    }

    let nextLayer: any;
    if (newStyle === 'hybrid') {
      nextLayer = L.tileLayer('https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        subdomains: ['0', '1', '2', '3'],
        maxZoom: 20,
        attribution: '&copy; Google Maps'
      });
    } else if (newStyle === 'streets') {
      nextLayer = L.tileLayer('https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        subdomains: ['0', '1', '2', '3'],
        maxZoom: 20,
        attribution: '&copy; Google Maps'
      });
    } else if (newStyle === 'terrain') {
      nextLayer = L.tileLayer('https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        subdomains: ['0', '1', '2', '3'],
        maxZoom: 20,
        attribution: '&copy; Google Maps'
      });
    } else {
      nextLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; CartoDB & OpenStreetMap'
      });
    }

    nextLayer.addTo(map);
    activeTileLayerRef.current = nextLayer;
  };

  // Zoom tới một địa điểm trên bản đồ khi click vào bảng log
  const handleFocusLocation = (lat: number, lng: number) => {
    const map = leafletMapInstance.current;
    if (map) {
      map.flyTo([lat, lng], 15, { duration: 1.5 });
    }
  };

  return (
    <div className="admin-dashboard-container">
      {/* 1. 4 Top KPI Cards */}
      <section className="admin-kpi-grid">
        {/* KPI 1 */}
        <div className="kpi-stat-card">
          <div className="kpi-title-row">
            <span>Mức cảnh báo toàn TP</span>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value-text danger">Báo động 3</span>
            <div className="kpi-beacon-icon" title="Cảnh báo cấp độ 3">
              <Radio size={20} />
            </div>
          </div>
          <div className="kpi-sub-text" style={{ color: '#ef4444' }}>
            Triều cường vượt 1.70m + Mưa lớn
          </div>
        </div>

        {/* KPI 2 */}
        <div
          className="kpi-stat-card"
          onClick={() => handleFocusLocation(10.7932, 106.7208)}
          style={{ cursor: 'pointer' }}
          title="Bấm để xem các điểm ngập trên bản đồ"
        >
          <div className="kpi-title-row">
            <span>Số điểm ngập</span>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value-text">{activeFloodCount} điểm</span>
            <div className="kpi-badge-icon orange">-</div>
          </div>
          <div className="kpi-sub-text orange">+3 trong 1 giờ qua</div>
        </div>

        {/* KPI 3 */}
        <div className="kpi-stat-card">
          <div className="kpi-title-row">
            <span>Trạng thái mạng lưới</span>
            <div className="kpi-bar-progress">
              <div className="kpi-bar-online" style={{ width: '92%' }} />
              <div className="kpi-bar-offline" style={{ width: '8%' }} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value-text" style={{ fontSize: '1.25rem' }}>
              <strong style={{ color: '#10b981' }}>142 Online</strong> /{' '}
              <strong style={{ color: '#ef4444' }}>8 Offline</strong>
            </span>
          </div>
          <div className="kpi-sub-text">Tổng số: 150 trạm giám sát</div>
        </div>

        {/* KPI 4 */}
        <div
          className="kpi-stat-card"
          onClick={() => onNavigateTab && onNavigateTab('reports')}
          style={{ cursor: 'pointer', border: '1px solid #f59e0b', backgroundColor: 'rgba(245, 158, 11, 0.05)' }}
          title="Bấm để chuyển tới trang Duyệt báo cáo của dân"
        >
          <div className="kpi-title-row">
            <span>Báo cáo chờ duyệt</span>
            <ArrowRight size={14} color="#f59e0b" />
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value-text" style={{ color: '#f59e0b' }}>
              {pendingReportsCount} báo cáo
            </span>
            <div className="kpi-badge-icon yellow">
              <AlertTriangle size={16} />
            </div>
          </div>
          <div className="kpi-sub-text" style={{ color: '#facc15', fontWeight: 600 }}>
            👉 Bấm để duyệt ngay
          </div>
        </div>
      </section>

      {/* 2. Middle Row: Map + 2 Realtime Charts */}
      <section className="dashboard-middle-grid">
        {/* Left: Map */}
        <div className="panel-box-card">
          <div className="panel-box-header">
            <span className="panel-box-title">Bản đồ số giám sát</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                ● Realtime GIS Active ({activeFloodCount} điểm)
              </span>
              <button
                onClick={fetchDashboardData}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                title="Cập nhật lại các điểm ngập"
              >
                <MoreHorizontal size={16} className="panel-header-dots" />
              </button>
            </div>
          </div>

          <div className="dashboard-map-viewport">
            <div id="admin-gis-map" ref={mapContainerRef} />

            {/* Thanh chuyển đổi kiểu bản đồ */}
            <div className="admin-map-style-bar">
              <button
                type="button"
                className={`map-style-btn ${mapStyle === 'hybrid' ? 'active' : ''}`}
                onClick={() => handleSwitchMapStyle('hybrid')}
                title="Bản đồ ảnh vệ tinh Google kết hợp tên đường"
              >
                🛰️ Vệ tinh
              </button>
              <button
                type="button"
                className={`map-style-btn ${mapStyle === 'streets' ? 'active' : ''}`}
                onClick={() => handleSwitchMapStyle('streets')}
                title="Bản đồ đường phố Google Maps"
              >
                🗺️ Đường phố
              </button>
              <button
                type="button"
                className={`map-style-btn ${mapStyle === 'terrain' ? 'active' : ''}`}
                onClick={() => handleSwitchMapStyle('terrain')}
                title="Bản đồ địa hình Google"
              >
                ⛰️ Địa hình
              </button>
              <button
                type="button"
                className={`map-style-btn ${mapStyle === 'dark' ? 'active' : ''}`}
                onClick={() => handleSwitchMapStyle('dark')}
                title="Bản đồ bóng đêm Dark Mode tác chiến"
              >
                🌙 Bản đồ đêm
              </button>
            </div>

            {/* Bottom Left Legend */}
            <div className="admin-map-legend-left">
              <b style={{ color: '#ffffff' }}>Legend</b>
              <div><span className="legend-color-dot" style={{ background: '#facc15' }} />Thấp (&lt;25cm)</div>
              <div><span className="legend-color-dot" style={{ background: '#f97316' }} />Trung bình (~30cm)</div>
              <div><span className="legend-color-dot" style={{ background: '#ea580c' }} />Cao (~35cm)</div>
              <div><span className="legend-color-dot" style={{ background: '#ef4444' }} />Rất cao (&gt;40cm)</div>
            </div>

            {/* Bottom Right Legend */}
            <div className="admin-map-legend-right">
              <div><span className="legend-color-dot" style={{ background: '#10b981' }} />Online</div>
              <div><span className="legend-color-dot" style={{ background: '#94a3b8' }} />Trung /offline</div>
              <div><span className="legend-color-dot" style={{ background: '#ef4444' }} />Faulty</div>
              <div><span className="legend-color-dot" style={{ background: '#dc2626' }} />Faulty loan</div>
            </div>
          </div>
        </div>

        {/* Right: 2 Stacked Realtime Charts */}
        <div className="dashboard-charts-column">
          {/* Chart 1: Rainfall */}
          <div className="chart-panel-box">
            <div className="chart-header-row">
              <span className="chart-title-label">Lượng mưa thời gian thực (Rainfall)</span>
              <span className="chart-unit-label">
                {hoveredRainValue ? (
                  <strong style={{ color: '#38bdf8' }}>{hoveredRainValue}</strong>
                ) : (
                  'mm'
                )}
              </span>
            </div>

            <div className="chart-svg-box">
              <svg width="100%" height="100%" viewBox="0 0 320 140">
                <defs>
                  <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Y-axis labels */}
                <text x="5" y="15" fill="#64748b" fontSize="9">400</text>
                <text x="5" y="45" fill="#64748b" fontSize="9">300</text>
                <text x="5" y="75" fill="#64748b" fontSize="9">200</text>
                <text x="5" y="105" fill="#64748b" fontSize="9">100</text>
                <text x="15" y="125" fill="#64748b" fontSize="9">0</text>

                {/* Axis lines */}
                <line x1="30" y1="125" x2="310" y2="125" stroke="#1e2c48" />

                {/* Rising curve */}
                <path
                  d="M30,120 Q100,115 160,105 T240,65 T290,25 T310,20 L310,125 L30,125 Z"
                  fill="url(#rainGrad)"
                />
                <path
                  d="M30,120 Q100,115 160,105 T240,65 T290,25 T310,20"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                />

                {/* Interactive Points on curve */}
                <circle
                  cx="30"
                  cy="120"
                  r="4"
                  fill="#38bdf8"
                  onMouseEnter={() => setHoveredRainValue('08:00 - 25 mm')}
                  onMouseLeave={() => setHoveredRainValue(null)}
                  style={{ cursor: 'pointer' }}
                />
                <circle
                  cx="120"
                  cy="110"
                  r="4"
                  fill="#38bdf8"
                  onMouseEnter={() => setHoveredRainValue('09:00 - 65 mm')}
                  onMouseLeave={() => setHoveredRainValue(null)}
                  style={{ cursor: 'pointer' }}
                />
                <circle
                  cx="210"
                  cy="85"
                  r="4"
                  fill="#38bdf8"
                  onMouseEnter={() => setHoveredRainValue('12:00 - 185 mm')}
                  onMouseLeave={() => setHoveredRainValue(null)}
                  style={{ cursor: 'pointer' }}
                />
                <circle
                  cx="290"
                  cy="25"
                  r="5"
                  fill="#ef4444"
                  onMouseEnter={() => setHoveredRainValue('13:00 - 380 mm (Mưa lớn)')}
                  onMouseLeave={() => setHoveredRainValue(null)}
                  style={{ cursor: 'pointer' }}
                />

                {/* Timestamps */}
                <text x="30" y="138" fill="#64748b" fontSize="9">08:00</text>
                <text x="120" y="138" fill="#64748b" fontSize="9">09:00</text>
                <text x="210" y="138" fill="#64748b" fontSize="9">12:00</text>
                <text x="285" y="138" fill="#64748b" fontSize="9">13:00</text>
              </svg>
            </div>
          </div>

          {/* Chart 2: Water Level */}
          <div className="chart-panel-box">
            <div className="chart-header-row">
              <span className="chart-title-label">Mực nước triều &amp; sông (Water Level)</span>
              <span className="chart-unit-label" style={{ color: '#ef4444' }}>
                {hoveredTideValue ? (
                  <strong style={{ color: '#facc15' }}>{hoveredTideValue}</strong>
                ) : (
                  '--- Ngưỡng Báo động 3'
                )}
              </span>
            </div>

            <div className="chart-svg-box">
              <svg width="100%" height="100%" viewBox="0 0 320 140">
                <defs>
                  <linearGradient id="tideWaterGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Y labels */}
                <text x="5" y="20" fill="#64748b" fontSize="9">m</text>
                <text x="5" y="55" fill="#64748b" fontSize="9">1.5</text>
                <text x="5" y="85" fill="#64748b" fontSize="9">1</text>
                <text x="5" y="105" fill="#64748b" fontSize="9">0.5</text>
                <text x="15" y="125" fill="#64748b" fontSize="9">0</text>

                {/* Threshold line 1.6m */}
                <line x1="30" y1="52" x2="310" y2="52" stroke="#ef4444" strokeDasharray="3 3" />
                <text x="35" y="47" fill="#cbd5e1" fontSize="9">Ngưỡng Báo động 3: 1.6m</text>

                {/* Water Level Wave Curve */}
                <path
                  d="M30,115 Q70,90 100,55 T160,115 T220,105 T275,35 T310,95 L310,125 L30,125 Z"
                  fill="url(#tideWaterGrad)"
                />
                <path
                  d="M30,115 Q70,90 100,55 T160,115 T220,105 T275,35 T310,95"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                />

                {/* Interactive points */}
                <circle
                  cx="100"
                  cy="55"
                  r="4"
                  fill="#38bdf8"
                  onMouseEnter={() => setHoveredTideValue('09:00 - Triều 1.52m')}
                  onMouseLeave={() => setHoveredTideValue(null)}
                  style={{ cursor: 'pointer' }}
                />
                <circle
                  cx="275"
                  cy="35"
                  r="5"
                  fill="#ef4444"
                  onMouseEnter={() => setHoveredTideValue('17:30 - Đỉnh triều 1.74m (Vượt BĐ3)')}
                  onMouseLeave={() => setHoveredTideValue(null)}
                  style={{ cursor: 'pointer' }}
                />

                {/* Timestamps */}
                <line x1="30" y1="125" x2="310" y2="125" stroke="#1e2c48" />
                <text x="30" y="138" fill="#64748b" fontSize="9">08:00</text>
                <text x="120" y="138" fill="#64748b" fontSize="9">09:00</text>
                <text x="210" y="138" fill="#64748b" fontSize="9">12:00</text>
                <text x="285" y="138" fill="#64748b" fontSize="9">13:00</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bottom Row: Status Table + Model Gauge */}
      <section className="dashboard-bottom-grid">
        {/* Left: Table */}
        <div className="panel-box-card">
          <div className="panel-box-header">
            <span className="panel-box-title">Trạng thái hệ thống &amp; Cảnh báo hiện trường</span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Click dòng để định vị trên bản đồ
            </span>
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Vị trí cảnh báo</th>
                <th>Tình trạng</th>
                <th>Cấp độ</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {floodPointsList.slice(0, 4).map((pt, idx) => {
                const depth = pt.depthCm || pt.depth || pt.water_level || 25;
                const isCritical = depth >= 40;
                const isDanger = depth >= 25;
                const color = isCritical ? '#ef4444' : isDanger ? '#f97316' : '#facc15';
                const level = isCritical ? 'Báo động 3' : isDanger ? 'Báo động 2' : 'Báo động 1';

                return (
                  <tr
                    key={pt.id || idx}
                    onClick={() => handleFocusLocation(Number(pt.lat), Number(pt.lng))}
                    style={{ cursor: 'pointer' }}
                    title={`Bấm để zoom tới ${pt.street}`}
                  >
                    <td style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ExternalLink size={12} color="#38bdf8" />
                      <strong>{pt.street || pt.name}</strong>
                    </td>
                    <td>{pt.description || pt.desc || `Nước ngập ~${depth}cm`}</td>
                    <td>
                      <span style={{ color, fontWeight: 700 }}>● {level}</span>
                    </td>
                    <td>{pt.updatedAt ? new Date(pt.updatedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : 'Vừa xong'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right: Donut Gauge */}
        <div className="model-performance-gauge-card">
          <div style={{ alignSelf: 'flex-start', fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
            Mô hình dự báo <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>(Model Performance)</span>
          </div>

          <div className="gauge-svg-wrap">
            <svg width="140" height="140" viewBox="0 0 140 140">
              {/* Background ring */}
              <circle
                cx="70"
                cy="70"
                r="56"
                fill="none"
                stroke="#16274a"
                strokeWidth="12"
              />
              {/* Progress ring 94.5% */}
              <circle
                cx="70"
                cy="70"
                r="56"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="12"
                strokeDasharray="351.8"
                strokeDashoffset="19.3"
                strokeLinecap="round"
                transform="rotate(-90 70 70)"
              />
            </svg>
            <div className="gauge-center-text">
              <span className="gauge-percentage-txt">94.5%</span>
              <span className="gauge-sub-txt">Độ tin cậy AI</span>
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '6px', textAlign: 'center' }}>
            ✓ Thời gian xử lý: 0.14s | CPU: 12%
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
