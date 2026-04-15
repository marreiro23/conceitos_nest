import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('SimpleMiddleware: Ola'); // Log para indicar que o middleware foi executado
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
      'SimpleMiddleware: após OutroMiddleware ou manipulador de rota',
    ); // Log para indicar que o middleware foi executado

    res.on('finish', () => {
      console.log(
        'SimpleMiddleware: resposta finalizada, status code:',
        res.statusCode,
      ); // Log para indicar que a resposta foi finalizada
    });
  }
}
