import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity({name:'servicios'})
export class ServiciosEntity {
    @PrimaryGeneratedColumn('increment')
    id:string
    @Column({type:'varchar', length:20, nullable:false})
    nombre:string
}