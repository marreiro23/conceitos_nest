import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('home')
export class AppController {
  constructor(private readonly appService: AppService) {}

  //@Get('hello')
  getHello(): string {
    const retorno = 'Retornou!';
    return retorno;
    // return this.appService.getHello();
  }
}
