import React, { useState, useEffect } from 'react';
import { 
  Award, 
  ShieldCheck, 
  Gift, 
  Flame, 
  Clock, 
  Copy, 
  Check, 
  AlertTriangle, 
  Info, 
  ChevronRight, 
  Sparkles, 
  Camera, 
  ThumbsUp, 
  Compass, 
  X, 
  ExternalLink,
  Trophy,
  Zap
} from 'lucide-react';
import { 
  rewardsStore, 
  RANKS_CONFIG, 
  REWARD_CATALOG 
} from '../../stores/rewardsStore';
import { 
  UserRewardsProfile, 
  RewardItem, 
  RedeemedVoucher, 
  RewardCategory 
} from '../../types/rewards';
import './RewardsPage.css';

interface RewardsPageProps {
  onNavigateTab?: (tab: string) => void;
}

export const RewardsPage: React.FC<RewardsPageProps> = ({ onNavigateTab }) => {
  const [profile, setProfile] = useState<UserRewardsProfile>(rewardsStore.getProfile());
  const [activeCategory, setActiveCategory] = useState<RewardCategory>('all');
  const [activeView, setActiveView] = useState<'catalog' | 'vouchers' | 'history'>('catalog');
  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null);
  const [redeemedVoucherSuccess, setRedeemedVoucherSuccess] = useState<RedeemedVoucher | null>(null);
  const [copySuccessId, setCopySuccessId] = useState<string | null>(null);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Subscribe to store updates
  useEffect(() => {
    const unsubscribe = rewardsStore.subscribe(() => {
      setProfile({ ...rewardsStore.getProfile() });
    });
    return unsubscribe;
  }, []);

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopySuccessId(id);
    showToast(`Đã sao chép mã: ${code}`);
    setTimeout(() => setCopySuccessId(null), 2500);
  };

  const handleConfirmRedeem = () => {
    if (!selectedReward) return;
    const res = rewardsStore.redeemVoucher(selectedReward);
    if (res.success && res.voucher) {
      setRedeemedVoucherSuccess(res.voucher);
      setSelectedReward(null);
      showToast(`Chúc mừng! Bạn đã đổi thành công "${res.voucher.title}".`);
    } else {
      alert(res.error || 'Có lỗi xảy ra khi đổi quà.');
    }
  };

  // Rank progression computation
  const currentRankInfo = RANKS_CONFIG[profile.rank];
  const nextRank = profile.rank === 'active_citizen' 
    ? RANKS_CONFIG.street_knight 
    : profile.rank === 'street_knight' 
      ? RANKS_CONFIG.golden_volunteer 
      : null;

  const currentLevelMin = currentRankInfo.minPoints;
  const nextLevelMin = nextRank ? nextRank.minPoints : currentLevelMin;
  const progressPercent = nextRank 
    ? Math.min(100, Math.max(0, Math.round(((profile.lifetimePoints - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100)))
    : 100;

  // Filter rewards
  const filteredRewards = REWARD_CATALOG.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  // Anti-spam & Rate limit status in District 7
  const currentDistrict = 'Quận 7';
  const districtQuota = rewardsStore.checkDistrictRateLimit(currentDistrict);
  const accountStatus = rewardsStore.getAccountStatus();

  return (
    <div className="rewards-container">
      {/* Toast Feedback */}
      {feedbackToast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          backgroundColor: '#0284c7',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: 700,
          animation: 'modalPop 0.2s ease'
        }}>
          <Sparkles size={18} />
          {feedbackToast}
        </div>
      )}

      {/* Hero Section */}
      <div className="rewards-hero-card">
        <div className="rewards-hero-grid">
          {/* User Info & Points */}
          <div className="user-profile-summary">
            <div className="user-badge-header">
              <div className="user-avatar-circle">
                {currentRankInfo.badge}
              </div>
              <div className="user-rank-title-group">
                <h1>
                  {profile.fullName}
                  <span 
                    className="rank-pill-badge" 
                    style={{ background: currentRankInfo.gradient, color: '#ffffff' }}
                  >
                    {currentRankInfo.name}
                  </span>
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  Khu vực sinh sống: <b style={{ color: '#38bdf8' }}>{currentDistrict}</b> • Thành viên tích cực
                </p>
              </div>
            </div>

            {/* Big Points Display */}
            <div className="points-counter-row">
              <div className="points-number">
                🪙 {profile.points.toLocaleString('vi-VN')}
              </div>
              <div className="points-label">Điểm tích lũy khả dụng</div>
            </div>

            {/* Level Progress */}
            <div className="rank-progress-card">
              <div className="rank-progress-header">
                <span>Cấp bậc: <b>{currentRankInfo.name}</b></span>
                {nextRank ? (
                  <span>
                    Còn <b>{nextLevelMin - profile.lifetimePoints} điểm</b> để lên <b>{nextRank.name}</b>
                  </span>
                ) : (
                  <span style={{ color: '#fbbf24' }}>🏆 Đạt cấp bậc danh dự cao nhất!</span>
                )}
              </div>
              <div className="rank-progress-bar-bg">
                <div 
                  className="rank-progress-bar-fill" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
                <span>{currentLevelMin} điểm</span>
                <span>{nextRank ? `${nextLevelMin} điểm` : '500+ điểm'}</span>
              </div>
            </div>
          </div>

          {/* Trust Score & Anti-Spam Widget */}
          <div className="trust-score-panel">
            <div className="trust-score-header">
              <div className="trust-gauge">
                <div className={`trust-circle-val ${accountStatus.trustScore >= 70 ? 'trust-high' : 'trust-danger'}`}>
                  {profile.trustScore}
                </div>
                <div className="trust-details">
                  <h4>Điểm Uy Tín (Trust Score)</h4>
                  <p>
                    {accountStatus.isRestricted 
                      ? '⚠️ Bị tạm khóa tính năng gửi báo cáo' 
                      : profile.trustScore >= 80 
                        ? '🛡️ Uy tín cao • Duyệt tin ưu tiên' 
                        : '⚠️ Cần cẩn trọng khi đăng tin'}
                  </p>
                </div>
              </div>
              <ShieldCheck size={28} color={accountStatus.trustScore >= 70 ? '#34d399' : '#ef4444'} />
            </div>

            {/* Anti-Spam Rate Limit indicator */}
            <div className="quota-indicator-box">
              <div className="quota-meta-row">
                <span>Hạn mức nhận điểm hôm nay ({currentDistrict}):</span>
                <b style={{ color: districtQuota.countToday >= 3 ? '#f59e0b' : '#38bdf8' }}>
                  {districtQuota.countToday} / {districtQuota.max} báo cáo
                </b>
              </div>
              <div className="quota-dots">
                <div className={`quota-dot ${districtQuota.countToday >= 1 ? 'used' : ''}`} />
                <div className={`quota-dot ${districtQuota.countToday >= 2 ? 'used' : ''}`} />
                <div className={`quota-dot ${districtQuota.countToday >= 3 ? 'used' : ''}`} />
              </div>
              <p style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
                Quy chế chống gian lận: Tối đa nhận điểm từ 3 báo cáo/người/ngày trong cùng khu vực.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => onNavigateTab && onNavigateTab('report')}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  backgroundColor: '#0284c7',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Compass size={16} /> Gửi Báo Cáo Ngập
              </button>
              <button 
                onClick={() => setActiveView('vouchers')}
                style={{
                  padding: '10px 16px',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '10px',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Gift size={16} /> Kho Quà ({profile.vouchers.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Business Rules Interactive Cards */}
      <div>
        <div className="rewards-section-title">
          <h2>
            <Award size={22} color="#38bdf8" />
            Quy Tắc Tích Điểm &amp; Chống Gian Lận (Business Rules)
          </h2>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            Hệ sinh thái cộng đồng vì một thành phố không ngập lụt
          </span>
        </div>

        <div className="rules-grid">
          <div className="rule-card">
            <span className="rule-points-pill rule-earn-50">
              <Zap size={14} /> +50 Điểm
            </span>
            <h3>Gửi Báo Cáo Được Phê Duyệt</h3>
            <p>
              Điểm được tự động cộng ngay khi Admin xác thực hợp lệ hoặc dữ liệu báo cáo khớp với trạm cảm biến IoT lân cận.
            </p>
          </div>

          <div className="rule-card">
            <span className="rule-points-pill rule-earn-20">
              <Camera size={14} /> +20 Điểm Thưởng
            </span>
            <h3>Kèm Ảnh / Video Rõ Nét</h3>
            <p>
              Khuyến khích cung cấp hình ảnh hiện trường góc rộng, hiển thị mức ngập so với bánh xe hoặc vỉa hè để tăng độ tin cậy.
            </p>
          </div>

          <div className="rule-card">
            <span className="rule-points-pill rule-earn-30">
              <Flame size={14} /> +30 Điểm Thưởng
            </span>
            <h3>Báo Cáo Đầu Tiên Tại Điểm Mới</h3>
            <p>
              Thưởng đặc biệt cho người phát hiện sớm nhất một tuyến đường bắt đầu ngập, giúp kích hoạt cảnh báo giao thông tức thời.
            </p>
          </div>

          <div className="rule-card">
            <span className="rule-points-pill rule-earn-5">
              <ThumbsUp size={14} /> +5 Điểm
            </span>
            <h3>Xác Nhận (Upvote) Tin Người Khác</h3>
            <p>
              Bấm xác nhận điểm ngập khi bạn đang lưu thông qua khu vực đó để hỗ trợ thuật toán kiểm chứng đám đông (Crowdsourcing).
            </p>
          </div>

          <div className="rule-card" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            <span className="rule-points-pill rule-penalty">
              <AlertTriangle size={14} /> -30 Điểm Uy Tín
            </span>
            <h3>Quy Chế Chống Gian Lận &amp; Phạt</h3>
            <p>
              Báo cáo sai sự thật hoặc spam bị từ chối sẽ bị <b>trừ 30 điểm uy tín</b>. Nếu điểm uy tín dưới 50, hệ thống sẽ <b>tạm khóa gửi báo cáo</b>.
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs for Catalog / Vouchers / History */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
        <button
          onClick={() => setActiveView('catalog')}
          style={{
            background: 'none',
            border: 'none',
            color: activeView === 'catalog' ? '#38bdf8' : '#94a3b8',
            fontWeight: 800,
            fontSize: '1.05rem',
            cursor: 'pointer',
            padding: '8px 16px',
            borderBottom: activeView === 'catalog' ? '3px solid #38bdf8' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Gift size={18} /> Đổi Thưởng &amp; Voucher
        </button>

        <button
          onClick={() => setActiveView('vouchers')}
          style={{
            background: 'none',
            border: 'none',
            color: activeView === 'vouchers' ? '#38bdf8' : '#94a3b8',
            fontWeight: 800,
            fontSize: '1.05rem',
            cursor: 'pointer',
            padding: '8px 16px',
            borderBottom: activeView === 'vouchers' ? '3px solid #38bdf8' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Award size={18} /> Kho Voucher Của Tôi ({profile.vouchers.length})
        </button>

        <button
          onClick={() => setActiveView('history')}
          style={{
            background: 'none',
            border: 'none',
            color: activeView === 'history' ? '#38bdf8' : '#94a3b8',
            fontWeight: 800,
            fontSize: '1.05rem',
            cursor: 'pointer',
            padding: '8px 16px',
            borderBottom: activeView === 'history' ? '3px solid #38bdf8' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Clock size={18} /> Lịch Sử Biến Động Điểm
        </button>
      </div>

      {/* VIEW 1: CATALOG */}
      {activeView === 'catalog' && (
        <div>
          {/* Categories Filter */}
          <div className="category-filter-bar">
            {[
              { id: 'all', label: 'Tất cả phần quà' },
              { id: 'telco', label: '📱 Thẻ cào điện thoại' },
              { id: 'fuel', label: '⛽ Xăng dầu Petrolimex' },
              { id: 'transit', label: '🚌 Vé xe buýt / Metro' },
              { id: 'mart', label: '🛒 Siêu thị Co.op / WinMart' },
              { id: 'gear', label: '🦺 Vật phẩm cứu hộ 114' }
            ].map((cat) => (
              <button
                key={cat.id}
                className={`category-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id as RewardCategory)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid of Redeemable Items */}
          <div className="catalog-grid">
            {filteredRewards.map((reward) => {
              const isKnightDiscount = profile.rank !== 'active_citizen' && (reward.category === 'fuel' || reward.category === 'mart');
              const finalCost = isKnightDiscount ? Math.round(reward.pointsCost * 0.95) : reward.pointsCost;
              const canAfford = profile.points >= finalCost;

              const rankRequirementMet = !reward.requiredRank || (
                reward.requiredRank === 'street_knight' 
                  ? profile.rank === 'street_knight' || profile.rank === 'golden_volunteer'
                  : profile.rank === 'golden_volunteer'
              );

              return (
                <div key={reward.id} className="reward-card">
                  <div className="reward-card-top">
                    {reward.tag && (
                      <span className="reward-badge-tag">{reward.tag}</span>
                    )}
                    <span className="reward-partner">{reward.partner}</span>
                    <h3>{reward.title}</h3>
                    <p className="reward-desc">{reward.description}</p>
                  </div>

                  <div className="reward-card-middle">
                    <div className="reward-cost-tag">
                      <span className="reward-cost-num">{finalCost}</span>
                      <span className="reward-cost-lbl">điểm</span>
                      {isKnightDiscount && (
                        <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 700, marginLeft: '4px' }}>
                          (-5% Hiệp sĩ)
                        </span>
                      )}
                    </div>
                    <span className="reward-value-pill">{reward.value}</span>
                  </div>

                  <div className="reward-card-divider" />

                  <div className="reward-card-bottom">
                    <button
                      className={`redeem-action-btn ${canAfford && rankRequirementMet ? 'active' : 'disabled'}`}
                      disabled={!canAfford || !rankRequirementMet}
                      onClick={() => setSelectedReward(reward)}
                    >
                      {!rankRequirementMet ? (
                        <>🔒 Cần danh hiệu {RANKS_CONFIG[reward.requiredRank!].name}</>
                      ) : !canAfford ? (
                        <>Thiếu {finalCost - profile.points} điểm</>
                      ) : (
                        <>Đổi Quà Ngay <ChevronRight size={16} /></>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: MY VOUCHERS */}
      {activeView === 'vouchers' && (
        <div>
          {profile.vouchers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(22, 36, 82, 0.4)', borderRadius: '20px' }}>
              <Gift size={48} color="#64748b" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.25rem', color: '#f8fafc', marginBottom: '0.5rem' }}>Chưa có mã voucher nào</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Hãy tích cực gửi tin báo ngập hoặc xác nhận điểm ngập để tích điểm đổi quà nhé!
              </p>
              <button 
                onClick={() => setActiveView('catalog')}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#0284c7',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#ffffff',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Khám Phá Kho Quà
              </button>
            </div>
          ) : (
            <div className="vouchers-grid">
              {profile.vouchers.map((v) => (
                <div key={v.id} className="my-voucher-card">
                  <span 
                    className="voucher-status-badge"
                    style={{
                      background: v.status === 'available' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(148, 163, 184, 0.2)',
                      color: v.status === 'available' ? '#34d399' : '#94a3b8',
                      border: v.status === 'available' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(148, 163, 184, 0.3)'
                    }}
                  >
                    {v.status === 'available' ? 'Khả dụng' : 'Đã sử dụng'}
                  </span>

                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>
                      {v.partner}
                    </span>
                    <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginTop: '4px' }}>{v.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Trị giá: <b style={{ color: '#34d399' }}>{v.value}</b></p>
                  </div>

                  <div className="voucher-code-box">
                    <span>{v.code}</span>
                    <button 
                      className="copy-btn" 
                      onClick={() => handleCopyCode(v.code, v.id)}
                    >
                      {copySuccessId === v.id ? <Check size={14} /> : <Copy size={14} />}
                      {copySuccessId === v.id ? 'Đã chép' : 'Sao chép'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#64748b' }}>
                    <span>Hết hạn: {new Date(v.expiresAt).toLocaleDateString('vi-VN')}</span>
                    {v.status === 'available' && (
                      <button
                        onClick={() => {
                          rewardsStore.useVoucher(v.id);
                          showToast('Đã đánh dấu voucher là đã dùng.');
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#94a3b8',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          fontSize: '0.75rem'
                        }}
                      >
                        Đánh dấu đã dùng
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: POINTS TRANSACTION HISTORY */}
      {activeView === 'history' && (
        <div className="history-table-container">
          {profile.history.map((tx) => (
            <div key={tx.id} className="history-item">
              <div className="history-left">
                <div className={`history-icon-circle ${
                  tx.type === 'earn' 
                    ? 'history-icon-earn' 
                    : tx.type === 'penalty' 
                      ? 'history-icon-penalty' 
                      : 'history-icon-redeem'
                }`}>
                  {tx.type === 'earn' ? '➕' : tx.type === 'penalty' ? '⚠️' : '🎁'}
                </div>
                <div className="history-title-group">
                  <h4>{tx.title}</h4>
                  <p>{tx.description}</p>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div className={`history-points-val ${
                  tx.type === 'earn' 
                    ? 'positive' 
                    : tx.type === 'penalty' 
                      ? 'penalty' 
                      : 'negative'
                }`}>
                  {tx.points > 0 ? `+${tx.points}` : tx.points} điểm
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                  {new Date(tx.createdAt).toLocaleString('vi-VN')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Community Leaderboard Showcase */}
      <div style={{
        background: 'rgba(22, 36, 82, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        padding: '1.75rem',
        marginTop: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Trophy size={20} color="#fbbf24" />
            Bảng Vàng Đóng Góp Cộng Đồng TP.HCM (Tháng này)
          </h3>
          <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600 }}>Cập nhật 5 phút trước</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {[
            { rank: 1, name: 'Lê Hoàng Phong', district: 'Quận 7', pts: '1.450', title: 'Tình nguyện viên Vàng', icon: '🥇' },
            { rank: 2, name: 'Nguyễn Văn Minh (Bạn)', district: 'Quận 7', pts: `${profile.lifetimePoints}`, title: currentRankInfo.name, icon: '🥈' },
            { rank: 3, name: 'Phạm Thị Thu', district: 'Bình Thạnh', pts: '340', title: 'Hiệp sĩ Đường phố', icon: '🥉' },
            { rank: 4, name: 'Trần Đình Trọng', district: 'Thủ Đức', pts: '280', title: 'Hiệp sĩ Đường phố', icon: '🎗️' },
            { rank: 5, name: 'Đỗ Mỹ Linh', district: 'Quận 8', pts: '215', title: 'Hiệp sĩ Đường phố', icon: '🎗️' }
          ].map((leader) => (
            <div 
              key={leader.rank}
              style={{
                background: leader.rank === 2 ? 'rgba(2, 132, 199, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                border: leader.rank === 2 ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '14px',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>{leader.icon}</span>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: leader.rank === 2 ? '#38bdf8' : '#ffffff' }}>
                  {leader.name}
                </h4>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{leader.district} • {leader.title}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fbbf24' }}>{leader.pts}</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>điểm</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulator Box for Testing Business Rules & Demonstrations */}
      <div className="simulator-box">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="#38bdf8" />
          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#cbd5e1' }}>
            Bảng Điều Khiển Mô Phỏng Nghiệp Vụ (Live Testing Sandbox):
          </span>
        </div>

        <div className="simulator-btns">
          <button 
            className="sim-btn sim-btn-approve"
            onClick={() => {
              const res = rewardsStore.recordReportSubmission({
                district: currentDistrict,
                street: 'Đường Nguyễn Thị Thập',
                hasImage: true,
                isFirstReporter: true
              });
              if (res.success) {
                showToast(`+${res.pointsEarned}đ (${res.breakdown.join(' | ')})`);
              } else {
                alert(res.error);
              }
            }}
          >
            ➕ Giả lập Báo cáo có ảnh &amp; sớm nhất (+100đ)
          </button>

          <button 
            className="sim-btn sim-btn-spam"
            onClick={() => {
              const res = rewardsStore.applyPenaltyForSpam('Admin từ chối báo cáo: Ảnh chụp thời tiết khô ráo, không có ngập.');
              showToast(`⚠️ Đã phạt -30 điểm uy tín! Điểm uy tín còn ${res.trustScore}/100.`);
            }}
          >
            ⚠️ Giả lập Bị phạt Spam / Tin giả (-30 uy tín)
          </button>

          <button 
            className="sim-btn sim-btn-reset"
            onClick={() => {
              rewardsStore.resetDemoData();
              showToast('Đã khôi phục dữ liệu ban đầu thành công!');
            }}
          >
            🔄 Khôi phục dữ liệu gốc
          </button>
        </div>
      </div>

      {/* REDEMPTION CONFIRMATION MODAL */}
      {selectedReward && (
        <div className="rewards-modal-overlay" onClick={() => setSelectedReward(null)}>
          <div className="rewards-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedReward(null)}>
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.75rem'
              }}>
                🎁
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.35rem' }}>
                Xác Nhận Đổi Phần Quà
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                Bạn sắp dùng điểm thưởng tích lũy để đổi voucher dưới đây:
              </p>
            </div>

            <div style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '16px',
              padding: '1.25rem'
            }}>
              <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>
                {selectedReward.partner}
              </div>
              <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginTop: '4px', marginBottom: '8px' }}>
                {selectedReward.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1rem' }}>
                {selectedReward.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Giá trị voucher:</span>
                <b style={{ color: '#34d399' }}>{selectedReward.value}</b>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Số điểm trừ:</span>
                <b style={{ color: '#fbbf24', fontSize: '1.1rem' }}>
                  {profile.rank !== 'active_citizen' && (selectedReward.category === 'fuel' || selectedReward.category === 'mart')
                    ? Math.round(selectedReward.pointsCost * 0.95)
                    : selectedReward.pointsCost} điểm
                </b>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => setSelectedReward(null)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#cbd5e1',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Hủy bỏ
              </button>
              <button 
                onClick={handleConfirmRedeem}
                style={{
                  flex: 1.5,
                  padding: '12px',
                  backgroundColor: '#0284c7',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(2, 132, 199, 0.4)'
                }}
              >
                Đồng Ý Đổi Ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VOUCHER REDEEMED SUCCESS MODAL */}
      {redeemedVoucherSuccess && (
        <div className="rewards-modal-overlay" onClick={() => setRedeemedVoucherSuccess(null)}>
          <div className="rewards-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setRedeemedVoucherSuccess(null)}>
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎉</div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#34d399' }}>
                Đổi Quà Thành Công!
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
                Voucher đã được lưu vào <b>Kho Quà Của Tôi</b>.
              </p>
            </div>

            <div style={{
              background: '#090e1c',
              border: '2px dashed #0284c7',
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>MÃ VOUCHER SỬ DỤNG</span>
              <div style={{
                fontSize: '1.4rem',
                fontFamily: 'monospace',
                fontWeight: 900,
                color: '#38bdf8',
                letterSpacing: '2px',
                margin: '8px 0 12px'
              }}>
                {redeemedVoucherSuccess.code}
              </div>

              <button
                className="copy-btn"
                style={{ margin: '0 auto', padding: '6px 14px', fontSize: '0.85rem' }}
                onClick={() => handleCopyCode(redeemedVoucherSuccess.code, 'success-modal')}
              >
                {copySuccessId === 'success-modal' ? <Check size={16} /> : <Copy size={16} />}
                {copySuccessId === 'success-modal' ? 'Đã sao chép' : 'Sao chép mã'}
              </button>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
              Xuất trình mã này cho nhân viên {redeemedVoucherSuccess.partner} hoặc nhập vào ứng dụng đối tác khi thanh toán.
            </p>

            <button
              onClick={() => {
                setRedeemedVoucherSuccess(null);
                setActiveView('vouchers');
              }}
              style={{
                padding: '12px',
                backgroundColor: '#0284c7',
                border: 'none',
                borderRadius: '12px',
                color: '#ffffff',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Xem Trong Kho Voucher
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
