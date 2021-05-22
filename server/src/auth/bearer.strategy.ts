import { Strategy } from 'passport-http-header-strategy';
import { PassportStrategy } from '@nestjs/passport';
import {
	Injectable,
	UnauthorizedException,
	BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDataDto } from '../login-data.dto';
import { validateSync } from 'class-validator';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super();
	}

	async validate(token: string): Promise<any> {
		const user = this.authService.validateSession(token);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
