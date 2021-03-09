import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './comment.entity';
@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createComment(comment: Comment) {
    return comment.save();
  }

  async findById(id) {
    return this.findOne({ where: { id }, relations: ['user'] });
  }
}
