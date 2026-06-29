import { Module } from '@nestjs/common';
import { DatabaseCheckService } from './utils/database-check-service';

@Module({
  providers: [DatabaseCheckService],
  exports: [DatabaseCheckService],
})
export class SomeModule {}