import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, LoggerModule } from '@app/common';
import { join } from 'path';
import * as path from 'path';
import { FileUtilsModule } from '@app/common/file_utility';
import { MulterModule } from '@nestjs/platform-express';
import { FileUtilsService } from '@app/common/file_utility/file-utils.service';
import { diskStorage } from 'multer';

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
    FileUtilsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [join(__dirname, '..', '..', '..', '..', '.env')],
    }),
    LoggerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
