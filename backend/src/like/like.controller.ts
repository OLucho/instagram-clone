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
  async saveLike(@Param('id') id: number, @GetUser() user: User) {
    return await this.photoService.getPhotoById(id);
  }
}
