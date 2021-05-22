import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ValidationError } from 'class-validator';
import { LoginDataDto } from './login-data.dto';
import { NotFoundExceptionFilter } from './not-found-exception.filter';
import * as fs from 'fs';
const { access, copyFile } = fs.promises;

async function bootstrap() {
  // Jeito simples de inicializar o currencies.json
  await initCurrencies();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();

async function initCurrencies() {
  const { W_OK, R_OK, F_OK } = fs.constants;
  const RW_ACCESS = W_OK | R_OK | F_OK;
  const fn = process.cwd() + '/currencies.json';
  try {
    await access(fn, RW_ACCESS);
  } catch (err) {
    await copyFile(fn + '.init', fn);
  }
}
