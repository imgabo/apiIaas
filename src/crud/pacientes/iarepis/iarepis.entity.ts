import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity({name:'iarepis'})

export class IarepisEntity {

    @PrimaryGeneratedColumn('increment')
    id:string;
    @Column({type:'varchar', length:20, nullable:false})
    nombre:string;
}
