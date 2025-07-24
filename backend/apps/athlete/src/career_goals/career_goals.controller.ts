import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { CareerGoalsService } from './career_goals.service';
import { JwtAuthGuard, LoggingInterceptor, RolesGuard } from '@app/common';
import { CreateCareerGoalDto } from './dtos/career_goal.dto';

@Controller('career-goals')
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class CareerGoalsController {

    constructor(private readonly careerGoalsService: CareerGoalsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCareerGoal(@Req() req, @Body() dto: CreateCareerGoalDto) {
    const athlete = req.user.athlete;
    const goal = await this.careerGoalsService.createCareerGoal(dto, athlete);
    return {
      success: true,
      message: 'Career goal created successfully.',
      data: goal,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCareerGoals(@Req() req) {
    const athleteId = req.user.athlete.id;
    const result = await this.careerGoalsService.getCareerGoalsOverview(athleteId);
    return {
      success: true,
      message: 'Career goals fetched successfully.',
      data: result,
    };
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':goalId')
  async deleteCareerGoal(
    @Param('goalId') goalId: number,
    @Req() req,
  ) {
    const athleteId = req.user.athlete.id;
    const deleted = await this.careerGoalsService.deleteCareerGoal(goalId, athleteId);
    if (deleted) {
      return {
        success: true,
        message: 'Career goal deleted successfully.',
      };
    } else {
      return {
        success: false,
        message: 'Career goal not found or already deleted.',
      };
    }
  }
}
