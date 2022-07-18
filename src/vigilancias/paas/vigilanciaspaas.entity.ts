import { PaasEntity } from "src/crud/pacientes/paas/paas.entity";
import { PacientesEntity } from "src/crud/pacientes/pacientes/pacientes.entity";
import { UserEntity } from "src/crud/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ComentariosPaasEntity } from "./comentarios/comentariospaas.entity";


@Entity({name: 'vigilancia-paas'})
export class VigilanciasPaasEntity {

    @PrimaryGeneratedColumn('increment')
    id : string;

    @ManyToOne(() => PacientesEntity, (paciente) => paciente.vigilanciaPaas)
    @JoinColumn({ name: 'id_paciente' })
    paciente: PacientesEntity;

    @ManyToOne(()=> PaasEntity, (paas) => paas.vigilancia)
    @JoinColumn({name: 'id_paas'})
    paas : PaasEntity;

    @Column({type : 'integer' , nullable: false})
    dias : number;

    
    @Column({type : 'varchar', nullable : false})
    n_procedimiento : string;

    @Column({type : 'varchar', nullable : false})
    fecha_vigilancia : string;

    @Column({type:'longtext' , nullable: true})
    observaciones : string;

    @ManyToOne(() => UserEntity, (usuarioCreacion) => usuarioCreacion.vigilanciaPaas)
    @JoinColumn({ name: 'id_usuario_creacion' })
    usuarioCreacion: UserEntity;

    @OneToMany(
        () => ComentariosPaasEntity,
        (comentarios) => comentarios.vigilancia
      )
      comentarios: ComentariosPaasEntity[];
}