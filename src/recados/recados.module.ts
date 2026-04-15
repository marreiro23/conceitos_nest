import { forwardRef, Module } from '@nestjs/common';
import { RecadosService } from './recados.service';
import { RecadosController } from './recados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtils, RecadosUtilsMock } from './recados.utils';
import { OnlyLowercaseLettersRegex } from 'src/common/regex/only-lowercase-letters.regex';
import { RemoveSpacesRegex } from 'src/common/regex/remove-spaces.regex';
import {
  ONLY_LOWERCASE_LETTERS,
  REMOVE_SPACES_REGEX,
  SERVER_NAME,
} from './recados.constant';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recado]),
    forwardRef(() => PessoasModule),
  ],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    {
      provide: RecadosUtils, // Token
      useValue: new RecadosUtilsMock(), // Valor a ser usado
      // useClass: RecadosUtils, // Classe a ser instanciada
    },
    {
      provide: SERVER_NAME, // Token
      useValue: 'Meu Nome pe NestJS', // Valor a ser usado
      // useClass: RecadosUtils, // Classe a ser instanciada
    },
    {
      provide: ONLY_LOWERCASE_LETTERS, // Token
      useClass: OnlyLowercaseLettersRegex, // Classe a ser instanciada
    },
    {
      provide: REMOVE_SPACES_REGEX, // Token

      useClass: RemoveSpacesRegex, // Classe a ser instanciada
    },
  ],
  exports: [RecadosUtils, SERVER_NAME],
})
export class RecadosModule {}
