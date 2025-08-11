import { Injectable, Logger } from '@nestjs/common';
import { UserMessage } from '../models/user_message.entity';
import { AbstractRepository } from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserMessageRepository extends AbstractRepository<UserMessage> {
  protected readonly logger = new Logger(UserMessageRepository.name);

  constructor(
    @InjectRepository(UserMessage)
    private readonly userMessageRepository: Repository<UserMessage>,
  ) {
    super(userMessageRepository);
  }

  async createMessageWithRecipients(
    senderId: number,
    message: string,
    recipientIds: number[],
  ): Promise<{ messageId: string; messageText: string, insertedRecipients: number[] }> {
    const messageEntity = await this.userMessageRepository.save({
      message,
      sender: { id: senderId },
    });

    // Associate recipients with the message
    if (recipientIds.length > 0) {
      await this.userMessageRepository
        .createQueryBuilder()
        .relation(UserMessage, 'recipients')
        .of(messageEntity)
        .add(recipientIds);
    }

    return {
      messageId: messageEntity.id.toString(),
      messageText: messageEntity.message.toString(),
      insertedRecipients: recipientIds,
    };
  }
}
