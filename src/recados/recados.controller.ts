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
  UseInterceptors,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Recado } from './entities/recado.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import type { MyDynamicModuleConfigs } from 'src/my-dynamic/my-dynamic.module';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
import { ErrorHandlingInterceptor } from 'src/common/interceptors/error-handling.interceptor';

@Controller('recados')
export class RecadosController {
  constructor(
    private readonly recadosService: RecadosService,
    @Inject('MY_DYNAMIC_CONFIG')
    private readonly myDynamicConfigs: MyDynamicModuleConfigs,
  ) {
    console.log('RecadosController initialized with config:', myDynamicConfigs);
    console.log('Server Name from config:', this.myDynamicConfigs.apiUrl);
  }
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    const recados = await this.recadosService.findAll(paginationDto);

    return recados;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // console.log(this.serverName);
    return this.recadosService.findOne(+id);
  }

  // Criar um recado
  @Post()
  @UseInterceptors(AddHeaderInterceptor, ErrorHandlingInterceptor)
  create(@Body() createRecadoDto: CreateRecadoDto) {
    console.log(
      'RecadosController - create method called with DTO:',
      createRecadoDto,
    ); // Log para depuração, indicando que o método de criação foi chamado com os dados do DTO
    if (createRecadoDto.deId !== null) {
      console.log(
        'Simulando um erro intencional para testar o ErrorHandlingInterceptor',
      ); // Log para depuração, indicando que um erro intencional está sendo simulado para testar o interceptor de tratamento de erros
      throw new NotFoundException('Pessoa remetente não encontrada'); // Lança um erro intencionalmente para testar o interceptor de tratamento de erros
    } // Log para depuração, indicando que o método de criação foi chamado com os dados do DTO
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecadoDto: UpdateRecadoDto) {
    console.log(
      'RecadosController - update method called with ID:',
      id,
      'and DTO:',
      updateRecadoDto,
    ); // Log para depuração, indicando que o método de atualização foi chamado com o ID e os dados do DTO
    return this.recadosService.update(+id, updateRecadoDto);
  }

  @Delete(':id')
  @UseInterceptors(AddHeaderInterceptor, ErrorHandlingInterceptor)
  async remove(@Param('id') id: string): Promise<Recado[]> {
    const recado = await this.recadosService.findOne(+id);
    if (!recado) {
      throw new NotFoundException('Recado não encontrado');
    }
    await this.recadosService.remove(+id);
    return [recado];
  }
}
