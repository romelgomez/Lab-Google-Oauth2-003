import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.guard';

// /api/auth
@Controller('auth')
export class AuthController {
  // /api/auth/google/login
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin(): string {
    return 'Google Auth Login';
  }

  // /api/auth/google/redirect
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleGoogleRedirect(): string {
    return 'Google Auth Redirect';
  }

  @Get('status')
  getStatus(@Req() request) {
    // console.log('request', request.user);

    if (request.user) {
      return {
        status: true,
        user: request.user,
        msg: 'User is logged in',
      };
    } else {
      return {
        status: false,
        msg: 'User is not logged in',
      };
    }
  }
}
