import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseCheckService } from './utils/database-check-service';

@Controller('api/health')
export class AppController {
  constructor(private readonly dbCheckService: DatabaseCheckService) {}

  @Get('check-database')
  async checkDatabaseHealth(): Promise<string> {
    return await this.dbCheckService.checkConnection();
  }
}
