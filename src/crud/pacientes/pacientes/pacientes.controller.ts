import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { VigilanciasDipsEntity } from 'src/vigilancias/dips/vigilanciadips.entity';
import { VigilanciasCirugiasEntity } from 'src/vigilancias/procedimientos-cirugias/vigilanciascirugias.entity';
import { NuevoPacienteDto } from './dto/nuevopaciente.dto';
import { PacientesEntity } from './pacientes.entity';
import { PacientesService } from './pacientes.service';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacienteSvc: PacientesService) {}

  //OBTENER TODOS LOS USUARIOS//
  @Get()
  async getAll(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<PacientesEntity>> {
    limit = limit > 100 ? 100 : limit;
    return this.pacienteSvc.getAll({ page, limit });
  }

  //OBTENER USUARIO POR ID //
  @Get(':id')
  async getPaciente(@Param('id') id : string){
    return await this.pacienteSvc.getPaciente(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('nuevo')
  async create(@Body() dto: NuevoPacienteDto) {
    return await this.pacienteSvc.create(dto);
  }

// VIGILANCIAS
  @Get('vigilancias-dips/:id') // vigilancias-dips/id
  async getDips(@Param('id') user : string, @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
  @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,): Promise<Pagination<VigilanciasDipsEntity>> {
    limit = limit > 100 ? 100 : limit;
      return await this.pacienteSvc.getVigilanciasDIP(user, {page, limit});
  }

  @Get('vigilancias-procedimientos/:id')
  async getProcedimientos(@Param(':id') id : string,
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
  @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10) : Promise<Pagination<VigilanciasCirugiasEntity>>{
    return this.pacienteSvc.getVigilanciasProcedimientos(id, {page , limit});
  }
}
