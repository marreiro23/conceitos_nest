import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const startTime = Date.now();

    console.log('TimingConnectionInterceptor Executado ANTES');

    await new Promise(resolve => setTimeout(resolve, 10000)); // Simula um atraso de 10 segundos para representar o tempo de conexão

    return next.handle().pipe(
      tap(() => {
        const finalTime = Date.now();
        const elapsedTime = (finalTime - startTime) / 1000; // Calcula o tempo decorrido em segundos
        console.log(`TimingConnectionInterceptor Executado DEPOIS - Tempo decorrido: 
          ${elapsedTime}seconds`);
        // console.log(data);
      }),
    );
  }
}
