import { Photo } from 'src/photo/photo.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  photoId: number;

  @ManyToOne(() => Photo, (photo) => photo.likes, { onDelete: 'CASCADE' })
  photo: Photo;

  @OneToMany(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
