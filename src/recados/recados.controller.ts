/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

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
  Query,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { Recado } from './entities/recado.entitie';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

// CRUD
// Create - POST -> CRIAR UM RECADO
// Read - GET -> LER TODOS OS RECADOS
// Read - GET -> LER UM RECADO ESPECÍFICO
// Update - PUT - PATCH -> ATUALIZAR UM RECADO
// Delete - DELETE -> DELETAR UM RECADO

// PUT -> ATUALIZA TODOS OS DADOS DE UM RECADO
// PATCH -> ATUALIZA APENAS ALGUNS DADOS DE UM RECADO

// DTO -> Objeto de Transferência de Dados
// DTO -> Objeto simples -> Validar dados -> transformar dados

interface PaginationQuery {
  limit?: number;
  offset?: number;
}
// Interface para os parâmetros de paginação:
// limit é o número máximo de itens a retornar
// offset é o número de itens a pular antes de começar a retornar os resultados

@Controller('recados') // Rota base para os recados, todas as rotas dentro deste controlador começarão com /recados
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {} // Injeção de dependência do serviço de recados, permitindo que o controlador utilize os métodos definidos no serviço para manipular os recados

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() pagination: PaginationQuery): Recado[] {
    const { limit = 10, offset = 0 } = pagination;
    console.log(`Limit: ${limit}, Offset: ${offset}`);
    // return `Essa rota encontra todos os recados, OK" Limite= ${limit} Offset= ${offset} User= ${user}`;
    return this.recadosService.findAll();
  }
  // Encontrar um recado específico
  @Get(':id')
  findOne(@Param('id') id: any): Recado | undefined {
    console.log(id);
    return this.recadosService.findOne(id);
  }
  // Criar um recado
  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }
  // Atualizar um recado específico

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecadoDto: UpdateRecadoDto,
  ): Recado {
    const recadoExistenteIndex = this.recadosService.update(
      id,
      updateRecadoDto,
    );
    return recadoExistenteIndex;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.recadosService.remove(id);
  }
}
