import { Injectable } from '@nestjs/common';
import { UserDto } from '../users/user.dto';
import { UserService } from '../users/user.service';
import { SessionTokens } from './types';
// import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '../config/config.service';
import { ProcessEnvEnum } from '../config/config.types';
import { PrismaService } from '../prisma/prisma.service';
import { SessionService } from '../session/session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    // private jwtService: JwtService,
    private appConfigService: AppConfigService,
    private prisma: PrismaService,
    private sessionService: SessionService,
  ) {}

  async validateUser(userDto: UserDto): Promise<UserDto | null> {
    const user = await this.userService.findOneByEmail(userDto.email);

    if (user) {
      return await this.userService.updateUser(user.id, userDto);
    }

    return await this.userService.createUser(userDto);
  }

  async findUserById(id: string): Promise<UserDto> {
    return await this.userService.findOne(id);
  }

  // async refreshToken(
  //   userId: string,
  //   refreshToken: string,
  // ): Promise<SessionTokens> {
  //   const session = await this.prisma.session.findUnique({
  //     where: { userId: userId },
  //   });

  //   if (
  //     !session ||
  //     session.refreshToken !== refreshToken ||
  //     new Date() > session.expiresAt
  //   ) {
  //     throw new Error('Token inválido o expirado');
  //   }

  //   const user = await this.userService.findOne(userId);

  //   if (!user) {
  //     throw new Error('Usuario no encontrado');
  //   }

  //   return this.createSessionTokens(userId, user.email);
  // }

  async logout(userId: string): Promise<void> {
    await this.sessionService.clearSession(userId);
  }

  // async createSessionTokens(
  //   userId: string,
  //   email: string,
  // ): Promise<SessionTokens> {
  //   const jwtPayload = { sub: userId, email };

  //   // Crear tokens
  //   const sessionAccessToken = await this.jwtService.signAsync(jwtPayload, {
  //     secret: this.appConfigService.getEnvVal(
  //       ProcessEnvEnum.JWT_ACCESS_TOKEN_SECRET,
  //     ),
  //     expiresIn: '15m', // Token de acceso de la sesión, corta duración
  //   });

  //   const sessionRefreshToken = await this.jwtService.signAsync(jwtPayload, {
  //     secret: this.appConfigService.getEnvVal(
  //       ProcessEnvEnum.JWT_REFRESH_TOKEN_SECRET,
  //     ),
  //     expiresIn: '7d', // Token de actualización de la sesión, larga duración
  //   });

  //   const refreshTokenValidityDays = 7;

  //   const expiresAt = new Date();

  //   expiresAt.setDate(expiresAt.getDate() + refreshTokenValidityDays);

  //   // Crear o actualizar la sesión en la base de datos
  //   const session = await this.prisma.session.upsert({
  //     where: { userId: userId },
  //     create: {
  //       userId: userId,
  //       accessToken: sessionAccessToken,
  //       refreshToken: sessionRefreshToken,
  //       expiresAt: expiresAt,
  //     },
  //     update: {
  //       accessToken: sessionAccessToken,
  //       refreshToken: sessionRefreshToken,
  //       updatedAt: new Date(),
  //       expiresAt: expiresAt,
  //     },
  //   });

  //   return {
  //     access_token: session.accessToken,
  //     refresh_token: session.refreshToken,
  //   };
  // }

  // async validateUser(userDto: UserDto): Promise<UserDto | null> {
  //   const user = await this.userService.findOneByEmail(userDto.email);

  //   if (user) {
  //     console.log(`User found. UPDATING user ${userDto.email}...`);
  //     await this.updateOAuthTokens(user.id, /* tokens y otros datos */);
  //     return await this.userService.updateUser(user.id, userDto);
  //   } else {
  //     console.log(`User not found. CREATING user ${userDto.email}...`);
  //     const newUser = await this.userService.createUser(userDto);
  //     await this.createOAuthTokens(newUser.id, /* tokens y otros datos */);
  //     return newUser;
  //   }
  // }

  // private async updateOAuthTokens(userId: string, /* tokens y otros datos */) {
  //   // Lógica para actualizar los tokens en la base de datos
  // }

  // private async createOAuthTokens(userId: string, /* tokens y otros datos */) {
  //   // Lógica para crear los tokens en la base de datos
  // }
}
