import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR  } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { ConfigService } from './services/config/config.service';
import { AuthenInterceptor, AuthenModule } from '@highhammer/authen';

@Module({
  imports: [
    AuthenModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ConfigService,
    {
      provide: 'MAILER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mailerServiceOptions = configService.get('mailerService');
        return ClientProxyFactory.create(mailerServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthenInterceptor,
    },
  ],
})
export class UserModule {}
