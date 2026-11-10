import { 
  UserRewardsProfile, 
  UserRank, 
  RankInfo, 
  RewardItem, 
  RedeemedVoucher, 
  RewardTransaction 
} from '../types/rewards';

export const RANKS_CONFIG: Record<UserRank, RankInfo> = {
  active_citizen: {
    id: 'active_citizen',
    name: 'Cư dân Tích cực',
    minPoints: 0,
    badge: '🥉',
    color: '#38bdf8',
    gradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
    benefits: [
      'Gửi báo cáo ngập kèm GPS',
      'Xác nhận điểm ngập nhận +5đ',
      'Đổi thẻ cào & vé xe buýt'
    ]
  },
  street_knight: {
    id: 'street_knight',
    name: 'Hiệp sĩ Đường phố',
    minPoints: 200,
    badge: '🥈',
    color: '#34d399',
    gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    benefits: [
      'Tất cả quyền lợi Cư dân Tích cực',
      'Báo cáo được ưu tiên duyệt nhanh x1.5',
      'Giảm 5% điểm khi đổi voucher xăng dầu & siêu thị',
      'Huy hiệu Hiệp sĩ nổi bật trên bảng tin'
    ]
  },
  golden_volunteer: {
    id: 'golden_volunteer',
    name: 'Tình nguyện viên Vàng',
    minPoints: 500,
    badge: '🥇',
    color: '#fbbf24',
    gradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
    benefits: [
      'Tất cả quyền lợi Hiệp sĩ Đường phố',
      'Báo cáo tự động xác thực trực tiếp lên bản đồ',
      'Quyền kiểm duyệt tin báo cộng đồng',
      'Đổi các phần quà hiện vật độc quyền cứu hộ',
      'Vinh danh Top 10 Bảng vàng thành phố'
    ]
  }
};

export const REWARD_CATALOG: RewardItem[] = [
  {
    id: 'rew-telco-20k',
    title: 'Thẻ Cào Điện Thoại 20.000đ',
    category: 'telco',
    pointsCost: 80,
    partner: 'Viettel / Vinaphone / MobiFone',
    description: 'Nạp trực tiếp hoặc gửi mã thẻ cào điện thoại cho mọi nhà mạng nội địa.',
    value: '20.000 VNĐ',
    stock: 120,
    tag: 'Dễ đổi nhất'
  },
  {
    id: 'rew-telco-50k',
    title: 'Thẻ Cào Điện Thoại 50.000đ',
    category: 'telco',
    pointsCost: 180,
    partner: 'Viettel / Vinaphone / MobiFone',
    description: 'Thẻ cào đa mạng mệnh giá 50.000đ gửi mã SMS ngay sau khi đổi.',
    value: '50.000 VNĐ',
    stock: 85,
    tag: 'Phổ biến'
  },
  {
    id: 'rew-fuel-50k',
    title: 'Voucher Xăng Dầu Petrolimex 50.000đ',
    category: 'fuel',
    pointsCost: 200,
    partner: 'Petrolimex Sài Gòn',
    description: 'Sử dụng đổ xăng tại hơn 100 cây xăng Petrolimex toàn TP.HCM khi lưu thông mùa mưa.',
    value: '50.000 VNĐ',
    stock: 50,
    featured: true,
    tag: 'Hot mùa mưa'
  },
  {
    id: 'rew-fuel-100k',
    title: 'Voucher Xăng Dầu Petrolimex 100.000đ',
    category: 'fuel',
    pointsCost: 380,
    partner: 'Petrolimex Sài Gòn',
    description: 'Áp dụng cho mọi loại xăng RON 95-V và dầu DO tại hệ thống Petrolimex.',
    value: '100.000 VNĐ',
    stock: 30,
    requiredRank: 'street_knight',
    tag: 'Đặc quyền Hiệp sĩ'
  },
  {
    id: 'rew-transit-pass',
    title: 'Gói 10 Vé Xe Buýt / Tuyến Metro Bến Thành',
    category: 'transit',
    pointsCost: 120,
    partner: 'Trung tâm Quản lý Giao thông Công cộng TP.HCM',
    description: 'Khuyến khích người dân đi phương tiện công cộng để tránh kẹt xe và ngập nước đô thị.',
    value: '70.000 VNĐ',
    stock: 150,
    tag: 'Giao thông xanh'
  },
  {
    id: 'rew-mart-100k',
    title: 'Phiếu Mua Hàng Co.opmart / WinMart 100K',
    category: 'mart',
    pointsCost: 350,
    partner: 'Saigon Co.op & WinCommerce',
    description: 'Mua sắm nhu yếu phẩm, thực phẩm, áo mưa và đồ dùng gia đình mùa mưa bão.',
    value: '100.000 VNĐ',
    stock: 45,
    tag: 'Thiết thực'
  },
  {
    id: 'rew-gear-raincoat',
    title: 'Áo Mưa Phản Quang Cứu Hộ Đô Thị Cao Cấp',
    category: 'gear',
    pointsCost: 450,
    partner: 'Ban Chỉ huy PCTT & TKCN TP.HCM',
    description: 'Chất liệu vải dù Oxford phủ PVC siêu bền, viền phản quang ban đêm chuẩn an toàn đường thủy.',
    value: '150.000 VNĐ',
    stock: 25,
    requiredRank: 'street_knight',
    tag: 'Quà hiện vật'
  },
  {
    id: 'rew-gear-kit',
    title: 'Bộ Dụng Cụ Cứu Sinh Bỏ Túi & Đèn Pin Chống Nước',
    category: 'gear',
    pointsCost: 600,
    partner: 'Lực lượng Cứu hộ 114 TP.HCM',
    description: 'Bao gồm đèn pin lặn nước IP68, còi cứu hộ 120dB, túi chống nước IPX8 và dụng cụ đa năng.',
    value: '280.000 VNĐ',
    stock: 15,
    requiredRank: 'golden_volunteer',
    featured: true,
    tag: 'Độc quyền Vàng'
  }
];

