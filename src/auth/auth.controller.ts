import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import { CreateUserDto } from './dto/new-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Crear nuevo usuario
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('nuevo')
  create(@Body() dto: CreateUserDto) {
    return this.authService.create(dto);
  }

  //Login
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('login')
  login(@Body() dto: LoginUserDto) {
    return this.authService.loging(dto);
  }
}
