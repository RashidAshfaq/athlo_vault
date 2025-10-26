import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InvestorRepository } from './investor.repository';
import { Investor } from './models/investor.entity';
import {
  ATHLETE_SERVICE,
  AUTH_SERVICE,
  CustomLogger,
  formatProfile,
} from '@app/common';
import { UpdateInvestorProfileDto } from './dtos/investor.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Response } from '@app/common';
import { GetAthletesFilterDto } from './dtos/athlete.filter.dto';

@Injectable()
export class InvestorService {
  constructor(
    private readonly investorRepo: InvestorRepository,
    private readonly logger: CustomLogger,
    @Inject(AUTH_SERVICE)
    private readonly authServiceClient: ClientProxy,
    @Inject(ATHLETE_SERVICE)
    private readonly athleteServiceClient: ClientProxy,
  ) {}

  async createNewInvestor(savedUser: any): Promise<Investor> {
    if (!savedUser?.id)
      throw new Error('User ID is required to create investor profile');

    const fullName = `${savedUser.firstName} ${savedUser.lastName}`;

    const investor = new Investor();
    investor.fullName = fullName;
    investor.user = savedUser;

    const savedInvestor = await this.investorRepo.create(investor);
    this.logger.log(`Investor created with ID: ${savedInvestor.id}`);
    return savedInvestor;
  }

  async updateInvestorProfile(user: any, dto: UpdateInvestorProfileDto) {
    if (!user?.investor)
      throw new NotFoundException('Investor profile not found.');
    const investor = user.investor;

    Object.entries(dto).forEach(([key, value]) => {
      if (['city', 'state', 'zip'].includes(key)) return;
      if (value !== undefined) {
        (investor as any)[key] = value;
      }
    });

    // Update User fields
    if (dto.city !== undefined) investor.user.city = dto.city;
    if (dto.state !== undefined) investor.user.state = dto.state;
    if (dto.zip !== undefined) investor.user.zip = dto.zip;

    if (dto.fullName) {
      const [firstName, ...lastArr] = dto.fullName.trim().split(' ');
      investor.user.firstName = firstName;
      investor.user.lastName = lastArr.join(' ');
    }
    investor.user.isProfileCompleted = true;
    if (investor.user) {
      const user: Response = await lastValueFrom(
        this.authServiceClient.send('update_user_profile', investor.user),
      );
      if (!user.success) throw new Error(user.message);
      this.logger.log('Investor User Profile Update Successfully.');
    }
    const updated = await this.investorRepo.update(investor);
    const data = await formatProfile(updated);

    return {
      message: 'Investor profile updated successfully.',
      data: data,
    };
  }

  async updateUsingUserId(data: any) {
    const { userId, phone, location, name } = data;
    return await this.investorRepo.updateUsingUserId(
      userId,
      phone,
      location,
      name,
    );
  }


  async fetchAthletes(filters: GetAthletesFilterDto) {
   const athletes: Response = await lastValueFrom(
      this.athleteServiceClient.send('get_athletes_for_investor', filters),
    );
    if (!athletes.success) throw new Error(athletes.message);

    return athletes.data;
  } 

  async followOrUnfollowAthlete(investorId: number, dto: GetAthletesFilterDto) {
    const payload = { investorId, athleteId: dto?.athleteId,action: dto?.action };

    const result: Response = await lastValueFrom(
      this.athleteServiceClient.send('investor_follow_athlete', payload),
    );
    if (!result.success) throw new Error(result.message);
    return result;
  }
}
