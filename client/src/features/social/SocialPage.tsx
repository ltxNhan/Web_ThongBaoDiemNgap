import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  MessageSquare, 
  Award, 
  Search, 
  MapPin, 
  Camera, 
  Send, 
  UserPlus, 
  UserCheck, 
  UserX, 
  AlertTriangle, 
  Check, 
  Clock, 
  Share2, 
  Trophy, 
  Sparkles,
  ExternalLink,
  Phone
} from 'lucide-react';
import { socialStore, BADGES_CONFIG } from '../../stores/socialStore';
import { FriendUser, ChatMessage, LeaderboardUser, UserBadgeType } from '../../types/social';
import './SocialPage.css';

interface SocialPageProps {
  onNavigateTab?: (tab: string) => void;
  initialTab?: 'chat' | 'friends' | 'badges';
}

export const SocialPage: React.FC<SocialPageProps> = ({ 
  onNavigateTab,
  initialTab = 'chat'
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'friends' | 'badges'>(initialTab);
  const [friends, setFriends] = useState<FriendUser[]>(socialStore.getFriends());
  const [selectedFriendId, setSelectedFriendId] = useState<string>('user-001');
  const [messages, setMessages] = useState<ChatMessage[]>(socialStore.getMessages('user-001'));
  const [inputContent, setInputContent] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [leaderboardCriteria, setLeaderboardCriteria] = useState<'monthly' | 'lifetime'>('monthly');
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(socialStore.getLeaderboard('monthly'));
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Subscribe to socialStore
  useEffect(() => {
    const unsub = socialStore.subscribe(() => {
      setFriends([...socialStore.getFriends()]);
      setMessages([...socialStore.getMessages(selectedFriendId)]);
      setLeaderboard(socialStore.getLeaderboard(leaderboardCriteria));
    });
    return () => {
      unsub();
    };
  }, [selectedFriendId, leaderboardCriteria]);

  // Sync messages when selected friend changes
  useEffect(() => {
    setMessages(socialStore.getMessages(selectedFriendId));
  }, [selectedFriendId]);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSendMessage = (contentToSend?: string, withLocation = false, withImage = false) => {
    const text = contentToSend !== undefined ? contentToSend : inputContent;
    if (!text.trim() && !withLocation && !withImage) return;

    let loc = undefined;
    if (withLocation) {
      loc = {
        lat: 10.798,
        lng: 106.718,
        streetName: 'Cầu vượt Nguyễn Hữu Cảnh, Bình Thạnh',
        district: 'Bình Thạnh',
        depthCm: 45
      };
    }

    const img = withImage ? '/assets/flood-report-1.jpg' : undefined;

    socialStore.sendMessage(selectedFriendId, text, loc, img);
    setInputContent('');
    showToast('Đã gửi tin nhắn!');
  };

  const handleBroadcastAlert = () => {
    const res = socialStore.shareFloodAlertToFriends('Bình Thạnh', 'Đường Nguyễn Hữu Cảnh (đoạn chân cầu vượt)', 45);
    showToast(`Đã phát cảnh báo tuyến đường tới ${res.count} bạn bè trong danh bạ!`);
  };

  const selectedFriend = friends.find((f) => f.id === selectedFriendId) || friends[0];
  const myFriendsList = friends.filter((f) => f.status === 'friend');
  const pendingRequests = friends.filter((f) => f.status === 'pending_received');
  const suggestedPeople = friends.filter((f) => f.status === 'suggested');

  return (
    <div className="social-hub-container">
      {/* Toast Notification */}
      {toastMessage && (
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
          gap: '8px',
          fontWeight: 700,
          animation: 'modalPop 0.2s ease'
        }}>
          <Sparkles size={18} />
          {toastMessage}
        </div>
      )}

      {/* Header Card */}
      <div className="social-header-card">
        <div className="social-header-title">
          <h1>
            <Users size={26} color="#38bdf8" />
            Mạng Lưới Cộng Đồng &amp; Trò Chuyện Trực Tiếp
          </h1>
          <p>
            Hỏi thăm tình hình ngập đường sá thời gian thực, kết nối bạn bè di chuyển cùng khu vực và vinh danh danh hiệu.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="social-nav-tabs">
          <button
            className={`social-tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare size={16} />
            Trò chuyện 1-1 ({messages.length > 0 ? 'Mới' : ''})
          </button>

          <button
            className={`social-tab-btn ${activeTab === 'friends' ? 'active' : ''}`}
            onClick={() => setActiveTab('friends')}
          >
            <Users size={16} />
            Danh bạ &amp; Kết bạn ({myFriendsList.length})
          </button>

          <button
            className={`social-tab-btn ${activeTab === 'badges' ? 'active' : ''}`}
            onClick={() => setActiveTab('badges')}
          >
            <Trophy size={16} />
            Bảng xếp hạng &amp; Danh hiệu
          </button>
        </div>
      </div>

      {/* TAB 1: 1-1 DIRECT MESSAGING */}
      {activeTab === 'chat' && (
        <div className="chat-layout-grid">
          {/* Left: Friends List */}
          <div className="chat-sidebar">
            <div className="chat-sidebar-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc' }}>
                  Hộp Thoại Bạn Bè
                </span>
                <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700 }}>
                  {myFriendsList.length} người
                </span>
              </div>

              <button
                onClick={handleBroadcastAlert}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  backgroundColor: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  borderRadius: '10px',
                  color: '#fbbf24',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
                title="Gửi cảnh báo tuyến đường ngập cho tất cả bạn bè"
              >
                <AlertTriangle size={14} /> Cảnh Báo Tuyến Đường Cho Cả Danh Bạ
              </button>
            </div>

            <div className="chat-friends-list">
              {myFriendsList.map((friend) => {
                const bConfig = BADGES_CONFIG[friend.badge];
                const isSelected = friend.id === selectedFriendId;

                return (
                  <div
                    key={friend.id}
                    className={`chat-friend-item ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedFriendId(friend.id)}
                  >
                    <div className="avatar-with-badge">
                      {friend.avatar}
                      <span className={`online-dot ${friend.online ? 'online' : 'offline'}`} />
                    </div>

                    <div className="friend-item-info">
                      <div className="friend-item-top">
                        <span className="friend-item-name">{friend.name}</span>
                        <span 
                          className="badge-tag-pill"
                          style={{ backgroundColor: bConfig.bgRgba, color: bConfig.color }}
                        >
                          {bConfig.badge} {bConfig.name}
                        </span>
                      </div>
                      <div className="friend-item-recent">
                        {friend.recentReportStreet || friend.district}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Active Chat Conversation */}
          <div className="chat-main-pane">
            {/* Header */}
            <div className="chat-pane-header">
              <div className="chat-header-user">
                <div className="avatar-with-badge">
                  {selectedFriend.avatar}
                  <span className={`online-dot ${selectedFriend.online ? 'online' : 'offline'}`} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                      {selectedFriend.name}
                    </h3>
                    <span 
                      className="badge-tag-pill"
                      style={{ 
                        backgroundColor: BADGES_CONFIG[selectedFriend.badge].bgRgba, 
                        color: BADGES_CONFIG[selectedFriend.badge].color 
                      }}
                    >
                      {BADGES_CONFIG[selectedFriend.badge].badge} {BADGES_CONFIG[selectedFriend.badge].name}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: selectedFriend.online ? '#34d399' : '#94a3b8' }}>
                    {selectedFriend.online ? '● Đang trực tuyến' : selectedFriend.lastActive} • {selectedFriend.district}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('map')}
                  style={{
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    color: '#38bdf8',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <MapPin size={14} /> Mở Bản Đồ Ngập
                </button>
              </div>
            </div>

            {/* Message Thread Scroll */}
            <div className="chat-messages-scroll">
              <div style={{ textAlign: 'center', margin: '8px 0' }}>
                <span style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                  color: '#64748b', 
                  fontSize: '0.72rem', 
                  padding: '3px 10px', 
                  borderRadius: '999px' 
                }}>
                  Hội thoại chia sẻ dữ liệu ngập nước được bảo vệ đầu cuối
                </span>
              </div>

              {messages.map((msg) => {
                const isMine = msg.senderId === 'current-user';

                return (
                  <div key={msg.id} className={`message-row ${isMine ? 'mine' : 'theirs'}`}>
                    <div className="message-bubble">
                      <div>{msg.content}</div>

                      {/* GPS Location Pin Card */}
                      {msg.location && (
                        <div className="location-pin-card">
                          <div className="location-pin-title">
                            <MapPin size={14} />
                            {msg.location.streetName}
                          </div>
                          {msg.location.depthCm && (
                            <div className="location-pin-depth">
                              Độ sâu ngập ước tính: ~{msg.location.depthCm} cm
                            </div>
                          )}
                          <button
                            className="location-pin-btn"
                            onClick={() => onNavigateTab && onNavigateTab('map')}
                          >
                            Xem Điểm Này Trên Bản Đồ <ExternalLink size={11} style={{ display: 'inline' }} />
                          </button>
                        </div>
                      )}

                      {/* Incident Photo Card */}
                      {msg.image && (
                        <div className="incident-image-bubble">
                          <img src={msg.image} alt="Hiện trường ngập" />
                        </div>
                      )}

                      <span className="message-time">
                        {new Date(msg.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                        {isMine && ' ✓✓'}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Prompt Chips */}
            <div className="chat-quick-prompts">
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', alignSelf: 'center', whiteSpace: 'nowrap' }}>
                Hỏi nhanh:
              </span>
              {[
                'Đoạn qua cầu vượt còn ngập sâu không bạn?',
                'Tuyến Huỳnh Tấn Phát triều dâng rút chưa?',
                'Khu vực này xe 4 chỗ có qua được không?'
              ].map((prompt, idx) => (
                <button
                  key={idx}
                  className="quick-prompt-chip"
                  onClick={() => handleSendMessage(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="chat-input-bar">
              <button
                className="chat-action-btn"
                title="Đính kèm tọa độ GPS hiện trường"
                onClick={() => handleSendMessage('Chia sẻ tọa độ hiện trường ngập thực tế:', true)}
              >
                <MapPin size={18} />
              </button>

              <button
                className="chat-action-btn"
                title="Gửi ảnh hiện trường"
                onClick={() => handleSendMessage('Ảnh chụp mức ngập hiện trường tại tuyến đường:', false, true)}
              >
                <Camera size={18} />
              </button>

              <input
                type="text"
                className="chat-input-field"
                placeholder="Nhập tin nhắn hỏi tình hình ngập, chia sẻ kinh nghiệm tránh ngập..."
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
              />

              <button
                className="chat-send-btn"
                onClick={() => handleSendMessage()}
              >
                <Send size={15} /> Gửi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FRIENDS & NETWORK */}
      {activeTab === 'friends' && (
        <div className="friends-grid-section">
          {/* Search by Phone Box */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '16px',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Search size={20} color="#38bdf8" />
            <input
              type="text"
              placeholder="Nhập số điện thoại để tìm kiếm và kết bạn (ví dụ: 0903888123)..."
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
            {searchPhone && (
              <button
                onClick={() => setSearchPhone('')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Pending Requests (if any) */}
          {pendingRequests.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fbbf24', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={18} /> Lời Mời Kết Bạn Đang Chờ ({pendingRequests.length})
              </h3>
              <div className="friends-cards-grid">
                {pendingRequests.map((req) => (
                  <div key={req.id} className="friend-card" style={{ borderColor: 'rgba(245, 158, 11, 0.4)' }}>
                    <div className="friend-card-top">
                      <div className="avatar-with-badge">{req.avatar}</div>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>{req.name}</h4>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{req.district} • SĐT: {req.phone}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                      Báo cáo gần nhất: <b style={{ color: '#38bdf8' }}>{req.recentReportStreet}</b>
                    </p>
                    <div className="friend-card-actions">
                      <button
                        onClick={() => {
                          socialStore.acceptFriendRequest(req.id);
                          showToast(`Đã đồng ý kết bạn với ${req.name}!`);
                        }}
                        style={{
                          flex: 1,
                          padding: '8px',
                          backgroundColor: '#0284c7',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#ffffff',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          fontSize: '0.85rem'
                        }}
                      >
                        <UserCheck size={14} /> Chấp Nhận
                      </button>
                      <button
                        onClick={() => {
                          socialStore.removeFriend(req.id);
                          showToast(`Đã từ chối lời mời của ${req.name}.`);
                        }}
                        style={{
                          padding: '8px 14px',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          color: '#94a3b8',
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontSize: '0.85rem'
                        }}
                      >
                        Từ Chối
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Nearby Flood Reporters */}
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#38bdf8', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={18} /> Gợi Ý Người Báo Ngập Đang Lưu Thông Gần Bạn
            </h3>
            <div className="friends-cards-grid">
              {suggestedPeople.map((person) => {
                const bConfig = BADGES_CONFIG[person.badge];
                return (
                  <div key={person.id} className="friend-card">
                    <div className="friend-card-top">
                      <div className="avatar-with-badge">{person.avatar}</div>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>{person.name}</h4>
                        <span 
                          className="badge-tag-pill"
                          style={{ backgroundColor: bConfig.bgRgba, color: bConfig.color }}
                        >
                          {bConfig.badge} {bConfig.name}
                        </span>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                      📍 Cách bạn: <b style={{ color: '#34d399' }}>~{person.distanceKm || 1.2} km</b> ({person.district})
                      <div style={{ marginTop: '2px', color: '#cbd5e1' }}>
                        Tuyến vừa đăng: {person.recentReportStreet}
                      </div>
                    </div>
                    <div className="friend-card-actions">
                      <button
                        onClick={() => {
                          socialStore.sendFriendRequest(person.id);
                          showToast(`Đã gửi lời mời kết bạn tới ${person.name}!`);
                        }}
                        style={{
                          width: '100%',
                          padding: '8px',
                          backgroundColor: 'rgba(56, 189, 248, 0.15)',
                          border: '1px solid rgba(56, 189, 248, 0.35)',
                          borderRadius: '8px',
                          color: '#38bdf8',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          fontSize: '0.85rem'
                        }}
                      >
                        <UserPlus size={15} /> Kết Bạn Để Nhận Cảnh Báo
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* My Current Friends List */}
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={18} /> Danh Bạ Bạn Bè Của Bạn ({myFriendsList.length})
            </h3>
            <div className="friends-cards-grid">
              {myFriendsList.map((friend) => {
                const bConfig = BADGES_CONFIG[friend.badge];
                return (
                  <div key={friend.id} className="friend-card">
                    <div className="friend-card-top">
                      <div className="avatar-with-badge">
                        {friend.avatar}
                        <span className={`online-dot ${friend.online ? 'online' : 'offline'}`} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>{friend.name}</h4>
                        <span 
                          className="badge-tag-pill"
                          style={{ backgroundColor: bConfig.bgRgba, color: bConfig.color }}
                        >
                          {bConfig.badge} {bConfig.name}
                        </span>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                      Khu vực: <b style={{ color: '#f1f5f9' }}>{friend.district}</b> • SĐT: {friend.phone}
                      <div style={{ color: '#38bdf8', marginTop: '3px' }}>
                        {friend.recentReportStreet ? `Vừa báo: ${friend.recentReportStreet}` : 'Chưa có báo cáo mới'}
                      </div>
                    </div>
                    <div className="friend-card-actions">
                      <button
                        onClick={() => {
                          setSelectedFriendId(friend.id);
                          setActiveTab('chat');
                        }}
                        style={{
                          flex: 1,
                          padding: '8px',
                          backgroundColor: '#0284c7',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#ffffff',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          fontSize: '0.85rem'
                        }}
                      >
                        <MessageSquare size={14} /> Nhắn Tin
                      </button>

                      <button
                        onClick={() => {
                          socialStore.removeFriend(friend.id);
                          showToast(`Đã xóa ${friend.name} khỏi danh bạ.`);
                        }}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          borderRadius: '8px',
                          color: '#f87171',
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontSize: '0.85rem'
                        }}
                        title="Hủy kết bạn"
                      >
                        <UserX size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LEADERBOARD & BADGES */}
      {activeTab === 'badges' && (
        <div>
          {/* 4 Official Badges Showcase */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={22} color="#fbbf24" />
              Cơ Chế Danh Hiệu Tự Động (Badges &amp; Titles)
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
              Danh hiệu và huy hiệu được hệ thống tự động xét duyệt và hiển thị công khai ngay cạnh tên người gửi báo cáo trên bản đồ và bảng tin cộng đồng.
            </p>
          </div>

          <div className="badges-showcase-grid">
            {Object.values(BADGES_CONFIG).map((b) => (
              <div 
                key={b.id} 
                className="badge-card"
                style={{
                  background: `linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, ${b.bgRgba} 100%)`,
                  borderColor: b.color
                }}
              >
                <div className="badge-card-icon">{b.badge}</div>
                <h3>{b.name}</h3>
                <span 
                  className="badge-requirement-pill"
                  style={{ backgroundColor: b.bgRgba, color: b.color, border: `1px solid ${b.color}` }}
                >
                  Điều kiện: {b.requirement}
                </span>
                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
                  {b.description}
                </p>
              </div>
            ))}
          </div>

          {/* Leaderboard Table Card */}
          <div className="leaderboard-table-card">
            <div className="leaderboard-table-header">
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Trophy size={20} color="#fbbf24" />
                  Bảng Vàng Đóng Góp Vì Cộng Đồng TP.HCM
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
                  Xếp hạng theo điểm tích lũy và số lượng báo cáo ngập sâu được kiểm chứng
                </p>
              </div>

              {/* Toggle Criteria */}
              <div style={{ display: 'flex', gap: '6px', backgroundColor: '#090e1c', padding: '4px', borderRadius: '10px' }}>
                <button
                  onClick={() => setLeaderboardCriteria('monthly')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: leaderboardCriteria === 'monthly' ? '#0284c7' : 'transparent',
                    color: leaderboardCriteria === 'monthly' ? '#ffffff' : '#94a3b8',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Điểm Mùa Mưa Này
                </button>
                <button
                  onClick={() => setLeaderboardCriteria('lifetime')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: leaderboardCriteria === 'lifetime' ? '#0284c7' : 'transparent',
                    color: leaderboardCriteria === 'lifetime' ? '#ffffff' : '#94a3b8',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Điểm Trọn Đời (Lifetime)
                </button>
              </div>
            </div>

            {/* Table Rows */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {leaderboard.map((user) => {
                const bConfig = BADGES_CONFIG[user.badge];

                return (
                  <div 
                    key={user.userId} 
                    className={`leaderboard-row ${user.isCurrentUser ? 'current-user' : ''}`}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div className={`rank-badge-number ${
                        user.rank === 1 ? 'rank-gold' : user.rank === 2 ? 'rank-silver' : user.rank === 3 ? 'rank-bronze' : ''
                      }`}>
                        {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : `#${user.rank}`}
                      </div>

                      <div className="avatar-with-badge" style={{ width: '42px', height: '42px', fontSize: '1.3rem' }}>
                        {user.avatar}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: user.isCurrentUser ? '#38bdf8' : '#ffffff', margin: 0 }}>
                            {user.name}
                          </h4>
                          <span 
                            className="badge-tag-pill"
                            style={{ backgroundColor: bConfig.bgRgba, color: bConfig.color }}
                          >
                            {bConfig.badge} {bConfig.name}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                          {user.district} • Đã báo: <b style={{ color: '#fbbf24' }}>{user.deepReportsCount} điểm ngập sâu</b>
                        </span>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fbbf24' }}>
                          {(leaderboardCriteria === 'monthly' ? user.monthlyPoints : user.lifetimePoints).toLocaleString('vi-VN')}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>điểm đóng góp</span>
                      </div>

                      {!user.isCurrentUser && (
                        <button
                          onClick={() => {
                            setSelectedFriendId(user.userId);
                            setActiveTab('chat');
                          }}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: 'rgba(56, 189, 248, 0.15)',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            borderRadius: '8px',
                            color: '#38bdf8',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <MessageSquare size={13} /> Nhắn tin
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
