import { Injectable } from '@nestjs/common';
import { LoginDataDto } from '../login-data.dto';
import { TokenDto } from './token.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
	login(data: LoginDataDto): TokenDto {
		// Conseguindo 8 bytes randomicos e transformando-os em hex para ter 16 chars
		// de letras e números
		return { token: randomBytes(8).toString('hex') };
	}
}
