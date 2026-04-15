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
  NotFoundException,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Recado } from './entities/recado.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthTokenInterceptor } from 'src/common/interceptors/auth.token.interceptor';
import type { Request } from 'express';

// Interface para os parâmetros de paginação:
// limit é o número máximo de itens a retornar
// offset é o número de itens a pular antes de começar a retornar os resultados

@UseInterceptors(AuthTokenInterceptor)
@Controller('recados') // Rota base para os recados, todas as rotas dentro deste controlador começarão com /recados
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {} // Injeção de dependência do serviço de recados, permitindo que o controlador utilize os métodos definidos no serviço para manipular os recados

  // @UseInterceptors(TimingConnectionInterceptor, ErrorHandlingInterceptor) // Interceptor para adicionar um header personalizado à resposta
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query() paginationDto: PaginationDto, @Req() req: Request) {
    console.log('RecadosController', req['user']); // Log para depuração, mostrando os parâmetros de paginação recebidos
    const recados = await this.recadosService.findAll(paginationDto);
    return recados; // Retorna a lista de recados obtida do serviço
  }

  // Encontrar um recado específico
  // @UseInterceptors(AddHeaderInterceptor, ErrorHandlingInterceptor)

  @Get(':id')
  findOne(@Param('id') id: string) {
    // throw new Error('Bla bla bla'); // Simula um erro para testar o interceptor de tratamento de erros
    return this.recadosService.findOne(+id); // Chama o método findOne do serviço de recados, passando o id do recado a ser encontrado
  }

  // Criar um recado
  // @UseInterceptors(AddHeaderInterceptor, ErrorHandlingInterceptor) // Interceptor para adicionar um header personalizado à resposta
  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }
  // Atualizar um recado específico
  // @UseInterceptors(AddHeaderInterceptor, ErrorHandlingInterceptor)
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
