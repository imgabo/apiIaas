import { Body, Controller, Get, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { nuevoServicioDto } from './dto/nuevoservicio.dto';
import { ServiciosService } from './servicios.service';

@Controller('servicios')
export class ServiciosController {

    constructor(private readonly serviciosSvc : ServiciosService){}

    //Obtener todos los servicios
    @Get()
    getAll(){
        return this.serviciosSvc.getAll();
    }

    @UsePipes(new ValidationPipe({whitelist:true}))
    @Post('nuevo')
    create(@Body() dto: nuevoServicioDto){
        return this.serviciosSvc.create(dto)
    }

    @Post('delete')
    delete(@Body() dto :nuevoServicioDto){
        return this.serviciosSvc.delete(dto);
    }

    // @Patch('update/:id')
    // update()



}
