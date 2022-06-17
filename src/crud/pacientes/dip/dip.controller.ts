import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { DipService } from './dip.service';
import { nuevoDipDTO } from './dto/nuevoDip.dto';

@Controller('dip')
export class DipController {

    constructor (private readonly dipSvc : DipService) {

    }
    @Get()
    async getAll() {
        return await this.dipSvc.getAll();
    }


    @UsePipes(new ValidationPipe({whitelist:true}))
    @Post('nuevo')
    async create(@Body() dto : nuevoDipDTO){
        return await this.dipSvc.create(dto);
    }

    @Put(':id')
    async update(@Param('id') id : string, @Body() dto : nuevoDipDTO){
        return await this.dipSvc.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id : string){
        return await this.dipSvc.delete(id);
    }

}
