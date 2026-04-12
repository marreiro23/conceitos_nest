import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { generateRandomString } from 'src/utils/generate-randon-strings';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoasRepository: Repository<Pessoa>,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Pessoa não encontrada');
    // Linha adicionada para lançar um erro intencionalmente, permitindo testar a integração com o Sentry, uma plataforma de monitoramento de erros e desempenho para aplicações. Ao lançar esse erro, podemos verificar se ele é capturado corretamente pelo Sentry e se as informações relevantes sobre o erro são registradas para análise posterior.
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

    this.throwNotFoundError();
  }

  async create(createPessoaDto: CreatePessoaDto) {
    const nPessoa = createPessoaDto.nPessoa?.trim();

    const nPassword = createPessoaDto.nPassword?.trim();

    const novaPessoa = {
      ...createPessoaDto,
      nPessoa: nPessoa ? nPessoa : generateRandomString(10), // Gerar um nome aleatório para a pessoa quando o campo nome não for enviado (ou vier vazio).

      nPassword: nPassword ? nPassword : generateRandomString(5), // O campo passwordHash é preenchido com o valor do campo password do DTO, que é a senha em texto plano. No entanto, é importante ressaltar que armazenar senhas em texto plano não é seguro. Em um ambiente de produção, é recomendado utilizar uma função de hash para proteger as senhas antes de armazená-las no banco de dados.
      email: createPessoaDto.email,
    };

    const pessoa = this.pessoasRepository.create(novaPessoa);

    return this.pessoasRepository.save(pessoa);
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const partialUpdatePessoaDto = {
      nome: updatePessoaDto?.nome,
      email: updatePessoaDto?.email,
      password: updatePessoaDto?.passwordHash,
    };

    const pessoa = await this.pessoasRepository.preload({
      id,
      ...partialUpdatePessoaDto,
    });

    if (!pessoa) return this.throwNotFoundError();

    return pessoa;
  }

  async remove(id: number) {
    const pessoa = await this.pessoasRepository.findOneBy({
      id,
    });

    if (!pessoa) return this.throwNotFoundError();

    return this.pessoasRepository.remove(pessoa);
  }
}
