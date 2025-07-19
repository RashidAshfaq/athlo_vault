import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordService {
  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    if (!hashedPassword)
      throw new BadRequestException(
        `You haven't set a password yet. Please set your password first to continue.`,
      );
    return bcrypt.compare(password, hashedPassword);
  }
}
