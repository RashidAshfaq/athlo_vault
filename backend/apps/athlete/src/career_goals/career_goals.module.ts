import { Module } from '@nestjs/common';
import { CareerGoalsService } from './career_goals.service';
import { CareerGoalsController } from './career_goals.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareerGoal } from '../models/career_goals.entity';
import { Milestone } from '../models/milestone.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CareerGoalRepository } from './career_goals.repository';
import { MilestoneRepository } from './milestone.repository';

@Module({
  imports: [
 ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [join(__dirname, '..', '..', '..', '..', '.env')],
    }),
    LoggerModule,
    TypeOrmModule.forFeature([CareerGoal, Milestone]),
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
  providers: [CareerGoalsService, CareerGoalRepository, MilestoneRepository],
  controllers: [CareerGoalsController]
})
export class CareerGoalsModule {}
