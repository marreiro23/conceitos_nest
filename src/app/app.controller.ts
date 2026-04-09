import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

@Controller('home')
export class AppController {
  // constructor(private readonly appService: AppService) {}

  @Get('hello') // decorator que define um endpoint GET para a rota raiz ("/") -> ler -> CRUD
  getHello(): string {
    return 'Qualquer Coisa!';
    // return this.appService.getHello();
  }

  @Get('exemplo')
  exemplo(): string {
    return 'Exemplo de Rota';
  }
}
