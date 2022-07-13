import { hash } from "bcrypt";
import { ComentariosDipsEntity } from "src/vigilancias/dips/comentarios/comentario.entity";

import { VigilanciasDipsEntity } from "src/vigilancias/dips/vigilanciadips.entity";
import { ComentariosCirugiasEntity } from "src/vigilancias/procedimientos-cirugias/comentarios/comentarioscirugias.entity";
import { VigilanciasCirugiasEntity } from "src/vigilancias/procedimientos-cirugias/vigilanciascirugias.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ServiciosEntity } from "../pacientes/servicios/servicios.entity";
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

    @OneToMany(() => VigilanciasDipsEntity, vigilanciaDip => vigilanciaDip.usuarioCreacion)
    @OneToMany(() => VigilanciasDipsEntity, vigilanciaDip => vigilanciaDip.usuarioRetira)
    vigilanciaDip : VigilanciasDipsEntity[];

    @OneToMany(() => VigilanciasDipsEntity, vigilanciaCirugia => vigilanciaCirugia.usuarioCreacion)
    vigilanciaCirugia : VigilanciasCirugiasEntity[];


    @OneToMany(() => ComentariosDipsEntity, comentario => comentario.user)
    @OneToMany(() => ComentariosCirugiasEntity, comentario => comentario.user)
    comentario : ComentariosDipsEntity[];




}