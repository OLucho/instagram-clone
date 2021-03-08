import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/db.config';
import { UserModule } from './user/user.module';
import { PhotoModule } from './photo/photo.module';
@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), UserModule, PhotoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
