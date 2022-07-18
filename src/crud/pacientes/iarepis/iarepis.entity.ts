import { VigilanciasIarepisEntity } from 'src/vigilancias/iarepis/iarepisvigilancias.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'iarepis' })
export class IarepisEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;
  @Column({ type: 'varchar', length: 20, nullable: false })
  nombre: string;

  @OneToMany(() => VigilanciasIarepisEntity, (vigilancia) => vigilancia.iarepis)
  vigilancia: VigilanciasIarepisEntity[];
}
