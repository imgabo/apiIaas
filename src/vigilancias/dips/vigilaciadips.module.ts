import { Module } from '@nestjs/common';
import { VigilanciaDipsController } from './vigilanciadips.controller';
import { VigilanciaDipsService } from './vigilanciadips.service';

import { VigilanciasDipsEntity } from './vigilanciadips.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientesEntity } from 'src/crud/pacientes/pacientes/pacientes.entity';
import { DipEntity } from 'src/crud/pacientes/dip/dip.entity';
import { UserEntity } from 'src/crud/user/user.entity';
import { ComentariosDipsEntity } from './comentarios/comentario.entity';
import { ComentariosdipsController } from './comentarios/comentariosdips.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ComentariosDipsEntity,
      VigilanciasDipsEntity,
      PacientesEntity,
      DipEntity,
      UserEntity,
    ]),
  ],
  controllers: [VigilanciaDipsController, ComentariosdipsController],
  providers: [VigilanciaDipsService],
})
export class VigilanciaDipsModule {}
