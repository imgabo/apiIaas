import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { existsSync } from 'fs';

import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,

        
    ){}

            // Obtiene todos los usuarios 
    async getAll():Promise<UserEntity[]> {
        const users = await this.usersRepository.find({relations: ['whitelist']});
        if(!users.length) throw new NotFoundException();
        return users;
    }


    async getUser(user : UserEntity): Promise<any> {
        const id = user.id;
        const exists = await this.usersRepository.findOne({where:[{id : id}], relations: ['whitelist']});
        if(!exists)  throw new HttpException({
            status : HttpStatus.FORBIDDEN,
            error: 'No existe el usuario',
        }, HttpStatus.FORBIDDEN);
        return exists;
    }
        

    async setStatus( id : string ,  status : any) : Promise<any> {
        const exists = await this.usersRepository.findOne({where:[{id : id}], relations: ['whitelist']});
        if(!exists)  throw new HttpException({
            status : HttpStatus.FORBIDDEN,
            error: 'No existe el usuario',
        }, HttpStatus.FORBIDDEN);

        exists.whitelist = status ;
        
        return  await this.usersRepository.save(exists);
    }




}
