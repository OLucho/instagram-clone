import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Follow extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userToId: number;

  @Column()
  userFromId: number;

  @ManyToOne(() => User, (user) => user.followers)
  userTo: User[];

  @ManyToOne(() => User, (user) => user.following)
  userFrom: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
