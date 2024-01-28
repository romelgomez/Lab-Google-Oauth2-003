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

  async validate(accessToken: string, refreshToken: string, profile) {
    const { name, emails } = profile;

    console.log('profile: ', JSON.stringify(profile));

    const user = await this.authService.validateUser({
      email: emails[0].value,
      displayName: profile.displayName,
      givenName: name.givenName,
      familyName: name.familyName,
      accessToken,
      refreshToken,
    });

    return user;
  }
}

// {
//   "id":"107573585242030639875",
//   "displayName":"Romel Gomez",
//   "name":{
//      "familyName":"Gomez",
//      "givenName":"Romel"
//   },
//   "emails":[
//      {
//         "value":"bmxandcode@gmail.com",
//         "verified":true
//      }
//   ],
//   "photos":[
//      {
//         "value":"https://lh3.googleusercontent.com/a/ACg8ocJ1vXd7N7AVLaUEeAOEGppB5k-nMYCaVEf_GDHlqaC_Rtg=s96-c"
//      }
//   ],
//   "provider":"google",
//   "_raw":"{\n  \"sub\": \"107573585242030639875\",\n  \"name\": \"Romel Gomez\",\n  \"given_name\": \"Romel\",\n  \"family_name\": \"Gomez\",\n  \"picture\": \"https://lh3.googleusercontent.com/a/ACg8ocJ1vXd7N7AVLaUEeAOEGppB5k-nMYCaVEf_GDHlqaC_Rtg\\u003ds96-c\",\n  \"email\": \"bmxandcode@gmail.com\",\n  \"email_verified\": true,\n  \"locale\": \"es-419\"\n}",
//   "_json":{
//      "sub":"107573585242030639875",
//      "name":"Romel Gomez",
//      "given_name":"Romel",
//      "family_name":"Gomez",
//      "picture":"https://lh3.googleusercontent.com/a/ACg8ocJ1vXd7N7AVLaUEeAOEGppB5k-nMYCaVEf_GDHlqaC_Rtg=s96-c",
//      "email":"bmxandcode@gmail.com",
//      "email_verified":true,
//      "locale":"es-419"
//   }
// }
