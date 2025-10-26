import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from '@app/common';
import { AthleteFollowers } from './models/athlete_followers.entity';

@Injectable()
export class AthleteFollowersRepository extends AbstractRepository<AthleteFollowers> {
  protected readonly logger = new Logger(AthleteFollowersRepository.name);

  constructor(
    @InjectRepository(AthleteFollowers)
    private readonly followersRepository: Repository<AthleteFollowers>,
  ) {
    super(followersRepository);
  }

  async update(entity: AthleteFollowers): Promise<AthleteFollowers> {
    return this.followersRepository.save(entity);
  }

   async save(entity: AthleteFollowers): Promise<AthleteFollowers> {
    return this.followersRepository.save(entity);
  }
}
