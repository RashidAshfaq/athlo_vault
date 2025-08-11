import { AbstractEntity } from '@app/common';
import { User } from 'apps/auth/src/models/users.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { UserMessage } from './user_message.entity';

@Entity('admins')
export class Admin extends AbstractEntity {
  @Column({ type: 'varchar', length: 100, nullable: true })
  fullName: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @OneToOne(() => User, (user) => user.admin, {
    cascade: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'userId',
  })
  user: User;

  @OneToMany(() => UserMessage, (m) => m.sender, {
    cascade: true,
  })
  sentMessages: UserMessage[];
}
