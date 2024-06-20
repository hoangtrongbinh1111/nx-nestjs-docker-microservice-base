// libs/auth/src/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthenInterceptor } from './authen.interceptor';
import { AuthenService } from './authen.service';

@Module({
  providers: [AuthenService, AuthenInterceptor],
  exports: [AuthenService, AuthenInterceptor], // Export AuthenInterceptor to be used in other modules
})
export class AuthenModule {}
