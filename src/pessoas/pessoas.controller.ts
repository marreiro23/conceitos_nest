import {
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  Get,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';

@Controller('pessoas')
export class PessoasController {
  pessoaRepository: any;
  constructor(private readonly pessoasService: PessoasService) {}

  @Get()
  async findAll() {
    return this.pessoasService.findAll();
  }

  // Encontrar uma pessoa específica
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const pessoa = await this.pessoasService.findOne(id);
    if (pessoa) return [pessoa];
    throw new NotFoundException(`Pessoa with ID ${id} not found`);
  }

  @Post()
  create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoasService.create(createPessoaDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePessoaDto: UpdatePessoaDto,
  ) {
    return this.pessoasService.update(id, updatePessoaDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Pessoa[]> {
    const pessoa = await this.pessoasService.findOne(id);
    if (!pessoa) {
      throw new NotFoundException(`Pessoa with ID ${id} not found`);
    }
    await this.pessoasService.remove(id);
    return [pessoa];
    // return this.pessoasService.remove(id); --- IGNORE ---
  }
}
