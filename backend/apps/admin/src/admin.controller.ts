import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard, LoggingInterceptor, RolesGuard } from '@app/common';
import { UserDTO } from './dtos/user.dto';
import { SendUserMessageDto } from './dtos/send-user-message.dto';
import { UserMessageService } from './user_messages/user_messages.service';
import { BulkUserStatusDto } from './dtos/bulk-user-status.dto';

@Controller()
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userMessageService: UserMessageService,
  ) {}

  @Get('dashboard')
  async getDashboard(@Query() dto: UserDTO) {
    return await this.adminService.getDashboard(dto);
  }

  @Get('update_user_profile')
  async updateUserProfile(@Query() dto: UserDTO, @Req() req: any) {
    const user = req?.user;
    return await this.adminService.updateUserProfile(dto, user);
  }

  @Post('send_bulk_messages')
  async sendToUsers(@Req() req: any, @Body() dto: SendUserMessageDto) {
    const requesterUserId = req.user?.admin?.id;
    const result = await this.userMessageService.sendMessageToUsers(
      requesterUserId,
      dto,
    );
    return {
      success: true,
      message: 'Message sent.',
      data: result,
    };
  }

  @Post('bulk_status')
  async bulkStatus(@Req() req: any, @Body() dto: BulkUserStatusDto) {
    const performedByUserId = req.user?.admin?.id;
    const result = await this.adminService.bulkStatus(performedByUserId, dto);
    return { success: true, message: 'Bulk status updated.', data: result };
  }
}
