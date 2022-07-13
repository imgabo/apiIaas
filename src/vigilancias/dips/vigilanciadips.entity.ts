import { DipEntity } from "src/crud/pacientes/dip/dip.entity";
import { PacientesEntity } from "src/crud/pacientes/pacientes/pacientes.entity";
import { UserEntity } from "src/crud/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ComentariosDipsEntity } from "./comentarios/comentario.entity";



@Entity({name: 'vigilancia-dips'})
export class VigilanciasDipsEntity {

    @PrimaryGeneratedColumn('increment')
    id : string

    @Column({type : 'varchar',  nullable: false  })
    fecha_instalacion : string;

    @ManyToOne(() => PacientesEntity, paciente =>  paciente.vigilancia)
    @JoinColumn({name: 'id_paciente'})
    paciente : PacientesEntity;

    @ManyToOne(() => DipEntity, dip => dip.vigilancia)
    @JoinColumn({name : 'id_dip'})
    dip : DipEntity

    @Column({type : 'varchar',  nullable: true  })
    fecha_retiro : string;


    @Column({type : 'varchar',  nullable: true  })
    dias_exposicion : string;

    @ManyToOne(() => UserEntity, usuarioCreacion => usuarioCreacion.vigilanciaDip)
    @JoinColumn({name : 'id_usuario_creacion'})
    usuarioCreacion : UserEntity;

    @ManyToOne(() => UserEntity , usuarioRetira =>  usuarioRetira.vigilanciaDip)
    @JoinColumn({name : 'id_usuario_retira'})
    usuarioRetira : UserEntity;

    @OneToMany(() => ComentariosDipsEntity , comentarios => comentarios.vigilancia)
    comentarios : ComentariosDipsEntity[];
} 