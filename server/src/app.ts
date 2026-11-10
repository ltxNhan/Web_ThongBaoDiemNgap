import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import { authMiddleware } from './middleware/authMiddleware';
import { rateLimit } from './middleware/rateLimitMiddleware';

import { FloodHub } from './realtime/FloodHub';
import { AlertNotificationHub } from './realtime/AlertNotificationHub';

import { createApiRouter } from './routes';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(authMiddleware);
app.use(rateLimit(120, 60000));

// Realtime Hubs (Đồng bộ bản đồ điểm ngập và thông báo tức thời)
const floodHub = new FloodHub(io);
const alertHub = new AlertNotificationHub(io);

// Router - MVC Pattern (Tầng điều hướng chuyển tiếp Request tới các Controller tương ứng)
app.use('/api', createApiRouter({ floodHub, alertHub, io }));

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🌊 SMART FLOOD WARNING BACKEND SERVER IS RUNNING`);
    console.log(`🚀 Port: http://localhost:${PORT}`);
    console.log(`📡 WebSocket & Realtime Hubs: Active (Live Map Synchronization)`);
    console.log(`🗺️ Focus: Crowdsourced Citizen Flood Reports -> Shared Map`);
    console.log(`🏛️ Architecture: MVC (Model-View-Controller)`);
    console.log(`=======================================================`);
  });
}

export { app, server };
export default app;
