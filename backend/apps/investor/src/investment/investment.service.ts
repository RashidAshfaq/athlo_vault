import { ATHLETE_SERVICE, AUTH_SERVICE, CustomLogger } from '@app/common';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InvestmentRepository } from './investment.repository';
import { lastValueFrom } from 'rxjs';
import { InvestmentStatus } from '../models/investement.entity';
import { Investor } from '../models/investor.entity';
import { Athlete } from 'apps/athlete/src/models/athlete.entity';

@Injectable()
export class InvestmentService {
  constructor(
    private readonly investmentRepo: InvestmentRepository,
    private readonly logger: CustomLogger,
    @Inject(AUTH_SERVICE)
    private readonly authServiceClient: ClientProxy,
    @Inject(ATHLETE_SERVICE)
    private readonly athleteServiceClient: ClientProxy,
  ) {}

   async createInvestment(user: any, dto: { athleteId: number; investment_amount: number }) {
    const { athleteId, investment_amount } = dto;
    const investorId = user?.investor?.id;

    const athleteResponse = await lastValueFrom(
      this.athleteServiceClient.send('get_athletes_for_investor', { athleteId }),
    );

    if (!athleteResponse?.success || !athleteResponse?.data) {
      throw new BadRequestException('Athlete not found or fetch failed.');
    }
    const athlete = athleteResponse.data[0];

    if (
      athlete.min_investment &&
      investment_amount < athlete.min_investment
    ) {
      throw new BadRequestException(
        `Investment amount ($${investment_amount}) is below the athlete’s minimum investment requirement ($${athlete.min_investment}).`,
      );
    }

    const investment = await this.investmentRepo.create({
      investment_amount,
      investor: { id: investorId } as Investor,
      athlete: { id: athleteId } as Athlete,
      investment_status: InvestmentStatus.PENDING,
    });

    this.logger.log(
      `New investment created by Investor ${investorId} for Athlete ${athleteId}, amount: ${investment_amount}`,
    );

    return {
      success: true,
      message: 'Investment request created successfully and pending approval.',
      data: investment,
    };
  }
}
