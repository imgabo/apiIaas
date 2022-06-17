import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { NuevoTipoHeridaDTO } from './dto/nuevoTipoHerida.dto';
import { TipoHeridasService } from './tipo-heridas.service';

@Controller('tipoheridas')
export class TipoHeridasController {


    constructor(private readonly tipoHeridasSvc : TipoHeridasService){}

    @Get()
    async getAll(){
        return await this.tipoHeridasSvc.getAll();
    }
    
    @UsePipes(new ValidationPipe({whitelist:true}))
    @Post('nuevo')
    async create(@Body() dto : NuevoTipoHeridaDTO){
        return await this.tipoHeridasSvc.create(dto);
    }


    @Put(':id')
    async update(@Param('id') id : string, @Body() dto : NuevoTipoHeridaDTO){
        return await this.tipoHeridasSvc.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id')  id : string){
        return await this.tipoHeridasSvc.delete(id);
    }

}
