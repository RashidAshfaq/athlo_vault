import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Athlete } from './models/athlete.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from '@app/common';
import { AthleteSortBy } from 'apps/investor/src/dtos/athlete.filter.dto';

@Injectable()
export class AthleteRepository extends AbstractRepository<Athlete> {
  protected readonly logger = new Logger(AthleteRepository.name);

  constructor(
    @InjectRepository(Athlete)
    private readonly athleteRepository: Repository<Athlete>,
  ) {
    super(athleteRepository);
  }

  async update(entity: Athlete): Promise<Athlete> {
    const saved = await this.athleteRepository.save(entity);
    return this.athleteRepository.findOne({
      where: { id: saved?.id },
      relations: ['user', 'coach', 'socialMedia', 'fundingGoal'],
    });
  }

  async updateUsingUserId(
    userId: number,
    phone?: string,
    location?: string,
    name?: string,
    investment_duration?: string,
    total_funding?: number,
    min_investment?: number,
    investment_days?: number,
  ): Promise<Athlete> {
    const athlete = await this.athleteRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!athlete) {
      throw new NotFoundException(
        `Athlete profile not found for userId ${userId}`,
      );
    }

    if (typeof phone === 'string') {
      athlete.phone = phone;
    }
    if (typeof location === 'string') {
      athlete.location = location;
    }
    if (typeof name === 'string') {
      athlete.fullName = name;
    }
    if (typeof investment_duration === 'string') {
      athlete.investment_duration = investment_duration;
    }
    if (typeof total_funding === 'number') {
      athlete.total_funding = total_funding;
    }

    if (typeof min_investment === 'number') {
      athlete.min_investment = min_investment;
    }

