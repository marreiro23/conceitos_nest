import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const ReqDataParam = createParamDecorator(
  (data: keyof Request, ctx: ExecutionContext) => {
    const context = ctx.switchToHttp();
    const request: Request = context.getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return request[data]; // Retorna o valor do campo especificado da requisição, permitindo que seja injetado em um controlador ou serviço usando o decorador @ReqDataParam()
  },
);
