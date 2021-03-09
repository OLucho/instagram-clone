import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { LikeService } from 'src/like/like.service';
import { GetUser } from 'src/user/decorator/get.user';
import { User } from 'src/user/user.entity';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
  constructor(
    private photoService: PhotoService,
    private likeService: LikeService,
  ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
    @Body() body: any,
  ) {
    const key = file.buffer.toString('base64');
    const photoBody = body.body;

    return await this.photoService.uploadPhoto(key, user, photoBody);
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async viewPhoto(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ photo: Photo; isAuthor: boolean; isLiked: boolean }> {
    const photo = await this.photoService.getPhotoById(id);
    let isAuthor = false;
    if (photo.userId === user.id) {
      isAuthor = true;
    }

    let isLiked = false;
    const like = await this.likeService.findLikeByUserAndPhotoId(
      user.id,
      photo.id,
    );
    if (like) {
      isLiked = true;
    }

    return { photo, isAuthor, isLiked };
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async DeletePhoto(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.photoService.deletePhotoById(id, user);
  }
}
