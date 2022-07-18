import { PacientesEntity } from 'src/crud/pacientes/pacientes/pacientes.entity';
import { procedimientosCirugiasEntity } from 'src/crud/pacientes/procedimientos-cirugias/procedimientos-cirugias.entity';
import { TipoHeridasEntity } from 'src/crud/pacientes/tipo-heridas/tipo-heridas.entity';
import { UserEntity } from 'src/crud/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ComentariosDipsEntity } from '../dips/comentarios/comentario.entity';

@Entity({ name: 'vigilancia-procedimientoscirugias' })
export class VigilanciasCirugiasEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ManyToOne(
    () => procedimientosCirugiasEntity,
    (procedimiento) => procedimiento.vigilancia,
  )
  @JoinColumn({ name: 'id_procedimiento' })
  procedimiento: procedimientosCirugiasEntity;

  @Column({ type: 'varchar', nullable: false })
  fecha_operacion: string;

  @Column({ type: 'varchar', nullable: false })
  fecha_revision: string;

  @ManyToOne(() => TipoHeridasEntity, (herida) => herida.vigilancia)
  @JoinColumn({ name: 'id_tipo_herida' })
  herida: TipoHeridasEntity;

  @Column({ type: 'varchar', length: 20, nullable: false })
  asa: string;

  @Column({ type: 'varchar', nullable: false })
  fecha_alta: string;

  @Column({ type: Boolean, nullable: false, default: false })
  control_post: boolean;

  @Column({ type: 'varchar', nullable: true })
  fecha_control: string;

  @Column({ type: Boolean, nullable: false, default: false })
  antibioprofilaxis: boolean;

  @Column({ type: 'varchar', nullable: true })
  observacion: string;

  @ManyToOne(() => PacientesEntity, (paciente) => paciente.vigilanciaCirugia)
  @JoinColumn({ name: 'id_paciente' })
  paciente: PacientesEntity;

  @ManyToOne(
    () => UserEntity,
    (usuarioCreacion) => usuarioCreacion.vigilanciaCirugia,
  )
  @JoinColumn({ name: 'id_usuario_creacion' })
  usuarioCreacion: UserEntity;

  @OneToMany(
    () => ComentariosDipsEntity,
    (comentarios) => comentarios.vigilancia,
  )
  comentarios: ComentariosDipsEntity[];
}
