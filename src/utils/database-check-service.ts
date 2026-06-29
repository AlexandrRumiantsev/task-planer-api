import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseCheckService {
  constructor(private readonly dataSource: DataSource) {}

  async checkConnection(): Promise<string> {
    try {
      await this.dataSource.query('SELECT 1');
      return 'Connected successfully!';
    } catch (error) {
      return `Failed to connect: ${error.message}`;
    }
  }
}