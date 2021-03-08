import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';

@Module({
  imports: [UserModule],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
