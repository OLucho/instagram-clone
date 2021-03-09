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

  async deleteComment(comment: Comment): Promise<void> {
    this.delete(comment);
  }
}
