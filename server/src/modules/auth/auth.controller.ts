import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { SessionService } from '../session/session.service';
import { Public } from './decorators/public.decorator';
import { RtGuard } from './guards/rt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
  ) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleGoogleRedirect(): string {
    return 'Google Auth Redirect';
  }

  @Get('status')
  @HttpCode(HttpStatus.OK)
  getStatus(@GetUser() user: any) {
    if (user) {
      return {
        status: true,
        user,
        msg: 'User is logged in',
      };
    } else {
      return {
        status: false,
        msg: 'User is not logged in',
      };
    }
  }

  @Post('logout')
  async handleLogout(@GetUser('sub') userId: string) {
    await this.authService.logout(userId);
    return { message: 'Logout successful' };
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh-session')
  @HttpCode(HttpStatus.OK)
  async refreshSession(
    @GetUser('sub') userId: string,
    @GetUser('refreshToken') refreshToken: string,
  ) {
    const sessionTokens = await this.sessionService.refreshSession(
      userId,
      refreshToken,
    );

    return sessionTokens;
  }
}
