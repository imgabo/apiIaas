import { UserEntity } from "src/crud/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PacientesEntity } from "../pacientes.entity";


@Entity({name: 'comentarios-pacientes'})
export class ComentariosPacientesEntity {
    @PrimaryGeneratedColumn('increment')
    id : string;

    @Column({type: 'longtext', nullable : false})
    contenido : string;

    
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;


  @ManyToOne(
    () => PacientesEntity,
    (paciente) => paciente.comentarios,
  )
  @JoinColumn({ name: 'id_paciente' })
  paciente: PacientesEntity;


  
  @ManyToOne(() => UserEntity, (user) => user.comentarioPacientes)
  @JoinColumn({ name: 'created_by' })
  user: UserEntity;
}