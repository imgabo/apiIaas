import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity({name: 'dip'})

export class DipEntity {

    @PrimaryGeneratedColumn('increment')
    id:string;
    @Column({type:'varchar', length:20, nullable:false})
    nombre:string;

}