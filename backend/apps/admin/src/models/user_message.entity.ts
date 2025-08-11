import { AbstractEntity } from "@app/common";
import { User } from "apps/auth/src/models/users.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { Admin } from "./admin.entity";

@Entity('user_messages')
export class UserMessage extends AbstractEntity {
  @Column({ type: 'text' })
  message: string;

  @ManyToOne(() => Admin, (admin) => admin.sentMessages, {
    onDelete: 'CASCADE',
  })
   @JoinColumn({ name: 'senderId' })
  sender: Admin;
  /**
   * Recipients: Users who receive this message
   * Custom join table with exact column names: messageId, userId
   */
  @ManyToMany(() => User, (user) => user.receivedMessages, { cascade: false })
  @JoinTable({
    name: 'user_message_recipients',
    joinColumn: { name: 'messageId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  recipients: User[];
}