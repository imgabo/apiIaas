import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UserWhitelist } from 'src/user/userwhitelist.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    UserWhitelist,
    UserEntity,
  ])],
  providers: [UserService],
  controllers: [UserController]
  
})
export class UserModule {}
