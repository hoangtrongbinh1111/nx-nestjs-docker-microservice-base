import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR  } from '@nestjs/core';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { UsersController } from './users.controller';
import { TasksController } from './tasks.controller';

import { AuthGuard } from './services/guards/authorization.guard';
import { PermissionGuard } from './services/guards/permission.guard';

import { ConfigService } from './services/config/config.service';
import { AuthenModule } from '@gsv/authen';

@Module({
  imports: [],
  controllers: [UsersController, TasksController],
  providers: [
    ConfigService,
    {
      provide: 'TOKEN_SERVICE',
      useFactory: (configService: ConfigService) => {
        const tokenServiceOptions = configService.get('tokenService');
        return ClientProxyFactory.create(tokenServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get('userService');
        console.log("userServiceOptions => ", userServiceOptions)
        const client: any = ClientProxyFactory.create({
          options: {
            port: 3336,
            host: "api-user",
          },
          transport: Transport.TCP,
        });
        client.connect()
          .then(() => {
            console.log('Client connected successfully');
          })
          .catch((err) => {
            console.error('Error connecting client:', err);
          });
        console.log(client)
        return client;
      },
      inject: [ConfigService],
    },
    {
      provide: 'TASK_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('taskService'));
      },
      inject: [ConfigService],
    },
    {
      provide: 'PERMISSION_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(
          configService.get('permissionService'),
        );
      },
      inject: [ConfigService],
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthenModule,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: PermissionGuard,
    // },
  ],
})
export class AppModule {}
