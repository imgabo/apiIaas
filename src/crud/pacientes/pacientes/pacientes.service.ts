import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NuevoPacienteDto } from './dto/nuevopaciente.dto';
import { PacientesEntity } from './pacientes.entity';

@Injectable()
export class PacientesService {


    constructor(
        @InjectRepository(PacientesEntity)
        private readonly pacienteRepository : Repository<PacientesEntity>
    ){}



    //obtener todos los pacientes
    async getAll():Promise<PacientesEntity[]>{
        const pacientes = await this.pacienteRepository.find();
        if(!pacientes.length) throw new NotFoundException();
        return pacientes;
    }


    // Obtener infomracion de un paciente 
    async getPaciente(paciente : NuevoPacienteDto): Promise<any>{
        const id = paciente.id;
        const exist = await this.pacienteRepository.findOne({where:[{id : id}]});
        if(!exist) throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'No existe el paciente',
        }, HttpStatus.FORBIDDEN);
        return exist;
    }
}
