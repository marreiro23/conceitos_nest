import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import appConfig from './app.config';
import Joi from '@hapi/joi';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: Joi.object({
        DB_TYPE: Joi.required(),
        DB_HOST: Joi.required(),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.required(),
        DB_PASSWORD: Joi.required(),
        DB_NAME: Joi.required(),
        DB_SYNCHRONIZE: Joi.number().min(0).max(1).default(0),
        DB_AUTO_LOAD_ENTITIES: Joi.number().min(0).max(1).default(0),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get<'postgres'>('database.type'),
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.database'),
          synchronize: configService.get<boolean>('database.synchronize'),
          autoLoadEntities: configService.get<boolean>(
            'database.autoLoadEntities',
          ),
        };
      },
    }),
    RecadosModule,
    PessoasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
