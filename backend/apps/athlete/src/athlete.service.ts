import {
  AUTH_SERVICE,
  CustomLogger,
  formatProfile,
  formatUsersData,
  Response,
} from '@app/common';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AthleteRepository } from './athlete.repository';
import { Athlete } from './models/athlete.entity';
import { UpdateAthleteProfileDto } from './dtos/update-athlete-profile.dto';
import { Coach } from './models/coach.entity';
import { CoachRepository } from './athlete_coach.repository';
import { AthleteFollowersRepository } from './athlete_followers.repository';
import { FundingGoalRepository } from './funding_goal.repository';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PurchaseRequestService } from './purchase_request/purchase_request.service';
import { GetAthletesFilterDto } from 'apps/investor/src/dtos/athlete.filter.dto';
import { InvestmentPitch } from './models/investment_pitch.entity';
import { InvestmentPitchRepository } from './investment_pitch.repository';
import { InvestorAthleteFollowRepository } from './investor_athlete_follow.repository';
import { AthleteFollowers } from './models/athlete_followers.entity';

@Injectable()
export class AthleteService {
  constructor(
    private readonly logger: CustomLogger,
    private readonly athleteRepo: AthleteRepository,
    private readonly coachRepo: CoachRepository,
    private readonly followersRepo: AthleteFollowersRepository,
    private readonly fundingGoalRepo: FundingGoalRepository,
    private readonly requestService: PurchaseRequestService,
    private readonly investmentPitchRepo: InvestmentPitchRepository,
    private readonly followRepo: InvestorAthleteFollowRepository,
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
      if (athlete?.coach?.id) {
        const coach = await this.coachRepo.findCoach({ id: athlete.coach.id });
        if (coach) {
          Object.assign(coach, dto.coach);
          await this.coachRepo.update(coach);
          athlete.coach = coach;
        }
      } else {
        let coach: Coach | null = null;

        if (dto.coach.email) {
          coach = await this.coachRepo.findCoach({ email: dto.coach.email });
        }

        if (!coach) {
          coach = await this.coachRepo.create(dto.coach);
          await this.coachRepo.save(coach);
        }

        athlete.coach = coach;
      }
    }

    if (dto.socialMedia) {
      // if (athlete?.socialMedia && athlete?.socialMedia?.id) {
      //   const followers = await this.followersRepo.findOne({
      //     id: athlete.socialMedia.id,
      //   });
      //   Object.assign(followers, dto.socialMedia);
      //   await this.followersRepo.update(followers);
      //   athlete.socialMedia = followers;
      // } else {
      const followers = await this.followersRepo.create(dto.socialMedia);
      followers.athletes = athlete;
      await followers.save();
      athlete.socialMedia = followers;
      // }
    }

    if (dto.fundingGoal) {
      if (athlete?.fundingGoal && athlete?.fundingGoal?.id) {
        const fundingGoal = await this.fundingGoalRepo.findOne({
          id: athlete.fundingGoal.id,
        });
        Object.assign(fundingGoal, dto.fundingGoal);
        await this.fundingGoalRepo.update(fundingGoal);
        athlete.fundingGoal = fundingGoal;
      } else {
        const fundingGoal = await this.fundingGoalRepo.create(dto.fundingGoal);
        athlete.fundingGoal = fundingGoal;
      }
    }
    if (dto.fullName) {
      const [firstName, ...rest] = dto.fullName.trim().split(' ');
      const lastName = rest.join(' ');
      athlete.user.firstName = firstName ?? athlete?.user?.firstName;
      athlete.user.lastName = lastName ?? athlete?.user?.lastName;
    }

