import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DipController } from './dip.controller';
import { DipEntity } from './dip.entity';
import { DipService } from './dip.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    DipEntity,
  ])],
  providers: [DipService],
  controllers: [DipController]
})
export class DipModule {}
