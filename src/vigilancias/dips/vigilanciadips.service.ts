import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DipEntity } from 'src/crud/pacientes/dip/dip.entity';
import { PacientesEntity } from 'src/crud/pacientes/pacientes/pacientes.entity';
import { UserEntity } from 'src/crud/user/user.entity';
import { Repository } from 'typeorm';
import { ComentariosDipsEntity } from './comentarios/comentariosdips/comentario.entity';
import { nuevoComentarioDTO } from './dto/nuevocomentariodips.dto';
import { NuevaVigilanciaDTO } from './dto/nuevovigilanciadips.dto';
import { VigilanciasDipsEntity } from './vigilanciadips.entity';

@Injectable()
export class VigilanciaDipsService {



    constructor(
        @InjectRepository(VigilanciasDipsEntity)
        private readonly vigilanciaDipRepository : Repository<VigilanciasDipsEntity>,
        @InjectRepository(ComentariosDipsEntity)
        private readonly comentarioDipRepository : Repository<ComentariosDipsEntity>,
        @InjectRepository(PacientesEntity)
        private readonly pacienteRepository : Repository<PacientesEntity>,
        @InjectRepository(DipEntity)
        private readonly dipRepository : Repository<DipEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository : Repository<UserEntity>
    ){}



  async getVigilancias ( id : string ) : Promise<VigilanciasDipsEntity[]>{
    const paciente = await this.pacienteRepository.findOne({where: {id : id}})
    if(!paciente) throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Paciente No Existente',
    }, HttpStatus.FORBIDDEN)
    if (paciente) {
      const vigilancias = await this.vigilanciaDipRepository.find({where: { paciente : paciente}, relations : ['dip', 'paciente', 'usuarioCreacion', 'usuarioRetira']})
      return vigilancias;
    }
    
  }

  async create ( dto : NuevaVigilanciaDTO) : Promise<any>{
    const vigilancia = this.vigilanciaDipRepository.create(dto);
    const paciente = await this.pacienteRepository.findOne({where: {id : dto.id_paciente}});
    const dip = await this.dipRepository.findOne({where:{id : dto.id_dip}});
    const userCreacion = await this.userRepository.findOne({where:{id : dto.id_usuarioCreacion}})
    const userRetira = await this.userRepository.findOne({where:{id: dto.id_usuarioRetira}})
    vigilancia.paciente = paciente;
    vigilancia.usuarioCreacion = userCreacion;
    if (userRetira) {
        vigilancia.usuarioRetira = userRetira
    } // esto se hace porque aveces no se ha retirado un dips
    vigilancia.dip = dip;
    return await this.vigilanciaDipRepository.insert(vigilancia);
  }


  async agregarComentario ( dto : nuevoComentarioDTO) : Promise<any>{
    const comentario = this.comentarioDipRepository.create(dto);
    const vigilancia = await this.vigilanciaDipRepository.findOne({where:{id: dto.id_dip}})
    const usuarioCreacion = await this.userRepository.findOne({where:{id : dto.created_by}})
    if ( vigilancia && usuarioCreacion) {
      comentario.vigilancia = vigilancia;
      comentario.user = usuarioCreacion;
      return await this.comentarioDipRepository.insert(comentario);
    }
    return 'No se pudo insertar comentario';
  }

  async getComentarios ( id : string ) : Promise<ComentariosDipsEntity[]>{
    const vigilancia = await this.vigilanciaDipRepository.findOne({where:{id: id}})
    const comentarios = await this.comentarioDipRepository.find({where:{vigilancia : vigilancia}, relations: ['user']})
    return comentarios;
  }
}
