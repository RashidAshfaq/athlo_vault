import { Logger, NotFoundException } from '@nestjs/common';
import {
  Repository,
  EntityTarget,
  DeepPartial,
  FindOptionsWhere,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';

export abstract class AbstractRepository<T extends AbstractEntity> {
  protected abstract readonly logger: Logger;

  constructor(private readonly repository: Repository<T>) {}

  async create(document: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(document);
    this.logger.log(`Creating a new entity: ${JSON.stringify(entity)}`);
    return await this.repository.save(entity);
  }
  async findOne(where: FindOptionsWhere<T>): Promise<T> {
    this.logger.log(
      `Searching for entity with criteria: ${JSON.stringify(where)}`,
    );
    const document = await this.repository.findOneBy(where);
    if (!document) {
      this.logger.warn(
        `Entity not found with criteria: ${JSON.stringify(where)}`,
      );
      throw new NotFoundException('Entity not found');
    }

    this.logger.log(`Entity found: ${JSON.stringify(document)}`);
    return document;
  }

  async findOneAndUpdate(id: string, updateData: DeepPartial<T>): Promise<T> {
    const numericId = parseInt(id);
    const document = await this.repository.preload({
      id: numericId,
      ...updateData,
    });
    if (!document) {
      this.logger.warn('Document was not found with id', id);
      throw new NotFoundException('Document was not found');
    }
    this.logger.log(
      `Updating entity with id: ${id}, data: ${JSON.stringify(updateData)}`,
    );
    return await this.repository.save(document);
  }

  async findAll(where?: FindOptionsWhere<T>): Promise<T[]> {
    this.logger.log(`Fetching entities with filter: ${JSON.stringify(where)}`);

    // Add a condition to exclude soft-deleted entities
    const conditions = { is_deleted: false, ...where } as FindOptionsWhere<T>;

    return await this.repository.find({ where: conditions });
  }

  async findOneAndDelete(id: string): Promise<void> {
    const numericId = parseInt(id);
    const result = await this.repository.delete(numericId);
    if (result.affected === 0) {
      this.logger.warn('Document was not found with id', id);
      throw new NotFoundException('Document was not found');
    }
    this.logger.log(`Deleted entity with id: ${id}`);
  }
}
