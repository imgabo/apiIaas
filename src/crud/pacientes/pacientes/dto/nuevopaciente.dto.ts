import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { nuevoServicioDto } from '../../servicios/dto/nuevoservicio.dto';
import { ServiciosEntity } from '../../servicios/servicios.entity';

export class NuevoPacienteDto {
  @IsString()
  @IsNotEmpty({ message: 'Nombre: No puede estar vacio' })
  @MaxLength(20, { message: 'Nombre: Longitud Maxima de 20' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'Rut: No puede estar vacio' })
  @MaxLength(20, { message: 'Rut: Longitud Maxima de 20' })
  rut: string;

  @IsString()
  @IsNotEmpty({ message: 'Nombre: No puede estar vacio' })
  @MaxLength(20, { message: 'Nombre: Longitud Maxima de 20' })
  segundo_nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'Apellido: No puede estar vacio' })
  @MaxLength(20, { message: 'Apellido: Longitud Maxima de 20' })
  apellido_paterno: string;

  @IsString()
  @IsNotEmpty({ message: 'Apellido: No puede estar vacio' })
  @MaxLength(20, { message: 'Apellido: Longitud Maxima de 20' })
  apellido_materno: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Edad: No puede estar vacio' })
  edad: number;

  @IsString()
  @IsNotEmpty({ message: 'Fecha de Nacimiento: No puede estar vacio' })
  fecha_nacimiento: string;

  @IsString()
  @IsNotEmpty({ message: 'Sexo: No puede estar vacio' })
  @MaxLength(10, { message: 'Sexo: Longitud Maxima de 5' })
  sexo: string;

  @IsString()
  @IsNotEmpty({ message: 'Fecha de Hospitalizacion: No puede estar vacio' })
  fecha_hospitalizacion: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Servicio ingreso: No puede estar vacio' })
  servicio_ingreso: number;
}
