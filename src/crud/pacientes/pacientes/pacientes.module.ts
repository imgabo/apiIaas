import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/crud/user/user.entity';
import { VigilanciasDipsEntity } from 'src/vigilancias/dips/vigilanciadips.entity';
import { VigilanciasIarepisEntity } from 'src/vigilancias/iarepis/iarepisvigilancias.entity';
import { VigilanciasPaasEntity } from 'src/vigilancias/paas/vigilanciaspaas.entity';

import { VigilanciasCirugiasEntity } from 'src/vigilancias/procedimientos-cirugias/vigilanciascirugias.entity';
import { ServiciosEntity } from '../servicios/servicios.entity';
import { ComentariosPacientesEntity } from './comentarios/comentariospacientes.entity';

import { PacientesController } from './pacientes.controller';

import { PacientesEntity } from './pacientes.entity';
import { PacientesService } from './pacientes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PacientesEntity,
      ServiciosEntity,
      VigilanciasDipsEntity,
      VigilanciasCirugiasEntity,
      VigilanciasIarepisEntity,
      VigilanciasPaasEntity,
      ComentariosPacientesEntity,
      UserEntity

    ]),
  ],
  providers: [PacientesService],
  controllers: [PacientesController],
})
export class PacientesModule {}
