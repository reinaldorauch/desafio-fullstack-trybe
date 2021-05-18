import {
  Get,
  Body,
  Post,
  Request,
  UseGuards,
  UsePipes,
  Controller,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req) {
    return req.user;
  }
}
