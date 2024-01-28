import { Global, Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  providers: [SessionService, JwtService],
  exports: [SessionService],
})
export class SessionModule {}
