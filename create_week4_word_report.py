# -*- coding: utf-8 -*-
"""
Script tự động sinh file Word Báo Cáo Tuần 4
Đề tài: Hệ Thống Cảnh Báo Ngập Lụt Đô Thị Thông Minh (Smart Flood Warning System - HCMC)
Chức năng: Quản lý Mạng lưới Trạm Quan trắc IoT & Chu trình Kiểm duyệt Tin báo Cộng đồng Đồng bộ WebGIS Thời gian thực
"""

import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=120, bottom=120, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(
        f'<w:tcMar {nsdecls("w")}>'
        f'<w:top w:w="{top}" w:type="dxa"/>'
        f'<w:bottom w:w="{bottom}" w:type="dxa"/>'
        f'<w:left w:w="{left}" w:type="dxa"/>'
        f'<w:right w:w="{right}" w:type="dxa"/>'
        f'</w:tcMar>'
    )
    tcPr.append(tcMar)

def style_table(table, col_widths=None, header_bg="0B2545"):
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    for i, row in enumerate(table.rows):
        trPr = row._tr.get_or_add_trPr()
        trPr.append(parse_xml(f'<w:cantSplit {nsdecls("w")}/>'))
        if i == 0:
            trPr.append(parse_xml(f'<w:tblHeader {nsdecls("w")}/>'))

        for j, cell in enumerate(row.cells):
            cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
            set_cell_margins(cell, top=110, bottom=110, left=140, right=140)
            if col_widths and j < len(col_widths):
                cell.width = Inches(col_widths[j])
            
            if i == 0:
                set_cell_background(cell, header_bg)
                for paragraph in cell.paragraphs:
                    paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
                    for run in paragraph.runs:
                        run.font.bold = True
                        run.font.color.rgb = RGBColor(255, 255, 255)
                        run.font.size = Pt(10)
            else:
                if i % 2 == 1:
                    set_cell_background(cell, "F8FAFC")
                else:
                    set_cell_background(cell, "FFFFFF")
                for paragraph in cell.paragraphs:
                    for run in paragraph.runs:
                        run.font.size = Pt(9.5)

def add_callout(doc, text, title="GHI CHÚ QUAN TRỌNG", color_hex="0284C7", bg_hex="F0F9FF"):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = tbl.cell(0, 0)
    set_cell_background(cell, bg_hex)
    set_cell_margins(cell, top=130, bottom=130, left=180, right=160)
    
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'<w:top w:val="none"/>'
        f'<w:left w:val="single" w:sz="36" w:space="0" w:color="{color_hex}"/>'
        f'<w:bottom w:val="none"/>'
        f'<w:right w:val="none"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.line_spacing = 1.15
    run_t = p.add_run(f"📌 {title}: ")
    run_t.bold = True
    run_t.font.color.rgb = RGBColor(11, 37, 69)
    run_t.font.size = Pt(10)
    
    run_b = p.add_run(text)
    run_b.font.size = Pt(9.5)
    run_b.font.color.rgb = RGBColor(30, 41, 59)
    
    doc.add_paragraph().paragraph_format.space_after = Pt(6)

def add_code_block(doc, code_str, title=None):
    if title:
        p_title = doc.add_paragraph()
        p_title.paragraph_format.space_before = Pt(6)
        p_title.paragraph_format.space_after = Pt(2)
        r = p_title.add_run(f"💻 Mã nguồn / Đặc tả: {title}")
        r.bold = True
        r.font.size = Pt(9.5)
        r.font.color.rgb = RGBColor(2, 132, 199)

    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = tbl.cell(0, 0)
    set_cell_background(cell, "0F172A")
    set_cell_margins(cell, top=120, bottom=120, left=160, right=160)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.1
    run = p.add_run(code_str.strip())
    run.font.name = "Consolas"
    run.font.size = Pt(8.5)
    run.font.color.rgb = RGBColor(226, 232, 240)
    
    doc.add_paragraph().paragraph_format.space_after = Pt(6)

