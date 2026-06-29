import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserCommon } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCommon])], // повторно включаем нашу сущность
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}