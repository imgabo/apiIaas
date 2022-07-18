import { IsNotEmpty, IsString } from "class-validator";



export class nuevoComentarioIarepisDTO {

    @IsString()
    @IsNotEmpty({ message: 'Contenido : No puede estar vacio' })
    contenido: string;
  
    @IsString()
    @IsNotEmpty({
      message:
        ' IAREPIS : El comentario debe estar vinculado a un procedimiento',
    })
    id_vigilancia_iarepis: string;
  
    @IsString()
    @IsNotEmpty({
      message:
        'CREADO POR : El comentario debe estar vinculado a un usuario valido',
    })
    created_by: string;


}