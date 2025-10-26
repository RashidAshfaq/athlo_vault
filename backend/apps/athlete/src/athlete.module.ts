import { Module } from '@nestjs/common';
import { AthleteController } from './athlete.controller';
import { AthleteService } from './athlete.service';
import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@app/common';
import { join } from 'path';
import * as path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AthleteMessageHandler } from './athlete.message_handler';
import { AthleteRepository } from './athlete.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Athlete } from './models/athlete.entity';
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
import { PurchaseRequestModule } from './purchase_request/purchase_request.module';
import { SeasonStatsModule } from './season_stats/season_stats.module';
import { InvestmentPitch } from './models/investment_pitch.entity';
import { InvestmentPitchRepository } from './investment_pitch.repository';
import { InvestorAthleteFollowRepository } from './investor_athlete_follow.repository';
import { InvestorAthleteFollow } from './models/investor_athlete_follows.entity';
import { AthleteUpdate } from './models/athlete_updates.entity';
import { AthleteUpdateRepository } from './athlete_updates.repository';

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
    TypeOrmModule.forFeature([Athlete, Coach, FundingGoal, AthleteFollowers, InvestmentPitch, InvestorAthleteFollow, AthleteUpdate]),
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
    PurchaseRequestModule,
    SeasonStatsModule,
  ],
  controllers: [AthleteController, AthleteMessageHandler],
  providers: [AthleteService, AthleteRepository, CoachRepository, AthleteFollowersRepository, FundingGoalRepository, InvestmentPitchRepository, InvestorAthleteFollowRepository, AthleteUpdateRepository],
  exports: [AthleteRepository, AthleteUpdateRepository],
})
export class AthleteModule {}
