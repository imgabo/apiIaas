import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { NuevoPaasDTO } from './dto/paas.dto';
import { PaasService } from './paas.service';

@Controller('paas')
export class PaasController {

    constructor(private readonly paasSvc : PaasService){}

    @Get()
    async getAll() {
        return await this.paasSvc.getAll();
    }
    
    @UsePipes(new ValidationPipe({whitelist:true}))
    @Post('nuevo')
    async create(@Body() dto : NuevoPaasDTO){
        return await this.paasSvc.create(dto);
    }

    @Put(':id')
    async update(@Param('id') id : string, @Body() dto : NuevoPaasDTO){
        return await this.paasSvc.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id : string){
        return await this.paasSvc.delete(id);
    }





}
