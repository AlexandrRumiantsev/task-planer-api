import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/common/users/users.module';
import { AuthModule } from './modules/common/auth/auth.module';
import { SomeModule } from './some-module';
import { SwaggerController } from './swagger.controller';
import { JwtGuard } from './utils/jwt-guard';
import { DatabaseModule } from './modules/common/data-base/database.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    SomeModule,
    TaskModule,
  ],
  controllers: [AppController, SwaggerController],
  providers: [AppService, JwtGuard],
})
export class AppModule {}