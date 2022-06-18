import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { NuevoMicroorganismoDTO } from './dto/microorganismos.dto';
import { MicroorganismosService } from './microorganismos.service';

@Controller('microorganismos')
export class MicroorganismosController {

    constructor(private readonly microorganismoSvc : MicroorganismosService) {}

    @Get()
    async getAll() {
        return await this.microorganismoSvc.getAll();
    }


    @UsePipes(new ValidationPipe({whitelist:true}))
    @Post('nuevo')
    async create(@Body() dto : NuevoMicroorganismoDTO){
        return await this.microorganismoSvc.create(dto);
    }

    @Put(':id')
    async update(@Param('id') id : string, @Body() dto : NuevoMicroorganismoDTO){
        return await this.microorganismoSvc.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id : string){
        return await this.microorganismoSvc.delete(id);
    }



}
