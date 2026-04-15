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
import type { MyDynamicModuleConfigs } from 'src/my-dynamic/my-dynamic.module';

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
