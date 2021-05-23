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
import { AuthService } from './auth/auth.service';
import { validateSync, ValidationError } from 'class-validator';
import { CryptoService } from './crypto/crypto.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly cryptoService: CryptoService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req) {
    return req.user;
  }

  @Get('currencies')
  @UseGuards(AuthGuard('header'))
  async getCurrencies() {
    return this.cryptoService.exchangeTable;
  }
}
