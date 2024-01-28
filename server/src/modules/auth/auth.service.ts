import { Injectable } from '@nestjs/common';
import { UserDto } from '../users/user.dto';
import { UserService } from '../users/user.service';
import { SessionService } from '../session/session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
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

  async logout(userId: string): Promise<void> {
    await this.sessionService.clearSession(userId);
  }
}
