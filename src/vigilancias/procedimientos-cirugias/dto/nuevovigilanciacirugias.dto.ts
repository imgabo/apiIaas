import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class NuevaVigilanciaCirugiaDTO {
  @IsString()
  @IsNotEmpty({ message: 'Procedimiento : No puede estar vacio' })
  id_procedimiento: string;

  @IsString()
  @IsNotEmpty({ message: 'fecha_operacion : No puede estar vacio' })
  fecha_operacion: string;
  @IsString()
  @IsNotEmpty({ message: 'fecha_revision : No puede estar vacio' })
  fecha_revision: string;
  @IsString()
  @IsNotEmpty({ message: 'id_herida : No puede estar vacio' })
  id_herida: string;
  @IsString()
  @IsNotEmpty({ message: 'asa : No puede estar vacio' })
  asa: string;

  @IsString()
  @IsNotEmpty({ message: 'fecha_alta : No puede estar vacio' })
  fecha_alta: string;
  @IsBoolean()
  control_post: boolean;
  @IsString()
  fecha_control: string;
  @IsBoolean()
  antibioprofilaxis: boolean;
  @IsString()
  observacion: string;

  @IsString()
  @IsNotEmpty({ message: 'paciente : No puede estar vacio' })
  id_paciente: string;

  @IsString()
  @IsNotEmpty({ message: 'USUARIO CREACION: No puede estar vacio' })
  id_usuarioCreacion: string;
}
