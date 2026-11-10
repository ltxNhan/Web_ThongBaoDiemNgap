# Hệ Thống Cảnh Báo Ngập Lụt Đô Thị Thông Minh (Smart Flood Warning System)

Hệ thống tích hợp giám sát mạng lưới trạm quan trắc IoT đo mưa, triều cường, ứng dụng GIS tương tác, báo cáo cộng đồng đa nguồn (crowdsourcing), dự báo thủy văn và điều phối cứu hộ khẩn cấp 114.

---

## 📁 Cấu Trúc Monorepo

```
flood-warning-system/
├── client/                     # Phân hệ Cổng thông tin & Ứng dụng người dân
├── admin/                      # Phân hệ Bảng điều khiển & Vận hành giám sát
├── server/                     # Backend API, Spatial GIS & Xử lý thời gian thực
├── pnpm-workspace.yaml         # Cấu hình pnpm monorepo
└── package.json                # Quản lý script khởi chạy toàn hệ thống
```

### 1. Phân Hệ Người Dân (`client/`)
- **Trang chủ (`home`)**: Ticker cảnh báo khẩn cấp, tìm kiếm nhanh tuyến đường, mini map, danh sách ngập.
- **Bản đồ GIS tương tác (`map`)**: Bản đồ Leaflet GIS, đa giác vùng trũng ngập, điểm trạm đo, gợi ý lộ trình né điểm ngập, bảng chú giải mức độ ngập.
- **Dự báo & Cảnh báo (`forecast`)**: Biểu đồ mưa 3h-24h, biểu đồ triều cường, bản tin cảnh báo, đăng ký SMS/Zalo.
- **Báo cáo ngập cộng đồng (`report`)**: Gửi tin báo ngập có GPS, hình ảnh hiện trường, ước lượng mức sâu.
- **Ứng phó khẩn cấp & Cứu nạn (`emergency`)**: Danh bạ 114/115/CSGT, bản đồ điểm sơ tán, cẩm nang ứng phó, checklist túi cứu hộ, form gửi yêu cầu cứu trợ khẩn cấp.
- **Cộng đồng trao đổi (`community`)**: Diễn đàn trao đổi theo quận huyện, chia sẻ kinh nghiệm tránh ngập, đội tình nguyện.
- **Dữ liệu & Cẩm nang (`data-info`)**: Tra cứu lịch sử ngập, tải báo cáo PDF, phân cấp báo động.
- **Tài khoản & Cá nhân hóa (`auth`)**: Đăng nhập, đăng ký theo khu vực sinh sống, quản lý khu vực quan tâm.

### 2. Phân Hệ Quản Trị & Vận Hành (`admin/`)
- **Tổng quan (`dashboard`)**: KPI báo động thành phố, bản đồ GIS giám sát toàn bộ mạng lưới, biểu đồ realtime mưa/triều, sức khỏe hệ thống.
- **Quản lý Trạm IoT (`stations`)**: Giám sát 150+ trạm, chỉ số đo, điều khiển khởi động lại từ xa, thêm mới trạm.
- **Duyệt báo cáo cộng đồng (`reports-moderation`)**: Hàng đợi duyệt tin, đối soát số liệu cảm biến lân cận, phê duyệt đẩy lên bản đồ.
- **Quản lý Mô hình dự báo (`forecasting-models`)**: Đo lường độ chính xác, tài nguyên CPU/GPU/RAM, mô phỏng dự báo ngập 3h-12h.
- **Cấu hình hệ thống (`configuration`)**: Cấu hình ngưỡng báo động, chu kỳ quét trạm IoT, trigger SMS/Zalo/Telegram, API key bên thứ ba.
- **Nhật ký hệ thống (`audit-logs`)**: Live audit log, cảnh báo bảo mật, thống kê sự kiện, xuất báo cáo CSV/PDF.
- **Điều phối cứu hộ (`rescue-dispatch`)**: Tiếp nhận danh sách yêu cầu cứu hộ từ người dân, chuyển tiếp điều động đơn vị 114.

### 3. Phân Hệ Backend (`server/` - Chuẩn Mô hình MVC)
- **Routes (`server/src/routes/`)**: Định tuyến URL, phân phối request đến Controller tương ứng (`auth`, `stations`, `reports`, `alerts`, `admin`,...).
- **Controllers (`server/src/controllers/`)**: Tiếp nhận request từ Router, kiểm tra tính hợp lệ dữ liệu, gọi Service/Model và chuyển tiếp cho View định dạng.
- **Views (`server/src/views/`)**: Định dạng dữ liệu phản hồi (JSON DTO, GeoJSON GIS FeatureCollection, Email/HTML Template).
- **Models / Entities (`server/src/models/`)**: Thực thể dữ liệu District, FloodRiskZone, FloodPoint, Station, StationObservation, CitizenReport, Alert, RescueRequest,...
- **Services (`server/src/services/`)**: Tính toán không gian GIS (GisSpatialService), đối soát ngưỡng cảnh báo (WeatherAlertEngine), bộ gửi thông báo (NotificationDispatcher), ghi log (AuditLogService).
- **Realtime**: WebSockets Hub (FloodHub, AlertNotificationHub) đồng bộ điểm ngập và cảnh báo tức thời.
- **Background Workers**: Mô phỏng cảm biến IoT (5 phút), quét sức khỏe trạm (30 phút), kích hoạt mô hình dự báo (15 phút).
- **Middleware**: Xác thực JWT, phân quyền vai trò (Admin/Staff/Citizen), rate limiting.

> 📖 Xem tài liệu phân tích chi tiết tại: [Tài liệu Kiến trúc MVC](docs/mvc-architecture.md)

---

## 🚀 Khởi Chạy Nhanh

```bash
# Cài đặt toàn bộ dependencies
pnpm install

# Khởi chạy toàn bộ hệ thống (Client, Admin, Server)
pnpm run dev

# Hoặc khởi chạy riêng từng phân hệ:
pnpm run dev:client
pnpm run dev:admin
pnpm run dev:server
```
