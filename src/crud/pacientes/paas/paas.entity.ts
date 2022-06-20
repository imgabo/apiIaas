import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'paas'})

export class PaasEntity {

    @PrimaryGeneratedColumn('increment')
    id:string;
    @Column({type:'varchar', length:50, nullable:false})
    nombre:string;
}
