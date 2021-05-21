import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ValidationError } from 'class-validator';
import { LoginDataDto } from './login-data.dto';
import { NotFoundExceptionFilter } from './not-found-exception.filter';
import fs from 'fs';

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
	fs.access();
}
