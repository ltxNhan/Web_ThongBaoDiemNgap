import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../../server/src/app';

describe('Integration Tests: Citizen Report API', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test';
  });

  describe('POST /api/reports - Gửi báo cáo ngập', () => {
    it('trả về 201 Created khi gửi báo cáo ngập đầy đủ thông tin hợp lệ', async () => {
      const fullReportPayload = {
        userId: 'USR-TEST-001',
        latitude: 10.803,
        longitude: 106.716,
        water_level: 45,
        street: 'Ung Văn Khiêm',
        district: 'Bình Thạnh',
        description: 'Đoạn trước Đại học Hutech ngập 45cm, xe máy chết máy nhiều',
        image_url: 'https://pszllqygeusfacwyzibb.supabase.co/storage/v1/object/public/report-images/ung-van-khiem.jpg'
      };

      const response = await request(app)
        .post('/api/reports')
        .send(fullReportPayload)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('id');
      expect(response.body.data).toMatchObject({
        latitude: 10.803,
        longitude: 106.716,
        water_level: 45,
        status: 'pending'
      });
    });

    it('trả về 201 Created khi gửi qua endpoint bí danh /api/citizen-reports', async () => {
      const payload = {
        lat: 10.732,
        lng: 106.738,
        depthEstimate: 30,
        street: 'Huỳnh Tấn Phát',
        district: 'Quận 7',
        description: 'Triều cường dâng cao ngập nửa bánh xe'
      };

      const response = await request(app)
        .post('/api/citizen-reports')
        .send(payload)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.id).toBeDefined();
    });

    it('trả về 400 Bad Request khi thiếu tọa độ (latitude & longitude)', async () => {
      const missingCoordinatesPayload = {
        water_level: 40,
        street: 'Võ Văn Ngân',
        district: 'TP. Thủ Đức',
        description: 'Nước chảy xiết'
      };

      const response = await request(app)
        .post('/api/reports')
        .send(missingCoordinatesPayload)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body.error).toBe('Missing required fields');
      expect(response.body.message).toContain('Tọa độ');
    });

    it('trả về 400 Bad Request khi thiếu mức ngập (water_level)', async () => {
      const missingWaterLevelPayload = {
        latitude: 10.755,
        longitude: 106.671,
        street: 'Trần Hưng Đạo',
        district: 'Quận 5'
      };

      const response = await request(app)
        .post('/api/reports')
        .send(missingWaterLevelPayload)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body.error).toBe('Missing required fields');
      expect(response.body.message).toContain('mức ngập');
    });

    it('trả về 400 Bad Request khi tọa độ không phải định dạng số', async () => {
      const invalidCoordsPayload = {
        latitude: 'mười độ',
        longitude: 'một trăm linh sáu độ',
        water_level: 35
      };

      const response = await request(app)
        .post('/api/reports')
        .send(invalidCoordsPayload)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body.error).toBe('Invalid coordinates');
    });
  });

  describe('GET /api/reports - Lấy danh sách báo cáo', () => {
    it('trả về 200 OK và danh sách các báo cáo ngập gần đây', async () => {
      const response = await request(app).get('/api/reports');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