const STORAGE_KEY = 'flood_warning_rewards_profile_v1';

const getInitialProfile = (): UserRewardsProfile => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // fallback
    }
  }

  return {
    userId: 'USR-888',
    fullName: 'Nguyễn Văn Minh',
    phone: '0903***888',
    points: 285,
    lifetimePoints: 385,
    trustScore: 95,
    rank: 'street_knight',
    dailyDistrictReports: {
      'Quận 7': 1
    },
    todayTotalReports: 1,
    isRestricted: false,
    history: [
      {
        id: 'tx-1',
        type: 'earn',
        points: 50,
        title: 'Báo cáo điểm ngập được phê duyệt',
        description: 'Báo cáo điểm ngập đường Huỳnh Tấn Phát, Quận 7 được Admin đối soát hợp lệ.',
        district: 'Quận 7',
        createdAt: new Date(Date.now() - 3 * 3600000).toISOString()
      },
      {
        id: 'tx-2',
        type: 'earn',
        points: 20,
        title: 'Thưởng kèm ảnh hiện trường rõ nét',
        description: 'Báo cáo có 2 hình ảnh góc rộng hiển thị rõ mức ngập so với bánh xe.',
        district: 'Quận 7',
        createdAt: new Date(Date.now() - 3 * 3600000).toISOString()
      },
      {
        id: 'tx-3',
        type: 'earn',
        points: 30,
        title: 'Thưởng người phát hiện đầu tiên',
        description: 'Điểm ngập mới xuất hiện tại ngã tư Trần Xuân Soạn được ghi nhận đầu tiên.',
        district: 'Quận 7',
        createdAt: new Date(Date.now() - 24 * 3600000).toISOString()
      },
      {
        id: 'tx-4',
        type: 'earn',
        points: 5,
        title: 'Xác nhận điểm ngập cộng đồng',
        description: 'Xác nhận thông tin ngập tuyến đường Ung Văn Khiêm của người dân khác.',
        district: 'Bình Thạnh',
        createdAt: new Date(Date.now() - 48 * 3600000).toISOString()
      },
      {
        id: 'tx-5',
        type: 'redeem',
        points: -100,
        title: 'Đổi Thẻ cào điện thoại Viettel 20K',
        description: 'Mã thẻ: VTT-8291-0392 nạp thành công.',
        createdAt: new Date(Date.now() - 72 * 3600000).toISOString()
      }
    ],
    vouchers: [
      {
        id: 'vouch-01',
        rewardId: 'rew-telco-20k',
        title: 'Thẻ Cào Điện Thoại 20.000đ (Viettel)',
        code: 'VTT-8291-0392-88',
        value: '20.000 VNĐ',
        partner: 'Viettel Telecom',
        category: 'telco',
        redeemedAt: new Date(Date.now() - 72 * 3600000).toISOString(),
        expiresAt: new Date(Date.now() + 30 * 86400000).toISOString(),
        status: 'available'
      }
    ]
  };
};

