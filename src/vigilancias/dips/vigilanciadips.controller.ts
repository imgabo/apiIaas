import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { NuevaVigilanciaDTO } from './dto/nuevovigilanciadips.dto';
import { VigilanciasDipsEntity } from './vigilanciadips.entity';
import { VigilanciaDipsService } from './vigilanciadips.service';

@Controller('vigilancias-dips')
export class VigilanciaDipsController {

    constructor(private readonly dipVigilanciaSVC : VigilanciaDipsService ){}

   
    @Post('nuevo')
    create(@Body() dto: NuevaVigilanciaDTO){
        return this.dipVigilanciaSVC.create(dto);
    }
    



}
