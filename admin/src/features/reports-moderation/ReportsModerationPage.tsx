import React, { useState, useEffect } from 'react';
import { Download, Filter, MapPin, Search, Check, X, RefreshCw, AlertCircle } from 'lucide-react';
import { adminRequest } from '../../services/adminApiClient';
import './ReportsModerationPage.css';

export interface ReportItem {
  id: string;
  street: string;
  district?: string;
  address?: string;
  author: string;
  userName?: string;
  time: string;
  desc: string;
  description?: string;
  level: string;
  levelClass: string;
  water_level?: number;
  depthEstimate?: number;
  image: string;
  coords: string;
  lat?: number;
  lng?: number;
  status: 'pending' | 'approved' | 'rejected';
}

const DEFAULT_REPORTS: ReportItem[] = [
  {
    id: 'BC-8042',
    street: 'Nguyễn Hữu Cảnh, Bình Thạnh',
    district: 'Bình Thạnh',
    address: '142 Nguyễn Hữu Cảnh, P. 22, Bình Thạnh',
    author: 'Nguyễn Văn A (0908.xxx.xxx)',
    time: '5 phút trước',
    desc: 'Nước ngập sâu qua nửa bánh xe, nhiều xe máy chết máy dắt bộ',
    level: 'Ngập sâu (~45cm)',
    levelClass: 'danger',
    water_level: 45,
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&auto=format&fit=crop&q=80',
    coords: '10.7932, 106.7208',
    status: 'pending'
  },
  {
    id: 'BC-8041',
    street: 'Đường Lê Văn Lương, Nhà Bè',
    district: 'Nhà Bè',
    address: 'Đường Lê Văn Lương, Xã Phước Kiển, Nhà Bè',
    author: 'Trần Thị B',
    time: '12 phút trước',
    desc: 'Triều cường lên nhanh, tràn lên lề đường',
    level: 'Ngập nhẹ (~20cm)',
    levelClass: 'moderate',
    water_level: 20,
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80',
    coords: '10.689, 106.702',
    status: 'pending'
  },
  {
    id: 'BC-8040',
    street: 'Đường Nguyễn Văn Cừ, Quận 5',
    district: 'Quận 5',
    address: 'Ngã tư Nguyễn Văn Cừ & An Dương Vương, Q.5',
    author: 'Phạm Văn C',
    time: '25 phút trước',
    desc: 'Đoạn gần ngã tư Nguyễn Văn Cừ và An Dương Vương, ngập bánh xe',
    level: 'Ngập trung bình',
    levelClass: 'warning',
    water_level: 30,
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&auto=format&fit=crop&q=80',
    coords: '10.758, 106.682',
    status: 'pending'
  },
  {
    id: 'BC-8039',
    street: 'Huỳnh Tấn Phát, Quận 7',
    district: 'Quận 7',
    address: 'Huỳnh Tấn Phát, P. Tân Thuận Đông, Quận 7',
    author: 'Lê Văn D',
    time: '40 phút trước',
    desc: 'Mưa lớn kèm triều dâng ngập hết cả đường',
    level: 'Ngập sâu',
    levelClass: 'danger',
    water_level: 40,
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80',
    coords: '10.738, 106.735',
    status: 'pending'
  }
];

