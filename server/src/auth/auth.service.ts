import { Injectable } from '@nestjs/common';
import { LoginDataDto } from '../login-data.dto';
import { TokenDto } from './token.dto';
import { randomBytes } from 'crypto';
import { Session } from './session.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
	constructor(@InjectRepository(Session) private repo: Repository<Session>) {}

	async login(data: LoginDataDto): Promise<TokenDto> {
		const tokenData = { ...data, token: randomBytes(8).toString('hex') };
		// Conseguindo 8 bytes randomicos e transformando-os em hex para ter 16 chars
		// de letras e números
		await this.repo.save(tokenData);

		const { token } = tokenData;

		return { token };
	}

	async validateSession(token: string) {
		return await this.repo.find({ token });
	}
}
