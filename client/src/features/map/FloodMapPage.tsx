import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Navigation,
  Layers,
  ChevronUp,
  ChevronDown,
  Megaphone,
  PhoneCall,
  Compass,
  CheckCircle,
  X
} from 'lucide-react';
import { LeftSidebar } from '../../components/common/LeftSidebar';
import { FloodPoint, Station } from '../../types';
import { RouteAvoidance } from './components/RouteAvoidance';
import './FloodMapPage.css';

interface FloodMapPageProps {
  floodPoints: FloodPoint[];
  stations: Station[];
  onNavigateTab?: (tab: string) => void;
  onRequestRescue?: () => void;
}

// Tọa độ tuyến đường an toàn né các điểm ngập
const SAFE_ROUTE_COORDS = [
  [10.772, 106.698], // Điểm xuất phát: Chợ Bến Thành
  [10.768, 106.703], // Đại lộ Hàm Nghi
  [10.765, 106.708], // Hầm vượt sông Sài Gòn (Hầm Thủ Thiêm)
  [10.773, 106.725], // Đại lộ Mai Chí Thọ (Khu Sala - cốt nền cao không ngập)
  [10.789, 106.745], // Nút giao Mai Chí Thọ - Lương Định Của
  [10.802, 106.755], // Nút giao An Phú
  [10.825, 106.768], // Xa Lộ Hà Nội - Cầu Rạch Chiếc
  [10.850, 106.772]  // Đích đến: Ngã tư Thủ Đức
];

// Danh mục địa điểm phục vụ tìm kiếm nhanh tại TP.HCM
const SEARCH_PRESETS: Record<string, { lat: number; lng: number; label: string }> = {
  'binh thanh': { lat: 10.798, lng: 106.718, label: 'Quận Bình Thạnh (Khu vực Ung Văn Khiêm - Nguyễn Hữu Cảnh)' },
  'nguyen huu canh': { lat: 10.793, lng: 106.718, label: 'Đường Nguyễn Hữu Cảnh (Chân cầu vượt)' },
  'quan 7': { lat: 10.732, lng: 106.738, label: 'Quận 7 (Tuyến Huỳnh Tấn Phát)' },
  'huynh tan phat': { lat: 10.732, lng: 106.738, label: 'Đường Huỳnh Tấn Phát, Quận 7' },
  'nha be': { lat: 10.689, lng: 106.702, label: 'Huyện Nhà Bè (Cầu Rạch Đĩa - Lê Văn Lương)' },
  'le van luong': { lat: 10.689, lng: 106.702, label: 'Đường Lê Văn Lương, Nhà Bè' },
  'thu duc': { lat: 10.850, lng: 106.772, label: 'TP. Thủ Đức (Khu vực Chợ Thủ Đức)' },
  'vo van ngan': { lat: 10.851, lng: 106.772, label: 'Đường Võ Văn Ngân, TP. Thủ Đức' },
  'quan 1': { lat: 10.772, lng: 106.698, label: 'Quận 1 (Trung tâm Bến Thành)' },
  'ben thanh': { lat: 10.772, lng: 106.698, label: 'Chợ Bến Thành, Quận 1' },
  'quan 2': { lat: 10.773, lng: 106.725, label: 'Khu Đô thị Sala - Mai Chí Thọ' },
  'go vap': { lat: 10.835, lng: 106.665, label: 'Quận Gò Vấp (Đường Quang Trung)' }
};

