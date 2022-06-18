import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { NuevaLocalizacionDTO } from './dto/nuevaLocalizacion.dto';
import { LocalizacionesService } from './localizaciones.service';

@Controller('localizaciones')
export class LocalizacionesController {

    constructor(private readonly localizacionesSvc : LocalizacionesService) {}

    @Get()
    async getAll() {
        return await this.localizacionesSvc.getAll();
    }


    @UsePipes(new ValidationPipe({whitelist:true}))
    @Post('nuevo')
    async create(@Body() dto : NuevaLocalizacionDTO){
        return await this.localizacionesSvc.create(dto);
    }

    @Put(':id')
    async update(@Param('id') id : string, @Body() dto : NuevaLocalizacionDTO){
        return await this.localizacionesSvc.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id : string){
        return await this.localizacionesSvc.delete(id);
    }


}
