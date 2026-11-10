/**
 * Bounding Box phạm vi toạ độ khu vực TP.HCM
 * Latitude (Vĩ độ): ~10.35 đến 11.20
 * Longitude (Kinh độ): ~106.35 đến 107.05
 */
export const HCM_GEO_BOUNDS = {
  minLat: 10.35,
  maxLat: 11.20,
  minLng: 106.35,
  maxLng: 107.05
};

/**
 * Kiểm tra toạ độ GPS có nằm trong địa giới TP.HCM hay không
 */
export function isValidHcmCoordinate(lat: number, lng: number): boolean {
  if (typeof lat !== 'number' || typeof lng !== 'number') return false;
  if (isNaN(lat) || isNaN(lng)) return false;

  return (
    lat >= HCM_GEO_BOUNDS.minLat &&
    lat <= HCM_GEO_BOUNDS.maxLat &&
    lng >= HCM_GEO_BOUNDS.minLng &&
    lng <= HCM_GEO_BOUNDS.maxLng
  );
}

/**
 * Cấu hình kiểm tra ảnh báo cáo ngập
 */
export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/jpg'
];

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Kiểm tra tính hợp lệ của file ảnh (định dạng MIME và dung lượng <= 5MB)
 */
export function isValidImageUpload(file: {
  type: string;
  size: number;
  name?: string;
}): FileValidationResult {
  if (!file) {
    return { valid: false, error: 'File ảnh không tồn tại.' };
  }

  if (!file.type || !ALLOWED_IMAGE_MIME_TYPES.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: 'Định dạng file không hỗ trợ. Chỉ chấp nhận JPG, JPEG, PNG, WEBP.'
    };
  }

  if (file.size <= 0) {
    return { valid: false, error: 'File rỗng (dung lượng 0 bytes).' };
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return {
      valid: false,
      error: 'Dung lượng file vượt quá giới hạn tối đa cho phép (5MB).'
    };
  }

  return { valid: true };
}
