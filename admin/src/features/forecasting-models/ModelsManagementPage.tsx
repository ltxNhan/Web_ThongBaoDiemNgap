import React, { useState } from 'react';
import { Play, Settings, History, AlertTriangle } from 'lucide-react';
import './ModelsManagementPage.css';

export const ModelsManagementPage: React.FC = () => {
  const [modelFilter, setModelFilter] = useState<'all' | 'running' | 'paused' | 'error'>('all');
  const [timeRange, setTimeRange] = useState<'3h' | '6h' | '12h'>('3h');

  return (
    <div className="models-page-container">
      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-title-main">MÔ HÌNH DỰ BÁO &amp; PHÂN TÍCH</h1>
          <p className="page-sub-title">
            Giám sát, chạy mô hình AI &amp; thủy lực để dự báo mưa, triều cường, ngập lụt đô thị
          </p>
        </div>

        <div className="header-action-group">
          <button
            className="btn-secondary-outline"
            onClick={() => alert('Đang kích hoạt chạy tất cả các mô hình AI thủ công...')}
          >
            <Play size={14} />
            Chạy mô hình thủ công
          </button>
          <button className="btn-secondary-outline">
            <Settings size={14} />
            Cấu hình thuật toán
          </button>
          <button className="btn-secondary-outline">
            <History size={14} />
            Lịch sử chạy
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs-bar">
        <button
          className={`filter-tab-item ${modelFilter === 'all' ? 'active' : ''}`}
          onClick={() => setModelFilter('all')}
        >
          Tất cả mô hình (6)
        </button>
        <button
          className={`filter-tab-item ${modelFilter === 'running' ? 'active' : ''}`}
          onClick={() => setModelFilter('running')}
        >
          Đang chạy (3)
        </button>
        <button
          className={`filter-tab-item ${modelFilter === 'paused' ? 'active' : ''}`}
          onClick={() => setModelFilter('paused')}
        >
          Tạm dừng (2)
        </button>
        <button
          className={`filter-tab-item ${modelFilter === 'error' ? 'active' : ''}`}
          onClick={() => setModelFilter('error')}
        >
          Lỗi hệ thống (1)
        </button>
      </div>

      {/* Main Grid: 2x2 Model Cards + System Resource */}
      <div className="models-main-grid">
        {/* Left: 4 Model Cards */}
        <div className="model-cards-2x2">
          {/* Card 1: AI 24h */}
          <div className="model-item-card active-border">
            <div className="model-card-header-row">
              <span className="model-title-text">Mô hình AI dự báo ngập 24h</span>
              <span className="badge-status-pill running">Đang chạy</span>
            </div>
            <div className="model-score-text">Độ chính xác: 94.5%</div>

            <div className="model-chart-area">
              <svg width="100%" height="80" viewBox="0 0 200 80">
                <line x1="10" y1="70" x2="190" y2="70" stroke="#1e2c48" />
                {/* Predicted curve (blue dashed) */}
                <path
                  d="M10,65 Q50,60 80,45 T140,25 T190,45"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
                {/* Actual curve (red solid) */}
                <path
                  d="M10,68 Q50,62 80,48 T140,20 T190,48"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
                <text x="30" y="15" fill="#38bdf8" fontSize="8">--- Dự báo</text>
                <text x="90" y="15" fill="#ef4444" fontSize="8">── Thực tế</text>
              </svg>
            </div>

            <div className="model-footer-meta">
              <span>Last run: 5 phút trước</span>
              <span>Mỗi 15p</span>
            </div>
          </div>

          {/* Card 2: Mike Flood */}
          <div className="model-item-card">
            <div className="model-card-header-row">
              <span className="model-title-text">Mô hình thủy lực 1D/2D (Mike Fl...</span>
              <span className="badge-status-pill running">Đang chạy</span>
            </div>
            <div className="model-score-text">Độ hội tụ: 91.2%</div>

            <div className="model-chart-area">
              <svg width="100%" height="80" viewBox="0 0 200 80">
                <line x1="10" y1="70" x2="190" y2="70" stroke="#1e2c48" />
                {/* Vertical bars */}
                <rect x="20" y="30" width="8" height="40" fill="#10b981" rx="1" />
                <rect x="35" y="25" width="8" height="45" fill="#10b981" rx="1" />
                <rect x="50" y="20" width="8" height="50" fill="#10b981" rx="1" />
                <rect x="65" y="15" width="8" height="55" fill="#10b981" rx="1" />
                <rect x="80" y="20" width="8" height="50" fill="#10b981" rx="1" />
                <rect x="95" y="25" width="8" height="45" fill="#10b981" rx="1" />
                <rect x="110" y="22" width="8" height="48" fill="#10b981" rx="1" />
                <rect x="125" y="18" width="8" height="52" fill="#10b981" rx="1" />
                <rect x="140" y="20" width="8" height="50" fill="#10b981" rx="1" />
                <rect x="155" y="28" width="8" height="42" fill="#facc15" rx="1" />
                <rect x="170" y="35" width="8" height="35" fill="#64748b" rx="1" />
              </svg>
            </div>

            <div className="model-footer-meta">
              <span>Last run: 12 phút trước</span>
            </div>
          </div>

          {/* Card 3: Radar Rainfall */}
          <div className="model-item-card">
            <div className="model-card-header-row">
              <span className="model-title-text">Mô hình dự báo mưa Radar</span>
              <span className="badge-status-pill running">Đang chạy</span>
            </div>
            <div className="model-score-text">Độ tin cậy: 88.7%</div>

            <div className="model-chart-area">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="36" fill="none" stroke="#16274a" strokeWidth="1.5" />
                <circle cx="40" cy="40" r="26" fill="none" stroke="#0284c7" strokeWidth="1.5" />
                <circle cx="40" cy="40" r="16" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="40" cy="40" r="6" fill="#38bdf8" />
              </svg>
            </div>

            <div className="model-footer-meta">
              <span>Last run: 2 phút trước</span>
            </div>
          </div>

          {/* Card 4: Tidal propagation */}
          <div className="model-item-card">
            <div className="model-card-header-row">
              <span className="model-title-text">Mô hình lan truyền triều cường</span>
              <span className="badge-status-pill error">Lỗi kết nối ⚠</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 600 }}>
              ⚠ Kèm các số alerts
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4 }}>
              Last run: failed due to incomplete telemetry data from Station Phú An.
            </div>

            <div className="model-footer-meta">
              <span style={{ color: '#ef4444' }}>Cần cấu hình lại</span>
            </div>
          </div>
        </div>

        {/* Right: System Resource Panel */}
        <aside className="system-resource-panel">
          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff' }}>
            Mô hình AI dự báo ngập 24h <span style={{ color: '#38bdf8' }}>(#MOD-AI24H)</span>
          </div>

          {/* Time range tabs */}
          <div className="resource-map-header-tabs">
            <button
              className={`time-range-tab-btn ${timeRange === '3h' ? 'active' : ''}`}
              onClick={() => setTimeRange('3h')}
            >
              3 hours
            </button>
            <button
              className={`time-range-tab-btn ${timeRange === '6h' ? 'active' : ''}`}
              onClick={() => setTimeRange('6h')}
            >
              6 hours
            </button>
            <button
              className={`time-range-tab-btn ${timeRange === '12h' ? 'active' : ''}`}
              onClick={() => setTimeRange('12h')}
            >
              12 hours
            </button>
          </div>

          {/* Preview heat map */}
          <div className="district-heat-preview-box">
            <svg width="100%" height="100%" viewBox="0 0 160 140">
              <polygon
                points="40,20 80,10 120,40 140,80 120,120 70,130 30,100 20,60"
                fill="#facc15"
                fillOpacity="0.4"
                stroke="#eab308"
                strokeWidth="1.5"
              />
              <polygon
                points="60,40 100,30 115,70 100,100 55,90"
                fill="#f97316"
                fillOpacity="0.6"
              />
              <polygon
                points="75,55 95,50 100,75 80,85"
                fill="#ef4444"
                fillOpacity="0.8"
              />
              <text x="45" y="132" fill="#cbd5e1" fontSize="9" fontWeight="bold">
                Ho Chi Minh City Map
              </text>
            </svg>
          </div>

          {/* Gauges */}
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>
            System Resource:
          </div>
          <div className="system-gauges-double-row">
            <div className="donut-gauge-item">
              <div className="donut-svg-wrap">
                <svg width="76" height="76" viewBox="0 0 76 76">
                  <circle cx="38" cy="38" r="30" fill="none" stroke="#162238" strokeWidth="6" />
                  <circle
                    cx="38"
                    cy="38"
                    r="30"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="6"
                    strokeDasharray="188.4"
                    strokeDashoffset="67.8"
                    strokeLinecap="round"
                    transform="rotate(-90 38 38)"
                  />
                </svg>
                <span className="donut-center-pct">64%</span>
              </div>
              <span className="donut-label-txt">CPU</span>
            </div>

            <div className="donut-gauge-item">
              <div className="donut-svg-wrap">
                <svg width="76" height="76" viewBox="0 0 76 76">
                  <circle cx="38" cy="38" r="30" fill="none" stroke="#162238" strokeWidth="6" />
                  <circle
                    cx="38"
                    cy="38"
                    r="30"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="6"
                    strokeDasharray="188.4"
                    strokeDashoffset="22.6"
                    strokeLinecap="round"
                    transform="rotate(-90 38 38)"
                  />
                </svg>
                <span className="donut-center-pct">88%</span>
              </div>
              <span className="donut-label-txt">GPU (Tesla A100)</span>
            </div>
          </div>

          {/* Memory Bar */}
          <div className="memory-bar-wrap">
            <div className="memory-labels-row">
              <span>Memory</span>
              <span>42.8 GB / 64 GB</span>
            </div>
            <div className="memory-track">
              <div className="memory-fill" style={{ width: '67%' }} />
            </div>
          </div>

          {/* Metadata */}
          <div className="model-engine-meta-list">
            <div>
              <strong>Model Engine:</strong> LSTM Neural Network v3.4
            </div>
            <div>
              <strong>Data Inputs:</strong>
            </div>
            <div style={{ paddingLeft: '8px' }}>Trạm đo mưa: (32/32)</div>
            <div style={{ paddingLeft: '8px' }}>Trạm đo ngập: (15/15)</div>
            <div style={{ paddingLeft: '8px' }}>Radar/Vệ tinh: (2/2)</div>
            <div style={{ marginTop: '4px' }}>
              <strong>Output validation trigger:</strong> Tự động gửi cảnh báo nếu độ ngập dự báo &gt; 30cm
            </div>
          </div>

          <button
            className="btn-update-run-model"
            onClick={() => alert('Đang cập nhật trọng số và huấn luyện lại mô hình...')}
          >
            CẬP NHẬT &amp; CHẠY LẠI MÔ HÌNH
          </button>
        </aside>
      </div>
    </div>
  );
};
