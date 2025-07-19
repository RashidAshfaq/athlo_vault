import { Module } from '@nestjs/common';
import { AthleteController } from './athlete.controller';
import { AthleteService } from './athlete.service';
import { LoggerModule } from '@app/common';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [join(__dirname, '..','..','..','..','.env')],
    }),
    LoggerModule,
  ],
  controllers: [AthleteController],
  providers: [AthleteService],
})
export class AthleteModule {}
