import React, { useState } from 'react';

interface ImageUploaderProps {
  onImageSelected: (base64OrUrl: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onImageSelected(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>
        Hình Ảnh / Video Hiện Trường (Minh chứng xác thực)
      </label>

      <div
        style={{
          border: '2px dashed #233876',
          borderRadius: '12px',
          padding: '1.25rem',
          textAlign: 'center',
          backgroundColor: '#0c1630',
          cursor: 'pointer',
          position: 'relative'
        }}
      >
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            cursor: 'pointer'
          }}
        />

        {preview ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <img src={preview} alt="Preview" style={{ maxHeight: '160px', borderRadius: '8px', objectFit: 'cover' }} />
            <span style={{ fontSize: '0.75rem', color: '#38bdf8' }}>Nhấn để chọn hoặc chụp ảnh khác</span>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '6px' }}>📸</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f1f5f9' }}>
              Chạm để chụp ảnh hoặc tải từ thư viện máy
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
              Hỗ trợ JPG, PNG, WEBP tối đa 10MB
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
