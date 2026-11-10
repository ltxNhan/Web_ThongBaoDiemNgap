import React, { useState } from 'react';
import { AlertTriangle, Download, Share2, CloudRain } from 'lucide-react';
import { FloodAlert } from '../../types';
import './ForecastPage.css';

interface ForecastPageProps {
  alerts: FloodAlert[];
}

export const ForecastPage: React.FC<ForecastPageProps> = () => {
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Quận 7, Phường Tân Quy');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname || !phone) {
      alert('Vui lòng nhập họ tên và số điện thoại.');
      return;
    }
    setSubscribed(true);
    alert('Đăng ký nhận cảnh báo lũ / triều cường thành công qua SMS & Zalo!');
  };

  const handleDownloadPDF = () => {
    window.open('/assets/cam-nang-huong-dan-ngap.pdf', '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Dự báo triều cường & ngập lụt TP.HCM',
        url: window.location.href
      });
    } else {
      alert('Đã sao chép liên kết dự báo vào khay nhớ tạm!');
    }
  };

  return (
    <div className="forecast-page-layout">
      <div className="forecast-grid-2x2">
        {/* Card 1: CẢNH BÁO ĐANG HIỆU LỰC (REAL-TIME ALERTS) */}
        <div className="forecast-panel-card">
          <div className="card-header-flex">
            <h2 className="forecast-card-title">CẢNH BÁO ĐANG HIỆU LỰC (REAL-TIME ALERTS)</h2>
          </div>

          <div className="alerts-list-vertical">
            {/* Red Alert */}
            <div className="alert-callout-box red">
              <div className="alert-icon-wrap">
                <AlertTriangle size={24} />
              </div>
              <div className="alert-content-wrap">
                <div className="alert-box-title">
                  CẢNH BÁO NGẬP LỤT DO TRIỀU CƯỜNG CAO (Báo động 3)
                </div>
                <div className="alert-box-text">
                  Khu vực: Quận 7, Nhà Bè, TP. Thủ Đức.<br />
                  Đỉnh triều dự kiến 1.72m vào lúc 17:30 ngày hôm nay.<br />
                  Ảnh hưởng ngập sâu ở các tuyến đường trũng thấp.
                </div>
              </div>
            </div>

            {/* Orange Alert */}
            <div className="alert-callout-box orange">
              <div className="alert-icon-wrap">
                <AlertTriangle size={24} />
              </div>
              <div className="alert-content-wrap">
                <div className="alert-box-title">
                  CẢNH BÁO MƯA LỚN DIỆN RỘNG (50-80mm)
                </div>
                <div className="alert-box-text">
                  Trong 3 giờ tới: Bình Thạnh, Gò Vấp, Quận 12...<br />
                  Nguy cơ ngập từ 20-40cm.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: DỰ BÁO KHU VỰC */}
        <div className="forecast-panel-card">
          <div className="card-header-flex">
            <h2 className="forecast-card-title">DỰ BÁO KHU VỰC</h2>
            <div className="header-action-links">
              <button className="action-link-btn" onClick={handleDownloadPDF}>
                <Download size={14} />
                Tải bản tin dự báo (.PDF)
              </button>
              <button className="action-link-btn" onClick={handleShare}>
                <Share2 size={14} />
                Chia sẻ
              </button>
            </div>
          </div>

          <div className="regional-forecast-body">
            {/* Left Mini District Map */}
            <div className="mini-district-map">
              <svg width="100%" height="100%" viewBox="0 0 200 180" style={{ background: '#f1f5f9' }}>
                {/* River path */}
                <path
                  d="M10,80 Q60,110 100,70 T180,40"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="6"
                />
                {/* District Risk Polygon (highlighted red) */}
                <polygon
                  points="75,85 115,80 125,120 100,145 70,125"
                  fill="#ef4444"
                  fillOpacity="0.65"
                  stroke="#dc2626"
                  strokeWidth="2"
                />
                <text x="80" y="115" fontSize="10" fill="#ffffff" fontWeight="bold">
                  Quận 7
                </text>
                <text x="20" y="165" fontSize="8" fill="#64748b">
                  Map độ: SSH D'HIM, Quận Bể Thẩm Phố
                </text>
              </svg>
            </div>

            {/* Right Table */}
            <div className="district-table-container">
              <div className="district-table-header">
                <span>Quận huyện</span>
                <span>Nguy cơ ngập</span>
              </div>

              <div className="district-table-row">
                <span>Quận Đức</span>
                <span className="district-risk-tag high">
                  <CloudRain size={14} />
                  Cao
                </span>
              </div>

              <div className="district-table-row">
                <span>Quận 12</span>
                <span className="district-risk-tag medium">
                  <CloudRain size={14} />
                  Trung bình
                </span>
              </div>

              <div className="district-table-row">
                <span>Quận 13</span>
                <span className="district-risk-tag low">
                  <CloudRain size={14} />
                  Thấp
                </span>
              </div>

              <div className="district-table-row">
                <span>Quận Huyện</span>
                <span className="district-risk-tag high">
                  <CloudRain size={14} />
                  Cao
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: ĐĂNG KÝ NHẬN CẢNH BÁO */}
        <div className="forecast-panel-card">
          <div className="card-header-flex">
            <h2 className="forecast-card-title">ĐĂNG KÝ NHẬN CẢNH BÁO</h2>
          </div>

          <p className="subscribe-desc">
            Người dùng có thể nhận tin nhắn cảnh báo, nhận tin nhắn miễn cảnh báo qua Zalo/SMS.
          </p>

          <form className="subscribe-form-group" onSubmit={handleSubscribe}>
            <input
              type="text"
              className="subscribe-input"
              placeholder="Họ và tên"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />

            <input
              type="tel"
              className="subscribe-input"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <select
              className="subscribe-input"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value="Quận 7, Phường Tân Quy">Khu vực quan tâm (Quận/Huyện, Phường/Xã)</option>
              <option value="Quận 7">Quận 7 (Đường Huỳnh Tấn Phát, Trần Xuân Soạn)</option>
              <option value="Quận Bình Thạnh">Quận Bình Thạnh (Nguyễn Hữu Cảnh, Ung Văn Khiêm)</option>
              <option value="TP. Thủ Đức">TP. Thủ Đức (Quốc Lộ 13, Thảo Điền)</option>
              <option value="Huyện Nhà Bè">Huyện Nhà Bè (Lê Văn Lương)</option>
            </select>

            <span className="subscribe-note-text">
              Để nhận tin nhắn cảnh báo qua Zalo/SMS.
            </span>

            <button type="submit" className="subscribe-submit-btn">
              {subscribed ? '✓ ĐÃ ĐĂNG KÝ THÀNH CÔNG' : 'ĐĂNG KÝ NGAY'}
            </button>
          </form>
        </div>

        {/* Card 4: DỰ BÁO LƯỢNG MƯA & MỰC NƯỚC TRIỀU */}
        <div className="forecast-panel-card">
          <div className="card-header-flex">
            <h2 className="forecast-card-title">DỰ BÁO LƯỢNG MƯA &amp; MỰC NƯỚC TRIỀU</h2>
            <div className="header-action-links">
              <button className="action-link-btn" onClick={handleDownloadPDF}>
                <Download size={14} />
                Tải bản tin dự báo (.PDF)
              </button>
              <button className="action-link-btn" onClick={handleShare}>
                <Share2 size={14} />
                Chia sẻ
              </button>
            </div>
          </div>

          <div className="charts-double-container">
            {/* Chart 1: Lượng mưa theo giờ */}
            <div className="subchart-block">
              <div className="subchart-title">Dự báo lượng mưa theo giờ</div>
              <div className="chart-drawing-box">
                <svg width="100%" height="150" viewBox="0 0 240 150">
                  {/* Grid lines */}
                  <line x1="30" y1="20" x2="230" y2="20" stroke="#16244d" strokeDasharray="3 3" />
                  <line x1="30" y1="50" x2="230" y2="50" stroke="#16244d" strokeDasharray="3 3" />
                  <line x1="30" y1="80" x2="230" y2="80" stroke="#16244d" strokeDasharray="3 3" />
                  <line x1="30" y1="110" x2="230" y2="110" stroke="#16244d" strokeDasharray="3 3" />
                  <line x1="30" y1="130" x2="230" y2="130" stroke="#334155" />

                  {/* Y Axis text */}
                  <text x="10" y="25" fill="#64748b" fontSize="9">40</text>
                  <text x="10" y="55" fill="#64748b" fontSize="9">30</text>
                  <text x="10" y="85" fill="#64748b" fontSize="9">20</text>
                  <text x="10" y="115" fill="#64748b" fontSize="9">10</text>
                  <text x="15" y="133" fill="#64748b" fontSize="9">0</text>

                  {/* Vertical bars (12h, 14h, 16h, 18h, 20h, 22h) */}
                  <rect x="42" y="85" width="14" height="45" fill="#38bdf8" rx="2" />
                  <text x="40" y="145" fill="#94a3b8" fontSize="9">12h</text>

                  <rect x="74" y="35" width="14" height="95" fill="#38bdf8" rx="2" />
                  <text x="72" y="145" fill="#94a3b8" fontSize="9">14h</text>

                  <rect x="106" y="95" width="14" height="35" fill="#38bdf8" rx="2" />
                  <text x="104" y="145" fill="#94a3b8" fontSize="9">16h</text>

                  <rect x="138" y="65" width="14" height="65" fill="#38bdf8" rx="2" />
                  <text x="136" y="145" fill="#94a3b8" fontSize="9">18h</text>

                  <rect x="170" y="100" width="14" height="30" fill="#38bdf8" rx="2" />
                  <text x="168" y="145" fill="#94a3b8" fontSize="9">20h</text>

                  <rect x="202" y="120" width="14" height="10" fill="#38bdf8" rx="2" />
                  <text x="200" y="145" fill="#94a3b8" fontSize="9">22h</text>
                </svg>
              </div>
            </div>

            {/* Chart 2: Mực nước triều cường */}
            <div className="subchart-block">
              <div className="subchart-title">Dự báo mực nước triều cường</div>
              <div className="chart-drawing-box">
                <svg width="100%" height="150" viewBox="0 0 240 150">
                  {/* Threshold line 1.6m Báo động 3 */}
                  <line x1="30" y1="52" x2="230" y2="52" stroke="#ef4444" strokeDasharray="4 4" strokeWidth="1.5" />
                  <text x="35" y="46" fill="#ef4444" fontSize="9" fontWeight="bold">
                    Báo động 3: 1.60m
                  </text>

                  {/* Y Axis labels */}
                  <text x="12" y="25" fill="#64748b" fontSize="9">2.0</text>
                  <text x="12" y="55" fill="#64748b" fontSize="9">1.5</text>
                  <text x="12" y="85" fill="#64748b" fontSize="9">1.0</text>
                  <text x="12" y="115" fill="#64748b" fontSize="9">0.5</text>
                  <text x="18" y="133" fill="#64748b" fontSize="9">0</text>

                  {/* Tide Sine Curve with fill gradient */}
                  <defs>
                    <linearGradient id="tideGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M35,115 Q65,130 95,65 T155,130 T200,28 T230,120 L230,130 L35,130 Z"
                    fill="url(#tideGradient)"
                  />
                  <path
                    d="M35,115 Q65,130 95,65 T155,130 T200,28 T230,120"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />

                  {/* Peak Point Dot at 1.72m */}
                  <circle cx="200" cy="28" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="200" cy="28" r="9" fill="none" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.6" />

                  {/* X axis labels */}
                  <line x1="30" y1="130" x2="230" y2="130" stroke="#334155" />
                  <text x="35" y="145" fill="#94a3b8" fontSize="9">12h</text>
                  <text x="75" y="145" fill="#94a3b8" fontSize="9">14h</text>
                  <text x="115" y="145" fill="#94a3b8" fontSize="9">16h</text>
                  <text x="155" y="145" fill="#94a3b8" fontSize="9">18h</text>
                  <text x="195" y="145" fill="#94a3b8" fontSize="9">20h</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
