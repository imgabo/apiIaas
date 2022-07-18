import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaasController } from './paas.controller';
import { PaasEntity } from './paas.entity';
import { PaasService } from './paas.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaasEntity])],
  controllers: [PaasController],
  providers: [PaasService],
})
export class PaasModule {}
