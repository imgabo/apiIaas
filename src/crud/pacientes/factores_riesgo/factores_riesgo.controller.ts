import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { nuevoFactorRiesgoDto } from './dto/nuevoFactorRiesgo.dto';
import { FactoresRiesgoService } from './factores_riesgo.service';

@Controller('factoresriesgo')
export class FactoresRiesgoController {

    constructor(private readonly factorRiesgoSvc : FactoresRiesgoService){}


    //obtener todos los factores de riesgos
    @Get()
    getAll() {
        return this.factorRiesgoSvc.getAll();
    }

    @UsePipes(new ValidationPipe({whitelist:true}))
    @Post('nuevo')
    create(@Body() dto:nuevoFactorRiesgoDto){
        return this.factorRiesgoSvc.create(dto);
    }

    @UsePipes(new ValidationPipe({whitelist:true}))
    @Post('delete')
    delete(@Body() dto : nuevoFactorRiesgoDto){
        return this.factorRiesgoSvc.delete(dto);
    }


    



}
