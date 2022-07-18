import {
  HttpException,
  HttpStatus,
  Injectable,
  ParseEnumPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DipEntity } from './dip.entity';
import { nuevoDipDTO } from './dto/nuevoDip.dto';

@Injectable()
export class DipService {
  constructor(
    @InjectRepository(DipEntity)
    private readonly dipRepository: Repository<DipEntity>,
  ) {}

  //Obtener todos los DIPS
  async getAll(): Promise<DipEntity[]> {
    const list = await this.dipRepository.find();
    if (!list.length)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'No hay DIPS',
        },
        HttpStatus.FORBIDDEN,
      );
    return list;
  }

  //Buscar por id
  async finById(id: string): Promise<DipEntity> {
    const dip = await this.dipRepository.findOne({ where: { id: id } });
    if (!dip)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'No Existe',
        },
        HttpStatus.FORBIDDEN,
      );
    return dip;
  }

  //crear un dip
  async create(dto: nuevoDipDTO): Promise<any> {
    const { nombre } = dto;
    const exists = await this.dipRepository.findOne({
      where: { nombre: nombre },
    });
    if (exists)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Dip existente',
        },
        HttpStatus.FORBIDDEN,
      );
    const dip = this.dipRepository.create(dto);
    await this.dipRepository.insert(dip);
  }

  //updatear dip
  async update(id: string, dto: nuevoDipDTO): Promise<any> {
    const dip = await this.finById(id);
    if (!dip)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'No Existe',
        },
        HttpStatus.FORBIDDEN,
      );
    dto.nombre ? (dip.nombre = dto.nombre) : (dip.nombre = dip.nombre);
    await this.dipRepository.save(dip);
  }

  //eliminar dip
  async delete(id: string): Promise<any> {
    const dip = await this.finById(id);
    await this.dipRepository.delete(dip);
  }
}
