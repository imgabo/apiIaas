import { IsNotEmpty, IsString, MaxLength } from "class-validator";


export class nuevoProcedimientoCirugiaDTO {
    @IsString()
    @IsNotEmpty({message:'Nombre: No puede estar vacio'})
    @MaxLength(20, {message: 'Nombre: Longitud Maxima de 20'})
    nombre: string;
}