# Kiến Trúc Hệ Thống (System Architecture)
## Hệ Thống Cảnh Báo Ngập Lụt Đô Thị Thông Minh (Smart Flood Warning System)

---

## 1. Tổng Quan Kiến Trúc (High-Level Architecture)

Hệ thống được thiết kế theo mô hình **Phân lớp Hướng Dịch vụ (Layered Service-Oriented Architecture)** kết hợp cơ chế **Hướng Sự kiện Thời gian thực (Event-Driven Realtime)** nhằm phục vụ đồng thời hai nhóm đối tượng:
- **Người dân (Citizens / Mobile & Web Portal)**: Tra cứu bản đồ ngập, lộ trình an toàn, gửi báo cáo ngập hiện trường và gửi yêu cầu cứu nạn SOS 114.
- **Ban Chỉ huy & Quản trị viên (Command & Operations Center)**: Giám sát mạng lưới trạm quan trắc IoT, duyệt tin báo ngập cộng đồng, ban hành bản tin khẩn cấp và điều phối cứu hộ.

```mermaid
flowchart TB
    subgraph Presentation_Layer [Tầng Trình Diễn - Presentation Layer]
        ClientApp["📱 Client Web/Mobile App<br/>(React + Vite + Leaflet GIS)"]
        AdminPortal["🖥️ Admin Dashboard<br/>(Operations Center / Moderation)"]
    end

    subgraph Gateway_API_Layer [Tầng Cổng & Xử Lý Nghiệp Vụ - Backend API]
        ExpressServer["⚡ Node.js / Express Server (TypeScript)"]
        AuthMiddleware["🛡️ Auth & Rate Limiting"]
        Controllers["🕹️ Controllers (Reports, Stations, GIS, Rescue)"]
        RealtimeHub["📡 Socket.IO Realtime Hubs (FloodHub, AlertHub)"]
        Workers["⏱️ Background Workers (IoT Simulator, AI Forecast)"]
    end

    subgraph Data_Storage_Layer [Tầng Dữ Liệu & Lưu Trữ - Supabase Cloud Platform]
        PostgresDB[("🐘 Supabase PostgreSQL (PostGIS)<br/>Tables: reports, flood_points, stations,...")]
        SupabaseStorage["🗄️ Supabase Storage Bucket<br/>(report-images, alert-attachments)"]
        SupabaseRealtime["⚡ Supabase Realtime & Auth Engine"]
    end

    ClientApp -->|HTTP REST API| ExpressServer
    AdminPortal -->|HTTP REST API| ExpressServer
    ClientApp <-->|WebSockets| RealtimeHub
    AdminPortal <-->|WebSockets| RealtimeHub

    ExpressServer --> AuthMiddleware
    AuthMiddleware --> Controllers
    Controllers --> PostgresDB
    Workers --> PostgresDB

    ClientApp -->|Direct Secure Upload| SupabaseStorage
    Controllers -->|Validate & Query| PostgresDB
    RealtimeHub <-->|Sync State| PostgresDB
```

---

## 2. Mô Tả Luồng Dữ Liệu (Data Flow)

1. **Luồng Cổng thông tin (Client $\rightarrow$ Backend $\rightarrow$ Database)**:
   - Client gửi các yêu cầu truy vấn bản đồ, danh sách trạm đo, lịch sử triều cường qua REST API.
   - Backend xác thực, kiểm tra rate limit, truy vấn từ cơ sở dữ liệu Supabase PostgreSQL và trả về định dạng GeoJSON / JSON chuẩn.

2. **Luồng Dữ liệu Thời gian thực (Realtime Ingestion & Broadcast)**:
   - Các trạm quan trắc IoT (và Background Simulator) cập nhật lượng mưa, mực nước triều theo chu kỳ 5 phút.
   - Nếu mực nước vượt ngưỡng Báo động 3, `WeatherAlertEngine` tự động phát sinh bản tin khẩn cấp và kích hoạt `AlertNotificationHub` đẩy cảnh báo tức thì qua WebSocket tới toàn bộ người dân trong vùng ảnh hưởng.

