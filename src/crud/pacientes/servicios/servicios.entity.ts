import { UserEntity } from "src/crud/user/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";




@Entity({name:'servicios'})
export class ServiciosEntity {
    @PrimaryGeneratedColumn('increment')
    id:string
    @Column({type:'varchar', length:50, nullable:false})
    nombre:string

    @OneToMany(() => UserEntity, user => user.servicioIngreso)
    @OneToMany(() => UserEntity, user => user.servicioActual)
    user: UserEntity[]
}