import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NuevaVigilanciaDTO {
  @IsString()
  @IsNotEmpty({ message: 'Fecha de Instalacion: No puede estar vacio' })
  fecha_instalacion: string;

  fecha_retiro: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Paciente: No puede estar vacio' })
  id_paciente: string;

  @IsNumber()
  @IsNotEmpty({ message: 'DIP: No puede estar vacio' })
  id_dip: string;

  @IsString()
  @IsNotEmpty({ message: 'USUARIO CREACION: No puede estar vacio' })
  id_usuarioCreacion: string;

  id_usuarioRetira: string;
}
