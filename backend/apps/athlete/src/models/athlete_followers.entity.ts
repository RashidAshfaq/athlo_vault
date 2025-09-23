import { AbstractEntity } from '@app/common';
import { Entity, Column, OneToOne, ManyToOne } from 'typeorm';
import { Athlete } from './athlete.entity';

@Entity('athlete_followers')
export class AthleteFollowers extends AbstractEntity {
  @Column({ type: 'int', default: 0 })
  twitterFollowers: number;

  @Column({ type: 'int', default: 0 })
  instagramFollowers: number;

  @Column({ type: 'int', default: 0 })
  linkedFollowers: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  personalWebsiteUrl: string;

  // @OneToOne(() => Athlete, (athlete) => athlete.socialMedia, {
  //   cascade: true,
  // })
  // athlete: Athlete;

    @ManyToOne(() => Athlete, (athlete) => athlete.socialMedias, {
      onDelete: 'CASCADE',
    })
    athletes: Athlete;
}
