import { Module } from '@nestjs/common';
import { FanController } from './fan.controller';
import { FanService } from './fan.service';
import { MulterModule } from '@nestjs/platform-express';
import { FileUtilsModule } from '@app/common/file_utility';
import { FileUtilsService } from '@app/common/file_utility/file-utils.service';
import { diskStorage } from 'multer';
import { join } from 'path';
import * as path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ATHLETE_SERVICE,
  AUTH_SERVICE,
  DatabaseModule,
  LoggerModule,
} from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FanMessageHandler } from './fan.message_handler';
import { FanRepository } from './fan.repository';
import { Fans } from './models/fan.entity';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [FileUtilsModule],
      inject: [FileUtilsService],
      useFactory: (fileUtilsService: FileUtilsService) => ({
        storage: diskStorage({
          destination: (req, file, callback) => {
            try {
              const directory = fileUtilsService.getDestination(file);
              callback(null, directory);
            } catch (error) {
              callback(error, null);
            }
          },
          filename: (req, file, callback) => {
            const uniqueSuffix = fileUtilsService.getFilename();
            const ext = path.extname(file.originalname);
            callback(null, `${uniqueSuffix}${ext}`);
          },
        }),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [join(__dirname, '..', '..', '..', '..', '.env')],
    }),
    LoggerModule,
    FileUtilsModule,
    TypeOrmModule.forFeature([Fans]),
    DatabaseModule,
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('TCP_HOST'),
            port: configService.get('AUTH_TCP_PORT'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: ATHLETE_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('TCP_HOST'),
            port: configService.get('ATHLETE_TCP_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [FanController, FanMessageHandler],
  providers: [FanService, FanRepository],
})
export class FanModule {}
