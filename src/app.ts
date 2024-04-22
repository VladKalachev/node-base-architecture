import express, { Express } from 'express';

import { Server } from 'http';
import { LoggerService } from './logger/logger.service.js';
import { UserController } from './users/users.controller.js';

export class App {
  app: Express
  port: number;
  server: Server;
  logger: LoggerService;
  userController: UserController;

  constructor(
      logger: LoggerService, 
      userController: UserController
    ) {
    this.app = express()
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
  }

  useRoutes(): void {
    this.app.use('/users', this.userController.router);
	}

  public async init(): Promise<void>  {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
  }
}