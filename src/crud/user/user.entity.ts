import { hash } from 'bcrypt';
import { ComentariosDipsEntity } from 'src/vigilancias/dips/comentarios/comentario.entity';

import { VigilanciasDipsEntity } from 'src/vigilancias/dips/vigilanciadips.entity';
import { ComentariosIarepisEntity } from 'src/vigilancias/iarepis/comentarios/comentarioIarepis.entity';

import { VigilanciasIarepisEntity } from 'src/vigilancias/iarepis/iarepisvigilancias.entity';
import { ComentariosPaasEntity } from 'src/vigilancias/paas/comentarios/comentariospaas.entity';
import { VigilanciasPaasEntity } from 'src/vigilancias/paas/vigilanciaspaas.entity';
import { ComentariosCirugiasEntity } from 'src/vigilancias/procedimientos-cirugias/comentarios/comentarioscirugias.entity';
import { VigilanciasCirugiasEntity } from 'src/vigilancias/procedimientos-cirugias/vigilanciascirugias.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ComentariosPacientesEntity } from '../pacientes/pacientes/comentarios/comentariospacientes.entity';
import { ServiciosEntity } from '../pacientes/servicios/servicios.entity';
import { UserWhitelist } from './userwhitelist.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;
  @Column({ type: 'varchar', length: 20, nullable: false })
  nombre: string;
  @Column({ type: 'varchar', length: 20, nullable: false })
  apellido: string;
  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  nombreUsuario: string;
  @Column({ type: 'varchar', length: 10, nullable: false, default: 'USER_ROL' })
  rol: string;
  @Column({ type: 'varchar', nullable: false })
  password: string;
  @Column({ type: 'varchar', nullable: false })
  email: string;

  @OneToOne(() => UserWhitelist, (userWhitelist) => userWhitelist.user, {
    cascade: true,
  })
  whitelist: UserWhitelist;

  @OneToMany(
    () => VigilanciasDipsEntity,
    (vigilanciaDip) => vigilanciaDip.usuarioCreacion,
  )
  @OneToMany(
    () => VigilanciasDipsEntity,
    (vigilanciaDip) => vigilanciaDip.usuarioRetira,
  )
  vigilanciaDip: VigilanciasDipsEntity[];

  @OneToMany(
    () => VigilanciasDipsEntity,
    (vigilanciaCirugia) => vigilanciaCirugia.usuarioCreacion,
  )
  vigilanciaCirugia: VigilanciasCirugiasEntity[];

  @OneToMany(
    () => VigilanciasIarepisEntity,
    (vigilanciaCirugia) => vigilanciaCirugia.usuarioCreacion,
  )
  vigilanciaIarepis: VigilanciasIarepisEntity[];

  @OneToMany(
    () => VigilanciasPaasEntity,
    (vigilanciaCirugia) => vigilanciaCirugia.usuarioCreacion,
  )
  vigilanciaPaas: VigilanciasPaasEntity[];



  @OneToMany(() => ComentariosDipsEntity, (comentario) => comentario.user)
  comentarioDip: ComentariosDipsEntity[];

  @OneToMany(() => ComentariosCirugiasEntity, (comentario) => comentario.user)
  comentarioCirugias : ComentariosCirugiasEntity[];

  @OneToMany(() => ComentariosPaasEntity, (comentario) => comentario.user)
  comentarioPaas : ComentariosPaasEntity[];

  @OneToMany(() => ComentariosIarepisEntity, (comentario) => comentario.user)
  comentarioIarepis : ComentariosIarepisEntity[];

  @OneToMany(() => ComentariosPacientesEntity, (comentario) => comentario.user)
  comentarioPacientes : ComentariosPacientesEntity[];



}
