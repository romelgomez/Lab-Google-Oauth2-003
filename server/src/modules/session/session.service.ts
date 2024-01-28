import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SessionTokens } from '../auth/types';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '../config/config.service';
import { ProcessEnvEnum } from '../config/config.types';

@Injectable()
export class SessionService {
  constructor(
    protected appConfigService: AppConfigService,
    protected prisma: PrismaService,
    protected userService: UserService,
    protected jwtService: JwtService,
  ) {}

  private async updateSession(userId: string): Promise<SessionTokens> {
    const jwtPayload = { sub: userId };

    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      secret: this.appConfigService.getEnvVal(
        ProcessEnvEnum.JWT_ACCESS_TOKEN_SECRET,
      ),
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(jwtPayload, {
      secret: this.appConfigService.getEnvVal(
        ProcessEnvEnum.JWT_REFRESH_TOKEN_SECRET,
      ),
      expiresIn: '7d',
    });

    const REFRESH_TOKEN_VALIDITY_DAYS = 7;

    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_VALIDITY_DAYS);

    const session = await this.prisma.session.upsert({
      where: { userId: userId },
      create: {
        userId: userId,
        accessToken,
        refreshToken,
        expiresAt: expiresAt,
      },
      update: {
        accessToken,
        refreshToken,
        updatedAt: new Date(),
        expiresAt: expiresAt,
      },
    });

    return {
      access_token: session.accessToken,
      refresh_token: session.refreshToken,
    };
  }

  async clearSession(userId: string): Promise<void> {
    await this.prisma.session.delete({
      where: { userId: userId },
    });

    this.prisma.user.update({
      where: { id: userId },
      data: {
        accessToken: null,
        refreshToken: null,
      },
    });
  }

  async refreshSession(
    userId: string,
    refreshToken: string,
  ): Promise<SessionTokens> {
    const session = await this.prisma.session.findUnique({
      where: { userId: userId },
    });

    if (
      !session ||
      session.refreshToken !== refreshToken ||
      new Date() > session.expiresAt
    ) {
      throw new Error('Token invalid or expired');
    }

    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new Error('User no found');
    }

    return this.updateSession(userId);
  }
}
