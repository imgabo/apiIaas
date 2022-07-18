import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Nombre de Usuario: No puede estar vacio' })
  @MaxLength(30, { message: 'Nombre de usuario: Longitud Maxima de 30' })
  nombreUsuario: string;

  @IsString()
  @IsNotEmpty({ message: 'Contraseña: No puede estar vacio' })
  password: string;
}
