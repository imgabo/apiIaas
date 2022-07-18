import { UserEntity } from "src/crud/user/user.entity";
import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

import { VigilanciasIarepisEntity } from "../iarepisvigilancias.entity";




@Entity({ name: 'comentarios-iarepis' })
export class ComentariosIarepisEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  contenido: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(
    () => VigilanciasIarepisEntity,
    (vigilancia) => vigilancia.comentarios,
  )
  @JoinColumn({ name: 'id_vigilanciaIarepis' })
  vigilancia: VigilanciasIarepisEntity;

  @ManyToOne(() => UserEntity, (user) => user.comentarioIarepis)
  @JoinColumn({ name: 'created_by' })
  user: UserEntity;
}