import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async findOne(id: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findOneByEmail(email: string): Promise<UserDto | null> {
    const user = this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async remove(id: string): Promise<UserDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (existingUser) {
      const isDeleted = existingUser.deleted != null;

      return await this.prisma.user.update({
        where: { id },
        data: {
          deleted: isDeleted ? null : new Date(), // Toggle deletion status
        },
      });
    } else {
      throw new Error('User not found');
    }
  }

  async createOrUpdate(userDto: UserDto): Promise<UserDto> {
    return this.prisma.user.upsert({
      where: { email: userDto.email },
      update: userDto,
      create: userDto,
    });
  }

  async createNewUserOrFail(userDto: UserDto): Promise<UserDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: userDto.email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    return this.prisma.user.create({ data: userDto });
  }

  async createUser(userDto: UserDto): Promise<UserDto> {
    return this.prisma.user.create({ data: userDto });
  }

  async updateUser(userId: string, userDto: UserDto): Promise<UserDto> {
    return this.prisma.user.update({
      where: { id: userId },
      data: userDto,
    });
  }

  async findOrFail(id: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
