import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoModule } from './crypto/crypto.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
	imports: [
		CryptoModule,
		AuthModule,
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			database: 'coiner',
			password: 'coiner_db',
			username: 'coiner_user',
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
