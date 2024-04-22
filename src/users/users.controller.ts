import { NextFunction, Response, Request } from "express";
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { IUserController } from "./users.controller.interface";

export class UserController extends BaseController implements IUserController {
  constructor(logger: LoggerService) {
    super(logger)
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register }, 
      { path: '/login', method: 'post', func: this.login },
      { path: '/info', method: 'post', func: this.info }
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'login');
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'register');
  }

  info(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'info');
  }
}