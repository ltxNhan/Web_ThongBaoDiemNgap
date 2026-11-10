import React, { useState } from 'react';

export const CommentThread: React.FC = () => {
  const [comments, setComments] = useState([
    { id: '1', author: 'Lê Hoàng Minh', text: 'Đoạn này đang rút dần rồi nhé bác, xe ga đi sát tim đường vẫn qua được!', time: '10 phút trước' },
    { id: '2', author: 'Phạm Quỳnh Nga', text: 'Cảm ơn bác, em vừa chuyển hướng qua cầu Phú Mỹ cho an toàn.', time: '5 phút trước' }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      { id: Date.now().toString(), author: 'Tôi', text: newComment, time: 'Vừa xong' }
    ]);
    setNewComment('');
  };

  return (
    <div style={{ backgroundColor: '#081024', padding: '10px 12px', borderRadius: '8px', marginTop: '6px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px' }}>
        {comments.map((c) => (
          <div key={c.id} style={{ fontSize: '0.8rem', borderBottom: '1px solid #142142', paddingBottom: '6px' }}>
            <span style={{ fontWeight: 700, color: '#38bdf8' }}>{c.author}: </span>
            <span style={{ color: '#cbd5e1' }}>{c.text} </span>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>({c.time})</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '6px' }}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Viết phản hồi của bạn..."
          style={{
            flex: 1,
            padding: '6px 10px',
            backgroundColor: '#0c1630',
            border: '1px solid #1e2c58',
            borderRadius: '6px',
            color: '#f8fafc',
            fontSize: '0.8rem',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '6px 12px',
            backgroundColor: '#0284c7',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Gửi
        </button>
      </form>
    </div>
  );
};
