import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DB_URL, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { UserController } from './crud/user/user.controller';
import { UserModule } from './crud/user/user.module';
import { PacientesController } from './crud/pacientes/pacientes/pacientes.controller';
import { PacientesModule } from './crud/pacientes/pacientes/pacientes.module';
import { ServiciosController } from './crud/pacientes/servicios/servicios.controller';
import { ServiciosModule } from './crud/pacientes/servicios/servicios.module';

import { DipController } from './crud/pacientes/dip/dip.controller';
import { DipModule } from './crud/pacientes/dip/dip.module';
import { ProcedimientosCirugiasModule } from './crud/pacientes/procedimientos-cirugias/procedimientos-cirugias.module';
import { TipoHeridasController } from './crud/pacientes/tipo-heridas/tipo-heridas.controller';
import { TipoHeridasModule } from './crud/pacientes/tipo-heridas/tipo-heridas.module';




@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal : true
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'mariadb',
      host: configService.get<string>(DB_URL),
      port: +configService.get<number>(DB_PORT),
      username: configService.get<string>(DB_USER),
      password: configService.get<string>(DB_PASSWORD),
      database: configService.get<string>(DB_DATABASE),
      entities: [__dirname +'/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    inject: [ConfigService],
  }),
  AuthModule,
  UserModule,
  PacientesModule,
  ServiciosModule,
  DipModule,
  ProcedimientosCirugiasModule,
  TipoHeridasModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
