import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { PayLoadInterface } from '../payload.interface';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/crud/user/user.entity';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      @InjectRepository(UserEntity)
      private usersRepository: Repository<UserEntity>,
      private readonly configService : ConfigService
      ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET')
    });
  }

  async validate(payload: PayLoadInterface) {
    const {nombreUsuario, email} = payload;
    const user = await this.usersRepository.findOne({where:[{nombreUsuario : nombreUsuario}, {email: email} ]});
    if(!user) return  new UnauthorizedException('Credenciales invalidas');
    return payload;
  }
}