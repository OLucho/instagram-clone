import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/db.config';
import { UserModule } from './user/user.module';
@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
