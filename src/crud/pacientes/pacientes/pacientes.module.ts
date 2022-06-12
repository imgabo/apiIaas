import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientesController } from './pacientes.controller';

import { PacientesEntity } from './pacientes.entity';
import { PacientesService } from './pacientes.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    PacientesEntity,

  ])],
  providers: [PacientesService],
  controllers: [PacientesController]
})
export class PacientesModule {}
