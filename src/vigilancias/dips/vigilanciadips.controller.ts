import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { NuevaVigilanciaDTO } from './dto/nuevovigilanciadips.dto';
import { VigilanciasDipsEntity } from './vigilanciadips.entity';
import { VigilanciaDipsService } from './vigilanciadips.service';

@Controller('vigilancias-dips')
export class VigilanciaDipsController {

    constructor(private readonly dipVigilanciaSVC : VigilanciaDipsService ){}

   
    @Post('nuevo')
    create(@Body() dto: NuevaVigilanciaDTO){
        console.log(dto)
        return this.dipVigilanciaSVC.create(dto);
    }
    

    @Get(':id') // vigilancias-dips/id
    async getDips(@Param('id') user : string): Promise<VigilanciasDipsEntity[]> {
        return await this.dipVigilanciaSVC.getVigilancias(user);
    }

}
