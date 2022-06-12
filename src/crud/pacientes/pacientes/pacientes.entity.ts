import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity({name: 'pacientes'})

export class PacientesEntity {
    @PrimaryGeneratedColumn('increment')
    id:string;
    @Column({type:'varchar', length:20, nullable:false})
    nombre:string;
    @Column({type:'varchar', length:20, nullable:false})
    rut:string;
    @Column({type:'varchar', length:20, nullable:false})
    segundo_nombre:string;
    @Column({type:'varchar', length:20, nullable:false})
    apellido_paterno:string;
    @Column({type:'varchar', length:20, nullable:false})
    apellido_materno:string;
    @Column({type:'varchar', length:5, nullable:false})
    edad:string;
    @Column({type:'varchar', length:20, nullable:false})
    fecha_nacimiento:Date;
    @Column({type:'varchar', length:5, nullable:false})
    sexo:string;
    @Column({type:'varchar', length:20, nullable:false})
    fecha_hospitalizacion:Date;
}