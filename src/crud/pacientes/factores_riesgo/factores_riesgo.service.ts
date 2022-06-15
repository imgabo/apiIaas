import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nuevoFactorRiesgoDto } from './dto/nuevoFactorRiesgo.dto';
import { FactoresRiesgoEntity } from './factores_riesgo.entity';

@Injectable()
export class FactoresRiesgoService {


    constructor(
        @InjectRepository(FactoresRiesgoEntity)
        private readonly factoresRiesgoRepository : Repository<FactoresRiesgoEntity>
    ){}

    //Obtener todos los factores de riesgo

    async getAll():Promise<FactoresRiesgoEntity[]>{
        const factores = await this.factoresRiesgoRepository.find();
        if (!factores.length) throw new NotFoundException();
        return factores;
    }


    //crear nuevo factor de riesgo
    async create(dto : nuevoFactorRiesgoDto): Promise<any>{
        const {descripcion,tipo}= dto;
        const exist = await this.factoresRiesgoRepository.findOne({where:[{tipo:tipo}, {descripcion:descripcion}]});
        if(exist) throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'Factor de Riesgo Existente',
        }, HttpStatus.FORBIDDEN);
        return await this.factoresRiesgoRepository.insert(dto);
    }

    //eliminar factor de riesgo

    async delete(dto: nuevoFactorRiesgoDto): Promise<any>{
        const {descripcion} = dto;
        const exist = await this.factoresRiesgoRepository.findOne({where:[{descripcion:descripcion}]});
        if(!exist) throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'Factor de Riesgo no Existe',
        }, HttpStatus.FORBIDDEN);
        
        return await this.factoresRiesgoRepository.delete(dto);
    }

    async findByid(id : string): Promise<FactoresRiesgoEntity>{
        const factor = await this.factoresRiesgoRepository.findOne({where:[{id:id}]});
        if(!factor) throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'Factor de Riesgo no Existe',
        }, HttpStatus.FORBIDDEN);
        return factor;
    }
    
    
    // actualizar factor de riesgo
    async update(id : string, dto: nuevoFactorRiesgoDto): Promise<any>{
        const factor = await this.findByid(id)
        if(!factor) throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'Factor de Riesgo no Existe',
        }, HttpStatus.FORBIDDEN);
        dto.tipo ? factor.tipo = dto.tipo : factor.tipo = factor.tipo
        dto.descripcion ? factor.descripcion = dto.descripcion : factor.descripcion = factor.descripcion
        return await this.factoresRiesgoRepository.save(factor);
    }




}
