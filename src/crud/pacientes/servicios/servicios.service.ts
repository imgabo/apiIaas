import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nuevoServicioDto } from './dto/nuevoservicio.dto';
import { ServiciosEntity } from './servicios.entity';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(ServiciosEntity)
    private readonly serviciosRepository: Repository<ServiciosEntity>,
  ) {}

  //Obtener todos los servicios
  async getAll(): Promise<ServiciosEntity[]> {
    const servicios = await this.serviciosRepository.find();
    if (!servicios.length) throw new NotFoundException();
    return servicios;
  }

  //Crear nuevo servicio
  async create(dto: nuevoServicioDto): Promise<any> {
    const { nombre } = dto;
    const exists = await this.serviciosRepository.findOne({
      where: [{ nombre: nombre }],
    });
    if (exists)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Servicio Existente',
        },
        HttpStatus.FORBIDDEN,
      );
    return await this.serviciosRepository.insert(dto);
  }

  //Buscar por id
  async finById(id: string): Promise<ServiciosEntity> {
    const servicio = await this.serviciosRepository.findOne({
      where: { id: id },
    });
    if (!servicio)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'No Existe',
        },
        HttpStatus.FORBIDDEN,
      );
    return servicio;
  }

  //Eliminar servicio
  async delete(dto: nuevoServicioDto): Promise<any> {
    const { nombre } = dto;
    const servicio = await this.serviciosRepository.findOne({
      where: [{ nombre: nombre }],
    });
    if (!servicio)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Servicio No Encontrado',
        },
        HttpStatus.FORBIDDEN,
      );
    return await this.serviciosRepository.delete(servicio);
  }

  //Actualizar un servicio
  async update(dto: nuevoServicioDto, nombreNuevo: string): Promise<any> {
    const { nombre } = dto;
    const servicio = await this.serviciosRepository.findOne({
      where: [{ nombre: nombre }],
    });

    servicio.nombre = nombreNuevo;
    return await this.serviciosRepository.save(servicio);
  }
}
