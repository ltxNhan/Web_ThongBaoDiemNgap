import React, { useState, useEffect, useRef } from 'react';
import { Plus, Download, Filter, ChevronUp } from 'lucide-react';
import './StationManagementPage.css';

export const StationManagementPage: React.FC = () => {
  const miniMapRef = useRef<HTMLDivElement>(null);
  const leafletInstance = useRef<any>(null);

  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'offline' | 'error'>('all');
  const [selectedStationId, setSelectedStationId] = useState('TR-102');

  const stationsData = [
    {
      code: 'TR-042',
      name: 'Trạm Phú An (Sông Sài Gòn)',
      type: 'Trạm Thủy Văn (Đo triều)',
      district: 'Quận 2 (TP. Thủ Đức)',
      reading: '1.65 m (Cao)',
      status: 'active',
      statusLabel: 'Đang hoạt động',
      lastUpdate: 'Vừa xong',
      lat: 10.793,
      lng: 106.712
    },
    {
      code: 'TR-089',
      name: 'Trạm đo mưa Huỳnh Tấn Phát',
      type: 'Trạm Đo Mưa',
      district: 'Quận 7',
      reading: '42.5 mm',
      status: 'active',
      statusLabel: 'Đang hoạt động',
      lastUpdate: '2 phút trước',
      lat: 10.738,
      lng: 106.735
    },
    {
      code: 'TR-015',
      name: 'Trạm Nguyễn Hữu Cảnh',
      type: 'Trạm Đo Ngập',
      district: 'Bình Thạnh',
      reading: '45 cm (Ngập sâu)',
      status: 'active',
      statusLabel: 'Đang hoạt động',
      lastUpdate: '5 phút trước',
      lat: 10.798,
      lng: 106.718
    },
    {
      code: 'TR-102',
      name: 'Trạm đo mưa Lê Văn Lương',
      type: 'Trạm Đo Mưa',
      district: 'Nhà Bè',
      reading: '—',
      status: 'error',
      statusLabel: '⚠ Mất tín hiệu',
      lastUpdate: '45 phút trước',
      lat: 10.6543,
      lng: 106.7212
    },
    {
      code: 'TR-007',
      name: 'Trạm Thủy Văn Nhà Bè',
      type: 'Trạm Thủy Văn (Đo triều)',
      district: 'Nhà Bè',
      reading: '1.52 m',
      status: 'warning',
      statusLabel: 'Cảnh báo lỗi',
      lastUpdate: '12 phút trước',
      lat: 10.692,
      lng: 106.745
    }
  ];

  const selectedStation =
    stationsData.find((s) => s.code === selectedStationId) || stationsData[3];

  useEffect(() => {
    if (!miniMapRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    if (leafletInstance.current) {
      leafletInstance.current.remove();
    }

    const map = L.map(miniMapRef.current, {
      center: [selectedStation.lat, selectedStation.lng],
      zoom: 13,
      zoomControl: true
    });

    leafletInstance.current = map;

    L.tileLayer(
      'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
      {
        subdomains: ['0', '1', '2', '3'],
        maxZoom: 20,
        attribution: '&copy; Google Maps'
      }
    ).addTo(map);

    const pinHtml = `
      <div style="background-color: #ef4444; width: 26px; height: 26px; border-radius: 50%;
                  display: flex; align-items: center; justify-content: center; color: white;
                  font-weight: bold; font-size: 14px; border: 2px solid white; box-shadow: 0 0 10px #ef4444;">
        📍
      </div>`;
    const icon = L.divIcon({ html: pinHtml, className: 'st-pin', iconSize: [26, 26] });
    L.marker([selectedStation.lat, selectedStation.lng], { icon })
      .addTo(map)
      .bindPopup(`<b>${selectedStation.code}</b><br>${selectedStation.name}`);

    return () => {
      if (leafletInstance.current) {
        leafletInstance.current.remove();
        leafletInstance.current = null;
      }
    };
  }, [selectedStation]);

  const filteredStations = stationsData.filter((s) => {
    if (activeTab === 'active') return s.status === 'active';
    if (activeTab === 'offline') return s.status === 'error';
    if (activeTab === 'error') return s.status === 'warning';
    return true;
  });

  return (
    <div className="stations-page-container">
      {/* Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-title-main">QUẢN LÝ TRẠM QUAN TRẮC</h1>
          <p className="page-sub-title">
            Quản lý và giám sát 150 trạm đo mưa, triều cường và ngập lụt toàn thành phố
          </p>
        </div>

        <div className="header-action-group">
          <button className="btn-primary-blue" onClick={() => alert('Mở popup thêm trạm mới.')}>
            <Plus size={16} />
            Thêm trạm mới
          </button>
          <button className="btn-secondary-outline" onClick={() => alert('Đang xuất file CSV 150 trạm...')}>
            <Download size={14} />
            Tải xuống CSV
          </button>
          <button className="btn-secondary-outline">
            <Filter size={14} />
            Lọc &amp; Tìm kiếm
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs-bar">
        <button
          className={`filter-tab-item ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          Tất cả (150)
        </button>
        <button
          className={`filter-tab-item ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Đang hoạt động (138)
        </button>
        <button
          className={`filter-tab-item ${activeTab === 'offline' ? 'active' : ''}`}
          onClick={() => setActiveTab('offline')}
        >
          Mất tín hiệu (8)
        </button>
        <button
          className={`filter-tab-item ${activeTab === 'error' ? 'active' : ''}`}
          onClick={() => setActiveTab('error')}
        >
          Cảnh báo lỗi (4)
        </button>
      </div>

      {/* 2 Columns Layout */}
      <div className="stations-layout-grid">
        {/* Left: Table */}
        <div className="station-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã trạm</th>
                <th>Tên trạm</th>
                <th>Loại trạm</th>
                <th>Khu vực</th>
                <th>Chỉ số hiện tại</th>
                <th>Trạng thái</th>
                <th>Thời gian cập nhật</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredStations.map((st) => (
                <tr
                  key={st.code}
                  style={{
                    backgroundColor:
                      selectedStationId === st.code ? '#142342' : 'transparent',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedStationId(st.code)}
                >
                  <td style={{ fontWeight: 700, color: '#ffffff' }}>
                    {st.code} {st.status === 'error' && <span style={{ color: '#ef4444' }}>⚠</span>}
                  </td>
                  <td>{st.name}</td>
                  <td>{st.type}</td>
                  <td>{st.district}</td>
                  <td style={{ fontWeight: 700, color: '#f1f5f9' }}>{st.reading}</td>
                  <td>
                    <span className={`station-status-badge ${st.status}`}>
                      {st.statusLabel}
                    </span>
                  </td>
                  <td style={{ color: '#94a3b8' }}>{st.lastUpdate}</td>
                  <td>
                    <div className="action-links-group">
                      <span className="action-link">[Xem]</span>
                      <span className="action-link">[Sửa]</span>
                      <span className="action-link">[Bản đồ]</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Detail Card */}
        <aside className="station-detail-panel">
          <div className="detail-header-title">
            <span>
              CHI TIẾT TRẠM ĐANG CHỌN: {selectedStation.code} ({selectedStation.district}){' '}
              {selectedStation.status === 'error' && <span style={{ color: '#ef4444' }}>⚠</span>}
            </span>
            <ChevronUp size={16} />
          </div>

          <div className="detail-meta-list">
            <div>
              <strong>Loại:</strong> {selectedStation.type}
            </div>
            <div>
              <strong>Tọa độ:</strong> {selectedStation.lat}, {selectedStation.lng}
            </div>
            {selectedStation.status === 'error' && (
              <div style={{ color: '#ef4444' }}>
                <strong>Lỗi:</strong> Không phản hồi tín hiệu từ 23:15 ngày 17/10/2026
              </div>
            )}
          </div>

          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>
            Mini GIS location
          </div>
          <div className="detail-mini-map-box">
            <div id="station-mini-gis-map" ref={miniMapRef} />
          </div>

          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>Trigger</div>
          <div className="trigger-actions-group">
            <button
              className="btn-trigger-action"
              onClick={() => alert(`Gửi lệnh khởi động lại từ xa tới trạm ${selectedStation.code}...`)}
            >
              Khởi động lại từ xa (Restart)
            </button>
            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748b' }}>&amp;</div>
            <button
              className="btn-trigger-action"
              onClick={() => alert(`Đã điều động kỹ thuật viên tới kiểm tra trạm ${selectedStation.code}!`)}
            >
              Gửi kỹ thuật viên kiểm tra
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
