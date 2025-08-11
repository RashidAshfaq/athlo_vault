import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from '@app/common';
import { PurchaseRequest, PurchaseRequestStatus } from '../models/purchase_request.entity';

@Injectable()
export class PurchaseRequestRepository extends AbstractRepository<PurchaseRequest> {
  protected readonly logger = new Logger(PurchaseRequestRepository.name);

  constructor(
    @InjectRepository(PurchaseRequest)
    private readonly requestRepository: Repository<PurchaseRequest>,
  ) {
    super(requestRepository);
  }

  async findAllByAthleteId(athleteId: number): Promise<PurchaseRequest[]> {
    return this.requestRepository.find({
      where: {
        athlete: { id: athleteId },
        is_deleted: false,
      },
      order: { created_at: 'DESC' },
      relations: ['approvedBy'], 
    });
  }

  async getPendingPurchaseRequestCount(athleteId?: number): Promise<number> {
    const qb = this.requestRepository
      .createQueryBuilder('pr')
      .where('pr.requestStatus = :status', { status: PurchaseRequestStatus.PENDING })
      .andWhere('COALESCE(pr.is_deleted, false) = false');

    if (athleteId) {
      qb.leftJoinAndSelect('athlete', 'ath')
      qb.andWhere('ath.id = :athleteId', { athleteId });
    }

    return qb.getCount();
  }
}
