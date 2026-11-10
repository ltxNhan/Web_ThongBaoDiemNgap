# Đặc Tả Giao Diện Lập Trình Ứng Dụng (RESTful API Specification)
## Hệ Thống Cảnh Báo Ngập Lụt Đô Thị Thông Minh

- **Base URL:** `http://localhost:5000/api`
- **Định dạng dữ liệu:** `application/json` (UTF-8)
- **Mã phản hồi chuẩn:**
  - `200 OK`: Truy vấn hoặc xử lý thành công.
  - `201 Created`: Tạo mới tài nguyên thành công.
  - `400 Bad Request`: Thiếu tham số hoặc dữ liệu gửi lên không hợp lệ.
  - `401 Unauthorized`: Chưa xác thực JWT hoặc Token không hợp lệ.
  - `404 Not Found`: Không tìm thấy tài nguyên.
  - `500 Internal Server Error`: Lỗi máy chủ nội bộ.

---

## 1. Phân Hệ Báo Cáo Ngập Cộng Đồng (Citizen Reports)

### 1.1. Gửi báo cáo ngập từ người dân
- **Endpoint:** `POST /api/reports` (Bí danh: `POST /api/citizen-reports`)
- **Mô tả:** Tiếp nhận báo cáo ngập lụt kèm vị trí GPS, ảnh chụp hiện trường và mức ngập ước lượng từ người dân.
- **Quyền truy cập:** Công khai (Public / Không bắt buộc Token).

#### Request Body:
```json
{
  "userId": "USR-1729600000",
  "latitude": 10.803,
  "longitude": 106.716,
  "water_level": 45,
  "street": "Đường Ung Văn Khiêm",
  "district": "Bình Thạnh",
  "description": "Nước ngập qua bô xe máy đoạn cổng trường Hutech",
  "image_url": "https://pszllqygeusfacwyzibb.supabase.co/storage/v1/object/public/report-images/ung-van-khiem.jpg"
}
```

#### JSON Schema:
| Trường | Kiểu dữ liệu | Bắt buộc | Ghi chú |
| :--- | :--- | :--- | :--- |
| `latitude` | `number` | **Có** | Vĩ độ WGS84, thuộc phạm vi TP.HCM (10.35 - 11.20) |
| `longitude` | `number` | **Có** | Kinh độ WGS84, thuộc phạm vi TP.HCM (106.35 - 107.05) |
| `water_level` | `number` | **Có** | Độ sâu ngập tính bằng centimet ($> 0$) |
| `image_url` | `string` | Không | Public URL file ảnh đã tải lên Supabase Storage |
| `street` | `string` | Không | Tên tuyến đường |
| `district` | `string` | Không | Quận/Huyện |
| `description` | `string` | Không | Chi tiết hiện trường, ảnh hưởng giao thông |
| `userId` | `string` | Không | ID tài khoản người gửi (nếu đã đăng nhập) |

#### Phản hồi thành công (`201 Created`):
```json
{
  "success": true,
  "message": "Báo cáo đã được tiếp nhận thành công.",
  "id": "REP-1729612345678",
  "data": {
    "id": "REP-1729612345678",
    "userId": "USR-1729600000",
    "latitude": 10.803,
    "longitude": 106.716,
    "water_level": 45,
    "street": "Đường Ung Văn Khiêm",
    "district": "Bình Thạnh",
    "description": "Nước ngập qua bô xe máy đoạn cổng trường Hutech",
    "image_url": "https://pszllqygeusfacwyzibb.supabase.co/storage/v1/object/public/report-images/ung-van-khiem.jpg",
    "status": "pending",
    "createdAt": "2026-10-22T16:30:00.000Z"
  }
}
```

#### Phản hồi thất bại (`400 Bad Request`):
```json
{
  "success": false,
  "error": "Missing required fields",
  "message": "Tọa độ (latitude, longitude) và mức ngập (water_level) là bắt buộc."
}
```

---

### 1.2. Lấy danh sách báo cáo gần đây
- **Endpoint:** `GET /api/reports`
- **Mô tả:** Lấy danh sách các tin báo ngập gần nhất đã được gửi.
- **Phản hồi (`200 OK`):**
```json
[
  {
    "id": "REP-101",
    "userName": "Trần Văn Nam",
    "street": "Đường Ung Văn Khiêm",
    "district": "Bình Thạnh",
    "water_level": 35,
    "lat": 10.803,
    "lng": 106.716,
    "status": "pending",
    "createdAt": "2026-10-22T15:30:00.000Z"
  }
]
```

