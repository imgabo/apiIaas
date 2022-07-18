import { VigilanciasDipsEntity } from 'src/vigilancias/dips/vigilanciadips.entity';
import { VigilanciasIarepisEntity } from 'src/vigilancias/iarepis/iarepisvigilancias.entity';
import { VigilanciasPaasEntity } from 'src/vigilancias/paas/vigilanciaspaas.entity';

import { VigilanciasCirugiasEntity } from 'src/vigilancias/procedimientos-cirugias/vigilanciascirugias.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServiciosEntity } from '../servicios/servicios.entity';
import { ComentariosPacientesEntity } from './comentarios/comentariospacientes.entity';

@Entity({ name: 'pacientes' })
export class PacientesEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;
  @Column({ type: 'varchar', length: 20, nullable: false })
  nombre: string;
  @Column({ type: 'varchar', length: 20, nullable: false })
  rut: string;
  @Column({ type: 'varchar', length: 20, nullable: false })
  segundo_nombre: string;
  @Column({ type: 'varchar', length: 20, nullable: false })
  apellido_paterno: string;
  @Column({ type: 'varchar', length: 20, nullable: false })
  apellido_materno: string;
  @Column({ type: 'int', nullable: false })
  edad: number;
  @Column({ type: 'varchar', nullable: false })
  fecha_nacimiento: string;
  @Column({ type: 'varchar', length: 20, nullable: false })
  sexo: string;
  @Column({ type: 'varchar', nullable: false })
  fecha_hospitalizacion: string;

  @ManyToOne(
    () => ServiciosEntity,
    (servicioIngreso) => servicioIngreso.paciente,
  )
  @JoinColumn({ name: 'servicioIngreso_id' })
  servicioIngreso: ServiciosEntity;

  @ManyToOne(() => ServiciosEntity, (servicioActual) => servicioActual.paciente)
  @JoinColumn({ name: 'servicioActual_id' })
  servicioActual: ServiciosEntity;

  @OneToMany(() => VigilanciasDipsEntity, (vigilancia) => vigilancia.paciente)
  vigilancia: VigilanciasDipsEntity[];

  @OneToMany(
    () => VigilanciasCirugiasEntity,
    (vigilanciaCirugia) => vigilanciaCirugia.paciente,
  )
  vigilanciaCirugia: VigilanciasCirugiasEntity[];

  @OneToMany(() => VigilanciasIarepisEntity, (vigilancia) => vigilancia.paciente)
  vigilanciaIarepis: VigilanciasIarepisEntity[];

  @OneToMany(() => VigilanciasPaasEntity, (vigilancia) => vigilancia.paciente)
  vigilanciaPaas: VigilanciasPaasEntity[];

  @OneToMany(() => ComentariosPacientesEntity, (comentario) => comentario.paciente)
  comentarios: ComentariosPacientesEntity[];


}
