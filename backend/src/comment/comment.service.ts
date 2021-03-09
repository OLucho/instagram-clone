import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { fromDtoToEntity } from './comment.mapper';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
  ) {}
  async createComment(
    user: User,
    photoId: number,
    createCommentDto: CreateCommentDto,
  ) {
    const comment = fromDtoToEntity(createCommentDto, user, photoId);
    const commentCreated = await this.commentRepository.createComment(comment);
    return await this.commentRepository.findById(commentCreated.id);
  }
}
