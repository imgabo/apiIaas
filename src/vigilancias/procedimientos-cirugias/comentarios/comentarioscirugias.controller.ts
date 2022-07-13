import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Observable } from 'rxjs';
import { nuevoComentarioDTO } from '../dto/nuevocomentariocirugias.dto';
import { VigilanciacirugiasService } from '../vigilanciacirugias.service';
import { ComentariosCirugiasEntity } from './comentarioscirugias.entity';

@Controller('comentarioscirugias')
export class ComentarioscirugiasController {

    constructor (private readonly vigilanciasCirugiasSVC : VigilanciacirugiasService) {}


    @Post('nuevo')
    @UsePipes(new ValidationPipe({whitelist:true}))
    create(@Body() dto : nuevoComentarioDTO) : Promise<any> {
        return this.vigilanciasCirugiasSVC.agregarComentario(dto);
    }

    @Get(':id')
    async getComentarios(@Param('id') id : string) : Promise<ComentariosCirugiasEntity[]> {
        return this.vigilanciasCirugiasSVC.getComentarios(id);
    }

}
