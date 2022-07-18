import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nuevoProcedimientoCirugiaDTO } from './dto/nuevoProcedimientoCirugia.dto';
import { procedimientosCirugiasEntity } from './procedimientos-cirugias.entity';

@Injectable()
export class ProcedimientosCirugiasService {
  constructor(
    @InjectRepository(procedimientosCirugiasEntity)
    private readonly procedimientoCirugiaRepository: Repository<procedimientosCirugiasEntity>,
  ) {}

  //Obtenemos todos los procedimientos de cirugias
  async getAll(): Promise<procedimientosCirugiasEntity[]> {
    const list = await this.procedimientoCirugiaRepository.find();
    if (!list.length)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'No hay procedimientos de cirugias',
        },
        HttpStatus.FORBIDDEN,
      );
    return list;
  }

  //Buscar por ID

  async findByID(id: string): Promise<procedimientosCirugiasEntity> {
    const procedimiento = await this.procedimientoCirugiaRepository.findOne({
      where: { id: id },
    });
    if (!procedimiento)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'No existe',
        },
        HttpStatus.FORBIDDEN,
      );
    return procedimiento;
  }

  //Crear un procedimiento

  async create(dto: nuevoProcedimientoCirugiaDTO): Promise<any> {
    const { nombre } = dto;
    const exists = await this.procedimientoCirugiaRepository.findOne({
      where: { nombre: nombre },
    });
    if (exists)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Procedimiento existente',
        },
        HttpStatus.FORBIDDEN,
      );
    const procedimiento = this.procedimientoCirugiaRepository.create(dto);
    await this.procedimientoCirugiaRepository.insert(procedimiento);
  }

  //updatear procedimiento
  async update(id: string, dto: nuevoProcedimientoCirugiaDTO): Promise<any> {
    const procedimiento = await this.findByID(id);
    if (!procedimiento)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'No existe',
        },
        HttpStatus.FORBIDDEN,
      );
    procedimiento.nombre
      ? (procedimiento.nombre = dto.nombre)
      : (procedimiento.nombre = procedimiento.nombre);
    await this.procedimientoCirugiaRepository.save(procedimiento);
  }

  //eliminar un procedimiento
  async delete(id: string): Promise<any> {
    const procedimiento = await this.findByID(id);
    await this.procedimientoCirugiaRepository.delete(procedimiento);
  }
}
