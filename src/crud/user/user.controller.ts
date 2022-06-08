import { Body, Controller, Get, Param, Patch } from '@nestjs/common';

import { UserEntity } from 'src/user/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {


    constructor(private readonly userSvc : UserService){}




    //OBTENER TODOS LOS USUARIOS
    @Get()
    getAll() {
        return this.userSvc.getAll();
    }


    @Get(':id') // user/id
    async getUser(@Param() user : UserEntity): Promise<UserEntity> {
        return await this.userSvc.getUser(user);
    }

    @Patch(':id')
    async updateWhitelist(@Param('id') id : string , @Body('whitelist') status) {
       
 
        return this.userSvc.setStatus(id,status);
    }
}
