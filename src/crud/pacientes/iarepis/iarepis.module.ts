import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IarepisController } from './iarepis.controller';
import { IarepisEntity } from './iarepis.entity';
import { IarepisService } from './iarepis.service';

@Module({
  imports: [TypeOrmModule.forFeature([IarepisEntity])],
  controllers: [IarepisController],
  providers: [IarepisService],
})
export class IarepisModule {}
