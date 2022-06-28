import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NuevoPacienteDto } from './dto/nuevopaciente.dto';
import { PacientesService } from './pacientes.service';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacienteSvc: PacientesService) {}

  //OBTENER TODOS LOS USUARIOS//
  @Get()
  async getAll() {
    return this.pacienteSvc.getAll();
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
}
