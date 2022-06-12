import { IsDate, IsNotEmpty, IsString, MaxLength } from "class-validator";





export class NuevoPacienteDto {

    @IsString()
    @IsNotEmpty({message:'Nombre: No puede estar vacio'})
    @MaxLength(5, {message: 'ID: Longitud Maxima de 5'})
    id: string;


    @IsString()
    @IsNotEmpty({message:'Nombre: No puede estar vacio'})
    @MaxLength(20, {message: 'Nombre: Longitud Maxima de 20'})
    nombre: string;

    @IsString()
    @IsNotEmpty({message:'Nombre: No puede estar vacio'})
    @MaxLength(20, {message: 'Nombre: Longitud Maxima de 20'})
    segundo_nombre: string;

    @IsString()
    @IsNotEmpty({message:'Apellido: No puede estar vacio'})
    @MaxLength(20, {message: 'Apellido: Longitud Maxima de 20'})
    apellido_paterno: string;


    @IsString()
    @IsNotEmpty({message:'Apellido: No puede estar vacio'})
    @MaxLength(20, {message: 'Apellido: Longitud Maxima de 20'})
    apellido_materno: string;

    @IsString()
    @IsNotEmpty({message:'Edad: No puede estar vacio'})
    @MaxLength(10, {message: 'Edad: Longitud Maxima de 10'})
    edad: string;
   

    @IsDate()
    @IsNotEmpty({message:'Fecha de Nacimiento: No puede estar vacio'})
    fecha_nacimiento: Date;

    @IsString()
    @IsNotEmpty({message:'Sexo: No puede estar vacio'})
    @MaxLength(10, {message: 'Sexo: Longitud Maxima de 5'})
    sexo: string;

    @IsDate()
    @IsNotEmpty({message:'Fecha de Hospitalizacion: No puede estar vacio'})
    fecha_hospitalizacion: Date;

}