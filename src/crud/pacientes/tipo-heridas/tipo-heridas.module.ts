import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoHeridasController } from './tipo-heridas.controller';
import { TipoHeridasEntity } from './tipo-heridas.entity';
import { TipoHeridasService } from './tipo-heridas.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoHeridasEntity])],
  controllers: [TipoHeridasController],
  providers: [TipoHeridasService],
})
export class TipoHeridasModule {}
