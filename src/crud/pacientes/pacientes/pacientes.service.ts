import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ServiciosEntity } from '../servicios/servicios.entity';

import { NuevoPacienteDto } from './dto/nuevopaciente.dto';
import { PacientesEntity } from './pacientes.entity';

@Injectable()
export class PacientesService {


    constructor(
        @InjectRepository(PacientesEntity)
      
        private readonly pacienteRepository : Repository<PacientesEntity>,
        @InjectRepository(ServiciosEntity)
        private readonly servicioRepository : Repository<ServiciosEntity>

    ){}



    //obtener todos los pacientes
    async getAll():Promise<PacientesEntity[]>{
        const pacientes = await this.pacienteRepository.find({relations: ['servicioIngreso', 'servicioActual']});
        if(!pacientes.length) throw new NotFoundException();
        return pacientes;
    }

    //obtener info por paciente
    async getPaciente(id : string ): Promise<PacientesEntity> {
        const paciente = await this.pacienteRepository.findOne({where:[{id : id},], relations: ['servicioIngreso', 'servicioActual']});
        if(!paciente) throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'Paciente No Existente',
        }, HttpStatus.FORBIDDEN)
        return paciente;
    }
 
    //crear paciente
    async create(dto : NuevoPacienteDto) : Promise<any> {
        const {rut} = dto;
        const exist = await this.pacienteRepository.findOne({where:[{rut: rut}]});
  
        if(exist) throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'Paciente Existente',
        }, HttpStatus.FORBIDDEN)
        const paciente = this.pacienteRepository.create(dto);
        const servicio = await this.servicioRepository.findOne({where:[{id:dto.servicio_ingreso.toString()}]})
        paciente.servicioIngreso = servicio;

        return await this.pacienteRepository.insert(paciente);

    }



}
