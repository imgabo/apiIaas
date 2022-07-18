import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class NuevaVigilanciaPaasDTO {


    @IsString()
    @IsNotEmpty({message: 'ID PACIENTE : No puede estar vacio'})
    id_paciente: string;

    @IsString()
    @IsNotEmpty({message: 'ID PAAS : No puede estar vacio'})
    id_paas : string;

    @IsNumber()
    @IsNotEmpty({message: 'DIAS : No puede estar vacio'})
    dias : number;

    @IsString()
    @IsNotEmpty({message: 'N PROCEDIMIENTO : No puede estar vacio'})
    n_procedimiento : string;

    @IsString()
    @IsNotEmpty({message: 'FECHA VIGILANCIA : No puede estar vacio'})
    fecha_vigilancia : string;

    @IsString()
    observaciones : string;

    @IsString()
    @IsNotEmpty({message: 'ID USUARIO CREACION : No puede estar vacio'})
    id_usuarioCreacion: string;


}