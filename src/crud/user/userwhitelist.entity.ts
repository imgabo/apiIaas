import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('users-whitelist')
export class UserWhitelist {
  @PrimaryGeneratedColumn('increment')
  id: string;
  @Column({ type: Boolean, nullable: false, default: false })
  status: boolean;

  @OneToOne(() => UserEntity, (user) => user.whitelist)
  @JoinColumn({ name: 'userwhitelist_id' })
  user: UserEntity;
}