    if (athlete.user) {
      athlete.user.isProfileCompleted = true;
      const user: Response = await lastValueFrom(
        this.authServiceClient.send('update_user_profile', athlete.user),
      );
      if (!user.success) throw new Error(user.message);
      this.logger.log('Athlete User Profile Update Successfully.');
    }
    // this.patchDefined(athlete, dto);
    athlete.primarySport = dto?.primarySport ?? athlete.primarySport;
    athlete.dob = dto?.dob ?? athlete.dob;
    athlete.positionOrSpeciality =
      dto?.positionOrSpeciality ?? athlete.positionOrSpeciality;
    athlete.organizationName =
      dto?.organizationName ?? athlete.organizationName;
    athlete.yearOfExperience =
      dto?.yearOfExperience ?? athlete.yearOfExperience;
    athlete.keyAchievements = dto?.keyAchievements ?? athlete.keyAchievements;
    athlete.currentPerformance =
      dto.currentPerformance ?? athlete.currentPerformance;
    athlete.proofOfAthleteStatus =
      dto?.proofOfAthleteStatus ?? athlete.proofOfAthleteStatus;
    athlete.felonyConviction =
      dto?.felonyConviction ?? athlete.felonyConviction;
    athlete.felonyDescription =
      dto?.felonyDescription ?? athlete.felonyDescription;
    athlete.height = dto?.height ?? athlete.height;
    athlete.weight = dto?.weight ?? athlete.weight;
    athlete.biography = dto?.biography ?? athlete.biography;
    athlete.about = dto?.about ?? athlete.about;
    athlete.fullName = dto?.fullName ?? athlete.fullName;
    athlete.phone = dto?.phone ?? athlete.phone;

