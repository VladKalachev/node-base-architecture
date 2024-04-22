import express, { Express } from 'express';

import { Server } from 'http';
import { LoggerService } from './logger/logger.service.js';
import { UserController } from './users/users.controller.js';
import { ExeptionFilter } from './errors/exeption.filter.js';

export class App {
  app: Express
  port: number;
  server: Server;
  logger: LoggerService;
  userController: UserController;
  exeptionFilter: ExeptionFilter;

  constructor(
      logger: LoggerService, 
      userController: UserController,
      exeptionFilter: ExeptionFilter
    ) {
    this.app = express()
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.exeptionFilter = exeptionFilter;
  }

  useRoutes(): void {
    this.app.use('/users', this.userController.router);
	}

  useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

  public async init(): Promise<void>  {
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
  }
}