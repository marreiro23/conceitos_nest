import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';

@Injectable({ scope: Scope.REQUEST })
export class PessoasService {
  private count = 0;

  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoasRepository: Repository<Pessoa>,
  ) {
    this.count++;
    console.log(`Instancia de PessoasService criada count: ${this.count}`);
  }

  async create(createPessoaDto: CreatePessoaDto) {
    const pessoa = this.pessoasRepository.create({
      nome: createPessoaDto.nome,
      email: createPessoaDto.email,
      passwordHash: createPessoaDto.passwordHash,
    });

    return this.pessoasRepository.save(pessoa);
  }

  async findAll() {
    // console.log(this.recadosUtils.inverteString('Marreiro'));
    const pessoas = await this.pessoasRepository.find();
    return pessoas;
  }

  async findOne(id: number) {
    this.count++;
    console.log(
      `Instancia de PessoasService criada: ${this.count} - findOne - ID: ${id}`,
    );
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
      this.count++;
      console.log(
        `Pessoas - - - Service: ${this.count} - update - Pessoa with ID ${id} not found`,
      );
      throw new NotFoundException(`Pessoa com ID ${id} não encontrada`);
    }

    return this.pessoasRepository.save(pessoa);
  }

  async remove(id: number) {
    const pessoa = await this.pessoasRepository.findOneBy({
      id,
    });

    if (!pessoa) {
      console.log(
        `Pessoas - - - Service: ${this.count} - remove - Pessoa with ID ${id} not found`,
      );
      throw new NotFoundException(`Pessoa with ID ${id} not found`);
    }

    return this.pessoasRepository.remove(pessoa);
  }

  async removeAll() {
    const pessoas = await this.pessoasRepository.find();

    if (!pessoas.length) throw new NotFoundException(`No pessoas found`);

    return this.pessoasRepository.remove(pessoas);
  }
}