    const updated = await this.athleteRepo.update(athlete);
    const data = await formatProfile(updated);
    return {
      message: 'Athlete profile fully updated.',
      data: data,
    };
  }

  private patchDefined<T>(entity: T, dto: Partial<T>) {
    Object.entries(dto).forEach(([key, value]) => {
      if (value !== undefined) {
        (entity as any)[key] = value;
      }
    });
  }

  async getAthleteDashboard(athlete: any) {
    // Basic Info Check
    const basicInfoChecks = [
      !!athlete.fullName,
      !!athlete.phone,
      !!athlete?.email,
      !!athlete.dob,
      !!athlete?.city,
      !!athlete?.state,
      !!athlete?.country,
      !!athlete?.zip,
    ];
    const basicInfo = basicInfoChecks.every(Boolean);

    // Athletic Details Check
    const athleticDetailsChecks = [
      !!athlete.primarySport,
      !!athlete.positionOrSpeciality,
      !!athlete.organizationName,
      athlete.yearOfExperience != null,
      !!athlete.keyAchievements,
      !!athlete.currentPerformance,
      athlete.height != null,
      athlete.weight != null,
      !!athlete.biography,
      !!athlete.about,
      athlete.total_funding != null,
      athlete.min_investment != null,
      !!athlete.investment_duration,
    ];
    const athleticDetails = athleticDetailsChecks.every(Boolean);

    // Coach Info
    const coach = athlete.coach;
    const coachInfoChecks = [
      !!coach?.name,
      !!coach?.email,
      !!coach?.phone,
      coach?.yearOfWorkTogether != null,
      !!coach?.achievementAndBackground,
    ];
    const coachInformation = coachInfoChecks.every(Boolean);

    // Media Uploads Check
    const mediaChecks = [
      !!athlete.user?.profile_picture,
      !!athlete.coverPhoto,
      !!athlete.governmentId,
      !!athlete.proofOfAthleteStatus,
    ];
    const mediaUpload = mediaChecks.every(Boolean);

    // --- Current Season Stats ---
    const currentSeasonStats = athlete.currentSeasonStats;
    const seasonStatsCheck = !!currentSeasonStats;

    // --- Investment Pitches ---
    const investmentPitches = athlete.investmentPitches ?? [];
    const investmentPitchCheck = investmentPitches.length > 0;

    // Profile completion logic
    const checks = [
      basicInfo,
      athleticDetails,
      coachInformation,
      mediaUpload,
      seasonStatsCheck,
      investmentPitchCheck,
    ];
    const completedSections = checks.filter(Boolean).length;
    const completionPercentage = Math.round(
      (completedSections / checks.length) * 100,
    );

    // Detailed checklist for FE
    return {
      profileCompletion: completionPercentage,
      checklist: {
        basicInfo,
        athleticDetails,
        coachInformation,
        mediaUpload,
        seasonStats: seasonStatsCheck,
        investmentPitch: investmentPitchCheck,
      },
    };
  }

  async getPendingPurchaseRequestCount() {
    return await this.requestService.getPendingPurchaseRequestCount();
  }

  async getPurchaseRequests(page: number, limit: number) {
    return await this.requestService.getPurchaseRequests(page, limit);
  }

  async updatePurchaseRequests(dto: any, performedById: number) {
    return await this.requestService.updatePurchaseRequests(dto, performedById);
  }

  async updateUsingUserId(data: any) {
    const {
      userId,
      phone,
      location,
      name,
      investment_duration,
      total_funding,
      min_investment,
      investment_days,
    } = data;
    return await this.athleteRepo.updateUsingUserId(
      userId,
      phone,
      location,
      name,
      investment_duration,
      total_funding,
      min_investment,
      investment_days,
    );
  }

  async getFilteredAthletes(filters: GetAthletesFilterDto) {
    const { name, sport, sort_by, athleteId } = filters;
    return await this.athleteRepo.getFilteredAthletes(
      name,
      sport,
      sort_by,
      athleteId,
    );
  }

  async uploadInvestmentPitch(athleteId: number, file: Express.Multer.File) {
    if (!file) throw new Error('File is required');

    const pitch = await this.investmentPitchRepo.createPitch(
      athleteId,
      file.filename,
    );

    return {
      message: 'Video uploaded successfully.',
      data: pitch,
    };
  }

  async handleInvestorFollow(
    investorId: number,
    athleteId: number,
    action: 'follow' | 'unfollow',
  ) {
    // Fetch athlete along with current social media stats
    const athlete =
      await this.athleteRepo.findAndGetSocialMediaFollow(athleteId);
    if (!athlete) throw new Error('Athlete not found');

    // Determine previous counts or initialize with 1 1 1
    const prevFollowers = athlete.socialMedia;
    const prevTwitter = prevFollowers?.twitterFollowers ?? 0;
    const prevInstagram = prevFollowers?.instagramFollowers ?? 0;
    const prevLinked = prevFollowers?.linkedFollowers ?? 0;

    // Prepare new followers data
    let newFollowersData: Partial<AthleteFollowers> = {
      twitterFollowers: prevTwitter,
      instagramFollowers: prevInstagram,
      linkedFollowers: prevLinked,
      athletes: athlete,
    };

    // Update counts based on follow/unfollow
    if (action === 'follow') {
      newFollowersData.twitterFollowers += 1;
      newFollowersData.instagramFollowers += 1;
      newFollowersData.linkedFollowers += 1;
    } else if (action === 'unfollow') {
      newFollowersData.twitterFollowers = Math.max(prevTwitter - 1, 0);
      newFollowersData.instagramFollowers = Math.max(prevInstagram - 1, 0);
      newFollowersData.linkedFollowers = Math.max(prevLinked - 1, 0);
    }

    // Create a new followers row (always a new entry)
    const newFollowers = await this.followersRepo.create(newFollowersData);

    // Update athlete's current socialMediaId
    athlete.socialMedia = newFollowers;
    await this.athleteRepo.update(athlete);

    // Update or create Investor-Athlete mapping
    let existingFollow = await this.followRepo.findByInvestorAndAthlete(
      investorId,
      athleteId,
    );

    if (!existingFollow) {
      // Investor never followed before
      await this.followRepo.toggleFollow({
        investor: { id: investorId } as any,
        athlete,
        status: action,
      } as any);
    } else {
      existingFollow.status = action;
      await this.followRepo.toggleFollow(existingFollow);
    }

    return {
      athleteId,
      investorId,
      action,
      followers: newFollowers,
    };
  }
}
