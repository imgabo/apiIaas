import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class nuevoFactorRiesgoDto {
    @IsString()
    @IsNotEmpty({message:'tipo: No puede estar vacio'})
    @MaxLength(50, {message: 'tipo: Longitud Maxima de 50'})
    tipo: string;


    @IsString()
    @IsNotEmpty({message:'descripcion: No puede estar vacio'})
    @MaxLength(50, {message: 'descripcion: Longitud Maxima de 50'})
    descripcion: string;
}