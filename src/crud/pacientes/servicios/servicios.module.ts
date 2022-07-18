import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiciosController } from './servicios.controller';
import { ServiciosEntity } from './servicios.entity';
import { ServiciosService } from './servicios.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServiciosEntity])],
  providers: [ServiciosService],
  controllers: [ServiciosController],
})
export class ServiciosModule {}
