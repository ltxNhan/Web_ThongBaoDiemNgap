import React, { useState } from 'react';
import { RotateCcw, Save } from 'lucide-react';
import './ConfigurationPage.css';

export const ConfigurationPage: React.FC = () => {
  // Threshold values
  const [depth1Min, setDepth1Min] = useState('10');
  const [depth1Max, setDepth1Max] = useState('20');
  const [depth2Min, setDepth2Min] = useState('20');
  const [depth2Max, setDepth2Max] = useState('40');
  const [depth3Min, setDepth3Min] = useState('40');

  const [tide1, setTide1] = useState('1.40');
  const [tide2, setTide2] = useState('1.50');
  const [tide3, setTide3] = useState('1.60');

  const [rain1, setRain1] = useState('20');
  const [rain2, setRain2] = useState('50');
  const [rain3, setRain3] = useState('100');

  // Intervals
  const [iotInterval, setIotInterval] = useState('5 phút / lần');
  const [aiInterval, setAiInterval] = useState('15 phút / lần');
  const [sensorTimeout, setSensorTimeout] = useState('30 phút');
  const [userRefresh, setUserRefresh] = useState('1 phút');

  // Notifications
  const [zaloSmsTrigger, setZaloSmsTrigger] = useState(true);
  const [pushAppTrigger, setPushAppTrigger] = useState(true);
  const [telegramTrigger, setTelegramTrigger] = useState(true);

  const handleSave = () => {
    alert('Đã lưu toàn bộ cấu hình hệ thống thành công và áp dụng cho các Worker!');
  };

  const handleReset = () => {
    setDepth1Min('10');
    setDepth1Max('20');
    setDepth2Min('20');
    setDepth2Max('40');
    setDepth3Min('40');
    setTide1('1.40');
    setTide2('1.50');
    setTide3('1.60');
    alert('Đã khôi phục các tham số về giá trị mặc định.');
  };

  return (
    <div className="config-page-container">
      {/* Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-title-main">QUẢN LÝ CẤU HÌNH HỆ THỐNG</h1>
          <p className="page-sub-title">
            Thiết lập các ngưỡng cảnh báo, chu kỳ chạy mô hình và cấu hình thông báo hệ thống
          </p>
        </div>

        <div className="header-action-group">
          <button className="btn-secondary-outline" onClick={handleReset}>
            <RotateCcw size={14} />
            Khôi phục mặc định
          </button>
          <button className="btn-primary-blue" onClick={handleSave}>
            <Save size={14} />
            LƯU THAY ĐỔI
          </button>
        </div>
      </div>

      {/* 2 Columns Grid */}
      <div className="config-2col-grid">
        {/* Column 1: Thresholds */}
        <div className="config-column-block">
          <div className="config-section-title-row">
            <span className="config-section-heading">Thiết lập các ngưỡng cảnh báo</span>
            <label className="toggle-switch-label">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="config-card-box">
            <div className="config-card-title-row">
              <span className="config-card-title">NGƯỠNG CẢNH BÁO MỰC NƯỚC &amp; LƯỢNG MƯA</span>
              <label className="toggle-switch-label">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider" />
              </label>
            </div>

            {/* Mức ngập (cm) */}
            <div className="config-group-block">
              <span className="config-group-label">Mức ngập cảnh báo (cm) (Flood Depth)</span>

              <div className="threshold-input-row">
                <span className="threshold-name-txt green">Báo động 1 (Xanh - Nhẹ)</span>
                <div className="threshold-input-box-wrap">
                  [
                  <input
                    type="text"
                    className="threshold-input-control green-border"
                    style={{ width: '40px' }}
                    value={depth1Min}
                    onChange={(e) => setDepth1Min(e.target.value)}
                  />
                  -
                  <input
                    type="text"
                    className="threshold-input-control green-border"
                    style={{ width: '40px' }}
                    value={depth1Max}
                    onChange={(e) => setDepth1Max(e.target.value)}
                  />
                  ] cm
                </div>
              </div>

              <div className="threshold-input-row">
                <span className="threshold-name-txt orange">Báo động 2 (Cam - Trung bình)</span>
                <div className="threshold-input-box-wrap">
                  [
                  <input
                    type="text"
                    className="threshold-input-control orange-border"
                    style={{ width: '40px' }}
                    value={depth2Min}
                    onChange={(e) => setDepth2Min(e.target.value)}
                  />
                  -
                  <input
                    type="text"
                    className="threshold-input-control orange-border"
                    style={{ width: '40px' }}
                    value={depth2Max}
                    onChange={(e) => setDepth2Max(e.target.value)}
                  />
                  ] cm
                </div>
              </div>

              <div className="threshold-input-row">
                <span className="threshold-name-txt red">Báo động 3 (Đỏ - Ngập sâu)</span>
                <div className="threshold-input-box-wrap">
                  [ &gt;
                  <input
                    type="text"
                    className="threshold-input-control red-bg"
                    style={{ width: '50px' }}
                    value={depth3Min}
                    onChange={(e) => setDepth3Min(e.target.value)}
                  />
                  ] cm
                </div>
              </div>
            </div>

            {/* Ngưỡng triều cường (m) */}
            <div className="config-group-block" style={{ borderTop: '1px solid #162238', paddingTop: '10px' }}>
              <span className="config-group-label">Ngưỡng triều cường (Mét) (Tidal Thresholds)</span>

              <div className="threshold-input-row">
                <span className="threshold-name-txt">Báo động 1</span>
                <div className="threshold-input-box-wrap">
                  [
                  <input
                    type="text"
                    className="threshold-input-control"
                    style={{ width: '60px' }}
                    value={tide1}
                    onChange={(e) => setTide1(e.target.value)}
                  />
                  ] m
                </div>
              </div>

              <div className="threshold-input-row">
                <span className="threshold-name-txt">Báo động 2</span>
                <div className="threshold-input-box-wrap">
                  [
                  <input
                    type="text"
                    className="threshold-input-control"
                    style={{ width: '60px' }}
                    value={tide2}
                    onChange={(e) => setTide2(e.target.value)}
                  />
                  ] m
                </div>
              </div>

              <div className="threshold-input-row">
                <span className="threshold-name-txt">Báo động 3</span>
                <div className="threshold-input-box-wrap">
                  [
                  <input
                    type="text"
                    className="threshold-input-control"
                    style={{ width: '60px' }}
                    value={tide3}
                    onChange={(e) => setTide3(e.target.value)}
                  />
                  ] m
                </div>
              </div>
            </div>

            {/* Lượng mưa (mm/h) */}
            <div className="config-group-block" style={{ borderTop: '1px solid #162238', paddingTop: '10px' }}>
              <span className="config-group-label">Lượng mưa cảnh báo (Rainfall Thresholds)</span>

              <div className="threshold-input-row">
                <span className="threshold-name-txt">Mưa vừa</span>
                <div className="threshold-input-box-wrap">
                  [ &gt;
                  <input
                    type="text"
                    className="threshold-input-control"
                    style={{ width: '50px' }}
                    value={rain1}
                    onChange={(e) => setRain1(e.target.value)}
                  />
                  ] mm/h
                </div>
              </div>

              <div className="threshold-input-row">
                <span className="threshold-name-txt">Mưa lớn</span>
                <div className="threshold-input-box-wrap">
                  [ &gt;
                  <input
                    type="text"
                    className="threshold-input-control"
                    style={{ width: '50px' }}
                    value={rain2}
                    onChange={(e) => setRain2(e.target.value)}
                  />
                  ] mm/h
                </div>
              </div>

              <div className="threshold-input-row">
                <span className="threshold-name-txt">Mưa rất lớn</span>
                <div className="threshold-input-box-wrap">
                  [ &gt;
                  <input
                    type="text"
                    className="threshold-input-control"
                    style={{ width: '50px' }}
                    value={rain3}
                    onChange={(e) => setRain3(e.target.value)}
                  />
                  ] mm/h
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Intervals & Notifications */}
        <div className="config-column-block">
          {/* Section 2 */}
          <div className="config-section-title-row">
            <span className="config-section-heading">Chu kỳ chạy &amp; Đồng bộ dữ liệu</span>
            <label className="toggle-switch-label">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="config-card-box">
            <span className="config-card-title">TẦN SUẤT &amp; THU THẬP DỮ LIỆU</span>

            <div className="select-setting-row">
              <span className="select-setting-label">Chu kỳ cập nhật dữ liệu trạm IOT</span>
              <select
                className="select-setting-dropdown"
                value={iotInterval}
                onChange={(e) => setIotInterval(e.target.value)}
              >
                <option value="1 phút / lần">1 phút / lần</option>
                <option value="5 phút / lần">5 phút / lần</option>
                <option value="10 phút / lần">10 phút / lần</option>
              </select>
            </div>

            <div className="select-setting-row">
              <span className="select-setting-label">Tần suất chạy mô hình AI dự báo</span>
              <select
                className="select-setting-dropdown"
                value={aiInterval}
                onChange={(e) => setAiInterval(e.target.value)}
              >
                <option value="5 phút / lần">5 phút / lần</option>
                <option value="15 phút / lần">15 phút / lần</option>
                <option value="30 phút / lần">30 phút / lần</option>
              </select>
            </div>

            <div className="select-setting-row">
              <span className="select-setting-label">Thời gian chờ cảm biến báo mất tín hiệu (offline)</span>
              <select
                className="select-setting-dropdown"
                value={sensorTimeout}
                onChange={(e) => setSensorTimeout(e.target.value)}
              >
                <option value="15 phút">15 phút</option>
                <option value="30 phút">30 phút</option>
                <option value="60 phút">60 phút</option>
              </select>
            </div>

            <div className="select-setting-row">
              <span className="select-setting-label">Tự động làm mới dữ liệu người dùng</span>
              <select
                className="select-setting-dropdown"
                value={userRefresh}
                onChange={(e) => setUserRefresh(e.target.value)}
              >
                <option value="30 giây">30 giây</option>
                <option value="1 phút">1 phút</option>
                <option value="5 phút">5 phút</option>
              </select>
            </div>
          </div>

          {/* Section 3 */}
          <div className="config-section-title-row">
            <span className="config-section-heading">Tích hợp kênh thông báo &amp; Kết nối API</span>
            <label className="toggle-switch-label">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="config-card-box">
            <span className="config-card-title">KÊNH THÔNG BÁO KHẨN CẤP (AUTOMATION TRIGGERS)</span>

            <div className="trigger-checkbox-list">
              <label className="trigger-checkbox-item">
                <input
                  type="checkbox"
                  checked={zaloSmsTrigger}
                  onChange={(e) => setZaloSmsTrigger(e.target.checked)}
                />
                Tự động gửi tin nhắn Zalo/SMS khẩn cấp khi triều vượt Báo động 3
              </label>

              <label className="trigger-checkbox-item">
                <input
                  type="checkbox"
                  checked={pushAppTrigger}
                  onChange={(e) => setPushAppTrigger(e.target.checked)}
                />
                Tự động gửi thông báo (Push Notification) trên ứng dụng khi có điểm ngập mới được duyệt
              </label>

              <label className="trigger-checkbox-item">
                <input
                  type="checkbox"
                  checked={telegramTrigger}
                  onChange={(e) => setTelegramTrigger(e.target.checked)}
                />
                Đồng bộ cảnh báo lên mạng xã hội/kênh Telegram cộng đồng
              </label>
            </div>

            <div style={{ borderTop: '1px solid #162238', paddingTop: '10px' }}>
              <span className="config-card-title">KẾT NỐI API &amp; TÀI NGUYÊN BÊN NGOÀI</span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '8px',
                  fontSize: '0.8rem'
                }}
              >
                <span>Trạng thái kết nối API khí tượng (Weather API)</span>
                <span style={{ color: '#10b981', fontWeight: 700 }}>● Đang kết nối</span>
              </div>
              <button
                className="btn-secondary-outline"
                style={{ marginTop: '8px', width: 'fit-content' }}
                onClick={() => alert('Mở popup cấu hình API Key dịch vụ thời tiết OpenWeather/AccuWeather.')}
              >
                Cấu hình API Key
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