export const FloodMapPage: React.FC<FloodMapPageProps> = ({
  floodPoints,
  stations,
  onNavigateTab,
  onRequestRescue
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapInstance = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);

  // References cho từng nhóm layer để bật/tắt checkbox tương tác
  const currentFloodGroupRef = useRef<any>(null);
  const forecastFloodGroupRef = useRef<any>(null);
  const citizenReportsGroupRef = useRef<any>(null);
  const safeRouteGroupRef = useRef<any>(null);
  const sensorStationsGroupRef = useRef<any>(null);
  const markerLookupRef = useRef<Record<string, any>>({});

  const [panelSearchQuery, setPanelSearchQuery] = useState('');
  const [mapSearchQuery, setMapSearchQuery] = useState('');
  const [isControlExpanded, setIsControlExpanded] = useState(true);
  const [isListExpanded, setIsListExpanded] = useState(true);
  const [isSatellite, setIsSatellite] = useState(true);
  const [safeRouteActive, setSafeRouteActive] = useState(false);
  const [showRouteAvoidancePanel, setShowRouteAvoidancePanel] = useState(false);
  const [routeInfoBanner, setRouteInfoBanner] = useState<string | null>(null);
  const [isLegendExpanded, setIsLegendExpanded] = useState(true);

  // Bộ lọc Checkbox bên tay trái
  const [layerFilters, setLayerFilters] = useState({
    currentFlood: true,
    forecastFlood: true,
    citizenReports: true,
    safeRoutes: false,
    sensorStations: true
  });

  const sampleActiveFloods = [
    {
      id: 'f-1',
      title: 'Nguyễn Hữu Cảnh (Bình Thạnh)',
      desc: 'Ngập sâu 45cm - Kẹt xe',
      color: 'red',
      depth: '45 cm',
      warning: 'Cực kỳ nguy hiểm - Báo động 3',
      lat: 10.793,
      lng: 106.718
    },
    {
      id: 'f-2',
      title: 'Huỳnh Tấn Phát (Quận 7)',
      desc: 'Dự báo ngập triều cường',
      color: 'orange',
      depth: '35 cm',
      warning: 'Nguy hiểm - Đỉnh triều 1.72m',
      lat: 10.732,
      lng: 106.738
    },
    {
      id: 'f-3',
      title: 'Lê Văn Lương (Nhà Bè)',
      desc: 'Ngập 35cm',
      color: 'yellow',
      depth: '35 cm',
      warning: 'Cầu Rạch Đĩa tràn bờ',
      lat: 10.689,
      lng: 106.702
    }
  ];

  // Khởi tạo bản đồ 1 lần duy nhất
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    if (leafletMapInstance.current) {
      leafletMapInstance.current.remove();
    }

    const map = L.map(mapContainerRef.current, {
      center: [10.7769, 106.7009],
      zoom: 13,
      zoomControl: false
    });

    leafletMapInstance.current = map;

    // 1. Khởi tạo Tile Layer Google Maps
    const initialTileUrl = isSatellite
      ? 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
      : 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';

    const tileLayer = L.tileLayer(initialTileUrl, {
      subdomains: ['0', '1', '2', '3'],
      attribution: '&copy; Google Maps',
      maxZoom: 20
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // 2. Tạo các LayerGroup độc lập
    const currentFloodGroup = L.layerGroup().addTo(map);
    const forecastFloodGroup = L.layerGroup().addTo(map);
    const citizenReportsGroup = L.layerGroup().addTo(map);
    const safeRouteGroup = L.layerGroup(); // Mặc định ẩn, bật khi bấm nút
    const sensorStationsGroup = L.layerGroup().addTo(map);

    currentFloodGroupRef.current = currentFloodGroup;
    forecastFloodGroupRef.current = forecastFloodGroup;
    citizenReportsGroupRef.current = citizenReportsGroup;
    safeRouteGroupRef.current = safeRouteGroup;
    sensorStationsGroupRef.current = sensorStationsGroup;

    // A. Vẽ các đa giác vùng dự báo ngập lụt
    // 1. Đa giác Đỏ (Bình Thạnh - Thanh Đa)
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
      .addTo(forecastFloodGroup)
      .bindPopup(`
        <div style="min-width: 200px; color: #0f172a; line-height: 1.5;">
          <h4 style="margin: 0 0 4px; color: #dc2626; font-size: 0.95rem;">🚨 Vùng Ngập Sâu &gt;45cm</h4>
          <div><b>Khu vực:</b> Nguyễn Hữu Cảnh - Kênh Thị Nghè</div>
          <div style="margin-top: 4px; font-size: 0.8rem; color: #64748b;">Khuyến cáo hạn chế di chuyển qua khu vực chân cầu.</div>
        </div>
      `);

    // 2. Đa giác Cam (Quận 7 - Huỳnh Tấn Phát)
    L.polygon(
      [
        [10.738, 106.725],
        [10.745, 106.738],
        [10.732, 106.745],
        [10.725, 106.73]
      ],
      { color: '#ea580c', fillColor: '#f97316', fillOpacity: 0.6, weight: 2 }
    )
      .addTo(forecastFloodGroup)
      .bindPopup(`
        <div style="min-width: 200px; color: #0f172a; line-height: 1.5;">
          <h4 style="margin: 0 0 4px; color: #ea580c; font-size: 0.95rem;">⚠️ Vùng Ngập Triều Cường 20-40cm</h4>
          <div><b>Tuyến đường:</b> Huỳnh Tấn Phát (Quận 7)</div>
          <div style="margin-top: 4px; font-size: 0.8rem; color: #64748b;">Đỉnh triều kết hợp gió chướng gây ngập nửa bánh xe.</div>
        </div>
      `);

    // 3. Đa giác Vàng (Bình Thạnh / Phú Nhuận)
    L.polygon(
      [
        [10.803, 106.692],
        [10.809, 106.703],
        [10.802, 106.71],
        [10.798, 106.699]
      ],
      { color: '#ca8a04', fillColor: '#facc15', fillOpacity: 0.55, weight: 1.5 }
    )
      .addTo(forecastFloodGroup)
      .bindPopup(`
        <div style="min-width: 200px; color: #0f172a; line-height: 1.5;">
          <h4 style="margin: 0 0 4px; color: #ca8a04; font-size: 0.95rem;">ℹ️ Vùng Ngập Nhẹ &lt;20cm</h4>
          <div><b>Khu vực:</b> Lưu vực Kênh Nhiêu Lộc</div>
        </div>
      `);

    // B. Thêm điểm ngập hiện tại (⚠)
    const markerLookup: Record<string, any> = {};
    sampleActiveFloods.forEach((item) => {
      const pinColor = item.color === 'red' ? '#ef4444' : item.color === 'orange' ? '#f97316' : '#eab308';
      const pinHtml = `
        <div style="background-color: ${pinColor}; width: 30px; height: 30px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center; color: white;
                    font-weight: bold; font-size: 14px; border: 2.5px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.5); cursor: pointer;">
          ⚠
        </div>`;
      const customIcon = L.divIcon({
        html: pinHtml,
        className: 'flood-pin-icon',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([item.lat, item.lng], { icon: customIcon })
        .addTo(currentFloodGroup)
        .bindPopup(`
          <div style="min-width: 240px; font-family: inherit; color: #0f172a; line-height: 1.5; padding: 2px;">
            <div style="font-weight: 800; font-size: 1.05rem; color: ${pinColor}; margin-bottom: 6px;">
              ⚠️ ${item.title}
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 4px;">
              <span style="color: #64748b;">Mức ngập đo được:</span>
              <strong style="color: ${pinColor}; font-size: 1rem;">${item.depth}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 6px;">
              <span style="color: #64748b;">Tình trạng:</span>
              <span style="font-weight: 600; color: #334155;">${item.desc}</span>
            </div>
            <div style="background: #f1f5f9; padding: 8px 10px; border-radius: 6px; font-size: 0.82rem; color: #334155; border-left: 3px solid ${pinColor};">
              💡 <b>Khuyến cáo:</b> ${item.warning}. Hãy chọn lộ trình vòng để tránh ngập nước và chết máy.
            </div>
          </div>
        `);

      markerLookup[item.id] = marker;
    });

    markerLookupRef.current = markerLookup;

    // C. Thêm các điểm Báo cáo từ người dân (📷)
    const citizenPins = [
      { lat: 10.785, lng: 106.702, title: 'Đường Nguyễn Thị Minh Khai', desc: 'Dân báo ngập 25cm lúc 10 phút trước' },
      { lat: 10.755, lng: 106.671, title: 'Đường Trần Hưng Đạo', desc: 'Nước ngập nhẹ mép vỉa hè' }
    ];
    citizenPins.forEach((cp) => {
      const cIcon = L.divIcon({
        html: `<div style="background-color: #8b5cf6; width: 26px; height: 26px; border-radius: 50%;
                           display: flex; align-items: center; justify-content: center; color: white;
                           font-size: 12px; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.5);">📷</div>`,
        className: 'citizen-pin',
        iconSize: [26, 26]
      });
      L.marker([cp.lat, cp.lng], { icon: cIcon })
        .addTo(citizenReportsGroup)
        .bindPopup(`<b>${cp.title}</b><br>${cp.desc}<br><small style="color:#64748b;">Nguồn: Tin cộng đồng xác nhận</small>`);
    });

    // D. Thêm các Trạm cảm biến đo mực nước IoT (🟢)
    const stSample = [
      { name: 'Trạm Thủy văn Phú An', lat: 10.795, lng: 106.711, rain: '68.5 mm', tide: '1.72 m' },
      { name: 'Trạm Thủy văn Nhà Bè', lat: 10.689, lng: 106.745, rain: '45.0 mm', tide: '1.68 m' }
    ];
    stSample.forEach((st) => {
      const stIcon = L.divIcon({
        html: `<div style="background-color: #10b981; width: 26px; height: 26px; border-radius: 50%;
                           display: flex; align-items: center; justify-content: center; color: white;
                           font-size: 13px; font-weight: bold; border: 2px solid white; box-shadow: 0 0 10px #10b981;">📡</div>`,
        className: 'st-pin',
        iconSize: [26, 26]
      });
      L.marker([st.lat, st.lng], { icon: stIcon })
        .addTo(sensorStationsGroup)
        .bindPopup(`<b>${st.name}</b><br>Mưa: <span style="color:#0284c7; font-weight:bold;">${st.rain}</span> | Triều: <span style="color:#f59e0b; font-weight:bold;">${st.tide}</span>`);
    });

    // E. Tuyến đường an toàn né ngập (Safe Route Polyline)
    const safePolyline = L.polyline(SAFE_ROUTE_COORDS, {
      color: '#10b981',
      weight: 6,
      opacity: 0.95,
      dashArray: '10, 8'
    }).addTo(safeRouteGroup);

    safePolyline.bindPopup(`
      <div style="color: #0f172a; padding: 2px;">
        <h4 style="margin: 0 0 4px; color: #059669;">🟢 Tuyến Đường Tránh Ngập Đề Xuất</h4>
        <div>Lộ trình: Chợ Bến Thành ➔ Hầm Thủ Thiêm ➔ Mai Chí Thọ ➔ TP. Thủ Đức</div>
        <div style="font-size: 0.8rem; color: #64748b; margin-top: 4px;">Tránh hoàn toàn ngập lụt tại Nguyễn Hữu Cảnh và Huỳnh Tấn Phát.</div>
      </div>
    `);

    // Điểm đầu và điểm cuối của lộ trình
    const startIcon = L.divIcon({
      html: `<div style="background:#10b981; color:white; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px; border:2px solid white;">A</div>`,
      iconSize: [24, 24]
    });
    L.marker([10.772, 106.698], { icon: startIcon }).addTo(safeRouteGroup).bindPopup('<b>Điểm xuất phát:</b> Chợ Bến Thành');

    const endIcon = L.divIcon({
      html: `<div style="background:#059669; color:white; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px; border:2px solid white;">B</div>`,
      iconSize: [24, 24]
    });
    L.marker([10.850, 106.772], { icon: endIcon }).addTo(safeRouteGroup).bindPopup('<b>Đích đến an toàn:</b> Ngã tư Thủ Đức');

    // F. Vị trí người dùng hiện tại (Blue pin)
    const userLocationHtml = `
      <div style="background-color: #0284c7; width: 32px; height: 32px; border-radius: 50%;
                  display: flex; align-items: center; justify-content: center; color: white;
                  border: 3px solid #ffffff; box-shadow: 0 0 14px #38bdf8; cursor: pointer;">
        📍
      </div>`;
    const userIcon = L.divIcon({
      html: userLocationHtml,
      className: 'user-pin-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    L.marker([10.772, 106.698], { icon: userIcon })
      .addTo(map)
      .bindPopup('<b>Vị trí hiện tại của bạn</b><br>Khu vực Quận 1 (Chợ Bến Thành)');

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

  // Cập nhật các điểm ngập thời gian thực (gồm cả tin báo người dân vừa được duyệt)
  useEffect(() => {
    const map = leafletMapInstance.current;
    const L = (window as any).L;
    if (!map || !L || !currentFloodGroupRef.current) return;

    // Xóa các marker cũ để vẽ lại dữ liệu mới nhất
    currentFloodGroupRef.current.clearLayers();
    const pointsToUse = floodPoints && floodPoints.length > 0 ? floodPoints : sampleActiveFloods;

    pointsToUse.forEach((item: any) => {
      const lat = Number(item.lat || item.latitude);
      const lng = Number(item.lng || item.longitude);
      if (!lat || !lng || isNaN(lat) || isNaN(lng)) return;

      const depth = Number(item.depthCm || item.depth || 25);
      const pinColor =
        depth >= 40 || item.level === 'critical' || item.color === 'red'
          ? '#ef4444'
          : depth >= 25 || item.level === 'danger' || item.color === 'orange'
          ? '#f97316'
          : '#eab308';
      const isCritical = depth >= 40 || item.level === 'critical' || item.color === 'red';
      const isDanger = depth >= 25 || item.level === 'danger' || item.color === 'orange';


      const title = item.street || item.title || item.name || 'Điểm ngập';
      const desc = item.description || item.desc || `Nước ngập ~${depth}cm`;

      // Bán kính vùng ngập mở rộng theo độ sâu
      const zoneRadius = isCritical ? 350 : isDanger ? 220 : 130;
      const zoneArea = Math.round((Math.PI * zoneRadius * zoneRadius) / 1000);

      // 1. Vẽ VÙNG NGẬP DIỆN RỘNG (Vòng tròn loang nước bán kính thực tế)
      L.circle([lat, lng], {
        radius: zoneRadius,
        color: pinColor,
        weight: 2,
        opacity: 0.85,
        fillColor: pinColor,
        fillOpacity: isCritical ? 0.38 : isDanger ? 0.30 : 0.22,
        dashArray: isCritical ? '6, 6' : undefined
      }).addTo(currentFloodGroupRef.current);

      // 2. Vẽ GHIM TÂM CẢNH BÁO
      const pulseClass = isCritical ? 'pulse-critical' : isDanger ? 'pulse-danger' : '';
      const pinHtml = `
        <div style="background-color: ${pinColor}; width: 32px; height: 32px; border-radius: 50%;
        <div class="flood-pin-wrap ${pulseClass}" style="background-color: ${pinColor}; width: 32px; height: 32px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center; color: white;
                    font-weight: bold; font-size: 14px; border: 2.5px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.5); cursor: pointer;">
          ⚠
        </div>`;
      const customIcon = L.divIcon({
        html: pinHtml,
        className: 'flood-pin-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([lat, lng], { icon: customIcon })
        .addTo(currentFloodGroupRef.current)
        .bindPopup(`
          <div style="min-width: 240px; font-family: inherit; color: #0f172a; line-height: 1.5; padding: 2px;">
            <div style="font-weight: 800; font-size: 1.05rem; color: ${pinColor}; margin-bottom: 6px;">
              ⚠️ ${title}
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 4px;">
              <span style="color: #64748b;">Mức ngập đo được:</span>
              <strong style="color: ${pinColor}; font-size: 1rem;">~${depth} cm</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 6px;">
              <span style="color: #64748b;">Tình trạng:</span>
              <span style="font-weight: 600; color: #334155;">${desc}</span>
            </div>
            ${item.imageUrl ? `<img src="${item.imageUrl}" style="width:100%; height:110px; object-fit:cover; border-radius:6px; margin: 6px 0;" alt="Hiện trường" />` : ''}
            <div style="background: #f1f5f9; padding: 8px 10px; border-radius: 6px; font-size: 0.82rem; color: #334155; border-left: 3px solid ${pinColor};">
              💡 <b>Khuyến cáo:</b> Vùng ngập cảnh báo. Hãy chọn lộ trình né tránh để bảo vệ phương tiện.
            </div>
          </div>
        `);
    });
  }, [floodPoints]);

  // Xử lý bật/tắt lớp vệ tinh Google / đường phố mượt mà không reload map
  useEffect(() => {
    const map = leafletMapInstance.current;
    const L = (window as any).L;
    if (!map || !L) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const nextUrl = isSatellite
      ? 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
      : 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';

    const newTile = L.tileLayer(nextUrl, {
      subdomains: ['0', '1', '2', '3'],
      attribution: '&copy; Google Maps',
      maxZoom: 20
    });

    newTile.addTo(map);
    tileLayerRef.current = newTile;
  }, [isSatellite]);

  // Cập nhật hiển thị theo bộ lọc Checkboxes
  useEffect(() => {
    const map = leafletMapInstance.current;
    if (!map) return;

    // 1. Tình trạng ngập hiện tại
    if (currentFloodGroupRef.current) {
      if (layerFilters.currentFlood && !map.hasLayer(currentFloodGroupRef.current)) {
        map.addLayer(currentFloodGroupRef.current);
      } else if (!layerFilters.currentFlood && map.hasLayer(currentFloodGroupRef.current)) {
        map.removeLayer(currentFloodGroupRef.current);
      }
    }

    // 2. Dự báo ngập lụt (Vùng đa giác)
    if (forecastFloodGroupRef.current) {
      if (layerFilters.forecastFlood && !map.hasLayer(forecastFloodGroupRef.current)) {
        map.addLayer(forecastFloodGroupRef.current);
      } else if (!layerFilters.forecastFlood && map.hasLayer(forecastFloodGroupRef.current)) {
        map.removeLayer(forecastFloodGroupRef.current);
      }
    }

    // 3. Báo cáo từ người dân
    if (citizenReportsGroupRef.current) {
      if (layerFilters.citizenReports && !map.hasLayer(citizenReportsGroupRef.current)) {
        map.addLayer(citizenReportsGroupRef.current);
      } else if (!layerFilters.citizenReports && map.hasLayer(citizenReportsGroupRef.current)) {
        map.removeLayer(citizenReportsGroupRef.current);
      }
    }

    // 4. Tuyến đường tránh ngập
    if (safeRouteGroupRef.current) {
      if (layerFilters.safeRoutes && !map.hasLayer(safeRouteGroupRef.current)) {
        map.addLayer(safeRouteGroupRef.current);
      } else if (!layerFilters.safeRoutes && map.hasLayer(safeRouteGroupRef.current)) {
        map.removeLayer(safeRouteGroupRef.current);
      }
    }

    // 5. Trạm đo mực nước
    if (sensorStationsGroupRef.current) {
      if (layerFilters.sensorStations && !map.hasLayer(sensorStationsGroupRef.current)) {
        map.addLayer(sensorStationsGroupRef.current);
      } else if (!layerFilters.sensorStations && map.hasLayer(sensorStationsGroupRef.current)) {
        map.removeLayer(sensorStationsGroupRef.current);
      }
    }
  }, [layerFilters]);

  // Bật/tắt Checkbox layer
  const toggleLayer = (key: keyof typeof layerFilters) => {
    setLayerFilters((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (key === 'safeRoutes') {
        setSafeRouteActive(next.safeRoutes);
        if (next.safeRoutes) {
          setRouteInfoBanner('🟢 Lộ trình an toàn: Chợ Bến Thành ➔ Hầm Thủ Thiêm ➔ Mai Chí Thọ ➔ TP. Thủ Đức (Tránh hoàn toàn các điểm ngập sâu)');
        } else {
          setRouteInfoBanner(null);
        }
      }
      return next;
    });
  };

  // Nút hành động "Xem tuyến đường tránh"
  const handleToggleSafeRoute = () => {
    setShowRouteAvoidancePanel((prev) => !prev);
  };

  // Áp dụng lộ trình tính toán từ RouteAvoidance lên Leaflet Map
  const handleApplyCalculatedRoute = (
    coords: [number, number][],
    summary: { distanceKm: number; durationMin: number; avoidedSummary: string; isFallback?: boolean }
  ) => {
    setSafeRouteActive(true);
    setLayerFilters((prev) => ({ ...prev, safeRoutes: true }));
    setRouteInfoBanner(`🟢 Lộ trình né ngập (${summary.distanceKm} km - ${summary.durationMin} phút): ${summary.avoidedSummary}`);

    const map = leafletMapInstance.current;
    if (map && (window as any).L && safeRouteGroupRef.current) {
      safeRouteGroupRef.current.clearLayers();
      const L = (window as any).L;

      const dynamicPolyline = L.polyline(coords, {
        color: '#10b981',
        weight: 6,
        opacity: 0.95,
        dashArray: '10, 8'
      }).addTo(safeRouteGroupRef.current);

      dynamicPolyline.bindPopup(`
        <div style="font-family: inherit; font-size: 0.85rem; padding: 4px;">
          <h4 style="margin: 0 0 6px 0; color: #10b981; font-weight: 800;">🟢 Tuyến đường an toàn đã tối ưu</h4>
          <p style="margin: 0 0 4px 0; color: #cbd5e1;">Khoảng cách: <b>${summary.distanceKm} km</b></p>
          <p style="margin: 0 0 4px 0; color: #cbd5e1;">Thời gian ước tính: <b>${summary.durationMin} phút</b></p>
          <p style="margin: 0; color: #38bdf8;">✓ ${summary.avoidedSummary}</p>
        </div>
      `);

      if (coords.length > 0) {
        const startPt = coords[0];
        const endPt = coords[coords.length - 1];

        const startIcon = L.divIcon({
          html: '<div style="background-color:#10b981; color:white; width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px; border:2px solid white; box-shadow:0 0 8px #10b981;">A</div>',
          className: 'safe-route-marker',
          iconSize: [26, 26]
        });
        L.marker(startPt, { icon: startIcon }).addTo(safeRouteGroupRef.current).bindPopup('<b>Điểm xuất phát (A)</b>');

        const endIcon = L.divIcon({
          html: '<div style="background-color:#ef4444; color:white; width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px; border:2px solid white; box-shadow:0 0 8px #ef4444;">B</div>',
          className: 'safe-route-marker',
          iconSize: [26, 26]
        });
        L.marker(endPt, { icon: endIcon }).addTo(safeRouteGroupRef.current).bindPopup('<b>Đích đến an toàn (B)</b>');

        const bounds = L.latLngBounds(coords);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  };

  // Tìm kiếm địa điểm và bay tới vị trí
  const handleExecuteSearch = (query: string) => {
    const cleaned = query.trim().toLowerCase();
    if (!cleaned) return;

    const map = leafletMapInstance.current;
    if (!map) return;

    let matchedCoords: { lat: number; lng: number; label: string } | null = null;
    for (const key of Object.keys(SEARCH_PRESETS)) {
      if (cleaned.includes(key) || key.includes(cleaned)) {
        matchedCoords = SEARCH_PRESETS[key];
        break;
      }
    }

    if (matchedCoords) {
      map.flyTo([matchedCoords.lat, matchedCoords.lng], 15, { duration: 1.2 });
      if ((window as any).L) {
        (window as any).L.popup()
          .setLatLng([matchedCoords.lat, matchedCoords.lng])
          .setContent(`<b>📍 Đã tìm thấy:</b><br>${matchedCoords.label}`)
          .openOn(map);
      }
    } else {
      // Mặc định trung tâm TP.HCM nếu không khớp chính xác
      map.flyTo([10.7769, 106.7009], 14, { duration: 1.2 });
    }
  };

  const handleZoomIn = () => {
    if (leafletMapInstance.current) leafletMapInstance.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (leafletMapInstance.current) leafletMapInstance.current.zoomOut();
  };

  const handleLocateMe = () => {
    if (leafletMapInstance.current) {
      leafletMapInstance.current.flyTo([10.772, 106.698], 16, { duration: 1.2 });
    }
  };

  return (
    <div className="map-page-layout">
      {/* 1. Left Thin Sidebar */}
      <LeftSidebar
        currentTab="map"
        onSelectTab={(tab) => onNavigateTab && onNavigateTab(tab)}
      />

      {/* 2. Left Control Panel */}
      <aside className="map-control-panel">
        <div
          className="panel-header-title"
          onClick={() => setIsControlExpanded(!isControlExpanded)}
        >
          <span>BẢN ĐỒ NGẬP &amp; CẢNH BÁO</span>
          {isControlExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {isControlExpanded && (
          <>
            {/* Search address */}
            <div className="panel-search-box">
              <Search size={14} className="panel-search-icon" />
              <input
                type="text"
                className="panel-search-input"
                placeholder="Nhập địa điểm cần tra cứu (vd: Bình Thạnh, Quận 7)..."
                value={panelSearchQuery}
                onChange={(e) => setPanelSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleExecuteSearch(panelSearchQuery);
                }}
              />
            </div>

            {/* Checkbox layers */}
            <div className="layer-checkbox-group">
              <label className="layer-checkbox-item">
                <input
                  type="checkbox"
                  checked={layerFilters.currentFlood}
                  onChange={() => toggleLayer('currentFlood')}
                />
                Tình trạng ngập hiện tại (Thời gian thực)
              </label>

              <label className="layer-checkbox-item">
                <input
                  type="checkbox"
                  checked={layerFilters.forecastFlood}
                  onChange={() => toggleLayer('forecastFlood')}
                />
                Dự báo ngập lụt (Triều cường / Mưa)
              </label>

              <label className="layer-checkbox-item">
                <input
                  type="checkbox"
                  checked={layerFilters.citizenReports}
                  onChange={() => toggleLayer('citizenReports')}
                />
                Báo cáo từ người dân
              </label>

              <label className="layer-checkbox-item">
                <input
                  type="checkbox"
                  checked={layerFilters.safeRoutes}
                  onChange={() => toggleLayer('safeRoutes')}
                />
                Tuyến đường tránh ngập
              </label>

              <label className="layer-checkbox-item">
                <input
                  type="checkbox"
                  checked={layerFilters.sensorStations}
                  onChange={() => toggleLayer('sensorStations')}
                />
                Trạm đo mực nước
              </label>
            </div>
          </>
        )}

        {/* Section 2: Danh sách đang ngập */}
        <div
          className="panel-section-title"
          onClick={() => setIsListExpanded(!isListExpanded)}
        >
          <span>DANH SÁCH ĐANG NGẬP</span>
          {isListExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {isListExpanded && (
          <div className="panel-flood-cards-list">
            {sampleActiveFloods.map((item) => (
              <div
                key={item.id}
                className={`map-flood-card ${item.color}`}
                onClick={() => {
                  const map = leafletMapInstance.current;
                  if (map) {
                    map.flyTo([item.lat, item.lng], 16, { duration: 1.2 });
                    const marker = markerLookupRef.current[item.id];
                    if (marker) {
                      setTimeout(() => marker.openPopup(), 400);
                    }
                  }
                }}
                style={{ cursor: 'pointer' }}
                title="Bấm để xem trực tiếp vị trí và chi tiết ngập trên bản đồ"
              >
                <div className="card-title-street">{item.title}</div>
                <div className="card-desc-status">{item.desc}</div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA Button */}
        <div className="panel-footer-btn-wrap">
          <button
            className="panel-btn-report-now"
            onClick={() => onNavigateTab && onNavigateTab('report')}
            title="Mở giao diện gửi tin báo ngập có GPS và đính kèm ảnh hiện trường"
          >
            GỬI BÁO CÁO NGẬP NGAY
          </button>
        </div>
      </aside>

      {/* 3. Main Full Map Viewport */}
      <main className="main-map-viewport">
        <div id="leaflet-full-map" ref={mapContainerRef} />

        {/* Floating Route Banner */}
        {routeInfoBanner && (
          <div className="safe-route-banner">
            <CheckCircle size={18} style={{ color: '#10b981', flexShrink: 0 }} />
            <span>{routeInfoBanner}</span>
            <button
              className="safe-route-banner-close"
              onClick={() => handleToggleSafeRoute()}
              title="Đóng lộ trình"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Top-Right Search & GPS */}
        <div className="map-top-right-bar">
          <div className="map-search-input-wrap">
            <Search size={14} />
            <input
              type="text"
              placeholder="Tìm kiếm địa bàn (vd: Thủ Đức, Quận 7, Bình Thạnh)..."
              value={mapSearchQuery}
              onChange={(e) => setMapSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleExecuteSearch(mapSearchQuery);
              }}
            />
          </div>
          <button className="map-gps-btn" onClick={handleLocateMe} title="Định vị vị trí của tôi">
            <Navigation size={18} />
          </button>
        </div>

        {/* Bottom-Left Controls: Zoom & Layers */}
        <div className="map-bottom-left-controls">
          <div className="map-zoom-group">
            <button className="map-zoom-btn-large" onClick={handleZoomIn} title="Phóng to">
              +
            </button>
            <button className="map-zoom-btn-large" onClick={handleZoomOut} title="Thu nhỏ">
              -
            </button>
          </div>

          <button
            className="map-layer-switch-btn"
            onClick={() => setIsSatellite(!isSatellite)}
            title="Chuyển đổi giữa ảnh vệ tinh Google và bản đồ đường phố"
          >
            <Layers size={16} />
            {isSatellite ? '🛰️ Google Vệ tinh' : '🗺️ Google Đường phố'}
          </button>
        </div>

        {/* Bottom Floating Quick Actions (3 buttons matching Screenshot) */}
        <div className="map-floating-quick-actions">
          <button
            className="round-action-btn orange"
            onClick={() => onNavigateTab && onNavigateTab('report')}
            title="Gửi tin báo ngập có GPS và ảnh hiện trường"
          >
            <Megaphone size={16} />
            Báo cáo ngập
          </button>

          <button
            className="round-action-btn red"
            onClick={() => {
              if (onRequestRescue) {
                onRequestRescue();
              } else if (onNavigateTab) {
                onNavigateTab('emergency');
              }
            }}
            title="Gửi yêu cầu cứu nạn khẩn cấp 114"
          >
            <PhoneCall size={16} />
            Cứu hộ khẩn cấp 114
          </button>

          <button
            className={`round-action-btn blue ${safeRouteActive || showRouteAvoidancePanel ? 'active' : ''}`}
            onClick={handleToggleSafeRoute}
            title="Mở bảng tính toán tuyến đường an toàn né các điểm ngập"
          >
            <Compass size={16} />
            {showRouteAvoidancePanel ? 'Đóng bảng tìm đường' : safeRouteActive ? 'Đang né điểm ngập' : 'Tìm đường né ngập'}
          </button>
        </div>

        {/* Floating Route Avoidance Calculator Panel */}
        {showRouteAvoidancePanel && (
          <RouteAvoidance
            onRouteCalculated={handleApplyCalculatedRoute}
            onClose={() => setShowRouteAvoidancePanel(false)}
          />
        )}

        {/* Bottom-Right Legend ("CHÚ GIẢI") */}
        <div className={`map-legend-overlay ${!isLegendExpanded ? 'collapsed' : ''}`}>
          <div
            className="legend-title"
            onClick={() => setIsLegendExpanded(!isLegendExpanded)}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}
            title="Bấm để thu gọn/mở rộng chú giải"
          >
            <span>CHÚ GIẢI</span>
            {isLegendExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
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
      </main>
    </div>
  );
};
