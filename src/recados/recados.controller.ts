import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

// Interface para os parâmetros de paginação:
// limit é o número máximo de itens a retornar
// offset é o número de itens a pular antes de começar a retornar os resultados

@Controller('recados') // Rota base para os recados, todas as rotas dentro deste controlador começarão com /recados
export class RecadosController {
  recadoRepository: any;
  constructor(private readonly recadosService: RecadosService) {} // Injeção de dependência do serviço de recados, permitindo que o controlador utilize os métodos definidos no serviço para manipular os recados

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.recadosService.findAll();
  }
  // Encontrar um recado específico
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Recado[]> {
    const recado = await this.recadosService.findOne(id);
    if (recado) return [recado];
    throw new NotFoundException('Recado não encontrado');
  }

  // Criar um recado
  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }
  // Atualizar um recado específico

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecadoDto: UpdateRecadoDto,
  ) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Recado[]> {
    const recado = await this.recadosService.findOne(id);
    if (!recado) {
      throw new NotFoundException('Recado não encontrado');
    }
    await this.recadosService.remove(id);
    return [recado];
  }
}
