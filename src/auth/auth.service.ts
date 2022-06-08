import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException, UseGuards} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { use } from 'passport';
import { UserEntity } from 'src/user/user.entity';
import { UserWhitelist } from 'src/user/userwhitelist.entity';

import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login.dto';
import { CreateUserDto } from './dto/new-user.dto';
import { PayLoadInterface } from './payload.interface';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity)
        
        private readonly usersRepository: Repository<UserEntity>,
        @InjectRepository(UserWhitelist)
        private readonly userWhitelistRepository : Repository<UserWhitelist>,
        private readonly jwtSvc : JwtService
    ){}
    




    async create(dto: CreateUserDto): Promise<any> {
        const {nombreUsuario, email} = dto;
        //comprobacion si existe el usuario
        const exists = await this.usersRepository.findOne({where:[{nombreUsuario : nombreUsuario}, {email: nombreUsuario} ]});
        if(exists) throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'Usuario Existente',
        }, HttpStatus.FORBIDDEN);
        const user = this.usersRepository.create(dto);
        await this.usersRepository.insert(user);
        const userwhitelist = this.userWhitelistRepository.create();
        userwhitelist.user = user
        return await this.userWhitelistRepository.insert(userwhitelist);
    }

    async loging(dto: LoginUserDto): Promise<any> {
        const {nombreUsuario} = dto;
        const user = await this.usersRepository.findOne({where:[{nombreUsuario : nombreUsuario}, {email: nombreUsuario} ]});
        if(!user) return new UnauthorizedException('Datos Incorrectos');
        const passwordOK = await compare(dto.password, user.password);
        if(!passwordOK) return new UnauthorizedException('Datos Incorrectos');
        const whitelist = await this.userWhitelistRepository.findOne({where: [{user : user}]});
        if(!whitelist.status) {
            return new UnauthorizedException('Debes ser aprobado por un administrador');
        }
        const payload: PayLoadInterface ={
            id: user.id,
            nombre : user.nombre,
            apellido : user.apellido,
            nombreUsuario : user.nombreUsuario,
            email : user.email,
            rol : user.rol,
        }
        const token = await this.jwtSvc.sign(payload);
        return {token};
    }
}
