import {
  Controller,
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
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(
    private likeService: LikeService,
    private photoService: PhotoService,
  ) {}

  @Post('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async handleLike(@Param('id') id: number, @GetUser() user: User) {
    const photo = await this.photoService.getPhotoById(id);

    const like = await this.likeService.findLikeByUserAndPhotoId(
      user.id,
      photo.id,
    );

    if (!like) {
      return this.likeService.addLike(user.id, photo.id);
    } else {
      return this.likeService.removeLike(like);
    }
  }
}
