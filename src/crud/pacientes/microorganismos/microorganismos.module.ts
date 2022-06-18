import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MicroorganismosController } from './microorganismos.controller';
import { MicroorganismosEntity } from './microorganismos.entity';
import { MicroorganismosService } from './microorganismos.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    MicroorganismosEntity,
  ])],
  controllers: [MicroorganismosController],
  providers: [MicroorganismosService]
})
export class MicroorganismosModule {}
