import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VigilanciasDipsEntity } from 'src/vigilancias/dips/vigilanciadips.entity';

import { Repository } from 'typeorm';
import { ServiciosEntity } from '../servicios/servicios.entity';

import { NuevoPacienteDto } from './dto/nuevopaciente.dto';
import { PacientesEntity } from './pacientes.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { VigilanciasCirugiasEntity } from 'src/vigilancias/procedimientos-cirugias/vigilanciascirugias.entity';
import { VigilanciasIarepisEntity } from 'src/vigilancias/iarepis/iarepisvigilancias.entity';
import { VigilanciasPaasEntity } from 'src/vigilancias/paas/vigilanciaspaas.entity';
import { ComentariosPacientesEntity } from './comentarios/comentariospacientes.entity';
import { NuevoComentarioPacienteDTO } from './dto/nuevocomentariopaciente.dto';
import { UserEntity } from 'src/crud/user/user.entity';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(PacientesEntity)
    private readonly pacienteRepository: Repository<PacientesEntity>,
    @InjectRepository(ServiciosEntity)
    private readonly servicioRepository: Repository<ServiciosEntity>,
    @InjectRepository(VigilanciasDipsEntity)
    private readonly vigilanciaDipRepository: Repository<VigilanciasDipsEntity>,
    @InjectRepository(VigilanciasCirugiasEntity)
    private readonly vigilanciasCirugiasRepository: Repository<VigilanciasCirugiasEntity>,
    @InjectRepository(VigilanciasIarepisEntity)
    private readonly vigilanciaIarepisRepository : Repository<VigilanciasIarepisEntity>,
    @InjectRepository(VigilanciasPaasEntity)
    private readonly vigilanciaPaasRepository : Repository<VigilanciasPaasEntity>,
    @InjectRepository(ComentariosPacientesEntity)
    private readonly comentariosPacientesRepository : Repository<ComentariosPacientesEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository : Repository<UserEntity>,
  ) {}

  //obtener todos los pacientes
  async getAll(
    options: IPaginationOptions,
  ): Promise<Pagination<PacientesEntity>> {
    return paginate<PacientesEntity>(this.pacienteRepository, options, {
      relations: ['servicioIngreso', 'servicioActual'],
    });
  }

  //obtener info por paciente
  async getPaciente(id: string): Promise<PacientesEntity> {
    const paciente = await this.pacienteRepository.findOne({
      where: [{ id: id }],
      relations: ['servicioIngreso', 'servicioActual'],
    });
    if (!paciente)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Paciente No Existente',
        },
        HttpStatus.FORBIDDEN,
      );
    return paciente;
  }

  //crear paciente
  async create(dto: NuevoPacienteDto): Promise<any> {
    const { rut } = dto;
    const exist = await this.pacienteRepository.findOne({
      where: [{ rut: rut }],
    });

    if (exist)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Paciente Existente',
        },
        HttpStatus.FORBIDDEN,
      );
    const paciente = this.pacienteRepository.create(dto);
    const servicio = await this.servicioRepository.findOne({
      where: [{ id: dto.servicio_ingreso.toString() }],
    });
    paciente.servicioIngreso = servicio;

    return await this.pacienteRepository.insert(paciente);
  }

  // VIGILANCIAS //
  async getVigilanciasDIP(
    id: string,
    options: IPaginationOptions,
  ): Promise<Pagination<VigilanciasDipsEntity>> {
    const paciente = await this.pacienteRepository.findOne({
      where: { id: id },
    });
    if (!paciente)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Paciente No Existente',
        },
        HttpStatus.FORBIDDEN,
      );
    //const vigilancias = await this.vigilanciaDipRepository.find({where: { paciente : paciente}, relations : ['dip', 'paciente', 'usuarioCreacion', 'usuarioRetira']})
    return paginate<VigilanciasDipsEntity>(
      this.vigilanciaDipRepository,
      options,
      {
        where: { paciente: paciente },
        relations: ['dip', 'paciente', 'usuarioCreacion', 'usuarioRetira'],
      },
    );
  }

  async getVigilanciasProcedimientos(
    id: string,
    options: IPaginationOptions,
  ): Promise<Pagination<VigilanciasCirugiasEntity>> {
    const paciente = await this.pacienteRepository.findOne({
      where: { id: id },
    });
    if (!paciente)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Paciente No Existente',
        },
        HttpStatus.FORBIDDEN,
      );
    return paginate<VigilanciasCirugiasEntity>(
      this.vigilanciasCirugiasRepository,
      options,
      {
        where: { paciente: paciente },
        relations: ['procedimiento', 'herida', 'paciente', 'usuarioCreacion'],
      },
    );
  }

  async getVigilanciasIarepis(
    id: string,
    options: IPaginationOptions,
  ): Promise<Pagination<VigilanciasIarepisEntity>> {
    const paciente = await this.pacienteRepository.findOne({
      where: { id: id },
    });
    if (!paciente)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Paciente No Existente',
        },
        HttpStatus.FORBIDDEN,
      );
    return paginate<VigilanciasIarepisEntity>(
      this.vigilanciaIarepisRepository,
      options,
      {
        where: { paciente: paciente },
        relations: ['paciente', 'iarepis', 'usuarioCreacion'],
      },
    );
  }

  async getVigilanciasPaas(
    id: string,
    options: IPaginationOptions,
  ): Promise<Pagination<VigilanciasPaasEntity>> {
    const paciente = await this.pacienteRepository.findOne({
      where: { id: id },
    });
    if (!paciente)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Paciente No Existente',
        },
        HttpStatus.FORBIDDEN,
      );
    return paginate<VigilanciasPaasEntity>(
      this.vigilanciaPaasRepository,
      options,
      {
        where: { paciente: paciente },
        relations: ['paciente', 'paas', 'usuarioCreacion'],
      },
    );
  }


  async agregarComentario(dto: NuevoComentarioPacienteDTO): Promise<any> {
    const comentario = this.comentariosPacientesRepository.create(dto);
    const paciente = await this.pacienteRepository.findOne({
      where: { id: dto.id_paciente },
    });
    const usuarioCreacion = await this.userRepository.findOne({
      where: { id: dto.created_by },
    });
    if (paciente && usuarioCreacion) {
      comentario.paciente = paciente;
      comentario.user = usuarioCreacion;
      return await this.comentariosPacientesRepository.insert(comentario);
    }
    return 'No se pudo insertar comentario';
  }

  async getComentarios(id: string): Promise<ComentariosPacientesEntity[]> {
    const paciente = await this.pacienteRepository.findOne({
      where: { id: id },
    });
    const comentarios = await this.comentariosPacientesRepository.find({
      where: { paciente: paciente },
      relations: ['user'],
    });
    return comentarios;
  }
}
