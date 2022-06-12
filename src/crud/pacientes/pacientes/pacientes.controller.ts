import { Controller, Get, Param } from '@nestjs/common';
import { NuevoPacienteDto } from './dto/nuevopaciente.dto';
import { PacientesEntity } from './pacientes.entity';
import { PacientesService } from './pacientes.service';

@Controller('pacientes')
export class PacientesController {

    constructor(private readonly pacienteSvc : PacientesService){}

    //OBTENER TODOS LOS USUARIOS
    @Get()
    getAll(){
        return this.pacienteSvc.getAll();
    }

    //Get paciente por ID
    @Get(":id")
    async getPaciente(@Param() paciente : NuevoPacienteDto):Promise<PacientesEntity>{
        return await this.pacienteSvc.getPaciente(paciente);
    }
}
