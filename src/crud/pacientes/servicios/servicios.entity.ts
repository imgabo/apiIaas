import { UserEntity } from "src/crud/user/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PacientesEntity } from "../pacientes/pacientes.entity";




@Entity({name:'servicios'})
export class ServiciosEntity {
    @PrimaryGeneratedColumn('increment')
    id:string
    @Column({type:'varchar', length:50, nullable:false})
    nombre:string

    @OneToMany(() => PacientesEntity, paciente => paciente.servicioIngreso)
    @OneToMany(() => PacientesEntity, paciente => paciente.servicioActual)
    paciente: PacientesEntity[]
}