def build_week4_report():
    doc = docx.Document()

    # Cấu hình lề trang tiêu chuẩn học thuật (Top=2cm, Bottom=2cm, Left=3cm, Right=2cm)
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(0.8)

    # 1. TIÊU ĐỀ BÁO CÁO
    p_header = doc.add_paragraph()
    p_header.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_header.paragraph_format.space_before = Pt(0)
    p_header.paragraph_format.space_after = Pt(2)
    r_sub = p_header.add_run("BỘ GIÁO DỤC VÀ ĐÀO TẠO — DỰ ÁN PHẦN MỀM THÔNG MINH\n")
    r_sub.font.size = Pt(10)
    r_sub.font.color.rgb = RGBColor(100, 116, 139)

    r_main = p_header.add_run("BÁO CÁO TIẾN ĐỘ DỰ ÁN — TUẦN 4\n")
    r_main.bold = True
    r_main.font.size = Pt(18)
    r_main.font.color.rgb = RGBColor(11, 37, 69)

    r_project = p_header.add_run("ĐỀ TÀI: HỆ THỐNG CẢNH BÁO NGẬP LỤT ĐÔ THỊ THÔNG MINH (SMART FLOOD WARNING)\n")
    r_project.bold = True
    r_project.font.size = Pt(12)
    r_project.font.color.rgb = RGBColor(2, 132, 199)

    p_meta = doc.add_paragraph()
    p_meta.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_meta.paragraph_format.space_after = Pt(16)
    r_meta = p_meta.add_run("Học kỳ: 2026-2027 | Đối tượng: Ban Chỉ Huy Vận Hành & Cộng Đồng Người Dân TP.HCM\nThời gian báo cáo: Tuần 4 | Định dạng: Chuẩn kiến trúc MVC & RESTful API")
    r_meta.font.size = Pt(9.5)
    r_meta.font.italic = True
    r_meta.font.color.rgb = RGBColor(71, 85, 105)

    add_callout(
        doc,
        "Tuần 4 ghi nhận bước đột phá về tính năng kết nối nghiệp vụ cốt lõi: Triển khai hoàn chỉnh phân hệ Quản lý mạng lưới Trạm Quan trắc IoT viễn trắc (Stations Management) và khắc phục toàn diện chu trình Kiểm duyệt tin báo cộng đồng (Citizen Reports Moderation) đồng bộ điểm ngập WebGIS thời gian thực qua WebSocket Hub.",
        title="TÓM TẮT TRỌNG TÂM TUẦN 4",
        color_hex="0284C7",
        bg_hex="F0F9FF"
    )

    # CHƯƠNG 1: BỐI CẢNH VÀ MỤC TIÊU TRIỂN KHAI
    p_c1 = doc.add_paragraph()
    r = p_c1.add_run("1. BỐI CẢNH VÀ MỤC TIÊU TRIỂN KHAI TRONG TUẦN 4")
    r.bold = True
    r.font.size = Pt(13)
    r.font.color.rgb = RGBColor(11, 37, 69)

    p1 = doc.add_paragraph()
    p1.paragraph_format.space_after = Pt(6)
    p1.paragraph_format.line_spacing = 1.15
    p1.add_run(
        "Trong các tuần trước, hệ thống đã xây dựng khung giao diện Client (React + Leaflet GIS), Admin Dashboard và khung máy chủ Express MVC. "
        "Tuy nhiên, khi tích hợp thực tế giữa Client - Admin - Server đã nảy sinh hai 'điểm nghẽn' (bottlenecks) nghiệp vụ nghiêm trọng:\n"
        "• Thiếu hụt API Trạm Quan trắc IoT: Cả Client và Admin đều có giao diện giám sát trạm đo mưa, triều cường nhưng tầng Backend chưa có StationsController và Route, dẫn tới ứng dụng phải liên tục fallback về dữ liệu mẫu cứng (hardcoded mock) trong khối catch.\n"
        "• Đứt gãy luồng Phê duyệt báo cáo ngập: Trong admin.routes.ts, endpoint duyệt tin báo (/reports/:id/moderate) mắc lỗi bất đồng bộ (chạy đồng thời 2 lần, thiếu await Promise), khiến báo cáo sau khi được cán bộ duyệt không được chuyển hóa thành điểm ngập WebGIS và không kích hoạt được cơ chế WebSocket Realtime broadcast tới người dân."
    )

    doc.add_paragraph().paragraph_format.space_after = Pt(4)

    # Bảng mục tiêu
    goals_data = [
        ["Hạng Mục", "Thực Trạng Trước Tuần 4", "Mục Tiêu Hoàn Thành Tuần 4", "Mức Ưu Tiên"],
        ["Phân hệ Trạm IoT", "Chưa có Controller & Route; Admin báo lỗi 404", "Xây dựng StationService, StationsController, router /api/stations", "Rất cao (P0)"],
        ["Đối soát Cảm biến", "Kiểm duyệt thủ công không có căn cứ đối soát", "Thuật toán Haversine tìm trạm gần nhất (Sensor Correlation)", "Cao (P1)"],
        ["Điều khiển từ xa", "Chưa có cơ chế gửi lệnh reboot trạm", "Endpoint POST /api/stations/:code/restart mô phỏng MQTT", "Trung bình (P2)"],
        ["Chu trình Duyệt tin", "Lỗi async/await, không sinh điểm ngập WebGIS", "Đồng bộ khép kín: Duyệt -> Tạo FloodPoint -> Phát Realtime Hub", "Rất cao (P0)"],
        ["Nhật ký Kiểm toán", "Chưa ghi log hành động kiểm duyệt và điều khiển", "Tích hợp AuditLogService ghi nhận IP, Staff, Severity", "Cao (P1)"]
    ]
    tbl_goals = doc.add_table(rows=len(goals_data), cols=4)
    for r_idx, row in enumerate(goals_data):
        for c_idx, val in enumerate(row):
            tbl_goals.cell(r_idx, c_idx).paragraphs[0].text = val
    style_table(tbl_goals, col_widths=[1.5, 2.0, 2.7, 1.1])

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    # CHƯƠNG 2: KIẾN TRÚC THIẾT KẾ & ĐẶC TẢ NGHIỆP VỤ (MÔ HÌNH MVC)
    p_c2 = doc.add_paragraph()
    r = p_c2.add_run("2. KIẾN TRÚC THIẾT KẾ VÀ ĐẶC TẢ NGHIỆP VỤ MỚI")
    r.bold = True
    r.font.size = Pt(13)
    r.font.color.rgb = RGBColor(11, 37, 69)

    p2 = doc.add_paragraph()
    p2.paragraph_format.space_after = Pt(6)
    p2.paragraph_format.line_spacing = 1.15
    p2.add_run(
        "Toàn bộ chức năng mới được thiết kế tuân thủ nghiêm ngặt mô hình kiến trúc MVC (Model - View - Controller) "
        "kết hợp mô hình Web Decoupled hiện đại, bảo đảm nguyên tắc Single Responsibility Principle (SRP) và High Cohesion / Low Coupling:"
    )

    arch_points = [
        ("Tầng Model & Entity (server/src/models/Station.entity.ts): ", "Định nghĩa cấu trúc thực thể trạm quan trắc IoT gồm mã trạm (code), tên trạm, loại cảm biến (rain/tide/combined), tọa độ GIS (lat, lng), chỉ số đo (currentRainMm, currentTideM), mức pin (batteryPercent) và mức sóng (signalDbm)."),
        ("Tầng Dịch vụ Nghiệp vụ (server/src/services/StationService.ts): ", "Chịu trách nhiệm toàn bộ logic nghiệp vụ: quản lý danh mục trạm, thực thi lệnh restart trạm, và giải thuật Haversine tính toán khoảng cách cầu đo đạc để tìm trạm gần nhất phục vụ đối soát cảm biến."),
        ("Tầng Điều khiển (server/src/controllers/StationsController.ts): ", "Đóng vai trò Controller chuẩn: tiếp nhận HTTP Request, trích xuất và kiểm tra tham số, ủy quyền xử lý cho Service và định dạng phản hồi chuẩn JSON cho View."),
        ("Tầng Định tuyến (server/src/routes/station.routes.ts & admin.routes.ts): ", "Định tuyến URL RESTful, bảo đảm an toàn middleware phân quyền và kết nối kênh phát thời gian thực WebSocket Hub.")
    ]
    for bold_text, normal_text in arch_points:
        p_pt = doc.add_paragraph(style='List Bullet')
        p_pt.paragraph_format.space_after = Pt(3)
        r_b = p_pt.add_run(bold_text)
        r_b.bold = True
        r_b.font.color.rgb = RGBColor(11, 37, 69)
        p_pt.add_run(normal_text)

    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # Sơ đồ tuần tự bằng text box
    seq_diagram_text = (
        "┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐\n"
        "│  Cán bộ Quản trị │       │  Admin Router   │       │  Dịch vụ lõi    │       │  Realtime Hub   │\n"
        "│ (Reports Review)│       │ (admin.routes)  │       │(Report+PointSvc)│       │   (FloodHub)    │\n"
        "└────────┬────────┘       └────────┬────────┘       └────────┬────────┘       └────────┬────────┘\n"
        "         │ 1. POST /reports/:id/moderate     │                       │                 │\n"
        "         │ { action: 'approved' }            │                       │                 │\n"
        "         ├──────────────────────────────────>│                       │                 │\n"
        "         │                                   │ 2. await moderate()   │                 │\n"
        "         │                                   ├──────────────────────>│                 │\n"
        "         │                                   │ 3. upsertFromReport() │                 │\n"
        "         │                                   ├──────────────────────>│                 │\n"
        "         │                                   │                       │                 │\n"
        "         │                                   │ 4. broadcastNewFloodPoint(floodPoint)   │\n"
        "         │                                   ├────────────────────────────────────────>│\n"
        "         │                                   │                       │   (Bắn Socket   │\n"
        "         │                                   │                       │    đến Client)  │\n"
        "         │ 5. { success: true, floodPoint }  │                       │                 │\n"
        "         │<──────────────────────────────────┤                       │                 │\n"
    )
    add_code_block(doc, seq_diagram_text, title="Quy trình Tuần tự (Sequence Diagram) Duyệt Tin Báo & Đồng Bộ WebGIS")

    # CHƯƠNG 3: CHI TIẾT CÀI ĐẶT MÃ NGUỒN CỐT LÕI
    p_c3 = doc.add_paragraph()
    r = p_c3.add_run("3. CHI TIẾT CÀI ĐẶT MÃ NGUỒN CỐT LÕI")
    r.bold = True
    r.font.size = Pt(13)
    r.font.color.rgb = RGBColor(11, 37, 69)

    p3_1 = doc.add_paragraph()
    p3_1.paragraph_format.space_after = Pt(3)
    r = p3_1.add_run("3.1. Thuật Toán Đối Soát Cảm Biến Lân Cận (Sensor Correlation Engine)")
    r.bold = True
    r.font.size = Pt(11)
    r.font.color.rgb = RGBColor(2, 132, 199)

    p3_1_desc = doc.add_paragraph()
    p3_1_desc.paragraph_format.space_after = Pt(4)
    p3_1_desc.add_run(
        "Để hỗ trợ cán bộ phát hiện tin báo giả mạo, hệ thống sử dụng công thức lượng giác Haversine "
        "để quét bán kính địa cầu từ tọa độ GPS của người dân gửi về tới toàn bộ các trạm quan trắc IoT:"
    )

    haversine_code = """public static findClosestStation(lat: number, lng: number): { station: StationEntity; distanceKm: number } | null {
  if (!lat || !lng || isNaN(lat) || isNaN(lng) || this.stations.length === 0) return null;

  let closest: StationEntity = this.stations[0];
  let minDistance = Infinity;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371; // Bán kính Trái Đất theo km

  for (const s of this.stations) {
    const dLat = toRad(s.lat - lat);
    const dLon = toRad(s.lng - lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat)) * Math.cos(toRad(s.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = R * c;

    if (dist < minDistance) {
      minDistance = dist;
      closest = s;
    }
  }

  return { station: closest, distanceKm: Math.round(minDistance * 100) / 100 };
}"""
    add_code_block(doc, haversine_code, title="Thuật toán Haversine trong StationService.ts")

    p3_2 = doc.add_paragraph()
    p3_2.paragraph_format.space_after = Pt(3)
    r = p3_2.add_run("3.2. Khắc Phục Luồng Duyệt Báo Cáo & Realtime WebGIS (admin.routes.ts)")
    r.bold = True
    r.font.size = Pt(11)
    r.font.color.rgb = RGBColor(2, 132, 199)

    moderation_code = """router.post('/reports/:id/moderate', async (req, res) => {
  const id = String(req.params.id);
  const { action } = req.body;
  if (!action) {
    return res.status(400).json({ success: false, error: 'NO_ACTION', message: 'Bạn chưa chọn hành động duyệt báo cáo.' });
  }

  try {
    const updated = await citizenReportService.moderate(id, action);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'NOT_FOUND', message: 'Không tìm thấy báo cáo để duyệt.' });
    }

    let floodPoint = null;
    if (action === 'approved') {
      floodPoint = await floodPointService.upsertFromReport(updated);
      if (floodHub) {
        floodHub.broadcastNewFloodPoint(floodPoint); // Đồng bộ WebGIS qua WebSocket tức thì
      }
    }

    await AuditLogService.logEvent(
      `${action === 'approved' ? 'Phê duyệt hiển thị điểm ngập' : 'Từ chối tin báo ngập'} #${id} (${updated.street})`,
      'MODERATION', 'Cán bộ Kiểm duyệt', req.ip || '127.0.0.1', action === 'approved' ? 'info' : 'warn'
    );

    return res.json({ success: true, id, status: updated.status, floodPoint });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'MODERATION_ERROR', message: err.message });
  }
});"""
    add_code_block(doc, moderation_code, title="Luồng Xử Lý Bất Đồng Bộ Chuẩn Xác tại admin.routes.ts")

    # CHƯƠNG 4: DANH MỤC API ENDPOINTS TRIỂN KHAI
    p_c4 = doc.add_paragraph()
    r = p_c4.add_run("4. DANH MỤC RESTFUL API ENDPOINTS VỪA HOÀN THIỆN")
    r.bold = True
    r.font.size = Pt(13)
    r.font.color.rgb = RGBColor(11, 37, 69)

    api_data = [
        ["Phương Thức", "Đường Dẫn Endpoint", "Mô Tả Nghiệp Vụ", "Quyền Truy Cập"],
        ["GET", "/api/stations", "Truy vấn danh sách toàn bộ trạm quan trắc IoT viễn trắc", "Công khai (Public)"],
        ["GET", "/api/stations/closest", "Tìm trạm quan trắc gần nhất theo tham số ?lat=..&lng=..", "Công khai / Internal"],
        ["GET", "/api/stations/:code", "Xem chi tiết chỉ số đo, dung lượng pin, mức sóng của 1 trạm", "Công khai (Public)"],
        ["POST", "/api/stations/:code/restart", "Gửi lệnh khởi động lại trạm đo từ xa qua giao thức MQTT", "Quản trị viên (Admin)"],
        ["POST", "/api/admin/reports/:id/moderate", "Duyệt tin báo (Approved/Rejected) và tự động đồng bộ WebGIS", "Cán bộ Duyệt Tin"],
        ["GET", "/api/admin/logs", "Truy xuất danh sách nhật ký kiểm toán hệ thống (Audit Logs)", "Quản trị viên (Admin)"]
    ]
    tbl_api = doc.add_table(rows=len(api_data), cols=4)
    for r_idx, row in enumerate(api_data):
        for c_idx, val in enumerate(row):
            tbl_api.cell(r_idx, c_idx).paragraphs[0].text = val
    style_table(tbl_api, col_widths=[1.2, 2.5, 2.6, 1.2])

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    # CHƯƠNG 5: KẾT QUẢ THỬ NGHIỆM VÀ ĐÁNH GIÁ HIỆU NĂNG
    p_c5 = doc.add_paragraph()
    r = p_c5.add_run("5. KẾT QUẢ THỬ NGHIỆM VÀ ĐÁNH GIÁ CHẤT LƯỢNG")
    r.bold = True
    r.font.size = Pt(13)
    r.font.color.rgb = RGBColor(11, 37, 69)

    test_points = [
        ("Kiểm thử Tích Hợp Frontend Admin: ", "Trang Quản lý Trạm (StationManagementPage.tsx) và Bảng điều khiển (DashboardPage.tsx) không còn bị lỗi fallback mảng cứng; danh sách 6 trạm IoT chiến lược tại TP.HCM (Phú An, Nhà Bè, Chợ Thủ Đức, Lò Gốm, Mễ Cốc, Nhiêu Lộc) hiển thị chính xác theo thời gian thực."),
        ("Kiểm thử Lệnh Điều Khiển Từ Xa: ", "Thực thi nút 'Khởi động lại trạm' trên giao diện Admin; hệ thống trả về HTTP 200 kèm thông điệp MQTT xác nhận, đồng thời ghi nhận 1 bản ghi vào AuditLog."),
        ("Kiểm thử Luồng Realtime Duyệt Tin: ", "Gửi báo cáo ngập từ Client -> Báo cáo xuất hiện trên hàng đợi Admin -> Cán bộ bấm 'Phê duyệt' -> Điểm ngập lập tức xuất hiện trên bản đồ Leaflet của cả Client và Admin mà không cần tải lại trang (Zero Reload)."),
        ("Độ ổn định kiến trúc: ", "Đáp ứng 100% tiêu chí kiến trúc MVC đề ra trong tài liệu docs/mvc-architecture.md.")
    ]
    for bold_text, normal_text in test_points:
        p_pt = doc.add_paragraph(style='List Bullet')
        p_pt.paragraph_format.space_after = Pt(3)
        r_b = p_pt.add_run(bold_text)
        r_b.bold = True
        r_b.font.color.rgb = RGBColor(11, 37, 69)
        p_pt.add_run(normal_text)

    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # CHƯƠNG 6: KẾ HOẠCH BÀN GIAO & PHÁT TRIỂN TUẦN 5
    p_c6 = doc.add_paragraph()
    r = p_c6.add_run("6. KẾ HOẠCH BÀN GIAO VÀ PHÁT TRIỂN TUẦN 5")
    r.bold = True
    r.font.size = Pt(13)
    r.font.color.rgb = RGBColor(11, 37, 69)

    p6 = doc.add_paragraph()
    p6.paragraph_format.space_after = Pt(4)
    p6.paragraph_format.line_spacing = 1.15
    p6.add_run(
        "Tiếp nối thành công của Tuần 4, nhóm phát triển đề ra các mục tiêu trọng tâm cho Tuần 5:\n"
        "1. Triển khai phân quyền xác thực Role-Based Access Control (RBAC) chặt chẽ cho toàn bộ nhóm endpoint /api/admin/*.\n"
        "2. Tích hợp nén ảnh Client-side và tải trực tiếp lên Supabase Storage bucket flood-report-images.\n"
        "3. Xây dựng bộ nhớ đệm (Cache) cho kết quả định tuyến tránh ngập OpenRouteService, hạn chế nguy cơ vượt ngưỡng Rate Limit 40 req/min.\n"
        "4. Đóng gói ứng dụng Client dưới dạng PWA (Progressive Web App) hỗ trợ lưu trữ tin báo ngập ngoại tuyến (Offline Mode) khi mất sóng điện thoại trong mưa bão."
    )

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # CHỮ KÝ XÁC NHẬN
    tbl_sign = doc.add_table(rows=1, cols=2)
    tbl_sign.alignment = WD_TABLE_ALIGNMENT.CENTER
    c_left = tbl_sign.cell(0, 0)
    c_right = tbl_sign.cell(0, 1)
    
    p_l = c_left.paragraphs[0]
    p_l.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r1 = p_l.add_run("CÁN BỘ PHỤ TRÁCH KIỂM ĐỊNH\n")
    r1.bold = True
    r2 = p_l.add_run("(Ký và ghi rõ họ tên)\n\n\n\n")
    r2.italic = True
    r3 = p_l.add_run("Ban Chỉ Huy PTTK CSDL & GIS")
    r3.bold = True

    p_r = c_right.paragraphs[0]
    p_r.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r1 = p_r.add_run("ĐẠI DIỆN ĐỘI NGŨ PHÁT TRIỂN\n")
    r1.bold = True
    r2 = p_r.add_run("(Ký và ghi rõ họ tên)\n\n\n\n")
    r2.italic = True
    r3 = p_r.add_run("Kỹ Sư Trưởng Dự Án (Lead Engineer)")
    r3.bold = True

    output_path = "report_week4.docx"
    doc.save(output_path)
    print(f"SUCCESS: Đã tạo thành công file báo cáo Word Tuần 4 tại: {output_path}")

if __name__ == "__main__":
    build_week4_report()

