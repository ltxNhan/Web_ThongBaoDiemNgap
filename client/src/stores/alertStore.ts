import { FloodAlert } from '../types';

let activeAlerts: FloodAlert[] = [];
const alertListeners = new Set<() => void>();

export const alertStore = {
  getAlerts: () => activeAlerts,
  setAlerts: (alerts: FloodAlert[]) => {
    activeAlerts = alerts;
    alertListeners.forEach((l) => l());
  },
  addAlert: (alert: FloodAlert) => {
    activeAlerts = [alert, ...activeAlerts];
    alertListeners.forEach((l) => l());
  },
  subscribe: (listener: () => void) => {
    alertListeners.add(listener);
    return () => alertListeners.delete(listener);
  }
};
