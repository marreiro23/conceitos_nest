import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap, of } from 'rxjs';

@Injectable()
export class SimpleCacheInterceptor implements NestInterceptor {
  private readonly cache = new Map();

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log('SimpleCacheInterceptor Executado ANTES');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const url = request.url;

    if (this.cache.has(url)) {
      console.log('Cache encontrado para URL:', url); // Log para depuração, indicando que o cache foi encontrado para a URL
      return of(this.cache.get(url)); // Retorna a resposta em cache se disponível
    }

    await new Promise(resolve => setTimeout(resolve, 3000)); // Simula um atraso de 3 segundos para representar o tempo de conexão

    return next.handle().pipe(
      tap(data => {
        console.log(`Cache da URL: ${url} sendo armazenado`); // Log para depuração, indicando que a resposta está sendo armazenada no cache para a URL
        this.cache.set(url, data); // Armazena a resposta no cache
        console.log(`URL: ${url} armazenada no cache`); // Log para depuração, indicando que a resposta foi armazenada no cache para a URL
      }),
    );
  }
}
