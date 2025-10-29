import { Module, Global, Inject, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as path from 'path';
import { LoggerModule } from '../logger/logger.module';
import { TypeOrmCustomLogger } from '@app/common';

@Global()
@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, LoggerModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService,
        customLogger: TypeOrmCustomLogger,
      ) => {
        const isDevelopment = process.env.BUILD_TYPE !== 'production';

        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [
            isDevelopment
              ? path.resolve(
                  __dirname,
                  '../../../../apps/athlete/src/models/**/*.entity{.ts,.js}',
                )
              : path.resolve(
                  __dirname,
                  '../../../../../../../dist/apps/athlete/src/models/**/*.entity.js',
                ),
            isDevelopment
              ? path.resolve(
                  __dirname,
                  '../../../../apps/investor/src/models/**/*.entity{.ts,.js}',
                )
              : path.resolve(
                  __dirname,
                  '../../../../../../../dist/apps/investor/src/models/**/*.entity.js',
                ),
            isDevelopment
              ? path.resolve(
                  __dirname,
                  '../../../../apps/auth/src/models/**/*.entity{.ts,.js}',
                )
              : path.resolve(
                  __dirname,
                  '../../../../../../../dist/apps/auth/src/models/**/*.entity.js',
                ),
            isDevelopment
              ? path.resolve(
                  __dirname,
                  '../../../../apps/admin/src/models/**/*.entity{.ts,.js}',
                )
              : path.resolve(
                  __dirname,
                  '../../../../../../../dist/apps/admin/src/models/**/*.entity.js',
                ),
            isDevelopment
              ? path.resolve(
                  __dirname,
                  '../../../../apps/fan/src/models/**/*.entity{.ts,.js}',
                )
              : path.resolve(
                  __dirname,
                  '../../../../../../../dist/apps/fan/src/models/**/*.entity.js',
                ),
          ],
          connectTimeout: 100000,
          synchronize: false,
          logger: customLogger,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule implements OnModuleInit {
  constructor(
    @Inject('LoggerService') private readonly logger, // Correctly inject LoggerService
    private readonly dataSource: DataSource,
  ) {}

  async onModuleInit() {
    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
        this.logger.log('Database connected successfully');
      } else {
        this.logger.warn('Database connection already initialized');
      }
    } catch (error) {
      this.logger.error('Failed to connect to the database', error);
    }
  }
}
