import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Comment } from './comment.entity';
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
  ): Promise<Comment> {
    const comment = fromDtoToEntity(createCommentDto, user, photoId);
    const commentCreated = await this.commentRepository.createComment(comment);
    return await this.commentRepository.findById(commentCreated.id);
  }

  async getCommentById(id: number): Promise<Comment> {
    const comment = await this.commentRepository.getCommentById(id);
    if (!comment) {
      throw new NotFoundException('Comment not Found');
    }
    return comment;
  }

  async deleteComment(comment: Comment, userId: number): Promise<void> {
    if (comment.userId !== userId) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.commentRepository.deleteComment(comment);
  }
}
