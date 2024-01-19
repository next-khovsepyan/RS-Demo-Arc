import express, { Application } from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import { Server as SocketIO } from 'socket.io';

import { PORT, corsConfig } from './config';
import db from './db';
import { setupRabbitMQ } from './rabbit/rabbitmqSetup';
import logger from './utils/logger';
import routes from './routes';
import { socketValidateRequest } from './middlewares/socket.middleware';
import { ProcessSocketRoute } from './routes/socket/process';

class Server {
  private app: Application;
  private server!: http.Server;
  private io!: SocketIO;

  constructor() {
    this.app = express();
    this.configureApp();
    this.setupRoutes();
    this.setupSocketIO();
    this.startServer();
  }

  private configureApp(): void {
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(express.urlencoded({ limit: '10mb' }));
    this.app.use(express.json()); 
  }

  private setupRoutes(): void {
    this.app.use('/', routes);
  }

  private setupSocketIO(): void {
    this.server = http.createServer(this.app);
    this.io = new SocketIO(this.server, { cors: corsConfig });
    this.io.use((socket, next) => socketValidateRequest(socket, next));
    this.io.of('/').on('connection', ProcessSocketRoute);
  }

  private startServer(): void {
    db.connect();
    setupRabbitMQ();
    this.server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  }
}

new Server();
