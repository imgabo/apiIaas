import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity({name:'procedimientos-cirugias'})
export class procedimientosCirugiasEntity {
    @PrimaryGeneratedColumn('increment')
    id:string;
    @Column({type:'varchar', length:20, nullable:false})
    nombre:string;
}