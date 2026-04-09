import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('home')
export class AppController {
  constructor(private readonly appService: AppService) {}
  // decorator que define um endpoint GET para a rota raiz ("/") -> ler -> CRUD
  @Get('hello')
  getHello(): string {
    const retorno = 'Retornou!';
    return retorno;
    // return this.appService.getHello();
  }

  @Get('exemplo')
  exemplo() {
    return this.appService.solucionaExemplo();
  }
}
