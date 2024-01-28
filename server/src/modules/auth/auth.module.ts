import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthService } from './auth.service';
import { SessionSerializer } from './serializers/session.serializer';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, SessionSerializer, JwtService],
})
export class AuthModule {}
