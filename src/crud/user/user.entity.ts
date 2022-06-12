import { hash } from "bcrypt";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserWhitelist } from "./userwhitelist.entity";

@Entity({name:'users'})

export class UserEntity {
    @PrimaryGeneratedColumn('increment')

    id: string;
    @Column({type:'varchar', length:20, nullable: false })
    nombre: string;
    @Column({type:'varchar', length:20, nullable: false })
    apellido: string;
    @Column({type:'varchar', length:20, nullable: false, unique: true})
    nombreUsuario : string;
    @Column({type:'varchar', length:10, nullable: false, default: 'USER_ROL'})
    rol : string;
    @Column({type:'varchar',  nullable: false})
    password: string;
    @Column({type:'varchar', nullable: false})
    email: string;


    @OneToOne(() => UserWhitelist, userWhitelist => userWhitelist.user, {cascade: true})
    whitelist : UserWhitelist
}