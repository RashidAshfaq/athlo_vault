import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InvestmentPitch } from "./models/investment_pitch.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AthleteUpdate } from "./models/athlete_updates.entity";

@Injectable()
export class InvestmentPitchRepository extends AbstractRepository<InvestmentPitch> {
  protected readonly logger = new Logger(InvestmentPitchRepository.name);

  constructor(
    @InjectRepository(InvestmentPitch)
    private readonly investmentPitchRepo: Repository<InvestmentPitch>,
  ) {
    super(investmentPitchRepo);
  }

   async createPitch(athleteId: number, fileName: string): Promise<InvestmentPitch> {
    const pitch = this.investmentPitchRepo.create({ athleteId, fileName });
    this.logger.log(`Creating InvestmentPitch: ${JSON.stringify(pitch)}`);
    
    await AthleteUpdate.create({
      title: "New Investment Pitch Uploaded",
      description: `Athlete uploaded an investment pitch video/document: ${fileName}`,
      athlete: { id: athleteId } as any,
    }).save();

    return await this.investmentPitchRepo.save(pitch);
  }

}