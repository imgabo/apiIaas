import { VigilanciasCirugiasEntity } from 'src/vigilancias/procedimientos-cirugias/vigilanciascirugias.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tipo-heridas' })
export class TipoHeridasEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;
  @Column({ type: 'varchar', length: 20, nullable: false })
  nombre: string;

  @OneToMany(() => VigilanciasCirugiasEntity, (vigilancia) => vigilancia.herida)
  vigilancia: VigilanciasCirugiasEntity[];
}
