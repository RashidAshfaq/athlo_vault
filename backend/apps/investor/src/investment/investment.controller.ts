import { JwtAuthGuard, LoggingInterceptor, Roles, RolesGuard, UserRole } from '@app/common';
import { Body, Controller, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { CreateInvestmentDto } from '../dtos/investment.dto';

@Controller('investment')
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Roles(UserRole.INVESTOR)
  @Post()
  async createInvestment(@Req() req: any, @Body() dto: CreateInvestmentDto) {
    const user = req.user;
    return this.investmentService.createInvestment(user, dto);
  }
}
