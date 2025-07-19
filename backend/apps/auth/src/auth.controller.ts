import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggingInterceptor } from '@app/common';

@Controller()
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello() {
    const data = this.authService.getHello();
    return {data: data, message: 'here is your request'}
  }
}
