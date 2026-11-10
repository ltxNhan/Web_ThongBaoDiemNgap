import { User } from '../types';

let currentUser: User | null = null;
const listeners = new Set<() => void>();

export const authStore = {
  getUser: () => currentUser,
  setUser: (user: User | null) => {
    currentUser = user;
    if (user?.token) {
      localStorage.setItem('token', user.token);
    } else {
      localStorage.removeItem('token');
    }
    listeners.forEach((l) => l());
  },
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
};
