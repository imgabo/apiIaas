import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IarepisEntity } from 'src/crud/pacientes/iarepis/iarepis.entity';
import { PacientesEntity } from 'src/crud/pacientes/pacientes/pacientes.entity';
import { UserEntity } from 'src/crud/user/user.entity';
import { ComentariosIarepisEntity } from './comentarios/comentarioIarepis.entity';

import { ComentariosiarepisController } from './comentarios/comentariosiarepis.controller';
import { IarepisVigilanciasController } from './iarepisvigilancias.controller';
import { VigilanciasIarepisEntity } from './iarepisvigilancias.entity';
import { IarepisVigilanciasService } from './iarepisvigilancias.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PacientesEntity,
      IarepisEntity,
      VigilanciasIarepisEntity,
      UserEntity,
      ComentariosIarepisEntity
    ]),
  ],
  controllers: [IarepisVigilanciasController, ComentariosiarepisController],
  providers: [IarepisVigilanciasService]
})
export class IarepisVigilanciasModule {}
