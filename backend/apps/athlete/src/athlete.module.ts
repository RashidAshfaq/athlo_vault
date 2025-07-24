import { Module } from '@nestjs/common';
import { AthleteController } from './athlete.controller';
import { AthleteService } from './athlete.service';
import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@app/common';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AthleteMessageHandler } from './athlete.message_handler';
import { AthleteRepository } from './athlete.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Athlete } from './models/athlete.entity';
import * as path from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { FileUtilsService } from '@app/common/file_utility/file-utils.service';
import { FileUtilsModule } from '@app/common/file_utility';
import { diskStorage } from 'multer';
import { Coach } from './models/coach.entity';
import { FundingGoal } from './models/athlete_funding.entity';
import { AthleteFollowers } from './models/athlete_followers.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CoachRepository } from './athlete_coach.repository';
import { AthleteFollowersRepository } from './athlete_followers.repository';
import { FundingGoalRepository } from './funding_goal.repository';
import { CareerGoalsModule } from './career_goals/career_goals.module';

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
    TypeOrmModule.forFeature([Athlete, Coach, FundingGoal, AthleteFollowers]),
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
    ]),
    CareerGoalsModule,
  ],
  controllers: [AthleteController, AthleteMessageHandler],
  providers: [AthleteService, AthleteRepository, CoachRepository, AthleteFollowersRepository, FundingGoalRepository],
  exports: [AthleteRepository],
})
export class AthleteModule {}
