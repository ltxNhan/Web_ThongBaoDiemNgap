import React, { useState } from 'react';
import { CommunityPost } from '../../../types';
import { formatTimeAgo } from '../../../utils/formatDate';
import { CommentThread } from './CommentThread';

interface PostItemProps {
  post: CommunityPost;
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [hasVoted, setHasVoted] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleUpvote = () => {
    if (hasVoted) {
      setUpvotes(upvotes - 1);
      setHasVoted(false);
    } else {
      setUpvotes(upvotes + 1);
      setHasVoted(true);
    }
  };

  const tagColors = {
    'Cứu hộ': { bg: 'rgba(239, 68, 68, 0.2)', text: '#f87171' },
    'Hỏi đường': { bg: 'rgba(56, 189, 248, 0.2)', text: '#38bdf8' },
    'Xe chết máy': { bg: 'rgba(245, 158, 11, 0.2)', text: '#fbbf24' },
    'Cảnh báo': { bg: 'rgba(168, 85, 247, 0.2)', text: '#c084fc' }
  };

  const tagStyle = tagColors[post.tag] || tagColors['Hỏi đường'];

  return (
    <div
      style={{
        backgroundColor: '#0c1630',
        border: '1px solid #1a2a54',
        borderRadius: '12px',
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#38bdf8', fontSize: '0.85rem' }}>
            {post.authorName.charAt(0)}
          </div>
          <div>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f8fafc' }}>{post.authorName}</span>
            <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>{post.district} • {formatTimeAgo(post.createdAt)}</span>
          </div>
        </div>

        <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, backgroundColor: tagStyle.bg, color: tagStyle.text }}>
          #{post.tag}
        </span>
      </div>

      <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
        {post.content}
      </p>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #142142', paddingTop: '8px' }}>
        <button
          onClick={handleUpvote}
          style={{
            background: hasVoted ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
            border: hasVoted ? '1px solid #38bdf8' : '1px solid #233766',
            borderRadius: '6px',
            color: hasVoted ? '#38bdf8' : '#94a3b8',
            padding: '4px 10px',
            fontSize: '0.8rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          👍 {upvotes} Hữu ích
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          💬 {post.commentsCount || 2} Bình luận
        </button>
      </div>

      {showComments && <CommentThread />}
    </div>
  );
};
