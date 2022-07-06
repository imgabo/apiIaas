import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { nuevoComentarioDTO } from '../../dto/nuevocomentariodips.dto';
import { VigilanciaDipsService } from '../../vigilanciadips.service';
import { ComentariosDipsEntity } from './comentario.entity';

@Controller('comentariosdips')
export class ComentariosdipsController {

    constructor(private readonly dipVigilanciaSVC : VigilanciaDipsService ){}


    @Post('nuevo')
    @UsePipes(new ValidationPipe({whitelist:true}))
    create(@Body() dto: nuevoComentarioDTO){
        return this.dipVigilanciaSVC.agregarComentario(dto);
    }

    @Get(':id')
    async getComentarios(@Param('id') user : string ) : Promise<ComentariosDipsEntity[]>{
        return this.dipVigilanciaSVC.getComentarios(user);
    }


}
