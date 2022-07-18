import { VigilanciasCirugiasEntity } from 'src/vigilancias/procedimientos-cirugias/vigilanciascirugias.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'procedimientos-cirugias' })
export class procedimientosCirugiasEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;
  @Column({ type: 'varchar', length: 20, nullable: false })
  nombre: string;

  @OneToMany(
    () => VigilanciasCirugiasEntity,
    (vigilancia) => vigilancia.procedimiento,
  )
  vigilancia: VigilanciasCirugiasEntity[];
}
