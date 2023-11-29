import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from 'src/shared/auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private authService: AuthService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user.get('email'));
  }

  async deserializeUser(
    payload: any,
    done: (err: Error, payload: any) => void,
  ) {
    done(null, await this.authService.findByEmail(payload));
  }
}
