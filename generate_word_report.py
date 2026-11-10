# -*- coding: utf-8 -*-
"""
Script tạo file Word (.docx) Báo cáo Phân tích Thiết kế Hệ thống Thông tin & Cơ sở Dữ liệu
Đề tài: Hệ thống giám sát, cảnh báo ngập lụt đô thị và điều hướng thông minh thời gian thực (Crowdsourcing WebGIS)
Chuẩn học thuật môn PTTK CSDL
"""

import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

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
            set_cell_margins(cell, top=100, bottom=100, left=140, right=140)
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
    set_cell_margins(cell, top=120, bottom=120, left=180, right=160)
    
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
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.15
    
    r_title = p.add_run(f"[{title}]\n")
    r_title.bold = True
    r_title.font.color.rgb = RGBColor(2, 132, 199)
    r_title.font.size = Pt(10)
    
    r_text = p.add_run(text)
    r_text.font.size = Pt(10)
    r_text.font.italic = True
    r_text.font.color.rgb = RGBColor(30, 41, 59)
    
    doc.add_paragraph().paragraph_format.space_after = Pt(4)

def add_code_block(doc, code_str, title=None):
    if title:
        p_title = doc.add_paragraph()
        p_title.paragraph_format.space_before = Pt(6)
        p_title.paragraph_format.space_after = Pt(2)
        r = p_title.add_run(f"Mã kịch bản: {title}")
        r.bold = True
        r.font.size = Pt(10)
        r.font.color.rgb = RGBColor(11, 37, 69)
        
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = tbl.cell(0, 0)
    set_cell_background(cell, "0B132B")
    set_cell_margins(cell, top=100, bottom=100, left=150, right=150)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.1
    
    lines = code_str.strip().split("\n")
    for i, line in enumerate(lines):
        r = p.add_run(line + ("\n" if i < len(lines)-1 else ""))
        r.font.name = "Consolas"
        r.font.size = Pt(8.5)
        r.font.color.rgb = RGBColor(226, 232, 240)
        
    doc.add_paragraph().paragraph_format.space_after = Pt(6)

