import { Module } from '@nestjs/common';
import { VigilanciaspaasController } from './vigilanciaspaas.controller';
import { VigilanciaspaasService } from './vigilanciaspaas.service';
import { ComentariospaasController } from './comentarios/comentariospaas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientesEntity } from 'src/crud/pacientes/pacientes/pacientes.entity';
import { PaasEntity } from 'src/crud/pacientes/paas/paas.entity';
import { VigilanciasPaasEntity } from './vigilanciaspaas.entity';
import { UserEntity } from 'src/crud/user/user.entity';
import { ComentariosPaasEntity } from './comentarios/comentariospaas.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PacientesEntity,
      PaasEntity,
      VigilanciasPaasEntity,
      UserEntity,
      ComentariosPaasEntity
    ]),
  ],
  controllers: [VigilanciaspaasController, ComentariospaasController],
  providers: [VigilanciaspaasService]
})
export class VigilanciaspaasModule {}
