import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
import { User } from "./models/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AbstractRepository } from "@app/common";

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
        'athlete', 'athlete.coach', 'athlete.fundingGoal', 'athlete.socialMedia', 'athlete.user', 'investor', 'investor.user'
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
}