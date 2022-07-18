import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NuevoPaasDTO } from './dto/paas.dto';
import { PaasEntity } from './paas.entity';

@Injectable()
export class PaasService {
  constructor(
    @InjectRepository(PaasEntity)
    private readonly paasRepository: Repository<PaasEntity>,
  ) {}

  //Obtener todos los paaas
  async getAll(): Promise<PaasEntity[]> {
    const list = await this.paasRepository.find();
    if (!list.length)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'No hay Paas',
        },
        HttpStatus.FORBIDDEN,
      );
    return list;
  }

  //Buscar por id
  async finById(id: string): Promise<PaasEntity> {
    const paas = await this.paasRepository.findOne({ where: { id: id } });
    if (!paas)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'No Existe',
        },
        HttpStatus.FORBIDDEN,
      );
    return paas;
  }

  //crear un paas
  async create(dto: NuevoPaasDTO): Promise<any> {
    const { nombre } = dto;
    const exists = await this.paasRepository.findOne({
      where: { nombre: nombre },
    });
    if (exists)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Paas Existente',
        },
        HttpStatus.FORBIDDEN,
      );
    const paas = this.paasRepository.create(dto);
    await this.paasRepository.insert(paas);
  }

  //updatear paas
  async update(id: string, dto: NuevoPaasDTO): Promise<any> {
    const paas = await this.finById(id);
    if (!paas)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'No Existe',
        },
        HttpStatus.FORBIDDEN,
      );
    dto.nombre ? (paas.nombre = dto.nombre) : (paas.nombre = paas.nombre);
    await this.paasRepository.save(paas);
  }

  //eliminar paas
  async delete(id: string): Promise<any> {
    const paas = await this.finById(id);
    await this.paasRepository.delete(paas);
  }
}
