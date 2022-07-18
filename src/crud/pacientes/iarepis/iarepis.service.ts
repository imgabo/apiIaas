import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NuevoIarepisDTO } from './dto/iarepis.dto';
import { IarepisEntity } from './iarepis.entity';

@Injectable()
export class IarepisService {
  constructor(
    @InjectRepository(IarepisEntity)
    private readonly iarepisRepository: Repository<IarepisEntity>,
  ) {}
  //Obtener todos los Iarepis
  async getAll(): Promise<IarepisEntity[]> {
    const list = await this.iarepisRepository.find();
    if (!list.length)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'No hay Iarepis',
        },
        HttpStatus.FORBIDDEN,
      );
    return list;
  }

  //Buscar por id
  async finById(id: string): Promise<IarepisEntity> {
    const iarepis = await this.iarepisRepository.findOne({ where: { id: id } });
    if (!iarepis)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'No Existe',
        },
        HttpStatus.FORBIDDEN,
      );
    return iarepis;
  }

  //crear un iarepis
  async create(dto: NuevoIarepisDTO): Promise<any> {
    const { nombre } = dto;
    const exists = await this.iarepisRepository.findOne({
      where: { nombre: nombre },
    });
    if (exists)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Iarepis Existente',
        },
        HttpStatus.FORBIDDEN,
      );
    const iarepis = this.iarepisRepository.create(dto);
    await this.iarepisRepository.insert(iarepis);
  }

  //updatear iarepis
  async update(id: string, dto: NuevoIarepisDTO): Promise<any> {
    const iarepis = await this.finById(id);
    if (!iarepis)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'No Existe',
        },
        HttpStatus.FORBIDDEN,
      );
    dto.nombre
      ? (iarepis.nombre = dto.nombre)
      : (iarepis.nombre = iarepis.nombre);
    await this.iarepisRepository.save(iarepis);
  }

  //eliminar iarepis
  async delete(id: string): Promise<any> {
    const iarepis = await this.finById(id);
    await this.iarepisRepository.delete(iarepis);
  }
}
