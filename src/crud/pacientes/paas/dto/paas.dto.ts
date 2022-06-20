import { IsNotEmpty, IsString, MaxLength } from "class-validator";



export class NuevoPaasDTO {
    @IsString()
    @IsNotEmpty({message:'Nombre: No puede estar vacio'})
    @MaxLength(50, {message: 'Nombre: Longitud Maxima de 50'})
    nombre: string;
}