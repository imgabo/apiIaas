import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { NuevaVigilanciaCirugiaDTO } from './dto/nuevovigilanciacirugias.dto';
import { VigilanciacirugiasService } from './vigilanciacirugias.service';

@Controller('vigilanciacirugias')
export class VigilanciacirugiasController {

    constructor(private readonly vigilanciasCirugiasSvc : VigilanciacirugiasService) {}


    @Post('nuevo')
    @UsePipes(new ValidationPipe({whitelist:true}))
    async create (@Body() dto : NuevaVigilanciaCirugiaDTO) {
        return this.vigilanciasCirugiasSvc.createVigilancia(dto);
    }

 

}
