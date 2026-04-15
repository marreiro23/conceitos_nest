import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Recado } from './entities/recado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoasService: PessoasService,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Recado não encontrado');
    // Linha adicionada para lançar um erro intencionalmente, permitindo testar a integração com o Sentry, uma plataforma de monitoramento de erros e desempenho para aplicações. Ao lançar esse erro, podemos verificar se ele é capturado corretamente pelo Sentry e se as informações relevantes sobre o erro são registradas para análise posterior.
  }

  async findAll(paginationDto: PaginationDto) {
    // console.log(this.recadosUtils.inverteString('Daniel'));

    const { limit = 10, offset = 0 } = paginationDto;

    const recados = await this.recadoRepository.find({
      take: limit, // quantos registros serão exibidos por pagina.
      skip: offset, // quantos registros serão pulados para chegar na página desejada.
      relations: ['de', 'para'],
      order: {
        id: 'desc',
      },
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });

    return recados;
  }

  async findOne(id: number) {
    // console.log('RecadosService Executado - findOne'); // Log para depuração, mostrando o ID recebido
    // const recado = await this.recadoRepository.findOneBy({ id }); // O operador + é usado para converter a string id em um número, permitindo a comparação correta com o campo id dos recados, que é do tipo number
    const recado = await this.recadoRepository.findOne({
      where: {
        id,
      },
      relations: ['de', 'para'],
      order: {
        id: 'desc',
      },
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });

    if (recado) return recado;

    return this.throwNotFoundError();
  }

  async create(createRecadoDto: CreateRecadoDto) {
    const { deId, paraId } = createRecadoDto;
    //Encontrar a pessoa que esta enviando o recado.
    const de = await this.pessoasService.findOne(deId);
    // Encontrar a pessoa que esta recebendo o recado.
    const para = await this.pessoasService.findOne(paraId);

    const novoRecado = {
      texto: createRecadoDto.texto,
      de,
      para,
      lido: false,
      data: new Date(),
    };

    const recado = this.recadoRepository.create(novoRecado);
    await this.recadoRepository.save(recado);

    return {
      ...recado,
      de: {
        id: recado.de.id,
      },
      para: {
        id: recado.para.id,
      },
    };
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const recado = await this.recadoRepository.preload({
      id,
      ...updateRecadoDto,
    });

    if (!recado) {
      throw new NotFoundException('Recado não encontrado');
    }

    return this.recadoRepository.save(recado);
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({ id });

    if (!recado) {
      throw new NotFoundException(`Recado com ID ${id} não encontrado`);
    }

    return this.recadoRepository.remove(recado);
  }
}
