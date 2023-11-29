import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return (async () => {
      const request = context.switchToHttp().getRequest();
      const email = request?.session?.passport?.user;
      const user = await this.authService.findByEmail(email);
      if (!user) throw new UnauthorizedException();
      request['user'] = user;
      return true;
    })();
  }
}
