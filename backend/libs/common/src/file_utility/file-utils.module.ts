import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileUtilsService } from './file-utils.service';

@Module({
  imports: [ConfigModule],
  providers: [FileUtilsService],
  exports: [FileUtilsService],
})
export class FileUtilsModule {}
