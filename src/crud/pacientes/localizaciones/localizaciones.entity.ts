import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'localizaciones' })
export class LocalizacionesEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;
  @Column({ type: 'varchar', length: 20, nullable: false })
  nombre: string;
}