let currentProfile: UserRewardsProfile = getInitialProfile();
const listeners = new Set<() => void>();

function calculateRank(lifetimePoints: number): UserRank {
  if (lifetimePoints >= 500) return 'golden_volunteer';
  if (lifetimePoints >= 200) return 'street_knight';
  return 'active_citizen';
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentProfile));
  listeners.forEach((listener) => listener());
}

export const rewardsStore = {
  getProfile: (): UserRewardsProfile => {
    return currentProfile;
  },

  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  // Check rate limit for a district (Max 3 reports/person/day in the same district)
  checkDistrictRateLimit: (district: string): { allowed: boolean; countToday: number; max: number } => {
    const count = currentProfile.dailyDistrictReports[district] || 0;
    const max = 3;
    return {
      allowed: count < max,
      countToday: count,
      max
    };
  },

  // Check trust score and anti-fraud status
  getAccountStatus: (): { canSubmit: boolean; trustScore: number; isRestricted: boolean; reason?: string } => {
    const isRestricted = currentProfile.trustScore < 50 || currentProfile.isRestricted;
    let reason = undefined;
    if (isRestricted) {
      reason = 'Tài khoản tạm thời bị khóa tính năng gửi báo cáo do điểm uy tín dưới 50 (vi phạm quy chế báo tin sai sự thật / spam).';
    }
    return {
      canSubmit: !isRestricted,
      trustScore: currentProfile.trustScore,
      isRestricted,
      reason
    };
  },

  // Business Rule: Confirm (Upvote) report from others (+5 pts)
  confirmReport: (reportId: string, streetName: string, district?: string): { success: boolean; earned: number; message: string } => {
    const pointsToAdd = 5;
    currentProfile.points += pointsToAdd;
    currentProfile.lifetimePoints += pointsToAdd;
    currentProfile.rank = calculateRank(currentProfile.lifetimePoints);

    const newTx: RewardTransaction = {
      id: `tx-${Date.now()}`,
      type: 'earn',
      points: pointsToAdd,
      title: 'Xác nhận (Upvote) điểm ngập cộng đồng',
      description: `Đã hỗ trợ kiểm chứng đám đông cho điểm ngập tại ${streetName}.`,
      district: district || 'TP.HCM',
      createdAt: new Date().toISOString()
    };

    currentProfile.history.unshift(newTx);
    persist();

    return {
      success: true,
      earned: pointsToAdd,
      message: `+${pointsToAdd} Điểm thưởng! Cảm ơn bạn đã tham gia kiểm chứng đám đông.`
    };
  },

  // Business Rule: Submit report with breakdown (+50 approved, +20 image, +30 first report)
  recordReportSubmission: (options: {
    district: string;
    street: string;
    hasImage: boolean;
    isFirstReporter: boolean;
  }): { success: boolean; pointsEarned: number; breakdown: string[]; error?: string } => {
    const status = rewardsStore.getAccountStatus();
    if (!status.canSubmit) {
      return {
        success: false,
        pointsEarned: 0,
        breakdown: [],
        error: status.reason || 'Tài khoản của bạn đang bị giới hạn gửi báo cáo.'
      };
    }

    const rateLimit = rewardsStore.checkDistrictRateLimit(options.district);
    const count = rateLimit.countToday;

    let pointsEarned = 0;
    const breakdown: string[] = [];

    // Rate limit check: only first 3 reports in this district get points today
    if (count < 3) {
      // 1. Approved report base (+50)
      pointsEarned += 50;
      breakdown.push('Gửi báo cáo được duyệt: +50 điểm');

      // 2. Clear photo/video bonus (+20)
      if (options.hasImage) {
        pointsEarned += 20;
        breakdown.push('Kèm ảnh/video rõ nét: +20 điểm thưởng');
      }

      // 3. First reporter at new point bonus (+30)
      if (options.isFirstReporter) {
        pointsEarned += 30;
        breakdown.push('Báo cáo đầu tiên tại điểm ngập mới: +30 điểm phát hiện sớm');
      }

      // Update user points
      currentProfile.points += pointsEarned;
      currentProfile.lifetimePoints += pointsEarned;
      currentProfile.rank = calculateRank(currentProfile.lifetimePoints);

      // Record daily district usage
      currentProfile.dailyDistrictReports[options.district] = count + 1;
      currentProfile.todayTotalReports += 1;

      // Add transaction
      currentProfile.history.unshift({
        id: `tx-${Date.now()}`,
        type: 'earn',
        points: pointsEarned,
        title: 'Báo cáo điểm ngập được ghi nhận',
        description: `Báo cáo tại ${options.street}, ${options.district} (${breakdown.join(', ')}).`,
        district: options.district,
        createdAt: new Date().toISOString()
      });

      persist();

      return {
        success: true,
        pointsEarned,
        breakdown
      };
    } else {
      // Report still accepted for community warning, but daily point quota exceeded
      currentProfile.dailyDistrictReports[options.district] = count + 1;
      currentProfile.todayTotalReports += 1;
      persist();

      return {
        success: true,
        pointsEarned: 0,
        breakdown: ['Bạn đã đạt hạn mức nhận điểm (3 báo cáo/ngày) tại khu vực này. Cảm ơn sự cống hiến vì cộng đồng!']
      };
    }
  },

  // Anti-Spam & Penalty: False report rejected by admin (-30 trust points)
  applyPenaltyForSpam: (reason: string): { trustScore: number; isRestricted: boolean } => {
    currentProfile.trustScore = Math.max(0, currentProfile.trustScore - 30);
    const isRestricted = currentProfile.trustScore < 50;
    currentProfile.isRestricted = isRestricted;

    currentProfile.history.unshift({
      id: `tx-${Date.now()}`,
      type: 'penalty',
      points: -30,
      title: 'Bị trừ điểm uy tín (Phát hiện tin giả / Spam)',
      description: `Lý do: ${reason}. Bị trừ 30 điểm uy tín. Trạng thái hiện tại: ${currentProfile.trustScore}/100.`,
      createdAt: new Date().toISOString()
    });

    persist();
    return {
      trustScore: currentProfile.trustScore,
      isRestricted
    };
  },

  // Redeem Reward Voucher
  redeemVoucher: (reward: RewardItem): { success: boolean; voucher?: RedeemedVoucher; error?: string } => {
    // Check rank prerequisite
    if (reward.requiredRank) {
      const rankOrder: Record<UserRank, number> = { active_citizen: 1, street_knight: 2, golden_volunteer: 3 };
      if (rankOrder[currentProfile.rank] < rankOrder[reward.requiredRank]) {
        const requiredName = RANKS_CONFIG[reward.requiredRank].name;
        return {
          success: false,
          error: `Phần quà này yêu cầu danh hiệu tối thiểu "${requiredName}". Hãy tích lũy thêm điểm để thăng hạng!`
        };
      }
    }

    // Apply Street Knight discount (5% off on fuel & mart vouchers)
    let finalCost = reward.pointsCost;
    if (currentProfile.rank !== 'active_citizen' && (reward.category === 'fuel' || reward.category === 'mart')) {
      finalCost = Math.round(reward.pointsCost * 0.95);
    }

    if (currentProfile.points < finalCost) {
      return {
        success: false,
        error: `Bạn còn thiếu ${finalCost - currentProfile.points} điểm để đổi phần quà này (Cần ${finalCost} điểm, bạn có ${currentProfile.points} điểm).`
      };
    }

    // Deduct points
    currentProfile.points -= finalCost;

    // Generate simulated code
    const prefix = reward.category.toUpperCase().slice(0, 4);
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const code = `${prefix}-${randomHex}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newVoucher: RedeemedVoucher = {
      id: `vouch-${Date.now()}`,
      rewardId: reward.id,
      title: reward.title,
      code,
      value: reward.value,
      partner: reward.partner,
      category: reward.category,
      redeemedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 45 * 86400000).toISOString(),
      status: 'available'
    };

    currentProfile.vouchers.unshift(newVoucher);

    currentProfile.history.unshift({
      id: `tx-${Date.now()}`,
      type: 'redeem',
      points: -finalCost,
      title: `Đổi voucher: ${reward.title}`,
      description: `Đã đổi thành công mã ${code} từ đối tác ${reward.partner}.`,
      createdAt: new Date().toISOString()
    });

    persist();
    return {
      success: true,
      voucher: newVoucher
    };
  },

  // Mark voucher used
  useVoucher: (voucherId: string) => {
    const v = currentProfile.vouchers.find((item) => item.id === voucherId);
    if (v) {
      v.status = 'used';
      persist();
    }
  },

  // Reset to initial demo data
  resetDemoData: () => {
    localStorage.removeItem(STORAGE_KEY);
    currentProfile = getInitialProfile();
    persist();
  }
};
