import { 
  UserBadgeType, 
  BadgeConfig, 
  FriendUser, 
  ChatMessage, 
  LeaderboardUser 
} from '../types/social';

export const BADGES_CONFIG: Record<UserBadgeType, BadgeConfig> = {
  ACTIVE_CITIZEN: {
    id: 'ACTIVE_CITIZEN',
    name: 'Cư dân Tích cực',
    badge: '🥉',
    color: '#38bdf8',
    bgRgba: 'rgba(56, 189, 248, 0.15)',
    gradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
    requirement: 'Hoàn thành từ 1–5 báo cáo hợp lệ',
    description: 'Thành viên khởi đầu tích cực đóng góp dữ liệu ngập thời gian thực cho thành phố.'
  },
  ROUTE_GUARDIAN: {
    id: 'ROUTE_GUARDIAN',
    name: 'Dẫn đường Trách nhiệm',
    badge: '🛡️',
    color: '#34d399',
    bgRgba: 'rgba(52, 211, 153, 0.15)',
    gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    minPoints: 500,
    requirement: 'Đạt 500 điểm tích lũy',
    description: 'Người dẫn đường đáng tin cậy, liên tục cập nhật lộ trình né ngập an toàn cho cư dân.'
  },
  FLOOD_KNIGHT: {
    id: 'FLOOD_KNIGHT',
    name: 'Hiệp sĩ Mùa lũ',
    badge: '⚔️',
    color: '#fbbf24',
    bgRgba: 'rgba(251, 191, 36, 0.18)',
    gradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
    minPoints: 1500,
    requiredDeepReports: 20,
    requirement: 'Đạt 1.500 điểm tích lũy & từ 20 báo cáo ngập sâu được xác thực',
    description: 'Huy hiệu danh giá dành cho những hiệp sĩ xông pha tại các điểm ngập nước nguy hiểm nhất.'
  },
  PIONEER_VOLUNTEER: {
    id: 'PIONEER_VOLUNTEER',
    name: 'Tình nguyện viên Tiên phong',
    badge: '🌟',
    color: '#f43f5e',
    bgRgba: 'rgba(244, 63, 94, 0.18)',
    gradient: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
    requirement: 'Top 10 bảng xếp hạng đóng góp hàng tháng',
    description: 'Vinh danh những tấm gương tiêu biểu tiên phong trong công tác phòng chống ngập lụt đô thị.'
  }
};

const STORAGE_KEY_FRIENDS = 'flood_warning_friends_v1';
const STORAGE_KEY_MESSAGES = 'flood_warning_messages_v1';

const INITIAL_FRIENDS: FriendUser[] = [
  {
    id: 'user-001',
    name: 'Trần Văn Nam',
    phone: '0903888123',
    district: 'Bình Thạnh',
    avatar: '👨‍💼',
    badge: 'FLOOD_KNIGHT',
    online: true,
    lastActive: 'Đang hoạt động',
    status: 'friend',
    recentReportStreet: 'Đường Ung Văn Khiêm (~40cm)'
  },
  {
    id: 'user-002',
    name: 'Nguyễn Thị Mai',
    phone: '0988123456',
    district: 'Quận 7',
    avatar: '👩‍🏫',
    badge: 'ROUTE_GUARDIAN',
    online: true,
    lastActive: '5 phút trước',
    status: 'friend',
    recentReportStreet: 'Đường Huỳnh Tấn Phát (~30cm)'
  },
  {
    id: 'user-003',
    name: 'Lê Hoàng Phong',
    phone: '0912333444',
    district: 'Quận 7',
    avatar: '👨‍🔧',
    badge: 'PIONEER_VOLUNTEER',
    online: false,
    lastActive: '20 phút trước',
    status: 'friend',
    recentReportStreet: 'Đường Trần Xuân Soạn (~55cm)'
  },
  {
    id: 'user-004',
    name: 'Đặng Tuấn Anh',
    phone: '0977665544',
    district: 'Thủ Đức',
    avatar: '👨‍🎓',
    badge: 'ACTIVE_CITIZEN',
    online: true,
    lastActive: 'Vừa xong',
    status: 'pending_received',
    recentReportStreet: 'Đường Võ Văn Ngân'
  },
  {
    id: 'user-005',
    name: 'Bác Hùng Xe Ôm Công Nghệ',
    phone: '0933221100',
    district: 'Quận 7',
    avatar: '🛵',
    badge: 'FLOOD_KNIGHT',
    online: true,
    lastActive: 'Đang di chuyển',
    distanceKm: 0.8,
    status: 'suggested',
    recentReportStreet: 'Ngã tư Nguyễn Thị Thập - Nguyễn Văn Linh'
  },
  {
    id: 'user-006',
    name: 'Phạm Thu Trang',
    phone: '0944556677',
    district: 'Bình Thạnh',
    avatar: '👩‍💻',
    badge: 'ROUTE_GUARDIAN',
    online: false,
    lastActive: '1 giờ trước',
    distanceKm: 1.5,
    status: 'suggested',
    recentReportStreet: 'Đường Nguyễn Xí'
  }
];

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'user-001': [
    {
      id: 'm-1',
      senderId: 'user-001',
      receiverId: 'current-user',
      content: 'Chào bạn Minh! Đường Nguyễn Hữu Cảnh đoạn qua cầu vượt còn ngập sâu không bạn?',
      createdAt: new Date(Date.now() - 35 * 60000).toISOString(),
      isRead: true
    },
    {
      id: 'm-2',
      senderId: 'current-user',
      receiverId: 'user-001',
      content: 'Đoạn chân cầu vượt nước đang dâng gần 45cm (qua bô xe máy) rồi bạn nhé! Ô tô gầm thấp và xe tay ga đang chết máy la liệt, bạn nên rẽ qua hướng Điện Biên Phủ né gấp!',
      location: {
        lat: 10.798,
        lng: 106.718,
        streetName: 'Chân cầu vượt Nguyễn Hữu Cảnh, P.22',
        district: 'Bình Thạnh',
        depthCm: 45
      },
      image: '/assets/flood-report-1.jpg',
      createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
      isRead: true
    },
    {
      id: 'm-3',
      senderId: 'user-001',
      receiverId: 'current-user',
      content: 'Cảm ơn bạn nhiều nhé! May có tin của bạn chứ mình vừa định lao vào là chết máy chắc luôn! 🙏 Mình rẽ qua Điện Biên Phủ ngay.',
      createdAt: new Date(Date.now() - 10 * 60000).toISOString(),
      isRead: true
    }
  ],
  'user-002': [
    {
      id: 'm-4',
      senderId: 'user-002',
      receiverId: 'current-user',
      content: 'Minh ơi, triều cường đường Huỳnh Tấn Phát dâng tới nửa bánh xe rồi nhé, bạn đi làm về chú ý nhé!',
      location: {
        lat: 10.742,
        lng: 106.732,
        streetName: 'Huỳnh Tấn Phát, P. Tân Thuận Đông',
        district: 'Quận 7',
        depthCm: 30
      },
      createdAt: new Date(Date.now() - 50 * 60000).toISOString(),
      isRead: true
    }
  ]
};

