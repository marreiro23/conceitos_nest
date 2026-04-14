import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoasRepository: Repository<Pessoa>,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    const pessoa = this.pessoasRepository.create({
      nome: createPessoaDto.nome,
      email: createPessoaDto.email,
      passwordHash: createPessoaDto.passwordHash,
    });

    return this.pessoasRepository.save(pessoa);
  }

  async findAll() {
    const pessoas = await this.pessoasRepository.find();
    return pessoas;
  }

  async findOne(id: number) {
    const pessoa = await this.pessoasRepository.findOne({
      where: {
        id,
      },
    });

    if (pessoa) return pessoa;

    throw new NotFoundException(`Pessoa with ID ${id} not found`);
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const pessoa = await this.pessoasRepository.preload({
      id,
      ...updatePessoaDto,
    });

    if (!pessoa) {
      throw new NotFoundException(`Pessoa com ID ${id} não encontrada`);
    }

    return this.pessoasRepository.save(pessoa);
  }

  async remove(id: number) {
    const pessoa = await this.pessoasRepository.findOneBy({
      id,
    });

    if (!pessoa) throw new NotFoundException(`Pessoa with ID ${id} not found`);

    return this.pessoasRepository.remove(pessoa);
  }
}
