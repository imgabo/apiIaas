import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";


export class CreateUserDto {
    @IsString()
    @IsNotEmpty({message:'Nombre: No puede estar vacio'})
    @MaxLength(15, {message: 'Nombre: Longitud Maxima de 15'})
    nombre: string;

    @IsString()
    @IsNotEmpty({message:'Apellido: No puede estar vacio'})
    @MaxLength(15, {message: 'Apellido: Longitud Maxima de 15'})
    apellido: string;

    @IsString()
    @IsNotEmpty({message:'Nombre de Usuario: No puede estar vacio'})
    @MaxLength(15, {message: 'Nombre de usuario: Longitud Maxima de 15'})
    nombreUsuario: string;

    rol: string;
    @IsString()
    @IsNotEmpty({message:'Contraseña: No puede estar vacio'})
    password: string;

    @IsEmail()
    email: string;
}