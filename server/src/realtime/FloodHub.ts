import { Server, Socket } from 'socket.io';

export class FloodHub {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.setupListeners();
  }

  private setupListeners(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log(`[FloodHub] Client connected: ${socket.id}`);

      socket.on('subscribe_district', (district: string) => {
        socket.join(`district:${district}`);
        console.log(`[FloodHub] Socket ${socket.id} joined district room: ${district}`);
      });

      socket.on('disconnect', () => {
        console.log(`[FloodHub] Client disconnected: ${socket.id}`);
      });
    });
  }

  /**
   * Phát sóng điểm ngập mới được duyệt từ người dân xuống bản đồ chung
   */
  public broadcastNewFloodPoint(floodPoint: any): void {
    this.io.emit('flood_point_updated', floodPoint);
    this.io.emit('new_flood_point', floodPoint);
    if (floodPoint.district) {
      this.io.to(`district:${floodPoint.district}`).emit('district_flood_alert', floodPoint);
    }
  }

  /**
   * Phát sóng tin báo ngập vừa nhận từ người dân đến ban kiểm duyệt
   */
  public broadcastNewCitizenReport(report: any): void {
    this.io.emit('new_citizen_report', report);
  }
}
