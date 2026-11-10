import { describe, it, expect } from 'vitest';
import {
  isValidHcmCoordinate,
  isValidImageUpload,
  MAX_IMAGE_SIZE_BYTES
} from '../../server/src/utils/validation';

describe('Unit Tests: Validation Utilities', () => {
  describe('isValidHcmCoordinate() - Kiểm tra tọa độ GPS trong khu vực TP.HCM', () => {
    it('chấp nhận các tọa độ hợp lệ nằm trong địa phận TP.HCM', () => {
      // Trung tâm Quận 1
      expect(isValidHcmCoordinate(10.7769, 106.7009)).toBe(true);

      // Điểm ngập Ung Văn Khiêm, Bình Thạnh
      expect(isValidHcmCoordinate(10.803, 106.716)).toBe(true);

      // Trạm Phú An
      expect(isValidHcmCoordinate(10.795, 106.711)).toBe(true);

      // Huỳnh Tấn Phát, Quận 7
      expect(isValidHcmCoordinate(10.732, 106.738)).toBe(true);

      // Khu vực Nhà Bè
      expect(isValidHcmCoordinate(10.689, 106.745)).toBe(true);

      // Khu vực Cần Giờ (gần ranh giới phía nam TP.HCM)
      expect(isValidHcmCoordinate(10.42, 106.95)).toBe(true);
    });

    it('từ chối tọa độ nằm ngoài khu vực TP.HCM', () => {
      // Hà Nội
      expect(isValidHcmCoordinate(21.0285, 105.8542)).toBe(false);

      // Đà Nẵng
      expect(isValidHcmCoordinate(16.0544, 108.2022)).toBe(false);

      // Cần Thơ
      expect(isValidHcmCoordinate(10.0452, 105.7469)).toBe(false);

      // Toạ độ quốc tế (Tokyo, New York)
      expect(isValidHcmCoordinate(35.6762, 139.6503)).toBe(false);
      expect(isValidHcmCoordinate(40.7128, -74.006)).toBe(false);
    });

    it('từ chối dữ liệu toạ độ sai kiểu hoặc không hợp lệ (NaN, null, undefined)', () => {
      expect(isValidHcmCoordinate(NaN, 106.7)).toBe(false);
      expect(isValidHcmCoordinate(10.7, NaN)).toBe(false);
      // @ts-expect-error test invalid types
      expect(isValidHcmCoordinate('10.7', 106.7)).toBe(false);
      // @ts-expect-error test invalid types
      expect(isValidHcmCoordinate(null, null)).toBe(false);
    });
  });

  describe('isValidImageUpload() - Kiểm tra định dạng file ảnh và dung lượng', () => {
    it('chấp nhận các file ảnh hợp lệ (JPEG, PNG, WEBP) dung lượng <= 5MB', () => {
      const validJpeg = {
        name: 'hien-truong-ngap.jpg',
        type: 'image/jpeg',
        size: 2 * 1024 * 1024 // 2MB
      };
      const resultJpeg = isValidImageUpload(validJpeg);
      expect(resultJpeg.valid).toBe(true);
      expect(resultJpeg.error).toBeUndefined();

      const validPng = {
        name: 'trieu-cuong-q7.png',
        type: 'image/png',
        size: 4.8 * 1024 * 1024 // 4.8MB
      };
      expect(isValidImageUpload(validPng).valid).toBe(true);

      const validWebp = {
        name: 'duong-ngap.webp',
        type: 'image/webp',
        size: 500 * 1024 // 500KB
      };
      expect(isValidImageUpload(validWebp).valid).toBe(true);
    });

    it('từ chối định dạng file không được hỗ trợ (PDF, EXE, MP4, GIF)', () => {
      const pdfFile = {
        name: 'tai-lieu.pdf',
        type: 'application/pdf',
        size: 1 * 1024 * 1024
      };
      const resPdf = isValidImageUpload(pdfFile);
      expect(resPdf.valid).toBe(false);
      expect(resPdf.error).toContain('Định dạng file không hỗ trợ');

      const gifFile = {
        name: 'animation.gif',
        type: 'image/gif',
        size: 500 * 1024
      };
      expect(isValidImageUpload(gifFile).valid).toBe(false);
    });

    it('từ chối file ảnh có dung lượng vượt quá 5MB', () => {
      const largeFile = {
        name: 'anh-qua-nang.jpg',
        type: 'image/jpeg',
        size: MAX_IMAGE_SIZE_BYTES + 1024 // 5MB + 1KB
      };
      const res = isValidImageUpload(largeFile);
      expect(res.valid).toBe(false);
      expect(res.error).toContain('vượt quá giới hạn tối đa');
    });

    it('từ chối file rỗng (0 bytes) hoặc không truyền file', () => {
      const emptyFile = {
        name: 'empty.png',
        type: 'image/png',
        size: 0
      };
      expect(isValidImageUpload(emptyFile).valid).toBe(false);

      // @ts-expect-error test undefined input
      expect(isValidImageUpload(undefined).valid).toBe(false);
    });
  });
});
