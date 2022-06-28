import { IsNotEmpty, IsString } from "class-validator";




export class NuevaVigilanciaDTO {

    @IsString()
    @IsNotEmpty({message:'Fecha de Creacion: No puede estar vacio'})
    fecha_creacion : string;

    @IsString()
    fecha_retiro : string;
    
    @IsString()
    @IsNotEmpty({message:'Paciente: No puede estar vacio'})
    id_paciente : string;

    @IsString()
    @IsNotEmpty({message:'DIP: No puede estar vacio'})
    id_dip : string;

    @IsString()
    @IsNotEmpty({message:'USUARIO CREACION: No puede estar vacio'})
    id_usuarioCreacion : string;

    @IsString()
    id_usuarioRetira : string;

}