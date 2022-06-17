import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcedimientosCirugiasController } from './procedimientos-cirugias.controller';
import { procedimientosCirugiasEntity } from './procedimientos-cirugias.entity';
import { ProcedimientosCirugiasService } from './procedimientos-cirugias.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    procedimientosCirugiasEntity,
  ])],
  controllers: [ProcedimientosCirugiasController],
  providers: [ProcedimientosCirugiasService],
})
export class ProcedimientosCirugiasModule {}