3. **Luồng Báo cáo Cộng đồng (Crowdsourced Reporting Flow)**:
   - Ảnh chụp hiện trường được tải trực tiếp lên **Supabase Storage** (`report-images`) để tối ưu hóa băng thông cho Backend.
   - Metadata của báo cáo (tọa độ GPS, mức ngập, URL ảnh) được gửi về Backend xử lý và lưu vào bảng `citizen_reports`.

---

## 3. Sơ Đồ Tương Tác: Người Dân Gửi Báo Cáo Ngập

Quy trình chi tiết từ lúc người dân ghi nhận ngập lụt ngoài hiện trường cho đến khi điểm ngập được phê duyệt và hiển thị trên bản đồ số GIS toàn thành phố:

```mermaid
sequenceDiagram
    autonumber
    actor Citizen as 👤 Người dân (Client App)
    participant Storage as 🗄️ Supabase Storage (report-images)
    participant API as ⚡ Backend API (Server)
    participant DB as 🐘 Supabase PostgreSQL
    participant Socket as 📡 Socket.IO Hub
    actor Admin as 👨‍💼 Cán bộ kiểm duyệt (Admin Portal)

    Note over Citizen: Người dân chụp ảnh hiện trường,<br/>bật GPS lấy tọa độ, chọn mức ngập (cm)
    Citizen->>Storage: 1. Upload ảnh hiện trường (POST multipart/form-data)
    Storage-->>Citizen: Trả về publicUrl (vd: .../report-images/img_123.jpg)

    Note over Citizen: Đóng gói Payload: latitude, longitude,<br/>water_level, publicUrl, mô tả
    Citizen->>API: 2. Gửi báo cáo (POST /api/reports)
    API->>API: Kiểm tra tọa độ trong TP.HCM & các trường bắt buộc

    alt Dữ liệu hợp lệ
        API->>DB: 3. INSERT INTO citizen_reports (status = 'pending')
        DB-->>API: Ghi thành công (ID: REP-xxxx)
        API->>Socket: 4. Phát sự kiện "new_citizen_report"
        Socket-->>Admin: Hiển thị ngay trên hàng đợi kiểm duyệt (Realtime)
        API-->>Citizen: 5. Phản hồi 201 Created (Báo cáo đã tiếp nhận)
    else Dữ liệu thiếu hoặc sai tọa độ
        API-->>Citizen: Phản hồi 400 Bad Request (Thông báo lỗi cụ thể)
    end

    Note over Admin: Cán bộ đối soát vị trí với trạm đo lân cận
    Admin->>API: 6. Duyệt báo cáo (POST /api/admin/reports/:id/moderate action=approved)
    API->>DB: 7. UPDATE citizen_reports SET status='approved'
    API->>DB: 8. INSERT INTO flood_points (tạo điểm ngập chính thức)
    API->>Socket: 9. Broadcast "flood_point_added" tới toàn mạng
    Socket-->>Citizen: 10. Điểm ngập lập tức sáng đèn trên bản đồ GIS của tất cả người dân
```

---

## 4. Các Biện Pháp Đảm Bảo Tính Toàn Vẹn & Hiệu Năng
- **Phân tách tải lưu trữ tệp (Media Offloading)**: Ảnh hiện trường được đẩy trực tiếp lên Cloud Storage (CDN), máy chủ ứng dụng chỉ xử lý dữ liệu JSON có cấu trúc.
- **Kiểm soát tọa độ địa lý (Geofencing Validation)**: Mọi tọa độ gửi lên đều được xác thực nằm trong Bounding Box của khu vực TP.HCM (vĩ độ $10.35 - 11.20$, kinh độ $106.35 - 107.05$) trước khi ghi vào CSDL.
- **Cơ chế Chống nghẽn (Rate Limiting)**: Giới hạn tối đa 120 requests/phút trên mỗi địa chỉ IP để chống spam và tấn công từ chối dịch vụ (DDoS) khi có bão lũ lớn.
