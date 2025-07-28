import { Module } from '@nestjs/common';
import { PurchaseRequestController } from './purchase_request.controller';
import { PurchaseRequestService } from './purchase_request.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseRequest } from '../models/purchase_request.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PurchaseRequestRepository } from './purchase_request.repository';

@Module({
    imports: [
   ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: [join(__dirname, '..', '..', '..', '..', '.env')],
      }),
      LoggerModule,
      TypeOrmModule.forFeature([PurchaseRequest]),
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
  controllers: [PurchaseRequestController],
  providers: [PurchaseRequestService, PurchaseRequestRepository]
})
export class PurchaseRequestModule {}
