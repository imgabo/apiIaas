import { type } from "os";
import { UserEntity } from "src/crud/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { VigilanciasCirugiasEntity } from "../vigilanciascirugias.entity";



@Entity({name : 'comentarios-vigilancias'})
export class ComentariosCirugiasEntity {
    @PrimaryGeneratedColumn('increment')
    id : string;

    @Column({type : 'varchar', nullable : false})
    contenido : string;

    @Column({ type : 'timestamp' , default : () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @ManyToOne(() => VigilanciasCirugiasEntity, vigilancia => vigilancia.comentarios)
    @JoinColumn({name : 'id_vigilancia_cirugia'})
    vigilancia : VigilanciasCirugiasEntity;

    @ManyToOne(() => UserEntity, user => user.comentario )
    @JoinColumn({name : 'created_by'})
    user : UserEntity;
}