import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { nuevoProcedimientoCirugiaDTO } from './dto/nuevoProcedimientoCirugia.dto';
import { ProcedimientosCirugiasService } from './procedimientos-cirugias.service';

@Controller('procedimientoscirugias')
export class ProcedimientosCirugiasController {
  constructor(
    private readonly procedimientocirugiaSvc: ProcedimientosCirugiasService,
  ) {}

  @Get()
  async getAll() {
    return await this.procedimientocirugiaSvc.getAll();
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('nuevo')
  async create(@Body() dto: nuevoProcedimientoCirugiaDTO) {
    return await this.procedimientocirugiaSvc.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: nuevoProcedimientoCirugiaDTO,
  ) {
    return await this.procedimientocirugiaSvc.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.procedimientocirugiaSvc.delete(id);
  }
}
