import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity({name:'tipo-heridas'})
export class TipoHeridasEntity {
    @PrimaryGeneratedColumn('increment')
    id:string;
    @Column({type:'varchar', length:20, nullable:false})
    nombre:string;
}