const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    userId: 'user-003',
    name: 'Lê Hoàng Phong',
    phone: '0912***444',
    district: 'Quận 7',
    avatar: '👨‍🔧',
    badge: 'PIONEER_VOLUNTEER',
    monthlyPoints: 920,
    lifetimePoints: 2450,
    deepReportsCount: 38
  },
  {
    rank: 2,
    userId: 'current-user',
    name: 'Nguyễn Văn Minh (Bạn)',
    phone: '0903***888',
    district: 'Quận 7',
    avatar: '🎖️',
    badge: 'FLOOD_KNIGHT',
    monthlyPoints: 680,
    lifetimePoints: 1650,
    deepReportsCount: 22,
    isCurrentUser: true
  },
  {
    rank: 3,
    userId: 'user-001',
    name: 'Trần Văn Nam',
    phone: '0903***123',
    district: 'Bình Thạnh',
    avatar: '👨‍💼',
    badge: 'FLOOD_KNIGHT',
    monthlyPoints: 620,
    lifetimePoints: 1540,
    deepReportsCount: 21
  },
  {
    rank: 4,
    userId: 'user-002',
    name: 'Nguyễn Thị Mai',
    phone: '0988***456',
    district: 'Quận 7',
    avatar: '👩‍🏫',
    badge: 'ROUTE_GUARDIAN',
    monthlyPoints: 480,
    lifetimePoints: 980,
    deepReportsCount: 14
  },
  {
    rank: 5,
    userId: 'user-005',
    name: 'Bác Hùng Xe Ôm',
    phone: '0933***100',
    district: 'Quận 7',
    avatar: '🛵',
    badge: 'FLOOD_KNIGHT',
    monthlyPoints: 450,
    lifetimePoints: 1820,
    deepReportsCount: 26
  },
  {
    rank: 6,
    userId: 'user-006',
    name: 'Phạm Thu Trang',
    phone: '0944***677',
    district: 'Bình Thạnh',
    avatar: '👩‍💻',
    badge: 'ROUTE_GUARDIAN',
    monthlyPoints: 340,
    lifetimePoints: 720,
    deepReportsCount: 9
  },
  {
    rank: 7,
    userId: 'user-007',
    name: 'Võ Minh Trí',
    phone: '0909***999',
    district: 'Thủ Đức',
    avatar: '👨‍🚒',
    badge: 'ROUTE_GUARDIAN',
    monthlyPoints: 310,
    lifetimePoints: 640,
    deepReportsCount: 11
  },
  {
    rank: 8,
    userId: 'user-008',
    name: 'Đặng Tuấn Anh',
    phone: '0977***544',
    district: 'Thủ Đức',
    avatar: '👨‍🎓',
    badge: 'ACTIVE_CITIZEN',
    monthlyPoints: 210,
    lifetimePoints: 390,
    deepReportsCount: 4
  },
  {
    rank: 9,
    userId: 'user-009',
    name: 'Hoàng Kim Yến',
    phone: '0918***888',
    district: 'Gò Vấp',
    avatar: '👩‍⚕️',
    badge: 'ACTIVE_CITIZEN',
    monthlyPoints: 190,
    lifetimePoints: 280,
    deepReportsCount: 3
  },
  {
    rank: 10,
    userId: 'user-010',
    name: 'Đỗ Hữu Thắng',
    phone: '0966***333',
    district: 'Quận 8',
    avatar: '👨‍🌾',
    badge: 'ACTIVE_CITIZEN',
    monthlyPoints: 160,
    lifetimePoints: 240,
    deepReportsCount: 2
  }
];

