import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PacientesEntity } from 'src/crud/pacientes/pacientes/pacientes.entity';
import { procedimientosCirugiasEntity } from 'src/crud/pacientes/procedimientos-cirugias/procedimientos-cirugias.entity';
import { TipoHeridasEntity } from 'src/crud/pacientes/tipo-heridas/tipo-heridas.entity';
import { UserEntity } from 'src/crud/user/user.entity';

import { Repository } from 'typeorm';
import { ComentariosCirugiasEntity } from './comentarios/comentarioscirugias.entity';
import { nuevoComentarioDTO } from './dto/nuevocomentariocirugias.dto';
import { NuevaVigilanciaCirugiaDTO } from './dto/nuevovigilanciacirugias.dto';
import { VigilanciasCirugiasEntity } from './vigilanciascirugias.entity';

@Injectable()
export class VigilanciacirugiasService {
  constructor(
    @InjectRepository(VigilanciasCirugiasEntity)
    private readonly vigilanciasCirugiasRepository: Repository<VigilanciasCirugiasEntity>,
    @InjectRepository(PacientesEntity)
    private readonly pacienteRepository: Repository<PacientesEntity>,
    @InjectRepository(procedimientosCirugiasEntity)
    private readonly procedimientoCirugiasRepository: Repository<procedimientosCirugiasEntity>,
    @InjectRepository(TipoHeridasEntity)
    private readonly tipoHeridasRepository: Repository<TipoHeridasEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ComentariosCirugiasEntity)
    private readonly comentarioCirugiaEntity: Repository<ComentariosCirugiasEntity>,
  ) {}

  async getVigilancias(id: string): Promise<VigilanciasCirugiasEntity[]> {
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

    const vigilancias = await this.vigilanciasCirugiasRepository.find({
      where: { paciente: paciente },
      relations: ['procedimiento', 'herida', 'paciente', 'usuarioCreacion'],
    });
    return vigilancias;
  }

  async createVigilancia(dto: NuevaVigilanciaCirugiaDTO): Promise<any> {
    const vigilancia = this.vigilanciasCirugiasRepository.create(dto);
    const procedimiento = await this.procedimientoCirugiasRepository.findOne({
      where: { id: dto.id_procedimiento },
    });
    const herida = await this.tipoHeridasRepository.findOne({
      where: { id: dto.id_herida },
    });
    const paciente = await this.pacienteRepository.findOne({
      where: { id: dto.id_paciente },
    });
    const usuarioCreacion = await this.userRepository.findOne({
      where: { id: dto.id_usuarioCreacion },
    });

    if (procedimiento && herida && paciente && usuarioCreacion) {
      vigilancia.procedimiento = procedimiento;
      vigilancia.herida = herida;
      vigilancia.paciente = paciente;
      vigilancia.usuarioCreacion = usuarioCreacion;
    }
    return await this.vigilanciasCirugiasRepository.insert(vigilancia);
  }

  async agregarComentario(dto: nuevoComentarioDTO) {
    const comentario = this.comentarioCirugiaEntity.create(dto);
    const vigilancia = await this.vigilanciasCirugiasRepository.findOne({
      where: { id: dto.id_procedimiento },
    });
    const usuarioCreacion = await this.userRepository.findOne({
      where: { id: dto.created_by },
    });
    if (vigilancia && usuarioCreacion) {
      comentario.vigilancia = vigilancia;
      comentario.user = usuarioCreacion;
      return await this.comentarioCirugiaEntity.insert(comentario);
    }
    return 'No se pudo insertar comentario';
  }

  async getComentarios(id: string): Promise<ComentariosCirugiasEntity[]> {
    const vigilancia = await this.vigilanciasCirugiasRepository.findOne({
      where: { id: id },
    });
    const comentarios = await this.comentarioCirugiaEntity.find({
      where: { vigilancia: vigilancia },
      relations: ['user'],
    });
    return comentarios;
  }
}
