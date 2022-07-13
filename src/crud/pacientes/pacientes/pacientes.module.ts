import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VigilanciasDipsEntity } from 'src/vigilancias/dips/vigilanciadips.entity';
import { VigilanciasCirugiasEntity } from 'src/vigilancias/procedimientos-cirugias/vigilanciascirugias.entity';
import { ServiciosEntity } from '../servicios/servicios.entity';

import { PacientesController } from './pacientes.controller';

import { PacientesEntity } from './pacientes.entity';
import { PacientesService } from './pacientes.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    PacientesEntity,
    ServiciosEntity,
    VigilanciasDipsEntity,
    VigilanciasCirugiasEntity

  ])],
  providers: [PacientesService],
  controllers: [PacientesController]
})
export class PacientesModule {}