class SocialStore {
  private friends: FriendUser[];
  private messages: Record<string, ChatMessage[]>;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.friends = this.loadFriends();
    this.messages = this.loadMessages();
  }

  private loadFriends(): FriendUser[] {
    const saved = localStorage.getItem(STORAGE_KEY_FRIENDS);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_FRIENDS;
  }

  private loadMessages(): Record<string, ChatMessage[]> {
    const saved = localStorage.getItem(STORAGE_KEY_MESSAGES);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_MESSAGES;
  }

  private persist() {
    localStorage.setItem(STORAGE_KEY_FRIENDS, JSON.stringify(this.friends));
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(this.messages));
    this.listeners.forEach((listener) => listener());
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getFriends(): FriendUser[] {
    return this.friends;
  }

  public getMessages(friendId: string): ChatMessage[] {
    return this.messages[friendId] || [];
  }

  public sendMessage(friendId: string, content: string, location?: ChatMessage['location'], image?: string): ChatMessage {
    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      senderId: 'current-user',
      receiverId: friendId,
      content,
      location,
      image,
      createdAt: new Date().toISOString(),
      isRead: true
    };

    if (!this.messages[friendId]) {
      this.messages[friendId] = [];
    }
    this.messages[friendId].push(newMsg);
    this.persist();

    // Simulate friend auto-reply after 2 seconds if user asked a question
    if (content.includes('ngập') || content.includes('không') || content.includes('?')) {
      setTimeout(() => {
        const replyMsg: ChatMessage = {
          id: `m-${Date.now() + 1}`,
          senderId: friendId,
          receiverId: 'current-user',
          content: 'Cảm ơn bạn đã hỏi thăm! Tuyến này hiện tại mưa đang giảm dần nhưng nước rút khá chậm, bạn đi xe máy chú ý chạy sát tim đường tránh ổ gà nhé.',
          createdAt: new Date().toISOString(),
          isRead: false
        };
        this.messages[friendId].push(replyMsg);
        this.persist();
      }, 2000);
    }

    return newMsg;
  }

  public sendFriendRequest(friendId: string) {
    const f = this.friends.find((u) => u.id === friendId);
    if (f) {
      f.status = 'pending_sent';
      this.persist();
    }
  }

  public acceptFriendRequest(friendId: string) {
    const f = this.friends.find((u) => u.id === friendId);
    if (f) {
      f.status = 'friend';
      this.persist();
    }
  }

  public removeFriend(friendId: string) {
    const f = this.friends.find((u) => u.id === friendId);
    if (f) {
      f.status = 'suggested';
      this.persist();
    }
  }

  public searchByPhone(queryPhone: string): FriendUser[] {
    const cleanQuery = queryPhone.replace(/\D/g, '');
    if (!cleanQuery) return [];
    return this.friends.filter((u) => u.phone.includes(cleanQuery));
  }

  public shareFloodAlertToFriends(district: string, street: string, depthCm: number): { count: number } {
    const friendList = this.friends.filter((f) => f.status === 'friend');
    let sentCount = 0;

    friendList.forEach((friend) => {
      const alertMsg: ChatMessage = {
        id: `alert-${Date.now()}-${friend.id}`,
        senderId: 'current-user',
        receiverId: friend.id,
        content: `⚠️ CẢNH BÁO TUYẾN ĐƯỜNG NGẬP: Tuyến ${street} (${district}) đang ngập sâu khoảng ~${depthCm}cm! Bạn có lộ trình qua đây hãy chủ động đổi hướng né ngập an toàn nhé!`,
        location: {
          lat: 10.742,
          lng: 106.721,
          streetName: street,
          district: district,
          depthCm
        },
        createdAt: new Date().toISOString(),
        isRead: true
      };

      if (!this.messages[friend.id]) {
        this.messages[friend.id] = [];
      }
      this.messages[friend.id].push(alertMsg);
      sentCount++;
    });

    this.persist();
    return { count: sentCount };
  }

  public getLeaderboard(criteria: 'monthly' | 'lifetime'): LeaderboardUser[] {
    const sorted = [...INITIAL_LEADERBOARD];
    if (criteria === 'monthly') {
      sorted.sort((a, b) => b.monthlyPoints - a.monthlyPoints);
    } else {
      sorted.sort((a, b) => b.lifetimePoints - a.lifetimePoints);
    }
    return sorted.map((item, idx) => ({ ...item, rank: idx + 1 }));
  }
}

export const socialStore = new SocialStore();
