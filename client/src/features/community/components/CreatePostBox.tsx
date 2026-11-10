import React, { useState } from 'react';
import { CommunityPost } from '../../../types';
import { Button } from '../../../components/ui/Button';

interface CreatePostBoxProps {
  onPostCreated: (post: Partial<CommunityPost>) => void;
}

export const CreatePostBox: React.FC<CreatePostBoxProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [district, setDistrict] = useState('Bình Thạnh');
  const [tag, setTag] = useState<'Cứu hộ' | 'Hỏi đường' | 'Xe chết máy' | 'Cảnh báo'>('Hỏi đường');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onPostCreated({
      authorName: 'Cư Dân Đô Thị',
      district,
      tag,
      content,
      upvotes: 1,
      commentsCount: 0,
      createdAt: new Date().toISOString()
    });

    setContent('');
  };

  return (
    <div className="glass" style={{ borderRadius: '16px', padding: '1.25rem' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>
        ✍️ Tạo Bài Viết Trao Đổi / Hỏi Đường / Hỗ Trợ
      </h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
              Địa bàn:
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                backgroundColor: '#0c1630',
                border: '1px solid #1e2c58',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '0.85rem'
              }}
            >
              <option value="Bình Thạnh">Bình Thạnh</option>
              <option value="Quận 7">Quận 7</option>
              <option value="TP. Thủ Đức">TP. Thủ Đức</option>
              <option value="Nhà Bè">Nhà Bè</option>
              <option value="Quận 4">Quận 4</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
              Tag chủ đề:
            </label>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value as any)}
              style={{
                width: '100%',
                padding: '8px 12px',
                backgroundColor: '#0c1630',
                border: '1px solid #1e2c58',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '0.85rem'
              }}
            >
              <option value="Hỏi đường">#Hỏi đường</option>
              <option value="Xe chết máy">#Xe chết máy</option>
              <option value="Cứu hộ">#Cứu hộ</option>
              <option value="Cảnh báo">#Cảnh báo</option>
            </select>
          </div>
        </div>

        <textarea
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Chia sẻ tình hình ngập, hỏi đường đi khô ráo hoặc tìm người giúp đỡ..."
          style={{
            width: '100%',
            padding: '10px 14px',
            backgroundColor: '#0c1630',
            border: '1px solid #1e2c58',
            borderRadius: '8px',
            color: '#f8fafc',
            fontSize: '0.9rem',
            outline: 'none',
            fontFamily: 'inherit'
          }}
          required
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" variant="primary" size="md">
            Đăng Lên Diễn Đàn
          </Button>
        </div>
      </form>
    </div>
  );
};
