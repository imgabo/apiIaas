import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { NuevaVigilanciaPaasDTO } from './dto/nuevavigilanciapaas.dto';
import { VigilanciaspaasService } from './vigilanciaspaas.service';

@Controller('vigilancias-paas')
export class VigilanciaspaasController {


    constructor(private readonly vigilanciaPaasSVC : VigilanciaspaasService){}

    @Post('nuevo')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async create(@Body() dto: NuevaVigilanciaPaasDTO) {
        return this.vigilanciaPaasSVC.create(dto);
    }

}
