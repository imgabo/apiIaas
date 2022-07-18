import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalizacionesController } from './localizaciones.controller';
import { LocalizacionesEntity } from './localizaciones.entity';
import { LocalizacionesService } from './localizaciones.service';

@Module({
  imports: [TypeOrmModule.forFeature([LocalizacionesEntity])],
  controllers: [LocalizacionesController],
  providers: [LocalizacionesService],
})
export class LocalizacionesModule {}
