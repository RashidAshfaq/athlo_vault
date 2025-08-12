import { Injectable, Logger } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from '@app/common';
import {
  PurchaseRequest,
  PurchaseRequestStatus,
} from '../models/purchase_request.entity';
import { BulkRequestsStatusDto } from 'apps/admin/src/dtos/bulk-request-status.dto';

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
      .where('pr.requestStatus = :status', {
        status: PurchaseRequestStatus.PENDING,
      })
      .andWhere('COALESCE(pr.is_deleted, false) = false');

    if (athleteId) {
      qb.leftJoinAndSelect('athlete', 'ath');
      qb.andWhere('ath.id = :athleteId', { athleteId });
    }

    return qb.getCount();
  }

  async getPurchaseRequests(
    page = 1,
    limit = 10,
  ): Promise<{
    data: PurchaseRequest[];
    meta: {
      page: number;
      per_page: number;
      total: number;
      total_pages: number;
    };
  }> {
    const p = Math.max(Number(page) || 1, 1);
    const per = Math.min(Math.max(Number(limit) || 10, 1), 100);

    const [rows, total] = await this.requestRepository.findAndCount({
      where: { is_deleted: false } as any,
      relations: ['approvedBy', 'athlete'],
      order: { created_at: 'DESC' },
      skip: (p - 1) * per,
      take: per,
    });

    return {
      data: rows,
      meta: {
        page: p,
        per_page: per,
        total,
        total_pages: Math.max(Math.ceil(total / per), 1),
      },
    };
  }

  async updatePurchaseRequests(
    dto: BulkRequestsStatusDto,
    performedById: number,
  ): Promise<BulkResult> {
    const ids = Array.from(new Set(dto.purchaseIds || [])).filter((n) =>
      Number.isFinite(n),
    );
    if (ids.length === 0) {
      return {
        updated: 0,
        notFound: 0,
        alreadyInStatus: 0,
        targetStatus:
          dto.status === 'approved'
            ? PurchaseRequestStatus.APPROVED
            : PurchaseRequestStatus.REJECTED,
        updatedIds: [],
        requests: []
      };
    }

    const targetStatus =
      dto.status === 'approved'
        ? PurchaseRequestStatus.APPROVED
        : PurchaseRequestStatus.REJECTED;

    // Load only existing + not soft-deleted rows
    const existing = await this.requestRepository.find({
      where: { id: In(ids), is_deleted: false } as any,
      select: ['id', 'requestStatus'], // minimal load
      relations: [], // none needed
    });

    const existingIds = new Set(existing.map((r) => r.id));
    const notFound = ids.length - existing.length;

    // Only update those not already in the target status
    const toUpdateIds = existing
      .filter((r) => r.requestStatus !== targetStatus)
      .map((r) => r.id);

    const alreadyInStatus = existing.length - toUpdateIds.length;

    let updated = 0;
    let requests: any;
    const updatedIds: number[] = [];
    const now = new Date();

    // Save in chunks to avoid huge payloads
    for (const batch of this.chunk(toUpdateIds, 300)) {
      const partials = batch.map((id) =>
        this.requestRepository.create({
          id,
          requestStatus: targetStatus,
          reviewedOn: now,
          admin_note: dto.note,
          approvedBy: { id: performedById } as any,
        }),
      );

      const saved = await this.requestRepository.save(partials, { chunk: 100 });
      updated += saved.length;
      requests = saved;
      saved.forEach((s) => updatedIds.push(s.id));
    }

    return { updated, notFound, alreadyInStatus, targetStatus, updatedIds , requests};
  }

  private chunk<T>(arr: T[], size = 300): T[][] {
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  }
}

type BulkResult = {
  updated: number;
  notFound: number;
  alreadyInStatus: number;
  targetStatus: PurchaseRequestStatus;
  updatedIds: number[];
  requests: any,
};
