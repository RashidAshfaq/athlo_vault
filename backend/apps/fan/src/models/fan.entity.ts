import { AbstractEntity } from '@app/common';
import { User } from 'apps/auth/src/models/users.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('fans')
export class Fans extends AbstractEntity {
  @Column({ type: 'varchar', length: 100, nullable: true })
  fullName: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @OneToOne(() => User, (user) => user.fan, {
    cascade: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'userId',
  })
  user: User;
}
