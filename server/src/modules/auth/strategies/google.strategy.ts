import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AppConfigService } from 'src/modules/config/config.service';
import { ProcessEnvEnum } from 'src/modules/config/config.types';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    protected appConfigService: AppConfigService,
    protected authService: AuthService,
  ) {
    //
    // Set authorization parameters
    // ref:
    //  - https://developers.google.com/identity/protocols/oauth2/web-server#node.js
    //  - https://developers.google.com/identity/protocols/OAuth2WebServer
    //  - /node_modules/passport-google-oauth20/lib/strategy.js
    //  - https://github.com/nestjs/passport/issues/57
    //
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

  //
  // ref:
  // - https://github.com/nestjs/passport/issues/57#issuecomment-510610374
  //
  authenticate(req, options: any): any {
    super.authenticate(
      req,
      Object.assign(options, {
        session: true,
        accessType: 'offline',
        includeGrantedScopes: true,
      }),
    );
  }

  async validate(accessToken, refreshToken, profile, cb) {
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
