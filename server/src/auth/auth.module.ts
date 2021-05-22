import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { BearerStrategy } from './bearer.strategy';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './session.entity';

@Module({
	providers: [AuthService, LocalStrategy, BearerStrategy],
	exports: [AuthService],
	imports: [PassportModule, TypeOrmModule.forFeature([Session])],
})
export class AuthModule {}
