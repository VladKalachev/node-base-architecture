import 'reflect-metadata';
import { NextFunction, Response, Request } from 'express';
import { BaseController } from '../common/base.controller';
import { IUserController } from './users.controller.interface';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/info', method: 'post', func: this.info },
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
