import { AUTH_SERVICE, CustomLogger, Response } from '@app/common';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AthleteRepository } from './athlete.repository';
import { Athlete } from './models/athlete.entity';
import { UpdateAthleteProfileDto } from './dtos/update-athlete-profile.dto';
import { Coach } from './models/coach.entity';
import { AthleteFollowers } from './models/athlete_followers.entity';
import { FundingGoal } from './models/athlete_funding.entity';
import { CoachRepository } from './athlete_coach.repository';
import { AthleteFollowersRepository } from './athlete_followers.repository';
import { FundingGoalRepository } from './funding_goal.repository';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AthleteService {
  constructor(
    private readonly logger: CustomLogger,
    private readonly athleteRepo: AthleteRepository,
    private readonly coachRepo: CoachRepository,
    private readonly followersRepo: AthleteFollowersRepository,
    private readonly fundingGoalRepo: FundingGoalRepository,
    @Inject(AUTH_SERVICE)
    private readonly authServiceClient: ClientProxy,
  ) {}
  async createNewAthlete(savedUser: any): Promise<Athlete> {
    if (!savedUser?.id)
      throw new Error('User ID is required to create athlete profile');

    const fullName = `${savedUser.firstName} ${savedUser.lastName}`;

    const athlete = new Athlete();
    athlete.fullName = fullName;
    athlete.user = savedUser;

    const savedAthlete = await this.athleteRepo.create(athlete);
    this.logger.log(`Athlete created with ID: ${savedAthlete.id}`);
    return savedAthlete;
  }

  async updateFullProfile(
    athlete: any,
    dto: UpdateAthleteProfileDto,
    files: Express.Multer.File[],
  ) {
    const fileMap = Object.fromEntries(
      files.map((file) => [file.fieldname, file]),
    );

    // 1. Map core athlete fields
    if (dto.location) {
      const [city, state, country, zip] = dto.location
        .split(',')
        .map((s) => s.trim());

      athlete.location = dto.location;
      athlete.user.city = city ?? null;
      athlete.user.state = state ?? null;
      athlete.user.country = country ?? null;
      athlete.user.zip = zip ?? null;
    }

    // 2. Handle files
    if (fileMap['coverPhoto'])
      athlete.coverPhoto = fileMap['coverPhoto'].filename;
    if (fileMap['profilePicture'])
      athlete.user.profile_picture = fileMap['profilePicture'].filename;
    if (fileMap['governmentId'])
      athlete.governmentId = fileMap['governmentId'].filename;
    if (fileMap['proofOfAthleteStatus'])
      athlete.proofOfAthleteStatus = fileMap['proofOfAthleteStatus'].filename;
    // 3. Handle nested entities
    if (dto.coach) {
      if (athlete?.coach && athlete?.coach?.id) {
        const coach = await this.coachRepo.findOne(athlete.coach.id);
        Object.assign(coach, dto.coach);
        await this.coachRepo.update(coach);
        athlete.coach = coach;
      } else {
        const coach = await this.coachRepo.create(dto.coach);
        athlete.coach = coach;
      }
    }

    if (dto.socialMedia) {
      if (athlete?.socialMedia && athlete?.socialMedia?.id) {
        const followers = await this.followersRepo.findOne(
          athlete.socialMedia.id,
        );
        Object.assign(followers, dto.socialMedia);
        await this.followersRepo.update(followers);
        athlete.socialMedia = followers;
      } else {
        const followers = await this.followersRepo.create(dto.socialMedia);
        athlete.socialMedia = followers;
      }
    }

    if (dto.fundingGoal) {
      if (athlete?.fundingGoal && athlete?.fundingGoal?.id) {
        const fundingGoal = await this.fundingGoalRepo.findOne(
          athlete.fundingGoal.id,
        );
        Object.assign(fundingGoal, dto.fundingGoal);
        await this.fundingGoalRepo.update(fundingGoal);
        athlete.fundingGoal = fundingGoal;
      } else {
        const fundingGoal = await this.fundingGoalRepo.create(dto.fundingGoal);
        athlete.fundingGoal = fundingGoal;
      }
    }
    if (athlete.user) {
      athlete.user.isProfileCompleted = true;
      const user: Response = await lastValueFrom(
        this.authServiceClient.send('update_user_profile', athlete.user),
      );
      if (!user.success) throw new Error(user.message);
      this.logger.log('Athlete User Profile Update Successfully.');
    }

    this.patchDefined(athlete, dto);
    const updated = await this.athleteRepo.update(athlete);
    return {
      message: 'Athlete profile fully updated.',
      data: updated,
    };
  }

  private patchDefined<T>(entity: T, dto: Partial<T>) {
  Object.entries(dto).forEach(([key, value]) => {
    if (value !== undefined) {
      (entity as any)[key] = value;
    }
  });
}
}