---

### 1.3. Phê duyệt báo cáo ngập (Admin)
- **Endpoint:** `POST /api/admin/reports/:id/moderate`
- **Quyền:** Quản trị viên / Kiểm duyệt viên
- **Request Body:**
```json
{
  "action": "approved", // "approved" hoặc "rejected"
  "note": "Xác nhận đúng với dữ liệu mưa trạm Phú An"
}
```
- **Phản hồi (`200 OK`):**
```json
{
  "success": true,
  "id": "REP-101",
  "status": "approved"
}
```

---

## 2. Phân Hệ Bản Đồ Ngập GIS (Flood Points)

### 2.1. Lấy danh sách điểm ngập hiển thị trên bản đồ số
- **Endpoint:** `GET /api/flood-points`
- **Mô tả:** Lấy toàn bộ các điểm ngập đang hoạt động để hiển thị layer Marker / Polygon trên bản đồ Leaflet.
- **Phản hồi (`200 OK`):**
```json
[
  {
    "id": "FP-01",
    "street": "Nguyễn Hữu Cảnh",
    "district": "Bình Thạnh",
    "depthCm": 45,
    "level": "critical",
    "lat": 10.793,
    "lng": 106.715,
    "description": "Đoạn chân cầu vượt Nguyễn Hữu Cảnh, xe chết máy hàng loạt",
    "updatedAt": "2026-10-22T16:00:00.000Z"
  },
  {
    "id": "FP-02",
    "street": "Huỳnh Tấn Phát",
    "district": "Quận 7",
    "depthCm": 35,
    "level": "danger",
    "lat": 10.732,
    "lng": 106.738,
    "description": "Triều cường dâng cao ngập nửa bánh xe máy",
    "updatedAt": "2026-10-22T16:05:00.000Z"
  }
]
```

---

## 3. Phân Hệ Trạm Quan Trắc IoT (Stations & Telemetry)

### 3.1. Lấy danh sách trạm quan trắc mưa & triều cường
- **Endpoint:** `GET /api/stations`
- **Phản hồi (`200 OK`):**
```json
[
  {
    "id": "ST-01",
    "code": "TRAM-PHUAN",
    "name": "Trạm Phú An (Sông Sài Gòn)",
    "type": "combined",
    "status": "online",
    "currentRainMm": 68.5,
    "currentTideM": 1.72,
    "lat": 10.795,
    "lng": 106.711,
    "lastUpdated": "2026-10-22T16:15:00.000Z"
  }
]
```

---

## 4. Phân Hệ Ứng Phó Khẩn Cấp & Cứu Hộ 114 (Emergency SOS)

### 4.1. Gửi yêu cầu cứu trợ khẩn cấp
- **Endpoint:** `POST /api/rescue-requests`
- **Request Body:**
```json
{
  "citizenName": "Nguyễn Thị Mai",
  "phone": "0987654321",
  "address": "Số 12 Hẻm 45 Lê Văn Lương, Nhà Bè",
  "latitude": 10.702,
  "longitude": 106.702,
  "numPeople": 4,
  "hasElderlyOrChildren": true,
  "floodDepthCm": 80,
  "note": "Nước tràn vào nhà ngập 80cm, cúp điện, có người già 82 tuổi"
}
```
- **Phản hồi (`201 Created`):**
```json
{
  "success": true,
  "rescueId": "SOS-1729605555",
  "message": "Đã tiếp nhận yêu cầu khẩn cấp. Bộ chỉ huy 114 đang điều phối đơn vị gần nhất."
}
```

---

## 5. Phân Hệ Bản Tin Cảnh Báo & Dự Báo (Alerts & Forecasts)

### 5.1. Lấy danh sách bản tin cảnh báo thiên tai
- **Endpoint:** `GET /api/alerts`
- **Phản hồi (`200 OK`):**
```json
[
  {
    "id": "ALT-2026-001",
    "level": 3,
    "title": "CẢNH BÁO KHẨN CẤP: Triều cường vượt Báo động 3 kết hợp mưa lớn",
    "content": "Mực nước đỉnh triều tại trạm Phú An dự kiến đạt 1.75m lúc 17:30 - 19:30. Khuyến cáo người dân vùng trũng thấp hạn chế di chuyển.",
    "affectedDistricts": ["Quận 7", "Nhà Bè", "Bình Thạnh", "TP. Thủ Đức"],
    "issuedAt": "2026-10-22T15:00:00.000Z",
    "validUntil": "2026-10-22T21:00:00.000Z"
  }
]
```
