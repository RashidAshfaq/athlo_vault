import { forwardRef, Module } from '@nestjs/common';
import { SeasonStatsController } from './season_stats.controller';
import { SeasonStatsService } from './season_stats.service';
import { MulterModule } from '@nestjs/platform-express';
import { FileUtilsService } from '@app/common/file_utility/file-utils.service';
import { FileUtilsModule } from '@app/common/file_utility';
import { diskStorage } from 'multer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as path from 'path';
import { SoccerSeasonStatsRepository } from './soccer_season_stats.repository';
import { SwimmingSeasonStatsRepository } from './swimming_season_stats.repository';
import { TennisSeasonStatsRepository } from './tennis_season_stats.repository';
import { TrackAndFieldsRepository } from './track_and_fields_season_stats.repository';
import { BaseballSeasonStatsRepository } from './baseball_season_stats.repository';
import { BasketballSeasonStatsRepository } from './basketball_season_stats.repository';
import { FootballSeasonStatsRepository } from './football_season_stats.repository';
import { GolfSeasonStatsRepository } from './golf_season_stats.repository';
import { BaseballSeasonStats } from '../models/baseball_season_stats.entity';
import { BasketballSeasonStats } from '../models/basketball_season_stats.entity';
import { FootballSeasonStats } from '../models/football_season_stats.entity';
import { GolfSeasonStats } from '../models/golf_season_stats.entity';
import { SoccerSeasonStats } from '../models/soccer_season_stats.entity';
import { SwimmingSeasonStats } from '../models/swimming_season_stats.entity';
import { TennisSeasonStats } from '../models/tennis_season_stats.entity';
import { TrackAndFieldsSeasonStats } from '../models/track_and_fields_season_stats.entity';
import { AthleteModule } from '../athlete.module';
import { Athlete } from '../models/athlete.entity';

@Module({
  imports: [
    forwardRef(() => AthleteModule),
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
        TypeOrmModule.forFeature([BaseballSeasonStats, BasketballSeasonStats, FootballSeasonStats, GolfSeasonStats, SoccerSeasonStats, SwimmingSeasonStats, TennisSeasonStats, TrackAndFieldsSeasonStats, Athlete]),
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
  ],
  controllers: [SeasonStatsController],
  providers: [SeasonStatsService, SoccerSeasonStatsRepository, SwimmingSeasonStatsRepository, TennisSeasonStatsRepository, TrackAndFieldsRepository,
     BaseballSeasonStatsRepository, BasketballSeasonStatsRepository, FootballSeasonStatsRepository, GolfSeasonStatsRepository
  ],
  exports: []
})
export class SeasonStatsModule {}
