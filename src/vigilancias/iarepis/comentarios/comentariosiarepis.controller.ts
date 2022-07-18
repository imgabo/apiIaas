import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { nuevoComentarioIarepisDTO } from '../dto/nuevocomentarioiarepis.dto';
import { IarepisVigilanciasService } from '../iarepisvigilancias.service';
import { ComentariosIarepisEntity } from './comentarioIarepis.entity';

@Controller('comentariosiarepis')
export class ComentariosiarepisController {


    constructor(private readonly iarepisVigilanciaSVC : IarepisVigilanciasService){}

    @Post('nuevo')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    create(@Body() dto: nuevoComentarioIarepisDTO) {
        return this.iarepisVigilanciaSVC.agregarComentario(dto);
    }

  @Get(':id')
  async getComentarios(
    @Param('id') user: string,
  ): Promise<ComentariosIarepisEntity[]> {
    return this.iarepisVigilanciaSVC.getComentarios(user);
  }
}
