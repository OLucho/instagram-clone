import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './comment.entity';
@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createComment(comment: Comment): Promise<Comment> {
    return comment.save();
  }

  async findById(id: number): Promise<Comment> {
    return this.findOne({ where: { id }, relations: ['user'] });
  }

  async getCommentById(id: number): Promise<Comment> {
    return this.findOne({ where: { id } });
  }

  async deleteComment(comment: Comment) {
    const result = await this.delete({ id: comment.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Comment not found`);
    }
  }
}
