import { Strategy } from 'passport-local';
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
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const dto = LoginDataDto.create(email, password);

    if (validateSync(dto).length) {
      throw new BadRequestException({ message: 'Campos inválidos' });
    }

    const user = await this.authService.login(dto);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
