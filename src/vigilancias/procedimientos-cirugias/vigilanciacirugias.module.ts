import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientesEntity } from 'src/crud/pacientes/pacientes/pacientes.entity';
import { procedimientosCirugiasEntity } from 'src/crud/pacientes/procedimientos-cirugias/procedimientos-cirugias.entity';
import { TipoHeridasEntity } from 'src/crud/pacientes/tipo-heridas/tipo-heridas.entity';
import { UserEntity } from 'src/crud/user/user.entity';
import { ComentarioscirugiasController } from './comentarios/comentarioscirugias.controller';
import { ComentariosCirugiasEntity } from './comentarios/comentarioscirugias.entity';
import { VigilanciacirugiasController } from './vigilanciacirugias.controller';
import { VigilanciacirugiasService } from './vigilanciacirugias.service';
import { VigilanciasCirugiasEntity } from './vigilanciascirugias.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    VigilanciasCirugiasEntity,
    ComentariosCirugiasEntity,
    TipoHeridasEntity,
    procedimientosCirugiasEntity,
    PacientesEntity,
    UserEntity,
    
  ])],
  controllers: [VigilanciacirugiasController, ComentarioscirugiasController],
  providers: [VigilanciacirugiasService]
})
export class VigilanciacirugiasModule {}
