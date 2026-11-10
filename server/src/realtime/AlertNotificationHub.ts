import { Server } from 'socket.io';

export class AlertNotificationHub {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  /**
   * Broadcast critical emergency warning alert popups to all connected citizen browsers
   */
  public broadcastEmergencyAlert(alertPayload: {
    level: 1 | 2 | 3;
    title: string;
    content: string;
    affectedDistricts: string[];
    validUntil: string;
  }): void {
    console.log(`[AlertNotificationHub] Emitting emergency broadcast alert level ${alertPayload.level}`);
    this.io.emit('emergency_popup_alert', alertPayload);
  }

  /**
   * Broadcast dispatch notification directly to emergency rescue units
   */
  public notifyRescueTeam(unitId: string, rescueRequest: any): void {
    this.io.to(`rescue_unit:${unitId}`).emit('rescue_dispatched', rescueRequest);
  }
}
