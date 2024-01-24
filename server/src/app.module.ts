import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './modules/config/config.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    UserModule,
    PrismaModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
