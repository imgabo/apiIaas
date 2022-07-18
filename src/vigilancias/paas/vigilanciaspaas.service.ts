import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaasEntity } from 'src/crud/pacientes/paas/paas.entity';
import { PacientesEntity } from 'src/crud/pacientes/pacientes/pacientes.entity';
import { UserEntity } from 'src/crud/user/user.entity';
import { Repository } from 'typeorm';
import { ComentariosPaasEntity } from './comentarios/comentariospaas.entity';
import { NuevaVigilanciaPaasDTO } from './dto/nuevavigilanciapaas.dto';
import { nuevoComentarioPaasDTO } from './dto/nuevocomentariopaas.dto';
import { VigilanciasPaasEntity } from './vigilanciaspaas.entity';

@Injectable()
export class VigilanciaspaasService {

    constructor(
        @InjectRepository(PaasEntity)
        private readonly paasRepository : Repository<PaasEntity>,
        @InjectRepository(PacientesEntity)
        private readonly pacienteRepository : Repository<PacientesEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository : Repository<UserEntity>,
        @InjectRepository(VigilanciasPaasEntity)
        private readonly vigilanciaPaasRepository : Repository<VigilanciasPaasEntity>,
        @InjectRepository(ComentariosPaasEntity)
        private readonly comentarioPaasRepository : Repository<ComentariosPaasEntity>
    ) {}

    async create( dto : NuevaVigilanciaPaasDTO) : Promise<any>{
        const vigilancia = this.vigilanciaPaasRepository.create(dto);
        const paciente = await this.pacienteRepository.findOne({where: {id : dto.id_paciente}});
        const paas = await this.paasRepository.findOne({where:{id: dto.id_paas}});
        const userCreacion = await this.userRepository.findOne({where : {id : dto.id_usuarioCreacion}});
        if(paciente && paas && userCreacion ){
            vigilancia.paciente = paciente;
            vigilancia.paas = paas;
            vigilancia.usuarioCreacion = userCreacion;
            return await this.vigilanciaPaasRepository.insert(vigilancia);
        }else {
            return 'Ocurrio un error';
        }
    }

    async agregarComentario(dto : nuevoComentarioPaasDTO) : Promise<any>{
        const comentario = this.comentarioPaasRepository.create(dto);
        const vigilancia = await this.vigilanciaPaasRepository.findOne({where:{id: dto.id_vigilancia_paas}});
        const usuarioCreacion = await this.userRepository.findOne({where:{id: dto.created_by}});
        if (vigilancia && usuarioCreacion) {
            comentario.vigilancia = vigilancia;
            comentario.user = usuarioCreacion;
            return await this.comentarioPaasRepository.insert(comentario);
          }
          return 'No se pudo insertar comentario';
    }

    async getComentarios(id: string): Promise<ComentariosPaasEntity[]> {
        const vigilancia = await this.vigilanciaPaasRepository.findOne({
          where: { id: id },
        });
        const comentarios = await this.comentarioPaasRepository.find({
          where: { vigilancia: vigilancia },
          relations: ['user'],
        });
        return comentarios;
      }


}
