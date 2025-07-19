import { Logger as TypeOrmLogger } from 'typeorm';
import { LoggerService } from '@nestjs/common';

export class TypeOrmCustomLogger implements TypeOrmLogger {
  constructor(private readonly logger: LoggerService) {}

  logQuery(query: string, parameters?: any[]) {
    this.logger.log(
      `Query: ${query} - Parameters: ${JSON.stringify(parameters)}`,
      'TypeORM',
    );
  }

  logQueryError(error: string, query: string, parameters?: any[]) {
    this.logger.error(
      `Query Failed: ${query} - Parameters: ${JSON.stringify(parameters)} - Error: ${error}`,
      'TypeORM',
    );
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    this.logger.warn(
      `Slow Query (${time}ms): ${query} - Parameters: ${JSON.stringify(parameters)}`,
      'TypeORM',
    );
  }

  logSchemaBuild(message: string) {
    this.logger.log(`Schema Build: ${message}`, 'TypeORM');
  }

  logMigration(message: string) {
    this.logger.log(`Migration: ${message}`, 'TypeORM');
  }

  log(level: 'log' | 'info' | 'warn', message: any) {
    if (level === 'log' || level === 'info') {
      this.logger.log(`Info: ${message}`, 'TypeORM');
    } else if (level === 'warn') {
      this.logger.warn(`Warning: ${message}`, 'TypeORM');
    }
  }
}
