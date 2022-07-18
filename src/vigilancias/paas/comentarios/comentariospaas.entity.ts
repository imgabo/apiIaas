import { UserEntity } from "src/crud/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { VigilanciasPaasEntity } from "../vigilanciaspaas.entity";



@Entity({ name : 'comentarios-paas'})
export class ComentariosPaasEntity {

    @PrimaryGeneratedColumn('increment')
    id: string;
  
    @Column({ type: 'varchar', nullable: false })
    contenido: string;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @ManyToOne(
      () => VigilanciasPaasEntity,
      (vigilancia) => vigilancia.comentarios,
    )
    @JoinColumn({ name: 'id_vigilancia_paas' })
    vigilancia: VigilanciasPaasEntity;
  
    @ManyToOne(() => UserEntity, (user) => user.comentarioPaas)
    @JoinColumn({ name: 'created_by' })
    user: UserEntity;
}