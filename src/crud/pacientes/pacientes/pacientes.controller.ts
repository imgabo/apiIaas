import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ServiciosEntity } from '../servicios/servicios.entity';
import { NuevoPacienteDto } from './dto/nuevopaciente.dto';
import { PacientesEntity } from './pacientes.entity';
import { PacientesService } from './pacientes.service';

@Controller('pacientes')
export class PacientesController {

    constructor(private readonly pacienteSvc : PacientesService){}

    //OBTENER TODOS LOS USUARIOS
    @Get()
    async getAll(){
        return this.pacienteSvc.getAll();
    }

    @UsePipes(new ValidationPipe({whitelist:true}))
    @Post("nuevo")
    async create(@Body() dto : NuevoPacienteDto){
      console.log(dto.servicio_ingreso);
      return await this.pacienteSvc.create(dto);
       
    }
}
