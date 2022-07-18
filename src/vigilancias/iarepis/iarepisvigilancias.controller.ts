import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { NuevaVigilanciaIarepisDTO } from './dto/nuevavigilanciaiarepis.dto';
import { IarepisVigilanciasService } from './iarepisvigilancias.service';

@Controller('vigilancias-iarepis')
export class IarepisVigilanciasController {

    constructor(private readonly vigilanciaIarepisSVC : IarepisVigilanciasService) { }

    @Post('nuevo')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async create(@Body() dto: NuevaVigilanciaIarepisDTO) {
        return this.vigilanciaIarepisSVC.create(dto);
    }

}
