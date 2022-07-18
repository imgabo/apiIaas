import { IarepisEntity } from "src/crud/pacientes/iarepis/iarepis.entity";
import { PacientesEntity } from "src/crud/pacientes/pacientes/pacientes.entity";
import { UserEntity } from "src/crud/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ComentariosIarepisEntity } from "./comentarios/comentarioIarepis.entity";




@Entity ({name: 'vigilancia-iarepis'})
export class VigilanciasIarepisEntity {
    @PrimaryGeneratedColumn('increment')
    id : string;
    
    @ManyToOne(() => PacientesEntity, (paciente) => paciente.vigilanciaIarepis)
    @JoinColumn({ name: 'id_paciente' })
    paciente: PacientesEntity;

    @ManyToOne(()=> IarepisEntity, (iarepis) => iarepis.vigilancia)
    @JoinColumn({name: 'id_iarepis'})
    iarepis : IarepisEntity;

    @Column({type : 'varchar' , nullable: false})
    fecha_cultivo : string;

    @Column({type : 'varchar', nullable : false})
    fecha_aviso_lab : string;

    @Column({type: 'varchar', nullable : false})
    fecha_vigilancia : string;

    @Column({type:'longtext' , nullable: true})
    observaciones : string;

    @ManyToOne(() => UserEntity, (usuarioCreacion) => usuarioCreacion.vigilanciaIarepis)
    @JoinColumn({ name: 'id_usuario_creacion' })
    usuarioCreacion: UserEntity;


    @OneToMany(
        () => ComentariosIarepisEntity,
        (comentarios) => comentarios.vigilancia
      )
      comentarios: ComentariosIarepisEntity[];
}