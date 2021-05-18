import {
  Controller,
  Get,
  Body,
  Post,
  ValidationPipe,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDataDto } from './login-data.dto';
import { AuthService } from './auth/auth.service';
import { validateSync, ValidationError } from 'class-validator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: () =>
        // Função roda quando o payload é inválido. Funciona pra retornar o objeto
        // correto para a api
        new BadRequestException({ message: 'Campos inválidos' }),
    }),
  )
  login(@Body() data: LoginDataDto) {
    return this.authService.login(data);
  }
}
