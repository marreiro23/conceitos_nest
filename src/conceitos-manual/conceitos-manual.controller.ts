import { Controller, Get } from '@nestjs/common';
import { ConceitosManualService } from './conceitos-manual.service';

@Controller('conceitos-manual') //usado para incluir a rota base para os endpoints relacionados aos conceitos manuais
export class ConceitosManualController {
  constructor(
    private readonly conceitosManualService: ConceitosManualService,
  ) {}

  @Get() // Define a rota para acessar o método home
  home(): string {
    return this.conceitosManualService.solucionaHome(); // Chama o método solucionaHome do serviço ConceitosManualService para obter a resposta
  }
}

// Aqui você pode definir os endpoints relacionados aos conceitos manuais
