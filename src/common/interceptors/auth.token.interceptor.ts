/* eslint-disable @typescript-eslint/require-await */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthTokenInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const token = request.headers.authorization?.split(' ')[1];

    // checar o token de autenticação, aqui estamos usando um token fixo para simplicidade, mas em um cenário real, você verificaria o token contra um banco de dados ou serviço de autenticação

    if (!token || token !== '123456') {
      throw new UnauthorizedException(
        `'Token de autenticação inválido ou ausente'`,
      );
    }
    console.log('Token recebido no interceptor:', token);
    return next.handle();
  }
}
