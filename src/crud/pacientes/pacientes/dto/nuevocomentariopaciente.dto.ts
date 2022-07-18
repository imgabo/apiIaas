import { IsNotEmpty, IsString } from "class-validator";


export class NuevoComentarioPacienteDTO {

    @IsString()
    @IsNotEmpty({ message: 'Contenido : No puede estar vacio' })
    contenido: string;
  
    @IsString()
    @IsNotEmpty({
      message:
        ' PACIENTE : El comentario debe estar vinculado a un paciente',
    })
    id_paciente: string;
  
    @IsString()
    @IsNotEmpty({
      message:
        'CREADO POR : El comentario debe estar vinculado a un usuario valido',
    })
    created_by: string;
}