import { Photo } from 'src/photo/photo.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Like } from 'src/like/like.entity';
import { Comment } from 'src/comment/comment.entity';
import { Follow } from 'src/follow/follow.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Follow, (follow) => follow.userTo)
  followers: Follow[];

  @OneToMany(() => Follow, (follow) => follow.userFrom)
  following: Follow[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
