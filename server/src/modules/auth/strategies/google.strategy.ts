import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AppConfigService } from 'src/modules/config/config.service';
import { ProcessEnvEnum } from 'src/modules/config/config.types';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected appConfigService: AppConfigService,
    protected authService: AuthService,
  ) {
    super({
      clientID: appConfigService.getEnvVal(ProcessEnvEnum.GOOGLE_CLIENT_ID),
      clientSecret: appConfigService.getEnvVal(
        ProcessEnvEnum.GOOGLE_CLIENT_SECRET,
      ),
      callbackURL: appConfigService.getEnvVal(
        ProcessEnvEnum.GOOGLE_CALLBACK_URL,
      ),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const { name, emails } = profile;

    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    const user = await this.authService.validateUser({
      email: emails[0].value,
      displayName: profile.displayName,
      givenName: name.givenName,
      familyName: name.familyName,
    });

    return user;
  }
}
