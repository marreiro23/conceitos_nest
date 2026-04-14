import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Recado } from './entities/recado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generateRandomString } from 'src/utils/generate-randon-strings';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Recado não encontrado');
    // Linha adicionada para lançar um erro intencionalmente, permitindo testar a integração com o Sentry, uma plataforma de monitoramento de erros e desempenho para aplicações. Ao lançar esse erro, podemos verificar se ele é capturado corretamente pelo Sentry e se as informações relevantes sobre o erro são registradas para análise posterior.
  }

  async findAll() {
    const recados = await this.recadoRepository.find();
    return recados;
  }

  async findOne(id: number) {
    // const recado = await this.recadoRepository.findOneBy({ id }); // O operador + é usado para converter a string id em um número, permitindo a comparação correta com o campo id dos recados, que é do tipo number
    const recado = await this.recadoRepository.findOne({
      where: {
        id,
      },
    });

    if (recado) return recado;

    this.throwNotFoundError();
  }

  async create(createRecadoDto: UpdateRecadoDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const texto = createRecadoDto.texto?.trim();

    const novoRecado = {
      ...createRecadoDto,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      texto: texto ? texto : generateRandomString(20), // Gerar um texto aleatório para o recado quando o campo texto não for enviado (ou vier vazio).
      lido: false,
      data: new Date(),
    };

    const recado = this.recadoRepository.create(novoRecado);

    return this.recadoRepository.save(recado);
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const partialUpdateRecadoDto = {
      lido: updateRecadoDto?.lido,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      texto: updateRecadoDto?.texto,
    };

    const recado = await this.recadoRepository.preload({
      id,
      ...partialUpdateRecadoDto,
    });

    if (!recado) return this.throwNotFoundError();

    await this.recadoRepository.save(recado);
    return recado;
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({
      id,
    });

    if (!recado) return this.throwNotFoundError();

    return this.recadoRepository.remove(recado);
  }
}
