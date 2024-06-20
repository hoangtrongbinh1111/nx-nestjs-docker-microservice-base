// libs/authen/src/authen.interceptor.ts

import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthenService } from './authen.service';
import { AuthenGuard } from './authen.guard';

@Injectable()
export class AuthenInterceptor implements NestInterceptor {
  constructor(private authenService: AuthenService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { username, password } = request.body; // Adjust this based on your authenentication mechanism

    // Use AuthenGuard to perform authenentication check
    // const guard = new AuthenGuard(this.authenService);
    // if (!guard.canActivate(context)) {
    //   // Handle unauthenorized access (e.g., throw an exception or return an error response)
    //   throw new UnauthorizedException('Unauthorized access');
    // }

    // Check if the Authorization header is present
    const authToken = request.headers['authorization'];
    if (!authToken) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    return next.handle();
  }
}
