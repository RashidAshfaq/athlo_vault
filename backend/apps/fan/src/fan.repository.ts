import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AbstractRepository } from "@app/common";
import { Fans } from "./models/fan.entity";

@Injectable()
export class FanRepository extends AbstractRepository<Fans> {
  protected readonly logger = new Logger(FanRepository.name);

  constructor(
    @InjectRepository(Fans) private readonly fanRepository: Repository<Fans>,
  ) {
    super(fanRepository);
  }


    async updateUsingUserId(
      userId: number,
      email?: string,
      name?: string,
    ): Promise<Fans> {
      const fan = await this.fanRepository.findOne({
        where: { user: { id: userId } },
        relations: ['user'],
      });
      if (!fan) {
        throw new NotFoundException(
          `Fan profile not found for userId ${userId}`,
        );
      }
  
     
      if (typeof name === 'string') {
        fan.fullName = name;
      }

      if (typeof email === 'string') {
        fan.email = email;
      }
  
      return this.fanRepository.save(fan);
    }

}