import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyDynamicModule } from 'src/my-dynamic/my-dynamic.module';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { Recado } from './entities/recado.entity';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { RecadosUtils } from './recados.utils';

// const createRegexClass = () => {
//   return new RemoveSpacesRegex();
// };

@Module({
  imports: [
    TypeOrmModule.forFeature([Recado]),
    forwardRef(() => PessoasModule),
    MyDynamicModule.register({
      apiKey: 'my-api-key',
      apiUrl: 'https://api.example.com',
    }),
  ],
  controllers: [RecadosController],
  providers: [RecadosService, RecadosUtils],
  exports: [RecadosUtils],
})
export class RecadosModule {}
