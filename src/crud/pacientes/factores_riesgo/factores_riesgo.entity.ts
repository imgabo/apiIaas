import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity({name: 'factores_riesgo'})

export class FactoresRiesgoEntity {
    @PrimaryGeneratedColumn('increment')
    id:string;
    @Column({type:'varchar', length:50, nullable:false})
    tipo:string;
    @Column({type:'varchar', length:50, nullable:false})
    descripcion:string;
}