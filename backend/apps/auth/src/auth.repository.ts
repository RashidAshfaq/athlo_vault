import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { User } from './models/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository, UserRole } from '@app/common';
import { UserDTO } from 'apps/admin/src/dtos/user.dto';
import { Investor } from 'apps/investor/src/models/investor.entity';

@Injectable()
export class AuthRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(AuthRepository.name);

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async findUser(where: FindOptionsWhere<User>): Promise<User | null> {
    try {
      return await this.userRepository.findOne({ where });
    } catch (error) {
      this.logger.error('Failed to find user', error);
    }
  }

  async findOneWhere(where: any): Promise<User> {
    this.logger.log(
      `Searching for user with criteria: ${JSON.stringify(where)}`,
    );
    // Fetch all results matching the criteria
    const users = await this.userRepository.find({
      where,
      relations: [
        'athlete',
        'athlete.coach',
        'athlete.fundingGoal',
        'athlete.socialMedia',
        'athlete.footballSeason',
        'athlete.investmentPitches',
        'athlete.basketballSeason',
        'athlete.swimmingSeason',
        'athlete.soccerSeason',
        'athlete.baseballSeason',
        'athlete.tennisSeason',
        'athlete.golfSeason',
        'athlete.trackAndFieldsSeason',
        'athlete.user',
        'investor',
        'investor.user',
        'admin',
        'admin.user',
        'fan',
        'fan.user'
      ],
    });
    // Check if any user has `deleted_by`
    const userWithIsDeletedBy = users.find((user) => user.deleted_by !== null);

    if (userWithIsDeletedBy) {
      this.logger.warn(
        `User was deleted by admin: ${JSON.stringify(userWithIsDeletedBy)}`,
      );
      throw new BadRequestException(
        'Your account has been restricted. Please contact the administrator for further assistance.',
      );
    }

    // Find the first user where `is_deleted` is false
    const activeUser = users.find((user) => !user.is_deleted);
    return activeUser;
  }

  async update(entity: User): Promise<User> {
    return this.userRepository.save(entity);
  }

  async getUsersDashboardAndList(q: UserDTO) {
    const page = Math.max(Number(q.page) || 1, 1);
    const perPage = Math.min(Math.max(Number(q.limit) || 10, 1), 100);

    const { startOfPrev, startOfCurr, startOfNext } = this.monthBounds();

    const baseSummary = this.userRepository
      .createQueryBuilder('u')
      .where('u.role != :admin', { admin: UserRole.ADMIN })
      .andWhere('COALESCE(u.is_deleted, false) = false');

    const [totalUsers, currentMonthUsers, prevMonthUsers, pendingApprovals] =
      await Promise.all([
        baseSummary.clone().getCount(),
        baseSummary
          .clone()
          .andWhere('u.created_at >= :s AND u.created_at < :e', {
            s: startOfCurr,
            e: startOfNext,
          })
          .getCount(),
        baseSummary
          .clone()
          .andWhere('u.created_at >= :s AND u.created_at < :e', {
            s: startOfPrev,
            e: startOfCurr,
          })
          .getCount(),
        baseSummary.clone().andWhere('u.isApproved = false').getCount(),
      ]);

    const summary = {
      totalUsers,
      currentMonthUsers,
      prevMonthUsers,
      growthPct: this.pctDelta(currentMonthUsers, prevMonthUsers),
      pendingApprovals,
    };

    let users;
    if (q.filter === 'approvals') {
      users = await this.getApprovalsUsersList(page, perPage, q);
    } else if(q.filter === 'requests') {
      // users = await this.getPurchaseRequestList(page, perPage, q);
    } else {
      users = await this.getUserManagementList(page, perPage, q);
    }

    return { summary, users };
  }

  async getUserManagementList(page: number, perPage: number, q: any) {
    const qb = this.userRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.athlete', 'ath')
      .leftJoinAndSelect('u.investor', 'inv')
      .where('u.role != :admin', { admin: UserRole.ADMIN });

    // status filters (optional)
    if (q.status === 'active') {
      qb.andWhere('COALESCE(u.is_deleted, false) = false').andWhere(
        'u.isApproved = true',
      );
    } else if (q.status === 'pending') {
      qb.andWhere('COALESCE(u.is_deleted, false) = false').andWhere(
        'u.isApproved = false',
      );
    } else if (q.status === 'suspended') {
      qb.andWhere(
        '(COALESCE(u.is_deleted, false) = true OR u.deleted_by IS NOT NULL)',
      );
    }

    // role filter (accountType)
    if (q.role && q.role !== 'admin') {
      qb.andWhere('u.accountType = :role', { role: q.role });
    }

    // search
    if (q.query) {
      const term = `%${q.query.toLowerCase()}%`;
      qb.andWhere(
        `(LOWER(u.firstName) LIKE :term OR LOWER(u.lastName) LIKE :term OR LOWER(u.email) LIKE :term
        OR LOWER(ath.fullName) LIKE :term OR ath.phone LIKE :term
        OR LOWER(inv.fullName) LIKE :term OR inv.phone LIKE :term)`,
        { term },
      );
    }

    // sorting (supports lastActive alias)
    let sortCol = 'updated_at';
    let sortDir: 'ASC' | 'DESC' = 'DESC';
    qb.orderBy(`u.${sortCol}`, sortDir);

    qb.skip((page - 1) * perPage).take(perPage);

    const [rows, total] = await qb.getManyAndCount();

    const users = {
      data: rows.map((u) => {
        const status = this.computeStatus(u);
        const phone = u.athlete?.phone ?? u.investor?.phone ?? null;
        const location = this.makeUserLocation(u, u.athlete, u.investor);
        return {
          id: u.id,
          name: `${u.firstName} ${u.lastName}`,
          email: u.email,
          role: u.accountType,
          status,
          verification: u.isApproved ? 'verified' : 'pending',
          phone,
          location,
          join_date: this.ymd((u as any).created_at),
          last_active: this.formatLastActive((u as any).last_active),
        };
      }),
      meta: {
        page,
        per_page: perPage,
        total,
        total_pages: Math.max(Math.ceil(total / perPage), 1),
      },
    };
    return users;
  }

  async getApprovalsUsersList(page: number, perPage: number, q: any) {
    const qb = this.userRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.athlete', 'ath')
      .leftJoinAndSelect('ath.coach', 'coach')
      .leftJoinAndSelect('u.investor', 'inv')
      .where('u.role != :admin', { admin: UserRole.ADMIN })
      .andWhere('COALESCE(u.is_deleted, false) = false') 
      .andWhere('u.isApproved = false') 
      .andWhere('u.deleted_by IS NULL')
      .andWhere('u.approved_by IS NULL');
    let sortCol = 'updated_at';
    let sortDir: 'ASC' | 'DESC' = 'DESC';
    qb.orderBy(`u.${sortCol}`, sortDir);

    qb.skip((page - 1) * perPage).take(perPage);

    const [rows, total] = await qb.getManyAndCount();
    const users = {
      data: rows.map((u) => {
        const status = this.computeStatus(u);
        const phone = u.athlete?.phone ?? u.investor?.phone ?? null;
        const primarySportOrLimit = u.athlete?.primarySport ?? u.investor?.expected_investment_amount ?? null;
        const idOrkycStatus = u.athlete?.proofOfAthleteStatus ?? u.investor?.kyc_status ?? null;
        const governmentIdOrAMLStatus = u.athlete?.governmentId ?? u.investor?.aml_status ?? null;
        const financialOrMedicalOrCoach = u.investor?.annual_income_range ?? u.investor?.net_worth_range ??  u.athlete?.coach ?? null;
        const location = this.makeUserLocation(u, u.athlete, u.investor);
        // const 
        return {
          id: u.id,
          name: `${u.firstName} ${u.lastName}`,
          email: u.email,
          role: u.accountType,
          status,
          phone,
          location,
          primarySportOrLimit,
          idOrkycStatus,
          governmentIdOrAMLStatus,
          financialOrMedicalOrCoach,
          join_date: this.ymd((u as any).created_at),
        };
      }),
      meta: {
        page,
        per_page: perPage,
        total,
        total_pages: Math.max(Math.ceil(total / perPage), 1),
      },
    };
    return users;
  }
  async updateUserCoreById(data: UserDTO, userData: any): Promise<User> {
    const { userId, name, email, role, status, location } = data;
    const performedById = userData?.id;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    // name
    const split = this.splitName(name);
    if (split.firstName) user.firstName = split.firstName;
    if (split.lastName !== undefined) user.lastName = split.lastName;

    // email
    if (email) user.email = email;

    // role (accountType)
    if (role) (user as any).accountType = role;

    // location
    if (location) {
      const [city, state, country, zip] = location
        .split(',')
        .map((s) => s.trim());

      user.city = city || user.city;
      user.state = state || user.state;
      user.country = country || user.country;
      user.zip = zip || user.zip;
    }

    // status mapping
    this.applyStatus(user, status, performedById);

    return this.userRepository.save(user);
  }

  async bulkUpdateStatus(
    data: any,
    performedByUserId: number,
  ): Promise<{ activated: number; suspended: number; notFound: number }> {
    const { userIds, status } = data;
    const uniqueIds = [...new Set(userIds)];
    if (uniqueIds.length === 0)
      return { activated: 0, suspended: 0, notFound: 0 };

    let activated = 0;
    let suspended = 0;
    let processed = 0;

    const existing = await this.userRepository.find({
      where: { id: In(uniqueIds) },
      select: ['id', 'isApproved'],
    });
    const existIds = new Set(existing.map((u) => u.id));

    // Process in chunks to avoid huge payloads
    for (const batch of this.chunk([...existIds], 300)) {
      const toSave: Partial<User>[] = batch.map((id) => {
        if (status === 'activate') {
          return {
            id,
            isApproved: true,
            approved_by: { id: performedByUserId } as any,
            ...({ is_deleted: false } as any),
            deleted_by: null,
          };
        } else {
          return {
            id,
            ...({ is_deleted: true } as any),
            deleted_by: performedByUserId,
            isApproved: false,
          };
        }
      });

      const saved = await this.userRepository.save(toSave as User[], {
        chunk: 100,
      });
      processed += saved.length;
      if (status === 'activate') activated += saved.length;
      else suspended += saved.length;
    }

    const notFound = uniqueIds.length - processed;
    return { activated, suspended, notFound };
  }

  private applyStatus(user: User, status?: string, performedById?: number) {
    if (!status) return user;
    if (status === 'active') {
      (user as any).is_deleted = false;
      user.deleted_by = null;
      user.isApproved = true;
      user.approved_by = { id: performedById } as User;
    } else if (status === 'pending') {
      (user as any).is_deleted = false;
      user.deleted_by = null;
      user.isApproved = false;
    } else if (status === 'suspended') {
      (user as any).is_deleted = true;
      if (performedById) user.deleted_by = performedById;
    }
    return user;
  }

  private chunk<T>(arr: T[], size = 500): T[][] {
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  }

  private splitName(full?: string): { firstName?: string; lastName?: string } {
    if (!full) return {};
    const parts = full.trim().split(/\s+/);
    const firstName = parts.shift() || '';
    const lastName = parts.join(' ');
    return { firstName, lastName };
  }

  private monthBounds(d = new Date()) {
    const y = d.getUTCFullYear();
    const m = d.getUTCMonth();
    const startOfCurr = new Date(Date.UTC(y, m, 1, 0, 0, 0, 0));
    const startOfNext = new Date(Date.UTC(y, m + 1, 1, 0, 0, 0, 0));
    const startOfPrev = new Date(Date.UTC(y, m - 1, 1, 0, 0, 0, 0));
    return { startOfPrev, startOfCurr, startOfNext };
  }

  private pctDelta(curr: number, prev: number) {
    if (!prev) return curr > 0 ? 100 : 0;
    return Number((((curr - prev) / prev) * 100).toFixed(1));
  }

  private ymd(date?: Date | null) {
    if (!date) return null;
    const d = new Date(date);
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(d.getUTCDate()).padStart(2, '0');
    return `${d.getUTCFullYear()}-${mm}-${dd}`;
  }

  private formatLastActive(
    ts?: string | Date | null,
    withSuffix = true,
  ): string | null {
    if (!ts) return null;

    const d = ts instanceof Date ? ts : new Date(ts);
    const ms = Date.now() - d.getTime();
    if (Number.isNaN(d.getTime())) return null;

    const past = ms >= 0;
    const diffSec = Math.abs(Math.floor(ms / 1000));

    // quick “just now”
    if (diffSec < 45)
      return withSuffix
        ? past
          ? 'just now'
          : 'in a few seconds'
        : '0 seconds';

    const MIN = 60;
    const HOUR = 60 * MIN;
    const DAY = 24 * HOUR;
    const WEEK = 7 * DAY;
    const MONTH = 30 * DAY; // approx
    const YEAR = 365 * DAY; // approx

    const units: [label: string, secs: number][] = [
      ['year', YEAR],
      ['month', MONTH],
      ['week', WEEK],
      ['day', DAY],
      ['hour', HOUR],
      ['minute', MIN],
      ['second', 1],
    ];

    for (const [label, secs] of units) {
      const val = Math.floor(diffSec / secs);
      if (val >= 1) {
        const s = `${val} ${label}${val > 1 ? 's' : ''}`;
        if (!withSuffix) return s;
        return past ? `${s} ago` : `in ${s}`;
      }
    }
    return withSuffix ? (past ? 'just now' : 'in a few seconds') : '0 seconds';
  }

  private makeInvestorLocation(inv?: Partial<Investor> | null) {
    if (!inv) return null;
    const parts = [inv.address, inv.state_of_residence].filter(Boolean);
    return parts.length ? parts.join(', ') : null;
  }

  private makeUserLocation(u: any, athlete?: any, investor?: any) {
    return (
      athlete?.location ??
      this.makeInvestorLocation(investor) ??
      ([u.city, u.state, u.country, u.zip].filter(Boolean).join(', ') || null)
    );
  }

  private computeStatus(u: any) {
    const isDeleted = u.is_deleted === true;
    const suspended = isDeleted || u.deleted_by !== null;
    return suspended ? 'suspended' : u.isApproved ? 'active' : 'pending';
  }
}
