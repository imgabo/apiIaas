import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  DB_URL,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './crud/user/user.module';
import { PacientesModule } from './crud/pacientes/pacientes/pacientes.module';
import { ServiciosModule } from './crud/pacientes/servicios/servicios.module';

import { DipModule } from './crud/pacientes/dip/dip.module';

import { TipoHeridasModule } from './crud/pacientes/tipo-heridas/tipo-heridas.module';
import { MicroorganismosModule } from './crud/pacientes/microorganismos/microorganismos.module';
import { LocalizacionesModule } from './crud/pacientes/localizaciones/localizaciones.module';
import { IarepisModule } from './crud/pacientes/iarepis/iarepis.module';

import { PaasModule } from './crud/pacientes/paas/paas.module';
import { VigilanciaDipsModule } from './vigilancias/dips/vigilaciadips.module';
import { ProcedimientosCirugiasModule } from './crud/pacientes/procedimientos-cirugias/procedimientos-cirugias.module';
import { VigilanciacirugiasModule } from './vigilancias/procedimientos-cirugias/vigilanciacirugias.module';

import { IarepisVigilanciasModule } from './vigilancias/iarepis/iarepisvigilancias.module';
import { VigilanciaspaasModule } from './vigilancias/paas/vigilanciaspaas.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
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
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
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
    MicroorganismosModule,
    LocalizacionesModule,
    IarepisModule,
    PaasModule,
    VigilanciaDipsModule,
    VigilanciacirugiasModule,
    IarepisVigilanciasModule,
    VigilanciaspaasModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
