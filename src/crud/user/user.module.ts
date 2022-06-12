import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserWhitelist } from './userwhitelist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    UserWhitelist,
    UserEntity,
  ])],
  providers: [UserService],
  controllers: [UserController]
  
})
export class UserModule {}
