import 'reflect-metadata';
import { NextFunction, Response, Request } from 'express';
import { BaseController } from '../common/base.controller';
import { IUserController } from './users.controller.interface';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';

import { IUserService } from './users.service.interface';
import { HTTPError } from '../errors/http-error.class';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{ path: '/info', method: 'post', func: this.info },
		]);
	}

	async login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(req.body);
		if (!result) {
			return next(new HTTPError(401, 'ошибка авторизации', 'login'));
		}
		this.ok(res, 'login');
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		// Тут бизнес логика
		const result = await this.userService.createUser(body);

		// Что показать если пользователь уже существует
		if (!result) {
			return next(new HTTPError(422, 'Пользователь уже существует'));
		}

		this.ok(res, result);
	}

	info(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'info');
	}
}
