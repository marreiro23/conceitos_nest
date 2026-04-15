import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Delete,
  Query,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Recado } from './entities/recado.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RemoveSpacesRegex } from 'src/common/regex/remove-spaces.regex';
import { REMOVE_SPACES_REGEX } from './recados.constant';
import { OnlyLowercaseLettersRegex } from 'src/common/regex/only-lowercase-letters.regex';
import { ONLY_LOWERCASE_LETTERS_REGEX } from './recados.constant';

@Controller('recados')
export class RecadosController {
  constructor(
    private readonly recadosService: RecadosService,
    @Inject(REMOVE_SPACES_REGEX)
    private readonly removeSpacesRegex: RemoveSpacesRegex,
    @Inject(ONLY_LOWERCASE_LETTERS_REGEX)
    private readonly onlyLowercaseLettersRegex: OnlyLowercaseLettersRegex,
  ) {}

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    console.log(
      this.removeSpacesRegex.execute('REMOVE OS ESPACOS = console 1'),
    );
    console.log(
      this.onlyLowercaseLettersRegex.execute(
        'TUDO MINUSCULA REMOVE OS ESPACOS - letra minuscula',
      ),
    );
    const recados = await this.recadosService.findAll(paginationDto);

    return recados;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // console.log(this.serverName);
    return this.recadosService.findOne(+id);
  }

  // Criar um recado
  // @UseInterceptors(AddHeaderInterceptor, ErrorHandlingInterceptor) // Interceptor para adicionar um header personalizado à resposta
  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecadoDto: UpdateRecadoDto) {
    return this.recadosService.update(+id, updateRecadoDto);
  }

  @Delete(':id')
  // @UseInterceptors(AddHeaderInterceptor, ErrorHandlingInterceptor)
  async remove(@Param('id') id: string): Promise<Recado[]> {
    const recado = await this.recadosService.findOne(+id);
    if (!recado) {
      throw new NotFoundException('Recado não encontrado');
    }
    await this.recadosService.remove(+id);
    return [recado];
  }
}
