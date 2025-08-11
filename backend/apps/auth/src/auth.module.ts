import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ADMIN_SERVICE, ATHLETE_SERVICE, DatabaseModule, INVESTOR_SERVICE, LoggerModule, PasswordService } from '@app/common';
import { join } from 'path';
import * as path from 'path';
import { FileUtilsModule } from '@app/common/file_utility';
import { MulterModule } from '@nestjs/platform-express';
import { FileUtilsService } from '@app/common/file_utility/file-utils.service';
import { diskStorage } from 'multer';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/users.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthMessageHandler } from './auth.message_handler';

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
    FileUtilsModule,
    DatabaseModule,
    LoggerModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<number>('JWT_EXPIRATION')}`,
        },
      }),
      inject: [ConfigService],
    }),

    ClientsModule.registerAsync([
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
        {
          name: INVESTOR_SERVICE,
          useFactory: (configService: ConfigService) => ({
            transport: Transport.TCP,
            options: {
              host: configService.get('TCP_HOST'),
              port: configService.get('INVESTOR_TCP_PORT'),
            },
          }),
          inject: [ConfigService],
        },
        {
          name: ADMIN_SERVICE,
          useFactory: (configService: ConfigService) => ({
            transport: Transport.TCP,
            options: {
              host: configService.get('TCP_HOST'),
              port: configService.get('ADMIN_TCP_PORT'),
            },
          }),
          inject: [ConfigService],
        },
      ]),
  ],
  controllers: [AuthController, AuthMessageHandler],
  providers: [
    PasswordService,
    AuthService,
    JwtStrategy,
    LocalStrategy,
    AuthRepository,
  ],
  exports: [AuthRepository],
})
export class AuthModule {}
