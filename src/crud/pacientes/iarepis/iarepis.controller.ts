import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NuevoIarepisDTO } from './dto/iarepis.dto';
import { IarepisService } from './iarepis.service';

@Controller('iarepis')
export class IarepisController {
  constructor(private readonly iarepisSvc: IarepisService) {}

  @Get()
  async getAll() {
    return await this.iarepisSvc.getAll();
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('nuevo')
  async create(@Body() dto: NuevoIarepisDTO) {
    return await this.iarepisSvc.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: NuevoIarepisDTO) {
    return await this.iarepisSvc.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.iarepisSvc.delete(id);
  }
}
