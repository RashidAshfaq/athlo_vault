import { Module, Global } from '@nestjs/common';
import { CustomLogger } from './custom-logger.service';

@Global()
@Module({
  providers: [
    CustomLogger,
    {
      provide: 'LoggerService',
      useExisting: CustomLogger,
    },
  ],
  exports: ['LoggerService', CustomLogger],
})
export class LoggerModule {}
