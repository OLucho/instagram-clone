import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { PhotoController } from './photo.controller';
import { PhotoRepository } from './photo.repository';
import { PhotoService } from './photo.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoRepository]), UserModule],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [PhotoService],
})
export class PhotoModule {}