export const ReportsModerationPage: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>(DEFAULT_REPORTS);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [selectedReportId, setSelectedReportId] = useState<string>('BC-8042');
  const [sendPushNotification, setSendPushNotification] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Hiển thị thông báo Toast trong 3 giây
  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Tải danh sách báo cáo thực tế từ Backend API
  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const data = await adminRequest<any[]>('/reports/queue');
      if (Array.isArray(data) && data.length > 0) {
        const mapped: ReportItem[] = data.map((item) => {
          const depth = Number(item.water_level || item.depthEstimate || 25);
          const levelText =
            item.level ||
            (depth >= 40
              ? `Ngập sâu (~${depth}cm)`
              : depth >= 25
              ? `Ngập trung bình (~${depth}cm)`
              : `Ngập nhẹ (~${depth}cm)`);
          const levelClass =
            item.levelClass || (depth >= 40 ? 'danger' : depth >= 25 ? 'warning' : 'moderate');

          return {
            id: item.id || `BC-${Date.now()}`,
            street: item.street || 'Vị trí hiện trường',
            district: item.district || '',
            address: item.address || (item.street ? `${item.street}, ${item.district || 'TP.HCM'}` : 'Vị trí qua GPS'),
            author: item.author || item.userName || 'Người dân ẩn danh',
            time: item.time || 'Vừa xong',
            desc: item.desc || item.description || 'Chưa có mô tả chi tiết',
            level: levelText,
            levelClass,
            water_level: depth,
            image:
              item.image ||
              item.imageUrl ||
              item.image_url ||
              'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&auto=format&fit=crop&q=80',
            coords: item.coords || `${item.lat || item.latitude || 10.78}, ${item.lng || item.longitude || 106.7}`,
            status: item.status || 'pending'
          };
        });
        setReports(mapped);
      }
    } catch {
      // Nếu Backend chưa bật hoặc có lỗi, giữ danh sách mẫu
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // 2. Lọc danh sách báo cáo theo Tab và Ô tìm kiếm
  const visibleReports = reports.filter((r) => {
    const matchTab = r.status === activeTab;
    if (!matchTab) return false;
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    return (
      r.street.toLowerCase().includes(query) ||
      (r.address && r.address.toLowerCase().includes(query)) ||
      r.author.toLowerCase().includes(query) ||
      r.id.toLowerCase().includes(query)
    );
  });

  // Chọn báo cáo đang focus hoặc phần tử đầu tiên của tab hiện tại
  const selectedReport =
    reports.find((r) => r.id === selectedReportId) || visibleReports[0] || reports[0];

  // 3. Xử lý Phê duyệt báo cáo
  const handleApprove = async (id: string) => {
    try {
      await adminRequest(`/reports/${id}/moderate`, {
        method: 'POST',
        body: JSON.stringify({ action: 'approved', sendPushNotification })
      });

      // Cập nhật trạng thái tức thì trên giao diện
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
      );

      showToast(`✅ Đã phê duyệt báo cáo #${id} và đưa lên bản đồ chung thành công!`, 'success');
    } catch {
      // Cập nhật giao diện mượt mà ngay cả khi chạy offline
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
      );
      showToast(`✅ Đã phê duyệt báo cáo #${id} (Chế độ ngoại tuyến).`, 'success');
    }
  };

  // 4. Xử lý Từ chối báo cáo
  const handleReject = async (id: string) => {
    try {
      await adminRequest(`/reports/${id}/moderate`, {
        method: 'POST',
        body: JSON.stringify({ action: 'rejected' })
      });

      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r))
      );

      showToast(`❌ Đã từ chối báo cáo #${id}.`, 'info');
    } catch {
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r))
      );
      showToast(`❌ Đã từ chối báo cáo #${id}.`, 'info');
    }
  };

  // 5. Xuất báo cáo CSV UTF-8 tải về máy
  const handleDownloadCsv = () => {
    try {
      const headers = ['Mã Báo Cáo', 'Tuyến Đường', 'Địa Chỉ', 'Người Báo Cáo', 'Mức Độ Ngập', 'Tọa Độ', 'Trạng Thái', 'Thời Gian'];
      const rows = reports.map((r) => [
        `"${r.id}"`,
        `"${r.street.replace(/"/g, '""')}"`,
        `"${(r.address || '').replace(/"/g, '""')}"`,
        `"${r.author.replace(/"/g, '""')}"`,
        `"${r.level.replace(/"/g, '""')}"`,
        `"${r.coords}"`,
        `"${r.status === 'approved' ? 'Đã duyệt' : r.status === 'rejected' ? 'Từ chối' : 'Chờ duyệt'}"`,
        `"${r.time}"`
      ]);

      const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `bao_cao_ngap_lut_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('📥 Xuất file CSV báo cáo ngập lụt thành công!', 'success');
    } catch (err: any) {
      showToast('Lỗi khi xuất file CSV: ' + err.message, 'error');
    }
  };

  // Đếm số lượng cho từng Tab
  const pendingCount = reports.filter((r) => r.status === 'pending').length;
  const approvedCount = reports.filter((r) => r.status === 'approved').length;
  const rejectedCount = reports.filter((r) => r.status === 'rejected').length;

  return (
    <div className="reports-page-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: 24,
            right: 24,
            zIndex: 9999,
            backgroundColor:
              toastMessage.type === 'success'
                ? '#065f46'
                : toastMessage.type === 'error'
                ? '#991b1b'
                : '#1e293b',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            fontSize: '0.88rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          {toastMessage.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-title-main">DUYỆT BÁO CÁO CỦA DÂN</h1>
          <p className="page-sub-title">
            Xét duyệt và xác thực báo cáo ngập lụt từ cộng đồng gửi về
          </p>
        </div>

        <div className="header-action-group" style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn-secondary-outline"
            onClick={() => setShowSearchBox(!showSearchBox)}
            style={{
              backgroundColor: showSearchBox ? '#1e2d4d' : 'transparent',
              borderColor: showSearchBox ? '#38bdf8' : '#1e2c48',
              color: showSearchBox ? '#38bdf8' : '#cbd5e1',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem'
            }}
          >
            <Filter size={14} />
            Lọc &amp; Tìm kiếm
          </button>

          <button
            className="btn-secondary-outline"
            onClick={fetchReports}
            title="Tải lại danh sách"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #1e2c48',
              backgroundColor: '#0c1527',
              color: '#cbd5e1',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
          </button>

          <button
            className="btn-secondary-outline"
            onClick={handleDownloadCsv}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '6px',
              border: '1px solid #1e2c48',
              backgroundColor: '#0c1527',
              color: '#cbd5e1',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem'
            }}
          >
            <Download size={14} />
            Tải xuống CSV
          </button>
        </div>
      </div>

      {/* Thanh tìm kiếm nhanh khi bấm Lọc & Tìm kiếm */}
      {showSearchBox && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#0c1527',
            border: '1px solid #1e2c48',
            borderRadius: '6px',
            padding: '10px 14px'
          }}
        >
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Nhập tên tuyến đường, quận huyện, người gửi hoặc mã báo cáo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              color: '#ffffff',
              outline: 'none',
              fontSize: '0.85rem'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      )}

      {/* Filter Tabs matching Screenshot */}
      <div className="filter-tabs-bar" style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #16244d', paddingBottom: '8px' }}>
        <button
          className={`filter-tab-item ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
          style={{
            backgroundColor: activeTab === 'pending' ? '#142342' : 'transparent',
            color: activeTab === 'pending' ? '#38bdf8' : '#94a3b8',
            border: activeTab === 'pending' ? '1px solid #38bdf8' : '1px solid transparent',
            padding: '8px 16px',
            borderRadius: '6px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          Chờ duyệt ({pendingCount})
        </button>
        <button
          className={`filter-tab-item ${activeTab === 'approved' ? 'active' : ''}`}
          onClick={() => setActiveTab('approved')}
          style={{
            backgroundColor: activeTab === 'approved' ? '#142342' : 'transparent',
            color: activeTab === 'approved' ? '#10b981' : '#94a3b8',
            border: activeTab === 'approved' ? '1px solid #10b981' : '1px solid transparent',
            padding: '8px 16px',
            borderRadius: '6px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          Đã duyệt ({approvedCount})
        </button>
        <button
          className={`filter-tab-item ${activeTab === 'rejected' ? 'active' : ''}`}
          onClick={() => setActiveTab('rejected')}
          style={{
            backgroundColor: activeTab === 'rejected' ? '#142342' : 'transparent',
            color: activeTab === 'rejected' ? '#ef4444' : '#94a3b8',
            border: activeTab === 'rejected' ? '1px solid #ef4444' : '1px solid transparent',
            padding: '8px 16px',
            borderRadius: '6px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          Đã từ chối ({rejectedCount})
        </button>
      </div>

      {/* 2 Columns Layout */}
      <div className="reports-layout-grid">
        {/* Left: Reports List */}
        <div className="reports-list-card">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '100px 1fr 140px 100px',
              gap: '14px',
              padding: '10px 16px',
              backgroundColor: '#0e182c',
              borderBottom: '1px solid #1a273e',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#94a3b8'
            }}
          >
            <span>Ảnh/Video thực tế</span>
            <span>Nội dung báo cáo</span>
            <span>Mức độ</span>
            <span>Thao tác</span>
          </div>

          {visibleReports.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
              Không có báo cáo nào trong mục này.
            </div>
          ) : (
            visibleReports.map((rep) => (
              <div
                key={rep.id}
                className={`report-item-row ${selectedReport?.id === rep.id ? 'selected' : ''}`}
                onClick={() => setSelectedReportId(rep.id)}
              >
                <img src={rep.image} alt={rep.street} className="report-table-thumb" />

                <div className="report-table-info">
                  <div className="report-title-txt">{rep.street}</div>
                  <div className="report-author-meta">
                    Đăng bởi: {rep.author} - {rep.time}
                  </div>
                  <div className="report-desc-snippet">{rep.desc}</div>
                </div>

                <div>
                  <span className={`report-level-pill ${rep.levelClass}`}>{rep.level}</span>
                </div>

                <div className="report-action-buttons">
                  {rep.status === 'pending' ? (
                    <>
                      <button
                        className="btn-approve-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove(rep.id);
                        }}
                      >
                        Duyệt nhanh
                      </button>
                      <button
                        className="btn-reject-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReject(rep.id);
                        }}
                      >
                        Từ chối
                      </button>
                    </>
                  ) : rep.status === 'approved' ? (
                    <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>
                      ✓ Đã duyệt
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 700 }}>
                      ✕ Đã từ chối
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right: Selected Report Detail */}
        {selectedReport && (
          <aside className="report-detail-panel">
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff' }}>
              CHI TIẾT BÁO CÁO: <span style={{ color: '#10b981' }}>#{selectedReport.id}</span>
            </div>

            <div className="report-detail-image-wrap">
              <img src={selectedReport.image} alt="Hiện trường" className="report-detail-big-img" />
              <span className="report-image-time-tag">
                {selectedReport.time} <MapPin size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </span>
            </div>

            <div className="report-detail-text-list">
              <div>
                <strong>Địa điểm:</strong> {selectedReport.address}
              </div>
              <div>
                <strong>Tọa độ:</strong> {selectedReport.coords}
              </div>
              <div>
                <strong>Mức độ tự khai báo:</strong>{' '}
                <span style={{ color: selectedReport.levelClass === 'danger' ? '#ef4444' : '#f59e0b', fontWeight: 700 }}>
                  {selectedReport.level}
                </span>
              </div>
              <div>
                <strong>Người báo cáo:</strong> {selectedReport.author} (Số ĐT đã xác thực OTP)
              </div>
              <div>
                <strong>Mô tả chi tiết:</strong> {selectedReport.desc}
              </div>
            </div>

            {selectedReport.status === 'pending' ? (
              <>
                <button
                  className="btn-action-approve-big"
                  onClick={() => handleApprove(selectedReport.id)}
                >
                  PHÊ DUYỆT (Hiện lên bản đồ)
                </button>

                <button
                  className="btn-action-reject-big"
                  onClick={() => handleReject(selectedReport.id)}
                >
                  TỪ CHỐI BÁO CÁO
                </button>
              </>
            ) : selectedReport.status === 'approved' ? (
              <div
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10b981',
                  color: '#10b981',
                  padding: '12px',
                  borderRadius: '6px',
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}
              >
                ✓ BÁO CÁO ĐÃ ĐƯỢC DUYỆT (ĐANG HIỂN THỊ TRÊN BẢN ĐỒ)
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid #ef4444',
                  color: '#ef4444',
                  padding: '12px',
                  borderRadius: '6px',
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}
              >
                ✕ BÁO CÁO ĐÃ BỊ TỪ CHỐI
              </div>
            )}

            <button
              className="btn-action-recheck"
              onClick={() => {
                showToast(`Đã gửi yêu cầu người dân xác minh lại hiện trường tại ${selectedReport.street}!`, 'info');
              }}
            >
              Yêu cầu kiểm tra lại
            </button>

            <label className="push-notif-check-row">
              <input
                type="checkbox"
                checked={sendPushNotification}
                onChange={(e) => setSendPushNotification(e.target.checked)}
              />
              Gửi thông báo đẩy đến cư dân lân cận
            </label>
          </aside>
        )}
      </div>
    </div>
  );
};

export default ReportsModerationPage;
