import { IsNotEmpty, IsString } from 'class-validator';

export class nuevoComentarioDTO {
  @IsString()
  @IsNotEmpty({ message: 'Contenido : No puede estar vacio' })
  contenido: string;

  @IsString()
  @IsNotEmpty({
    message: ' DIPS : El comentario debe estar vinculado a un dip',
  })
  id_dip: string;

  @IsString()
  @IsNotEmpty({
    message:
      'CREADO POR : El comentario debe estar vinculado a un usuario valido',
  })
  created_by: string;
}
