import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactoresRiesgoController } from './factores_riesgo.controller';
import { FactoresRiesgoEntity } from './factores_riesgo.entity';
import { FactoresRiesgoService } from './factores_riesgo.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    FactoresRiesgoEntity,

  ])],
  providers: [FactoresRiesgoService],
  controllers: [FactoresRiesgoController]
})
export class FactoresRiesgoModule {}
