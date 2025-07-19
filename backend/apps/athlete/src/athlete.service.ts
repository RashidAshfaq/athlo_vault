import { CustomLogger } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AthleteService {
  constructor(
    private readonly logger: CustomLogger,
  ){}
  getHello(): string {
    this.logger.log('hello i am logger');
    return 'Hello World!';
  }
}
