import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class ChangeDataInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/require-await
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      map(data => {
        // console.log('ChangeDataInterceptor Modificando os dados da resposta');
        // Log para depuração, indicando que os dados da resposta estão sendo modificados
        // Modifica os dados da resposta, por exemplo, adicionando um campo "intercepted" com o valor true
        //
        if (Array.isArray(data)) {
          return {
            data: data,
            count: data.length,
          };
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data;
      }),
    );
  }
}
