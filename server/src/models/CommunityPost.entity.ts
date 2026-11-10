export interface CommunityPostEntity {
  id: string;
  authorId: string;
  authorName: string;
  district: string;
  tag: 'Cứu hộ' | 'Hỏi đường' | 'Xe chết máy' | 'Cảnh báo';
  content: string;
  mediaUrls: string[];
  upvotesCount: number;
  commentsCount: number;
  isPinned: boolean;
  createdAt: Date;
}
