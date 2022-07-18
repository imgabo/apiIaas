import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NuevoTipoHeridaDTO } from './dto/nuevoTipoHerida.dto';
import { TipoHeridasEntity } from './tipo-heridas.entity';

@Injectable()
export class TipoHeridasService {
  constructor(
    @InjectRepository(TipoHeridasEntity)
    private readonly tipoHeridaRepository: Repository<TipoHeridasEntity>,
  ) {}

  // obtenemos todos los tipos de heridas
  async getAll(): Promise<TipoHeridasEntity[]> {
    const list = await this.tipoHeridaRepository.find();
    if (!list.length)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'No hay tipos de heridas',
        },
        HttpStatus.FORBIDDEN,
      );
    return list;
  }

  //Buscar por ID

  async findByID(id: string): Promise<TipoHeridasEntity> {
    const tipoHerida = await this.tipoHeridaRepository.findOne({
      where: { id: id },
    });
    if (!tipoHerida)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'No existe',
        },
        HttpStatus.FORBIDDEN,
      );
    return tipoHerida;
  }

  //Crear un tipo de herida

  async create(dto: NuevoTipoHeridaDTO): Promise<any> {
    const { nombre } = dto;
    const exists = await this.tipoHeridaRepository.findOne({
      where: { nombre: nombre },
    });
    if (exists)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Tipo de herida existente',
        },
        HttpStatus.FORBIDDEN,
      );
    const tipoHerida = this.tipoHeridaRepository.create(dto);
    await this.tipoHeridaRepository.insert(tipoHerida);
  }

  //updatear tipo de herida
  async update(id: string, dto: NuevoTipoHeridaDTO): Promise<any> {
    const tipoHerida = await this.findByID(id);
    if (!tipoHerida)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'No existe',
        },
        HttpStatus.FORBIDDEN,
      );
    tipoHerida.nombre
      ? (tipoHerida.nombre = dto.nombre)
      : (tipoHerida.nombre = tipoHerida.nombre);
    await this.tipoHeridaRepository.save(tipoHerida);
  }

  //eliminar un tipo de herida
  async delete(id: string): Promise<any> {
    const tipoHerida = await this.findByID(id);
    await this.tipoHeridaRepository.delete(tipoHerida);
  }
}
