import React, { useState } from 'react';
import { CloudRain, Droplet, Users, Camera } from 'lucide-react';
import { MiniFloodMap } from './components/MiniFloodMap';
import { FloodPoint, FloodAlert } from '../../types';
import './HomePage.css';

interface HomePageProps {
  onNavigateTab: (tab: string) => void;
  floodPoints: FloodPoint[];
  alerts: FloodAlert[];
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateTab, floodPoints, alerts }) => {
  const total = floodPoints.length;
  const critical = floodPoints.filter((p) => p.level === 'critical').length;
  const danger = floodPoints.filter((p) => p.level === 'danger').length;
  const warning = floodPoints.filter((p) => p.level === 'warning').length;
  const safe = floodPoints.filter((p) => p.level === 'safe').length;

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPoints = floodPoints.filter((p) =>
    p.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const topAlerts = alerts.slice(0, 3);
  const recentPoints = filteredPoints.slice(0, 6);

  const getLevelLabel = (level: FloodPoint['level']) => {
    switch (level) {
      case 'critical':
        return 'Nghiêm trọng';
      case 'danger':
        return 'Nghi ngờ';
      case 'warning':
        return 'Cảnh báo';
      default:
        return 'An toàn';
    }
  };

  return (
    <div className="home-page">
      {topAlerts.length > 0 && (
        <section className="alert-strip">
          <span className="alert-strip-dot" />
          <div className="alert-strip-text">
            <strong className={`alert-lvl alert-lvl-${topAlerts[0].level}`}>
              CẢNH BÁO CẤP {topAlerts[0].level}
            </strong>
            <div className="alert-strip-desc">{topAlerts[0].content}</div>
          </div>
        </section>
      )}

      <div className="home-dashboard">
        <section className="hp-map-panel">
          <div className="hp-map-head">
            <h2 className="hp-map-title">BẢN ĐỒ CẢNH BÁO ĐÔ THỚI</h2>
            <span className="hp-live-dot" />
          </div>
          <div className="hp-map-body" onClick={() => onNavigateTab('map')}>
            <MiniFloodMap points={floodPoints} onOpenFullMap={() => onNavigateTab('map')} />
          </div>
          <div className="hp-map-foot">
            <span>
              {safe} an toàn · {warning} cảnh báo · {danger} nghi ngờ · {critical} nghiêm trọng
            </span>
          </div>
        </section>

        <aside className="hp-sidebar">
          <div className="hp-search-wrap">
            <input
              className="hp-search"
              type="text"
              placeholder="Tìm điểm ngập theo đường / quận / xã..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <section className="hp-panel">
            <div className="hp-panel-head">
              <h3>Tình hình ngập hiện tại</h3>
              <span className="stat">{filteredPoints.length} điểm</span>
            </div>
            <div className="hp-list">
              {recentPoints.map((p) => (
                <button
                  key={p.id}
                  className={`hp-row ${p.level}`}
                  onClick={() => onNavigateTab('map')}
                >
                  <span className="hp-row-street">{p.street}</span>
                  <span className={`hp-row-depth ${p.level}`}>
                    {p.depthCm}cm · {getLevelLabel(p.level)}
                  </span>
                </button>
              ))}
            </div>
            {recentPoints.length === 0 && (
              <div className="hp-empty">
                {searchTerm
                  ? 'Không tìm thấy điểm ngập nào khớp tìm kiếm.'
                  : 'Chưa nhận dữ liệu ngập → chuyển qua <b>Bản đồ ngập</b>'}
              </div>
            )}
          </section>

          <section className="hp-panel">
            <h3>Tổng quan &amp; Cảnh báo</h3>
            <div className="hp-stats-grid">
              <div className="hp-stat">
                <span className="hp-stat-num hp-critical">{critical}</span>
                <span className="hp-stat-lbl">Nghiêm trọng</span>
              </div>
              <div className="hp-stat">
                <span className="hp-stat-num hp-danger">{danger}</span>
                <span className="hp-stat-lbl">Nghi ngờ</span>
              </div>
              <div className="hp-stat">
                <span className="hp-stat-num hp-warning">{warning}</span>
                <span className="hp-stat-lbl">Cảnh báo</span>
              </div>
              <div className="hp-stat">
                <span className="hp-stat-num hp-success">{safe}</span>
                <span className="hp-stat-lbl">Đã an toàn</span>
              </div>
            </div>
            <div className="hp-alerts">
              {topAlerts.map((a) => (
                <div className="hp-alert">
                  <span className={`hp-alert-lvl alert-lvl-${a.level}`}>CẢNH BÁO CẤP {a.level}</span>
                  <div className="hp-alert-txt">{a.content}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="hp-panel">
            <h3>Dự báo &amp; Hành động</h3>
            <div className="hp-forecast">
              <div className="hp-forecast-item">
                <CloudRain size={15} />
                <span>Mưa dông lớn 50–80mm</span>
              </div>
              <div className="hp-forecast-item">
                <Droplet size={15} />
                <span>Triều cường 1.72m (Báo động 3)</span>
              </div>
            </div>
            <div className="hp-ctrl-row">
              <button className="hp-ctrl" onClick={() => onNavigateTab('community')}>
                <Users size={15} />
                Báo cáo cộng đồng
              </button>
              <button className="hp-ctrl" onClick={() => onNavigateTab('report')}>
                <Camera size={15} />
                Gửi báo cáo
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};