def build_word_document():
    doc = docx.Document()
    
    for section in doc.sections:
        section.page_width = Inches(8.27)
        section.page_height = Inches(11.69)
        section.top_margin = Inches(0.85)
        section.bottom_margin = Inches(0.85)
        section.left_margin = Inches(0.9)
        section.right_margin = Inches(0.9)
        
    style_normal = doc.styles['Normal']
    style_normal.font.name = 'Times New Roman'
    style_normal.font.size = Pt(11)
    style_normal.font.color.rgb = RGBColor(30, 41, 59)
    style_normal.paragraph_format.line_spacing = 1.2
    style_normal.paragraph_format.space_after = Pt(5)

    # 1. TRANG BÌA
    p_univ = doc.add_paragraph()
    p_univ.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_univ.paragraph_format.space_before = Pt(10)
    p_univ.paragraph_format.space_after = Pt(2)
    r = p_univ.add_run("BỘ GIÁO DỤC VÀ ĐÀO TẠO — TRƯỜNG ĐẠI HỌC\nKHOA CÔNG NGHỆ THÔNG TIN")
    r.bold = True
    r.font.size = Pt(12)
    r.font.color.rgb = RGBColor(11, 37, 69)

    p_line = doc.add_paragraph()
    p_line.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_line.paragraph_format.space_after = Pt(36)
    r = p_line.add_run("━━━━━━━━━━━━━━━━━━━ ◆ ━━━━━━━━━━━━━━━━━━━")
    r.font.color.rgb = RGBColor(2, 132, 199)

    p_report = doc.add_paragraph()
    p_report.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_report.paragraph_format.space_after = Pt(8)
    r = p_report.add_run("BÁO CÁO ĐỒ ÁN MÔN HỌC")
    r.bold = True
    r.font.size = Pt(15)
    r.font.color.rgb = RGBColor(2, 132, 199)

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_after = Pt(16)
    r = p_sub.add_run("PHÂN TÍCH THIẾT KẾ HỆ THỐNG THÔNG TIN VÀ CƠ SỞ DỮ LIỆU")
    r.bold = True
    r.font.size = Pt(14)
    r.font.color.rgb = RGBColor(11, 37, 69)

    tbl_title = doc.add_table(rows=1, cols=1)
    tbl_title.alignment = WD_TABLE_ALIGNMENT.CENTER
    c_title = tbl_title.cell(0, 0)
    set_cell_background(c_title, "F8FAFC")
    set_cell_margins(c_title, top=200, bottom=200, left=200, right=200)
    tcPr = c_title._tc.get_or_add_tcPr()
    borders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'<w:top w:val="single" w:sz="16" w:color="0284C7"/>'
        f'<w:left w:val="single" w:sz="32" w:color="0284C7"/>'
        f'<w:bottom w:val="single" w:sz="16" w:color="0284C7"/>'
        f'<w:right w:val="single" w:sz="16" w:color="0284C7"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(borders)
    p_box = c_title.paragraphs[0]
    p_box.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p_box.add_run("ĐỀ TÀI:\n")
    r.font.size = Pt(12)
    r.font.color.rgb = RGBColor(100, 116, 139)
    r = p_box.add_run("HỆ THỐNG GIÁM SÁT, CẢNH BÁO NGẬP LỤT ĐÔ THỊ\nVÀ ĐIỀU HƯỚNG THÔNG MINH THỜI GIAN THỰC\nDỰA TRÊN DỮ LIỆU CỘNG ĐỒNG (CROWDSOURCING WEBGIS)")
    r.bold = True
    r.font.size = Pt(16)
    r.font.color.rgb = RGBColor(11, 37, 69)

    p_info = doc.add_paragraph()
    p_info.paragraph_format.space_before = Pt(50)
    p_info.paragraph_format.space_after = Pt(4)
    p_info.paragraph_format.left_indent = Inches(1.5)
    
    r = p_info.add_run("Giảng viên hướng dẫn:\t\t")
    r.bold = True
    p_info.add_run("TS. Giảng Viên Phụ Trách Bộ Môn\n")
    
    r = p_info.add_run("Môn học:\t\t\t\t")
    r.bold = True
    p_info.add_run("Phân tích Thiết kế CSDL (PTTK CSDL)\n")
    
    r = p_info.add_run("Sinh viên thực hiện:\t\t")
    r.bold = True
    p_info.add_run("Nhóm Sinh Viên Đề Tài\n")
    
    r = p_info.add_run("Lớp học phần:\t\t\t")
    r.bold = True
    p_info.add_run("Công Nghệ Thông Tin / Hệ Thống Thông Tin\n")
    
    r = p_info.add_run("Học kỳ / Niên khóa:\t\t")
    r.bold = True
    p_info.add_run("Học kỳ I — Năm học 2026 - 2027")

    p_footer_cover = doc.add_paragraph()
    p_footer_cover.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_footer_cover.paragraph_format.space_before = Pt(70)
    r = p_footer_cover.add_run("TP. HỒ CHÍ MINH, THÁNG 10 NĂM 2026")
    r.bold = True
    r.font.size = Pt(11)
    r.font.color.rgb = RGBColor(100, 116, 139)

    doc.add_page_break()

    # CHƯƠNG 1
    p_c1 = doc.add_paragraph()
    r = p_c1.add_run("CHƯƠNG 1: TỔNG QUAN VÀ MỤC TIÊU DỰ ÁN")
    r.bold = True
    r.font.size = Pt(14)
    r.font.color.rgb = RGBColor(11, 37, 69)

    doc.add_paragraph(
        "Tại các đô thị lớn ở Việt Nam, đặc biệt là TP. Hồ Chí Minh, tình trạng ngập lụt do triều cường kết hợp "
        "mưa lớn cực đoan ngày càng diễn biến phức tạp. Việc thiếu thông tin hiện trường theo thời gian thực "
        "khiến hàng trăm nghìn người dân gặp cảnh chết máy, kẹt xe hàng giờ và thiệt hại kinh tế nặng nề. "
        "Mặt khác, mạng lưới trạm quan trắc IoT cố định có khoảng cách xa và chưa bao phủ được từng con hẻm, "
        "tuyến đường nội bộ."
    )

    doc.add_paragraph(
        "Dự án 'Hệ thống giám sát, cảnh báo ngập lụt đô thị và điều hướng thông minh thời gian thực' ra đời nhằm "
        "kết hợp hài hòa giữa cơ chế dữ liệu đám đông (Crowdsourcing) từ người dân và số liệu quan trắc thủy văn "
        "chính xác từ mạng lưới cảm biến IoT. Hệ thống xây dựng một nền tảng WebGIS tương tác trực quan, tích hợp "
        "thuật toán tìm lộ trình an toàn né ngập, cơ chế Gamification tích điểm đổi quà và mạng xã hội chia sẻ lộ trình."
    )

    add_callout(
        doc,
        "Hệ thống vận hành theo nguyên tắc 3 Không: Không để người dân mù mờ về điểm ngập; "
        "Không dung túng báo cáo tin giả (Anti-Spam phạt điểm uy tín); Không chỉ cảnh báo thụ động mà chủ động "
        "điều hướng lộ trình an toàn theo tọa độ GPS thực tế.",
        title="TÔN CHỈ THIẾT KẾ KIẾN TRÚC"
    )

    # CHƯƠNG 2
    p_c2 = doc.add_paragraph()
    r = p_c2.add_run("CHƯƠNG 2: PHÂN TÍCH YÊU CẦU HỆ THỐNG")
    r.bold = True
    r.font.size = Pt(14)
    r.font.color.rgb = RGBColor(11, 37, 69)

    p_h21 = doc.add_paragraph()
    r = p_h21.add_run("2.1. Yêu cầu Chức năng (Functional Requirements - FR)")
    r.bold = True
    r.font.size = Pt(12)
    r.font.color.rgb = RGBColor(2, 132, 199)

    fr_data = [
        ["Mã FR", "Tên Chức Năng", "Mô Tả Nghiệp Vụ Chi Tiết", "Tác Nhân (Actors)"],
        ["FR-01", "Quản lý Tài khoản & Phân quyền", "Đăng ký, đăng nhập JWT, SSO Google/Zalo, phân quyền RBAC (Guest, Citizen, Moderator, Admin).", "Guest, Citizen, Admin"],
        ["FR-02", "Báo cáo Điểm ngập GPS", "Gửi tọa độ GPS hiện trường, chụp/tải ảnh hoặc video, ước tính độ sâu (cm), mô tả lưu thông.", "Citizen"],
        ["FR-03", "Đối soát & Duyệt tin tự động", "Tự động đối soát bán kính 1.5km với trạm đo IoT mưa/triều; hàng đợi kiểm duyệt viên thủ công.", "Moderator, Admin, IoT"],
        ["FR-04", "Kiểm chứng đám đông (Confirm)", "Người dân đang lưu thông bấm xác nhận điểm ngập của người khác nhận ngay +5 điểm.", "Citizen"],
        ["FR-05", "Bản đồ Nhiệt GIS Realtime", "Hiển thị heatmap đa giác ngập 3 cấp độ: Ngập nhẹ (<20cm), Trung bình (20-40cm), Sâu (>40cm).", "Tất cả tác nhân"],
        ["FR-06", "Điều hướng né ngập thông minh", "Thuật toán Dijkstra/A* có trọng số né hoàn toàn các tuyến đường có điểm ngập sâu >30cm.", "Guest, Citizen"],
        ["FR-07", "Gamification & Tích điểm", "Tự động cộng điểm (+50đ duyệt, +20đ ảnh, +30đ sớm nhất, +5đ xác nhận); phạt -30đ uy tín nếu spam.", "Citizen, System"],
        ["FR-08", "Kho Đổi thưởng & Voucher", "Đổi điểm lấy thẻ cào điện thoại, voucher xăng dầu Petrolimex, vé xe buýt/Metro, siêu thị Co.opmart.", "Citizen"],
        ["FR-09", "Cấp bậc & Danh hiệu (Badges)", "Tự động đánh giá 4 danh hiệu: Cư dân Tích cực, Dẫn đường Trách nhiệm, Hiệp sĩ Mùa lũ, TNV Tiên phong.", "System, Citizen"],
        ["FR-10", "Mạng xã hội & Chat 1-1", "Tìm bạn qua SĐT, gợi ý người báo gần đó, nhắn tin thời gian thực đính kèm tọa độ GPS & ảnh ngập.", "Citizen"],
        ["FR-11", "Bảng vàng Xếp hạng (Leaderboard)", "Top 10 người dân đóng góp điểm tích lũy cao nhất trong tháng và trọn đời toàn thành phố.", "Tất cả tác nhân"],
        ["FR-12", "Ứng phó Cứu nạn Cứu hộ 114", "Gửi yêu cầu cứu nạn khẩn cấp SOS (xuồng cứu hộ, y tế, người già/trẻ nhỏ), tra cứu đường dây nóng 114.", "Citizen, Admin"],
        ["FR-13", "Quản trị Mạng lưới Trạm & Cảm biến", "Giám sát trạng thái trạm IoT (Online/Offline), cấu hình ngưỡng cảnh báo theo từng loại cảm biến.", "Admin, IoT"]
    ]

    tbl_fr = doc.add_table(rows=len(fr_data), cols=4)
    for r_idx, row in enumerate(fr_data):
        for c_idx, val in enumerate(row):
            tbl_fr.cell(r_idx, c_idx).paragraphs[0].text = val
    style_table(tbl_fr, col_widths=[0.9, 1.8, 3.2, 1.4])

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    p_h22 = doc.add_paragraph()
    r = p_h22.add_run("2.2. Yêu cầu Phi chức năng (Non-Functional Requirements - NFR)")
    r.bold = True
    r.font.size = Pt(12)
    r.font.color.rgb = RGBColor(2, 132, 199)

    nfr_data = [
        ["Nhóm Yêu Cầu", "Tiêu Chuẩn Định Lượng", "Giải Pháp Kiến Trúc Kỹ Thuật"],
        ["Hiệu năng (Performance)", "Thời gian tải bản đồ WebGIS <= 1.5s; Phản hồi API <= 300ms", "Index không gian PostGIS GIST, nén Tile Vector Mapbox"],
        ["Thời gian thực (Realtime)", "Độ trễ cập nhật cảnh báo & tin nhắn chat <= 200ms", "Giao thức WebSocket (Socket.IO Hub) kết hợp Redis Pub/Sub"],
        ["Bảo mật (Security)", "Bảo vệ thông tin định danh và tọa độ người dùng", "JWT Stateless Auth, BCrypt hash mật khẩu, ẩn danh SĐT"],
        ["Chống gian lận (Anti-Fraud)", "Ngăn chặn spam tọa độ và đăng tin giả mạo", "Rate-limit Redis: tối đa 3 tin/khu vực/ngày; trừ 30đ uy tín"],
        ["Tính sẵn sàng (Availability)", "Đảm bảo Uptime đạt tối thiểu 99.9% mùa mưa", "Docker Container hóa, tự động mở rộng cụm Pods Kubernetes"]
    ]

    tbl_nfr = doc.add_table(rows=len(nfr_data), cols=3)
    for r_idx, row in enumerate(nfr_data):
        for c_idx, val in enumerate(row):
            tbl_nfr.cell(r_idx, c_idx).paragraphs[0].text = val
    style_table(tbl_nfr, col_widths=[1.8, 2.5, 3.0])

    doc.add_page_break()

    # CHƯƠNG 3
    p_c3 = doc.add_paragraph()
    r = p_c3.add_run("CHƯƠNG 3: MÔ HÌNH HÓA CHỨC NĂNG BẰNG UML")
    r.bold = True
    r.font.size = Pt(14)
    r.font.color.rgb = RGBColor(11, 37, 69)

    doc.add_paragraph(
        "Hệ thống bao gồm 4 nhóm tác nhân chính tương tác: Guest, Citizen, Moderator/Admin và External IoT. "
        "Dưới đây là đặc tả chi tiết 2 Use Case cốt lõi nhất của hệ thống:"
    )

    spec1_data = [
        ["Thuộc tính", "Nội dung đặc tả chi tiết"],
        ["Tên Use Case", "Gửi báo cáo ngập lụt hiện trường (Submit Citizen Flood Report)"],
        ["Mã định danh", "UC-CORE-01"],
        ["Tác nhân chính", "Người dân (Citizen)"],
        ["Mục tiêu", "Ghi nhận vị trí ngập GPS, hình ảnh và độ sâu thực tế để cảnh báo cộng đồng và nhận điểm thưởng."],
        ["Điều kiện tiên quyết", "1. Citizen đã đăng nhập tài khoản hợp lệ.\n2. Điểm uy tín >= 50/100 (tài khoản không bị khóa).\n3. Thiết bị đã bật quyền định vị GPS."],
        ["Điều kiện sau", "1. Báo cáo lưu vào CSDL ở trạng thái PENDING.\n2. Tăng số lượng tin đã gửi trong ngày tại quận lên 1.\n3. Đẩy tin báo vào hàng đợi duyệt của Ban chỉ huy."],
        ["Luồng sự kiện chính (Main Flow)", 
         "1. Citizen nhấn 'Gửi Báo Cáo Ngập' trên thanh điều hướng.\n"
         "2. Hệ thống định vị GPS, điền tọa độ và địa chỉ tuyến đường.\n"
         "3. Hệ thống kiểm tra Rate Limit (< 3 tin/ngày tại khu vực).\n"
         "4. Citizen chọn mức ngập (Ngập nhẹ <20cm, nửa bánh xe ~30cm, ngập bô ~40cm, ngang đùi >50cm).\n"
         "5. Citizen tải 1-3 ảnh chụp hiện trường rõ nét.\n"
         "6. Citizen nhập ghi chú lưu thông và bấm 'GỬI BÁO CÁO NGAY'.\n"
         "7. Hệ thống xác thực, lưu bản ghi và gửi thông báo thành công."]
    ]
    tbl_s1 = doc.add_table(rows=len(spec1_data), cols=2)
    for r_idx, row in enumerate(spec1_data):
        for c_idx, val in enumerate(row):
            tbl_s1.cell(r_idx, c_idx).paragraphs[0].text = val
    style_table(tbl_s1, col_widths=[1.8, 5.5], header_bg="0284C7")

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    spec2_data = [
        ["Thuộc tính", "Nội dung đặc tả chi tiết"],
        ["Tên Use Case", "Duyệt báo cáo và tự động cộng điểm thưởng (Moderate Report & Award Points)"],
        ["Mã định danh", "UC-CORE-02"],
        ["Tác nhân chính", "Quản trị viên / Kiểm duyệt viên (Moderator / Admin)"],
        ["Tác nhân hỗ trợ", "Động cơ đối soát cảm biến IoT (Sensor Matching Engine)"],
        ["Điều kiện tiên quyết", "1. Moderator đã đăng nhập hệ thống quản trị.\n2. Có ít nhất một báo cáo đang chờ duyệt ở trạng thái PENDING."],
        ["Điều kiện sau", "1. Báo cáo chuyển trạng thái sang APPROVED hoặc REJECTED.\n2. Nếu duyệt: Điểm ngập hiển thị công khai trên WebGIS, ví Citizen nhận điểm thưởng tương ứng, đánh giá thăng hạng danh hiệu.\n3. Nếu từ chối do tin giả: Trừ 30 điểm uy tín của Citizen."],
        ["Luồng sự kiện chính (Main Flow)", 
         "1. Moderator mở Hàng đợi duyệt tin trên Dashboard.\n"
         "2. Hệ thống hiển thị báo cáo kèm dữ liệu tự động đối soát từ trạm IoT gần nhất (mưa mm, triều dâng m).\n"
         "3. Moderator đối soát hình ảnh và xác nhận thông tin tin cậy.\n"
         "4. Moderator nhấn nút 'PHÊ DUYỆT BÁO CÁO'.\n"
         "5. Hệ thống kích hoạt Database Transaction:\n"
         "   - Cập nhật trạng thái thành APPROVED.\n"
         "   - Tính điểm: +50đ duyệt cơ bản + 20đ kèm ảnh + 30đ nếu báo sớm nhất.\n"
         "   - Cộng điểm vào UserWallets, ghi nhật ký PointTransactions.\n"
         "   - Tái đánh giá danh hiệu (Badges) theo tổng điểm trọn đời.\n"
         "   - Đẩy điểm ngập mới lên WebGIS realtime qua WebSocket Hub.\n"
         "6. Gửi thông báo cộng điểm thành công về tài khoản Citizen."]
    ]
    tbl_s2 = doc.add_table(rows=len(spec2_data), cols=2)
    for r_idx, row in enumerate(spec2_data):
        for c_idx, val in enumerate(row):
            tbl_s2.cell(r_idx, c_idx).paragraphs[0].text = val
    style_table(tbl_s2, col_widths=[1.8, 5.5], header_bg="0284C7")

    doc.add_page_break()

    # CHƯƠNG 4: THIẾT KẾ CSDL CHUẨN HÓA
    p_c4 = doc.add_paragraph()
    r = p_c4.add_run("CHƯƠNG 4: THIẾT KẾ CƠ SỞ DỮ LIỆU CHUẨN HÓA (3NF)")
    r.bold = True
    r.font.size = Pt(14)
    r.font.color.rgb = RGBColor(11, 37, 69)

    doc.add_paragraph(
        "Cơ sở dữ liệu được thiết kế bám sát kiến trúc Multi-Sensor IoT: Tách biệt thực thể Trạm (Stations), "
        "thực thể Cảm biến (Sensors), thực thể Dữ liệu đo chuỗi thời gian (SensorReadings) và Ngưỡng cảnh báo (AlertThresholds)."
    )

    # Tables details
    p_t = doc.add_paragraph()
    r = p_t.add_run("Bảng STATIONS (Quản Lý Trạm Quan Trắc)")
    r.bold = True
    r.font.color.rgb = RGBColor(11, 37, 69)

    pdm_stations = [
        ["Tên Cột", "Kiểu Dữ Liệu", "Ràng Buộc (Constraints)", "Ý Nghĩa Nghiệp Vụ"],
        ["station_id", "UUID", "PRIMARY KEY, DEFAULT gen_random_uuid()", "Mã trạm (Khóa chính)"],
        ["station_code", "VARCHAR(30)", "NOT NULL, UNIQUE", "Mã định danh trạm (VD: TR-Q7-01)"],
        ["station_name", "VARCHAR(150)", "NOT NULL", "Tên trạm quan trắc"],
        ["latitude", "DECIMAL(10, 7)", "NOT NULL, CHECK (-90..90)", "Tọa độ Vĩ độ GPS"],
        ["longitude", "DECIMAL(10, 7)", "NOT NULL, CHECK (-180..180)", "Tọa độ Kinh độ GPS"],
        ["location", "VARCHAR(255)", "NOT NULL", "Địa chỉ / Tuyến đường / Khu vực"],
        ["status", "VARCHAR(20)", "NOT NULL, DEFAULT 'ONLINE'", "Trạng thái trạm (ONLINE, OFFLINE, MAINTENANCE)"],
        ["installed_at", "TIMESTAMPTZ", "DEFAULT CURRENT_TIMESTAMP", "Ngày trạm được lắp đặt"],
        ["last_ping_at", "TIMESTAMPTZ", "NULLABLE", "Lần phản hồi tín hiệu gần nhất"]
    ]
    tbl_pdm_st = doc.add_table(rows=len(pdm_stations), cols=4)
    for r_idx, row in enumerate(pdm_stations):
        for c_idx, val in enumerate(row):
            tbl_pdm_st.cell(r_idx, c_idx).paragraphs[0].text = val
    style_table(tbl_pdm_st, col_widths=[1.4, 1.4, 2.2, 2.3])

    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    p_t = doc.add_paragraph()
    r = p_t.add_run("Bảng SENSORS (Quản Lý Đa Dạng Cảm Biến Trực Thuộc Trạm)")
    r.bold = True
    r.font.color.rgb = RGBColor(11, 37, 69)

    pdm_sensors = [
        ["Tên Cột", "Kiểu Dữ Liệu", "Ràng Buộc (Constraints)", "Ý Nghĩa Nghiệp Vụ"],
        ["sensor_id", "UUID", "PRIMARY KEY, DEFAULT gen_random_uuid()", "Mã cảm biến (Khóa chính)"],
        ["station_id", "UUID", "NOT NULL, FOREIGN KEY (stations) ON DELETE CASCADE", "Trạm mà cảm biến trực thuộc"],
        ["sensor_code", "VARCHAR(50)", "NOT NULL, UNIQUE", "Mã định danh cảm biến (VD: SN-RAIN-01)"],
        ["sensor_type", "VARCHAR(50)", "NOT NULL, CHECK (RAIN, WATER_LEVEL, FLOW, TEMP)", "Loại cảm biến"],
        ["unit", "VARCHAR(20)", "NOT NULL", "Đơn vị đo (mm, m, m3/s, °C, %)"],
        ["status", "VARCHAR(20)", "NOT NULL, DEFAULT 'ACTIVE'", "Trạng thái cảm biến (ACTIVE, FAULTY, INACTIVE)"],
        ["calibrated_at", "TIMESTAMPTZ", "NULLABLE", "Ngày kiểm định/hiệu chuẩn gần nhất"]
    ]
    tbl_pdm_sn = doc.add_table(rows=len(pdm_sensors), cols=4)
    for r_idx, row in enumerate(pdm_sensors):
        for c_idx, val in enumerate(row):
            tbl_pdm_sn.cell(r_idx, c_idx).paragraphs[0].text = val
    style_table(tbl_pdm_sn, col_widths=[1.4, 1.4, 2.2, 2.3])

    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    p_t = doc.add_paragraph()
    r = p_t.add_run("Bảng SENSOR_READINGS (Chuỗi Dữ Liệu Đo Đạc Thời Gian Thực)")
    r.bold = True
    r.font.color.rgb = RGBColor(11, 37, 69)

    pdm_readings = [
        ["Tên Cột", "Kiểu Dữ Liệu", "Ràng Buộc (Constraints)", "Ý Nghĩa Nghiệp Vụ"],
        ["reading_id", "BIGSERIAL", "PRIMARY KEY", "Mã bản ghi đo tự tăng"],
        ["sensor_id", "UUID", "NOT NULL, FOREIGN KEY (sensors) ON DELETE CASCADE", "Cảm biến ghi nhận số đo"],
        ["value", "DECIMAL(10,3)", "NOT NULL", "Giá trị đo đạc thực tế"],
        ["battery_percent", "DECIMAL(5,2)", "CHECK (0 <= battery_percent <= 100)", "Mức pin còn lại của trạm (%)"],
        ["quality_code", "INT", "NOT NULL, DEFAULT 1", "Mã kiểm soát chất lượng (1: Tốt, 2: Nghi ngờ, 3: Lỗi)"],
        ["measured_at", "TIMESTAMPTZ", "NOT NULL, DEFAULT CURRENT_TIMESTAMP, INDEX", "Thời điểm đo đạc (Timestamp)"]
    ]
    tbl_pdm_rd = doc.add_table(rows=len(pdm_readings), cols=4)
    for r_idx, row in enumerate(pdm_readings):
        for c_idx, val in enumerate(row):
            tbl_pdm_rd.cell(r_idx, c_idx).paragraphs[0].text = val
    style_table(tbl_pdm_rd, col_widths=[1.4, 1.4, 2.2, 2.3])

    doc.add_page_break()

    # CHƯƠNG 5: KỊCH BẢN SQL
    p_c5 = doc.add_paragraph()
    r = p_c5.add_run("CHƯƠNG 5: KỊCH BẢN CÀI ĐẶT SQL NÂNG CAO")
    r.bold = True
    r.font.size = Pt(14)
    r.font.color.rgb = RGBColor(11, 37, 69)

    sql_complete = """-- TRIGGER TỰ ĐỘNG CỘNG ĐIỂM KHI ADMIN DUYỆT BÁO CÁO
CREATE OR REPLACE FUNCTION fn_trigger_award_points_on_approval()
RETURNS TRIGGER AS $$
DECLARE
    v_wallet_id UUID;
    v_has_media BOOLEAN := FALSE;
    v_is_first_reporter BOOLEAN := FALSE;
    v_points_to_add INT := 50; -- Điểm duyệt cơ bản (+50)
BEGIN
    IF NEW.status = 'APPROVED' AND OLD.status = 'PENDING' THEN
        SELECT wallet_id INTO v_wallet_id FROM user_wallets WHERE user_id = NEW.user_id;

        -- Thưởng kèm ảnh/video (+20đ)
        IF EXISTS (SELECT 1 FROM report_media WHERE report_id = NEW.report_id) THEN
            v_points_to_add := v_points_to_add + 20;
            v_has_media := TRUE;
        END IF;

        -- Thưởng người phát hiện đầu tiên (+30đ)
        IF NOT EXISTS (
            SELECT 1 FROM flood_points
            WHERE ST_DWithin(location::geography, ST_SetSRID(ST_MakePoint(NEW.lng, NEW.lat), 4326)::geography, 200)
            AND updated_at >= NOW() - INTERVAL '2 hours'
        ) THEN
            v_points_to_add := v_points_to_add + 30;
            v_is_first_reporter := TRUE;
        END IF;

        -- Cập nhật ví điểm
        UPDATE user_wallets
        SET balance_points = balance_points + v_points_to_add,
            lifetime_points = lifetime_points + v_points_to_add,
            updated_at = NOW()
        WHERE wallet_id = v_wallet_id;

        -- Ghi log giao dịch
        INSERT INTO point_transactions (wallet_id, tx_type, points_amount, title, description, created_at)
        VALUES (v_wallet_id, 'EARN', v_points_to_add, 'Báo cáo điểm ngập được phê duyệt',
                format('Tuyến %s (%s) - Thưởng ảnh: %s, Báo sớm: %s', NEW.street_name, NEW.district, v_has_media, v_is_first_reporter),
                NOW());

        -- Cập nhật điểm ngập WebGIS
        INSERT INTO flood_points (source_report_id, street, district, depth_cm, severity, location, is_active, updated_at)
        VALUES (NEW.report_id, NEW.street_name, NEW.district, NEW.depth_cm,
                CASE WHEN NEW.depth_cm < 20 THEN 'LOW' WHEN NEW.depth_cm <= 40 THEN 'MEDIUM' ELSE 'HIGH' END,
                ST_SetSRID(ST_MakePoint(NEW.lng, NEW.lat), 4326), TRUE, NOW());
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_award_points_on_approval
AFTER UPDATE ON citizen_reports
FOR EACH ROW
EXECUTE FUNCTION fn_trigger_award_points_on_approval();"""
    add_code_block(doc, sql_complete, title="Trigger Tự Động Phê Duyệt & Tích Điểm Thưởng")

    # Save to workspace root
    output_path = "Bao_Cao_PTTK_CSDL_He_Thong_Canh_Bao_Ngap_Lut.docx"
    doc.save(output_path)
    print(f"SUCCESS: Created document at {output_path}")

if __name__ == "__main__":
    build_word_document()
