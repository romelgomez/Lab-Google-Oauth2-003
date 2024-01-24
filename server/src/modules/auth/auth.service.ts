import { Injectable } from '@nestjs/common';
import { UserDto } from '../users/user.dto';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(userDto: UserDto): Promise<UserDto | null> {
    const user = await this.userService.findOneByEmail(userDto.email);

    if (user) {
      return user;
    }

    console.log(`User not found. Creating user ${userDto.email}...`);

    return await this.userService.createUser(userDto);
  }

  async findUserById(id: string): Promise<UserDto> {
    return await this.userService.findOne(id);
  }
}
