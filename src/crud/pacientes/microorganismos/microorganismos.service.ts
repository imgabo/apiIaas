import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NuevoMicroorganismoDTO } from './dto/microorganismos.dto';
import { MicroorganismosEntity } from './microorganismos.entity';

@Injectable()
export class MicroorganismosService {


    constructor(
        @InjectRepository(MicroorganismosEntity)
        private readonly microorganismoRepository : Repository<MicroorganismosEntity>
    ){}
    //Obtener todos los microorganismos
    async getAll(): Promise<MicroorganismosEntity[]>{
        const list = await this.microorganismoRepository.find();
        if (!list.length)throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'No hay Microorganismos',
        }, HttpStatus.FORBIDDEN);
        return list;
    }

    //Buscar por id
    async finById(id : string): Promise<MicroorganismosEntity>{
        const microorganismo = await this.microorganismoRepository.findOne({ where: {id:id} });
        if (!microorganismo)throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'No Existe',
        }, HttpStatus.FORBIDDEN);
        return microorganismo;
    }
    
    //crear un microorganismo
    async create(dto : NuevoMicroorganismoDTO) : Promise<any> {
        const {nombre} = dto;
        const exists = await this.microorganismoRepository.findOne({where:{nombre : nombre}});
        if(exists) throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'Microorganismo Existente',
        }, HttpStatus.FORBIDDEN);
        const microorganismo = this.microorganismoRepository.create(dto);
        await this.microorganismoRepository.insert(microorganismo);
    }

    //updatear microorganismo
    async update(id:string, dto:NuevoMicroorganismoDTO): Promise<any>{
        const microorganismo = await this.finById(id);
        if(!microorganismo) throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'No Existe',
        }, HttpStatus.FORBIDDEN);
        dto.nombre ? microorganismo.nombre = dto.nombre : microorganismo.nombre = microorganismo.nombre;
        await this.microorganismoRepository.save(microorganismo);
    }

    //eliminar microorganismo
    async delete(id : string): Promise<any>{
        const microorganismo = await this.finById(id);
        await this.microorganismoRepository.delete(microorganismo);
    }


}
