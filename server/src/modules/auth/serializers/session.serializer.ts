import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/modules/users/user.dto';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(
    user: UserDto,
    done: (err: Error, user: UserDto) => void,
  ): void {
    console.log('serializeUser', user);

    done(null, user);
  }

  async deserializeUser(
    user: UserDto,
    done: (err: Error, payload: any) => void,
  ): Promise<void> {
    const payload = await this.authService.findUserById(user.id);

    console.log('deserializeUser', payload);

    return payload ? done(null, payload) : done(null, null);
  }
}
