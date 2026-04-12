import { Module } from '@nestjs/common';
import { ConceitosManualController } from './conceitos-manual.controller';
import { ConceitosManualService } from './conceitos-manual.service';

@Module({
  imports: [],
  // Aqui você pode importar outros módulos, se necessários
  controllers: [ConceitosManualController], // Registra o controlador ConceitosManualController no módulo
  providers: [ConceitosManualService], // Registra o serviço ConceitosManualService no módulo
})
export class ConceitosManualModule {}
