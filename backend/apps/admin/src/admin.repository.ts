import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AbstractRepository } from "@app/common";
import { Admin } from "./models/admin.entity";

@Injectable()
export class AdminRepository extends AbstractRepository<Admin> {
  protected readonly logger = new Logger(AdminRepository.name);

  constructor(
    @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
  ) {
    super(adminRepository);
  }

}