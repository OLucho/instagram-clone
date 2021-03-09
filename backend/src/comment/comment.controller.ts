import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PhotoService } from 'src/photo/photo.service';
import { GetUser } from 'src/user/decorator/get.user';
import { User } from 'src/user/user.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(
    private commentService: CommentService,
    private photoService: PhotoService,
  ) {}

  @Post('/:photoId')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async createUser(
    @GetUser() user: User,
    @Body() createCommentDto: CreateCommentDto,
    @Param('photoId') photoId: number,
  ) {
    await this.photoService.getPhotoById(photoId);

    const comment = await this.commentService.createComment(
      user,
      photoId,
      createCommentDto,
    );
    return comment;
  }

  @Delete('/:commentId')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async deletePhoto(
    @GetUser() user: User,
    @Param('commentId') commentId: number,
  ) {
    const comment = await this.commentService.getCommentById(commentId);

    return this.commentService.deleteComment(comment, user.id);
  }
}
