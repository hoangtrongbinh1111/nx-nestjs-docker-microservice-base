import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthenService } from './authen.service';

@Injectable()
export class AuthenGuard implements CanActivate {
  constructor(private authService: AuthenService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { username, password } = request.body;
    return this.authService.validateUser(username, password);
  }
}
