import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IarepisEntity } from 'src/crud/pacientes/iarepis/iarepis.entity';
import { PacientesEntity } from 'src/crud/pacientes/pacientes/pacientes.entity';
import { UserEntity } from 'src/crud/user/user.entity';
import { Repository } from 'typeorm';
import { ComentariosIarepisEntity } from './comentarios/comentarioIarepis.entity';
import { NuevaVigilanciaIarepisDTO } from './dto/nuevavigilanciaiarepis.dto';
import { nuevoComentarioIarepisDTO } from './dto/nuevocomentarioiarepis.dto';
import { VigilanciasIarepisEntity } from './iarepisvigilancias.entity';

@Injectable()
export class IarepisVigilanciasService {

    constructor(
        @InjectRepository(IarepisEntity)
        private readonly iarepisRepository : Repository<IarepisEntity>,
        @InjectRepository(PacientesEntity)
        private readonly pacienteRepository : Repository<PacientesEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository : Repository<UserEntity>,
        @InjectRepository(VigilanciasIarepisEntity)
        private readonly vigilanciaIarepisRepository : Repository<VigilanciasIarepisEntity>,
        @InjectRepository(ComentariosIarepisEntity)
        private readonly comentarioIarepisRepository : Repository<ComentariosIarepisEntity>
    ){}

   async create(dto : NuevaVigilanciaIarepisDTO) : Promise<any> {
        const vigilancia = this.vigilanciaIarepisRepository.create(dto);
        const paciente = await this.pacienteRepository.findOne({where: {id : dto.id_paciente}});
        const iarepis = await this.iarepisRepository.findOne({where: {id : dto.id_iarepis}});
        const userCreacion = await this.userRepository.findOne({where : {id : dto.id_usuarioCreacion}});
        if(paciente && iarepis && userCreacion ){
            vigilancia.paciente = paciente;
            vigilancia.iarepis = iarepis;
            vigilancia.usuarioCreacion = userCreacion;
            return await this.vigilanciaIarepisRepository.insert(vigilancia);
        } else {
            return 'ocurrio un error';
        }


    }

    async agregarComentario(dto: nuevoComentarioIarepisDTO): Promise<any> {
        const comentario = this.comentarioIarepisRepository.create(dto);
        const vigilancia = await this.vigilanciaIarepisRepository.findOne({
          where: { id: dto.id_vigilancia_iarepis },
        });
        const usuarioCreacion = await this.userRepository.findOne({
          where: { id: dto.created_by },
        });
        if (vigilancia && usuarioCreacion) {
          comentario.vigilancia = vigilancia;
          comentario.user = usuarioCreacion;
          return await this.comentarioIarepisRepository.insert(comentario);
        }
        return 'No se pudo insertar comentario';
      }
    
      async getComentarios(id: string): Promise<ComentariosIarepisEntity[]> {
        const vigilancia = await this.vigilanciaIarepisRepository.findOne({
          where: { id: id },
        });
        const comentarios = await this.comentarioIarepisRepository.find({
          where: { vigilancia: vigilancia },
          relations: ['user'],
        });
        return comentarios;
      }


}
