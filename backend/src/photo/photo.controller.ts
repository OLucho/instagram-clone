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
import { GetUser } from 'src/user/decorator/get.user';
import { User } from 'src/user/user.entity';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
  constructor(private photoService: PhotoService) {}

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

    return this.photoService.uploadPhoto(key, user, photoBody);
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async viewPhoto(@Param('id') id: number, @GetUser() user: User) {
    return this.photoService.getPhotoById(id, user);
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
