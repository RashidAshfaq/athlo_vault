import { Injectable } from '@nestjs/common';
import { UserMessageRepository } from './user_messages.repository';
import { SendUserMessageDto } from '../dtos/send-user-message.dto';

@Injectable()
export class UserMessageService {
  constructor(private readonly userMessageRepo: UserMessageRepository) {}

  async sendMessageToUsers(requesterUserId: number, dto: SendUserMessageDto) {
    const { message, userIds } = dto;

    const uniqueUserIds = [...new Set(userIds)].slice(0, 2000);

    const { messageId, messageText, insertedRecipients } =
      await this.userMessageRepo.createMessageWithRecipients(
        requesterUserId,
        message,
        uniqueUserIds,
      );

    return {
      messageId,
      message: messageText,
      recipients: insertedRecipients,
    };
  }
}
