import {
  JwtAuthGuard,
  LoggingInterceptor,
  Roles,
  RolesGuard,
  UserRole,
} from '@app/common';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PurchaseRequestService } from './purchase_request.service';
import { CreatePurchaseRequestDto } from './dtos/purchase_request.dto';

@Controller('purchase-request')
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class PurchaseRequestController {
  constructor(private readonly requestService: PurchaseRequestService) {}

  @Roles(UserRole.ATHLETE)
  @Post()
  async createRequest(@Req() req, @Body() dto: CreatePurchaseRequestDto) {
    const athlete = req.user?.athlete;
    const request = await this.requestService.createPurchaseRequest(
      athlete,
      dto,
    );
    return {
      success: true,
      message: 'Purchase request created successfully.',
      data: request,
    };
  }

  @Get()
  @Roles(UserRole.ATHLETE)
  async getAthleteRequests(@Req() req) {
    const athleteId = req.user.athlete.id;
    const result =
      await this.requestService.getAthleteRequestsWithOverview(athleteId);
    return {
      success: true,
      message: 'Purchase requests fetched successfully.',
      data: result,
    };
  }
}
