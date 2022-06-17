import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class nuevoDipDTO {

    @IsString()
    @IsNotEmpty({message:'Nombre: No puede estar vacio'})
    @MaxLength(10, {message: 'Nombre: Longitud Maxima de 10'})
    nombre: string;
}