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
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Recado } from './entities/recado.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

// @UseGuards(IsAdminGuard) // Guard para verificar a autenticação do token, garantindo que apenas usuários autenticados possam acessar as rotas deste controlador
@Controller('recados') // Rota base para os recados, todas as rotas dentro deste controlador começarão com /recados
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {} // Injeção de dependência do serviço de recados, permitindo que o controlador utilize os métodos definidos no serviço para manipular os recados

  // @UseInterceptors(TimingConnectionInterceptor, ErrorHandlingInterceptor) // Interceptor para adicionar um header personalizado à resposta
  // @UseGuards(IsAdminGuard)
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    console.log('Metodo da requisição:'); // Exemplo de uso do decorador personalizado @ReqDataParam para obter o método da requisição e logá-lo no console
    const recados = await this.recadosService.findAll(paginationDto);

    return recados; // Retorna a lista de recados encontrados, utilizando o método findAll do serviço de recados, passando os parâmetros de paginação
    // Encontrar um recado específico
    // @UseInterceptors(AddHeaderInterceptor, ErrorHandlingInterceptor)
  }

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
