import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntIdPipe implements PipeTransform<string, number> {
  transform(value: any, metadata: ArgumentMetadata) {
    // console.log('ParseIntIdPipe Executado');
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return value; // Se não for um parâmetro 'id', retorna o valor sem transformação
    }

    const parsedValue = Number(value);

    if (isNaN(parsedValue)) {
      throw new BadRequestException(
        'ParseIntIdPipe: O valor do ID deve ser um número válido',
      );
    }

    if (parsedValue < 0) {
      throw new BadRequestException(
        'ParseIntIdPipe: O valor do ID deve ser um número positivo maior quer que zero',
      );
    }
    return parsedValue;
  }
}
