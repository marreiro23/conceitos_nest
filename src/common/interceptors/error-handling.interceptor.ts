import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/require-await
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log('ErrorHandlingInterceptor Executado Antes do Handler'); // Log para depuração, indicando que o interceptor foi executado antes do manipulador de rota
    // await new Promise(resolve => setTimeout(resolve, 10000)); // Simula um atraso de 10 segundos para representar o tempo de conexão
    return next.handle().pipe(
      catchError(error => {
        return throwError(() => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (error.name === 'NotFoundException') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            return new BadRequestException(error.message); // Propaga o erro para o próximo manipulador de erros
          }

          return new BadRequestException('Erro  - ErrorHandlingInterceptor'); // Propaga o erro para o próximo manipulador de erros
        });
      }),
    );
  }
}
