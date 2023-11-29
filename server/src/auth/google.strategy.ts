// eslint-disable-next-line @typescript-eslint/no-var-requires
const Strategy = require('passport-google-oidc');
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../shared/auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: '/api/v1/auth/login/google/success',
      scope: ['email', 'profile'],
    });
  }

  async validate(_issuer, data, done): Promise<any> {
    try {
      const email = data?.emails[0]?.value;
      const fullName =
        data?.displayName || `${data?.name?.givenName} ${data?.name?.name}`;

      let user = await this.authService.findByEmail(email).catch((err) => {
        throw err;
      });

      if (!user) {
        user = await this.authService.createUser({ email, fullName });
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
}
