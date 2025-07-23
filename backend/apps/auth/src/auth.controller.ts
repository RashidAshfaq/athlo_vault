import { BadRequestException, Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggingInterceptor } from '@app/common';
import { ApiKeyAuthGuard } from './guards/api-key-auth.guard';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';

@Controller()
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(ApiKeyAuthGuard)
  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    return this.authService.signup(dto);
  }


  @UseGuards(ApiKeyAuthGuard) 
  @Post('login')
  async login(@Body() loginDTO: LoginDto) {
    const data = await this.authService.login(loginDTO);
    return {
      message: 'Login successful.',
      data,
    };
  }
}
