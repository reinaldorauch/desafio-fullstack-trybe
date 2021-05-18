import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoModule } from './crypto/crypto.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CryptoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
