import { VigilanciasDipsEntity } from 'src/vigilancias/dips/vigilanciadips.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'dip' })
export class DipEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;
  @Column({ type: 'varchar', length: 20, nullable: false })
  nombre: string;

  @OneToMany(() => VigilanciasDipsEntity, (vigilancia) => vigilancia.dip)
  vigilancia: VigilanciasDipsEntity[];
}
