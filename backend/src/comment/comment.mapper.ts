import { User } from 'src/user/user.entity';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/comment.dto';

export function fromDtoToEntity(
  createCommentDto: CreateCommentDto,
  user: User,
  photoId: number,
): Comment {
  const comment = new Comment();
  comment.body = createCommentDto.body;
  comment.photoId = photoId;
  comment.userId = user.id;
  return comment;
}
