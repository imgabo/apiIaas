
import { VigilanciasPaasEntity } from 'src/vigilancias/paas/vigilanciaspaas.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'paas' })
export class PaasEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;
  @Column({ type: 'varchar', length: 50, nullable: false })
  nombre: string;

  @OneToMany(() => VigilanciasPaasEntity, (vigilancia) => vigilancia.paas)
  vigilancia: VigilanciasPaasEntity[];


}
