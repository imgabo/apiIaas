import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWT_SECRET } from 'src/config/configuration';
import { AuthSubscriber } from 'src/subscriber/auth.subscriber';
import { UserEntity } from 'src/user/user.entity';
import { UserWhitelist } from 'src/user/userwhitelist.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([
    UserWhitelist,
    UserEntity,
  ]),
  PassportModule.register({
    defaultStrategy: 'jwt'
  }),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get(JWT_SECRET),
      signOptions: {
        expiresIn: 7200
      }
    }),
    inject: [ConfigService],
  }),],
  providers: [AuthService,ConfigService, JwtStrategy, AuthSubscriber],
  controllers: [AuthController],
  exports:[PassportModule, JwtStrategy]
})
export class AuthModule {}
