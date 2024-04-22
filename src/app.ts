import express, { Express } from 'express';
import { userRouter } from './users/users.js';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service.js';

export class App {
  app: Express
  port: number;
  server: Server;
  logger: LoggerService;

  constructor(logger: LoggerService) {
    this.app = express()
    this.port = 8000;
    this.logger = logger;
  }

  useRoutes(): void {
    this.app.use('/users', userRouter);
	}

  public async init(): Promise<void>  {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
  }
}