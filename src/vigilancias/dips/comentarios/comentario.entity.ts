import { type } from "os";
import { UserEntity } from "src/crud/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { VigilanciasDipsEntity } from "../vigilanciadips.entity";


@Entity({name : 'comentarios-dips'})
export class ComentariosDipsEntity {
    @PrimaryGeneratedColumn('increment')
    id : string;

    @Column({type : 'varchar', nullable : false})
    contenido : string;

    @Column({ type : 'timestamp' , default : () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @ManyToOne(() => VigilanciasDipsEntity, vigilancia => vigilancia.comentarios)
    @JoinColumn({name : 'id_vigilanciadips'})
    vigilancia : VigilanciasDipsEntity;

    @ManyToOne(() => UserEntity, user => user.comentario )
    @JoinColumn({name : 'created_by'})
    user : UserEntity;
}