import { IsNotEmpty, IsString } from "class-validator";


export class NuevaVigilanciaIarepisDTO {

    @IsString()
    @IsNotEmpty({message: 'ID PACIENTE : No puede estar vacio'})
    id_paciente: string;

    @IsString()
    @IsNotEmpty({message: 'ID IAREPIS : No puede estar vacio'})
    id_iarepis : string;

    @IsString()
    @IsNotEmpty({message: 'FECHA CULTIVO : No puede estar vacio'})
    fecha_cultivo : string;

    @IsString()
    @IsNotEmpty({message: 'FECHA AVISO LAB : No puede estar vacio'})
    fecha_aviso_lab : string;

    @IsString()
    @IsNotEmpty({message: 'FECHA VIGILANCIA : No puede estar vacio'})
    fecha_vigilancia : string;

    @IsString()
    observaciones : string;

    @IsString()
    @IsNotEmpty({message: 'ID USUARIO CREACION : No puede estar vacio'})
    id_usuarioCreacion: string;
}