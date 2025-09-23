import { Injectable } from '@nestjs/common';
import { PurchaseRequestRepository } from './purchase_request.repository';
import { CreatePurchaseRequestDto } from './dtos/purchase_request.dto';
import { PurchaseRequestStatus } from '../models/purchase_request.entity';
import { AthleteUpdate } from '../models/athlete_updates.entity';

@Injectable()
export class PurchaseRequestService {
  constructor(private readonly requestRepo: PurchaseRequestRepository) {}

  async createPurchaseRequest(athlete: any, dto: CreatePurchaseRequestDto) {
    const req = {
      ...dto,
      athlete,
      requestStatus: dto.requestStatus || undefined,
      submitDate: dto.submitDate || undefined,
    };

    const result = await this.requestRepo.create(req);

     AthleteUpdate.create({
      title: 'Purchase Request Submitted',
      description: `Athlete submitted a purchase request for ${dto.itemServiceDescription} (Amount: $${dto.amount})`,
      athlete,
    }).save();

    return result;
  }

  async getAthleteRequestsWithOverview(athleteId: number) {
    const requests = await this.requestRepo.findAllByAthleteId(athleteId);

    // Calculate totals
    let totalRequested = 0;
    let totalApproved = 0;
    let totalPendingReview = 0;

    for (const req of requests) {
      totalRequested += req.amount;
      if (req.requestStatus === PurchaseRequestStatus.APPROVED) {
        totalApproved += req.amount;
      }
      if (
        req.requestStatus === PurchaseRequestStatus.UNDER_REVIEW ||
        req.requestStatus === PurchaseRequestStatus.PENDING
      ) {
        totalPendingReview += req.amount;
      }
    }

    return {
      overview: {
        totalRequestedAmount: totalRequested,
        totalApprovedAmount: totalApproved,
        totalPendingReviewAmount: totalPendingReview,
      },
      requests,
    };
  }

  async getPendingPurchaseRequestCount() {
    return await this.requestRepo.getPendingPurchaseRequestCount();
  }

  async getPurchaseRequests(page: number, limit: number) {
    return await this.requestRepo.getPurchaseRequests(page, limit);
  }

  async updatePurchaseRequests(dto: any, performedById: number) {
    return await this.requestRepo.updatePurchaseRequests(dto, performedById);
  }
}
