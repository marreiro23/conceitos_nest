import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class OutroMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('OutroMiddleware: Ola'); // Log para indicar que o middleware foi executado
    const authorization = req.headers.authorization;
    // Obtém o header de autorização da requisição

    if (authorization) {
      // Log para mostrar o valor do header de autorização
      req['user'] = {
        nome: 'Luiz',
        sobrenome: 'Silva',
      };
    }
    res.setHeader('CABECALHO', 'DO MIDDLEWARE'); // Adiciona um header personalizado à resposta

    // Adiciona um objeto user ao request para simular autenticação
    next(); // Chama a próxima função de middleware ou o manipulador de rota

    console.log(
      'OutroMiddleware: após a execução do próximo middleware ou manipulador de rota',
    ); // Log para indicar que o middleware foi executado
  }
}
