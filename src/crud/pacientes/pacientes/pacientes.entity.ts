import { VigilanciasDipsEntity } from "src/vigilancias/dips/vigilanciadips.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ServiciosEntity } from "../servicios/servicios.entity";




@Entity({name: 'pacientes'})

export class PacientesEntity {
    @PrimaryGeneratedColumn('increment')
    id:string;
    @Column({type:'varchar', length:20, nullable:false})
    nombre:string;
    @Column({type:'varchar', length:20, nullable:false})
    rut:string;
    @Column({type:'varchar', length:20, nullable:false})
    segundo_nombre:string;
    @Column({type:'varchar', length:20, nullable:false})
    apellido_paterno:string;
    @Column({type:'varchar', length:20, nullable:false})
    apellido_materno:string;
    @Column({type:'int',nullable:false})
    edad:number;
    @Column({type:'varchar',nullable:false})
    fecha_nacimiento:string;
    @Column({type:'varchar', length:20, nullable:false})
    sexo:string;
    @Column({type:'varchar',  nullable:false})
    fecha_hospitalizacion:string;

    @ManyToOne(() => ServiciosEntity,  servicioIngreso => servicioIngreso.paciente)
    @JoinColumn({name: 'servicioIngreso_id'})
    servicioIngreso : ServiciosEntity;


    @ManyToOne(() => ServiciosEntity,  servicioActual => servicioActual.paciente)
    @JoinColumn({name: 'servicioActual_id'})
    servicioActual : ServiciosEntity;

    @OneToMany(() => VigilanciasDipsEntity, vigilancia => vigilancia.paciente )
    vigilancia : VigilanciasDipsEntity[];
}