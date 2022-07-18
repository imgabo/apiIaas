import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { nuevoComentarioPaasDTO } from '../dto/nuevocomentariopaas.dto';
import { VigilanciaspaasService } from '../vigilanciaspaas.service';
import { ComentariosPaasEntity } from './comentariospaas.entity';

@Controller('comentariospaas')
export class ComentariospaasController {

    constructor(private readonly paasVigilanciasSVC : VigilanciaspaasService){}

    @Post('nuevo')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    create(@Body() dto: nuevoComentarioPaasDTO) {
        return this.paasVigilanciasSVC.agregarComentario(dto);
    }

  @Get(':id')
  async getComentarios(
    @Param('id') user: string,
  ): Promise<ComentariosPaasEntity[]> {
    return this.paasVigilanciasSVC.getComentarios(user);
  }
}