    if (typeof investment_days === 'number') {
      athlete.investment_days = investment_days;
    }
    return this.athleteRepository.save(athlete);
  }

  async getFilteredAthletes(
    name: string,
    sport: string,
    sort_by: string,
    athleteId: number,
  ) {
    let query = Athlete.createQueryBuilder('athlete')
      .leftJoinAndSelect('athlete.user', 'user')
      .leftJoinAndSelect('athlete.socialMedia', 'socialMedia')
      .leftJoinAndSelect('athlete.fundingGoal', 'fundingGoal')
      .leftJoinAndSelect('athlete.coach', 'coach')
      .leftJoinAndSelect('athlete.careerGoals', 'careerGoals')
      .leftJoinAndSelect('careerGoals.milestones', 'milestones')
      .leftJoinAndSelect('athlete.investmentPitches', 'investmentPitches')
      .leftJoinAndSelect('athlete.updates', 'recent_updates')
      // .leftJoinAndSelect('athlete.swimmingSeason', 'swimmingSeason')
      // .leftJoinAndSelect('athlete.soccerSeason', 'soccerSeason')
      // .leftJoinAndSelect('athlete.baseballSeason', 'baseballSeason')
      // .leftJoinAndSelect('athlete.tennisSeason', 'tennisSeason')
      // .leftJoinAndSelect('athlete.golfSeason', 'golfSeason')
      // .leftJoinAndSelect('athlete.trackAndFieldsSeason', 'trackAndFieldsSeason')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(DISTINCT inv.investorId)', 'total_investors')
          .from('investments', 'inv')
          .where('inv.athleteId = athlete.id');
      }, 'total_investors')
      .addSelect((subQuery) => {
        return subQuery
          .select(
            'COALESCE(SUM(inv.investment_amount), 0)',
            'total_invested_amount',
          )
          .from('investments', 'inv')
          .where('inv.athleteId = athlete.id');
      }, 'total_invested_amount')
      .where('athlete.is_deleted = false');

    if (sport) {
      switch (sport.toLowerCase()) {
        case 'football':
          query = query.leftJoinAndSelect(
            'athlete.footballSeason',
            'footballSeason',
          );
          break;
        case 'basketball':
          query = query.leftJoinAndSelect(
            'athlete.basketballSeason',
            'basketballSeason',
          );
          break;
        case 'swimming':
          query = query.leftJoinAndSelect(
            'athlete.swimmingSeason',
            'swimmingSeason',
          );
          break;
        case 'soccer':
          query = query.leftJoinAndSelect(
            'athlete.soccerSeason',
            'soccerSeason',
          );
          break;
        case 'baseball':
          query = query.leftJoinAndSelect(
            'athlete.baseballSeason',
            'baseballSeason',
          );
          break;
        case 'tennis':
          query = query.leftJoinAndSelect(
            'athlete.tennisSeason',
            'tennisSeason',
          );
          break;
        case 'golf':
          query = query.leftJoinAndSelect('athlete.golfSeason', 'golfSeason');
          break;
        case 'track and field':
          query = query.leftJoinAndSelect(
            'athlete.trackAndFieldsSeason',
            'trackAndFieldsSeason',
          );
          break;
      }
    }
    // Filter by name
    if (name) {
      query = query.andWhere(
        `(LOWER(user.firstName) LIKE LOWER(:name) OR LOWER(user.lastName) LIKE LOWER(:name) OR LOWER(athlete.fullName) LIKE LOWER(:name))`,
        { name: `%${name}%` },
      );
    }

    // Filter by sport
    if (sport) {
      query = query.andWhere('LOWER(athlete.primarySport) = LOWER(:sport)', {
        sport,
      });
    }

    // Sorting logic
    switch (sort_by) {
      case AthleteSortBy.MOST_TRENDING:
        query = query.orderBy('athlete.updated_at', 'DESC');
        break;
      case AthleteSortBy.HIGHEST_VALUATION:
        query = query.orderBy('athlete.yearOfExperience', 'DESC');
        break;
      case AthleteSortBy.HIGHEST_GROWTH:
        query = query.orderBy('athlete.created_at', 'DESC');
        break;
      case AthleteSortBy.MOST_FOLLOWERS:
        query = query.orderBy('socialMedia.instagramFollowers', 'DESC');
        break;
      default:
        query = query.orderBy('athlete.created_at', 'DESC');
    }
    if (athleteId) {
      query = query.andWhere('athlete.id = :athleteId', { athleteId });
    }
    // return await query.getMany();
    const athletes = await query.getRawAndEntities();

    // Combine base entity + computed fields
    return athletes.entities.map((athlete, i) => {
      const raw = athletes.raw[i];
      const total_invested = parseFloat(raw.total_invested_amount ?? 0);
      const total_funding = athlete.total_funding ?? 0;

      // Calculate % funded
      const investment_percentage = total_funding
        ? ((total_invested / total_funding) * 100).toFixed(2)
        : '0.00';

      return {
        ...athlete,
        total_investors: parseInt(raw.total_investors ?? 0),
        total_invested_amount: total_invested,
        investment_percentage: investment_percentage,
      };
    });
  }

  async updateSeasonStatsId(
    athleteId: number,
    seasonStatsId: any,
    sport: string,
  ) {
    const athlete = await this.athleteRepository.findOne({
      where: { id: athleteId },
    });
    if (!athlete) {
      throw new NotFoundException('Athlete not found');
    }

    switch (sport.toLowerCase()) {
      case 'football':
        athlete.footballSeason = seasonStatsId;
        // await this.athleteRepository.save(athlete);
        break;
      case 'basketball':
        athlete.basketballSeason = seasonStatsId;
        break;
      case 'soccer':
        athlete.soccerSeason = seasonStatsId;
        break;
      case 'baseball':
        athlete.baseballSeason = seasonStatsId;
        break;
      case 'tennis':
        athlete.tennisSeason = seasonStatsId;
        break;
      case 'golf':
        athlete.golfSeason = seasonStatsId;
        break;
      case 'swimming':
        athlete.swimmingSeason = seasonStatsId;
        break;
      case 'track and field':
        athlete.trackAndFieldsSeason = seasonStatsId;
        break;
      default:
        throw new NotFoundException('Sport not recognized');
    }

    await this.athleteRepository.save(athlete);
    this.logger.log(
      `Athlete ID ${athleteId} updated with season stats ID ${seasonStatsId}`,
    );
  }

  async findAndGetSocialMediaFollow(athleteId: number) {
    return await this.athleteRepository.findOne({
      where: { id: athleteId },
      relations: ['socialMedia'],
    });
  }
}
