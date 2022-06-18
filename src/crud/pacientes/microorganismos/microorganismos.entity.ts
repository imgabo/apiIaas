import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity({name:'microorganismos'})

export class MicroorganismosEntity {

    @PrimaryGeneratedColumn('increment')
    id:string;
    @Column({type:'varchar', length:20, nullable:false})
    nombre:string;
}