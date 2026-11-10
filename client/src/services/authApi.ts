import { request } from './apiClient';
import { User } from '../types';

export const authApi = {
  login: async (phone: string, code: string): Promise<{ token: string; user: User }> => {
    try {
      return await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ phone, code })
      });
    } catch {
      const mockUser: User = {
        id: 'USR-888',
        phone,
        fullName: 'Nguyễn Văn Công Dân',
        district: 'Quận 7',
        subscribedAlerts: true,
        token: 'mock-jwt-token-12345'
      };
      return { token: mockUser.token!, user: mockUser };
    }
  },

  register: async (fullName: string, phone: string, district: string): Promise<{ success: boolean; user: User }> => {
    try {
      return await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ fullName, phone, district })
      });
    } catch {
      return {
        success: true,
        user: {
          id: 'USR-889',
          fullName,
          phone,
          district,
          subscribedAlerts: true
        }
      };
    }
  }
};
