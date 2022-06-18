import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NuevaLocalizacionDTO } from './dto/nuevaLocalizacion.dto';
import { LocalizacionesEntity } from './localizaciones.entity';

@Injectable()
export class LocalizacionesService {

    constructor(
        @InjectRepository(LocalizacionesEntity)
        private readonly localizacionRepository : Repository<LocalizacionesEntity>
    ){}

    //Obtener todos los DIPS
    async getAll(): Promise<LocalizacionesEntity[]>{
        const list = await this.localizacionRepository.find();
        if (!list.length)throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'No hay DIPS',
        }, HttpStatus.FORBIDDEN);
        return list;
    }

    //Buscar por id
    async finById(id : string): Promise<LocalizacionesEntity>{
        const localizacion = await this.localizacionRepository.findOne({ where: {id:id} });
        if (!localizacion)throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'No Existe',
        }, HttpStatus.FORBIDDEN);
        return localizacion;
    }
    
    //crear una localizacion
    async create(dto : NuevaLocalizacionDTO) : Promise<any> {
        const {nombre} = dto;
        const exists = await this.localizacionRepository.findOne({where:{nombre : nombre}});
        if(exists) throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'Localizacion existente',
        }, HttpStatus.FORBIDDEN);
        const localizacion = this.localizacionRepository.create(dto);
        await this.localizacionRepository.insert(localizacion);
    }

    //updatear localizacion
    async update(id:string, dto : NuevaLocalizacionDTO): Promise<any>{
        const localizacion = await this.finById(id);
        if(!localizacion) throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'No Existe',
        }, HttpStatus.FORBIDDEN);
        dto.nombre ? localizacion.nombre = dto.nombre : localizacion.nombre = localizacion.nombre;
        await this.localizacionRepository.save(localizacion);
    }

    //eliminar localizacion
    async delete(id : string): Promise<any>{
        const dip = await this.finById(id);
        await this.localizacionRepository.delete(dip);
    }
}
